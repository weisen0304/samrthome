<template>
  <div style="height: 660px;">
    <x-header :left-options="{showBack: true}" style="background: #000"><span>更多</span></x-header>

    <group title="设置基本信息">
      <cell title="修改名称" is-link></cell>
    </group>

    <group title="其他">
      <cell title="查询设备" is-link></cell>
      <cell title="检查固件" is-link></cell>
    </group>

    <x-button style="margin: 10px 0;background: #fff;color: red;">移除设备</x-button>

    <p style="text-align: center;">恢复出厂设置</p>
  </div>
</template>

<script>
  import {XHeader,XButton, TransferDom, Actionsheet, Group, Cell, XSwitch, Toast, XCircle, Range,} from 'vux'

  export default {
    data() {
      return {
        percent1: 0
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
