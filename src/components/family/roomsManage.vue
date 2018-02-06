<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff;position: fixed;z-index: 1;width: 100%;top: 0;">
      <x-header :left-options="{showBack: true}" :title="'房间管理'">
        <div slot="right"
             @click="showEdit"
             style="color: #fff"><p v-show="!showComplete" @click="edit">编辑</p>
          <p v-show="showComplete">完成</p>
        </div>
      </x-header>
    </div>

    <div
      style="position: fixed;top: 45px;width: 100%;padding: 10px 5px 0;text-align: left;z-index: 1;background: #ddd;">
      我的家庭的房间{{list.length}}
    </div>
    <div style="position: relative;margin-top: 80px;">

      <group ref="rooms">
        <cell v-for="item in list"
              :key="item.id"
              :title="item.title"
              value="无设备"
              is-link
              @click.native="change">
          <img v-show="showComplete" slot="icon"
               style="display: block;margin-right: 5px;"
               width="20" src="../../assets/img/reduce.png" alt="">
          <img v-show="showComplete" width="20"
               style="display: block;margin-right: 5px;"
               src="../../assets/img/list.png" alt="">
        </cell>
        <cell title="添加新房间" style="color: orange"></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell} from 'vux'
  export default {
    data() {
      return {
        list: [
          {id: 1, title: '客厅'},
          {id: 2, title: '卧室'},
          {id: 3, title: '客房'},
          {id: 4, title: '厨房'},
          {id: 5, title: '卫生间'}],
        showComplete: false
      }
    },
    methods: {
      showEdit() {
        this.showComplete = !this.showComplete
      },
      edit() {
        console.log(this.$refs)
      },
      change() {
        this.$vux.alert.show({
          title: '亲，正在测试哈',
          content: 'Do you agree?',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding now')
          }
        })
      }
    },
    components: {
      XHeader,
      Group,
      Cell
    }
  }
</script>

<style lang="less" scoped>

</style>
