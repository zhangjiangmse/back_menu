<template>
    <div>
        <el-row >
            <el-form :inline="true" :model="searchListForm" class="demo-form-inline" size="mini">
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.accountName" placeholder="请输入账号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item >
                        <el-input v-model="searchListForm.userRealName" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3">
                    <el-form-item >
                        <el-input v-model="searchListForm.accountWeChatId" placeholder="请输入微信账号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.accountTel" placeholder="请输入电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.orgName" placeholder="请输入部门"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.roleName" placeholder="请输入角色类型"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="3">
                    <el-form-item>
                        <el-button type="primary" @click="queryAll" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <el-row style="background-color: #efefef">
            <el-button type="success" plain @click="addOrEdit" icon="el-icon-plus" size="mini" style="border: 0">新增</el-button>
            <el-button type="success" plain @click="onSubmit" icon="el-icon-refresh" size="mini" style="border: 0">同步呼叫中心用户</el-button>
        </el-row>
        <el-row>
            <el-table :data="tableData" border style="width: 100%;" size="mini"
                      :default-sort="{prop:'createTime',order:'descending'}"
                      :max-height="maxTableHeight" :height="tableHeight"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"

            >
                <el-table-column fixed align="center"
                                 type="index"
                                 width="40">
                </el-table-column>
                <el-table-column
                        fixed
                        label="操作"
                        width="130">
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="修改" placement="bottom-start">
                            <el-button type="text" size="medium" icon="el-icon-edit" @click="handleEditRow(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="删除" placement="bottom-start">
                            <el-button type="text" size="medium" @click="handleDeleteRow(scope.row)" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                        <el-button @click="handleResetPwd(scope.row)" type="text" size="small">重置密码</el-button>

                    </template>
                </el-table-column>
                <template v-for="item in tableLabel">
                    <el-table-column :key ="item.prop"  :fixed="item.fixed" align="center"
                                     :prop="item.prop"
                                     :label="item.label"
                    >
                    </el-table-column>
                </template>

            </el-table>
        </el-row>
        <el-row>
            <el-row style="text-align: right;margin: 10px">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalData">
                </el-pagination>
            </el-row>
        </el-row>
        <!-- 新增弹框-->
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible" ref="addOrEditDialog">
            <el-row>
                <el-form :model="addOrEditForm"  size="mini" ref="addOrEditForm" :rules="addOrEditFormRules">
                    <el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="addOrEditForm.name" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <template v-if="this.isShowPwdInput">
                        <el-form-item  label="密码：" :label-width="formLabelWidth" prop="pwd" >
                            <el-input  type="password" v-model="addOrEditForm.pwd" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                        </el-form-item>
                    </template>
                    <el-form-item label="姓名：" :label-width="formLabelWidth" prop="realName">
                        <el-input v-model="addOrEditForm.realName" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="微信账号：" :label-width="formLabelWidth" prop="wechatid">
                        <el-input v-model="addOrEditForm.wechatid" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：" :label-width="formLabelWidth" prop="tel">
                        <el-input v-model="addOrEditForm.tel" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
                        <el-input v-model="addOrEditForm.email" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="角色类型：" :label-width="formLabelWidth" prop="roleId">
                        <el-select v-model="addOrEditForm.roleId" placeholder="请选择角色" size="mini" :style="{width:this.addDialogInputWidth}">
                            <el-option
                                    v-for="item in roleOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在部门：" :label-width="formLabelWidth" prop="orgId">
                        <el-select v-model="addOrEditForm.orgId" placeholder="请选择部门" size="mini" :style="{width:this.addDialogInputWidth}">
                            <el-option
                                    v-for="item in orgOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否是电话坐席：" :label-width="formLabelWidth" prop="istelAccount">
                        <el-select v-model="addOrEditForm.istelAccount" placeholder="请选择" size="mini" :style="{width:this.addDialogInputWidth}">
                            <el-option
                                    v-for="item in istelAccountOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否是在线坐席：" :label-width="formLabelWidth" prop="isonlineAccount">
                        <el-select v-model="addOrEditForm.isonlineAccount" placeholder="请选择"
                                   size="mini" :style="{width:this.addDialogInputWidth}">
                            <el-option
                                    v-for="item in isonlineAccountOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini" type="warning" plain>取 消</el-button>
                <el-button @click="resetForm('addOrEditForm')" size="mini" type="warning" plain>重 置</el-button>
                <el-button @click="saveUserInfo" size="mini" type="success" plain>保 存</el-button>
                <el-button type="primary" @click="confirm" size="mini" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: "SystemUser",
        data(){
            var validateEmail = (rule, value, callback) => {
                // eslint-disable-next-line no-debugger
                debugger
                if (value == undefined || value === '') {  //不进行必须校验
                    callback();
                } else {
                    if (value !== '') {
                        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的邮箱'));
                        }
                    }
                    callback();
                }

            };
            return {
                searchListForm:{},
                addOrEditForm:{
                    isonlineAccount:0,
                    istelAccount:0
                },

                addOrEditFormRules:{
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    pwd:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    realName:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    email:[
                        {validator:validateEmail,trigger: 'blur'}
                    ]
                },

                tableLabel:[
                    {"prop":"name","label":"账号","width":"200","fixed":false},
                    {"prop":"companyName","label":"公司名称","width":"200","fixed":false},
                    {"prop":"isonlineflag","label":"在线坐席","width":"200","fixed":false},
                    {"prop":"istelflag","label":"电话坐席","width":"200","fixed":false},
                    {"prop":"wechatid","label":"微信账号","width":"200","fixed":false},
                    {"prop":"tel","label":"电话","width":"200","fixed":false},
                    {"prop":"email","label":"邮箱","width":"120","fixed":false},
                    {"prop":"roleName","label":"角色名称","width":"200","fixed":false},
                    {"prop":"realName","label":"姓名","width":"200","fixed":false},
                    {"prop":"orgname","label":"部门","width":"200","fixed":false},
                    {"prop":"createTime","label":"创建时间","width":"120","fixed":false}
                ],
                tableData:[],
                currentPage:1,
                pageSize:10,
                totalData:0,
                maxTableHeight:'',
                tableHeight:'',
                dialogFormVisible:false,
                isShowPwdInput:true,
                formLabelWidth:'150px',
                roleOptions:[
                    {label:'坐席',value:"604941576297380267"},
                    {label:'demo01',value:"304121577066898548"}
                ],
                orgOptions:[
                    {label:'售前',value:"816711576215371475"},
                    {label:'售后',value:"622811576215381206"},
                    {label:'customer service',value:"666131577067127529"}
                ],
                istelAccountOptions:[
                    {label:'电话坐席',value:"1"},
                    {label:'非电话坐席',value:"0"}
                ],
                isonlineAccountOptions:[
                    {label:'在线坐席',value:"1"},
                    {label:'非在线坐席',value:"0"}
                ],
            }
        },
        created(){
            this.initTableAttr();
            this.queryAll();
        },
        computed :{
            addDialogInputWidth:function () {
                return this.formLabelWidth
            }  
        },
        methods:{
            initTableAttr(){
                let init_maxTableHeight = this.$store.getters.tabPanelHeight
                this.maxTableHeight = init_maxTableHeight
                //设定Table的高度
                this.tableHeight = init_maxTableHeight * 0.79
            },
            onSubmit(){

            },
            //查询按钮事件
            queryAll(){
                this.currentPage = 1
                this.queryData();
            },
            //数据查询请求
            queryData(){

                let _this = this
                let param = this.searchListForm
                this.$axios.post("/user/querySysUserList?currentPage="+this.currentPage+"&pageSize="+this.pageSize,param,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if(data.flag == 1){
                            let result = data.result
                            _this.tableData = result.records
                            _this.totalData = result.total
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            // 单条数据修改
            handleEditRow(row){
                this.isShowPwdInput = false
                this.addOrEditForm = {
                    "accountId":row.accountId,"name":row.name,"realName":row.realName,"wechatid":row.wechatid,
                    "tel":row.tel,"email":row.email,"roleId":row.roleId,"orgId":row.orgId,
                    "istelAccount":row.istelAccount,"isonlineAccount":row.isonlineAccount
                }

                console.log(row)
                this.addOrEdit()
            },
            // 单条数据删除
            handleDeleteRow(row){
                this.multipleSelection = row
                let selected = row.date
                this.deleteData(selected)
            },
            confirm(){
                this.saveUserInfo()
                this.dialogFormVisible = false
            },
            // 删除数据
            deleteData(selected){
                alert("待删除的数据为:" + selected)
                this.$confirm('确定是否进行删除操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            addOrEdit(){
                let _this = this
                //this.form = []
                //设置宽度 form的宽度 + 'px'
                _this.formLabelWidth = this.$store.getters.windowWidth * 0.5 * 0.35 + 'px'
                //新增 显示密码框
                this.isShowPwdInput = true
                //弹窗
                this.dialogFormVisible = true

            },
            //保存用户信息
            saveUserInfo(){
                let _this = this
                this.$refs.addOrEditForm.validate((valid) => {
                    if (valid) {
                        //处理保存信息请求
                        let param = _this.addOrEditForm
                        this.$axios.post("/user/saveSysUser",param,{"baseURL":'csm-base-member'})
                            .then(function (response) {
                                if(response.data.flag == 1){
                                    _this.$message.success("保存成功");
                                }else{
                                    _this.$message.error(response.data.msg);
                                }
                            }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置密码请求
            handleResetPwd(row){
                console.log(row)
            },
            //重置表单
            resetForm(formName){

                this.$refs[formName].resetFields();
            },
            //分页
            handleSizeChange(pageSize){
                this.pageSize = pageSize
                this.currentPage = 1
                this.queryData()
            },
            handleCurrentChange(curPage){
                this.currentPage = curPage
                this.queryData()
            },
        }
    }
</script>

<style scoped>
    .el-dialog__body {
        padding: 10px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
    }
</style>