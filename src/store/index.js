import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        curContextTabId:'',
        keepAliveTagsList:[],
    },

    mutations:{//对state进行修改

        // 保存右键点击tab的id
        saveCurContextTabId(state, curContextTabId) {
            state.curContextTabId = curContextTabId
        },
        SET_KEEP_ALIVE: (state, keepAliveTagsList) => {
            state.keepAliveTagsList = keepAliveTagsList
        },

    },
    getters: {
        keepAliveTagsList: state => state.keepAliveTagsList
    }
})
export default store;
