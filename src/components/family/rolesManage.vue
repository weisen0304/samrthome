<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'家庭成员'">
      </x-header>
    </div>

    <swipeout class="vux-1px-tb" style="margin: 10px 0;">
      <swipeout-item  class="vux-1px-tb" transition-mode="follow" v-for="item in data" :key="item.id">
        <div slot="right-menu">
          <swipeout-button type="warn" @click.native="clickDetele(item.id)">删除</swipeout-button>
        </div>
        <div slot="content" style="padding: 4px;">
          <cell :inline-desc="item.nickname">
            {{item.phone}}
            <img slot="icon"
                 width="60" height="60"
                 :src="'http://192.168.3.8:8080/SmartHome'+item.photo"
                 style="margin-right: 10px;opacity: .8;border-radius: 50%">
          </cell>
        </div>
      </swipeout-item>
    </swipeout>

  </div>
</template>

<script>
  import {XHeader, XButton, Cell, Checklist, Group, CellBox, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  export default {
    data() {
      return {
        data: []
      }
    },
    created(){
      this.clickInit();
    },
    methods: {
      clickInit(){
        var id = JSON.parse(localStorage.mydata).user.id
        var familyId = parseInt(this.$route.query.familyId)
        this.$axios.get(`/SmartHome/get_normal_member?userId=${id}&familyId=${familyId}`)
          .then((res) => {
            this.data = res.data
          })
      },
      clickDetele(deleteUserId){
        var that = this;
        var userId = JSON.parse(localStorage.mydata).user.id
        var familyId = this.$route.query.familyId
        this.$axios.post('/SmartHome/del_member', {
          userId: userId,
          familyId: familyId,
          deleteUserId: deleteUserId
        })
          .then((res) => {
            that.clickInit()
          })
      },
    },
    components: {
      XHeader,
      XButton,
      Checklist,
      Cell,
      CellBox,
      Group,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    }
  }
</script>

<style lang="less" scoped>

</style>
