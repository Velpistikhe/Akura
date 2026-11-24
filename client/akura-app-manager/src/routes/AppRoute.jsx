import { Result } from 'antd'
import MenuModule from '../modules/menu/MenuModule'
import OfficeBranchPage from '../modules/office-branch/OfficeBranchPage'
import UserPage from '../modules/user/UserPage'

const moduleRoutes = {
  menus: MenuModule,
  'office-branches': OfficeBranchPage,
  users: UserPage,
}

function AppRoute({ currentUser, pathname = window.location.pathname }) {
  const moduleKey = pathname.replace(/\/+$/, '').split('/').filter(Boolean).at(-1) || ''
  const Module = moduleRoutes[moduleKey] || MenuModule

  if (!currentUser?.isActive || (Module !== UserPage && currentUser.role !== 'APP_MANAGER')) {
    return <Result status="403" title="Access denied" subTitle="An active app manager account is required to manage menus and branches." />
  }

  return <Module key={`${currentUser.id}:${currentUser.role}:${currentUser.officeBranchId}`} currentUser={currentUser} />
}

export default AppRoute
