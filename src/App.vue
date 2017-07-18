<template>
  <section class="email-at" ref="emailAt">
    <emaildetail :data='detaildata'></emaildetail>
    <section class="email-at-content">
      <h3 class="email-at-content__title">绑定邮箱帐号后即可查看全文</h3>
      <p class="email-at-content__content">或前往其他邮件客户端查看该邮件</p>
    </section>
    <footer class="email-at__footer">
        <inputbutton :inputDatas="inputbuttonBind" :isDisabled="disabled" @click.stop.prevent="bind"></inputbutton>
    </footer>
    <div class="email-at-close" ref="emailClose" @click="closeWindow"></div>
  </section>
</template>
<script>
import Loading from '@/components/base/loading'
import Inputbutton from '@/components/base/inputbutton'
import Emaildetail from '@/components/emaildetail'
import Service from '@/core/service/service'
import Util from '@/core/base/util'
import Success from '@/components/base/success'
export default {
  name: 'app',
  components: {
    Inputbutton,
    Emaildetail
  },
  data () {
    return {
      disabled: false,
      inputbuttonBind: {
        text: '立即去绑定',
        type: 'button'
      },
      detaildata: {}
    }
  },
  methods: {
    showLoading (useJsapi = true, showText = '加载中...') {
      if (this.loadingTimer) return
      this.loadingTimer = setTimeout(() => {
        if (this.isJsapiReady && useJsapi) {
          FSOpen.widget.showPreloader({
            text: showText
          })
        } else {
          Loading.open(showText)
        }
      }, window.$showLoadingDelay)
    },
    closeLoading (useJsapi = true) {
      if (!this.loadingTimer) return
      clearTimeout(this.loadingTimer)
      this.loadingTimer = null
      if (this.isJsapiReady && useJsapi) {
        FSOpen.widget.hidePreloader()
      } else {
        Loading.close()
      }
    },
    bind () {
      Util.mailBridge('openFSMailBindingPage')
    },
    closeWindow () {
      Util.mailBridge('closeDialog')
    },
    getPageHeight () { // 获取页面高度
      return (this.$refs.emailAt.offsetHeight - this.$refs.emailClose.offsetTop)
    }
  },
  created () {
    let self = this
    let id = Util.getQuery('id') || 98346
    this.showLoading()
    Service.detail({
      getData: {
        id: id
      },
      method: 'get',
      always () {
        self.closeLoading()
      }
    }).then((response) => {
      if (response.errorCode === 0) {
        this.detaildata = response.data && response.data || {}
      } else {
        Success.toast({
          duration: 2000,
          text: response.errorMessage
        })
      }
    }).catch((err) => {
      Success.toast({
        duration: 2000,
        text: err.errorMessage
      })
    })
  },
  mounted () {
    let height = Math.ceil(this.getPageHeight()) + ''
    Util.mailBridge('setWebContentHeight', height)
  }
}

</script>

<style lang="less">
@import '~@/assets/style/all';
@at-bg: '@{base-path}email-at-bg.png';
@at-bg-2x: '@{base-path}email-at-bg@2x.png';
@at-close: '@{base-path}email-at-close.png';
@at-close-2x: '@{base-path}email-at-close@2x.png';
@at-close-width: 30/50rem;
@at-close-height: 30/50rem;
@at-bg-width: 600/50rem;
@at-bg-height: 726/50rem;
@activeColor: #FF8C41;
body{
  background-color: rgba(0, 0, 0, .7);
}
.email-at{
  position: fixed;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  .img-retina(@at-bg,@at-bg-2x,@at-bg-width, @at-bg-height);
  background-repeat: no-repeat;
  width: @at-bg-width; 
  height: @at-bg-height;
  &__footer{
    position: absolute;
    bottom: 55/50rem;
    padding: 46/50rem 78/50rem 0;
    width:100%;
    z-index: 20;
    .button-wrap{
      button{
        color: #fff;
        background:  @activeColor;
        border-radius: 10/50rem;
        font-size: 34/50rem;
        &:active{
          background: lighten(@activeColor, 10%); 
        }
        &:hover{
          background: lighten(@activeColor, 10%); 
        }
      }
    }
  }
}
.email-at-content{
  padding: 0 66/50rem;
  text-align: center;
  position: absolute;
  bottom: 195/50rem;
  left:0;
  width: 100%;
  &__title{
    font-size: 36/50rem;
    color: #333;
    margin-bottom: 15/50rem;
    font-weight: 700;
  }
  &__content{
    font-size: 28/50rem;
    color: #999;
  }
}
.email-at-close{
  .img-retina(@at-close,@at-close-2x, @at-close-width, @at-close-height);
  background-repeat: no-repeat;
  width: @at-close-width; 
  height: @at-close-height;
  position: absolute;
  top:-75/50rem;
  right: 20/50rem;
  cursor: pointer;
}
</style>
