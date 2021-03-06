import Vue from "vue";
import Vuex from 'vuex'
import { Notification } from 'element-ui';
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
        sessions:{},
        hrs:[],
        currentSession:null,
        currentHr:JSON.parse(window.sessionStorage.getItem("user")),
        filterKey:'',
        stomp:null,
        isDot:{}
    },
    mutations: {
        init_currentHr(state, hr){
            state.currentHr = hr;
        },
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession (state,currentSession) {
            Vue.set(state.isDot,state.currentHr.username+'#'+currentSession.username, false);
            state.currentSession = currentSession;
        },
        addMessage (state,msg) {
            let ms = state.sessions[state.currentHr.username+'#'+msg.to];
            if (!ms) {
                // state.sessions[state.currentHr.username+'#'+msg.to] = [];
                // fix auto fresh
                Vue.set(state.sessions,state.currentHr.username+'#'+msg.to,[]);
            }
            state.sessions[this.state.currentHr.username+'#'+msg.to].push({
                content:msg.content,
                date: new Date(),
                self:!msg.notSelf
            })
        },
        INIT_DATA (state) {
            // 浏览器本地的聊天记录
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
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
                context.state.stomp.subscribe('/user/queue/chat', msg=>{
                    let receiveMsg = JSON.parse(msg.body);
                    // 没有选中聊天对象或者是没跟这个人聊天
                    if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
                        Notification.info({
                            title: '【'+receiveMsg.fromNickName+'】发来一条消息',
                            message: receiveMsg.content.length>10?receiveMsg.content.substr(0,10):receiveMsg.content,
                            position: 'bottom-right'
                        });
                        Vue.set(context.state.isDot,context.state.currentHr.username+'#'+receiveMsg.from, true);
                    }
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage', receiveMsg);
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
    // console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;
