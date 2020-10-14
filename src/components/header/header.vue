<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
          <icon v-bind:iconType="1" v-bind:iconName="seller.supports[0].type"></icon>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-cont" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"> </i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"> </i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star v-bind:size="48" v-bind:score="seller.score"></star>
            </div>
            <titles v-bind:textname="textArr[0]"></titles>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
                <icon :iconName="seller.supports[index].type" v-bind:iconType="2"></icon>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <titles v-bind:textname="textArr[1]"></titles>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeWrapper"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
import titles from '@/components/title/title'
import icon from '@/components/icon/icons'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false,
      classMap: [],
      textArr: ['优惠信息', '商家公告']
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    closeWrapper() {
      this.detailShow = false
    }
  },
  components: {
    star,
    titles,
    icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
@import "../../common/fonts/icon.css"

.header
  color: #fff
  position: relative
  overflow: hidden
  background: rgba(7, 17, 27, 0.3)

  .content-wrapper
    padding: 24px 12px 18px 24px
    position: relative
    font-size: 0

    .avatar
      display: inline-block
      vertical-align: top

      img
        border-radius: 2px

    .content
      display: inline-block
      margin-left 16px

      .title
        margin: 2px 0 8px 0

        .brand
          width: 30px
          height: 18px
          display: inline-block
          vertical-align: top
          bg-image('brand')
          background-size: cover
          background-repeat: no-repeat

        .name
          margin-left: 6px
          font-size: 16px
          height: 18px
          font-weight: bold

      .description
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px

      .support
        .text
          font-size: 10px
          line-height: 12px

    .support-cont
      position: absolute
      right: 12px
      bottom: 14px
      height: 24px
      line-height: 24px
      padding: 0 8px
      background: rgba(0, 0, 0, 0.2)
      border-radius: 14px
      text-align: center

      .count
        vertical-align: top
        font-size: 10px

      .icon-keyboard_arrow_right
        display: inline-block
        line-height: 24px
        font-size: 10px
        margin-left: 2px
        width: 10px
        height: 10px

  .bulletin-wrapper
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    position: relative
    background: rgba(7, 17, 27, 0.2)

    .bulletin-title
      vertical-align: top
      margin-top: 8px
      display: inline-block
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat

    .bulletin-text
      vertical-align: top
      font-size: 10px
      margin: 0 4px

    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      right: 12px
      top: 10px

  .background
    position: absolute
    width: 100%
    top: 0
    left: 0
    z-index: -1
    background-size: cover
    filter: blur(10px)
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
.detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    backdrop-filter : blur(6px)
    background: rgba(7, 17, 27, 0.8)
    .detail-wrapper
      min-height: 100%
      width : 100%
      .detail-main
        margin-top : 64px
        padding-bottom : 64px
        .name
          line-height : 16px
          text-align : center
          font-size : 16px
          font-weight : 700
        .star-wrapper
          text-align : center
          margin-top : 18px
          padding:2px 0
        .supports
          width : 80%
          margin : 0 auto
          .support-item
            padding : 0 12px
            margin-bottom : 12px
            font-size : 0
            &:last-child
              margin-bottom : 0
            .text
              font-size :12px
              line-height: 16px
        .bulletin
          width : 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size : 12px
    .detail-close
      position : relative
      width:32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size : 32px

</style>
