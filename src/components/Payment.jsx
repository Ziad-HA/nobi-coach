import { useState } from 'react'
import { CHAT_TO, PAYMENT } from '../config'
import { t } from '../text'
import { RevealGroup, RevealItem } from './Reveal'
import SplitText from './SplitText'

const METHODS = [
  { id: 'instapay', title: 'Instapay', value: PAYMENT.instapay, desc: 'pay.insta.desc' },
  { id: 'vodafone', title: 'Vodafone Cash', value: PAYMENT.vodafoneCash, desc: 'pay.voda.desc' },
  { id: 'telda', title: 'Telda', value: PAYMENT.telda, desc: 'pay.telda.desc' },
  { id: 'fawry', title: 'Fawry', value: '', soon: true, desc: 'pay.fawry.desc' },
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-btn ${copied ? 'copied' : ''}`}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  )
}

export default function Payment() {
  return (
    <section className="section" id="payment">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('pay.eyebrow')}</p>
          <SplitText text={t('pay.title')} />
          <p className="lede muted" style={{ marginTop: '1rem' }}>
            {t('pay.sub')}
          </p>
        </div>
      </div>

      <RevealGroup className="pay-grid" stagger={0.12}>
        {METHODS.map((m) => (
          <RevealItem as="article" className="pay-card" key={m.id}>
            <h3>{m.title}</h3>
            <div className="pay-code-row">
              <p className={m.soon ? 'pay-code soon' : 'pay-code'}>
                {m.soon ? t('pay.soon') : m.value || t('pay.ask')}
              </p>
              {!m.soon && m.value ? <CopyButton text={m.value} /> : null}
            </div>
            <p className="muted">{t(m.desc)}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <RevealGroup className="pay-out" stagger={0.14}>
        <RevealItem className="pay-out-title">
          <svg className="icon pay-globe" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
          </svg>
          <h3>{t('pay.out.title')}</h3>
        </RevealItem>
        <RevealItem className="pay-out-info">
          <p className="pay-via">{t('pay.out.via')}</p>
          {PAYMENT.tapPhone ? (
            <p>
              {t('pay.out.phone')}{' '}
              <span className="pay-code-inline">
                <span className="pay-code">{PAYMENT.tapPhone}</span>
                <CopyButton text={PAYMENT.tapPhone} />
              </span>
            </p>
          ) : null}
          {PAYMENT.fullName ? (
            <p>
              {t('pay.out.name')} <strong>{PAYMENT.fullName}</strong>
            </p>
          ) : null}
        </RevealItem>
        <RevealItem className="pay-or">{t('pay.or')}</RevealItem>
        <RevealItem className="pay-out-alt">
          <p className="muted">{t('pay.out.alt')}</p>
          <a className="pay-wa" href={CHAT_TO} target="_blank" rel="noreferrer">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5Z" />
            </svg>
            {t('pay.contact')}
          </a>
        </RevealItem>
      </RevealGroup>
      <p className="pay-after muted">{t('pay.after')}</p>
    </section>
  )
}