<template>
  <div>
    <div style="position: fixed;width: 100%;top: 0;margin-bottom: 40px;background: #00ee00;z-index: 1;">
      <x-header :left-options="{showBack: false}" style="background: #fff">
        <router-link to="/Home" slot="left">取消</router-link>
        <span
          style="color: #aaa">选择设备类型</span>

        <div slot="right">
          <img @click="todoStatus = true" width=20     src="../../assets/img/scan.png" alt="">
        </div>
      </x-header>
    </div>

    <TODO @close="todoStatus = false" v-show="todoStatus"></TODO>

    <div style="position: relative;top: 40px;">

      <group title='使用中设备' label-width="4.5em" label-margin-right="2em" label-align="left">
        <div v-for="item in list01">
          <cell v-show="item.status? '正常':'异常'" :title="item.description" link="/mydevice/deviceType" is-link>
            <img slot="icon" width="40" style="display:block;margin-right:5px;"
                 src="http://www.xiaoxiangba.com/assets/img/door.png">
          </cell>
        </div>
      </group>

      <cell link="/mydevice">
        <img slot="icon" width="20" style="left: 100%;margin-top: 18px;" src="../../assets/img/add.png">
        添加新设备
      </cell>

    </div>

  </div>
</template>


<script>
  import TODO from '../common/TODO.vue'
  import {XHeader, Tabbar, TabbarItem, Cell, CellBox, CellFormPreview, Panel, Group, Radio} from 'vux'

  export default {
    data () {
      return {
        todoStatus: false,
        showStatus: '',
        list01: this.$store.state.device.deviceList,
        list: []
      }
    },
    created() {
      var data = JSON.parse(localStorage.mydata)

//      var id = this.$store.state.login.userInfo[0].family.id
//      this.$http.get('http://120.79.21.193/SmartHome/family/'+id,{
//
//      }).then((res)=> {
//        this.$store.commit('deviceInfo', res.body)
//        console.log(this.$store.state.device.deviceList[0].family.deviceList[0].status)
//      }),(err)=> {
//        console.log(err)
//      }
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
