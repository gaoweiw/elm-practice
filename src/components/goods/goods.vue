<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="item.id" @click="selectMenu(index)" class="menu-item"
            :class="{'current': currentIndex===index}">
          <span class="text border-1px">
            <icon v-show="item.type>0" :iconType="3" :iconName="item.type"></icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook" :key="item.id">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" :key="food.id">
              <div class="icon">
                <img :src="food.icon" height="57" width="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-show="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="content">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
import icon from '@/components/icon/icons'
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'

const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: {},
      menuScroll: '',
      foodsScroll: '',
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          // 计算高度
          this._calculateHeight()
        })
      }
    }, response => {
      /* error callback */
      alert('请求出错')
    })
  },
  components: {
    icon, shopcart
  },
  methods: {
    selectMenu(index, event) {
      // 用来阻止浏览器派发的事件
      // if (!event._constructed) {
      //   return;
      // }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _initScroll() {
      this.menuScroll = BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        // 下拉动作
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let footList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < footList.length; i++) {
        let item = footList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position: absolute
    top: 174px
    width: 100%
    bottom: 46px
    display: flex
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table //垂直居中
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()

        .text
          width: 56px
          font-size: 12px
          display: table-cell
          vertical-align: middle

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-width: 700
          border-none()

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px 18px 0 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()

      .icon
        flex: 0 0 57px
        margin-right: 10px

      .content
        flex: 1

        .name
          margin: 2px 0 6px 0
          font-size: 14px
          lien-height: 14px
          color: rgb(7, 17, 27)

        .desc, .extra
          font-size: 10px
          line-height: 16px
          color: rgb(147, 153, 159)

        .desc
          margin-bottom: 6px

        .extra
          .content
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

</style>
