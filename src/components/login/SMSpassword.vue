<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">找回密码</span></x-header>
    <p>验证码已经发送到你的手机</p>
    <p>+86 {{phoneNum}}</p>

    <group style="width: 90%;margin-left: 5%;text-align: left">
      <x-input class="weui-vcode" v-model="code" placeholder="输入验证码">
        <x-button v-if='showGet' @click.native='clickGetCode' slot="right" type="primary" mini>获取</x-button>
        <x-button v-else-if='!showGet' disabled slot="right" type="primary" mini>重新获取({{count}})</x-button>
      </x-input>
    </group>

    <group style="width: 90%;margin-left: 5%;text-align: left">
      <x-input :type='isPwd' name="password" placeholder="请输入密码"
               v-model="password">
        <img v-if="isShow" @click="clickShow" slot="right" src="http://www.xiaoxiangba.com/assets/img/show.png"
             width="20px" style="vertical-align: middle;">
        <img v-if="!isShow" @click="clickShow" slot="right" src="http://www.xiaoxiangba.com/assets/img/hide.png"
             width="20px" style="vertical-align: middle;">
      </x-input>
    </group>

    <x-button @click.native="clickOk" :disabled="isOk" type="primary"
              style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;">确定
    </x-button>
  </div>
</template>

<script>
  import {XHeader, XButton, XInput, Group} from 'vux'
  export default {
    components: {
      XHeader,
      XButton,
      XInput,
      Group
    },
    data() {
      return {
        code: '',
        password: '',
        showGet: true,
        isGet: false,
        timer: null,
        count: '',
        isOk: true,
        isPwd: 'password',
        isShow: true
      }
    },
    created() {
      this.clickGetCode()
      this.phoneNum = this.$route.query.phone
    },
    methods: {
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
      clickOk() {
        this.$vux.loading.show()
        setTimeout(() => {
          this.$axios.post('/SamrtHome/updatePwd', {
            phone: this.phoneNum,
            code: this.code,
            password: this.password
          })
            .then((res) => {
              console.log(res)
            })
          this.$vux.loading.hide()
          this.$router.push('/login')
        }, 500)
      },
      clickShow() {
        this.isShow = !this.isShow
        if (this.isShow == false) {
          this.isPwd = 'text'
        } else {
          this.isPwd = 'password'
        }
      }
    },
    watch: {
      code: function () {
        if (this.code !== '' && this.password !== '') {
          this.isOk = false
        } else {
          this.isOk = true
        }
      },
      password: function () {
        if (this.code !== '' && this.password !== '') {
          this.isOk = false
        } else {
          this.isOk = true
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
