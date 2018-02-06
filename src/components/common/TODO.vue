<template>
  <div v-transfer-dom v-show="isShow">
    <x-dialog v-model="showTodo" hide-on-blur
              :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
      <p style="color:#fff;text-align:center;" @click="showDialog">
        <span style="font-size:30px;">待完善哦！亲</span>
        <br>
        <br>
        <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
      </p>
    </x-dialog>
  </div>
</template>

<script>
  import {XDialog, TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    props: ['isShow'],
    data() {
      return {
        showTodo: true
      }
    },
    methods: {
      showDialog() {
        this.$emit('close')
      }
    },
    components: {
      XDialog
    }
  }
</script>

<style lang="less" scoped>

</style>
