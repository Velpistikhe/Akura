import { Card } from '../global'
import './AppCard.css'

/**
 * AppCard — Wrapper Ant Design Card
 *
 * @param {'default'|'glass'|'outlined'|'flat'} variant
 *   - 'default'  : light shadow and thin border (default)
 *   - 'glass'    : glassmorphism for dark backgrounds
 *   - 'outlined' : border only, without shadow
 *   - 'flat'     : solid background without shadow or border
 * @param {boolean} hoverable  — enable the hover lift effect
 */
function AppCard({
  variant = 'default',
  hoverable = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <Card
      variant={variant === 'outlined' ? 'outlined' : 'borderless'}
      className={`app-card app-card--${variant} ${hoverable ? 'app-card--hover' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Card>
  )
}

export default AppCard
