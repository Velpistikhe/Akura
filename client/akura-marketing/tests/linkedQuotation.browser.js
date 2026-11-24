// Run with Playwright MCP against the local Shell and Marketing remote.
async (page, shellUrl = 'http://localhost:4173') => {
  const user = { id: 'reviewer', role: 'USER', section: 'MARKETING', isActive: true,
    firstName: 'Branch', lastName: 'Reviewer', officeBranchId: 'branch-a', officeBranch: { id: 'branch-a', name: 'Jakarta' } }
  const quotation = { id: '00000000-0000-4000-8000-000000000001', no: 12, numberYear: 2026,
    subject: 'Linked inspection quotation', status: 'APPROVED', isActive: true, version: 3, items: [],
    hasWorkOrder: true, workOrderId: '00000000-0000-4000-8000-000000000002', workOrderStatus: 'IN_PROGRESS' }
  const menus = [{ key: 'marketing', label: 'Marketing', hasItem: true, items: [{ key: 'quotations', label: 'Quotations' }] }]
  const unexpected = []
  const mockApi = async (route) => {
    const request = route.request()
    if (!['fetch', 'xhr'].includes(request.resourceType())) return route.fallback()
    const path = new URL(request.url()).pathname
    const reply = (data) => route.fulfill({ json: { success: true, data } })
    if (request.method() === 'GET') {
      if (path.endsWith('/auth/me')) return reply(user)
      if (path.endsWith('/menus/my-menus')) return reply(menus)
      if (path.endsWith('/quotations')) return reply({ quotations: [quotation], pagination: { page: 1, limit: 20, total: 1, totalPages: 1 } })
      if (path.endsWith('/quotations/' + quotation.id)) return reply(quotation)
    }
    unexpected.push(request.method() + ' ' + path)
    return route.fulfill({ status: 404, json: { success: false } })
  }
  const apiPaths = /\/(?:api\/v1\/|auth\/|menus\/my-menus\b|(?:marketing\/)?quotations(?:[/?]|$)|(?:fieldservice\/)?work-orders(?:[/?]|$))/
  await page.route(apiPaths, mockApi)
  try {
    await page.goto(shellUrl + '/marketing/quotations')
    const row = page.getByRole('row').filter({ hasText: quotation.subject })
    await row.getByText('IN PROGRESS', { exact: true }).waitFor()
    if (await row.getByRole('button', { name: /sync|create work order/i }).count()) {
      throw new Error('A linked quotation exposes an unavailable work order action.')
    }
    await row.getByRole('button', { name: /view quotation/i }).click()
    const detail = page.getByRole('dialog')
    await detail.getByRole('heading', { name: 'Quotation Information' }).waitFor()
    if (await detail.getByRole('button', { name: /sync/i }).count()) throw new Error('Quotation detail exposes a sync action.')
    if (unexpected.length) throw new Error('Unexpected API requests: ' + unexpected.join(', '))
  } finally {
    await page.unroute(apiPaths, mockApi)
  }
}
