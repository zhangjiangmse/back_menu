<template>
    <div>
        <el-row>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-input v-model="input" placeholder="请输入姓名" style="width: 150px" size="mini"></el-input>
                <el-select v-model="sexValue" placeholder="请选择性别" size="mini" style="width: 150px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-button type="primary" size="mini" icon="el-icon-search" @click="queryAll" >搜索</el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="add" >新增</el-button>
                <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteAll" >批量删除</el-button>
                <el-button type="primary" size="mini" icon="el-icon-download" @click="exportExcel" >导出</el-button>
                <el-button type="primary" size="mini" icon="el-icon-refresh" @click="cur_reload" >刷新</el-button>
            </el-col>
        </el-row>
        <el-row>

        </el-row>
    </div>
</template>
<script>
    export default {
        name:'BaseTable',
        inject: ['reload'],
        data() {
            return {
                input: '',
                sexValue:'',
                options:[
                    {
                        value: 'man',
                        label: '男'
                    }, {
                        value: 'woman',
                        label: '女'
                    }
                ]

            };
        },
        methods:{
            cur_reload(){
               this.reload()
                // console.log(this.loadKey)
            },
            queryAll(){

            },
            add(){

            },
            deleteAll(){


            },
            exportExcel(){

            }
        }
    }
</script>