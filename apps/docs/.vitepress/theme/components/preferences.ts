import { Header } from 'vitepress'
import { ref } from 'vue'

const hasStorage = typeof localStorage !== 'undefined'
const get = (key: string, defaultValue = false): boolean =>
  hasStorage
    ? JSON.parse(localStorage.getItem(key) || String(defaultValue))
    : defaultValue

export const preferFunctionalKey = 'vue-docs-prefer-functional'
export const preferFunctional = ref(get(preferFunctionalKey))

export const preferSFCKey = 'vue-docs-prefer-sfc'
export const preferSFC = ref(get(preferSFCKey, true))

export function filterHeadersByPreference(h: Header) {
  return preferFunctional.value ? !h.optionsOnly : !h.compositionOnly
}
