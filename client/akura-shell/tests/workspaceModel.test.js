import assert from 'node:assert/strict'
import test from 'node:test'
import { branchLabel, buildWorkspaceGroups } from '../src/modules/dashboard/workspaceModel.js'
import { normalizeApplicationMenus } from '../src/services/menuModel.js'

test('workspace links include only assigned menus and retain server order without mutating input', () => {
  const menus = [
    { key: '/marketing/', order: 2, hasItem: true, items: [{ key: 'quotations', label: 'Quotations' }] },
    { key: 'finance', order: 1, hasItem: true, items: [{ key: 'finance_quotations', label: 'Quotation review', order: 2 }, { key: 'taxes', label: 'Tax', order: 1 }] },
    { key: 'unregistered-app', label: 'Unavailable', hasItem: false },
  ]
  const original = structuredClone(menus)
  const groups = buildWorkspaceGroups(menus)
  assert.deepEqual(groups.map(({ key }) => key), ['finance', 'marketing'])
  assert.deepEqual(groups.flatMap(({ links }) => links.map(({ path }) => path)), ['/finance/taxes', '/finance/finance_quotations', '/marketing/quotations'])
  assert.deepEqual(menus, original)
  assert.ok(!groups.some(({ key }) => key === 'app_manager'))
})

test('empty, unavailable, duplicate and unlabelled menus do not invent destinations', () => {
  assert.deepEqual(buildWorkspaceGroups(null), [])
  assert.deepEqual(buildWorkspaceGroups([{ key: 'marketing', hasItem: true }]), [])
  const groups = buildWorkspaceGroups([
    { key: 'finance', label: 'Finance' },
    { key: 'finance', label: 'Finance duplicate' },
    { key: 'reference', hasItem: true, items: [{ key: '', label: 'Empty' }, { key: 'companies' }, { key: '/items/', label: 'Items' }] },
  ])
  assert.deepEqual(groups.flatMap(({ links }) => links.map(({ path }) => path)), ['/finance', '/reference/items'])
})

test('canonical and legacy API menu keys produce reference links without changing branch access or the response', () => {
  for (const key of ['reference', 'referensi', ' /referensi/ ']) {
    const response = [{ id: 'assigned-menu', key, label: 'Reference', hasItem: true, officeBranchId: 'branch-a',
      items: [{ key: 'companies', label: 'Companies' }, { key: 'taxes', label: 'Tax' }] }]
    const original = structuredClone(response)
    const normalized = normalizeApplicationMenus(response)
    const groups = buildWorkspaceGroups(normalized)
    assert.equal(normalized[0].officeBranchId, 'branch-a')
    assert.equal(normalized[0].id, 'assigned-menu')
    assert.deepEqual(normalized[0].items, original[0].items)
    assert.deepEqual(groups.map(({ key }) => key), ['reference'])
    assert.deepEqual(groups.flatMap(({ links }) => links.map(({ path }) => path)), ['/reference/companies', '/reference/taxes'])
    assert.deepEqual(response, original)
  }
})

test('menu normalization preserves unrelated menus and does not grant missing reference access', () => {
  const menus = [{ key: 'finance', label: 'Finance', officeBranchId: 'branch-b' }]
  assert.deepEqual(normalizeApplicationMenus(menus), menus)
  assert.deepEqual(buildWorkspaceGroups(normalizeApplicationMenus(menus)).map(({ key }) => key), ['finance'])
  for (const value of [null, undefined, {}, []]) assert.deepEqual(normalizeApplicationMenus(value), [])
})

test('branch context follows the active account and never substitutes another branch', () => {
  assert.equal(branchLabel({ officeBranchId: 'branch-a', officeBranch: { name: 'Jakarta' } }), 'Jakarta')
  assert.equal(branchLabel({ officeBranchId: 'branch-b', officeBranchName: 'Surabaya' }), 'Surabaya')
  assert.equal(branchLabel({ officeBranchId: 'branch-b' }), 'Branch assigned')
  assert.equal(branchLabel({ officeBranch: { name: 'Stale branch' } }), 'No branch assigned')
  assert.equal(branchLabel(null), 'No branch assigned')
})
