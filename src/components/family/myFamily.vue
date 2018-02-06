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
      <swipeout-item transition-mode="follow" v-for="i in 1" :key="i">
        <div slot="right-menu">
          <swipeout-button type="warn">删除</swipeout-button>
        </div>
        <div slot="content" :class="{'vux-1px-b': i !== 3, 'vux-1px-t': i === 1}" style="padding:12px;">
          <cell link="/me/my_family/family_info"
                :title="familyName"
                :inline-desc="'创建者:'+createdName"
                is-link>
            <img slot="icon"
                 width="120" height="60"
                 src="../../assets/img/bg01.jpg"
                 style="margin-right: 10px;opacity: .6;">
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
        getName: this.$store.state.family.createdName,
        familyName: this.$store.state.login.userInfo[0].family.familyName,
        createdName: this.$store.state.login.userInfo[0].user.username
      }
    },
    created() {
      var id = this.$store.state.login.userInfo[0].family.id
      this.$http.get('http://120.79.21.193/SmartHome/family/' + id, {}).then((res) => {
        this.$store.commit('familyInfo', res.body)
      }), (err) => {
        console.log(err)
      }
    },
    methods: {
      clickMore() {
        this.showMore = !this.showMore
      },
      createFamily() {
        this.$router.push('/me/create_family')
      },
      joinFamily() {
        this.$router.push('/me/join_family')
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
