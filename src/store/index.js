import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        curContextTabId:'',
    },

    mutations:{//对state进行修改

        // 保存右键点击tab的id
        saveCurContextTabId(state, curContextTabId) {
            state.curContextTabId = curContextTabId
        },

        // 关闭其它标签页
        closeOtherTabs(state, par) {
            let tabs = state.tabs;
            let length = tabs.length;
            let curContextTabId = state.curContextTabId;
            let activeTabItem = state.activeTabItem
            console.log(activeTabItem)
            let id; // 右键点击时的tab在整个tabs数组中的id
            let curId // 左键点击时的tab在整个tabs数组中的id
            tabs.forEach((tab, index) => {
                if (tab.id == curContextTabId) {
                    id = index
                }
                if (tab.id == activeTabItem) {
                    curId = index
                }
            })
            //  console.log(id, curId)
            //  return
            if (par == "left") {
                if (id > curId) {
                    this.commit("switchTab", curContextTabId)
                    router.push(tabs[id].path)
                }
                state.tabs = state.tabs.slice(id, length)
            }
            if (par == "right") {
                if (id < curId) {
                    this.commit("switchTab", curContextTabId)
                    router.push(tabs[id].path)
                }
                state.tabs = state.tabs.slice(0, id + 1)
            }
            if (par == "other") {
                state.tabs = [state.tabs[curId]]
            }
        }
    }
})
export default store;
