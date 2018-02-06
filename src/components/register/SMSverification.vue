<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">注册</span></x-header>
    <p>验证码已经发送到你的手机</p>
    <p>+86 15622633852</p>

    <group style="width: 90%;margin-left: 5%;text-align: left">
      <x-input class="weui-vcode"placeholder="输入验证码">
        <x-button slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
    </group>

    <group style="width: 90%;margin-left: 5%;text-align: left">
      <x-input name="password" placeholder="输入密码" is-type="password" v-model="password"></x-input>
    </group>

    <x-button @click.native="isNews" style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;">确定
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
        password: ''
      }
    },
    methods: {
      isNews() {
        if (this.password !== '') {
          this.regSuccess()
        }
      },
      regSuccess() {
        let password_sha = hex_sha1(hex_sha1(this.password));
        //需要想后端发送的登录参数
        let loginParam = {
          password: this.password,
          password_sha
        }
        this.$http.post('http://localhost:9090/data', {
          params: {
            loginParam
          },
          id: 1,
        }).then((res) => {
          console.log(res)
          if (res.status === 201) {
            setTimeout(() => {
//              let expireDays = 1000 * 60 * 60 * 24 * 15;
//              this.setCookie('session', res.data.session, expireDays);
              //登录成功后
              this.$router.push('/login')
            }, 1000)
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
