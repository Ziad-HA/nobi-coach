import { STATS } from '../data'
import { t } from '../text'
import CountUp from './CountUp'
import { RevealGroup, RevealItem } from './Reveal'

// The big red counters. Used on the home page and on About.
export default function StatsGrid() {
  return (
    <RevealGroup className="stats-grid" stagger={0.16} aria-label={t('stats.aria')}>
      {STATS.map((s) => (
        <RevealItem className="stat" key={s.label}>
          <strong>
            <CountUp to={s.to} suffix={s.suffix} />
          </strong>
          <span>{s.label}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
