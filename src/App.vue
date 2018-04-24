<template>
  <div id="app">
    <!--body-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="less">
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  a {
    display: block;
    color: -webkit-link;
    cursor: auto;
    text-decoration: none;
  }
  p{
    margin: 0;
  }

  body {
    text-align: center;
    background: #f0f0f0;
    height: 100%;
    .vux-header {
      /*position: fixed;*/
      background: #000;
      width: 100%;
      top: 0;
      z-index: 1;
    }
    .vux-header-left {
      color: #fff;
    }
    .vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button {
      color: #fff;
    }
    .vux-header .vux-header-left .left-arrow:before {
      color: #fff;
    }
    .vux-header .vux-header-left .left-arrow:before {
      border-color: #fff;
    }

    .weui-cells__title {
      font-size: 12px;
    }

    .weui-cells__title, .weui-cells {
      text-align: left;
    }

    .vux-header .vux-header-left .left-arrow:before {
      border-color: #aaa;
    }

    .vux-header .vux-header-left, .vux-header .vux-header-right {
      color: #fff;
    }
  }
</style>
