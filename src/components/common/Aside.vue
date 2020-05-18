<template>
    <el-menu :default-active="defaultActiveIndex['active']" collapse-transition
             class="el-menu-vertical-demo"
             @select="handleSelected"
             @open="handleOpen"
             @close="handleClose"
             :collapse="collapse" :unique-opened="true">
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
                            <template slot="title">
                                <i :class="subItem.icon"></i>
                                <span slot="title">{{ subItem.title }}</span>
                            </template>
                            <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.index"
                            ><i :class="subItem.icon"></i><span>{{ threeItem.title }}</span></el-menu-item>
                        </el-submenu>
                        <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                        ><i :class="subItem.icon"></i><span>{{ subItem.title }}</span></el-menu-item>
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
        props:{
            aside_list: Array,
        },
        data() {
            return {
                collapse: false,
                default_active_index:{'active':''},
                // aside_list:[
                //     {
                //         index:'SystemHome',
                //         title:"系统首页",
                //         icon:"el-icon-location",
                //         children: [
                //             {
                //                 index:'ElementUI',
                //                 title:"ElementUI",
                //                 icon:"el-icon-eleme",
                //                 path:'https://element.eleme.cn/#/zh-CN/component/installation',
                //                 menuorigin:'remote',
                //                 children: [
                //                     {
                //                         index:'ElementUI官网',
                //                         title:"ElementUI官网",
                //                         icon:"el-icon-eleme",
                //                         path:'https://element.eleme.cn/#/zh-CN/component/installation',
                //                         menuorigin:'remote'
                //                     }
                //                 ]
                //             }
                //         ]
                //     },
                //     {
                //         index:'baidu',
                //         title:"百度搜索",
                //         name:'baidu',
                //         icon:'iconfont icon-baidu',
                //         path:'http://www.baidu.com',
                //         menuorigin:'remote'
                //     },
                //     {
                //         index:'HelloWorld',
                //         title:"本地页面",
                //         name:'HelloWorld',
                //         component:'@/components/HelloWorld.vue',
                //         path:'/home/pages/helloWorld',
                //         menuorigin:'local'
                //     },
                //     {
                //         index:'BaseTable',
                //         title:"基础表格",
                //         name:'BaseTable',
                //         component:'@/components/pages/BaseTable.vue',
                //         path:'/home/pages/base-table',
                //         icon:'el-icon-setting',
                //         menuorigin:'local'
                //     },
                //     {
                //         index:'SettingInfo',
                //         title:"设置页面",
                //         name:'SettingInfo',
                //         component:'@/components/pages/SettingInfo.vue',
                //         path:'/home/pages/settingInfo',
                //         icon:'el-icon-setting',
                //         menuorigin:'local'
                //     },
                //     {
                //         index:'403',
                //         title:"403",
                //         name:'403',
                //         component:'@/components/pages/403.vue',
                //         path:'/home/pages/403',
                //         menuorigin:'local'
                //     },
                //     {
                //         index:'SelfDefineIcon',
                //         title:"自定义图标",
                //         name:'SelfDefineIcon',
                //         icon:'iconfont icon-smell',
                //         component:'@/components/pages/Icon.vue',
                //         path:'/home/pages/Icon',
                //         menuorigin:'local'
                //
                //     },
                //     {
                //         index:'DragComponents',
                //         title:"拖拽组件",
                //         name:'DragComponents',
                //         icon:'el-icon-rank',
                //         children: [
                //             {
                //                 index:'DragList',
                //                 title:"拖拽列表",
                //                 name:'DragList',
                //                 icon:'',
                //                 component:'@/components/pages/DragList.vue',
                //                 path:'/home/pages/DragList',
                //                 menuorigin:'local',
                //             }
                //         ]
                //
                //     },
                //     {
                //         index:'UserManage',
                //         title:"用户管理",
                //         name:'UserManage',
                //         icon:'el-icon-setting',
                //         children: [
                //             {
                //                 index:'SystemUser',
                //                 title:"系统用户",
                //                 name:'SystemUser',
                //                 icon:'el-icon-user',
                //                 component:'@/components/pages/system/SystemUser.vue',
                //                 path:'/home/pages/system-user',
                //                 menuorigin:'local',
                //             }
                //         ]
                //
                //     },
                //     {
                //         index:'PermissionManage',
                //         title:"权限管理",
                //         name:'PermissionManage',
                //         icon:'el-icon-setting',
                //         children: [
                //             {
                //                 index:'RoleManage',
                //                 title:"角色管理",
                //                 name:'RoleManage',
                //                 icon:'el-icon-user',
                //                 component:'@/components/pages/system/RoleManage.vue',
                //                 path:'/home/pages/role-manage',
                //                 menuorigin:'local',
                //             },
                //             {
                //                 index:'OrganizationManage',
                //                 title:"组织机构",
                //                 name:'OrganizationManage',
                //                 icon:'iconfont icon-organization',
                //                 component:'@/components/pages/system/OrganizationManage.vue',
                //                 path:'/home/pages/organization-manage',
                //                 menuorigin:'local',
                //             },
                //             {
                //                 index:'MenuManager',
                //                 title:"菜单管理",
                //                 name:'MenuManager',
                //                 icon:'el-icon-menu',
                //                 component:'@/components/pages/system/MenuManage.vue',
                //                 path:'/home/pages/menu-manage',
                //                 menuorigin:'local',
                //             }
                //         ]
                //     },
                //     {
                //         index:'Donate',
                //         title:"支持作者",
                //         name:'Donate',
                //         icon:"iconfont icon-redpacket_fill",
                //         component:'@/components/pages/Donate.vue',
                //         path:'/home/pages/Donate',
                //         menuorigin:'local'
                //     }
                // ]
            };
        },

        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        },
        computed: {
            defaultActiveIndex () {
                return this.default_active_index;
            }
        },
        methods: {
            //home页传值选中左侧菜单
            handleSelectedFromHome(key, keyPath,aside_list){

                this.aside_list = aside_list
                this.handleSelected(key, keyPath,aside_list);
            },
            //左侧菜单栏选中
            handleSelected: function (key, keyPath) {

                // this.default_active_index = key
                this.$set(this.default_active_index,'active',key)

                let tabNode = {"title":'',"path":'',"menuorigin":'',"component":''}
                for(let i = 0;i<this.aside_list.length;++i){
                    if(this.aside_list[i].index == keyPath[0] && keyPath.length>1){
                        this.aside_list[i].children.forEach(item=>{
                            if(item.index == keyPath[1]){
                                tabNode.title = item.title
                                tabNode.path = item.path
                                tabNode.menuorigin = item.menuorigin
                                tabNode.component = item.component || ''
                                tabNode.key = key
                                tabNode.keyPath = keyPath
                                tabNode.name = item.name
                                return
                            }
                        })
                    }else if(this.aside_list[i].index == keyPath[0] && keyPath.length==1){
                        tabNode.title = this.aside_list[i].title
                        tabNode.path = this.aside_list[i].path
                        tabNode.menuorigin = this.aside_list[i].menuorigin
                        tabNode.component = this.aside_list[i].component || ''
                        tabNode.key = key
                        tabNode.keyPath = keyPath
                        tabNode.name =  this.aside_list[i].name
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

                let new_tab_list_keepAlive = this.$store.getters.keepAliveTagsList

                if(!new_tab_list_keepAlive.includes(tabNode.name,0)){
                    new_tab_list_keepAlive.push(tabNode.name)
                }

                this.$store.commit('SET_KEEP_ALIVE', new_tab_list_keepAlive)
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

                    if(tabNode.menuorigin == "local"){
                        this.$router.push(tabNode.path);
                    }

                    return
                }
                //当前tab不存在，添加新的tab页，并激活
                let content = ''
                if(tabNode.menuorigin == "local"){
                    this.$router.push(tabNode.path)
                }else if(tabNode.menuorigin == "remote"){
                    content = "<object type='text/html' data='"+tabNode.path+"' width='100%' height='100%'></object>"
                }

                this.$my_tag_list.push({
                    title: tabNode.title,
                    name: tabNode.name,
                    content: content,
                    menuorigin:tabNode.menuorigin,
                    path:tabNode.path,
                    key:tabNode.key,
                    keyPath:tabNode.keyPath
                });

                this.$set(this.$my_editableTabsValue,"active-tab",tabNode.title)
            },
        }
    }
</script>
<style scoped>
    /**
    保证收缩时，可以平滑过渡，而非直接到达，参见官网的例子
     */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .iconfont {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
    }
</style>