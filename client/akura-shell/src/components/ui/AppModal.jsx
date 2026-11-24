import { Modal } from '../global'
import AppButton from './AppButton'
import './AppModal.css'

/**
 * AppModal — Wrapper Ant Design Modal
 *
 * @param {string}   title
 * @param {'sm'|'md'|'lg'|'xl'|number} size  — modal width preset
 * @param {string}   okText        — confirmation button label
 * @param {string}   cancelText    — cancel button label
 * @param {'primary'|'danger'} okVariant — OK button variant
 * @param {boolean}  loading       — OK button loading state
 */

const SIZE_MAP = { sm: 420, md: 560, lg: 720, xl: 960 }

function AppModal({
  title,
  size = 'md',
  okText = 'Save',
  cancelText = 'Cancel',
  okVariant = 'primary',
  loading = false,
  onOk,
  onCancel,
  children,
  footer,
  className = '',
  ...rest
}) {
  const width = typeof size === 'number' ? size : SIZE_MAP[size] || SIZE_MAP.md

  const defaultFooter =
    footer !== undefined
      ? footer
      : [
          <AppButton key="cancel" variant="outline" onClick={onCancel}>
            {cancelText}
          </AppButton>,
          <AppButton
            key="ok"
            variant={okVariant}
            loading={loading}
            onClick={onOk}
          >
            {okText}
          </AppButton>,
        ]

  return (
    <Modal
      title={
        <span className="app-modal-title">{title}</span>
      }
      width={width}
      footer={defaultFooter}
      onCancel={onCancel}
      onOk={onOk}
      className={`app-modal ${className}`}
      centered
      {...rest}
    >
      {children}
    </Modal>
  )
}

export default AppModal
