<template>
  <div style="height: 660px;background: #333;">
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">智能白光灯</span></x-header>

    <div style="width: 220px;height: 220px;border-radius: 50%;margin: 0 auto;padding: 100px 0;">
      <img slot="icon" src="../../assets/img/controllight.png" style="">

      <div style="width:180px;margin-top: 50px;">
        <range v-model="percent1" :min="0" :max="100"></range>
      </div>
    </div>

  </div>
</template>

<script>
  import {XHeader, TransferDom, Actionsheet, Group, XSwitch, Toast, XCircle, Range,} from 'vux'

  export default {
    data() {
      return {
        percent1: 0
      }
    },
    components: {
      XCircle,
      Range,
      XHeader,
      Actionsheet,
      Group,
      XSwitch,
      Toast
    }
  }
</script>

<style lang="less" scoped>

</style>
