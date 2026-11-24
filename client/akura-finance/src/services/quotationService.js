import { apiRequest } from './api'

const PATH = '/marketing/quotation-references'
// Finance deliberately exposes only the documented read operations.
export const quotationService = {
  list: ({ page, limit }, { signal } = {}) => apiRequest(`/marketing/quotations?${new URLSearchParams({
    page, limit, status: 'APPROVED', isActive: true,
  })}`, { method: 'GET', signal }),
  get: (id, { signal } = {}) => apiRequest(`${PATH}/${encodeURIComponent(id)}`, { method: 'GET', signal }),
}
