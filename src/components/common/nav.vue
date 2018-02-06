<template>
  <!--导航栏-->
  <div>
    <tabbar style="position: fixed;">
      <tabbar-item link="/Home">
        <img slot="icon" src="../../assets/img/scene.png">
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
</template>

<script>
  import {XButton, XHeader, Tabbar, TabbarItem, Group, Cell} from 'vux'

  export default {
    data () {
      return {
        demo: '我的设备',
        list: [],
        name: [],
        src: []
      }
    },
    components: {
      XButton,
      XHeader,
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }
</script>

<style lang="less" scoped>

</style>
