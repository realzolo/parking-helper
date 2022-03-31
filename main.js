import App from './App'
import Dialog from './wxcomponents/vant/dist/dialog/dialog';
import Toast from './wxcomponents/vant/dist/toast/toast';
import Notify from './wxcomponents/vant/dist/notify/notify';
import hasLogin from "@/utils/permission";
import request from "@/utils/request";
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$dialog = Dialog
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
Vue.prototype.$hasLogin = hasLogin
Vue.prototype.$request = request
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
