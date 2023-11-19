import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@leafphp/docs-theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import {
  preferFunctional,
  preferSFC,
  filterHeadersByPreference
} from './components/preferences'
import SponsorsAside from './components/SponsorsAside.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
// import VueJobs from './components/VueJobs.vue'
// import Banner from './components/Banner.vue'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(VPTheme.Layout, null, {
      // banner: () => h('div', {}, [
      //   h(Banner),
      // ]),
      'sidebar-top': () => h(PreferenceSwitch),
      'aside-mid': () => h(SponsorsAside),
      // 'aside-bottom': () => h(VueJobs)
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.provide('prefer-functional', preferFunctional)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('VueSchoolLink', VueSchoolLink)
  }
})
