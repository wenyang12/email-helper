<template>
  <div class="button-wrap">
    <button :type="inputDatas.type" :class="{disabled:isDisabled}" :disabled="isDisabled">{{inputDatas.text}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      inputDatas: Object,
      isDisabled: Boolean
    }
  }
</script>

<style lang="less">
  @footer-height: 48/25rem;
  @white: #fff;
  .button-wrap{
    position: relative;
    height: @footer-height;
    line-height: @footer-height;
    text-align: center;
    cursor: pointer;
    background: @white;
    box-shadow: 0 1px 0 0 #eee, inset 0 1px 0 0 #eee;
    button{
      border:none;
      cursor: pointer;
      color: #3487e2;
      width:100%;
      height:100%;
      font-size: 17/25rem;
      background: @white;
      &:active{
        background: #F8F8F8;
      }
      &.disabled{
        color: #cccccc;
      }
    }
  }
  
</style>