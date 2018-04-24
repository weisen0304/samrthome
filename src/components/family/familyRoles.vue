<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'家庭成员'">
      </x-header>
    </div>

    <group>
      <div style="width: 30%;text-align: center;margin: 20px 0;display: inline-block;" v-for="item in admin"
           :key="item.id">
        <img width="60" height="60"
             style="border-radius: 50%;margin: 0 20px;"
             :src="'http://192.168.3.8:8080/SmartHome'+item.photo" alt="">
        <span>{{item.nickname}}</span>
      </div>
      <div style="width: 30%;text-align: center;margin: 20px 0;display: inline-block;" v-for="item in role"
           :key="item.id">
        <img width="60" height="60"
             style="border-radius: 50%;margin: 0 20px;"
             :src="'http://192.168.3.8:8080/SmartHome'+item.photo" alt="">
        <span>{{item.nickname}}</span>
      </div>
    </group>

    <group>
      <cell :title="rootManage"
            :value="nickName"
            is-link></cell>
    </group>

    <group>
      <cell @click.native="clickManage"
            title="成员管理"
            is-link></cell>
    </group>

  </div>
</template>

<script>
  import {XHeader, Group, Cell} from 'vux'
  export default {
    data() {
      return {
        rootManage: '管理员',
        nickName: 'hws',
        familyId: '',
        admin: [],
        role: [],
        data: []
      }
    },
    created() {
      this.clickInit()
    },
    methods: {
      clickInit(){
        var that = this
        var id = JSON.parse(localStorage.mydata).user.id
        this.$axios.get(`/SamrtHome/get_family?id=${id}`)
          .then((rs) => {
            that.familyId = rs.data[0].id
            this.$axios.get(`/get_member?id=${that.familyId}`)
              .then((res) => {
                that.admin = res.data[0].创建者
                that.role = res.data[0].普通成员
              })
          })
      },
      clickManage(){
        var that = this
        this.$router.push({path: '/my_family/roles_manage', query: {familyId: that.familyId}})
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
