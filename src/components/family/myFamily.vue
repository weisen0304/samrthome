<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'我的家庭'">
        <div style="margin: -12px -10px 0 0" slot="right">
          <x-icon @click.native="clickMore" type="ios-plus-empty" size="40"
                  style="position: relative;fill: #fff;"></x-icon>
          <div v-show="showMore"
               style="position: absolute;right: -12px;background: #000;
               color: #fff;font-size: 12px;width: 100px;text-align: left;">
            <cell @click.native="createFamily"
                  title="创建家庭"
                  style="margin:  0;">
            </cell>
            <cell @click.native="joinFamily"
                  title="加入家庭"
                  style="margin: 0;">
            </cell>
          </div>
        </div>
      </x-header>
    </div>

    <!--body栏-->
    <swipeout class="vux-1px-tb" style="margin: 20px 0;">
      <swipeout-item transition-mode="follow" v-for="item in data" :key="item.id">
        <div slot="right-menu">
          <swipeout-button type="warn" @click.native="clickDetele(item.id)">删除</swipeout-button>
        </div>
        <div slot="content" style="padding:12px;">
          <cell :link="'/my_family/family_info?id='+item.id"
                :inline-desc="item.familyName"
                is-link>
            <img slot="icon"
                 width="150" height="80"
                 :src="item.photo !== ''?'http://120.79.21.193/SmartHome'+item.photo:familyImg"
                 style="margin-right: 10px;opacity: .8;">
          </cell>
        </div>
      </swipeout-item>
    </swipeout>

  </div>
</template>

<script>
  import {XHeader, Group, Cell, Swipeout, SwipeoutItem, SwipeoutButton,} from 'vux'
  export default {
    data() {
      return {
        showMore: false,
        data: [],
        familyImg: 'http://www.xiaoxiangba.com/assets/img/bg01.jpg'
      }
    },
    created() {
      this.clickInit()
    },
    methods: {
      clickInit(){
        var id = JSON.parse(localStorage.mydata).user.id
        this.$axios.get(`/SmartHome/get_family?id=${id}`)
          .then((res) => {
            this.data = res.data
          })
      },
      clickDetele(familyId){
        var userId = JSON.parse(localStorage.mydata).user.id
        this.$axios.post('/SmartHome/del_family', {
          userId: userId,
          familyId: familyId
        })
          .then((res) => {
            this.clickInit()
          })
      },
      clickMore() {
        this.showMore = !this.showMore
      },
      createFamily() {
        this.$router.push('/my_family/create_family')
      },
      joinFamily() {
        this.$router.push('/my_family/join_family')
      }
    },
    components: {
      XHeader,
      Group,
      Cell,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
    }
  }
</script>

<style lang="less" scoped>

</style>
