<template>
  <div :style="'height: 100%;background: url('+bgImg+');background-position: center;opacity:.85;'">
    <!--header导航条-->
    <x-header :left-options="{showBack: false}"
              :title="'首页'">
      <x-img slot="right"
             width="20"
             src="http://www.xiaoxiangba.com/assets/img/add.png"
             @click.native="clickMore"></x-img>
    </x-header>
    <div style="margin: 10px 0 0 10px;float: left;position: relative">
      <div>
        <img slot="icon" :src="myImage" @click="clickChangeBg" style="width: 40px;height: 40px;border-radius: 50%;border: 2px solid #fff;
">
        <span style="line-height: 12px;font-size:14px;color: #fff;margin-left: 5px;">{{showFamilyName}}</span>
      </div>
      <group v-if="showFamliyList"
             style="position: absolute;width: 180px;color: #333;">
        <div v-for="(item,index) in familyData" :key="item.id"
             @click="clickFamilyId(item.id,index)" style="margin: 5px;padding: 5px;">{{item.familyName}}
        </div>
      </group>
    </div>
    <x-button @click.native="clickDevice"
              style="position: fixed;margin: 80px 10%;
              bottom: 0px;width: 80%;border-radius: 40px;
              opacity: .7;color: #999999;">
      查询设备
    </x-button>
    <!--tabbar导航栏-->
    <div>
      <tabbar style="position: fixed;">
        <tabbar-item selected link="/Home">
          <img slot="icon" src="../../assets/img/scene1.png">
          <span slot="label">我的设备</span>
        </tabbar-item>
        <tabbar-item link="/scene">
          <img slot="icon" src="../../assets/img/home.png">
          <span slot="label">智能场景</span>
        </tabbar-item>
        <tabbar-item link="/me">
          <img slot="icon" src="../../assets/img/me.png">
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
  import {
    Group,
    XImg,
    XButton,
    XHeader,
    Radio,
    Tabbar,
    TabbarItem
  } from 'vux'

  export default {
    data () {
      return {
        showFamliyList: false,
        showFamilyName: '我的家庭',
        showFamily: false,
        myImage: '',
        familyName: [],
        familyData: [],
        currentFamily: [],
        familyId: '',
        PId: '',
        bgImg: ''
      }
    },
    components: {
      Group,
      XImg,
      XButton,
      XHeader,
      Radio,
      Tabbar,
      TabbarItem
    },
    watch: {
      type(val){
        if (val) {
          this.showFamily = !this.showFamily
        }
      }
    },
    created(){
      this.clickInit()
      this.myImage = 'http://120.79.21.193/SmartHome' + JSON.parse(localStorage.mydata).user.photo
    },
    methods: {
      clickInit(){
        var id = JSON.parse(localStorage.mydata).user.id
        this.$axios.get('/SmartHome/get_family?id=' + id)
          .then((res) => {
            var currentFamily = JSON.parse(localStorage.getItem('currentFamily'))
            this.familyData = res.data
            this.bgImg = 'http://120.79.21.193/SmartHome' + currentFamily.photo
            this.familyId = currentFamily.id
          })
      },
      clickFamilyId(id, idx){
        this.currentFamily = this.familyData[idx]
        localStorage.setItem('currentFamily', JSON.stringify(this.currentFamily))
        var currentFamily = JSON.parse(localStorage.getItem('currentFamily'))
        this.bgImg = 'http://120.79.21.193/SmartHome' + currentFamily.photo
        this.showFamilyName = currentFamily.familyName
        this.familyId = currentFamily.id
        this.showFamliyList = false
      },
      clickChangeBg(){
        this.showFamliyList = true
      },
      clickDevice() {
        this.$router.push({path: '/user_device', query: {familyId: this.familyId}})
      },
      clickMore() {
        this.$router.push({path: '/all_device', query: {familyId: this.familyId}})
      }
    }
  }
</script>
