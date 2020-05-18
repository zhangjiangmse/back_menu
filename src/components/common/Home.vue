<template>
    <el-container>
        <el-header style="background-color: #2c3e50;height: 60px;padding:0">
            <Header></Header>
        </el-header>
        <el-main style="position: absolute;top: 60px;bottom: 0px;width: 100%;">
            <el-tabs type="border-card" v-model="MainTabsValue['active-tab']" style="width: 99.8%;position: absolute;top: 0px;bottom: 0px;" @tab-click="clickMainTab">
                <el-tab-pane v-for="m_item in mainMenuTabs" :key="m_item.id" :label="m_item.title"  :name="m_item.title">
                    <el-container style="height: 100%;">
                        <Aside ref="aside" class="asideDiv" :aside_list="aside_list"></Aside>
                        <el-main>
                            <el-tabs id="innerTab" v-model="editableTabsValue['active-tab']" type="card" closable
                                     @tab-remove="removeTab" @tab-click="clickTab" style="width: 99.8%;height: 100%;overflow-y: hidden">
                                <el-tab-pane
                                        v-for="(item) in editableTabs"
                                        :key="item.name"
                                        :label="item.title"
                                        :name="item.title" style="height: 100%;">
                                    <div v-if="item.menuorigin == 'remote'" v-html="item.content" class="remoteTabDiv"></div>
                                    <div v-else class="localTabDiv">
                                        <keep-alive :include="keepAliveTagsList">
                                            <router-view></router-view>
                                        </keep-alive>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                            <div v-show="contextMenuVisible">
                                <ul :style="{left:left+'px',top:top+'px'}" class="contextmenu">
                                    <li><el-button type="text" @click="curTabReload()" size="mini">重新加载</el-button></li>
                                    <li><el-button type="text" @click="closeAllTabs()" size="mini">关闭所有</el-button></li>
                                    <li><el-button type="text" @click="closeOtherTabs('left')" :disabled="isDisabledCloseLeftBtnFlag" size="mini">关闭左边</el-button></li>
                                    <li><el-button type="text" @click="closeOtherTabs('right')" :disabled="isDisabledCloseRightBtnFlag" size="mini">关闭右边</el-button></li>
                                    <li><el-button type="text" @click="closeOtherTabs('other')" size="mini">关闭其他</el-button></li>
                                </ul>
                            </div>
                        </el-main>
                    </el-container>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>
