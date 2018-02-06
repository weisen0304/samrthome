<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'图库'">
        <div slot="right"
             v-show="demo01"
             @click="showEdit"
             style="color: #fff"><p v-show="!showComplete">编辑</p><p v-show="showComplete">完成</p>
        </div>
      </x-header>
    </div>

    <button-tab v-model="demo01" style="width: 80%;margin: 20px auto">
      <button-tab-item @on-item-click="consoleIndex()">官方图库</button-tab-item>
      <button-tab-item @on-item-click="consoleIndex()">自定义图库</button-tab-item>
    </button-tab>
    <br>
    <div style="text-align: center;margin-left: 3px;">
      <div v-show="!demo01">
        <img width="120" src="../../assets/img/bg01.jpg" alt="">
        <img width="120" src="../../assets/img/bg02.jpg" alt="">
        <img width="120" src="../../assets/img/bg03.jpg" alt="">
        <img width="120" src="../../assets/img/bg04.jpg" alt="">
        <img width="120" src="../../assets/img/bg05.jpg" alt="">
      </div>
      <div v-show="demo01">
        <img @click="showPhoto" width="60" src="../../assets/img/add.png" style="text-align: center">
      </div>
    </div>

    <actionsheet v-model="showSheet" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>

  </div>
</template>

<script>
  import {ButtonTab, ButtonTabItem, XHeader,Actionsheet} from 'vux'
  export default {
    data() {
      return {
        demo01: 0,
        showComplete: false,
        edit: '编辑',
        showSheet: false,
        menus: {
          menu1: '拍照',
          menu2: '从手机相册中选择'
        }
      }
    },
    methods: {
      consoleIndex() {
        console.log(this.demo01)
      },
      showEdit() {
        this.showComplete = !this.showComplete
      },
      showPhoto() {
          this.showSheet = !this.showSheet
      },
      click(key) {
          console.log(key)
      }
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      XHeader,
      Actionsheet
    }
  }
</script>

<style lang="less" scoped>

</style>
