<template>
    <div style="background-color: #DEDEDE;padding-left: 20px" ref="mainDiv">
        <el-row>
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" class="drag-area">
                <div class="item-title">todo</div>
                <draggable v-model="todo" @remove="removeHandle" :options="dragOptions">
                    <transition-group tag="div" id="todo" class="item-ul">
                        <el-card v-for="item in todo" class="drag-list" :key="item.id" shadow="hover">
                            <div>{{item.content}}</div>
                            <div>{{item.beginDate}}</div>
                            <div>{{item.takeHours}}</div>
                            <div>{{item.author}}</div>
                        </el-card>
                    </transition-group>
                </draggable>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <div v-show="lineLoadKey" class="selfDefineLine" :style="{'height':this.selfLineHeight}">
                </div>
            </el-col>
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" class="drag-area">
                <div class="item-title">doing</div>
                <draggable v-model="doing" @remove="removeHandle" :options="dragOptions">
                    <transition-group tag="div" id="doing" class="item-ul">
                        <el-card v-for="item in doing" class="drag-list" :key="item.id" shadow="hover">
                            <div>{{item.content}}</div>
                            <div>{{item.beginDate}}</div>
                            <div>{{item.takeHours}}</div>
                            <div>{{item.author}}</div>
                        </el-card>
                    </transition-group>
                </draggable>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <div v-show="lineLoadKey" class="selfDefineLine" :style="{'height':this.selfLineHeight}">
                </div>
            </el-col>
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" class="drag-area">
                <div class="item-title">done</div>
                <draggable v-model="done" @remove="removeHandle" :options="dragOptions">
                    <transition-group tag="div" id="done" class="item-ul">
                        <el-card v-for="item in done" class="drag-list" :key="item.id" shadow="hover">
                            <div>{{item.content}}</div>
                            <div>{{item.beginDate}}</div>
                            <div>{{item.takeHours}}</div>
                            <div>{{item.author}}</div>
                        </el-card>
                    </transition-group>
                </draggable>
            </el-col>
        </el-row>
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
        min-height:600px;
    }
    .item-title{
        height: 20px;
    }
    .selfDefineLine{
        background-color: darkgray;
        min-height: 580px;
        width: 1px;
        margin:10px 25px;
    }

    .drag-list {
        height: 110px;
        border: #6CCBFF 1px solid;
        margin: 5px 20px;
        background-color: #F4F9F9;
        border-radius: 10px;
    }
</style>