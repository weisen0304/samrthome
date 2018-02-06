<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'家庭成员'">
      </x-header>
    </div>

    <group>
      <div style="width: 30%;text-align: center;margin: 20px 0;">
        <img width="60"
             style="border-radius: 50%;margin: 0 20px;"
             src="../../assets/img/myimage.jpg" alt="">
        <span>{{nickName}}</span>
      </div>
    </group>

    <group>
      <cell :title="rootManage"
            :value="nickName"
            is-link></cell>
    </group>

    <group>
      <cell link="/me/my_family/family_info/family_roles/roles_manage"
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
        rootManage: this.$store.state.family.familyInfo[0].userList[0].role,
        nickName: this.$store.state.login.userInfo[0].user.username
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
