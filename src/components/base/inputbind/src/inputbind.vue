<template>
  <div class="input-wraper" >
    <div  class="input-left" :class="'label-' + inputDatas.name" >{{inputDatas.text}}</div>
    <div class="input-right" :class="'input-' + inputDatas.type">
    <input v-if="inputDatas.type !== 'noinput'" :type="inputDatas.type" autocomplete="off" :class="{active:value === 1}" :placeholder="inputDatas.placeholder"  :name="inputDatas.name" :value="value" @input="updateValue($event.target)" @change="radioChange($event.target)" >
    <p v-if="inputDatas.type === 'noinput'">{{inputDatas.placeholder}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      inputDatas: Object,
      val: [String, Number]
    },
    data () {
      return{
        value: this.val || ''
      }
    },
    methods: {
      updateValue (target) {
        let value = target.value
        let name = target.name
        this.value = value
        this.$emit('input', value, name)
      },
      radioChange (target) {
        if (target.type !== 'checkbox') {
          return
        }
        let value = target.checked ? 1 : 0
        let name = target.name
        this.value = value
        this.$emit('input',value,name)
      }
    }
  };
</script>

<style lang="less">
  @inputHeight: 48/25rem;
  .input-wraper{
    display: flex;
    padding: 0 15/25rem ;
    height: @inputHeight;
    line-height: @inputHeight;
    font-size: 17/25rem;
    align-items: baseline;
    color:#000;
    background: #fff;
    box-shadow:inset 15/25rem 0 0 0 #fff, inset 0 1px 0 0 #eee, 0 1px 0 0 #eee;
    &:first-child{
      box-shadow:inset 0 1px 0 0 #eee;
    }
    input{
      border:none;
    }
    input[type='checkbox']{
      width: 52/25rem;
      height: 32/25rem;
      background:#fff;
      border-radius: 25/25rem;
      position:relative;
      box-shadow:inset 1px 1px 2px 1px rgba(0,0,0,.1);
      &:after{
        content: '';
        position:absolute;
        width: 28/25rem;
        height: 28/25rem;
        border-radius: 50%;
        background: #fff;
        left:2/25rem;
        right:initial;
        top:2/25rem;
        box-shadow: 1px 1px 3px 1px rgba(0,0,0,.2);
      }
      &.active{
        background:#ffac38;
        &:after{
        right:2/25rem;
        left:initial;
        top:2/25rem;
      }
      }
    }
  }
  .input-left{
    flex: 0 0 95/25rem;
    text-align: left;
  }
  .label-password{
    letter-spacing:9.5/25rem;
  }
  .input-checkbox{
    text-align: right;
  }
  .input-right{
  flex: auto;
  input{
    width: 100%;
  }
}
</style>