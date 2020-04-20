<template>
    <el-container>
        <el-header style="background-color: #2c3e50;height: 70px">
            <Header></Header>
        </el-header>
        <el-container>
            <Aside></Aside>
            <el-main style="padding-bottom: 0px;padding-top: 0px;padding-left: 0px">
                    <el-tabs v-model="editableTabsValue['active-tab']" type="card" closable  @tab-remove="removeTab">
                        <el-tab-pane
                                v-for="(item) in editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name">
                            <keep-alive>
                                <div v-if="item.type == 'remote'" v-html="item.content" style="margin: 0;height:600px;width: 100%;"></div>
                                <div v-else style="height: 600px;width:100%;">
                                     <router-view></router-view>
                                </div>
                            </keep-alive>
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