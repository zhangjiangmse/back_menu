<template>
    <el-container>
        <el-header style="background-color: #2c3e50;height: 60px;padding:0">
            <Header></Header>
        </el-header>
        <el-container>
            <Aside ref="aside"></Aside>
            <el-main style="padding: 0px">
                    <el-tabs v-model="editableTabsValue['active-tab']" type="card" closable
                             @tab-remove="removeTab" @tab-click="clickTab">
                        <el-tab-pane
                                v-for="(item) in editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.title">
                                    <div v-if="item.type == 'remote'" v-html="item.content" class="remoteTabDiv" :style="conheight"></div>
                                    <div v-else class="localTabDiv" :style="conheight">
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
                editableTabsValue:this.$my_editableTabsValue,
                editableTabs:this.$my_tag_list,
                contextMenuVisible:false,
                isDisabledCloseLeftBtnFlag:true,
                isDisabledCloseRightBtnFlag:true,
                left:'',
                top:'',
                reloadKey:0,
                defaultActiveIndex:{"index":''},
                conheight:{
                    height:''
                }
            };
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },
        mounted() {
            // 使用原生js 为单个dom绑定鼠标右击事件
            let tab_top_dom = document.body.getElementsByClassName("el-tabs__header is-top")
            tab_top_dom[0].oncontextmenu = this.openContextMenu

        },
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
            // 计算 Tab 的内容高度
           getHeight(){
               let height = window.innerHeight-150
               this.conheight.height = height +'px';
               this.$store.commit("saveTabPanelHeight", height);
           },
           reload(title) {
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
                   let nextTab = this.editableTabs[targetIndex + 1] || this.editableTabs[targetIndex - 1];
                   if (nextTab) {
                       key = nextTab.key
                       keyPath = nextTab.keyPath
                   }
                   this.$refs.aside.handleSelected(key,keyPath);
               }
               this.editableTabs.splice(targetIndex,1)
            },
           /*
           点击当前页
            */
            clickTab( tab){

                let key = ''
                let keyPath = ''
                for(let i = 0;i<this.editableTabs.length;++i){
                    if(this.editableTabs[i].title == tab.name){
                        key = this.editableTabs[i].key;
                        keyPath = this.editableTabs[i].keyPath;
                        break;
                    }
                }
                this.$refs.aside.handleSelected(key,keyPath);
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
                   this.top = e.clientY + 10;
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
                   this.$refs.aside.handleSelected(key,keyPath);
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
               this.$refs.aside.handleSelected("3",["3"]);
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
              // let curTab = this.editableTabs[currTabIndex]
               console.log(currTabIndex)
               if (par == "left") {
                   //删除左侧tab标签
                   this.editableTabs.splice(0,currTabIndex)
                   //调用子组件的方法，设置默认选中
                   this.$refs.aside.handleSelected(key,keyPath);
               }
               if (par == "right") {
                   //删除右侧tab标签
                   this.editableTabs.splice(currTabIndex,this.editableTabs.length)
                   //调用子组件的方法，设置默认选中
                   this.$refs.aside.handleSelected(key,keyPath);
               }
               if (par == "other") {
                   //删除所有tab标签
                   this.editableTabs.splice(0,this.editableTabs.length)
                   //调用子组件的方法，设置默认选中
                   this.$refs.aside.handleSelected(key,keyPath);
               }
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
        margin: 0;
        width: 99.4%;
    }
    .localTabDiv {
        width:99.4%;
        padding-top: 5px;
        padding-left: 10px;
        overflow-y: auto;
    }
</style>