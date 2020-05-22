<template>
    <div class="singlePage">
        <el-row>
            <el-form :inline="true" :model="searchListForm" class="demo-form-inline" size="mini">
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.accountName" placeholder="请输入账号" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item >
                        <el-input v-model="searchListForm.userRealName" placeholder="请输入姓名" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3">
                    <el-form-item >
                        <el-input v-model="searchListForm.accountWeChatId" placeholder="请输入微信账号" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.accountTel" placeholder="请输入电话" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.orgName" placeholder="请输入部门" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.roleName" placeholder="请输入角色类型" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <el-row class="bottom">
            <el-button type="primary" @click="queryAll" icon="el-icon-search" size="mini">查询</el-button>
            <el-button type="primary" @click="add" icon="el-icon-plus" size="mini" >新增</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini">同步呼叫中心用户</el-button>
        </el-row>
        <el-row class="row-table">
            <el-table :data="tableData" border class="table-1" size="mini"
                      :default-sort="{prop:'createTime',order:'descending'}" height="100%"
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
                    <div v-show="isShowObj.isShowPwd == true">
                        <el-form-item  label="密码：" :label-width="formLabelWidth" prop="pwd">
                            <el-input type="password" v-model="addOrEditForm.pwd" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                        </el-form-item>
                    </div>
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
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在部门：" :label-width="formLabelWidth" prop="orgId">
                        <el-cascader ref="orgCascader" v-model="addOrEditForm.parentOrg" :style="{width:this.addDialogInputWidth}" :show-all-levels="false"
                                     :options="orgOptions"
                                     :props="props"
                                     clearable></el-cascader>
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
                    isonlineAccount:"0",
                    istelAccount:"0"
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
                dialogFormVisible:false,
                isShowObj:{"isShowPwd":true},
                formLabelWidth:'150px',
                roleOptions:[],
                orgOptions:[],
                istelAccountOptions:[
                    {label:'电话坐席',value:"1"},
                    {label:'非电话坐席',value:"0"}
                ],
                isonlineAccountOptions:[
                    {label:'在线坐席',value:"1"},
                    {label:'非在线坐席',value:"0"}
                ],
                props: { value:"id",label:"name",checkStrictly: true },
            }
        },
        created(){

            this.queryAll();
        },
        computed :{
            addDialogInputWidth:function () {
                return this.formLabelWidth
            }  
        },
        methods:{

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

                let _this = this
                _this.table_loading = true
                _this.$set(this.isShowObj,"isShowPwd",false)
                let promises=[_this.queryRoleListForSelect(),_this.getOrganizationTree()]
                return Promise.all(promises)
                    .then(()=>{
                        // 构造级联面板的选中参数
                        let parentOrg = []
                        let searchFlag = {flag:false}
                        _this.buildSingleSeletedCasecaderVal(_this.orgOptions[0],row.orgId,parentOrg,searchFlag)

                        _this.addOrEditForm = {
                            "accountId":row.accountId,"name":row.name,"pwd":row.password,"realName":row.realName,"wechatid":row.wechatid,
                            "tel":row.tel,"email":row.email,"roleId":row.roleId,"parentOrg":parentOrg,
                            "istelAccount":row.istelAccount,"isonlineAccount":row.isonlineAccount
                        }
                        _this.openAddOrEditDialog()
                        _this.table_loading = false
                    })
                    .catch(err=>console.error(err))

            },
            /**
             * 构造单选级联面板选中数据的完整路径
             * root : 全部数据，一颗以0为根节点的多叉树
             * target: 寻找的目标节点id,例如 id = '2'
             * res: 存放结果路径，例如：["0","1","2"]
             * searchFlag : 是否找到，找到即返回递归
             */
            buildSingleSeletedCasecaderVal(root,target,res,searchFlag){
                if(searchFlag.flag){
                    return
                }
                if(root.id == target){
                    res.push(target)
                    this.$set(searchFlag,"flag",true)
                    return;
                }else{
                    res.push(root.id)
                    let children = root.children
                    if(children != undefined && children.length != 0){
                        children.forEach(item=>{
                            this.buildSingleSeletedCasecaderVal(item,target,res,searchFlag)
                        })
                    }
                    if(searchFlag.flag){
                        return
                    }
                    res.pop();
                }
            },
            // 单条数据删除
            handleDeleteRow(row){
                let selected = row.id
                this.deleteData(selected)
            },
            // 弹窗内 ---> 确定按钮
            confirm(){

                this.saveUserInfo()

                this.dialogFormVisible = false
            },
            // 删除数据
            deleteData(selected){
                let _this = this
                let param = {"ids":selected}
                this.$confirm('确定是否进行删除操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.post("/user/deleteSysUser",param,{"baseURL":'csm-base-member'})
                        .then(function (response) {
                            console.log(response)
                            let data = response.data
                            if(data.flag == 1){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                _this.queryAll()
                            }else{
                                _this.$message.error(response.data.msg);
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //查询 角色信息
            async queryRoleListForSelect(){
                let _this = this
                await this.$axios.post("/role/queryRoleListForSelect",null,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        console.log(response)
                        let data = response.data
                        if(data.flag == 1){
                            _this.roleOptions = data.result
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            // 查询 组织机构信息
            async getOrganizationTree(){

                let _this = this
                let param = {"showTop": true}
                await this.$axios.post("/organization/getOrganizationTree",param,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if(data.flag == 1){

                            _this.orgOptions = data.result
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            // 打开弹窗  --->对弹窗作前置条件处理
            openAddOrEditDialog(){
                //设置宽度 form的宽度 + 'px'
                this.formLabelWidth = this.$store.getters.windowWidth * 0.5 * 0.35 + 'px'
                //弹窗
                this.dialogFormVisible = true
            },
            // 新增 按钮
            add(){
                let _this = this
                _this.table_loading = true
                let promises=[_this.queryRoleListForSelect(),_this.getOrganizationTree()]
                return Promise.all(promises)
                    .then(()=>{
                        Object.assign({},_this.addOrEditForm)
                        _this.openAddOrEditDialog()
                        _this.table_loading = false
                    })
                    .catch(err=>console.error(err))
            },
            //弹窗内 --->保存按钮
            saveUserInfo(){
                let _this = this
                this.$refs.addOrEditForm.validate((valid) => {
                    if (valid) {
                        //处理保存信息请求
                        let param = _this.buildSaveRoleParam()
                        this.$axios.post("/user/saveSysUser",param,{"baseURL":'csm-base-member'})
                            .then(function (response) {
                                if(response.data.flag == 1){
                                    _this.$message.success("保存成功");
                                    this.queryAll()
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
            // 构造保存参数
            buildSaveRoleParam(){

                let param = Object.assign({},this.addOrEditForm)
                this.$set(param,"orgId",this.addOrEditForm.parentOrg[this.addOrEditForm.parentOrg.length-1])
                return param
            },
            //重置密码请求
            handleResetPwd(row){
                let _this = this
                let parm = {"ids":row.id}
                this.$confirm('确定是否进行密码重置操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.post("/user/resetSysUserPwd",parm,{"baseURL":'csm-base-member'})
                        .then(function (response) {
                            if(response.data.flag == 1){
                                _this.$message.success("重置成功！");
                                this.queryAll()
                            }else{
                                _this.$message.error(response.data.msg);
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消密码重置'
                    });
                });
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
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
    .singlePage{
        width: 99.5%;
        height: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        bottom: 0px;
    }
    .row-table{
        top: 0px;
        bottom:100px;
        height: calc(100% - 160px);
        box-sizing: border-box;
    }
    .table-1{
        height: 100%;
        width: 100%;
        top: 0px;
        bottom: 0px;
    }
    .bottom {
        bottom: 5px;
    }
</style>