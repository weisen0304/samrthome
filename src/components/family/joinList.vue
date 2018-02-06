<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'输入用户信息'">
        <a slot="right">保存</a>
      </x-header>
    </div>

    <group style="text-align: left;"
      title="请按表输入信息">
      <x-input name="roles" title="家庭关系" placeholder="如: 父亲"></x-input>
      <x-input name="name" title="常用名" placeholder="如: 明仔"></x-input>

      <popup-radio title="性别" :options="options1" v-model="option1"></popup-radio>

      <x-input name="sex" title="年龄"></x-input>
      <x-input name="job" title="职业爱好" placeholder="如: 摄影"></x-input>
    </group>

    <x-button style="margin-top: 20px;"
    >确定
    </x-button>
  </div>
</template>

<script>
  import {XHeader, XInput, XButton, Group, PopupRadio} from 'vux'
  export default {
    data() {
      return {
        option1: '男',
        options1: ['男', '女'],
      }
    },
    components: {
      XHeader,
      XInput,
      XButton,
      Group,
      PopupRadio
    }
  }
</script>

<style lang="less" scoped>
</style>
