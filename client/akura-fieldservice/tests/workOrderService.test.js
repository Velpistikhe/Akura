import assert from 'node:assert/strict'
import { after, mock, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const server = await createServer({
  root: fileURLToPath(new URL('..', import.meta.url)),
  configFile: false,
  envDir: false,
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null, ws: false },
})
after(() => server.close())
const { workOrderService } = await server.ssrLoadModule('/src/services/workOrderService.js')
const branchId = '00000000-0000-4000-8000-000000000001'
test('standalone creation posts to Field Service and quotation creation posts to Marketing', async (context) => {
  const quotationId = '00000000-0000-4000-8000-000000000004'
  const workOrder = { id: 'work-order-id', number: 'WO/2026/000001', status: 'DRAFT' }
  const quotation = { id: quotationId, hasWorkOrder: true, workOrderId: workOrder.id }
  const calls = []
  const fetchMock = mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options })
    const data = url.startsWith('http://localhost:5003/') ? { workOrder, quotation } : workOrder
    return { ok: true, status: 201, json: async () => ({ data }) }
  })
  context.after(() => fetchMock.mock.restore())
  const company = { companyId: branchId, subject: 'Site inspection', officialReport: false,
    dailyReport: '2026-11-05', officialReportDelivery: '2026-11-06', dailyReportDelivery: '2026-11-06',
    poNumber: 'PO-001', poDate: '2026-11-01', startDate: '2026-11-05', inspectors: ['Branch Inspector'],
    items: [{ itemSizeId: '00000000-0000-4000-8000-000000000002', quantityInspection: 2.125, quantityMaintenance: 0 }] }
  const quotationBody = { startDate: company.startDate, endDate: '2026-11-06', inspectors: company.inspectors, items: company.items }
  assert.deepEqual((await workOrderService.create(company)).data, workOrder)
  assert.deepEqual((await workOrderService.createFromQuotation({ quotationId, ...quotationBody })).data, { workOrder, quotation })
  assert.deepEqual(calls.map(({ url }) => url), ['http://localhost:5005/work-orders', `http://localhost:5003/quotations/${quotationId}/work-order`])
  assert.deepEqual(calls.map(({ options }) => JSON.parse(options.body)), [company, quotationBody])
  assert.ok(calls.every(({ options }) => options.method === 'POST' && options.credentials === 'include'))
})

test('quotation options read every approved Marketing page and exclude existing work orders', async (context) => {
  const calls = []
  const eligible = { id: branchId, no: 12, isActive: true, status: 'APPROVED', hasWorkOrder: false }
  const next = { ...eligible, id: 'next-quotation' }
  const fetchMock = mock.method(globalThis, 'fetch', async (url) => {
    calls.push(new URL(url))
    const quotations = calls.length === 1 ? [eligible, { ...eligible, hasWorkOrder: true },
      { ...eligible, workOrderId: 'existing-work-order' }, { ...eligible, isActive: false }, { ...eligible, status: 'REVISED' }] : [next]
    return { ok: true, status: 200, json: async () => ({ data: { quotations, pagination: { totalPages: 2 } } }) }
  })
  context.after(() => fetchMock.mock.restore())
  assert.deepEqual(await workOrderService.quotations(), { data: { quotations: [eligible, next] } })
  assert.equal(calls.length, 2)
  calls.forEach((url, index) => {
    assert.equal(url.origin + url.pathname, 'http://localhost:5003/quotations')
    assert.deepEqual(Object.fromEntries(url.searchParams), { page: String(index + 1), limit: '100', status: 'APPROVED', isActive: 'true' })
  })
})

test('quotation options reject malformed responses and later-page failures without returning partial options', async (context) => {
  let calls = 0
  let malformed = true
  const fetchMock = mock.method(globalThis, 'fetch', async () => {
    calls += 1
    if (malformed) return { ok: true, status: 200, json: async () => ({ data: {} }) }
    if (calls === 1) return { ok: true, status: 200, json: async () => ({ data: { quotations: [], pagination: { totalPages: 2 } } }) }
    return { ok: false, status: 503, json: async () => ({ message: 'Marketing unavailable' }) }
  })
  context.after(() => fetchMock.mock.restore())
  await assert.rejects(workOrderService.quotations(), /Invalid quotation directory/)
  assert.equal(calls, 1)
  malformed = false
  calls = 0
  await assert.rejects(workOrderService.quotations(), /Marketing unavailable/)
  assert.equal(calls, 2)
})

test('quotation items use the Marketing detail endpoint and preserve its response envelope', async (context) => {
  const response = { data: { id: branchId, isActive: true, status: 'APPROVED', items: [{ itemSizeId: 'item-size-id' }] } }
  const fetchMock = mock.method(globalThis, 'fetch', async (url) => {
    assert.equal(url, `http://localhost:5003/quotations/${branchId}`)
    return { ok: true, status: 200, json: async () => response }
  })
  context.after(() => fetchMock.mock.restore())
  assert.deepEqual(await workOrderService.quotationItems(branchId), response)
})

