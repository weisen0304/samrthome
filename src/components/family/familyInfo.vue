<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'我的家庭'">
      </x-header>
    </div>

    <!--body栏-->
    <group style="text-align: left;margin: 20px 0;">
      <cell link="/me/my_family/family_info/info_qrcode"
            title="我的家庭"
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
      <cell link="/me/my_family/family_info/family_photo"
            inline-desc="给家庭挑选或拍一张图片"
            style="margin: 10px 0;text-align: center"
            is-link>
        <img slot="icon"
             width="120" height="60"
             src="../../assets/img/bg01.jpg"
             style="margin-right: 10px;opacity: .6;">
      </cell>
      <cell link="/me/my_family/family_info/family_roles"
            title="家庭成员"
            is-link></cell>
      <cell link="/me/my_family/family_info/rooms_manage"
            title="房间管理" value="21间" is-link></cell>

      <x-address @on-hide="logHide" @on-show="logShow"
                 title="当前家庭住址" v-model="value" :list="addressData"
                 @on-shadow-change="onShadowChange" placeholder="请选择地址"
                 :show.sync="showAddress"></x-address>

      <cell link="/me/my_family/family_info/houseload_electricity"
        title="当地电价" is-link></cell>
    </group>

    <group style="text-align: left;margin: 20px 0;">
      <cell title="授权中心" is-link></cell>
    </group>


  </div>
</template>

<script>
  import {XHeader,ChinaAddressV4Data, XAddress, Group, Cell} from 'vux'
  export default {
    data() {
      return {
        value: [],
        showAddress: false,
        addressData: ChinaAddressV4Data
      }
    },
    methods: {
      onShadowChange (ids, names) {
//        console.log(ids, names)
      },
      logHide (str) {
//        console.log('on-hide', str)
      },
      logShow (str) {
//        console.log('on-show')
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

<style lang="less" scoped>

</style>
