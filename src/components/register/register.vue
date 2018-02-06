<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">注册</span></x-header>

    <group style="width: 90%;margin-left: 5%;text-align: left">
      <cell :title="'中国'" is-link>+86</cell>
    </group>

    <group style="width: 90%;margin-left: 5%;border:1px solid inherit;border-radius: 20px;">
      <x-input style="width: 90%;border:1px solid inherit;border-radius: 20px;" name="mobile" placeholder="请输入手机号"
               keyboard="number" is-type="china-mobile" v-model="phoneNum"></x-input>
    </group>

    <x-button @click.native="isRegister" style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;">
      下一步
    </x-button>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, XButton} from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      XButton
    },
    data() {
      return {
        phoneNum: ''
      }
    },
    methods: {
      isRegister() {
        if (this.phoneNum == '15622633852') {
          this.nextRegister()
        }
      },
      nextRegister() {
        let password_sha = hex_sha1(hex_sha1(this.phoneNum));
        //需要想后端发送的登录参数
        let loginParam = {
          phoneNum: this.phoneNum,

          password_sha
        }
        this.$http.post('http://localhost:9090/data', {
          params: {
            id: 1,
            loginParam
          },
        }).then((res) => {
          console.log(res)
          if (res.status === 201) {
            setTimeout(() => {
//              let expireDays = 1000 * 60 * 60 * 24 * 15;
//              this.setCookie('session', res.data.session, expireDays);
              //登录成功后
              this.$router.push('/register/SMS')
            }, 1000)
          } else {
            this.show = true
          }
        }), (err) => {
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
