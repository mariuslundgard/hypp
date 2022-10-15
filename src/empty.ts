/** @public */
export function empty(elm: HTMLElement): void {
  const len = elm.childNodes.length

  for (let i = len - 1; i >= 0; i -= 1) {
    elm.removeChild(elm.childNodes[i])
  }
}
