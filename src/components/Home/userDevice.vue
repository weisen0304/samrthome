<template>
  <div>
    <x-header style="background: #fff;position: fixed;width: 100%;top: 0;margin-bottom: 40px;">
      <router-link to="/Home" slot="left">取消</router-link>
      <span
        style="color: #aaa">选择设备类型</span>
      <div slot="right">
        <img @click="todoStatus = true" width=20 src="../../assets/img/scan.png" alt="">
      </div>
    </x-header>
    <TODO @close="todoStatus = false" v-show="todoStatus"></TODO>
    <div style="position: relative;top: 40px;">
      <group title='使用中设备' label-width="4.5em" label-margin-right="2em" label-align="left">
        <div v-for="item in data">
          <cell :title="item.description" @click.native="clickControl(item.id)" is-link>
            <img slot="icon" width="40" style="display:block;margin-right:5px;"
                 src="http://www.xiaoxiangba.com/assets/img/door.png">
          </cell>
        </div>
      </group>
      <cell @click.native="clickAddDevice">
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
        list: [],
        data: [],
        familyId: ''
      }
    },
    created() {
      this.clickInit()
    },
    methods: {
      clickInit(){
        this.familyId = this.$route.query.familyId
        this.$axios.get(`/SmartHome/get_family_device?familyId=${this.familyId}`)
          .then((res) => {
            if (res.data.length > 0) {
              this.data = res.data
            }
          })
      },
      clickControl(id) {
        this.$router.push({path: '/device_control', query: {deviceId: id}})
      },
      clickAddDevice(){
        this.$router.push({path: '/all_device', query: {familyId: this.familyId}})
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
