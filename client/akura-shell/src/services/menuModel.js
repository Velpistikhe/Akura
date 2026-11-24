// Keep legacy API menu keys compatible with the canonical frontend routes.
export function normalizeApplicationMenus(menus) {
  if (!Array.isArray(menus)) return []
  return menus.map((menu) => {
    const key = String(menu.key || '').trim().replace(/^\/+|\/+$/g, '')
    return key === 'referensi' ? { ...menu, key: 'reference' } : menu
  })
}
