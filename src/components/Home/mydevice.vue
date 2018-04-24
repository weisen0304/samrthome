<template>
  <div>
    <div style="position: fixed;width: 100%;background: #00ee00;z-index: 1;">
      <x-header style="background: #fff">
        <router-link to="/Home" slot="left">取消</router-link>
        <span
          style="color: #aaa">选择设备类型</span>
        <div slot="right">
          <img @click="todoStatus = true" width=20          src="../../assets/img/scan.png" alt="">
        </div>
      </x-header>
    </div>
    <TODO @close="todoStatus = false" v-show="todoStatus"></TODO>
    <p>当前设备</p>
    <group label-width="4.5em" label-margin-right="2em" label-align="left">
      <div v-for="item in data">
        <cell :title="item.description" @click.native="clickAddDevice(item.id)" is-link>
          <img slot="icon" width="40" style="display:block;margin-right:5px;"
               :src="'http://120.79.21.193/SmartHome' + item.img">
        </cell>
      </div>
    </group>
  </div>
</template>
<script>
  import TODO from '../common/TODO.vue'
  import {XHeader, Tabbar, TabbarItem, Cell, CellBox, CellFormPreview, Panel, Group, Radio} from 'vux'

  export default {
    data () {
      return {
        todoStatus: false,
        data: []
      }
    },
    created(){
      this.clickInit()
    },
    methods: {
      clickInit(){
        var id = JSON.parse(localStorage.mydata).user.id
        var familyId = this.$route.query.familyId
        this.$axios.get(`/SmartHome/get_device?userId=${id}&familyId=${familyId}`)
          .then((res) => {
            if (res.data !== 'can not get devices')
              this.data = res.data
          })
      },
      clickAddDevice(deviceId){
        var userId = JSON.parse(localStorage.mydata).user.id
        var familyId = this.$route.query.familyId
        this.$axios.post('/SmartHome/add_device', {
          userId: userId,
          familyId: familyId,
          deviceId: deviceId
        })
          .then((res) => {
            this.$router.push({path: '/user_device', query: {familyId: familyId}})
          })
      },
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
