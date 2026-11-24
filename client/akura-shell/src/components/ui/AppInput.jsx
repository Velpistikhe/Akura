import { Input } from '../global'

/**
 * AppInput — Wrapper Ant Design Input
 *
 * @param {'text'|'password'|'textarea'} inputType
 * @param {ReactNode} prefixIcon  — icon on the left
 * All Ant Design Input props are forwarded.
 */
function AppInput({ inputType = 'text', prefixIcon, prefix, ...rest }) {
  const resolvedPrefix = prefixIcon ? (
    <span style={{ color: 'var(--text-muted)', marginRight: 2 }}>{prefixIcon}</span>
  ) : prefix

  if (inputType === 'password') {
    return (
      <Input.Password
        prefix={resolvedPrefix}
        className="app-input"
        {...rest}
      />
    )
  }

  if (inputType === 'textarea') {
    return <Input.TextArea className="app-input" {...rest} />
  }

  return <Input prefix={resolvedPrefix} className="app-input" {...rest} />
}

export default AppInput
