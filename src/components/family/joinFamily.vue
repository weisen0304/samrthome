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
        joinCode: ''
      }
    },
    methods: {
      joinList() {
        this.$vux.loading.show()
        setTimeout(() => {
          this.$vux.loading.hide()
          if (this.joinCode == '123') {
            this.$router.push('/me/my_family')
          } else {
            this.$vux.alert.show({
              title: '无效的邀请码!'
            })
          }
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
