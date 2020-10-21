<template>
  <div>
    <v-header v-bind:seller="sellerData"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
    <!-- keep-alive用于保存组件的渲染状态 -->
    <keep-alive>
      <router-view :seller="sellerData"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import {urlParse} from './common/js/util'

const ERR_OK = 0
export default {
  data() {
    return {
      sellerData: {
        id: (() => { // 立即执行函数
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this.$http.get('/api/seller?id=' + this.sellerData.id).then(response => {
      // success
      response = response.body
      if (response.errno === ERR_OK) {
        /**
         * Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
         * @example
         * let target = { a: 1 };
         * let source1 = { b: 2 };
         * let source2 = { c: 3 };
         *
         * Object.assign(target, source1, source2);
         * target // {a:1, b:2, c:3}
         */
        // 第一种方法（向数组种添加没有的字段）
        this.sellerData = Object.assign({}, this.sellerData, response.data)
        //第二种方法
        // let id = this.sellerData.id
        // this.sellerData = response.data
        // this.$set(this.sellerData,'id',id)

      }
    }, response => {
      // error callback
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))

    .tab-item
      flex: 1
      text-align: center

      & > a
        display: block
        color: rgb(77, 85, 93)
        font-size: 14px

        &.router-link-active
          color: rgb(240, 20, 20)
</style>
