import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/goods',
    component: Goods
  }, {
    path: '/ratings',
    component: Ratings
  }, {
    path: '/seller',
    component: Seller
  }, {
    path: '/',
    redirect: '/goods' // 路由重定向
  }]
  // linkActiveClass: 'active'
})
