// Both assignment forms need the complete directory supplied in paginated responses.
export async function loadMenuOptions(list, key, filters = {}) {
  const options = []
  let page = 1
  let totalPages
  do {
    const { data } = await list({ ...filters, page, limit: 100 })
    if (!Array.isArray(data?.[key]) || !Number.isInteger(data?.pagination?.totalPages)) {
      throw new Error('Invalid menu directory response.')
    }
    options.push(...data[key])
    totalPages = data.pagination.totalPages
    page += 1
  } while (page <= totalPages)
  return options
}
