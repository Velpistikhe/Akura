import { useEffect, useMemo, useRef, useState } from 'react'
import { App, Button, Card, Form, Input, InputNumber, Modal, Select, Switch, Table, Typography } from '../../components/global'
import { PlusOutlined } from '@ant-design/icons'
import { workOrderService } from '../../services/workOrderService'
import { canCreateWorkOrders, inspectorOptions, MAX_QUANTITY, WORK_ORDER_REPORT_DATES, workOrderCreateComplete, workOrderCreatePayload } from './workOrderModel'
import WorkOrderCompanySelect from './WorkOrderCompanySelect'
import WorkOrderCatalogPicker from './WorkOrderCatalogPicker'

const quotationLabel = (quotation) => `${quotation.no ?? 'Draft'}${quotation.numberYear ? `/${quotation.numberYear}` : ''} — ${quotation.subject || 'Quotation'}`
const itemLabel = (item) => `${item.itemName || 'Item'}${item.size ? ` — ${item.size}` : ''}`

export default function WorkOrderCreate({ currentUser, onCreated }) {
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const defaultBasis = canCreateWorkOrders(currentUser) ? 'company' : 'quotation'
  const [basis, setBasis] = useState(defaultBasis)
  const [company, setCompany] = useState(null)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [quotations, setQuotations] = useState([])
  const [quotation, setQuotation] = useState(null)
  const [quotationDetail, setQuotationDetail] = useState(null)
  const [inspectors, setInspectors] = useState([])
  const [itemRows, setItemRows] = useState([])
  const [loadingOptions, setLoadingOptions] = useState(false)
  const [optionsReady, setOptionsReady] = useState(false)
  const [loadingQuotation, setLoadingQuotation] = useState(false)
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [retry, setRetry] = useState(0)
  const lock = useRef(false)
  const canCreate = canCreateWorkOrders(currentUser, basis)
  const watchedStartDate = Form.useWatch('startDate', form)
  const watchedEndDate = Form.useWatch('endDate', form)
  const watchedInspectors = Form.useWatch('inspectors', form) || []
  const selectedCount = useMemo(() => itemRows.filter((item) => item.selected).length, [itemRows])
  const complete = Boolean(basis === 'quotation' ? quotationDetail : company)
    && workOrderCreateComplete({ basis, startDate: watchedStartDate, endDate: watchedEndDate, inspectors: watchedInspectors }, selectedCount)

  useEffect(() => {
    if (!open) return undefined
    let active = true
    setLoadingOptions(true)
    setOptionsReady(false)
    setError('')
    setInspectors([])
    Promise.all([basis === 'quotation' ? workOrderService.quotations() : Promise.resolve({ data: { quotations: [] } }), workOrderService.inspectors(currentUser?.officeBranchId)])
      .then(([quotationResponse, inspectorResponse]) => {
        if (!active) return
        setQuotations(quotationResponse?.data?.quotations || [])
        setInspectors(inspectorOptions(inspectorResponse))
        setOptionsReady(true)
      })
      .catch((err) => { if (active) setError(err?.message || 'Unable to load quotations and inspectors.') })
      .finally(() => { if (active) setLoadingOptions(false) })
    return () => { active = false }
  }, [open, basis, retry, currentUser?.officeBranchId])

  useEffect(() => {
    setQuotationDetail(null)
    if (!open || basis !== 'quotation' || !quotation?.id) {
      setLoadingQuotation(false)
      return undefined
    }
    let active = true
    setLoadingQuotation(true)
    setError('')
    setItemRows([])
    workOrderService.quotationItems(quotation.id)
      .then(({ data }) => {
        if (!active) return
        const detail = data
        if (!detail?.id || detail.id !== quotation.id) throw new Error('Invalid quotation data.')
        if (!detail.isActive || detail.status !== 'APPROVED' || detail.hasWorkOrder || detail.workOrderId) throw new Error('Quotation is no longer available for a work order. Reload the quotations and try again.')
        setQuotationDetail(detail)
        setItemRows((detail.items || []).filter((item) => item.isActive !== false).map((item) => ({ ...item, selected: false,
          quantityInspection: item.quantityInspection ?? '0', quantityMaintenance: item.quantityMaintenance ?? '0' })))
      })
      .catch((err) => { if (active) setError(err?.message || 'Unable to load quotation items.') })
      .finally(() => { if (active) setLoadingQuotation(false) })
    return () => { active = false }
  }, [open, basis, quotation?.id, retry])

  const openModal = () => {
    form.resetFields()
    setBasis(defaultBasis)
    setCompany(null)
    setCatalogOpen(false)
    setQuotation(null)
    setQuotationDetail(null)
    setItemRows([])
    setError('')
    setSubmitError('')
    setOpen(true)
  }
  const closeModal = () => { if (!saving) { setCatalogOpen(false); setOpen(false) } }
  const updateItem = (itemSizeId, updates) => setItemRows((rows) => rows.map((item) => item.itemSizeId === itemSizeId ? { ...item, ...updates } : item))
  const submit = async (values) => {
    if (!canCreate || lock.current || !optionsReady || loadingOptions || loadingQuotation || (basis === 'quotation' ? !quotationDetail : !company)) return
    lock.current = true
    setSaving(true)
    setSubmitError('')
    try {
      const payload = workOrderCreatePayload({ ...values, basis }, { quotation: quotationDetail, company, items: itemRows, quotationItems: quotationDetail?.items })
      const inspectorNames = new Set(inspectors.map((option) => option.value))
      if (payload.inspectors.some((name) => !inspectorNames.has(name))) throw new Error('Select inspectors from the current branch directory.')
      const { data } = await (basis === 'quotation' ? workOrderService.createFromQuotation(payload) : workOrderService.create(payload))
      const workOrder = basis === 'quotation' ? data.workOrder : data
      message.success(`Work order ${workOrder.number} created successfully.`)
      setOpen(false)
      onCreated?.(workOrder)
    } catch (err) {
      setSubmitError(err?.message || 'Unable to create the work order.')
      if ([404, 409].includes(err?.status)) setRetry((value) => value + 1)
    } finally {
      lock.current = false
      setSaving(false)
    }
  }
  if (!canCreate) return null

  return <>
    <Button variant="primary" icon={<PlusOutlined />} onClick={openModal}>Create Work Order</Button>
    <Modal title="Create Work Order" visible={open} width={1000} onOk={() => form.submit()} okText="Create Work Order"
      busy={saving} okButtonProps={{ disabled: saving || !optionsReady || loadingOptions || loadingQuotation || !complete }}
      onCancel={closeModal} closable={!saving} maskClosable={!saving} keyboard={!saving} cancelButtonProps={{ disabled: saving }} unmountOnClose>
      <Form form={form} layout="vertical" initialValues={{ officialReport: false }} onFinish={submit} disabled={saving || loadingOptions || loadingQuotation}>
        <div className="work-order-grid">
          <Form.Item label="Work Order Basis"><Select value={basis} options={[{ value: 'company', label: 'Standalone (Company)' }, { value: 'quotation', label: 'Quotation' }].filter((option) => canCreateWorkOrders(currentUser, option.value))}
            onChange={(value) => { setBasis(value); setQuotation(null); setQuotationDetail(null); setCompany(null); setItemRows([]); setError(''); setSubmitError(''); form.resetFields() }} /></Form.Item>
          <Form.Item label="Status"><Input value="DRAFT" disabled /></Form.Item>
          {basis === 'quotation' ? <Form.Item label="Quotation" required>
            <Select showSearch optionFilterProp="label" loading={loadingOptions} placeholder="Select an approved quotation"
              value={quotation?.id} options={quotations.map((row) => ({ value: row.id, label: quotationLabel(row) }))}
              onChange={(id) => { setQuotation(quotations.find((row) => row.id === id) || null); setQuotationDetail(null); setItemRows([]); setError('') }} />
          </Form.Item> : <>
            <Form.Item label="Company" required><WorkOrderCompanySelect value={company} disabled={saving || loadingOptions}
              onChange={(value) => { setCompany(value); form.setFieldValue('contractId', undefined) }} /></Form.Item>
            <Form.Item name="contractId" label="Contract (Optional)"><Select allowClear disabled={saving || loadingOptions || !company?.contract} placeholder="No contract"
              options={company?.contract ? [{ value: company.contract.id, label: company.contract.contractNumber }] : []} /></Form.Item>
          </>}
          <Form.Item name="subject" label="Subject" rules={[{ required: basis === 'company', whitespace: true, max: 255 }]}><Input maxLength={255} placeholder={basis === 'quotation' ? quotationDetail?.subject : undefined} /></Form.Item>
          <Form.Item name="officialReport" label="Official Report" valuePropName="checked" rules={[{ required: basis === 'company', type: 'boolean' }]}><Switch aria-label="Official report required" activeLabel="Required" inactiveLabel="Not required" /></Form.Item>
          <Form.Item name="poNumber" label="PO Number" rules={[{ required: basis === 'company', whitespace: true, max: 100 }]}><Input maxLength={100} placeholder={basis === 'quotation' ? 'Pending' : undefined} /></Form.Item>
          {WORK_ORDER_REPORT_DATES.map(([key, label]) => <Form.Item key={key} name={key} label={label} rules={[{ required: basis === 'company' }]}><Input type="date" /></Form.Item>)}
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Start date is required.' }]}><Input type="date" /></Form.Item>
          <Form.Item name="endDate" label="End Date" dependencies={['startDate']} rules={[
            { required: basis === 'quotation', message: 'End date is required for a quotation.' },
            ({ getFieldValue }) => ({ validator: (_, value) => !value || !getFieldValue('startDate') || value >= getFieldValue('startDate') ? Promise.resolve() : Promise.reject(new Error('End date must be on or after the start date.')) }),
          ]}><Input type="date" /></Form.Item>
        </div>
        <Form.Item name="inspectors" label="Inspectors" rules={[{ required: true, type: 'array', min: 1, message: 'Select at least one inspector.' }]}>
          <Select mode="multiple" maxCount={100} loading={loadingOptions} options={inspectors} placeholder="Select inspectors" />
        </Form.Item>

        <Card title={`Work Order Items${itemRows.length ? ` (${selectedCount} selected)` : ''}`} bordered variant="outlined"
          extra={basis === 'company' && <Button disabled={saving || loadingOptions} onClick={() => setCatalogOpen(true)}>Add Catalog Items</Button>}>
          <Typography.Text tone="secondary">Select items and enter inspection and maintenance quantities.</Typography.Text>
          <Table rowKey="itemSizeId" busy={loadingQuotation} dataSource={itemRows} pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 50] }}
            scroll={{ x: 900 }} locale={{ emptyText: basis === 'company' ? 'Add items from the catalog.' : quotation ? 'This quotation has no active items.' : 'Select a quotation to load items.' }}
            columns={[
              { title: 'Select', width: 80, render: (_, item) => <input aria-label={`Select ${item.itemName}`} type="checkbox" checked={item.selected} disabled={saving || loadingOptions || loadingQuotation}
                onChange={(event) => updateItem(item.itemSizeId, { selected: event.target.checked })} /> },
              { title: 'Service', dataIndex: 'serviceName', width: 180, render: (value) => value || 'Standalone' },
              { title: 'Item', dataIndex: 'itemName', width: 200, render: (_, item) => itemLabel(item) },
              { title: 'Type', dataIndex: 'serviceType', width: 100, render: (value) => value || '-' },
              { title: 'Inspection Quantity', width: 155, render: (_, item) => <InputNumber aria-label={`Inspection quantity for ${item.itemName}`} min={0} max={MAX_QUANTITY} precision={3}
                stringMode value={item.quantityInspection} disabled={saving || !item.selected} onChange={(value) => updateItem(item.itemSizeId, { quantityInspection: value })} style={{ width: 130 }} /> },
              { title: 'Maintenance Quantity', width: 170, render: (_, item) => <InputNumber aria-label={`Maintenance quantity for ${item.itemName}`} min={0} max={MAX_QUANTITY} precision={3}
                stringMode value={item.quantityMaintenance} disabled={saving || !item.selected} onChange={(value) => updateItem(item.itemSizeId, { quantityMaintenance: value })} style={{ width: 140 }} /> },
            ]} />
        </Card>
      </Form>
      {error && <div role="alert" style={{ marginTop: 12 }}>{error} <Button disabled={loadingOptions} onClick={() => { setError(''); setLoadingOptions(true); setRetry((value) => value + 1) }}>Try Again</Button></div>}
      {submitError && <div role="alert" style={{ marginTop: 12 }}>{submitError}</div>}
      {catalogOpen && <WorkOrderCatalogPicker excludedIds={itemRows.map((item) => item.itemSizeId)} onClose={() => setCatalogOpen(false)}
        onAdd={(items) => {
          setItemRows((current) => {
            const ids = new Set(current.map((item) => item.itemSizeId))
            return [...current, ...items.filter((item) => !ids.has(item.itemSizeId))]
          })
          setCatalogOpen(false)
        }} />}
    </Modal>
  </>
}

