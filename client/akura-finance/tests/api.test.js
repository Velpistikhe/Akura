import assert from 'node:assert/strict'
import { mock, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const path = "/finance/taxes?officeBranchId=branch-one"
const localEnv = {"PROD":false,"VITE_AUTH_BASE_URL":"https://gateway.example/api/v1","VITE_API_BASE_URL":"http://localhost:5004"}
const gatewayEnv = {"PROD":false,"VITE_AUTH_BASE_URL":"https://gateway.example/api/v1","VITE_MARKETING_BASE_URL":"https://gateway.example/api/v1","VITE_API_BASE_URL":"https://gateway.example/api/v1"}

async function loadServer(context, env) {
  const server = await createServer({
    root: fileURLToPath(new URL('..', import.meta.url)),
    configFile: false, envDir: false, appType: 'custom',
    define: { 'import.meta.env': JSON.stringify(env) },
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, watch: null, ws: false },
  })
  context.after(() => server.close())
  return server
}

for (const [name, env, baseUrl, direct] of [
  ['local direct service', localEnv, 'http://localhost:5004', true],
  ['configured gateway', gatewayEnv, 'https://gateway.example/api/v1', false],
  ['production', { PROD: true }, '/api/v1', false],
]) {
  test(name + ' routes domain, Auth and internal paths with the correct credentials', async (context) => {
    const server = await loadServer(context, env)
    const { apiRequest, setAccessToken } = await server.ssrLoadModule('/src/services/api.js')
    setAccessToken('shell-token')
    const calls = []
    const fetchMock = mock.method(globalThis, 'fetch', async (url, options) => {
      calls.push({ url, options })
      return { ok: true, status: 200, json: async () => ({ success: true }) }
    })
    context.after(() => fetchMock.mock.restore())
    const gateway = env.PROD ? '/api/v1' : 'https://gateway.example/api/v1'
    const expectedPath = direct ? path.slice('/finance'.length) : path
    await apiRequest(path)
    await apiRequest('/auth/users?section=FIELD_SERVICE')
    await apiRequest('/finance/internal/events')
    assert.deepEqual(calls.map(({ url }) => url), [
      baseUrl + expectedPath, gateway + '/auth/users?section=FIELD_SERVICE', gateway + '/finance/internal/events',
    ])
    assert.equal(calls[0].options.headers.get('Authorization'), 'Bearer shell-token')
    assert.equal(calls[1].options.headers.has('Authorization'), false)
    assert.ok(calls.every(({ options }) => options.credentials === 'include' && !options.headers.has('x-gateway-secret')))
    const headers = new Headers({ Authorization: 'Bearer explicit-token' })
    await apiRequest(path, { headers })
    assert.equal(calls[3].options.headers.get('Authorization'), 'Bearer explicit-token')
    assert.equal(headers.has('Content-Type'), false)
    const ref = '/quotation-references/00000000-0000-4000-8000-000000000001'
    await apiRequest('/marketing' + ref)
    assert.equal(calls[4].url, (direct ? 'http://localhost:5003' : gateway + '/marketing') + ref)
    assert.equal(calls[4].options.headers.get('Authorization'), 'Bearer shell-token')
  })
}

test('concurrent direct-service 401 responses share a gateway refresh and retry with the rotated token', async (context) => {
  const server = await loadServer(context, localEnv)
  const { apiRequest, setAccessToken, getAccessToken } = await server.ssrLoadModule('/src/services/api.js')
  setAccessToken('expired-token')
  const calls = []
  let refreshes = 0
  const fetchMock = mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options })
    if (url === 'https://gateway.example/api/v1/auth/refresh-token') {
      refreshes += 1
      return { ok: true, status: 200, json: async () => {
        await new Promise((resolve) => setTimeout(resolve, 10))
        return { data: { accessToken: 'rotated-token' } }
      } }
    }
    const ok = options.headers.get('Authorization') === 'Bearer rotated-token'
    return { ok, status: ok ? 200 : 401, json: async () => ({ success: ok }) }
  })
  context.after(() => fetchMock.mock.restore())
  const options = { method: 'PATCH', body: JSON.stringify({ version: 7 }) }
  await Promise.all([apiRequest(path, options), apiRequest(path, options)])
  assert.equal(refreshes, 1)
  assert.equal(getAccessToken(), 'rotated-token')
  const domainCalls = calls.filter(({ url }) => url !== 'https://gateway.example/api/v1/auth/refresh-token')
  assert.equal(domainCalls.length, 4)
  assert.ok(domainCalls.every(({ url, options: sent }) =>
    url === 'http://localhost:5004' + path.slice('/finance'.length) && sent.body === options.body))
  assert.ok(domainCalls.slice(2).every(({ options: sent }) => sent.headers.get('Authorization') === 'Bearer rotated-token'))
})


test('Finance paginates approved quotations and reads individual references with cancellation', async (context) => {
  const server = await loadServer(context, localEnv)
  const { quotationService } = await server.ssrLoadModule('/src/services/quotationService.js')
  const calls = []
  const controller = new AbortController()
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url: new URL(url), options })
    return { ok: true, status: 200, json: async () => ({ data: {} }) }
  })
  await quotationService.list({ page: 2, limit: 10 }, { signal: controller.signal })
  const id = '00000000-0000-4000-8000-000000000001'
  await quotationService.get(id, { signal: controller.signal })
  assert.deepEqual(calls.map(({ url }) => url.pathname), ['/quotations', `/quotation-references/${id}`])
  assert.deepEqual(Object.fromEntries(calls[0].url.searchParams), { page: '2', limit: '10', status: 'APPROVED', isActive: 'true' })
  assert.ok(calls.every(({ options }) => options.method === 'GET' && options.signal === controller.signal))
})
