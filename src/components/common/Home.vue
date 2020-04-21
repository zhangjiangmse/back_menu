<template>
    <el-container>
        <el-header style="background-color: #2c3e50;height: 70px">
            <Header></Header>
        </el-header>
        <el-container>
            <Aside></Aside>
            <el-main style="padding-bottom: 0px;padding-top: 0px;padding-left: 0px">

                    <el-tabs v-model="editableTabsValue['active-tab']" type="card" closable  @tab-remove="removeTab" @tab-click="clickTab">
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
                editableTabs:this.$my_tag_list
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
            }
        }
    }
</script>
<style>
    div.el-tabs__header.is-top {
        padding: 0;
        position: relative;
        margin: 0 0 5px;
    }
</style>