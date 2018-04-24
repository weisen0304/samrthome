<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff"><span
      style="color: #aaa">找回密码</span></x-header>

    <group style="width: 90%;margin-left: 5%;text-align: left">
      <cell @click.native='clickAddress' :title="addressCity" :value="'+'+addressNum" is-link></cell>
    </group>

    <group style="width: 90%;margin-left: 5%;border:1px solid inherit;border-radius: 20px;">
      <x-input style="width: 90%;border:1px solid inherit;border-radius: 20px;" name="mobile" placeholder="请输入手机号"
               keyboard="number" is-type="china-mobile" v-model="phoneNum"></x-input>
    </group>

    <x-button @click.native="clickNext" :disabled="isNext" type="primary"
              style="width: 90%;margin-left: 5%;margin-top: 20px;margin-bottom: 20px;">
      下一步
    </x-button>

    <div style='font-size: 12px;'>注册即同意
      <router-link to='/' style='text-decoration: underline;color: #FFB90F;'>用户协议与隐私条款</router-link>
    </div>

    <div v-transfer-dom>

      <popup v-model="showAddress" position="bottom" style='height: 100%;'>
        <search
          position="absolute"
          auto-scroll-to-top top="0px"></search>

        <group v-for='i in 26' :key='i' :title="String.fromCharCode((64+i))" style='top: 20px;'>
          <cell @click.native='clickNum(item)' v-for="item in items" :key="item.id" :title="item.title"
                :value="item.value"></cell>
        </group>

        <div style='position: fixed;right: 5px;top: 150px;'>
          <p v-for="i in 26" style='font-size: 12px;line-height:14px;color:#e00;'>{{String.fromCharCode((64 + i))}}</p>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, XButton, Popup, TransferDom, Search} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      XButton,
      Popup,
      Search
    },
    data() {
      return {
        phoneNum: '',
        showAddress: false,
        addressCity: '中国',
        addressNum: '0086',
        items: [
          {
            id: 1,
            title: '中国',
            value: '0086'
          }, {
            id: 2,
            title: '日本',
            value: '0082'
          }, {
            id: 3,
            title: '韩国',
            value: '0023'
          }, {
            id: 4,
            title: '美国',
            value: '0032'
          }
        ],
        isNext: true
      }
    },
    methods: {
      clickAddress() {
        this.showAddress = true
      },
      clickNum(item) {
        this.addressNum = item.value
        this.addressCity = item.title
        this.showAddress = false
      },
      clickNext() {
        var that = this
        if (this.phoneNum.length === 11) {
          this.$vux.loading.show()
          setTimeout(() => {
            this.$axios.post('/SmartHome/getForgetPwdCode', {
              phone: that.phoneNum
            })
              .then((res) => {
                console.log(res)
              })
            this.$vux.loading.hide()
            this.$router.push({path: '/SMS_password', query: {phone: that.phoneNum}});
          }, 500)
        } else {
          this.$vux.alert.show({
            content: '手机号码错误'
          })
        }
      }
    },
    watch: {
      phoneNum: function (val, oldVal) {
        if (this.phoneNum !== '') {
          this.isNext = false
        } else {
          this.isNext = true
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
