// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './components/firebase'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueFire)
Vue.use(VueQrcodeReader)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
