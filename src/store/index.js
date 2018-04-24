import Vue from 'vue'
import Vuex from 'vuex'

import loginMutations from './login/mutations'
import loadingMutations from './loading/mutations'
import localStroageMutations from './localStroage/mutations'
import familyMutations from './family/mutations'
import deviceMutations from './device/mutations'
import registerMutations from './register/mutations'

Vue.use(Vuex)

const login = {
  state: {
    user: [],
    domain: 'http://test.example.com', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
    userInfo: { //保存用户信息
      nick: null,
      ulevel: null,
      uid: null,
      portrait: null
    }
  },
  mutations: loginMutations
}

const register = {
  state: {
    code: ''
  },
  mutations: registerMutations
}

const loading = {
  state: {
    isLoading: false
  },
  mutations: loadingMutations
}

const showComplete = {
  state: {
    completeStatus: false,
    wifiIconStatus: true,
    isLight: false
  },
  mutations: localStroageMutations
}

const family = {
  state: {
    house: 0,
    createdName: '我的家庭',
    familyInfo: ''
  },
  mutations: familyMutations
}

const device = {
  state: {
    deviceList: ''
  },
  mutations: deviceMutations
}

export default new Vuex.Store({
  modules: {
    login,
    loading,
    showComplete,
    family,
    device,
    register
  }
})
