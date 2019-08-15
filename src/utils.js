export { default as xor } from 'lodash/xor'
export { default as isEmpty } from 'lodash/isEmpty'
export { default as omit } from 'lodash/omit'
export { default as isEqual } from 'lodash/isEqual'
export { default as isFunction } from 'lodash/isFunction'

export const getDisplayName = component => {
  return component.displayName || component.name || 'Component'
}
