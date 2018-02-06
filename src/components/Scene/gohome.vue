<template>
  <div>
    <x-header :left-options="{showBack: false}" style="background: #fff">
      <router-link to="/Home" slot="left">取消</router-link>
      <span
        style="color: #aaa">编辑场景</span>
      <router-link to="/Home" slot="right">保存</router-link>
    </x-header>

    <group style="text-align: left">
      <cell :title="'到家'">
        <img slot="icon" width="25" src="../../assets/img/scene.png" style="margin-right: 15px;">
      </cell>
    </group>

    <group style="text-align: left">
      <cell :title="'第一步:添加条件'">
        <x-icon type="ios-plus" size="30"></x-icon>
      </cell>
    </group>

    <p style="width: 90%;padding: 10px 0;margin: 5%;background: #f2f2f2;">未添加条件(可不添加，直接手动执行)</p>

    <group style="text-align: left">
      <cell :title="'第二步:添加条件'">
        <x-icon type="ios-plus" size="30"></x-icon>
      </cell>
    </group>

    <p style="width: 90%;padding: 10px 0;margin: 5%;background: #f2f2f2;">未添加条件</p>

    <x-button @click.native="showPlugin" style="background: #fff;color: #f20">删除</x-button>

    <div v-transfer-dom>
      <confirm
        v-model="show4"
        :close-on-confirm="false"
        :title="'确定删除场景吗？'"
        @on-confirm="onConfirm4">
        <p style="text-align:center;">确定</p>
      </confirm>
    </div>

  </div>
</template>

<script>
  import {XHeader, Group, Cell, Confirm, XSwitch, XButton, TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        show4: false
      }
    },
    components: {
      XSwitch,
      Confirm,
      XButton,
      XHeader,
      Group,
      Cell
    },
    methods: {
      onConfirm4 () {
        console.log('on confirm')
        this.$vux.loading.show({
          transition: '',
          text: 'processing'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.show4 = false
        }, 1000)
      },
      showPlugin () {
        this.$vux.confirm.show({
          title: '确定删除该场景吗',
          content: '场景删除后，设备任务无法正常执行',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            console.log('plugin confirm')
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>

</style>
