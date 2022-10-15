import {text} from './text'
import {HyppNode} from './types'

/** @public */
export function fragment(children: {children: DocumentFragment} | HyppNode[]): DocumentFragment {
  const frag = document.createDocumentFragment()

  const childrenAsArray: HyppNode[] = Array.isArray(children) ? children : [children.children]

  for (const child of childrenAsArray) {
    if (child === null || child === undefined || child === false) continue // skip

    if (typeof child === 'string') {
      frag.appendChild(text(child))
    } else if (typeof child === 'number') {
      frag.appendChild(text(String(child)))
    } else if (typeof child === 'boolean') {
      frag.appendChild(text('true'))
    } else {
      frag.appendChild(child)
    }
  }

  return frag
}
