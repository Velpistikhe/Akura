import assert from 'node:assert/strict'
import test from 'node:test'
import { canManageTaxes, canReadTaxes } from '../src/modules/tax/taxModel.js'

test('active Finance and Marketing administrators can manage branch taxes', () => {
  const user = { role: 'ADMIN', isActive: true, officeBranchId: 'branch' }
  for (const section of ['FINANCE', 'MARKETING']) {
    assert.ok(canManageTaxes({ ...user, section }))
    assert.equal(canManageTaxes({ ...user, section, role: 'USER' }), false)
    assert.equal(canManageTaxes({ ...user, section, officeBranchId: null }), false)
  }
  assert.ok(canReadTaxes({ ...user, section: 'ACCOUNTING', role: 'USER' }))
  assert.equal(canManageTaxes({ ...user, section: 'ACCOUNTING' }), false)
  assert.equal(canReadTaxes({ ...user, section: 'FIELD_SERVICE', role: 'USER' }), false)
})
