<template>
    <div>
        <el-button type="primary" @click="open">新增学员</el-button>
        <el-row :gutter="20" class="bottom">
            <el-col :span="6"><div class="grid-content bg-purple">报名开始时间:
                <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">结束时间: <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">身份证号: <el-input v-model="input" placeholder="请输入身份证号" autosize clearable size="mini" maxlength="18" minlength="18" show-word-limit></el-input></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">姓名: <el-input
                    placeholder="请输入姓名"
                    v-model="inputt"
                    clearable size="mini" class="szwidth">
            </el-input></div></el-col>
        </el-row>
        <el-row>
            <el-col :span="3"><div class="grid-content bg-purple"></div>分点: <el-select v-model="value" placeholder="请选择" size="mini" class="shewidth">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">车型: <el-select v-model="value" placeholder="请选择" size="mini" class="shewidth">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">总校审核: <el-select v-model="value" placeholder="请选择" size="mini" class="shewidth">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">是否毕业: <el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_b">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">学员类型: <el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select><el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple-light"><el-button type="primary" plain size="mini">查询内容</el-button></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple-light"><el-button type="success" plain size="mini">导出excel</el-button></div></el-col>
        </el-row>
        <el-table
                :data="tableData"
                height="250"
                border
                style="width: 100%" class="table_w" max-height="1000">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="60" align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="60" align="center">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="身份证号"
                    width="130"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="phonenumber"
                    label="手机号"
                    width="90"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="报名费"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="shouju"
                    label="收据号"
                    width="80"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="payway"
                    label="收费方式"
                    width="50"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="baomingtime"
                    label="报名时间"
                    width="80"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="fendian"
                    label="分点"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="peixuntime"
                    label="培训车型原证时间"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="shengneiwai"
                    label="本/外省本/外市"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="shenhe"
                    label="审核"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="studentl"
                    label="学员类型"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="changdifei"
                    label="场地费"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="kaoshfei"
                    label="考试费"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="交通录表状态"
                    width="55"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="beizhu"
                    label="备注"
                    width="40"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="dabiao"
                    label="打表"
                    width="40"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="caozuo"
                    label="操作"
                    width="90"
                    align="center"><template >
                <el-button
                        size="mini"
                        type="info"
                        >修改</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        >删除</el-button>
                <el-button
                        size="mini"
                        type="warning"
                >退学</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration">直接前往</span>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        name: "studentInformation",
        methods: {
            open() {
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data(){
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                input: '',
                inputt:'',
                options: [{
                    value: '选项1',
                    label: '一月'
                }, {
                    value: '选项2',
                    label: '二月'
                }, {
                    value: '选项3',
                    label: '三月'
                }, {
                    value: '选项4',
                    label: '四月'
                }, {
                    value: '选项5',
                    label: '五月'
                }],
                value:'',
                tableData: [{
                    date: '2000022',
                    name: '王小虎',
                    number: '420116199815478951',
                    phonenumber:'15307894658',
                    money:'10000',
                    shouju:'100861',
                    payway:'现金',
                    baomingtime:'2020.5.20',
                    fendian:'田茂森',
                    peixuntime:'c1',
                    shengneiwai:'本省本市',
                    shenhe:'已审核',
                    studentl:'校外',
                    changdifei:'未交',
                    kaoshfei:'未交',
                    status:'通过',
                    beizhu:'',
                    dabiao:'',
                    caozuo:''
                }]
            }
        }
    }
</script>

<style scoped>
    .bottom {
        margin: 5px;
    }
    .width{
        width: 60px;
        height: 15px;
    }
    .el-input {
        width: 210px;
    }
    .szwidth {
        width: 120px;
    }

    .shewidth {
        width: 120px;
    }
    .shewidth_b {
        width: 90px;
    }
    .shewidth_stu {
        width: 100px;
    }
    .table_w {
        margin: 10px;
        font-size: 8px;
    }


</style>