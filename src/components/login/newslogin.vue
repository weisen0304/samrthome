<template>
  <div v-if="isNewsLogin">
    <x-header :left-options="{showBack: false}" style="background: #fff">
      <a @click="clickClose" slot="left" style="color: #aaa;">取消</a>
      <span
        style="color: #aaa">短信验证码登录</span></x-header>

    <group style="width: 90%;margin-left: 5%;border:1px solid inherit;border-radius: 20px;">
      <x-input type='tel' style="width: 90%;border:1px solid inherit;border-radius: 20px;" name="name" placeholder="手机号"
               v-model="username"></x-input>
    </group>

    <group style="width: 90%;margin-left: 5%;text-align: left">
      <x-input class="weui-vcode" v-model="code" placeholder="输入验证码">
        <x-button v-if='showGet' @click.native='clickGetCode' :disabled="isCode" slot="right" type="primary" mini>获取</x-button>
        <x-button v-else-if='!showGet' disabled slot="right" type="primary" mini>重新获取({{count}})</x-button>
      </x-input>
    </group>

    <x-button @click.native="clickLogin" :disabled="isCode" type="primary"
              style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;">
      登录
    </x-button>

  </div>
</template>

<script>
  import {Group, XInput,XButton, XHeader} from 'vux'
  export default {
    data() {
      return {
        isNewsLogin: true,
        showGet: true,
        username: '',
        code: '',
        isCode: true
      }
    },
    methods: {
      clickClose() {
        this.isNewsLogin = !this.isNewsLogin
      },
      clickGetCode() {
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.showGet = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.showGet = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      },
      clickLogin() {
          this.$vux.loading.show()
        setTimeout(()=>{
              this.$vux.loading.hide()
          this.$router.push('/home')
        },1000)
      }
    },
    watch: {
      username: function () {
        if (this.username !== '') {
          this.isCode = false
        } else {
          this.isCode = true
        }
      }
    },
    components: {
      Group,
      XHeader,
      XInput,
      XButton
    }
  }
</script>

<style lang="less" scoped>

</style>
