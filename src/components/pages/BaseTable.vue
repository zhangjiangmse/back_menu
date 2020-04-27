<template >
    <el-row >
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="cur_reload">刷新</el-button>
    </el-row>
</template>
<script>
    export default {
        name:'BaseTable',
        inject: ['reload'],
        data() {
            return {
                input: '',

            };
        },
        methods:{
            cur_reload(){
               this.reload()
                // console.log(this.loadKey)
            }
        }
    }
</script>