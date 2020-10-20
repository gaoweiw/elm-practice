<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="foodScroll">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" :alt="food.name">
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span
            class="rating">好评率{{food.rating ? food.rating : '0'}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper" v-show="food.count > 0">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings" @select="onSelectType" @toggle="onToggle"></ratingselect>
          <div class="rating-wrapper" v-if="food.ratings">
            <ul v-if="food.ratings.length > 0">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index"
                  class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span
                    :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"> </span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-else>
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import {formatDate} from '../../common/js/date'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'

const EVENT_ADD = 'add'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  name: 'food',
  props: {
    food: {
      type: Object
    },
    showFlag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scroll: '',
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      // 评价传值
      // this.selectType = ALL // 选中哪一个评价
      // this.onlyContent = false //只看有内容的评价
      // end
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    addFirst(event) {
      // 添加第一个商品
      this.$set(this.food, 'count', 1)
      this.$emit(EVENT_ADD, event.target) // 派发点击事件
    },
    onSelectType(type) {
      this.selectType = type
      // 页面长度发生变化的时候要 刷新BScroll   必须要异步更新 $nextTick
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
      // 页面长度发生变化的时候要 刷新BScroll   必须要异步更新(还要在dom事件之后) $nextTick
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow(type, text) {
      // 此函数的作用就是 筛选评价
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    cartcontrol, split, ratingselect
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    opacity: 1
    transform: translate3d(0, 0, 0)

    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear

    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
      opacity: 0

    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%

      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%

    .content
      padding: 18px
      position: relative

      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)

      .detail
        margin-bottom: 18px
        line-height: 10px
        fong-size: 0
        height: 10px

        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 152, 159)

        .sell-count
          margin-right: 12px

      .price
        font-weight: 700
        line-height: 24px

        .now
          margin-right: 4px
          font-size: 14px
          color: rgb(240, 20, 20)

        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)

      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px

      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        border-radius: 12px
        color: #fff
        background: rgb(0, 160, 220)

    .info
      padding: 18px

      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)

      .text
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77, 85, 93)

    .rating
      padding-top: 18px

      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)

      .rating-wrapper
        padding: 0 18px

        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))

          .user
            position: absolute
            right: 0
            top: 16px
            font-size: 0
            line-height: 12px

            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)

            .avatar
              display: inline-block
              border-radius: 50%

          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)

          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)

            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px

            .icon-thumb_up
              color: rgb(0, 160, 220)

            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
