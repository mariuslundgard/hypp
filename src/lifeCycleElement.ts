import {getElementClass} from './elementClass'
import {_createRandomString} from './randomString'
import {HyppHooks} from './types'

function createUniqueCustomElementName(prefix = 'x') {
  let key = null

  while (!key) {
    const k = `${prefix}-${_createRandomString()}`

    key = !customElements.get(k) && k
  }

  return key
}

/** @internal */
export function _createLifecycleElement(name: string, hooks: HyppHooks): HTMLElement {
  const ElementClass = getElementClass(name)

  class XElement extends ElementClass {
    static get observedAttributes() {
      return hooks.observedAttributes
    }

    adoptedCallback() {
      hooks.adopt?.()
    }

    attributeChangedCallback(attrName: string, oldValue: unknown, newValue: unknown) {
      hooks.attributeChange?.(attrName, oldValue, newValue)
    }

    connectedCallback() {
      hooks.connect?.()
    }

    disconnectedCallback() {
      hooks.disconnect?.()
    }
  }

  const is = createUniqueCustomElementName()

  customElements.define(is, XElement, {extends: name})

  return document.createElement(name, {is})
}
