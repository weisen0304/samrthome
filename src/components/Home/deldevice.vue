<template>
  <div style="height: 660px;">
    <x-header :left-options="{showBack: true}" style="background: #000"><span>更多</span></x-header>

    <group title="设置基本信息">
      <cell title="修改名称" is-link @click.native="clickUpdata"></cell>
    </group>

    <group title="其他">
      <cell title="查询设备" is-link></cell>
      <cell title="检查固件" is-link></cell>
    </group>

    <x-button style="margin: 10px 0;background: #fff;color: red;" @click.native="clickDelDevice">移除设备</x-button>

    <p style="text-align: center;">恢复出厂设置</p>
  </div>
</template>

<script>
  import {XHeader, XButton, TransferDom, Actionsheet, Group, Cell, XSwitch, Toast, XCircle, Range,} from 'vux'

  export default {
    data() {
      return {
        percent1: 0,
        data: []
      }
    },
    created(){
        this.clickInit()
    },
    methods: {
      clickInit(){
        var deviceId = this.$route.query.deviceId
        this.$axios.get(`/SmartHome/get_device/${deviceId}`)
          .then((res) => {
            console.log(res);
            this.data = res.data[0]
          })
      },
      clickUpdata() {
        console.log(this.data.);
        var that = this
        this.$vux.confirm.prompt('', {
          onConfirm (value) {
            that.email = value
          }
        })
      },
      clickDelDevice(){
        var deviceId = this.$route.query.deviceId
        var userId = JSON.parse(localStorage.mydata).user.id
        this.$axios.post('/SmartHome/del_device', {
          familyId: 9,
          userId: userId,
          deviceId: deviceId
        })
          .then(res => {
              if(res.data == 'delete Success'){
                  this.$router.push({path: '/user_device',query: {familyId: 9}})
              }
          })
      }
    },
    components: {
      XCircle,
      XButton,
      Range,
      XHeader,
      Actionsheet,
      Group,
      Cell,
      XSwitch,
      Toast
    }
  }
</script>

<style lang="less" scoped>

</style>
