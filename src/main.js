import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import ElementUI from 'element-ui'
import "./assets/styles/reset.css"
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$bus=new Vue()

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')