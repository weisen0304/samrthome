// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import FastClick from 'fastclick'
import App from './App'
import router from './router/router'
import store from './store/index'

import {WechatPlugin} from 'vux'
import {AjaxPlugin} from 'vux'
import {LoadingPlugin} from 'vux'
import {AlertPlugin} from 'vux'
import {ConfirmPlugin} from 'vux'
import {DatetimePlugin} from 'vux'
import echarts from 'echarts'

Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(DatetimePlugin)

Vue.use(Vuex)

Vue.prototype.$echarts = echarts

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

// 路由向前跳转
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next();
})

// 路由向后跳转
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App),
  watch: {
    // "$route" : 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin(){
      //检查是否存在session
      if (!this.getCookie('session')) {
        this.$router.push('/login');
      } else {
        this.$router.push('/Home');
      }
    }
  }
}).$mount('#app-box')

