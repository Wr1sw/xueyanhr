import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Chat from '../views/chat/Chat.vue'
import temp from '../views/temp.vue'
import AdminCenter from '../views/admin/adminCenter.vue'
import Setting from '../views/admin/setting.vue'
import status404 from '../views/statusPages/status404.vue'
import status403 from '../views/statusPages/status403.vue'
import statusUnknown from '../views/statusPages/statusUnknown.vue'
import Announcement from "@/views/admin/Announcement";
//后期删掉
import StaRecord from "@/views/sta/StaRecord";
import SendMail from "@/views/admin/SendMail";

import temp from "../views/temp.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/temp',
<<<<<<< HEAD
    name: 'temp',
    component: temp,
    hidden: true,
    // meta : {                      //加一个自定义obj
    //   requireAuth:false      //这个参数 true 代表需要登录才能进入A
  // }

=======
    name:'temp',
    component: temp,
    hidden: true
>>>>>>> e644bce1a650e405703062b2e8fdc67821832ccb
  },
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
      },{
        path: '/editor/:id',
        name:'公告',
        component: Announcement
      },{
        path: '/sta/record',
        name:'announcement',
        component: StaRecord,
      }, {
        path: '/mail',
        name:'写邮件',
        component: SendMail,
      }
    ]
  },
  {
    path: '/404',
    name: '404page',
    component: status404,
    hidden: true
  },
  {
    path: '/403',
    name: '403page',
    component: status403,
    hidden: true
  },
  //  后期删掉
  {
    path: '/unknown',
    name: 'unknownPage',
    component: statusUnknown,
    hidden: true
  },
  

]

const router = new VueRouter({
  routes
})

export default router
