import {_addEvents} from './events'
import {fragment} from './fragment'
import {_createLifecycleElement} from './lifeCycleElement'
import {_addStyle} from './style'
import {HyppComponent, HyppEvents, HyppNode, HyppProps, HyppStyle} from './types'

/**
 * `element` creates a DOM element.
 *
 * Note that `element` is a JSX-compatible:
 * ```tsx
 * // @jsx element
 * import {element} from 'hypp'
 *
 * // Create an element using hypp’s `element`
 * const el = (
 *   <button>
 *     <code>Hello</code>
 *   </button>
 * )
 *
 * // Inspect the element
 * console.log(el) // HTMLButtonElement
 *
 * // Render by mounting to body element
 * document.body.appendChild(el)
 * ```
 *
 * @public
 */
export function element(
  type: string | HyppComponent<HTMLElement>,
  props: HyppProps<HTMLElement> | null,
  ...children: HyppNode[]
): HTMLElement {
  if (typeof type === 'function') {
    return type({...props, children: fragment(children)})
  }

  const elm = props?.hooks
    ? _createLifecycleElement(type, props?.hooks)
    : document.createElement(type)

  for (const [attrKey, attrValue] of Object.entries(props || {})) {
    if (attrKey === 'events') {
      _addEvents(elm, attrValue as HyppEvents)
    } else if (attrKey === 'style') {
      _addStyle(elm, attrValue as HyppStyle)
    } else {
      elm.setAttribute(attrKey, String(attrValue))
    }
  }

  elm.appendChild(fragment(children))

  return elm
}
