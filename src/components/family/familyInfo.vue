<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'我的家庭'">
      </x-header>
    </div>
    <!--body栏-->
    <group style="text-align: left;margin: 20px 0;">
      <cell @click.native="clickFamilyInfo"
            :title="data.familyName"
            is-link>
        <div>
          <img slot="right"
               width="30"
               src="../../assets/img/qrcode.png"
               style="display: block;">
        </div>
      </cell>
    </group>

    <group title="基本信息" style="text-align: left;margin: 20px 0;">
      <cell @click.native="clickPhoto"
            inline-desc="给家庭挑选或拍一张图片"
            style="margin: 10px 0;text-align: center"
            is-link>
        <img slot="icon"
             width="120" height="60"
             :src="data.photo !== ''?'http://120.79.21.193/SmartHome'+data.photo:familyImg"
             style="margin-right: 10px;opacity: .6;">
      </cell>
      <cell @click.native="clickAddress"
            title="家庭成员"
            is-link></cell>
      <x-address style="display:none;" title="当前家庭住址" v-model="value" :list="addressData" placeholder="请选择地址"
                 :show.sync="showAddress"></x-address>
    </group>
  </div>
</template>

<script>
  import {XHeader, ChinaAddressV4Data, XAddress, Group, Cell} from 'vux'
  export default {
    data() {
      return {
        data: [],
        familyName: '',
        showAddress: false,
        addressData: ChinaAddressV4Data,
        value: [],
        familyId: '',
        familyImg: 'http://www.xiaoxiangba.com/assets/img/bg01.jpg'
      }
    },
    created() {
      this.clickInit()
    },
    methods: {
      clickInit(){
        var id = this.$route.query.id;
        this.$axios.get(`/SmartHome/get_family/${id}`)
          .then((res) => {
            this.data = res.data[0]
            this.address = res.data[0].familyAddress
            this.familyId = res.data[0].id
          })
      },
      clickPhoto(){
        this.$router.push({path: '/my_family/family_photo', query: {familyId: this.familyId}})
      },
      clickFamilyInfo(){
        this.$router.push({path: '/my_family/info_qrcode', query: {familyId: this.familyId}})
      },
      clickAddress(){
        this.$router.push({path: '/my_family/family_roles', query: {familyId: this.familyId}})
      }
    },
    components: {
      XAddress,
      XHeader,
      Group,
      Cell
    }
  }
</script>
