<template>
  <div>
    <x-header :left-options="{showBack: true}" style="background: #fff;position: fixed;margin-bottom: 60px;"><span
      style="color: #aaa">个人信息</span>
    </x-header>

    <div style="margin-top: 60px;">
      <group style="text-align: left;">
        <input style="width:100%;height: 100px;opacity: 0;display: block;left: 0;position: absolute;z-index: 999;"
               name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
        <cell :title="'头像'" is-link>
          <img slot="icon" width="80" height="80" style="display:block;margin-right:15px;border-radius: 50%;"
               :src="myImage">
        </cell>
        <cell :title="'昵称'" is-link @click.native="clickNickname">
          <p>{{nickname}}</p>
        </cell>
        <cell :title="'性别'" is-link @click.native="clickSex">
          <p>{{sex}}</p>
        </cell>
        <datetime
          v-model="birthday"
          @on-change="clickBrithday"
          :title="'生日'"></datetime>

        <cell :title="'手机号码'" is-link @click.native="">
          <p>{{phone}}</p>
        </cell>
        <cell :title="'邮箱地址'" is-link @click.native="clickEmail">
          <p>{{email}}</p>
        </cell>
        <x-address @on-shadow-change="clickAddressName" :title="'家庭地址'" v-model="value3" raw-value
                   :list="addressData"></x-address>
      </group>
      <x-button @click.native="clickSubmit" style="background: #fff;color: #e00;margin-top: 8px;">提交修改</x-button>
      <x-button @click.native="clickLogout" style="background: #e00;color: #fff;">退出登录</x-button>
      <confirm v-model="show5"
               show-input
               @on-confirm="onConfirm5"
               :title="'请输入您的昵称'">
      </confirm>
      <actionsheet v-model="show2" :menus="menus2" @on-click-menu="clickChoose" show-cancel>
      </actionsheet>
      <actionsheet v-model="show4" :menus="menus4" show-cancel @on-click-menu="click4"></actionsheet>
    </div>
  </div>
</template>

<script>
  import {
    Confirm,
    Datetime,
    Loading,
    XButton,
    XImg,
    Cell,
    Group,
    XHeader,
    XSwitch,
    XAddress,
    ChinaAddressV4Data,
    Actionsheet,
    TransferDomDirective as TransferDom
  } from 'vux'
  import Uploader from 'vux-uploader'
  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        images: [
          {url: 'http://www.xiaoxiangba.com/assets/img/smile.png'}
        ],
        uploadUrl: {
          result: 0,
          message: "result不是0时候的错误信息",
          data: {
            url: "http://www.xiaoxiangba.com/assets/img/smile.png"
          }
        },
        userInfo: [],
        myImage: '../../../src/assets/img/defaultImg.png',
        value1: '2015-11-12',
        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV4Data,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        nickname: '用户3852',
        sex: '请输入您的性别',
        birthday: '请输入你的生日',
        phone: '15622633852',
        email: '添加邮箱',
        address: '请修改你的地址',
        temperature: '请修改你的温度',
        menus1: {},
        menus2: {
          menu1: '从相册上传'
        },
        menus4: {
          menu1: '男',
          menu2: '女'
        },
        isLogouting: false,
      }
    },
    created() {
      var mydata = JSON.parse(localStorage.mydata).user
      this.nickname = mydata.nickname
      this.phone = mydata.phone
      this.sex = mydata.sex
      this.email = mydata.email
      this.address = mydata.address
      this.birthday = mydata.birthday
      this.myImage = 'http://120.79.21.193/SmartHome' + mydata.photo
    },
    methods: {
      addImageMethod(value) {
        console.log(value)
      },
      clickSubmit() {
        var mydata = JSON.parse(localStorage.mydata).user
        this.$vux.alert.show({})
        this.$axios.post('/SmartHome/updateUserInfo', {
          id: mydata.id,
          nickname: this.nickname,
          sex: this.sex,
          birthday: this.birthday,
          phone: this.phone,
          email: this.email,
          address: this.address
        })
          .then((res) => {
//            localStorage.setItem('mydata', JSON.stringify(res.data[0]))
//            var mydata = JSON.parse(localStorage.mydata)
//            console.log(mydata)
            console.log(res)
          })
      },
      clickChange() {
        this.$router.push('/register')
      },
      clickAddress(value) {
        this.value3 = !this.value3
      },
      clickAddressName(id, name){
        this.address = name.join(' ')
      },
      clickEmail() {
        var that = this
        this.$vux.confirm.prompt('请输入你的邮箱', {
          onConfirm (value) {
            that.email = value
          }
        })
      },
      clickPhone() {
        var that = this
        this.$vux.confirm.prompt('请输入你的电话', {
          onConfirm (value) {
            that.phone = value
          }
        })
      },
      update (e) {   // 上传照片
        var mydata = JSON.parse(localStorage.mydata).user
        var self = this
        var file = e.target.files[0]
        var param = new FormData()
        param.append('file', file, file.name)
        param.append('id', mydata.id)
        var config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        self.$axios.post('/SmartHome/uploadUserPhoto', param, config)
          .then(res => {
            localStorage.setItem('mydata', JSON.stringify(res.data[0]))
            self.myImage = 'http://192.168.43.27:8080/SmartHome' + res.data[0].user.photo
          })
      },
      clickBrithday (value) {
        console.log('change', value)
        this.brithday = value
      },
      click (key) {
        console.log(key)
      },
      click4 (key, item) {
        this.sex = item
      },
      onConfirm6 (value) {
        this.phone = value
      },
      onConfirm5 (value) {
        this.nickname = value
      },
      clickNickname() {
        this.show5 = !this.show5
      },
      clickSex() {
        this.show4 = !this.show4
      },
      clickUpload() {
        this.update(e);
//        console.log('123')
//        this.show2 = !this.show2
      },
      clickChoose() {
        this.show2 = !this.show2
        this.addImageMethod()
      },
      clickLogout(){
        //删除cookie并跳到登录页
        this.delCookie('session');
        localStorage.removeItem("mydata");
        //演示
        setTimeout(() => {
          this.$axios.post('/SmartHome/logout')
            .then((res) => {
              console.log(res)
            })
          this.$router.push('/login');
        }, 3000)
        this.$http.get('/SmartHome/logout')
          .then((res) => {
            console.log(res.body)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    components: {
      Confirm,
      Datetime,
      Loading,
      Actionsheet,
      XSwitch,
      XButton,
      XImg,
      Cell,
      Group,
      XHeader,
      XAddress,
      ChinaAddressV4Data,
      Uploader
    }
  }
</script>

<style>
  .vux-prompt {
    padding-top: 1.6em;
    padding-bottom: 1.6em;
  }

  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .file:hover {
    background: #fff;
    border-color: #fff;
    color: #fff;
    text-decoration: none;
  }
</style>
