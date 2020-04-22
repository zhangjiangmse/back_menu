<template>
    <el-container>
        <el-header style="background-color: #2c3e50;height: 70px">
            <Header></Header>
        </el-header>
        <el-container>
            <Aside ref="aside"></Aside>
            <el-main style="padding-bottom: 0px;padding-top: 0px;padding-left: 0px">

                    <el-tabs v-model="editableTabsValue['active-tab']" type="card" closable
                             @tab-remove="removeTab" @tab-click="clickTab"  @contextmenu.prevent.native="openContextMenu($event)"
                    >
                        <el-tab-pane
                                v-for="(item) in editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name">

                                <div v-if="item.type == 'remote'" v-html="item.content" style="margin: 0;height:600px;width: 100%;"></div>
                                <div v-else style="height: 600px;width:100%;">
                                    <keep-alive >
                                     <router-view></router-view>
                                     </keep-alive>
                                </div>

                        </el-tab-pane>
                    </el-tabs>
                <div v-show="contextMenuVisible">
                    <ul

                            :style="{left:left+'px',top:top+'px'}"
                            class="contextmenu"
                    >
                        <li @click="closeAllTabs">关闭所有</li>
                        <li @click="closeOtherTabs('left')">关闭左边</li>
                        <li @click="closeOtherTabs('right')">关闭右边</li>
                        <li @click="closeOtherTabs('other')">关闭其他</li>
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
        data() {
            return {
                editableTabsValue:this.$my_editableTabsValue,
                editableTabs:this.$my_tag_list,
                contextMenuVisible:false,
                left:'',
                top:'',
                defaultActiveIndex:{"index":''}
            };
        },
        watch: {
            'this.$route': function (to, from) {
                // eslint-disable-next-line no-debugger
                debugger;
                console.log(to, from)
                this.$store.dispatch('updateActiveTemplateId', this.$route.params.templateId)
                // 通过更新Vuex中的store的数据，让数据发生变化 this.getTemplateById()
                //
            },
            contextMenuVisible(value) {
                console.log(value)
                if (this.contextMenuVisible) {
                    document.body.addEventListener("click", this.closeContextMenu);
                } else {
                    document.body.removeEventListener("click", this.closeContextMenu);
                }
            }
        },
       methods: {
            /**
             * 移除Tab
             * @param targetName
             */
            removeTab(targetName) {
                let nextTargetName = this.$my_editableTabsValue['active-tab'];
                let currentIndex = 0;
                this.$my_tag_list.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        currentIndex = index
                        if (this.$my_editableTabsValue['active-tab'] === targetName) {
                            let nextTab = this.$my_tag_list[index + 1] || this.$my_tag_list[index - 1];
                            if (nextTab) {
                                nextTargetName = nextTab.name;
                                return
                            }
                        }
                        return;
                    }
                });
                this.$my_tag_list.splice(currentIndex,1)
                this.$set(this.$my_editableTabsValue,"active-tab",nextTargetName)

            },
           /*
           点击当前页
            */
            clickTab( tab){

                // eslint-disable-next-line no-debugger
                debugger
                console.log(tab)
                let path = ''
                for(let i = 0;i<this.$my_tag_list.length;++i){
                    if(this.$my_tag_list[i].title == tab.name){
                        path = this.$my_tag_list[i].path;
                        break;
                    }
                }
                this.$router.replace(path);
            },
            /*
            右击事件
             */
           openContextMenu(e) {
               let obj = e.srcElement ? e.srcElement : e.target;
               //console.log(e.srcElement);
               if (obj.id) {
                   let currentContextTabId = obj.id.split("-")[1];
                   this.contextMenuVisible = true;
                   this.$store.commit("saveCurContextTabId", currentContextTabId);
                   this.left = e.clientX;
                   this.top = e.clientY + 10;
               }
           },
           // 关闭所有标签页
           closeAllTabs() {

               //删除所有tab标签
               this.editableTabs.splice(0,this.$my_tag_list.length)
               //调用子组件的方法，设置默认选中
               this.$refs.aside.handleSelected("3",["3"]);
               this.contextMenuVisible = false;
           },

           // 关闭其它标签页
           closeOtherTabs(par) {
               this.$store.commit("closeOtherTabs", par);
               this.contextMenuVisible = false;
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
        padding: 7px 16px;
    }
    .contextmenu li:hover {
        background: #f2f2f2;
        cursor: pointer;
    }
</style>