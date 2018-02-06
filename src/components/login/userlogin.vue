<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">登录</span></x-header>

    <group style="width: 90%;margin-left: 5%;border:1px solid inherit;border-radius: 20px;">
      <x-input style="width: 90%;border:1px solid inherit;border-radius: 20px;" name="name" placeholder="账号"
               v-model="username"></x-input>
    </group>

    <group style="width: 90%;margin-left: 5%;">
      <x-input name="password" placeholder="密码"
               v-model="password"></x-input>
    </group>

    <x-button style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;"
              @click.native="login()">登录
    </x-button>

    <div>
      <router-link to="/" style="margin-left: 5%;float: left;">通过短信验证码登录</router-link>
      <router-link to="/" style="margin-right: 5%;float: right;">忘记密码</router-link>
    </div>

    <!--社交账号登录-->
    <Social @click.native="clickThird"></Social>

    <div v-transfer-dom>
      <alert v-model="showErr">
        用户名或账户错误！
      </alert>
    </div>
  </div>
</template>

<script>
  import Social from '../common/SocialAccount.vue'
  import {XHeader, Alert, Group, XInput, XButton, TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        showErr: false,
        username: '',
        password: ''
      }
    },
    methods: {
      login(){
        if (this.account !== '' && this.password !== '') {
          this.toLogin();
        } else {
          this.showErr = true
        }
      },
      toLogin(){
        this.$vux.loading.show()
        var _this = this
        this.$http.post('http://120.79.21.193/SmartHome/login', {
          username: _this.username,
          password: _this.password
        })
          .then((res) => {
            localStorage.setItem('mydata', JSON.stringify(res.body[0]))
            var mydata = JSON.parse(localStorage.mydata)
            this.$store.commit('updateUserInfo', mydata)
            if (res.status === 200 && res.bodyText !== 'loginFail') {
              setTimeout(() => {
                let expireDays = 1000 * 60 * 60 * 24 * 15;
                this.setCookie('session', res.body, expireDays);
                this.$vux.loading.hide()
                this.$router.push('/Home')
              }, 2000)
            } else {
              this.showErr = true
              this.username = ''
              this.password = ''
            }
          }).catch((err) => {
          console.log(err)
        })
      },
      clickThird() {
        this.$vux.alert.show({
          content: '亲，后续待完善！'
        })
      }
    },
    components: {
      XHeader,
      Alert,
      Group,
      XInput,
      XButton,
      Social
    }
  }
</script>

<style lang="less" scoped>

</style>
