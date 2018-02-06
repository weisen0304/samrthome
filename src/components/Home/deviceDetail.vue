<template>
  <div style="height: 660px;background: #333;color: #fff">
    <!--header导航条-->
    <x-header :left-options="{showBack: true}"
              :right-options="{showMore: true}"
              @on-click-more="clickMore"
              style="background: #333;color: #fff;">
      <span style="color: #fff;">SN001</span>
    </x-header>

    <load-more tip="请点击列表指令操作" :show-loading="false" background-color="#fbf9fe"></load-more>

    <div style="padding:0 15px;">
      <x-table>
        <thead>
        <tr>
          <th>指令名称</th>
          <th>指令</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list"
            :key="item.id"
            @click="clickCode">
          <td>{{item.id}} : {{item.name}}</td>
          <td>
            <x-switch
                      :title="item.code"
                      v-model="item.switchStatus"></x-switch>
          </td>
        </tr>
        </tbody>
      </x-table>
    </div>

  </div>

</template>

<script>
  import {XHeader, XTable, XButton, XSwitch, LoadMore} from 'vux'
  export default {
    data() {
      return {
        list: [
          {
            id: 1,
            name: "开",
            code: "K01",
            switchStatus: true
          },
          {
            id: 2,
            name: "关",
            code: "K02",
            switchStatus: false
          },
          {
            id: 3,
            name: "开",
            code: "K01",
            switchStatus: false
          },
          {
            id: 4,
            name: "关",
            code: "K02",
            switchStatus: false
          }
        ],
        switchStatus: false
      }
    },
    created() {

    },
    methods: {
      clickMore() {
        console.log('123')
      },
      clickCode(e) {
        this.$vux.loading.show({
          text: 'loading'
        })

        this.$http.get('http://localhost/controlCode?code=' + e.target.innerText)
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
    components: {
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
</style>
