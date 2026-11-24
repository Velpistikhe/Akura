import assert from 'node:assert/strict'
import test from 'node:test'
import { loadMenuOptions } from '../src/modules/menu/menuOptions.js'

test('assignment options include subsequent pages using the same filters', async () => {
  const calls = []
  const list = async (query) => {
    calls.push(query)
    return { data: { menus: [{ id: query.page }], pagination: { totalPages: 2 } } }
  }
  assert.deepEqual(await loadMenuOptions(list, 'menus', { hasItem: true }), [{ id: 1 }, { id: 2 }])
  assert.deepEqual(calls, [1, 2].map((page) => ({ page, limit: 100, hasItem: true })))
  await assert.rejects(loadMenuOptions(async () => ({ data: {} }), 'items'), /Invalid menu directory/)
})
