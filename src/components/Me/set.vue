<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff;"><span style="color: #aaa">设置</span></x-header>

    <group :title="'按键反馈'" style="text-align: left">
      <x-switch :title="'声音'"></x-switch>
      <x-switch :title="'振动'"></x-switch>
    </group>

    <group :title="'消息通知'" style="text-align: left;">
      <x-switch :title="'App消息通知'" prevent-default v-model="value2" @on-click="onClick"></x-switch>
    </group>

    <group style="text-align: left;">
      <cell :title="'清除缓存'" :value="stringValue" is-link></cell>
    </group>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XSwitch} from 'vux'
  export default {
    components: {
      Cell,
      XHeader,
      Group,
      XSwitch
    },
    methods: {
      onClick (newVal, oldVal) {
        console.log(newVal, oldVal)
        this.$vux.loading.show({
          text: 'in processing'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.value2 = newVal
        }, 1000)
      }
    },
    data () {
      return {
        value1: true,
        value2: false,
        stringValue: '0'
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
