<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'邀请码加入'">
      </x-header>
    </div>

    <group style="margin-top: 20px;"
           :title="'填写加入家庭的邀请码'">
      <x-input v-model="joinCode" placeholder="请输入邀请码">
        <x-button slot="right" type="primary" mini>粘贴</x-button>
      </x-input>
      <x-button style="margin-top: 50px;" @click.native="joinList">确定</x-button>
    </group>

  </div>
</template>

<script>
  import {XHeader, XInput, XButton, Group} from 'vux'
  export default {
    data() {
      return {
        joinCode: '',
        familyId: ''
      }
    },
    methods: {
      clickInit(){
        var id = JSON.parse(localStorage.mydata).user.id
        this.$axios.get(`/SmartHome/get_family?id=${id}`)
          .then((res) => {
            this.familyId = res.data[0].id
          })
      },
      joinList() {
        this.$vux.loading.show()
        setTimeout(() => {
          this.$vux.loading.hide()
          var id = JSON.parse(localStorage.mydata).user.id
          this.$axios.post('/SmartHome/add_member', {
            userId: id,
            uniqueCode: this.joinCode
          })
            .then((res)=>{console.log(res)})
        }, 1000)
      }
    },
    components: {
      XButton,
      XHeader,
      XInput,
      Group
    }
  }
</script>

<style lang="less" scoped>

</style>
