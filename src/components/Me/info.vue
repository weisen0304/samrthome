<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff;"><span style="color: #aaa">个人信息</span>
    </x-header>

    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="showPhoto" show-cancel></actionsheet>

    <group style="text-align: left;">
      <div v-on:click="showPhoto()" is-link>
        <cell :title="'头像'" is-link>
          <img slot="icon" width="80" style="display:block;margin-right:15px;border-radius: 50%;"
               src="../../../src/assets/img/myimage.jpg" v-model="show2">
        </cell>

      </div>


      <cell :title="'昵称'" link="/me/info"
            @click.native="clickDemo"
            is-link>
        <p>{{nickname}}</p>
      </cell>

      <cell :title="'手机号码'" link="/me/info"
            @click.native="clickDemo"
            is-link>
        <p style="color: #f00">{{phone}}</p>
      </cell>
    </group>

    <group style="text-align: left;">
      <cell :title="'账号所在地'" link="/me/info">
        <p>{{family}}</p>
      </cell>

      <cell :title="'温度单位'" link="/me/info"
            @click.native="clickDemo"
            is-link>
        <p>°C</p>
      </cell>
    </group>

    <group style="text-align: left;">
      <cell :title="'修改登录密码'" link="/me/info"
            @click.native="clickDemo"
            is-link>
      </cell>

      <cell :title="'手机解锁'" link="/me/info"
            @click.native="clickDemo"
            is-link>
        <p style="color: #f00">未设置</p>
      </cell>
    </group>

    <group>
      <x-button @click.native="logout" style="background: #fff">退出登录</x-button>
    </group>

    <div>
      <loading :text="'loading'"></loading>
    </div>
  </div>
</template>

<script>
  import {Loading, XButton, XImg, Cell, Group, XHeader, XSwitch, Actionsheet} from 'vux'
  import Panel from "../../../node_modules/vux/src/components/panel/index";
  export default {
    data () {
      return {
        show2: false,
        nickname: '',
        phone: '',
        family: '',
        menus2: {
          menu1: '拍照',
          menu2: '从手机相册选择'
        },
        isLogouting: false,
      }
    },
    created() {
      var mydata = JSON.parse(localStorage.mydata)
      this.nickname = mydata.user.username
      this.phone = mydata.user.phone
      this.family = mydata.family.familyAddress
    },
    methods: {
      showPhoto() {
        this.show2 = !this.show2
        localStorage.removeItem('wifiIconStatus')
        localStorage.removeItem('completeStatus')
      },
      showLoading () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 3000)
      },
      logout(){
        //删除cookie并跳到登录页
        this.showLoading()
        this.delCookie('session');
        //演示
        setTimeout(() => {
          this.$router.push('/login/');
          this.isLogouting = false;
        }, 3000)

        this.$http.get('http://120.79.21.193/SmartHome/logout')
          .then((res) => {
            console.log(res.body)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      clickDemo() {
        this.$vux.alert.show({
          content: '后续待完善！'
        })
        setTimeout(() => {
          this.$vux.alert.hide()
        }, 1000)
      }
    },
    components: {
      Loading,
      Panel,
      Actionsheet,
      XSwitch,
      XButton,
      XImg,
      Cell,
      Group,
      XHeader
    }
  }
</script>

<style lang="less" scoped>

</style>
