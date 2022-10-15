/** @internal */
export function _addEvents(
  elm: HTMLElement,
  events: Record<string, EventListenerOrEventListenerObject>
): void {
  for (const [eventType, eventListener] of Object.entries(events)) {
    elm.addEventListener(eventType, eventListener)
  }
}
