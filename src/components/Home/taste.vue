<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">体验中心</span></x-header>

    <group style="margin-top: -20px;">
      <p style="padding: 15px 0;font-size: 18px;">虚拟体验设备</p>
      <group-title style="font-size: 12px;padding-bottom: 30px;">免费体验智能生活</group-title>

    </group>

    <flexbox>
      <flexbox-item v-for="i in 2" :key="i">
        <div class="flex-demo">
          <grid>
            <grid-item link="/taste/demo"
                       style=" background: #fff;width: 90%;border-radius: 10px;margin: 10px;padding: 60px 20px;text-align: center">
              <img slot="icon" src="../../assets/img/light.png">
              <p>智能白光灯</p>
              <router-link to="/taste/demo">立即体验</router-link>
            </grid-item>
          </grid>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem, Group, XHeader, Grid, GridItem, GroupTitle} from 'vux'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Group,
      XHeader,
      Grid,
      GridItem,
      GroupTitle
    },
    methods: {
      onItemClick () {
        console.log('on item click')
      }
    }
  }
</script>

<style lang="less" scoped>
  .flex-demo {
    text-align: center;  /*文本居中显示*/
    color: #EEE;
    background-color: #eee;
    margin-bottom: 16px;
    border-radius: 6px; /*按钮的圆角弧度*/
    -webkit-background-clip: padding-box;
  }
</style>
