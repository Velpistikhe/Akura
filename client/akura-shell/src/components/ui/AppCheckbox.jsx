import { Checkbox } from '../global'

/**
 * AppCheckbox — Wrapper Ant Design Checkbox
 * Styling is defined by the --primary token in index.css.
 * Supports all Ant Design Checkbox props.
 */
function AppCheckbox({ children, ...rest }) {
  return <Checkbox {...rest}>{children}</Checkbox>
}

AppCheckbox.Group = Checkbox.Group

export default AppCheckbox
