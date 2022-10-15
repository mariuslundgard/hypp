/** @vitest-environment jsdom */

import {element, fragment} from 'hypp'
import {describe, expect, test} from 'vitest'

describe('element', () => {
  test('should create an element', () => {
    const elm = <div />

    expect(elm.nodeName).toBe('DIV')
  })

  test('should create a nested element', () => {
    const elm = (
      <div>
        <code>test</code>
      </div>
    )

    expect(elm.outerHTML).toBe('<div><code>test</code></div>')
  })

  test('should set attributes', () => {
    const elm = <div class="foo" id="bar" data-key="baz" />

    expect(elm.className).toBe('foo')
    expect(elm.id).toBe('bar')
    expect(elm.getAttribute('data-key')).toBe('baz')
  })

  test('should add style (object)', () => {
    const elm = <div style={{color: 'red'}} />

    expect(elm.style.color).toBe('red')
  })

  test('should add style (string)', () => {
    const elm = <div style="color: red;" />

    expect(elm.style.color).toBe('red')
  })
})

describe('fragment', () => {
  test('should create a fragment', () => {
    const frag = <>foo</>

    expect(frag).toBeInstanceOf(DocumentFragment)
    expect(frag.childNodes[0].textContent).toBe('foo')
  })
})
