import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import Login from '@/components/Login'
import Register from '@/components/Register'
import BigScreen from '@/views/BigScreen'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    redirect: "/home",
    children: [
      { path: 'home', name: '首页', component: () => import('../views/Home.vue')},
      { path: 'device', name: '设备管理', component: () => import('../views/Device.vue')},
      { path: 'userlog', name: '用户日志', component: () => import('../views/UserLog.vue')},
      { path: 'devicelog', name: '设备日志', component: () => import('../views/DeviceLog.vue')}

    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/bigscreen',
    name: 'BigScreen',
    component: BigScreen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath")  // 触发store的数据更新
  next()  // 放行路由
})

export default router
