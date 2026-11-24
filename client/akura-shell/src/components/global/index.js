// Ant Design adapter boundary. All wrappers and application modules import
// UI dependencies from this file to isolate Ant Design upgrades.
export * from './AntdComponents'
export { message, notification, theme } from 'antd'

export { default as enUS } from 'antd/locale/en_US'

export {
  ApiOutlined,
  AppstoreOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  BarChartOutlined,
  BellOutlined,
  MoonOutlined,
  SunOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloudOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  EyeOutlined,
  FileTextOutlined,
  FolderOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusCircleOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UserAddOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons'
export { useSaveConfirmation } from './useSaveConfirmation'
