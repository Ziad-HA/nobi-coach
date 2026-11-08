import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { copy } from './copy'

const LangContext = createContext(null)

function readLang() {
  try {
    const saved = localStorage.getItem('nobi-lang')
    if (saved === 'ar' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = copy[lang]['meta.title']
    try {
      localStorage.setItem('nobi-lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const t = useCallback(
    (key, vars) => {
      let text = copy[lang][key] ?? copy.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v))
        }
      }
      return text
    },
    [lang],
  )

  // Data objects hold { en, ar } pairs; plain values pass through.
  const pick = useCallback(
    (value) =>
      value && typeof value === 'object' && !Array.isArray(value) && 'en' in value
        ? (value[lang] ?? value.en)
        : value,
    [lang],
  )

  const value = useMemo(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isAr: lang === 'ar',
      setLang,
      toggle: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      t,
      pick,
    }),
    [lang, t, pick],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}

// Renders text with "\n" as line breaks.
export function Lines({ text }) {
  const parts = String(text).split('\n')
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? <br /> : null}
    </Fragment>
  ))
}