<script>
    import Aside from './Aside.vue'
    import Header from "@/components/common/Header";

    export default {
        components:{
            Aside,
            Header
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                mainMenuTabs:[],
                MainTabsValue:{"active-tab":''},
                aside_list:[],
                editableTabsValue:this.$my_editableTabsValue,
                editableTabs:this.$my_tag_list,
                contextMenuVisible:false,
                isDisabledCloseLeftBtnFlag:true,
                isDisabledCloseRightBtnFlag:true,
                left:'',
                top:'',
                reloadKey:0,
                defaultActiveIndex:{"index":''},
            };
        },
        created(){
             this.initMainMenu()

        },
        // mounted() {

        //     // 使用原生js 为单个dom绑定鼠标右击事件
        //     let tab_top_dom = document.body.getElementsByClassName("el-tabs__header is-top")
        //     tab_top_dom[1].oncontextmenu = this.openContextMenu
        // },
        computed:{
            keepAliveTagsList(){
                return this.$store.getters.keepAliveTagsList
            }
        },
        watch: {
            contextMenuVisible() {
                if (this.contextMenuVisible) {
                    document.body.addEventListener("click", this.closeContextMenu);
                } else {
                    document.body.removeEventListener("click", this.closeContextMenu);
                }
            }
        },
       methods: {
            //初始化主要菜单
           initMainMenu(){
               let _this = this
               //处理保存信息请求

               if(_this.mainMenuTabs.length <= 1){

                   this.$axios.post("/menu/getAllMenuTreeDetailByRoleId",null,{"baseURL":'csm-base-member'})
                       .then(function (response) {
                           if(response.data.flag == 1){
                                _this.mainMenuTabs = response.data.result[0].children
                           }else{
                               _this.$message.error(response.data.msg);
                           }
                       }).catch(function (error) {
                       console.log(error);
                   });
               }

           },
           bindRightClickMenu(){

               // 使用原生js 为单个dom绑定鼠标右击事件
               let tab_top_dom = document.body.getElementsByClassName("el-tabs__header is-top")
               for(let i = 1;i<tab_top_dom.length;++i){
                   tab_top_dom[i].oncontextmenu = this.openContextMenu
               }

           },
           // 点击最上方的菜单栏时的响应,为aside添加新的菜单
           clickMainTab(tab){
               let _this = this
               for(let i = 0 ;i <_this.mainMenuTabs.length;++i){
                   if(_this.mainMenuTabs[i].title == tab.name){
                       _this.aside_list = _this.mainMenuTabs[i].children
                       break
                   }
               }
               _this.bindRightClickMenu()
           },
           reload(title) {
               console.log("刷新菜单")
               //重新将store里的tabid设为当前页面，再使用curTabReload方法
               let currentContextTabId = title
               if(title == null ||title == ''){
                   currentContextTabId = this.editableTabsValue['active-tab']
               }
               this.$store.commit("saveCurContextTabId", currentContextTabId);
               this.curTabReload()

           },
           /**
             * 移除Tab
             * @param targetName
             */
            removeTab(targetName) {

               let targetIndex = -1;
               for(let i = 0;i<this.editableTabs.length;++i){
                   if (this.editableTabs[i].title == targetName) {
                       // 记录移除标签的index
                       targetIndex = i;
                       break;
                   }
               }
               let key = this.editableTabs[targetIndex].key
               let keyPath = this.editableTabs[targetIndex].keyPath

               //如果移除的是当前Tab页，则激活当前页的上页或下页
               if (this.editableTabsValue['active-tab'] === targetName) {
                   // eslint-disable-next-line no-debugger
                   debugger
                   let nextTab = this.editableTabs[targetIndex + 1] || this.editableTabs[targetIndex - 1];
                   if (nextTab) {
                       key = nextTab.key
                       keyPath = nextTab.keyPath
                   }else{
                       this.editableTabs.splice(targetIndex,1)
                       return
                   }
                   //调用子组件的方法，设置默认选中
                   //查找主Tab的名称
                   let childrenNode = this.mainMenuTabs.concat()
                   let tempData = {"id": 0, title: '', children: childrenNode}
                   let array = []
                   let searchResult = {flag: false}

                   this.searchMainTabName(tempData, nextTab.title, array, searchResult)

                   // 查找当前的主菜单栏对应的左侧菜单栏
                   let asideIndex = 0
                   for(;asideIndex<this.mainMenuTabs.length;++asideIndex){
                       if(this.mainMenuTabs[asideIndex].title == array[1]){
                           break
                       }
                   }

                   this.$refs.aside[asideIndex].handleSelectedFromHome(key, keyPath,this.mainMenuTabs[asideIndex].children);
                   // this.$refs.aside[0].handleSelected(key,keyPath);
               }
               this.editableTabs.splice(targetIndex,1)
            },
           /*
           点击当前页
            */
           clickTab(tab) {
               let _this = this

                //查找主Tab的名称
                let childrenNode = _this.mainMenuTabs.concat()
                let tempData = {"id": 0, title: '', children: childrenNode}
                let array = []
                let searchResult = {flag: false}

                this.searchMainTabName(tempData, tab.name, array, searchResult)
                //激活当前页所在的主Tab页
                this.$set(_this.MainTabsValue, 'active-tab', array[1])
                this.clickMainTab({name: array[1]})
                //选中当前页所在的左侧菜单栏的
                let key = ''
                let keyPath = ''

                for (let i = 0; i <  _this.editableTabs.length; ++i) {
                    if ( _this.editableTabs[i].title == tab.name) {
                        key =  _this.editableTabs[i].key;
                        keyPath =  _this.editableTabs[i].keyPath;
                        break;
                    }
                }
               // 查找当前的主菜单栏对应的左侧菜单栏
                let asideIndex = 0
                for(;asideIndex<_this.mainMenuTabs.length;++asideIndex){
                    if(_this.mainMenuTabs[asideIndex].title == array[1]){
                        break
                    }
                }
               _this.$refs.aside[asideIndex].handleSelectedFromHome(key, keyPath,_this.mainMenuTabs[asideIndex].children);

            },
           // 通过子节点找到祖宗节点
           searchMainTabName(root,target,array,searchResult){
                let _this = this
                if(searchResult.flag){
                    return
                }
                if(root.title == target){
                    array.push(root.title)
                    this.$set(searchResult,'flag',true)
                    return;
                }else{
                    array.push(root.title)
                    let children = root.children
                    if(children!= undefined && children != null) {
                        children.forEach(item => {
                            _this.searchMainTabName(item, target, array, searchResult)
                        })
                        if (!searchResult.flag) {
                            array.pop()
                        }
                    }else{
                        array.pop()
                        return;
                    }
                }
           },
            /*
            右击事件
             */
           openContextMenu(e) {
                //if(e.button == 2){  //此处不必判断鼠标点击类型
                   e.preventDefault(); //防止默认菜单弹出
                //}
               let obj = e.srcElement ? e.srcElement : e.target;

               if (obj.id) {
                   let currentContextTabId = obj.id.split("-")[1];
                   let curIndex = 0;
                   for(;curIndex<this.editableTabs.length;++curIndex){
                       if(this.editableTabs[curIndex].title == currentContextTabId){
                           break;
                       }
                   }
                   if(curIndex<=0){
                       this.isDisabledCloseLeftBtnFlag = true
                       this.isDisabledCloseRightBtnFlag = false
                   }else if(curIndex >= this.editableTabs.length-1){
                       this.isDisabledCloseLeftBtnFlag = false
                       this.isDisabledCloseRightBtnFlag = true
                   }else{
                       this.isDisabledCloseLeftBtnFlag = false
                       this.isDisabledCloseRightBtnFlag = false
                   }
                   this.contextMenuVisible = true;
                   this.$store.commit("saveCurContextTabId", currentContextTabId);

                   this.left = e.clientX;
                   this.top = 20;
               }
           },
           /*
           刷新当前页
            */
           curTabReload(){
               let currTabIndex = 0;
               for(;currTabIndex<this.editableTabs.length;++currTabIndex){
                   if(this.editableTabs[currTabIndex].title == this.$store.state.curContextTabId){
                       break;
                   }
               }
               let key = this.editableTabs[currTabIndex].key;
               let keyPath = this.editableTabs[currTabIndex].keyPath

               let curTabName =  this.editableTabs[currTabIndex].name
               let new_tab_list_keepAlive = this.$store.getters.keepAliveTagsList
               new_tab_list_keepAlive = new_tab_list_keepAlive.filter((item)=>{
                   return item != curTabName
               })
               this.$store.commit('SET_KEEP_ALIVE', new_tab_list_keepAlive)

               this.$router.replace('/Home/pages/black')

               this.$nextTick(()=>{
                   //查找主Tab的名称
                   let childrenNode = this.mainMenuTabs.concat()
                   let tempData = {"id": 0, title: '', children: childrenNode}
                   let array = []
                   let searchResult = {flag: false}

                   this.searchMainTabName(tempData, this.editableTabs[currTabIndex].title, array, searchResult)

                   // 查找当前的主菜单栏对应的左侧菜单栏
                   let asideIndex = 0
                   for(;asideIndex<this.mainMenuTabs.length;++asideIndex){
                       if(this.mainMenuTabs[asideIndex].title == array[1]){
                           break
                       }
                   }
                   this.$refs.aside[asideIndex].handleSelectedFromHome(key, keyPath,this.mainMenuTabs[asideIndex].children);

                   this.$notify({
                       title: this.$t('message.tip'),
                       message: "刷新成功（如显示空白，请重试刷新！）",
                       position: 'bottom-right'
                   });
               })
           },
           // 关闭所有标签页
           closeAllTabs() {

               //删除所有tab标签
               this.editableTabs.splice(0,this.$my_tag_list.length)
               //调用子组件的方法，设置默认选中
               // this.$refs.aside[0].handleSelected("3",["3"]);
               this.closeContextMenu()
           },

           // 关闭其它标签页
           closeOtherTabs(par) {

               let currTabIndex = 0;
               for(;currTabIndex<this.editableTabs.length;++currTabIndex){
                   if(this.editableTabs[currTabIndex].title == this.$store.state.curContextTabId){
                       break;
                   }
               }

               let key = this.editableTabs[currTabIndex].key;
               let keyPath = this.editableTabs[currTabIndex].keyPath
               let curTab = this.editableTabs[currTabIndex]
               console.log(currTabIndex)
               if (par == "left") {
                   //删除左侧tab标签
                   this.editableTabs.splice(0,currTabIndex)
                   //调用子组件的方法，设置默认选中
                   // this.$refs.aside[0].handleSelected(key,keyPath);
               }
               if (par == "right") {
                   //删除右侧tab标签
                   this.editableTabs.splice(currTabIndex,this.editableTabs.length)
                   //调用子组件的方法，设置默认选中
                   // this.$refs.aside[0].handleSelected(key,keyPath);
               }
               if (par == "other") {
                   //删除所有tab标签
                   this.editableTabs.splice(0,this.editableTabs.length)
                   //调用子组件的方法，设置默认选中
                  // this.$refs.aside[0].handleSelected(key,keyPath);
               }

               //调用子组件的方法，设置默认选中
               //查找主Tab的名称
               let childrenNode = this.mainMenuTabs.concat()
               let tempData = {"id": 0, title: '', children: childrenNode}
               let array = []
               let searchResult = {flag: false}

               this.searchMainTabName(tempData, curTab.title, array, searchResult)
               //激活当前页所在的主Tab页
               this.$set(this.MainTabsValue, 'active-tab', array[1])
               this.clickMainTab({name: array[1]})

               // 查找当前的主菜单栏对应的左侧菜单栏
               let asideIndex = 0
               for(;asideIndex<this.mainMenuTabs.length;++asideIndex){
                   if(this.mainMenuTabs[asideIndex].title == array[1]){
                       break
                   }
               }
               this.$refs.aside[asideIndex].handleSelectedFromHome(key, keyPath,this.mainMenuTabs[asideIndex].children);
               this.closeContextMenu()
           },
           // 关闭contextMenu
           closeContextMenu() {
               this.contextMenuVisible = false;
           },
        }
    }
