import {HyppStyle} from './types'

/** @internal */
export function _addStyle(elm: HTMLElement, style: HyppStyle | string): void {
  if (typeof style === 'string') {
    elm.setAttribute('style', style)
  } else {
    for (const [propName, propValue] of Object.entries(style)) {
      elm.style.setProperty(propName, propValue)
    }
  }
}
