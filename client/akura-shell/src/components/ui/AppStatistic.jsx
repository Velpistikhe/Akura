import { ArrowDownOutlined, ArrowUpOutlined, Statistic } from '../global'

/**
 * AppStatistic — Wrapper Ant Design Statistic
 *
 * @param {number}  trend     — percentage change (positive=up, negative=down)
 * @param {boolean} showTrend — show the trend indicator (default: true when a trend is provided)
 * @param {string}  trendLabel — label after the trend, e.g. 'from last month'
 */
function AppStatistic({
  trend,
  showTrend = true,
  trendLabel = 'from last month',
  valueStyle = {},
  ...rest
}) {
  const isUp = trend >= 0
  const hasTrend = trend !== undefined && trend !== null && showTrend

  return (
    <div>
      <Statistic
        contentStyle={{
          fontSize: 28,
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          ...valueStyle,
        }}
        {...rest}
      />
      {hasTrend && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 6,
            fontSize: 12,
            fontWeight: 600,
            color: isUp ? '#52c41a' : '#e02020',
          }}
        >
          {isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {Math.abs(trend)}% {trendLabel}
        </div>
      )}
    </div>
  )
}

export default AppStatistic
