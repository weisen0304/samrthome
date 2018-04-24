<template>
  <div>
    <!--header导航条-->
    <div style="color: #fff">
      <x-header :left-options="{showBack: true}" :title="'图库'">
        <div slot="right"
             v-show="demo01"
             @click="showDetail = !showDetail"
             style="color: #fff"><p v-show="!showDetail">编辑</p>
          <p v-show="showDetail">完成</p>
        </div>
      </x-header>
    </div>
    <button-tab v-model="demo01" style="width: 80%;margin: 20px auto">
      <button-tab-item @on-item-click="consoleIndex()">官方图库</button-tab-item>
      <button-tab-item @on-item-click="consoleIndex()">自定义图库</button-tab-item>
    </button-tab>
    <br>
    <div style="text-align: left;margin-left: 3px;">
      <div v-show="!demo01">
        <img width="120" height="120"
             v-for="(item,index) in bgImg" :key="item" :src="item" :alt="item"
             @click="clickChooseImg(item.id)">
      </div>
      <div v-show="demo01">
        <div v-for="item in photo" :key="item.id"
             @click="clickChooseImg(item.id)"
             style="position: relative;display: inline-block;height: 120px;width: 120px;">
          <img width="120" height="120"
               :src="'http://120.79.21.193/SmartHome'+item.imgUrl" alt="">
          <span v-if="showDetail"
                style="position: absolute;top: 0;left: 0;background: #e00;font-size: 12px;border-radius: 2px;padding: 2px;color: #fff"
                @click="clickDetail(item.id)">删除</span>
        </div>
        <div style="width: 80px;height: 80px;background: #000;position: relative;display: inline-block;">
          <img src="http://www.xiaoxiangba.com/assets/img/add.png"
               style="width: 40px;height: 40px;padding: 20px;">
          <input
            style="width:100%;height: 80px;opacity: 0;display: block;left: 0;top: 0;position: absolute;z-index: 999;background: #0e0"
            name="files" type="file" accept="image/png,image/gif,image/jpeg"
            multiple="multiple"
            @change="upload"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ButtonTab, ButtonTabItem, XHeader, Actionsheet} from 'vux'
  export default {
    data() {
      return {
        bgImg: [
          'http://www.xiaoxiangba.com/assets/img/bg01.jpg',
          'http://www.xiaoxiangba.com/assets/img/bg02.jpg',
          'http://www.xiaoxiangba.com/assets/img/bg03.jpg',
          'http://www.xiaoxiangba.com/assets/img/bg04.jpg',
          'http://www.xiaoxiangba.com/assets/img/bg05.jpg',
        ],
        showDetail: false,
        photo: [],
        demo01: 0,
        showComplete: false,
        edit: '编辑',
      }
    },
    created(){
      this.clickInit()
    },
    methods: {
      clickInit(){
        var id = JSON.parse(localStorage.mydata).user.id
        var familyId = parseInt(this.$route.query.familyId)
        this.$axios.get(`/SmartHome/get_familyimg?userId=${id}&familyId=${familyId}`)
          .then((res) => {
            res.data === 'you have not privilege' ? '' : this.photo = res.data
          })
      },
      clickChooseImg(familyImgId){
        var familyId = this.$route.query.familyId;
        this.$axios.post('/SmartHome/ud_familyimg', {
          familyImgId: familyImgId,
          familyId: familyId
        })
          .then((res) => {
            this.$router.push('/home')
          })
      },
      clickDetail(id){
        this.$axios.post('/SmartHome/del_familyimg', {
          userId: JSON.parse(localStorage.mydata).user.id,
          familyId: parseInt(this.$route.query.familyId),
          familyImgId: id
        })
          .then((res) => {
            var that = this
            this.showDetail = false
            setTimeout(function () {
              that.clickInit()
            }, 500)
            this.showDetail = false
          })
      },
      upload (e) {   // 上传照片
        var familyId = parseInt(this.$route.query.familyId)
        var userId = JSON.parse(localStorage.mydata).user.id
        var files = e.target.files
        for (var i in files) {
          if (typeof files[i] !== 'number' && typeof files[i] !== 'function') {
            var param = new FormData()
            param.append('files', files[i], files[i].name)
            param.append('userId', userId)
            param.append('familyId', familyId)
            var config = {
              headers: {'Content-Type': 'multipart/form-data'}
            };
            this.$axios.post('/SmartHome/add_familyimg', param, config)
              .then(res => {
                console.log(res);
                this.clickInit();
              })
          }
        }
      },
      consoleIndex() {
//        console.log(this.demo01)
      },
      showEdit() {
        this.showComplete = !this.showComplete
      },
      click(key) {
        console.log(key)
      }
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      XHeader,
      Actionsheet
    }
  }
</script>

<style lang="less" scoped>

</style>
