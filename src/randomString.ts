const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz'

/** @internal */
export function _createRandomString(len = 5): string {
  let str = ''

  for (let i = 0; i < len; i += 1) {
    str += LOWER_CASE.charAt(Math.floor(Math.random() * LOWER_CASE.length))
  }

  return str
}
