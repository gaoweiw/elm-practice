<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
const EVENT_ADD = 'add'
export default {
  name: '',
  props: {
    food: {
      type: Object
    }
  },
  created() {
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        // ☆★新增一个json数据里面并没有的字段的时候，用Vue.set()
        /* 当我们需要动态改变数据的时候 调用方法：$set( target, key, value )
        target：要更改的数据源(可以是对象或者数组)
        key：要更改的具体数据
        value ：重新赋的值 */
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count = this.food.count + 1
      }
      console.log('哟哟  ' + event.target)
      this.$emit(EVENT_ADD, event.target) // 派发点击事件
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count > 0) {
        return this.food.count--
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0

    .cart-decrease
      display: inline-block
      padding: 6px
      /* translate3d('x轴右是正值，左是负值','y轴下是正值，上是负值') */
      transform: translate3D(0, 0, 0)

      &.move-enter-active { /* 控制进入动画过渡 的缓和曲线 */
        transition: all .4s linear;
      }

      &.move-enter /* 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除 */
        opacity: 0;
        transform: translate3D(24px, 0, 0);

        .inner
          transform: rotate(180deg)

      &.move-leave-active /* 控制离开动画过渡 的缓和曲线 */
        opacity: 0;
        transform: translate3D(24px, 0, 0);
        transition: all 0.4s linear;

        .inner
          transform: rotate(180deg)

      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all .4s linear

    .cart-count
      display: inline-block
      font-size: 10px
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      color: rgb(147, 153, 159)

    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

</style>
