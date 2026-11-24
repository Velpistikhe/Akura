import assert from 'node:assert/strict'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

test('reference URLs dispatch to the assigned Marketing pages and preserve branch context', async (context) => {
  const server = await createServer({
    root: fileURLToPath(new URL('..', import.meta.url)),
    configFile: false, envDir: false, appType: 'custom',
    plugins: [react()],
    define: { 'import.meta.env': JSON.stringify({ PROD: false }) },
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, watch: null, ws: false },
  })
  context.after(() => server.close())
  const { default: AppRoute } = await server.ssrLoadModule('/src/routes/AppRoute.jsx')
  const currentUser = { id: 'user-a', officeBranchId: 'branch-a', role: 'ADMIN', section: 'MARKETING', isActive: true }
  const navigate = () => {}
  for (const [path, component] of [['companies', 'company/CompanyPage'], ['services', 'service/ServicePage'], ['items', 'item/ItemPage']]) {
    const { default: Page } = await server.ssrLoadModule(`/src/modules/${component}.jsx`)
    for (const pathname of [`/reference/${path}`, `/reference/${path}/`]) {
      const result = AppRoute({ pathname, currentUser, navigate })
      assert.equal(result.type, Page)
      assert.equal(result.props.currentUser, currentUser)
    }
  }
  const fallback = 'unavailable'
  for (const pathname of ['/reference', '/reference/taxes', '/reference/companies/unknown']) {
    assert.equal(AppRoute({ pathname, currentUser, navigate, fallback }), fallback)
  }
})
