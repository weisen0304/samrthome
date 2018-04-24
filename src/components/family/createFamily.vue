<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'创建家庭'">
        <a @click="saveCreated" slot="right">保存</a>
      </x-header>
    </div>

    <group title="我的家庭名称">
      <x-input :value="familyName" v-model="familyName">
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
        familyName: '我的家庭'
      }
    },
    created() {
    },
    methods: {
      saveCreated() {
        var that = this;
        var id = JSON.parse(localStorage.mydata).user.id
        this.$axios.post('/SmartHome/add_family', {
          id: id,
          familyName: this.familyName
        })
          .then((res) => {
            that.$router.go(-1)
          })
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
