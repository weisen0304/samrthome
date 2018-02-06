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
              value="https://vux.li?x-page=demo_qrcode"
              style="margin-top: 20px;"></qrcode>
      <p>家庭二维码</p>
    </div>

    <group style="text-align: center;">
      <div style="margin: 0 20px;padding: 10px;background: #000;border-radius: 20px">
        <div style="background: #a0a0a0;border-radius: 10px;padding: 5px;text-align: center;font-size: 24px;">
          asdslkdjaksjdaada
        </div>
      </div>

      <flexbox style="margin: 10px;">
        <flexbox-item>
          <x-button style="width: 100px;font-size: 12px;"
                    text="刷新邀请码"></x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button style="width: 100px;font-size: 12px;"
                    text="复制邀请码"></x-button>
        </flexbox-item>
      </flexbox>

    </group>

    <group title="家庭名称">
      <x-input type="text"
               value="我的家庭"
               :show-clear="false"></x-input>
    </group>

    <group title="家庭的加入权限">
      <cell @click.native="clickRoot"
            title="权限" is-link>{{menus[key]}}
      </cell>
    </group>

    <actionsheet v-model="showRoot" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>

  </div>
</template>

<script>
  import {Actionsheet, XHeader, XButton,XInput, Flexbox, FlexboxItem, Qrcode, Group, Cell,} from 'vux'
  export default {
    data() {
      return {
        showRoot: false,
        menus: {
          menu1: '邀请加入',
          menu2: '开发加入',
          menu3: '锁定'
        },
        key: 'menu3'
      }
    },
    methods: {
      clickSave() {
        this.$vux.loading.show({
          text: '加载中'
        })
        setTimeout(() => {
          var _this = this
          this.$vux.loading.hide(() => {
          })
          _this.$router.push('/me/my_family')
        }, 1000)
      },
      clickRoot() {
        this.showRoot = !this.showRoot
      },
      click (key) {
        if (key !== 'cancel') {
          this.key = key
        }
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
