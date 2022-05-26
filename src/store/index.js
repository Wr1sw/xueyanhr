import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const now = new Date();

/**
 * routes 路由数组
 */
const store =  new Vuex.Store({
    state: {
        routes:[],
        sessions:[{
            id:1,
            user:{
                name:'示例介绍',
                img:'http://b.hiphotos.baidu.com/image/pic/item/e824b899a9014c08878b2c4c0e7b02087af4f4a3.jpg'
            },
            messages:[{
                content:'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                date:now
            },{
                content:'项目地址(原作者): https://github.com/coffcer/vue-chat',
                date:now
            },{
                content:'本项目地址(重构): https://github.com/is-liyiwei',
                date:now
            }]
        },{
            id:2,
            user:{
                name:'webpack',
                img:'http://b.hiphotos.baidu.com/image/pic/item/e824b899a9014c08878b2c4c0e7b02087af4f4a3.jpg'
            },
            messages:[{
                content:'Hi，我是webpack哦',
                date:now
            }]
        }],
        currentSessionId:1,
        filterKey:''
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSessionId (state,id) {
            state.currentSessionId = id;
        },
        addMessage (state,msg) {
            state.sessions[state.currentSessionId-1].messages.push({
                content:msg,
                date: new Date(),
                self:true
            })
        },
    },
    actions: {
        initData(context) {
            context.commit('INIT_DATA')
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
