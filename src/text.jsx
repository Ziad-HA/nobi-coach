import { Fragment } from 'react'
import { copy } from './copy'

// Looks up page text by key. {n}, {p} ... are filled in from `vars`.
export function t(key, vars) {
  let text = copy[key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v))
    }
  }
  return text
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
