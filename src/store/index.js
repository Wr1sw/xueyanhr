import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * routes 路由数组
 */
export default new Vuex.Store({
    state: {
        routes:[]
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        }
    },
    actions: {

    }
})
