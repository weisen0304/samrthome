<template>
  <div>
    <div style="position: fixed;width: 100%;background: #00ee00;z-index: 1;">
      <x-header :left-options="{showBack: false}" style="background: #fff">
        <router-link to="/Home" slot="left">取消</router-link>
        <span
          style="color: #aaa">选择设备类型</span>

        <div slot="right">
          <img @click="todoStatus = true" width=20    src="../../assets/img/scan.png" alt="">
        </div>
      </x-header>
    </div>

    <TODO @close="todoStatus = false" v-show="todoStatus"></TODO>

    <p>当前设备</p>

    <group label-width="4.5em" label-margin-right="2em" label-align="left">
      <div v-for="item in list">
        <cell :title="item.title" link="/mydevice/deviceType" is-link>
          <img slot="icon" width="40" style="display:block;margin-right:5px;" :src="item.url + item.img">
        </cell>
      </div>
    </group>

    <cell link="/adddevice">
      <img slot="icon" width="20" style="left: 100%;margin-top: 18px;" src="../../assets/img/add.png">
      添加新设备
    </cell>

  </div>
</template>


<script>
  import TODO from '../common/TODO.vue'
  import {XHeader, Tabbar, TabbarItem, Cell, CellBox, CellFormPreview, Panel, Group, Radio} from 'vux'

  export default {
    data () {
      return {
        todoStatus: false,
        list: [
          {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/waterBettle.png',
            title: '热水壶'
          }, {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/lock.png',
            title: '门锁'
          }, {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/window.png',
            title: '窗帘'
          }, {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/household.png',
            title: '家电'
          }, {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/camera.png',
            title: '摄像头'
          },
          {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/plug.png',
            title: '智能插座'
          },
          {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/light.png',
            title: '灯光'
          },
          {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/music.png',
            title: '音乐'
          },
          {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/household.png',
            title: '视频'
          },
          {
            url: 'http://xiaoxiangba.com',
            img: '/assets/img/household.png',
            title: '其他'
          }
        ]
      }
    },
    methods: {
      showTodo() {
        this.todoStatus = false
      }
    },
    components: {
      XHeader,
      Tabbar,
      TabbarItem,
      Cell,
      CellBox,
      CellFormPreview,
      Panel,
      Group,
      Radio,
      TODO
    }
  }
</script>
