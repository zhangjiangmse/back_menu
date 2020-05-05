<template>
    <div>
        <el-row>
            <div style="height: 50px;background-color: #EEF1F6;margin-bottom: 10px;text-align: center;padding-top: 23px">
                <span>Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。 访问地址：
                    <el-link href="https://github.com/SortableJS/Vue.Draggable" style="color: #6CCBFF">Vue.Draggable</el-link></span>
            </div>
        </el-row>
        <el-row style="background-color:#F4F9F9;padding-left: 20px">
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <div class="item-title">
                    todo(待办)
                </div>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <div class="title-self-define-line">
                    <el-divider direction="vertical"></el-divider>
                </div>
            </el-col>
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <div class="item-title center">
                    doing(进行中)
                </div>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <div class="title-self-define-line" >
                    <el-divider direction="vertical"></el-divider>
                </div>
            </el-col>
            <el-col  :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <div class="item-title">
                    done(已完成)
                </div>
            </el-col>
        </el-row>
        <div style="background-color: #EEF1F6;padding-left: 20px" ref="mainDiv">
            <el-row>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" class="drag-area">
                    <draggable v-model="todo" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="todo" class="item-ul">
                            <el-card v-for="item in todo" class="drag-list" :key="item.id" shadow="hover">
                                <div slot="header" class="clearfix">
                                    <el-row>
                                        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="height: 20px">
                                            <span style="font-weight:800 ">标题：</span>
                                            <span v-show="item.content.length>=0&&item.content.length<=10">{{item.content}}</span>
                                            <span v-show="item.content.length>10">{{item.content.slice(0,10)}}...</span>
                                        </el-col>
                                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="height: 20px">
                                            <el-tooltip effect="dark" content="查看详情" placement="top-start">
                                                <el-button type="text" icon="el-icon-view" style="padding: 0"></el-button>
                                            </el-tooltip>
                                            <el-tooltip effect="dark" content="编辑" placement="top-start">
                                                <el-button type="text" icon="el-icon-edit" style="padding: 0"></el-button>
                                            </el-tooltip>
                                            <el-tooltip effect="dark" content="删除" placement="top-start">
                                                <el-button type="text" icon="el-icon-delete" style="padding: 0"></el-button>
                                            </el-tooltip>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div><span style="font-weight: lighter ">描述：</span>{{item.content}}</div>
                                <div><span style="font-weight: lighter ">开始日期：</span>{{item.beginDate}}</div>
                                <div><span style="font-weight: lighter ">耗时：</span>{{item.takeHours}} 小时</div>
                                <div><span style="font-weight: lighter ">负责人：</span>{{item.author}}</div>
                            </el-card>
                        </transition-group>
                    </draggable>
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" >
                    <div v-show="lineLoadKey" class="selfDefineLine" :style="{'height':this.selfLineHeight}">
                    </div>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" class="drag-area">
                    <draggable v-model="doing" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="doing" class="item-ul">
                            <el-card v-for="item in doing" class="drag-list" :key="item.id" shadow="hover">
                                <div slot="header" class="clearfix">
                                    <el-row>
                                        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="height: 20px">
                                            <span style="font-weight:800 ">标题：</span>
                                            <span v-show="item.content.length>=0&&item.content.length<=10">{{item.content}}</span>
                                            <span v-show="item.content.length>10">{{item.content.slice(0,10)}}...</span>
                                        </el-col>
                                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="height: 20px">
                                            <el-tooltip effect="dark" content="查看详情" placement="top-start">
                                                <el-button type="text" icon="el-icon-view" style="padding: 0"></el-button>
                                            </el-tooltip>
                                            <el-tooltip effect="dark" content="编辑" placement="top-start">
                                                <el-button type="text" icon="el-icon-edit" style="padding: 0"></el-button>
                                            </el-tooltip>
                                            <el-tooltip effect="dark" content="删除" placement="top-start">
                                                <el-button type="text" icon="el-icon-delete" style="padding: 0"></el-button>
                                            </el-tooltip>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div><span style="font-weight: lighter ">描述：</span>{{item.content}}</div>
                                <div><span style="font-weight: lighter ">开始日期：</span>{{item.beginDate}}</div>
                                <div><span style="font-weight: lighter ">耗时：</span>{{item.takeHours}} 小时</div>
                                <div><span style="font-weight: lighter ">负责人：</span>{{item.author}}</div>
                            </el-card>
                        </transition-group>
                    </draggable>
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <div v-show="lineLoadKey" class="selfDefineLine" :style="{'height':this.selfLineHeight}">
                    </div>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" class="drag-area">
                    <draggable v-model="done" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="done" class="item-ul">
                            <el-card v-for="item in done" class="drag-list" :key="item.id" shadow="hover">
                                <div slot="header" class="clearfix">
                                    <el-row>
                                        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="height: 20px;">
                                            <span style="font-weight:800 ">标题：</span>
                                            <span v-show="item.content.length>=0&&item.content.length<=10">{{item.content}}</span>
                                            <span v-show="item.content.length>10">{{item.content.slice(0,10)}}...</span>
                                        </el-col>
                                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="height: 20px">
                                            <el-tooltip effect="dark" content="查看详情" placement="top-start">
                                                <el-button type="text" icon="el-icon-view" style="padding: 0"></el-button>
                                            </el-tooltip>
                                            <el-tooltip effect="dark" content="编辑" placement="top-start">
                                                <el-button type="text" icon="el-icon-edit" style="padding: 0"></el-button>
                                            </el-tooltip>
                                            <el-tooltip effect="dark" content="删除" placement="top-start">
                                                <el-button type="text" icon="el-icon-delete" style="padding: 0"></el-button>
                                            </el-tooltip>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div><span style="font-weight: lighter ">描述：</span>{{item.content}}</div>
                                <div><span style="font-weight: lighter ">开始日期：</span>{{item.beginDate}}</div>
                                <div><span style="font-weight: lighter ">耗时：</span>{{item.takeHours}} 小时</div>
                                <div><span style="font-weight: lighter ">负责人：</span>{{item.author}}</div>
                            </el-card>
                        </transition-group>
                    </draggable>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'draglist',
        components:{
            draggable
        },
        data() {
            return {
                dragOptions:{
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style',
                },
                todo: [
                    {
                        id: 1,
                        content: '开发图表组件',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    },
                    {
                        id: 2,
                        content: '开发拖拽组件',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    },
                    {
                        id: 3,
                        content: '开发权限测试组件',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    }
                ],
                doing: [
                    {
                        id: 1,
                        content: '开发登录注册页面',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    },
                    {
                        id: 2,
                        content: '开发头部组件',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    },
                    {
                        id: 3,
                        content: '开发表格相关组件',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    },
                    {
                        id: 4,
                        content: '开发表单相关组件',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    }
                ],
                done:[
                    {
                        id: 1,
                        content: '初始化项目，生成工程目录，完成相关配置',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    },
                    {
                        id: 2,
                        content: '开发项目整体框架',
                        beginDate:"2020-01-01",
                        takeHours:"8",
                        author:"李昊"
                    }
                ],
                lineLoadKey:true

            }
        },

        methods: {
            removeHandle(event){

                console.log(event);
                this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
                // mainDiv在竖线之前加载，会自适应高度，否则获取到的高度是竖线撑起的高度，是之前的高度,下面两种方式均可
                this.lineLoadKey = false
                this.$nextTick(()=>{
                    this.selfLineHeight = this.$refs.mainDiv.offsetHeight - 20  + 'px'
                    this.lineLoadKey = true
                })
                // setTimeout(()=>{
                //     this.selfLineHeight = this.$refs.mainDiv.offsetHeight  + 'px'
                //     this.lineLoadKey = true
                // },1)
            }
        }
    }
</script>
<style>
    .drag-area {
        padding-top: 10px ;
        min-height:500px;
    }
    .item-title{
        height: 30px;
        background-color: #F4F9F9;
        text-align: center;
        padding-top: 10px;
    }
    .title-self-define-line{
        background-color: #F4F9F9;
        height: 20px;
        padding:10px 18px;
    }

    .selfDefineLine{
        background-color: darkgray;
        min-height: 490px;
        width: 1px;
        margin:10px 25px;
    }
    .el-card__header {
        padding: 5px 10px;
        border-bottom: 1px solid #EBEEF5;
        box-sizing: border-box;
    }
    .el-card__body {
        padding: 0 10px;
    }
    .drag-list {
        font-size: 14px;
        height: 110px;
        border: #6CCBFF 1px solid;
        margin: 0.5em 1em;
        background-color: #fff;
        border-radius: 10px;
    }
</style>