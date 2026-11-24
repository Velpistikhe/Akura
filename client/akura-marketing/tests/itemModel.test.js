import assert from 'node:assert/strict'
import test from 'node:test'
import { createItemPayload, standardPricePayload } from '../src/modules/item/itemModel.js'

test('primary service price is sufficient for a size without maintenance', () => {
  const values = { priceServicePrimary: '0' }
  assert.deepEqual(standardPricePayload(values, false), { ...values, priceServiceSisterCompany: null })
  assert.deepEqual(createItemPayload({ name: 'Pipe', uom: 'Piece', sizes: [{ size: null, ...values }] }).sizes, [{ size: null, ...values }])
  assert.throws(() => standardPricePayload({ priceServiceSisterCompany: '1' }, false), /required/)
})

test('maintenance prices are required and reactivation uses the existing price version', () => {
  const values = { priceServicePrimary: '100', priceMaintenancePrimary: '40', priceMaintenanceSisterCompany: '0' }
  const fields = { ...values, priceServiceSisterCompany: null, version: 7 }
  assert.deepEqual(standardPricePayload(values, true, { version: 7, isActive: false }), { ...fields, isActive: true })
  assert.deepEqual(standardPricePayload(values, true, { version: 7, isActive: true }), fields)
  assert.throws(() => standardPricePayload({ ...values, priceMaintenancePrimary: null }, true), /required/)
})
