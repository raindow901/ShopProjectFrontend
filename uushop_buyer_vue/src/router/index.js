import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cart from '../views/Cart.vue'
import Info from '../views/Info.vue'
import OrderDetail from '../views/OrderDetail.vue'
import Pay from '../views/Pay.vue'
import Order from '../views/Order.vue'
import Mine from '../views/Mine.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Cart
  },
  {
    path: '/cart',
    name: '购买',
    component: Cart
  },
  {
    path: '/info',
    name: '用户信息',
    component: Info
  },
    {
    path: '/orderDetail',
    name: '订单详情',
    component: OrderDetail
  },
   {
    path: '/pay',
    name: '支付页面',
    component: Pay
  },
   {
    path: '/order',
    name: '订单列表',
    component: Order
  },
     {
    path: '/mine',
    name: '我的主页',
    component: Mine
  },
       {
    path: '/login',
    name: '登录',
    component: Login
  },
       {
    path: '/register',
    name: '注册',
    component: Register
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  }else if (to.path.startsWith('/register')){
    next()
  } 
  else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      //判断token有效期
      axios({
        url:'http://localhost:8686/account-service/user/checkToken',
        method:'get',
        headers:{
          token:user.token
        }
      }).then((response) => {
        if(response.data.code == -1){
          console.log('校验失败')
          next({path: '/error'})
        }
      })
      next()
    }
  }
})
export default router
