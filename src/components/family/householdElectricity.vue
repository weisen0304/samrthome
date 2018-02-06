<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'我的家庭'">
      </x-header>
    </div>

    <group title="低谷时段">
      <cell title="起始时间" value="22:00" is-link></cell>
      <cell title="结束时间" value="08:00" is-link></cell>
    </group>
    <group title="电价">
      <cell title="起始时间" value="&yen;0.00/kwh" inline-desc="08:00-22:00" is-link></cell>
      <cell title="结束时间" value="&yen;0.00/kwh" inline-desc="22:00-08:00" is-link></cell>
    </group>
  </div>
</template>

<script>
  import {Group, Cell,XHeader} from 'vux'
  export default {
    data() {
      return {}
    },
    methods: {},
    components: {
      Group,
      Cell,
      XHeader
    }
  }
</script>

<style lang="less" scoped>

</style>
