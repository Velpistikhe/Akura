import assert from 'node:assert/strict'
import test from 'node:test'
import { financeModules, resolveFinanceRoute } from '../src/routes/financeRoutes.js'

test('tax navigation resolves the canonical reference URL including trailing slashes', () => {
  const tax = financeModules.find(({ key }) => key === 'taxes')
  assert.equal(tax.path, '/reference/taxes')
  assert.equal(resolveFinanceRoute(tax.path), 'taxes')
  assert.equal(resolveFinanceRoute('/reference/taxes/'), 'taxes')
})

test('reference routes do not expose unrelated or nested Finance modules', () => {
  for (const path of ['/reference', '/reference/items', '/reference/finance_quotations', '/reference/taxes/edit']) {
    assert.equal(resolveFinanceRoute(path), 'not-found')
  }
})

test('existing Finance destinations and aliases remain available', () => {
  assert.equal(resolveFinanceRoute('/finance'), 'overview')
  for (const path of ['/finance/taxes', '/finance/tax']) assert.equal(resolveFinanceRoute(path), 'taxes')
  for (const path of ['/finance/finance_quotations', '/finance/quotations', '/finance/quotation']) {
    assert.equal(resolveFinanceRoute(path), 'finance_quotations')
  }
})
