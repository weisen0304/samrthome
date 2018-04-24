<template>
  <div style="height: 660px;background: #333;color: #fff">
    <!--header导航条-->
    <x-header :left-options="{showBack: true}"
              :right-options="{showMore: true}"
              @on-click-more="clickMore"
              style="position: fixed;background: #333;color: #fff;">
      <span style="color: #fff;">{{data.name}}</span>
    </x-header>
    <div style="position: relative;top: 40px;height: 90%;">
      <load-more tip="请点击列表指令操作" :show-loading="false" background-color="#fbf9fe"></load-more>
      <!--tabbar导航栏-->
      <div>
        <tabbar v-model="index" style="position: fixed;">
          <tabbar-item :selected="demo2 === item.name" v-for="(item, index) in list2" @click="demo2 = item"
                       :key="index">
            <img slot="icon" :src="item.imgUrl">
            <span slot="label">{{item.name}}</span>
          </tabbar-item>
        </tabbar>
        <swiper v-model="index" height="400" style="position: relative;height: 400px;" :show-dots="false">
          <swiper-item height="400" v-for="(item, index) in list2" :key="index"
                       style="height: 100%;overflow:scroll;position: relative !important;">
            <div style="padding:0 15px;" v-if="index == 0">
              <x-table>
                <thead>
                <tr>
                  <th>指令名称</th>
                  <th>指令</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data.operatorList"
                    :key="item.id"
                    @click="clickCode(item.id)">
                  <td>{{item.id}} : {{item.description}}</td>
                  <td width="200">
                    {{item.status}}
                  </td>
                </tr>
                </tbody>
              </x-table>
            </div>
            <div id="myChart" style="width: 100%;height: 300px;" v-else-if="index == 1"></div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>

</template>

<script>
  import {Swiper, SwiperItem, Tabbar, TabbarItem, XHeader, XTable, XButton, XSwitch, LoadMore} from 'vux'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        index: 0,
        selected: '',
        list2: [
          {
            imgUrl: 'http://xiaoxiangba.com/assets/img/scene.png',
            name: '设备操作'
          }, {
            imgUrl: 'http://xiaoxiangba.com/assets/img/me.png',
            name: '设备信息'
          }
        ],
        demo2: '设备操作',
        data: [],
        switchStatus: false
      }
    },
    created(){
        this.clickInit()
    },
    methods: {
      clickInit(){
        var deviceId = this.$route.query.deviceId
        this.$axios.get(`/SmartHome/get_device/${deviceId}`)
          .then((res) => {
            console.log(res);
            this.data = res.data[0]
          })
      },
      clickMore() {
        var deviceId = this.$route.query.deviceId
        this.$router.push({path: 'del_device', query: {deviceId: deviceId}})
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: 'ECharts 入门示例'},
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      clickCode(id) {
        console.log(id);
        this.$vux.loading.show({
          text: 'loading'
        })
        this.$axios.post('/SmartHome/up_device',{
            id: id,
          status: '关闭'
        })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 3000)
      }
    },
    mounted(){
      this.drawLine();
    },
    components: {
      Swiper,
      SwiperItem,
      Tabbar,
      TabbarItem,
      XHeader,
      XTable,
      XButton,
      XSwitch,
      LoadMore
    }
  }
</script>

<style lang="less" scoped>
  .weui-cell_switch .weui-cell__ft {
    height: 32px;
  }

  .vux-slider {
    height: 100% !important;
  }

  .vux-slider > .vux-swiper {
    overflow: hidden;
    position: inherit !important;
  }
</style>
