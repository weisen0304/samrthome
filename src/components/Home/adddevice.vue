<template>
  <div>
    <x-header :left-options="{showBack: true}" style="position:fixed;background: #fff"><span
      style="color: #aaa;">添加设备</span><a
      slot="right">兼容模式</a></x-header>

    <div style="position: relative;top: 40px;">
      <div>
        <img src="../../assets/img/home.png" style="width: 200px;height: 200px;">
        <p style="text-align: center">接通电源，确定指示灯在快闪</p>
        <a><p style="text-align: center">如何将指示灯设置为快闪</p></a>
        <x-button @click.native="showToast=true"
                  style="position:fixed;width: 90%;background: #0e0;color: #fff;left: 5%;bottom: 20px;">确定指示灯在快闪
        </x-button>
      </div>
      <div>
        <x-dialog v-model="showToast" class="dialog-demo">
          <div @click="showToast=false,show1=true,show2=false,show3=false">
            <span class="vux-close"></span>
          </div>
          <div v-show="show1">
            <p style="margin: 20px;font-size: 16px;">输入家中的WIFI密码</p>
            <x-input text-align="center" style="border-radius: 8px;background: #f7f7f7;margin: 0 15px;">
              <img slot="label" style="padding-right:10px;display:block;" src="../../assets/img/wifilock.png" width="20">
            </x-input>
            <div style="padding:15px;">
              <p style="font-size: 12px;">当前 WIFI: ZC-ROOM-10
                <router-link to="/#" style="color: #a5bfe9;">更换网络</router-link>
              </p>
            </div>
            <p @click="show1=false,show2=true,loadingTime()" class="vux-1px-t"
               style="display: block;padding: 15px;color: #3b39e9;">
              确定</p>
          </div>

          <div v-show="show2">
            <p style="margin: 20px;font-size: 16px;">正在连接</p>

            <div style='width:100px;height:100px;margin: 0 auto;'>
              <x-circle :percent="percent2" :stroke-width="6" :trail-width="6" :stroke-color="strokeColor2"
                        trail-color="#ececec">
                <span :style="{color: strokeColor2}">{{percent2}}%</span>
              </x-circle>
            </div>

            <div style="padding-top:15px;">
              <p style="font-size: 12px;">路由器、手机和设备尽量靠近</p>
            </div>

            <flow id="flow" orientation="horizontal" style="height:60px;font-size: 10px;">
              <flow-state state="1" :title="'找到设备'" is-done></flow-state>
              <flow-line class="weui-wepay-flow__line_done" :line-span="showDoc1"></flow-line>

              <flow-state class="weui-wepay-flow__li_done" state="2" :title="'设备注册中'"></flow-state>
              <flow-line :line-span="showDoc2"></flow-line>

              <flow-state state="3" :title="'设备初始化'"></flow-state>
            </flow>
          </div>
        </x-dialog>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    XHeader,
    XButton,
    XImg,
    TransferDomDirective as TransferDom,
    XDialog,
    XInput,
    XCircle,
    Flow,
    FlowState,
    FlowLine
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    created() {
    },
    data() {
      return {
        showToast: false,
        show1: true,
        show2: false,
        show3: false,
        percent2: 0,
        strokeColor2: '#3FC7FA',
        showDoc1: '',
        showDoc2: '',
        showDoc3: '',
      }
    },
    methods: {
      loadingTime() {
        this.percent2 = 0
        var self = this
        if (this.show2 = true) {
          for (var i = 0; i < 20; i++) {
            setTimeout(function () {
              self.percent2 += (i / 4)
              if (self.percent2 === 30) {
                this.showDoc1 = self.percent2
              } else if (self.percent2 === 60) {
                this.showDoc2 = self.percent2
              } else if (self.percent2 === 100) {
                self.show2 = false
//                self.show3 = true
                self.$router.push('/user_device');
              }
            }, i * 1000)
          }
        }
      }
    },
    components: {
      Flow,
      FlowState,
      FlowLine,
      XCircle,
      XInput,
      XDialog,
      XImg,
      XButton,
      XHeader
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/close';
  @import '~vux/src/styles/1px.less';

  .weui-cell:before {
    border: 0;
  }

  .dialog-demo {
    x-input::before {
      border: 0;
    }
    .vux-close {
      position: absolute;
      right: 0;
      top: 0;
      margin: 8px;
    }
  }
</style>
