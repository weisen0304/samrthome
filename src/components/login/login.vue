<template>
  <div style="height: 100%;">
    <img src="http://www.xiaoxiangba.com/assets/img/scan1.png"
         width="60"
         style="margin: 200px auto 0;"
         alt="">
    <p style="text-align: center;font-size: 18px;color: #000;font-weight: bold;">智能生活</p>
    <div v-show="showLogin"
         style="position: fixed;bottom: 20px;width: 100%;">
      <x-button style="width: 300px;background: #00ee00;color: #ffffff;padding-top: 0;padding-bottom: 0;"
                @click.native="clickLogin()">登录
      </x-button>
      <x-button style="width: 300px;margin: 20px auto;color: #00ee00;padding-top: 0;padding-bottom: 0;"
                @click.native="clickRegister()">注册
      </x-button>
    </div>

  </div>
</template>

<script>
  import {XButton} from 'vux'
  export default {
    data() {
      return {
        showLogin: false
      }
    },
    created() {
      setTimeout(()=> {
          this.showLogin = true
      },2000)
    },
    methods: {
      clickLogin() {
        this.$router.push('/userLogin')
      },
      clickRegister() {
        this.$router.push('/register')
      }
    },
    components: {
      XButton
    }
  }
</script>

<style>

</style>
