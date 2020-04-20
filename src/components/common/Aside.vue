<template>
    <el-menu default-active="1-1" collapse-transition="true"
             class="el-menu-vertical-demo"
             @select="handleSelected"
             @open="handleOpen"
             @close="handleClose"
             :collapse="collapse">
        <template v-for="item in aside_list">
            <template v-if="item.children">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.children">
                        <el-submenu
                                v-if="subItem.children"
                                :index="subItem.index"
                                :key="subItem.index"
                        >
                            <template slot="title">{{ subItem.title }}</template>
                            <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.index"
                            >{{ threeItem.title }}</el-menu-item>
                        </el-submenu>
                        <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                        >{{ subItem.title }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                collapse: false,
                aside_list:[
                    {
                        index:'1',
                        title:"系统首页",
                        icon:"el-icon-location",
                        children: [
                            {
                                index:'1-1',
                                title:"百度搜索",
                                icon:'',
                                path:'http://www.baidu.com',
                                type:'remote'
                            }
                        ]
                    },
                    {
                        index:'2',
                        title:"百度搜索",
                        path:'http://www.baidu.com',
                        type:'remote'
                    },
                    {
                        index:'3',
                        title:"本地页面",
                        component:'@/components/HelloWorld.vue',
                        path:'/pages/helloWorld',
                        type:'local'
                    },
                ]
            };
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        },
        methods: {
            handleSelected: function (key, keyPath) {

                let tabNode = {"title":'',"path":'',"type":'',"component":''}
                for(let i = 0;i<this.aside_list.length;++i){
                    if(this.aside_list[i].index == keyPath[0] && keyPath.length>1){
                        this.aside_list[i].children.forEach(item=>{
                            if(item.index == keyPath[1]){
                                tabNode.title = item.title
                                tabNode.path = item.path
                                tabNode.type = item.type
                                tabNode.component = item.component || ''
                                return
                            }
                        })
                    }else if(this.aside_list[i].index == keyPath[0] && keyPath.length==1){
                        tabNode.title = this.aside_list[i].title
                        tabNode.path = this.aside_list[i].path
                        tabNode.type = this.aside_list[i].type
                        tabNode.component = this.aside_list[i].component || ''
                        break
                    }
                }
                this.addTab(tabNode);
            },
            handleOpen(key, keyPath) {

                console.log("打开：" + key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log("关闭：" + key, keyPath);
            },
            addTab(tabNode) {
                //判断当前tab是否已存在，若存在，则直接激活即可
                let is_Existed = false;
                this.$my_tag_list.forEach(item=>{
                    if(item.title == tabNode.title){
                        is_Existed = true
                        return
                    }
                })
                if(is_Existed){
                    this.$set(this.$my_editableTabsValue,"active-tab",tabNode.title)
                    return
                }
                //当前tab不存在，添加新的tab页，并激活
                let content = ''
                if(tabNode.type == "local"){
                    this.$router.push(tabNode.path)
                }else if(tabNode.type == "remote"){
                    content = "<object type='text/html' data='"+tabNode.path+"' width='100%' height='100%'></object>"
                }
                this.$my_tag_list.push({
                    title: tabNode.title,
                    name: tabNode.title,
                    content: content,
                    type:tabNode.type
                });

                this.$set(this.$my_editableTabsValue,"active-tab",tabNode.title)
            },
        }
    }
</script>
<style>
    /**
    保证收缩时，可以平滑过渡，而非直接到达，参见官网的例子
     */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>