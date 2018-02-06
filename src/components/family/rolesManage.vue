<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'家庭成员'">
      </x-header>
    </div>

    <!--<checklist-->
    <!--ref="demoObject"-->
    <!--label-position="right"-->
    <!--:options="commonList"-->
    <!--v-model="checklist"-->
    <!--@on-change="change"-->
    <!--@click.native="showAlert"></checklist>-->

    <checklist ref="demoObject"
               title="删除成员将不能操作设备，请慎重！"
               :options="commonList"
               v-model="objectListValue"
               @on-change="change"
               @click.native="getFullValue"></checklist>

    <div style="padding:15px;">
      <x-button type="primary" @click.native="getFullValue">删除成员</x-button>
    </div>

  </div>
</template>

<script>
  import {XHeader, XButton, Checklist, Group, CellBox} from 'vux'
  export default {
    data() {
      return {
        fullValues: [],
        commonList: [this.$store.state.login.userInfo[0].user.username],
        checklist: [],
        showDelete: false,
        objectList: [{key: '1', value: '001 value'}, {key: '2', value: '002 value'}, {key: '3', value: '003 value'}],
        objectListValue: [],
      }
    },
    methods: {
      change (val, label) {
        if (val != '') {

        }
      },
      showAlert() {
        console.log()
      },
      getFullValue() {
        const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
        if (_this.objectListValue != '') {
          this.$vux.confirm.show({
            title: '删除成员',
            content: '删除某某，则其不能操作家庭中电器，请慎重！',
            onCancel () {
              _this.objectListValue = []
              console.log(_this.checklist)
            },
            onConfirm () {
            }
          })
        }
      }
    },
    components: {
      XHeader,
      XButton,
      Checklist,
      CellBox,
      Group
    }
  }
</script>

<style lang="less" scoped>

</style>
