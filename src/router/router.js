import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import home from '../components/Home/Home.vue'
import me from '../components/Me/me.vue'
import scene from '../components/Scene/scene.vue'

import me_info from '../components/Me/info.vue'
import mydevice from '../components/Home/mydevice'
import adddevice from '../components/Home/adddevice'
import deldevice from '../components/Home/deldevice.vue'
import deviceType from '../components/Home/deviceType.vue'
import user_device from '../components/Home/userDevice.vue'
import device_detail from '../components/Home/deviceDetail.vue'
import device_control from '../components/Home/waterBettle.vue'

import gohome from '../components/Scene/gohome'

import login from '../components/login/login.vue'
import userlogin from '../components/login/userlogin.vue'
import forgetpassword from '../components/login/forgetpassword.vue'
import SMSpassword from '../components/login/SMSpassword.vue'

import register from '../components/register/register.vue'
import SMS from '../components/register/SMSverification.vue'

import my_family from '../components/family/myFamily.vue'
import create_Family from '../components/family/createFamily.vue'
import join_family from '../components/family/joinFamily.vue'
import join_code from '../components/family/joinCode.vue'
import family_info from '../components/family/familyInfo.vue'
import info_qrcode from '../components/family/infoQrcode.vue'
import family_photo from '../components/family/familyPhoto.vue'
import family_roles from '../components/family/familyRoles.vue'
import roles_manage from '../components/family/rolesManage.vue'

import NotFound from '../components/NotFound404'

const routes = [
  {path: '/home', name: 'home', component: home},

  {path: '/user_device', name: 'user_device', component: user_device},
  {path: '/device_detail', name: 'device_detail', component: device_detail},
  {path: '/add_device', name: 'adddevice', component: adddevice},
  {path: '/del_device', name: 'deldevice', component: deldevice},
  {path: '/all_device', name: 'mydevice', component: mydevice},
  {path: '/device_control', name: 'device_control', component: device_control},

  {path: '/scene', name: 'scene', component: scene},
  {path: '/scene/gohome', name: 'gohome', component: gohome},

  {path: '/device_type', name: 'deviceType', component: deviceType},

  {path: '/login', name: 'login', component: login},
  {path: '/userlogin', name: 'userlogin', component: userlogin},
  {path: '/forget_password', name: 'forget_password', component: forgetpassword},
  {path: '/SMS_password', name: 'SMS_password', component: SMSpassword},

  {path: '/register', name: 'register', component: register},
  {path: '/register/SMS', name: 'SMS', component: SMS},

  {path: '/me', name: 'me', component: me},
  {path: '/me/info', name: 'me_info', component: me_info},

  {path: '/my_family', name: 'my_family', component: my_family},
  {path: '/my_family/create_family', name: 'create_Family', component: create_Family},
  {path: '/my_family/join_family', name: 'join_family', component: join_family},
  {path: '/my_family/join_code', name: 'join_code', component: join_code},
  {path: '/my_family/family_info', name: 'family_info', component: family_info},
  {path: '/my_family/info_qrcode', name: 'info_qrcode', component: info_qrcode},
  {path: '/my_family/family_photo', name: 'family_photo', component: family_photo},
  {path: '/my_family/family_roles', name: 'family_roles', component: family_roles},
  {path: '/my_family/roles_manage', name: 'roles_manage', component: roles_manage},

  {path: '/*', name: 'NotFound', component: NotFound}
]

export default new VueRouter({
  linkActiveClass: 'active',
  routes
})


