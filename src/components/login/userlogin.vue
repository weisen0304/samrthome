<template>
  <div>
    <div>
      <x-header :left-options="{showBack: true}" style="background: #fff"><span
        style="color: #aaa">登录</span></x-header>

      <group style="width: 90%;margin-left: 5%;border:1px solid inherit;border-radius: 20px;">
        <x-input type='tel' style="width: 90%;border:1px solid inherit;border-radius: 20px;"
                 placeholder="手机号"
                 v-model="phone"></x-input>
      </group>

      <group style="width: 90%;margin-left: 5%;">
        <x-input :type='isPwd' placeholder="密码"
                 v-model="password">
          <img v-if="isShow" @click="clickShow" slot="right" src="http://www.xiaoxiangba.com/assets/img/show.png"
               width="20px" style="vertical-align: middle;">
          <img v-if="!isShow" @click="clickShow" slot="right" src="http://www.xiaoxiangba.com/assets/img/hide.png"
               width="20px" style="vertical-align: middle;">
        </x-input>
      </group>
      <x-button style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;"
                type='primary'
                :disabled='isLogin'
                @click.native="login">登录
      </x-button>
      <div>
        <a @click="clickNewsLogin" style="margin-left: 5%;float: left;color: #777;">通过短信验证码登录</a>
        <a @click="clickForgetPwd" style="margin-right: 5%;float: right;color: #777;">忘记密码</a>
      </div>

      <!--社交账号登录-->
      <div style="position: absolute;bottom: 20px;left: 50%;margin-left: -70px;font-size: 12px;color: #aaa;">
        <p>社交账号登录</p>
        <span style="display: inline-block;margin-right: 10px;">
        <img width=40 src="../../assets/img/qq.png" style="padding: 10px;border-radius: 50%;background: #fff">
        <p>QQ</p>
      </span>
        <span style="display: inline-block;margin-left: 10px;">
        <img width=40 src="../../assets/img/wx.png" style="padding: 10px;border-radius: 50%;background: #fff">
        <p>微信</p>
      </span>
      </div>

      <div v-transfer-dom>
        <alert v-model="showErr">
          用户名或账户错误！
        </alert>
      </div>
    </div>
    <popup v-model="showLogin" position="bottom" style='height: 100%;'>
      <div>
        <x-header :left-options="{showBack: false}" style="background: #fff">
          <a @click="clickClose" slot="left" style="color: #aaa;">取消</a>
          <span
            style="color: #aaa">短信验证码登录</span></x-header>

        <group style="width: 90%;margin-left: 5%;border:1px solid inherit;border-radius: 20px;">
          <x-input type='tel' style="width: 90%;border:1px solid inherit;border-radius: 20px;" name="name"
                   placeholder="手机号"
                   v-model="username"></x-input>
        </group>

        <group style="width: 90%;margin-left: 5%;text-align: left">
          <x-input class="weui-vcode" v-model="code" placeholder="输入验证码">
            <x-button v-if='showGet' @click.native='clickGetCode' :disabled="isCode" slot="right" type="primary" mini>获取
            </x-button>
            <x-button v-else-if='!showGet' disabled slot="right" type="primary" mini>重新获取({{count}})</x-button>
          </x-input>
        </group>

        <x-button @click.native="clickLogin" :disabled="isGetCode" type="primary"
                  style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;">
          登录
        </x-button>

      </div>
    </popup>
  </div>
</template>

<script>
  import {XHeader, Alert, Group, XInput, XButton, Popup, TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        showLogin: false,
        showErr: false,
        phone: '',
        password: '',
        isLogin: true,
        isPwd: 'password',
        isShow: true,
        isNewsLogin: true,
        showGet: true,
        code: '',
        isCode: true,
        isGetCode: true,
        username: ''
      }
    },
    created() {
    },
    methods: {
      login(){
        if (this.phone !== '' && this.password !== '') {
          this.toLogin();
          this.isLogin = false
        } else {
          this.showErr = true
        }
      },
      toLogin(){
        var that = this
        this.$axios.post('/SmartHome/loginForPhone', {
          phone: that.phone,
          password: that.password
        })
          .then((res) => {
            this.$vux.loading.show()
            localStorage.setItem('mydata', JSON.stringify(res.data[0]))
            var mydata = JSON.parse(localStorage.mydata)
            if (res.status === 200 && res.data != 'loginFailure') {
              setTimeout(() => {
                let expireDays = 1000 * 60 * 60 * 24 * 15;
                this.setCookie('session', res.body, expireDays);
                this.$vux.loading.hide()
                this.$router.push('/Home')
              }, 2000)
            } else {
              this.$vux.loading.hide()
              this.showErr = true
              this.phone = ''
              this.password = ''
            }
          })
          .catch((err) => {
            this.$vux.loading.show()
            setTimeout(() => {
              this.$vux.loading.hide()
              this.$vux.alert.show({
                content: '网络故障'
              })
              this.phone = ''
              this.password = ''
            }, 5000)
          })
      },
      clickThird() {
        this.$vux.alert.show({
          content: '亲，后续待完善！'
        })
      },
      clickShow() {
        this.isShow = !this.isShow
        if (this.isShow == false) {
          this.isPwd = 'text'
        } else {
          this.isPwd = 'password'
        }
      },
      clickNewsLogin() {
        this.showLogin = !this.showLogin
      },
      clickForgetPwd() {
        this.$router.push('/forget_password')
      },
      clickClose() {
        this.showLogin = !this.showLogin
        this.phone = ''
        this.code = ''
      },
      clickGetCode() {
        console.log(this.username)
        this.$axios.post('/SmartHome/getLoginCode', {
          phone: this.username
        })
          .then((res) => {
            console.log(res)
          })
//        const TIME_COUNT = 60
//        if (!this.timer) {
//          this.count = TIME_COUNT
//          this.showGet = false
//          this.timer = setInterval(() => {
//            if (this.count > 0 && this.count <= TIME_COUNT) {
//              this.count--
//            } else {
//              this.showGet = true
//              clearInterval(this.timer)
//              this.timer = null
//            }
//          }, 1000)
//        }
      },
      clickLogin() {
        this.$vux.loading.show()
        setTimeout(() => {
          console.log(this.username)
          this.$axios.post('/SmartHome/loginForCode', {
            phone: this.username,
            code: this.code
          })
            .then((res) => {
              this.$vux.loading.hide();
              this.phone = '';
              this.code = '';
              this.$router.push('/home');
            })
        }, 1000)
      }
    },
    watch: {
      phone: function (val, oldVal) {
        if (this.phone !== '' && this.password !== '') {
          this.isLogin = false
        } else {
          this.isLogin = true
        }
      },
      password: function (val, oldVal) {
        if (this.phone !== '' && this.password.length >= 6) {
          this.isLogin = false
        } else {
          this.isLogin = true
        }
      },
      username: function (val, oldVal) {
        if (this.username.length == 11) {
          this.isCode = false
        } else {
          this.isCode = true
        }
      },
      phone: function () {
        if (this.phone !== '') {
          this.isCode = false
        } else {
          this.isCode = true
        }
      },
      code: function () {
//          console.log(this.code)
//        this.code.length == 6 ? this.isGetCode = true : this.isGetCode = false;
        if (this.code.length == 4 && this.username.length == 11) {
          this.isGetCode = false
        } else {
          this.isGetCode = true
        }
      }
    },
    components: {
      XHeader,
      Alert,
      Group,
      XInput,
      XButton,
      Popup
    }
  }
</script>

<style lang="less" scoped>

</style>
