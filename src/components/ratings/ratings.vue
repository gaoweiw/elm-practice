<template>
  <div class="ratings" ref="ratingScroll">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent"
                    :ratings="ratings" @select="onSelectType" @toggle="onToggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key="index"
              class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend || rating.recommend.length > 0">
                <span class="icon-thumb_up" v-show="rating.rateType === 0"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '@/components/star/star'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
import {formatDate} from '../../common/js/date';

const ALL = 2
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false,
      scroll: ''
    }
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingScroll, {
            click: true
          })
        })
      }
    })
  },
  methods: {
    onSelectType(type) {
      this.selectType = type
      // 页面长度发生变化的时候要 刷新BScroll   必须要异步更新 $nextTick
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
      // 页面长度发生变化的时候要 刷新BScroll   必须要异步更新 $nextTick
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
    star, split, ratingselect
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    overflow: hidden

    .overview
      display: flex
      padding: 18px 0

      .overview-left
        flex: 0 0 137px
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px) /* 宽度小于或等于320的时候 */
          flex: 0 0 120px
          width: 120px

        .score
          line-height: 28px
          font-size: 24px
          color: rgb(255, 253, 0)
          margin-bottom: 6px

        .title
          margin-bottom: 8px
          font-size: 12px
          line-height: 12px
          color: rgb(7, 17, 27)

        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)

      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px) /* 宽度小于或等于320的时候 */
          padding-left: 6px

        .score-wrapper
          margin-bottom: 8px
          font-size: 0

          .title
            line-height: 18px
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)

          .star
            line-height: 18px
            display: inline-block
            margin: 0 12px
            vertical-align: top

          .score
            line-height: 18px
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)

        .delivery-wrapper
          font-size: 0

          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)

          .delivery
            font-size: 12px
            color: rgb(147, 153, 159)
            margin-left: 12px

    .rating-wrapper
      padding: 0 18px

      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))

        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px

          img
            border-radius: 50%

        .content
          flex: 1
          position: relative

          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)

          .star-wrapper
            font-size: 0
            margin-bottom: 6px

            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top

            .delivery
              display: inline-block
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)

          .text
            line-height: 18px
            font-size: 12px
            margin-bottom: 8px
            color: rgb(7, 17, 27)
            font-weight: 700

          .recommend
            lien-height: 16px
            font-size: 0

            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 12px

            .icon-thumb_up
              color: rgb(0, 160, 220)

            .item
              padding: 2px 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff

          .time
            position: absolute
            top: 0
            right: 0
            color: rgb(147, 153, 159)
            line-height: 12px
            font-size: 10px
</style>
