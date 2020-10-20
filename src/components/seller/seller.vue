<template>
  <div class="seller" ref="sellerScroll">
    <div class="seller-wrapper">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.sellCount ? seller.sellCount : '0'}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
            <icon :iconName="seller.supports[index].type" v-bind:iconType="4"></icon>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" :style="{width:ulWidth}">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
import icon from '@/components/icon/icons'
import split from '@/components/split/split'
import BScroll from 'better-scroll'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      scroll: '',
      picScroll: '',
      ulWidth: 0
    }
  },
  created() {
    setTimeout(() => {
      this._initScroll()
      this._initPics()
    }, 500)
  },
  mounted() {
    /* dom渲染好之后执行 */
    this._initScroll()
    this._initPics()
  },
  watch: {
    'seller': function () {
      this._initScroll()
      this._initPics()
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerScroll, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin; // 计算ul的宽度
        this.ulWidth = width + 'px' // 设置ul宽度，不要忘记单位
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true, // 表示横向滚动
              eventPassthrough: 'vertical' // 横向滚动图片的时候忽略纵向的滚动
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  },
  components: {
    star, split, icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden

    .overview
      padding: 18px

      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-sieze: 14px

      .desc
        padding-bottom: 18px
        border-1px(rba(7, 17, 27, 0.1))
        font-size: 0

        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px

        .text
          display: inline-block
          line-height: 18px
          vertical-align: top
          font-size: 10px
          margin-right: 12px
          color: rgb(77, 85, 93)

      .remark
        display: flex
        padding-top: 18px

        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)

          &:last-child
            border: 0

          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)

            .stress
              font-size: 24px

    .bulletin
      padding: 18px 18px 0 18px

      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-sieze: 14px

      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))

        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)

      .supports
        .support-item
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0

          &:last-child
            border-none()

          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)

    .pics
      padding: 18px

      .title
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-sieze: 14px

      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap /* 超过宽度不折行 */

        .pic-list
          font-size: 0

          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90

            &:last-child
              margin: 0
</style>
