import {element, fragment} from './hypp'

describe('element', () => {
  it('should create an element', () => {
    const elm = <div />

    expect(elm.nodeName).toBe('DIV')
  })

  it('should set attributes', () => {
    const elm = <div class="foo" id="bar" data-key="baz" />

    expect(elm.className).toBe('foo')
    expect(elm.id).toBe('bar')
    expect(elm.getAttribute('data-key')).toBe('baz')
  })

  it('should add style (object)', () => {
    const elm = <div style={{color: 'red'}} />

    expect(elm.style.color).toBe('red')
  })

  it('should add style (string)', () => {
    const elm = <div style="color: red;" />

    expect(elm.style.color).toBe('red')
  })
})

describe('fragment', () => {
  it('should create a fragment', () => {
    const frag = <>foo</>

    expect(frag).toBeInstanceOf(DocumentFragment)
    expect(frag.childNodes[0].textContent).toBe('foo')
  })
})
