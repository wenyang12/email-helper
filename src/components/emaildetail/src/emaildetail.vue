<template>
    <section class="email-at-detail">
        <h1 class="email-at-detail__tips"><strong>{{data.from | emailNickName}}</strong>&nbsp;&nbsp;在一封邮件中@了你</h1>
        <h2 class="email-at-detail__title">{{data.subject}}</h2>
        <p class="email-at-detail__content">{{data.summary}}</p>
    </section>
</template>

<script>
import Util from '@/core/base/util'
  export default {
    props: {
      data: Object,
      isDisabled: Boolean
    },
    filters: {
      emailNickName (value) {
        return Util.parseNickname(value)
      }
    }
  }
</script>
<style lang="less">
@import '~@/assets/style/class';
@contentsizecolor: #D5B16D;
@layout: 47/50rem 96/50rem;
  .email-at-detail{
    padding:  @layout;
    text-align: center;
    &__tips{
      font-size: 32/50rem;
      color: #9D6823;
      font-weight: normal;
      margin-bottom: 14/50rem;
    }
    &__title{
      font-size: 28/50rem;
      margin-bottom: 8/50rem;
      color: @contentsizecolor;
      width: 100%;
      .ellipsis();
    }
    &__content{
      font-size: 24/50rem;
      line-height: 1.5;
      color: @contentsizecolor;
      width:100%;
      .ellipsis-mutil();
    }
  }
</style>
