import { Button } from '../global'
import './AppButton.css'

/**
 * AppButton — Wrapper Ant Design Button
 *
 * Additional props:
 * @param {'primary'|'danger'|'outline'|'ghost'|'text'|'link'} variant
 *   - 'primary'  : primary navy blue button (default)
 *   - 'danger'   : red accent button
 *   - 'outline'  : border navy, background transparent
 *   - 'ghost'    : transparent with a white border (for dark backgrounds)
 *   - 'text'     : without border or background
 *   - 'link'     : hyperlink style
 * @param {'sm'|'md'|'lg'|'xl'} size  (semantic aliases)
 * All other Ant Design Button props are forwarded (type, htmlType, etc.)
 */
function AppButton({
  variant = 'primary',
  size,
  children,
  className = '',
  ...rest
}) {
  // Map variant → Ant Design props
  const variantProps = {
    primary: { variant: 'primary' },
    danger: { variant: 'primary', isDanger: true },
    outline: { variant: 'default' },
    ghost: { variant: 'default', ghost: true },
    text: { variant: 'text' },
    link: { variant: 'link' },
  }

  // Map size alias → Ant Design size
  const sizeMap = { sm: 'small', md: 'middle', lg: 'large', xl: 'large' }
  const antdSize = sizeMap[size] || size

  return (
    <Button
      size={antdSize}
      className={`app-btn app-btn--${variant} ${size === 'xl' ? 'app-btn--xl' : ''} ${className}`}
      {...(variantProps[variant] || variantProps.primary)}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default AppButton
