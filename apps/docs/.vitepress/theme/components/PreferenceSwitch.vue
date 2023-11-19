<script setup lang="ts">
import { VTSwitch, VTIconChevronDown } from '@leafphp/docs-theme'
import { useRoute } from 'vitepress'
import { inject, onMounted, Ref } from 'vue'
import {
  preferFunctionalKey,
  preferFunctional,
  preferSFCKey,
  preferSFC
} from './preferences'

onMounted(() => {
  if (typeof localStorage === 'undefined') {
    return
  }

  if (!localStorage.getItem(preferFunctionalKey)) {
    document.documentElement.classList.add('prefer-functional')
  }

})

const route = useRoute()
const show = $computed(() =>
  /^\/(guide|docs|tutorial|examples|modules)\//.test(route.path) && !/^\/(docs\/tooling\/functions|docs\/config\/settings|modules\/db\/v\/1|modules\/http\/v\/2\/headers|modules\/date|modules\/fs|docs\/tooling\/testing)\//.test(route.path.replace('.html', '/'))
)
const showFullText = $computed(() =>
  /^\/(tutorial|examples)\//.test(route.path)
)
// const showSFC = $computed(() => !/^\/guide|docs/.test(route.path))
const showSFC = false

let isOpen = $ref(true)

const toggleOpen = () => {
  isOpen = !isOpen
}

const removeOutline = (e: Event) => {
  ; (e.target as HTMLElement).classList.add('no-outline')
}

const restoreOutline = (e: Event) => {
  ; (e.target as HTMLElement).classList.remove('no-outline')
}

const toggleFunctionalMode = useToggleFn(
  preferFunctionalKey,
  preferFunctional,
  'prefer-functional'
)
const toggleSFC = useToggleFn(preferSFCKey, preferSFC, 'prefer-sfc')
const closeSideBar = inject('close-sidebar') as () => void

function useToggleFn(
  storageKey: string,
  state: Ref<boolean>,
  className: string
) {
  if (typeof localStorage === 'undefined') {
    return () => { }
  }
  const classList = document.documentElement.classList
  return (value = !state.value) => {
    if ((state.value = value)) {
      classList.add(className)
    } else {
      classList.remove(className)
    }
    localStorage.setItem(storageKey, String(state.value))
  }
}
</script>

<template>
  <div v-if="show" class="preference-switch">
    <button class="toggle" aria-label="preference switches toggle" aria-controls="preference-switches"
      :aria-expanded="isOpen" @click="toggleOpen" @mousedown="removeOutline" @blur="restoreOutline">
      <span>Style Preference</span>
      <VTIconChevronDown class="vt-link-icon" :class="{ open: isOpen }" />
    </button>
    <div id="preference-switches" :hidden="!isOpen" :aria-hidden="!isOpen">
      <div class="switch-container">
        <label class="options-label w:_10" @click="toggleFunctionalMode(false)">Classes</label>
        <VTSwitch class="api-switch" aria-label="prefer functional mode" :aria-checked="preferFunctional"
          @click="toggleFunctionalMode()" />
        <label class="composition-label" @click="toggleFunctionalMode(true)">Functions</label>
        <a class="switch-link" title="About API preference" href="/docs/introduction/#class-mode-vs-functional-mode"
          @click="closeSideBar">?</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
html.prefer-functional .composition-label,
html:not(.prefer-functional) .options-label {
  color: var(--vt-c-green);
}

html.prefer-functional .options-label,
html:not(.prefer-functional) .composition-label {
  color: var(--vt-c-text-1);
}

.preference-switch {
  font-size: 12px;
  border-bottom: 1px solid var(--vt-c-divider-light);
  transition: border-color 0.5s, background-color 0.5s ease;
  margin-bottom: 20px;
  position: sticky;
  top: -0.5px;
  background-color: var(--vt-c-bg);
  padding-top: 10px;
  z-index: 10;
}

.toggle {
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  width: 100%;
  font-weight: 600;
}

.toggle:hover {
  color: var(--vt-c-text-1);
}

.no-outline {
  outline: 0;
}

.vt-link-icon {
  position: relative;
  top: 1px;
}

.vt-link-icon.open {
  transform: rotate(180deg);
}

#preference-switches {
  padding: 12px 16px;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
  margin: 6px 0 12px;
  border-radius: 8px;
  font-weight: 600;
}

.switch-container {
  display: flex;
  align-items: center;
}

.switch-container:nth-child(2) {
  margin-top: 10px;
}

.vt-switch {
  margin-right: 5px;
  transform: scale(0.8);
}

.switch-container label {
  transition: color 0.5s;
  cursor: pointer;
}

.switch-container label:first-child {
  width: 50px;
}

.switch-link {
  margin-left: 8px;
  font-size: 11px;
  min-width: 14px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  color: #5e8f3c;
  border: 1px solid #5e8f3c;
  border-radius: 50%;
}

@media (max-width: 1439px) {
  #preference-switches {
    font-size: 11px;
    padding: 8px 12px;
  }

  .switch-container label:first-child {
    width: 46px;
  }
}
</style>

<style>
.functional-mode,
.sfc {
  display: none;
}

.prefer-functional .class-mode,
.prefer-sfc .html {
  display: none;
}

/* body:not(.prefer-functional) .functional-mode {
  display: none;
} */

.prefer-functional .functional-mode,
.prefer-sfc .sfc {
  display: initial;
}

.prefer-functional .api-switch .vt-switch-check {
  transform: translateX(18px);
}

.composition-label,
.sfc-label,
.prefer-functional .options-label w:_10,
.prefer-sfc .no-sfc-label {
  color: var(--vt-c-text-3);
}

.prefer-functional .composition-label,
.prefer-sfc .sfc-label {
  color: var(--vt-c-text-1);
}

.prefer-sfc .sfc-switch .vt-switch-check {
  transform: translateX(18px);
}

.tip .class-mode,
.tip .functional-mode {
  color: var(--vt-c-text-code);
  /* transition: color 0.5s; */
  font-weight: 600;
}
</style>