test('standalone options use bounded company search and catalog pagination without branch overrides', async (context) => {
  const urls = []
  const fetchMock = mock.method(globalThis, 'fetch', async (url) => {
    urls.push(new URL(url))
    return { ok: true, status: 200, json: async () => ({ data: {} }) }
  })
  context.after(() => fetchMock.mock.restore())
  await workOrderService.companies({ search: 'Branch Company', page: 2 })
  await workOrderService.itemSizes({ itemName: 'Pipe', page: 3, limit: 50 })
  assert.deepEqual(urls.map((url) => url.origin + url.pathname), ['http://localhost:5003/companies', 'http://localhost:5003/items/sizes'])
  assert.deepEqual(Object.fromEntries(urls[0].searchParams), { page: '2', limit: '20', search: 'Branch Company' })
  assert.deepEqual(Object.fromEntries(urls[1].searchParams), { page: '3', limit: '50', itemName: 'Pipe' })
})

test('creation propagates conflicts and unavailable services without repeating writes', async () => {
  for (const method of ['create', 'createFromQuotation']) {
    for (const status of [409, 503]) {
      const fetchMock = mock.method(globalThis, 'fetch', async () => ({ ok: false, status, json: async () => ({ message: 'Creation rejected' }) }))
      try {
        const input = method === 'create' ? { companyId: branchId } : { quotationId: branchId }
        await assert.rejects(workOrderService[method](input), { status, message: 'Creation rejected' })
        assert.equal(fetchMock.mock.callCount(), 1)
      } finally { fetchMock.mock.restore() }
    }
  }
})

test('inspector directory reads every Auth page with active Field Service and branch filters', async (context) => {
  const users = [
    { id: 'one', firstName: 'Budi', lastName: 'Santoso', branch: 'Jakarta' },
    { id: 'two', firstName: 'Siti', lastName: '', branch: 'Jakarta' },
  ]
  const calls = []
  const fetchMock = mock.method(globalThis, 'fetch', async (url, options) => {
    const parsed = new URL(url)
    calls.push({ url: parsed, options })
    const page = Number(parsed.searchParams.get('page'))
    return { ok: true, status: 200, json: async () => ({ data: { users: [users[page - 1]], pagination: { page, totalPages: 2 } } }) }
  })
  context.after(() => fetchMock.mock.restore())

  assert.deepEqual(await workOrderService.inspectors(branchId), users)
  assert.equal(calls.length, 2)
  calls.forEach(({ url, options }, index) => {
    assert.equal(url.pathname, '/api/v1/auth/users')
    assert.deepEqual(Object.fromEntries(url.searchParams), {
      page: String(index + 1), limit: '100', officeBranchId: branchId,
      isActive: 'true', section: 'FIELD_SERVICE', sortBy: 'firstName', sortOrder: 'asc',
    })
    assert.equal(options.credentials, 'include')
  })
})

test('inspector directory refuses an unscoped lookup before making a request', async (context) => {
  const fetchMock = mock.method(globalThis, 'fetch', () => assert.fail('Unscoped user request'))
  context.after(() => fetchMock.mock.restore())
  await assert.rejects(workOrderService.inspectors(), /assigned branch/)
  assert.equal(fetchMock.mock.callCount(), 0)
})

test('inspector directory propagates later-page failures instead of returning a partial list', async (context) => {
  const fetchMock = mock.method(globalThis, 'fetch', async (url) => {
    const firstPage = new URL(url).searchParams.get('page') === '1'
    return {
      ok: firstPage, status: firstPage ? 200 : 503,
      json: async () => firstPage
        ? { data: { users: [{ firstName: 'Budi' }], pagination: { totalPages: 2 } } }
        : { message: 'Directory unavailable' },
    }
  })
  context.after(() => fetchMock.mock.restore())
  await assert.rejects(workOrderService.inspectors(branchId), { message: 'Directory unavailable', status: 503 })
})

test('inspector directory rejects an invalid response instead of hiding missing users', async (context) => {
  const fetchMock = mock.method(globalThis, 'fetch', async () => ({ ok: true, status: 200, json: async () => ({ data: { users: [] } }) }))
  context.after(() => fetchMock.mock.restore())
  await assert.rejects(workOrderService.inspectors(branchId), /Invalid inspector directory response/)
})

test('work order history reads the version history and pagination inside data', async (context) => {
  const data = { history: [{ id: 'event', action: 'START', version: 2 }], pagination: { page: 1, limit: 20, total: 1, totalPages: 1 } }
  const http = context.mock.method(globalThis, 'fetch', async (url) => {
    assert.equal(url, `http://localhost:5005/work-orders/${branchId}/history?page=1&limit=20`)
    return { ok: true, status: 200, json: async () => ({ data }) }
  })
  assert.deepEqual((await workOrderService.history(branchId, { page: 1, limit: 20 })).data, data)
  assert.equal(http.mock.callCount(), 1)
})
