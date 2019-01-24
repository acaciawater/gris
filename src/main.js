import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/js/bootstrap.bundle.js' // for modal dialogs
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faPollH, faFileAlt, faEnvelope, faFilePdf, faExclamationCircle, faEye, faEyeSlash, faSave } from '@fortawesome/free-solid-svg-icons'

import L from 'leaflet'
import axios from 'axios'

Vue.use(BootstrapVue)

library.add(
  faHome,
  faPollH,
  faFileAlt,
  faFilePdf,
  faEnvelope,
  faExclamationCircle,
  faEye,
  faEyeSlash,
  faSave
)
Vue.component('fa-icon', FontAwesomeIcon)

// code below needed for markers to show on map
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
// end of marker code

axios.defaults.baseURL = 'https://rat.acaciadata.com'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
