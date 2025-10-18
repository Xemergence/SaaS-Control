import * as React from 'react'
import * as ReactDOM from 'react-dom'

declare global {
  interface Window {
    __REACT_HEALTH__?: any
  }
}

export function logReactHealth(tag: string = 'startup') {
  const info = {
    tag,
    reactVersion: (React as any)?.version,
    reactDOMVersion: (ReactDOM as any)?.version,
    dispatcherIsNull: !(React as any)?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentDispatcher,
  }
  // Expose for quick inspection in devtools / tempo preview
  if (typeof window !== 'undefined') {
    window.__REACT_HEALTH__ = info
  }
  // eslint-disable-next-line no-console
  console.log('[react-health]', info)
  return info
}

