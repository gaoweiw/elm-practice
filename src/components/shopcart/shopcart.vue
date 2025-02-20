<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <!-- 抛物线小球 -->
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 弹出层购物车 -->
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food" @add="onAdd"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 背景 -->
    <transition name="back">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol'

const BALL_LEN = 10
const innerClsHook = 'inner-hook'

function createBalls() {
  let ret = []
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({
      show: false
    })
  }
  return ret
}

export default {
  props: {
    selectFoods: { // 选择商品的数组
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0,
      required: true // 是否必填
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: createBalls(),
      fold: true,
      scrollList: ''
    }
  },
  computed: {
    // 商品的总价
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      })
      return total
    },
    totalCount() { // 所选的商品总数
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let difference = this.minPrice - this.totalPrice;
        return `还差￥${difference}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() { // 只是判断一个去结算的  样式
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow() {
      if (!this.totalCount) {
        return false
      }
      if (this.totalCount > 0 && !this.fold) {
        this.$nextTick(() => {
          if (!this.scrollList) {
            this.scrollList = BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scrollList.refresh() // 变化时候刷新
          }
        })
        return true
      }
      return false
    }
  },
  created() {
    this.dropBalls = [] // 临时保留不用放在data里面
  },
  watch: {
    selectedFoods(newFoods, oldFoods) {
      if (newFoods.length === 0) {
        this.fold = true;
      }
    }
  },
  methods: {
    onAdd(el) {
      this.drop(el) // 调用另外组件的方法
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect() // 获取dom的大小及其相对于视口的位置 并且拥有left, top, right, bottom,x,y, 是相对于视图窗口的左上角来计算的
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3D(0,${y}px,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3D(${x}px,0,0)`
    },
    dropping(el, done) {
      // 触发重绘
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webkitTransform = `translate3D(0,0,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3D(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    // 动画执行完毕
    afterDrop(el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold
    },
    empty() {
      // 清空购物车
      this.selectFoods.forEach((food) => {
        this.fold = true
        food.count = 0
      })
    },
    hideList() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}元`)
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop-cart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px

    .content
      background: #141d27
      display: flex
      font-size: 0
      color: #919396

      .content-left
        flex: 1

        .logo-wrapper
          display: inline-block
          vertical-align: top
          border-radius: 50%
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          background: #141d27

          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c

            &.highlight
              background: rgb(0, 160, 220)

            .icon-shopping_cart
              font-size: 24px
              line-height: 44px

              &.highlight
                color: #fff

          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            font-size: 9px
            font-weight: 700
            border-radius: 16px
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            color: #fff

        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.5)
          font-size: 16px
          font-weight: 700

          &.highlight
            color: #FFF

        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 10px

      .content-right
        flex: 0 0 105px
        width: 105px

        .pay
          text-align: center
          height: 48px
          font-size: 12px
          line-height: 48px
          font-weight: 700
          background: #2b333b

          &.not-enough
            background: #2b333b

          &.enough
            background: #00b43c
            color: #fff

    .ball-container
      .ball
        position: fixed
        left: 32px;
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)

        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear

    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3D(0, -100%, 0);

      &.fold-enter-active, &.fold-leave-active
        transition: all 0.4s linear

      &.fold-enter, &.fold-leave-to
        transform: translate3D(0, 0, 0)

      .list-header
        font-size: 12px
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)

        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)

        .empty
          float: right
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff

        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))

          .name
            line-hgiht: 24px
            font-size: 14px
            color: rgb(7, 17, 27)

          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

    .list-mask
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7)
      backdrop-filter: blur(5px)
      z-index: -3
      opacity: 1

      &.back-enter-active, &.back-leave-active
        transition: all 0.4s linear

      &.back-enter, &.back-leave-to
        opacity: 0
</style>