</script>
<style>
    div.el-tabs__header.is-top {
        padding: 0;
        position: relative;
        margin: 0 0 5px;
    }
    .contextmenu {
        width: 100px;
        margin: 0;
        border: 1px solid #ccc;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 14px;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    }
    .contextmenu li {
        margin: 0;
        padding: 0px 22px;

    }

    .contextmenu li:hover {
        background: #f2f2f2;
        cursor: pointer;
    }
    .contextmenu li button{
       color: #2c3e50;
    }
    .remoteTabDiv {
        height: 98%;
        margin: 0;
        width: 99.4%;
    }
    .asideDiv{
        max-height: 660px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .localTabDiv {
        height: 98%;
        width:99.4%;
        padding-top: 5px;
        padding-left: 10px;
        overflow-y: auto;

    }
    .el-tabs__item {
        padding: 0 20px;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
    }
    .el-tabs--border-card>.el-tabs__content {
        padding: 0px;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        width: 100%;
        top: 29px;
        bottom: 0px;

    }
    #innerTab .el-tabs__content{
        height: 100%;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .el-main {
        display: block;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        box-sizing: border-box;
        padding: 0px;
    }
    .el-tab-pane {
        position: absolute;
        width: 100%;
        top: 0px;
        bottom: 0px;
    }
</style>