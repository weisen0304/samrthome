<template>
  <div style="height: 100%;background: url('http://www.xiaoxiangba.com/assets/img/bg01.jpg')">
    <!--header导航条-->
    <x-header :left-options="{showBack: false}"
              :title="'首页'">
      <x-img slot="right"
             width="20"
             src="http://www.xiaoxiangba.com/assets/img/add.png"
             @click.native="clickMore"></x-img>
    </x-header>

    <x-button @click.native="clickCheckDevice"
              style="position: fixed;margin: 80px 10%;
              bottom: 0px;width: 80%;border-radius: 40px;
              opacity: .7;color: #999999;">
      查询设备
    </x-button>

    <!--tabbar导航栏-->
    <div>
      <tabbar style="position: fixed;">
        <tabbar-item selected link="/Home">
          <img slot="icon" src="../../assets/img/scene1.png">
          <span slot="label">我的设备</span>
        </tabbar-item>
        <tabbar-item link="/scene">
          <img slot="icon" src="../../assets/img/home.png">
          <span slot="label">智能场景</span>
        </tabbar-item>
        <tabbar-item link="/me">
          <img slot="icon" src="../../assets/img/me.png">
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
  import {
    XImg,
    XButton,
    XHeader,
    Tabbar,
    TabbarItem
  } from 'vux'

  export default {
    data () {
      return {}
    },
    components: {
      XImg,
      XButton,
      XHeader,
      Tabbar,
      TabbarItem
    },
    methods: {
      clickMore() {
        this.$router.push('/mydevice')
      },
      clickCheckDevice() {
        this.$vux.loading.show()
        var data = JSON.parse(localStorage.mydata)

        var id = data.family.id
        this.$http.get('http://120.79.21.193/SmartHome/devices/' + id, {}).then((res) => {
          this.$store.commit('deviceInfo', res.body)
          this.$router.push('/user_device')
        }).catch((err)=>{
          this.$vux.alert.show({
            content: '网络状态为：'+ err.status
          })
        })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 2000)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
