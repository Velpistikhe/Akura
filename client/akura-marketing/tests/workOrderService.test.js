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
test('quotation creation sends the ID in the Marketing path and returns the work order and linked quotation', async (context) => {
  const quotationId = '00000000-0000-4000-8000-000000000004'
  const body = { startDate: '2026-11-05', endDate: '2026-11-06', inspectors: ['Budi Santoso'],
    items: [{ itemSizeId: '00000000-0000-4000-8000-000000000002', quantityInspection: 2.125, quantityMaintenance: 0 }] }
  const workOrder = { id: 'work-order-id', number: 'WO/2026/000001', status: 'DRAFT' }
  const quotation = { id: quotationId, version: 3, hasWorkOrder: true, workOrderId: workOrder.id }
  const calls = []
  const fetchMock = mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options })
    return { ok: true, status: 201, json: async () => ({ data: { workOrder, quotation } }) }
  })
  context.after(() => fetchMock.mock.restore())
  const result = await workOrderService.createFromQuotation({ quotationId, ...body })
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, `http://localhost:5003/quotations/${quotationId}/work-order`)
  assert.equal(calls[0].options.method, 'POST')
  assert.deepEqual(JSON.parse(calls[0].options.body), body)
  assert.equal(calls[0].options.credentials, 'include')
  assert.deepEqual(result.data, { workOrder, quotation })
})

test('creation propagates conflict and unavailable-service responses without automatically repeating a write', async () => {
  for (const status of [409, 503]) {
    const fetchMock = mock.method(globalThis, 'fetch', async () => ({ ok: false, status, json: async () => ({ message: 'Creation rejected' }) }))
    try {
      await assert.rejects(workOrderService.createFromQuotation({ quotationId: branchId }), { status, message: 'Creation rejected' })
      assert.equal(fetchMock.mock.callCount(), 1)
    } finally { fetchMock.mock.restore() }
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
