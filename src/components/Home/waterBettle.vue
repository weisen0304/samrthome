<template>
  <div style="height: 660px;background: #333;color: #fff">

    <!--header导航条-->
    <x-header :left-options="{showBack: true}"
              :right-options="{showMore: true}"
              @on-click-more="clickMore"
              style="background: #333;color: #fff;">
      <span style="color: #fff;">SN001</span>
    </x-header>

    <!--功能状态栏-->
    <div :class="{'open-button': !lightClass}" v-show="lightClass">
      <div style='width:150px;height:120px;margin: 150px auto;margin-bottom: 40px;'>
        <x-circle :stroke-width="3" stroke-color="#fff">
          <div style="padding-top: 50%;margin-top: -40px;">
            <p style="font-size: 12px;">当前温度</p>
            <p style="font-size: 30px;" v-if="demo2 != '自冷'">{{demo2}}&deg;C</p>
            <p style="font-size: 30px;" v-else="demo2 = '自冷'">{{demo2}}</p>
            <!--<p style="font-size: 12px;">待机状态</p>-->
            <p style="font-size: 12px;">00:
              <countdown v-model="time" :start="start" @on-finish="finish" v-show="show"></countdown>
              {{parseInt((time) / 60)}}
            </p>
            <p style="font-size: 12px;">{{items[demo].value}}</p>
          </div>
        </x-circle>

      </div>
      <div class="box">
        <checker v-model="demo2"
                 default-item-class="demo2-item"
                 selected-item-class="demo2-item-selected"
                 radio-required>
          <checker-item value="100">100</checker-item>
          <checker-item value="80">80</checker-item>
          <checker-item value="60">60</checker-item>
          <checker-item value="40">40</checker-item>
          <checker-item value="自冷">自</checker-item>
        </checker>
      </div>
    </div>

    <!--tabbar功能栏-->
    <tabbar style="background: #333;color: #ccc;"
            default-item-class="demo-item"
            selected-item-class="demo-item-selected"
            radio-required
            v-model="demo">
      <tabbar-item value="开关" @click.native="showLight">
        <img slot="icon" src="http://xiaoxiangba.com/assets/img/waterSwitch.png">
        <span slot="label">开关</span>
      </tabbar-item>
      <tabbar-item value="煮水" v-show="lightClass">
        <img slot="icon" src="http://xiaoxiangba.com/assets/img/boilWater.png">
        <span slot="label">煮水</span>
      </tabbar-item>
      <tabbar-item value="保温" v-show="lightClass">
        <img slot="icon" src="http://xiaoxiangba.com/assets/img/keepWarm.png">
        <span slot="label">保温</span>
      </tabbar-item>
      <tabbar-item value="定时" v-show="lightClass" @click.native="finish">
        <img slot="icon" src="http://xiaoxiangba.com/assets/img/waterTiming.png">
        <span slot="label">定时</span>
      </tabbar-item>
    </tabbar>

    <!--待开发组件-->
    <TODO @close="todoStatus = false" v-show="todoStatus"></TODO>

  </div>
</template>

<script>
  import TODO from '../common/TODO.vue'
  import {
    Actionsheet,
    XButton,
    XHeader,
    XCircle,
    XSwitch,
    Tabbar,
    TabbarItem,
    TransferDom,
    Checker,
    CheckerItem,
    Countdown,
    Countup,
    Cell
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        list: [
          {
            "PowerStatus": "1"
          },
          {
            "ID": "SN001",
            "Name": "智能热水壶",
            "Type": "家电",
            "Icon": "http://xiaoxiangba.com/assets/img/waterBettle.png",
            "Title": "这是一款......",
            "DateTime": "2018-01-18",
            "workerTime": "30",
            "Functions": {
              "BoilMode": {
                "Name": "煮水",
                "Icon": "http://xiaoxiangba.com/assets/img/waterBettle.png",
                "BoilSwitch": "B1",
                "LED": "L0"
              },
              "KeepWarm": {
                "Name": "保温",
                "Icon": "http://xiaoxiangba.com/assets/img/waterBettle.png",
                "WarmSwitch": "K1",
                "Attemperation": "95"
              },
              "Adjustment": {
                "Name": "调节",
                "Icon": "http://xiaoxiangba.com/assets/img/waterBettle.png",
                "AdjustSwitch": "A1",
                "Attemperation": "100"
              },
              "ManualMode": {
                "Name": "手动",
                "Icon": "http://xiaoxiangba.com/assets/img/waterBettle.png",
                "Manual": "M1"
              }
            }
          }],
        todoStatus: false,
        doStart: false,
        show: false,
        lightClass: false,
        time: 1800,
        start: false,
        items: [
          {
            key: '0',
            value: '开关'
          }, {
            key: '1',
            value: '煮水'
          }, {
            key: '2',
            value: '保温'
          }, {
            key: '3',
            value: '定时'
          }],
        demo: 0,
        demo2: '0',
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false
      }
    },
    created() {
//      let data = this.list[1]
//      let Adjustment = data.Functions.Adjustment.AdjustSwitch
//      let BoilMode = data.Functions.BoilMode.BoilSwitch
//      let KeepWarm = data.Functions.KeepWarm.WarmSwitch
//      let ManualMode = data.Functions.ManualMode.Manual
//      setTimeout(() => {
//        this.$http.get('http://localhost:9090/list?id=' + data.ID + '&instruct=' + data.Functions.KeepWarm.WarmSwitch, {
//          data
//        }).then((res) => {
//          console.log(res)
//        }), (err) => {
//          console.log(err)
//        }
//      }, 1000)
//      setTimeout(() => {
//        this.$http.post('http://localhost:9090/post?id=' + data.ID + '&instruct=' + data.Functions.KeepWarm.WarmSwitch, {
//          data
//        }).then((res) => {
//          console.log(res)
//        }), (err) => {
//          console.log(err)
//        }
//      })
    },
    methods: {
      clickMore() {
        this.$router.push('/deldevice')
      },
      showLight() {
        this.$vux.loading.show({
          text: 'loading'
        })

        setTimeout(() => {
//          this.lightClass = !this.lightClass
          this.$router.push('/device_detail')
          this.$vux.loading.hide()
        }, 3000)

      },
      finish () {
        this.start = !this.start
      },
    },
    components: {
      TODO,
      Actionsheet,
      Countup,
      Countdown,
      Cell,
      XButton,
      XHeader,
      XCircle,
      XSwitch,
      Tabbar,
      TabbarItem,
      Checker,
      CheckerItem
    }
  }
</script>

<style lang="less" scoped>
  .open-button {
    color: #ccc;
  }

  .weui-tabbar:before {
    height: 0;
    border: 0;
  }

  .box {
    padding: 0 15px;
  }

  .demo-item {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 5px;
    line-height: 50px;
    text-align: center;
  }

  .demo-item-selected {
    border-color: #fff;
    color: #fff;
  }

  .demo2-item {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
  }

  .demo2-item-selected {
    border-color: green;
    color: green;
  }
</style>
