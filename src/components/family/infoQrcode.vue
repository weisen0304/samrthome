<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'我的家庭'">
        <a @click="clickSave" slot="right">保存</a>
      </x-header>
    </div>
    <!--二维码-->
    <div>
      <qrcode :size="60"
              value="123"
              style="margin-top: 20px;"></qrcode>
      <p>家庭二维码</p>
    </div>
    <group style="text-align: center;">
      <div style="margin: 0 20px;padding: 10px;background: #000;border-radius: 20px">
        <div style="background: #a0a0a0;border-radius: 10px;padding: 5px;text-align: center;font-size: 24px;">
          {{joinCode}}
        </div>
      </div>
      <flexbox style="margin: 10px;">
        <flexbox-item>
          <x-button @click.native="clickGetCode" style="width: 100px;font-size: 12px;"
                    text="刷新邀请码"></x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button style="width: 100px;font-size: 12px;"
                    text="复制邀请码"></x-button>
        </flexbox-item>
      </flexbox>
    </group>
    <group title="家庭名称">
      <x-input placeholder=""
               :value="data.familyName"
               :show-clear="false"></x-input>
    </group>
    <group title="家庭地址">
      <x-input placeholder="地址为空"
               :value="data.familyAddress"
               :show-clear="false"></x-input>
    </group>
  </div>
</template>

<script>
  import {Actionsheet, XHeader, XButton, XInput, Flexbox, FlexboxItem, Qrcode, Group, Cell,} from 'vux'
  export default {
    data() {
      return {
        joinCode: '1dasdsa77213nsad3th',
        familyId: '',
        data: []
      }
    },
    created(){
      this.clickInit()
    },
    methods: {
      clickInit(){
        var familyId = this.$route.query.familyId
        this.$axios.get(`/SamrtHome/get_family/${familyId}`)
          .then((res) => {
            this.data = res.data[0]
          })
      },
      clickGetCode(){
        var id = JSON.parse(localStorage.mydata).user.id
        var familyId = this.$route.query.familyId
        this.$axios.post('/SamrtHome/add_family_uniquecode', {
          userId: id,
          familyId: familyId,
          uniqueCode: this.joinCode
        })
          .then((res) => {
            console.log(res)
          })
      },
      clickSave() {
        var id = this.$route.query.id;
        var userId = JSON.parse(localStorage.mydata).user.id
        this.$axios.post('/SamrtHome/ud_family', {
          userId: userId,
          id: id,
          familyAddress: address
        })
          .then((res) => {
            this.clickInit()
          })
        this.$vux.loading.show({
          text: '加载中'
        })
        setTimeout(() => {
          var that = this
          this.$vux.loading.hide(() => {
          })
          that.$router.push('/my_family')
        }, 1000)
      },
    },
    components: {
      Actionsheet,
      XHeader,
      Qrcode,
      Group,
      Cell,
      XButton,
      XInput,
      Flexbox,
      FlexboxItem
    }
  }
</script>

<style lang="less" scoped>

</style>
