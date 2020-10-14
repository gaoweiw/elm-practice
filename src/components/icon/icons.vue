<template>
    <span v-if="iconType===1" class="icon_f" :class="classMap[iconName]"></span>
    <span v-else-if="iconType===2" class="icon_s" :class="classMap[iconName]"></span>
    <span v-else-if="iconType===3" class="icon_l" :class="classMap[iconName]"></span>
</template>

<script>
export default {
  props: {
    iconName: {
      type: Number
    },
    iconType: {
      type: Number
    }
  },
  data() {
    return {
      classMap: []
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.icon_f
  display: inline-block
  vertical-align: top
  width: 12px
  height: 12px
  margin-right: 4px
  background-size: 12px
  background-repeat: no-repeat
  &.decrease
    bg-image('decrease_1')
  &.discount
    bg-image('discount_1')
  &.guarantee
    bg-image('guarantee_1')
  &.invoice
    bg-image('invoice_1')
  &.special
    bg-image('special_1')
.icon_s
  display : inline-block
  width : 16px
  height : 16px
  vertical-align : top
  margin-right : 6px
  background-size : 16px 16px
  background-repeat : no-repeat
  &.decrease
    bg-image('decrease_2')
  &.discount
    bg-image('discount_2')
  &.guarantee
    bg-image('guarantee_2')
  &.invoice
    bg-image('invoice_2')
  &.special
    bg-image('special_2')
.icon_l
  display : inline-block
  width : 12px
  height : 12px
  vertical-align : top
  margin-right : 2px
  background-size : 12px 12px
  background-repeat : no-repeat
  &.decrease
    bg-image('decrease_3')
  &.discount
    bg-image('discount_3')
  &.guarantee
    bg-image('guarantee_3')
  &.invoice
    bg-image('invoice_3')
  &.special
    bg-image('special_3')
</style>
