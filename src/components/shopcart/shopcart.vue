<template>
  <div class="shop-cart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    selectFoods: { // 选择商品的数组
      type: Array,
      default() {
        return [
          {
            price: 8,
            count: 1
          }
        ]
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
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
