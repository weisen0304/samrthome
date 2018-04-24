<template>
  <div>
    <div>
      <x-header style="background: #fff">
        <router-link to="/Home" slot="left">取消</router-link>
        <span
          style="color: #aaa">选择设备型号</span>

        <div slot="right">
          <router-link to="/Home">
            <img width=20 src="../../assets/img/scan.png" alt="">
          </router-link>
        </div>
      </x-header>
    </div>
    <p>当前型号</p>
    <group label-width="4.5em" label-margin-right="2em" label-align="left">
      <div v-for="item in list">
        <cell :title="item.title" link="/add_device" is-link>
          <img slot="icon" width="40" style="display:block;margin-right:5px;" :src="item.url + item.img">
        </cell>
      </div>
    </group>


  </div>
</template>


<script>
  import {XSwitch, XHeader, Tabbar, TabbarItem, Cell, CellBox, CellFormPreview, Panel, Group, Radio} from 'vux'

  export default {
    data () {
      return {
        value2: false,
        stringValue: '0',
        open: '1',
        close: '0',
        date: '',
        list: [{
          url: 'http://xiaoxiangba.com',
          img: '/assets/img/waterBettle.png',
          title: 'SN001'
        }
        ]
      }
    },
    created() {
    },
    methods: {
      onClick () {
        this.$vux.loading.show({
          text: '加载中'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 1000)
      }
    },
    components: {
      XSwitch,
      XHeader,
      Tabbar,
      TabbarItem,
      Cell,
      CellBox,
      CellFormPreview,
      Panel,
      Group,
      Radio
    }
  }
</script>
