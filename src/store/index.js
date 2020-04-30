import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        curContextTabId:'',
        keepAliveTagsList:[],
        tabPanelHeight:'',
    },

    mutations:{//对state进行修改

        // 保存右键点击tab的id
        saveCurContextTabId(state, curContextTabId) {
            state.curContextTabId = curContextTabId
        },
        // 保存缓存页面
        SET_KEEP_ALIVE: (state, keepAliveTagsList) => {
            state.keepAliveTagsList = keepAliveTagsList
        },
        // 保存Tab面板高度
        saveTabPanelHeight:(state,tabPanelHeight)=>{
            state.tabPanelHeight = tabPanelHeight
        }


    },
    getters: {
        keepAliveTagsList: state => state.keepAliveTagsList,
        tabPanelHeight: state => state.tabPanelHeight
    }
})
export default store;
