<template>
    <div id="app">
        <el-row style="text-align: center">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div style="min-height: 36px;"></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card class="box-card" style="padding: 10px;margin-top: 80px">
                    <div slot="header"  style="background-color: #EEF1F6">
                        <i class="iconfont icon-redpacket_fill"></i><span>开源不易，如果该框架对你有帮助，那就请支持一下作者吧！</span>
                    </div>
                    <el-row>
                        <img src="../../assets/img/donate_myself.png" height="300" width="300"/>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div style="min-height: 36px;"></div>
            </el-col>
        </el-row>
<!--        <iframe src="icon.vue" width="1200" height="300" frameborder="0" scrolling="auto" style="position:absolute;top: -300px;left: 0px;"></iframe>-->

    </div>
</template>

<script>
export default {
    name:'Donate',
    created(){

    },
    methods:{

    }
};
</script>

<style>
    #app {
        height: 3000px;
    }
</style>