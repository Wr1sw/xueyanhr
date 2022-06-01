import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Chat from '../views/chat/Chat.vue'
import AdminCenter from '../views/admin/adminCenter.vue'
import Setting from '../views/admin/setting.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    hidden: true,
    children:[
      {
        path: '/chat',
        name: '在线聊天',
        component:Chat,
        hidden:true
      },
      {
        path: '/adminCenter',
        name: '个人中心',
        component:AdminCenter,
        hidden:true
      },
      {
        path: '/setting',
        name: '设置',
        component:Setting,
        hidden:true
      }
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
