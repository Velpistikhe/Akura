export const priceFields = [
  ['priceServicePrimary', 'Primary Service'],
  ['priceServiceSisterCompany', 'Sister Service'],
  ['priceMaintenancePrimary', 'Primary Maintenance'],
  ['priceMaintenanceSisterCompany', 'Sister Maintenance'],
]

export const isRequiredPrice = (key, hasMaintenance) => key === 'priceServicePrimary'
  || (hasMaintenance && ['priceMaintenancePrimary', 'priceMaintenanceSisterCompany'].includes(key))

export function standardPricePayload(values, hasMaintenance, price) {
  const payload = {}
  for (const [key] of priceFields) {
    if (!hasMaintenance && key.startsWith('priceMaintenance')) continue
    const value = values[key]
    if (value == null || value === '') {
      if (isRequiredPrice(key, hasMaintenance)) throw new Error('Enter the required standard prices.')
      payload[key] = null
    } else {
      payload[key] = String(value)
    }
  }
  if (price) {
    payload.version = price.version
    if (price.isActive === false) payload.isActive = true
  }
  return payload
}

export function createItemPayload(values) {
  const sizes = (values.sizes || []).map((entry) => ({
    size: entry.size === null ? null : entry.size.trim(),
    ...Object.fromEntries(priceFields
      .filter(([key]) => entry[key] !== undefined && entry[key] !== null && entry[key] !== '')
      .map(([key]) => [key, entry[key]])),
  }))
  if (sizes.length > 1 && sizes.some(({ size }) => size === null)) {
    throw new Error('A variant without a size cannot be combined with other sizes.')
  }
  return {
    ...(values.serviceId ? { serviceId: values.serviceId } : {
      // Swagger CreateItemRequest: a standalone item accepts inspectionScopes only.
      inspectionScopes: (values.inspectionScopes || []).map((scope) => scope.trim()),
    }),
    name: values.name.trim(),
    uom: values.uom.trim(),
    sizes,
  }
}
