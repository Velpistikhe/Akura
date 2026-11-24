import { Form } from '../global'

/**
 * AppForm — Wrapper Ant Design Form
 * Default layout and styling are defined here for consistency across the app.
 */
function AppForm({ children, layout = 'vertical', size = 'large', ...rest }) {
  return (
    <Form layout={layout} size={size} {...rest}>
      {children}
    </Form>
  )
}

/**
 * AppFormItem — Wrapper Ant Design Form.Item
 * Forward all props while centralizing default styling.
 */
function AppFormItem({ children, ...rest }) {
  return <Form.Item {...rest}>{children}</Form.Item>
}

AppForm.Item = AppFormItem
AppForm.useForm = Form.useForm
AppForm.useWatch = Form.useWatch
AppForm.Provider = Form.Provider

export { AppFormItem }
export default AppForm
