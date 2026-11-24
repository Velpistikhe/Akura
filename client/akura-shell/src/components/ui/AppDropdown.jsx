import { Dropdown } from '../global'

/**
 * AppDropdown — Wrapper Ant Design Dropdown
 *
 * Default: placement bottomRight, trigger click.
 * All props are forwarded to Ant Design Dropdown.
 */
function AppDropdown({
  placement = 'bottomRight',
  trigger = ['click'],
  children,
  ...rest
}) {
  return (
    <Dropdown placement={placement} trigger={trigger} {...rest}>
      {children}
    </Dropdown>
  )
}

export default AppDropdown
