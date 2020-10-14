<template>
  <div class="title-wrapper">
    <div class="line"></div>
    <div class="text">{{textname}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    textname: {
      type: String
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.title-wrapper
  width:80%
  display : flex
  margin : 28px auto 24px auto
  .line
    flex : 1
    position : relative
    top: -6px
    border-bottom : 1px solid rgba(255,255,255,0.2)
  .text
    padding : 0 12px
    font-size : 14px
    font-width: 700

</style>
