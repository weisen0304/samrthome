import Vue from 'vue'
import VueRouter from 'vue-router'

// Home
import mydevice from '../components/Home/mydevice'
import adddevice from '../components/Home/adddevice'
import deldevice from '../components/Home/deldevice.vue'
import deviceType from '../components/Home/deviceType.vue'
import taste from '../components/Home/taste'
import demo from '../components/Home/demo'
import household from  '../components/Home/household'
import light from '../components/Home/light'
import etna from '../components/Home/etna'
import music from '../components/Home/music'
import waterBettle from '../components/Home/waterBettle'
import user_device from '../components/Home/userDevice.vue'
import device_detail from '../components/Home/deviceDetail.vue'

// me
import set from '../components/Me/set'
import info from '../components/ME/info'

// Scene
import gohome from '../components/Scene/gohome'

// login
import login from '../components/login/login.vue'
import userlogin from '../components/login/userlogin.vue'

// register
import register from '../components/register/register.vue'
import SMS from '../components/register/SMSverification.vue'

// myFamily
import my_family from '../components/family/myFamily.vue'
import create_Family from '../components/family/createFamily.vue'
import join_family from '../components/family/joinFamily.vue'
import join_code from '../components/family/joinCode.vue'
import join_list from '../components/family/joinList.vue'
import family_info from '../components/family/familyInfo.vue'
import info_qrcode from '../components/family/infoQrcode.vue'
import family_photo from '../components/family/familyPhoto.vue'
import family_roles from '../components/family/familyRoles.vue'
import roles_manage from '../components/family/rolesManage.vue'
import rooms_manage from '../components/family/roomsManage.vue'
import houseload_electricity from '../components/family/householdElectricity.vue'

// 未知
import NotFound from '../components/NotFound404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    meta: {
      //meata元素
      requireAuth: true
    },
    component: function (resolve) {
      require(['../components/Home/Home.vue'], resolve)
    }
  },
  {
    path: '/me',
    component: function (resolve) {
      require(['../components/Me/me.vue'], resolve)
    }
  },
  {path: '/mydevice', name: 'mydevice', component: mydevice},
  {
    path: '/scene',
    component: function (resolve) {
      require(['../components/Scene/scene.vue'], resolve)
    }
  },
  {path: '/user_device', name: 'user_device', component: user_device},
  {path: '/device_detail', name: 'device_detail', component: device_detail},

  {path: '/adddevice', name: 'adddevice', component: adddevice},
  {path: '/deldevice', name: 'deldevice', component: deldevice},
  {path: '/taste', name: 'taste', component: taste},
  {path: '/taste/demo', name: 'demo', component: demo},
  {path: '/mydevice/household', name: 'household', component: household},
  {path: '/mydevice/demo/light', name: 'light', component: light},
  {path: '/scene/gohome', name: 'gohome', component: gohome},

  {path: '/mydevice/deviceType', name: 'deviceType', component: deviceType},
  {path: '/mydevice/deviceType/waterBettle', name: 'waterBettle', component: waterBettle},
  {path: '/mydevice/household/etna', name: 'etna', component: etna},
  {path: '/mydevice/music', name: 'music', component: music},

  {path: '/login', name: 'login', component: login},
  {path: '/userlogin', name: 'userlogin', component: userlogin},

  {path: '/register', name: 'register', component: register},
  {path: '/register/SMS', name: 'SMS', component: SMS},

  {path: '/me/set', name: 'set', component: set},
  {path: '/me/info', name: 'info', component: info},
  {path: '/me/my_family', name: 'my_family', component: my_family},
  {path: '/me/create_family', name: 'create_Family', component: create_Family},
  {path: '/me/join_family', name: 'join_family', component: join_family},
  {path: '/me/join_family/join_code', name: 'join_code', component: join_code},
  {path: '/me/join_family/join_code/join_list', name: 'join_list', component: join_list},
  {path: '/me/my_family/family_info', name: 'family_info', component: family_info},
  {path: '/me/my_family/family_info/info_qrcode', name: 'info_qrcode', component: info_qrcode},
  {path: '/me/my_family/family_info/family_photo', name: 'family_photo', component: family_photo},
  {path: '/me/my_family/family_info/family_roles', name: 'family_roles', component: family_roles},
  {path: '/me/my_family/family_info/family_roles/roles_manage', name: 'roles_manage', component: roles_manage},
  {path: '/me/my_family/family_info/rooms_manage', name: 'rooms_manage', component: rooms_manage},
  {path: '/me/my_family/family_info/houseload_electricity', name: 'houseload_electricity', component: houseload_electricity},

  {path: '/*', name: 'NotFound', component: NotFound}
]

export default new VueRouter({
  linkActiveClass: 'active',
  routes
})


