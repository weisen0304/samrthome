<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'创建家庭'">
        <a @click="saveCreated" slot="right">保存</a>
      </x-header>
    </div>

    <group title="我的家庭名称">
      <x-input :value="createdName" v-model="createdName">
      </x-input>
      <x-button @click.native="saveCreated"
                style="margin-top: 20px;">
        创建
      </x-button>
    </group>
  </div>
</template>

<script>
  import {XHeader, XButton, XInput, Group} from 'vux'
  export default {
    data() {
      return {
        createdName: '我的家庭'
      }
    },
    methods: {
      saveCreated() {
        this.$store.commit('createdManage', this.createdName)
        console.log(this.createdName)
        this.$vux.loading.show({})
        setTimeout(() => {
          this.$vux.loading.hide()
          this.$router.push('/me/my_family')
        }, 1000)

      }
    },
    components: {
      XHeader,
      XInput,
      XButton,
      Group
    }
  }
</script>

<style lang="less" scoped>

</style>
