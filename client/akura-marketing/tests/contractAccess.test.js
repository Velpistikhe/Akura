import assert from 'node:assert/strict'
import test from 'node:test'
import { canApproveContract, canRejectContract, canReviseContract, canSubmitContract } from '../src/modules/company/contractAccess.js'

test('contract submission accepts drafts and rejected contracts from Marketing', () => {
  for (const role of ['ADMIN', 'USER']) {
    for (const status of ['DRAFT', 'REJECTED']) assert.ok(canSubmitContract({ section: 'MARKETING', role }, { status }))
  }
  assert.equal(canSubmitContract({ section: 'MARKETING', role: 'APP_MANAGER' }, { status: 'DRAFT' }), false)
  assert.equal(canSubmitContract({ section: 'MARKETING', role: 'USER' }, { status: 'DRAFT', hasList: false }), false)
  assert.equal(canSubmitContract({ section: 'FINANCE', role: 'ADMIN' }, { status: 'DRAFT' }), false)
})

test('expiry prevents approval while rejection and revision follow the stored status', () => {
  const admin = { section: 'MARKETING', role: 'ADMIN' }
  const contract = { status: 'SUBMITTED', effectiveUntil: '2026-11-21' }
  assert.equal(canApproveContract(admin, contract, '2026-11-21'), false)
  assert.ok(canApproveContract(admin, contract, '2026-11-20'))
  assert.ok(canRejectContract(admin, contract))
  assert.ok(canReviseContract(admin, { ...contract, status: 'APPROVED' }, '2026-11-20'))
  assert.equal(canReviseContract(admin, { ...contract, status: 'APPROVED' }, '2026-11-21'), false)
})
