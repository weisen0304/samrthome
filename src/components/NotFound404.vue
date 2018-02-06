<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">温馨提示</span></x-header>

    对不起，你找的网页不存在！
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
      components: {
          XHeader
      }
  }
</script>

<style lang="less" scoped>

</style>
