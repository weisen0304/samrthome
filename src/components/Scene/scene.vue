<template>
  <div>
    <!--header导航条-->
    <x-header :left-options="{showBack: false}"
              :title="'智能场景'">
    </x-header>

    <div>

      <div style="margin-top: -20px;">
        <group label-width="4.5em" label-margin-right="2em" label-align="left">
          <x-icon type="ios-close-empty" class="vux-close" size="30" style="float: right;margin-right: 4px;"></x-icon>
          <p style="text-align: center;font-size: 18px;padding: 20px 0;">编辑你的智能场景</p>
          <p style="text-align: center;font-size: 12px;padding-bottom: 50px;color: #aaa">
            添加设备后编辑个性化场景，你可以设置到家开启空调，拉上窗帘，也可以设置离家关闭灯光，门窗上锁</p>

          <cell :title="'到家'" link="/scene/gohome">
            <img slot="icon" width="50" style="display:block;margin-right:5px;" src="../../assets/img/gohome.png">
            <router-link to="/Home"
                         style="border-radius: 15px;font-size: 12px;background: #fff;border: 1px solid #ddd;color: #ddd;padding: 4px 10px;">
              执行
            </router-link>
          </cell>
          <cell :title="'离家'" link="/scene/gohome">
            <img slot="icon" width="50" style="display:block;margin-right:5px;" src="../../assets/img/leavehome.png">
            <router-link to="/Home"
                         style="border-radius: 15px;font-size: 12px;background: #fff;border: 1px solid #ddd;color: #ddd;padding: 4px 10px;">
              执行
            </router-link>
          </cell>
          <cell :title="'起床'" link="/scene/gohome">
            <img slot="icon" width="50" style="display:block;margin-right:5px;" src="../../assets/img/rise.png">
            <router-link to="/Home"
                         style="border-radius: 15px;font-size: 12px;background: #fff;border: 1px solid #ddd;color: #ddd;padding: 4px 10px;">
              执行
            </router-link>
          </cell>
          <cell :title="'休息'" link="/scene/gohome">
            <img slot="icon" width="50" style="display:block;margin-right:5px;" src="../../assets/img/rest.png">
            <router-link to="/Home"
                         style="border-radius: 15px;font-size: 12px;background: #fff;border: 1px solid #ddd;color: #ddd;padding: 4px 10px;">
              执行
            </router-link>
          </cell>
        </group>
      </div>
    </div>

    <!--导航栏-->
    <div>
      <tabbar style="position: fixed;">
        <tabbar-item link="/Home">
          <img slot="icon" src="../../assets/img/scene.png">
          <span slot="label">我的设备</span>
        </tabbar-item>
        <tabbar-item selected link="/scene">
          <img slot="icon" src="../../assets/img/home1.png">
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
  import {XButton, XHeader, Tabbar, TabbarItem, Group, Cell} from 'vux'
  import Nav from '../common/nav.vue'

  export default {
    components: {
      Nav,
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
