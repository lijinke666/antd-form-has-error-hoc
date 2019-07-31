export { default as xor } from 'lodash/xor'
export { default as isEmpty } from 'lodash/xor'
export { default as omit } from 'lodash/xor'

export const getDisplayName = component => {
  return component.displayName || component.name || 'Component'
}
