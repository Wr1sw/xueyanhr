import Vue from "vue";
import Vuex from 'vuex'
import {getRequest} from "@/utils/api";
import SockJS from  'sockjs-client';
import Stomp from 'stompjs';



Vue.use(Vuex)

const now = new Date();

/**
 * routes 路由数组
 */
const store =  new Vuex.Store({
    state: {
        routes:[],
        sessions:[],
        hrs:[],
        currentSession:null,
        filterKey:'',
        stomp:null
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession (state,currentSession) {
            state.currentSession = currentSession;
        },
        addMessage (state,msg) {
            state.sessions[state.currentSession-1].messages.push({
                content:msg,
                date: new Date(),
                self:true
            })
        },
        INIT_DATA (state) {
            // 浏览器本地的聊天记录
            // let data = localStorage.getItem('vue-chat-session');
            // //console.log(data)
            // if (data) {
            //     state.sessions = JSON.parse(data);
            // }
        },
        INIT_HR(state, data) {
            state.hrs = data;
        }
    },
    actions: {
        connect(context){
            console.log("=-=-=-=")
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            context.state.stomp.connect({},success=>{
                context.state.stomp.subscribe('/user/queue/chat', message=>{
                    console.log("消息》》》》"+message.body);
                })
            }, error=>{

            })
        },
        initData(context) {
            context.commit('INIT_DATA')
            getRequest("/chat/hrs").then(resp=>{
                if (resp) {
                    context.commit('INIT_HR', resp)
                }
            })
        }
    }
})
store.watch(function (state) {
    return state.sessions
},function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;
