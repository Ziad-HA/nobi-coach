import { t } from '../text'

// One before/after photo. Extra client details only show when they are filled in
// in src/data.js, so nothing is ever invented.
export default function TransformCard({ item, index, detailed = false, onOpen }) {
  const n = String(index + 1).padStart(2, '0')
  const title = item.name ? item.name : `${t('tf.n')} ${n}`

  const details = []
  if (item.age) details.push([t('tfp.d.age'), String(item.age)])
  if (item.weeks) details.push([t('tfp.d.duration'), t('tfp.weeks', { n: item.weeks })])
  if (item.startKg && item.endKg) {
    details.push([
      t('tfp.d.weight'),
      `${item.startKg} → ${item.endKg} ${t('tfp.kg')}`,
    ])
  }
  if (item.program) details.push([t('tfp.d.program'), item.program])

  const image = (
    <>
      <img src={item.src} alt={`${t('tf.alt')} ${index + 1}`} loading="lazy" />
      {detailed ? (
        <span className="ba-flags" aria-hidden="true">
          <span>{t('tf.before')}</span>
          <span>{t('tf.after')}</span>
        </span>
      ) : null}
    </>
  )

  return (
    <figure className={detailed ? 'transform detailed' : 'transform'}>
      {onOpen ? (
        <button
          type="button"
          className="transform-open"
          onClick={() => onOpen(index)}
          aria-label={`${t('tfp.view')} — ${title}`}
        >
          {image}
        </button>
      ) : (
        <div className="transform-open">{image}</div>
      )}
      <figcaption>
        <span className="transform-title">{title}</span>
        {!detailed ? (
          <span className="ba">
            {t('tf.before')} / {t('tf.after')}
          </span>
        ) : null}
      </figcaption>
      {detailed && details.length ? (
        <dl className="transform-data">
          {details.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </figure>
  )
}
