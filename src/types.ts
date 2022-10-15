/* eslint-disable @typescript-eslint/ban-ts-comment */

/** @public */
export interface HyppEvents {
  [key: string]: EventListenerOrEventListenerObject
}

/** @public */
export interface HyppHooks {
  adopt?: () => void
  attributeChange?: (name: string, oldValue: unknown, newValue: unknown) => void
  connect?: () => void
  disconnect?: () => void
  observedAttributes?: string[]
}

/** @public */
export interface HyppStyle {
  [key: string]: string
}

/** @public */
// @ts-ignore
export interface HyppProps<E extends HTMLElement | SVGElement> {
  class?: string
  events?: HyppEvents
  hooks?: HyppHooks
  style?: HyppStyle | string
  [prop: string]: unknown
}

/** @public */
export type HyppComponent<E extends HTMLElement | SVGElement> = (props: HyppProps<E>) => E

/** @public */
export type HyppNode = DocumentFragment | HTMLElement | boolean | string | number | undefined | null
