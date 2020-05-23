<template>
    <div  class="singlePage">
        <el-row  class="bottom">
            <el-button type="primary"  @click="add" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button type="primary"  @click="toggleRowExpansion(true)" icon="el-icon-arrow-down" size="mini">全部展开</el-button>
            <el-button type="primary"  @click="toggleRowExpansion(false)" icon="el-icon-arrow-up" size="mini">全部收回</el-button>
        </el-row>
        <el-row  class="row-table">
            <el-table :data="tableData" border style="width: 100%;" size="mini" ref="dataTreeList" class="table-1" v-loading="table_loading"
                      :default-sort="{prop:'createTime',order:'descending'}"
                      height="100%"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                      :tree-props="{children: 'children'}"
                      row-key="id"
            >
                <el-table-column align="center"
                                 type="index"
                                 width="40">
                </el-table-column>
                <template v-for="item in tableLabel">
                    <el-table-column  :fixed="item.fixed" align="left" v-if="item.prop == 'name'" :label="item.label" :key ="item.prop">
                        <template slot-scope="scope">
                            <i v-if="!scope.row.children" class="el-icon-document"></i>
                            <i v-else class="el-icon-folder"></i>
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column :key ="item.prop"  :fixed="item.fixed" align="center" v-else
                                     :prop="item.prop"
                                     :label="item.label"
                    >
                    </el-table-column>
                </template>
                <el-table-column align="center"
                                 label="操作"
                                 width="200">
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="修改" placement="bottom-start">
                            <el-button type="text" size="medium" icon="el-icon-edit" @click="handleEditRow(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="删除" placement="bottom-start">
                            <el-button type="text" size="medium" @click="handleDeleteRow(scope.row)" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="新增" placement="bottom-start">
                            <el-button type="text" size="medium" @click="handleAddRow(scope.row)" icon="el-icon-plus"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="绑定用户" placement="bottom-start">
                            <el-button type="text" size="medium" @click="handleBindUser(scope.row)" icon="el-icon-edit-outline"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>
        </el-row>
        <!-- 新增修改弹框-->
        <el-dialog title="新增组织机构" :visible.sync="dialogFormVisible" ref="addOrEditDialog">
            <el-row>
                <el-form :model="addOrEditForm"  size="mini" ref="addOrEditForm" :rules="addOrEditFormRules">
                    <el-form-item label="名称：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="addOrEditForm.name" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="编码：" :label-width="formLabelWidth" prop="code">
                        <el-input v-model="addOrEditForm.code" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="上级机构：" :label-width="formLabelWidth" prop="parentOrg">
                        <el-cascader ref="orgCascader" v-model="addOrEditForm.parentOrg" :style="{width:this.addDialogInputWidth}" :show-all-levels="false"
                                     :options="orgOptions" @change="handleSelectedChange"
                                     :props="props"
                                     clearable></el-cascader>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini" type="warning" plain>取 消</el-button>
                <el-button @click="resetForm('addOrEditForm')" size="mini" type="warning" plain>重 置</el-button>
                <el-button @click="saveOrgInfo" size="mini" type="success" plain>保 存</el-button>
                <el-button type="primary" @click="confirm" size="mini" plain>确 定</el-button>
            </div>
        </el-dialog>
        <!-- 绑定用户弹框-->
        <el-dialog id="dialogForBindUser" title="修改机构用户" :visible.sync="dialogFormVisibleForBindUser" ref="bindUserDialog">
            <el-row>
                <el-form :inline="true" :model="searchUserListForm" class="demo-form-inline" size="mini" ref="searchUserForm">
                    <el-col :xs="8" :sm="4" :md="5" :lg="5" :xl="3">
                        <el-form-item prop="accountName">
                            <el-input v-model="searchUserListForm.accountName" placeholder="请输入账号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="4" :md="5" :lg="5" :xl="3">
                        <el-form-item prop="userRealName">
                            <el-input v-model="searchUserListForm.userRealName" placeholder="请输入姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="4" :md="5" :lg="5" :xl="3">
                        <el-form-item prop="accountTel">
                            <el-input v-model="searchUserListForm.accountTel" placeholder="请输入电话" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="4" :md="5" :lg="5" :xl="3">
                        <el-form-item  prop="accountEmail">
                            <el-input v-model="searchUserListForm.accountEmail" placeholder="请输入邮箱" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :xs="8" :sm="4" :md="5" :lg="4" :xl="3">
                        <el-button type="primary" @click="queryUser" icon="el-icon-search" size="mini">查询</el-button>
                    </el-col>
                </el-form>
            </el-row>
            <el-row class="row-table">
                <el-table :data="userTableData" border class="table-1" size="mini" ref="bindUserTable" v-loading="userTable_loading"
                          :default-sort="{prop:'createTime',order:'descending'}" height="30%" max-height="400px"  @selection-change="handleSelectionChange"
                          :header-cell-style="{background:'#eef1f6',color:'#606266'}"

                >
                    <el-table-column
                            type="selection"
                            width="40">
                    </el-table-column>
                    <el-table-column fixed align="center"
                                     type="index"
                                     width="40">
                    </el-table-column>
                    <template v-for="item in userTableLabel">
                        <el-table-column :key ="item.prop"  :fixed="item.fixed" align="center"
                                         :prop="item.prop"
                                         :label="item.label"
                        >
                        </el-table-column>
                    </template>
                </el-table>
            </el-row>
            <el-row style="text-align: center;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="userCurrentPage"
                        :page-sizes="[15, 30, 50]"
                        :page-size="userPageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="userTotalData">
                </el-pagination>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleForBindUser = false" size="mini" type="warning" plain>取 消</el-button>
                <el-button @click="saveBindUserInfo" size="mini" type="success" plain>保 存</el-button>
                <el-button type="primary" @click="confirmBindUser" size="mini" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "OrganizationManage",
        data(){
            return {
                table_loading:false,
                searchUserListForm:{
                    "accountName":'',
                    "userRealName":'',
                    "accountTel":'',
                    "accountEmail":''
                },
                addOrEditForm:{
                    id:'',
                    name:'',
                    code:'',
                    parentOrg:[]
                },
                addOrEditFormRules:{
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '请输入编码', trigger: 'blur' },
                    ]
                },
                tableLabel:[
                    {"prop":"name","label":"名称","width":"200","fixed":false},
                    {"prop":"companyName","label":"公司名称","width":"200","fixed":false},
                    {"prop":"id","label":"编号","width":"200","fixed":false},
                    {"prop":"code","label":"编码","width":"200","fixed":false}
                ],
                tableData:[],
                currentPage:1,
                pageSize:10,
                totalData:0,
                dialogFormVisible:false,
                formLabelWidth:'150px',
                orgOptions:[],
                props: { value:"id",label:"name",checkStrictly: true },
                dialogFormVisibleForBindUser:false,
                userTableData:[],
                userTable_loading:false,
                selectedOrgId:'',
                selectedAccountIds:'',
                userTableLabel:[
                    {"prop":"name","label":"账号","width":"200","fixed":false},
                    {"prop":"realName","label":"姓名","width":"200","fixed":false},
                    {"prop":"tel","label":"电话","width":"200","fixed":false},
                    {"prop":"email","label":"邮箱","width":"120","fixed":false},
                    {"prop":"orgname","label":"部门","width":"200","fixed":false}
                ],
                userCurrentPage:1,
                userPageSize:15,
                userTotalData:0,

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
        methods: {
            //查询按钮事件
            queryAll() {
                this.currentPage = 1
                this.queryData();
            },
            //组织机构数据查询请求
            queryData() {
                let _this = this
                _this.table_loading = true
                this.$axios.post("/organization/getOrganizationTree?currentPage=" + this.currentPage + "&pageSize=" + this.pageSize + "&showTop=false", null, {"baseURL": 'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        console.log(data)
                        if (data.flag == 1) {
                            _this.tableData = data.result
                            _this.table_loading = false
                        } else {
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //切换数据表格树形展开
            toggleRowExpansion(isExpansion) {
                this.tableData.forEach(item => {
                    this.$refs.dataTreeList.toggleRowExpansion(item, isExpansion);
                })
            },
            // 获取组织机构树
            async getOrganizationTree() {
                let _this = this
                let param = {"showTop": true}
                await this.$axios.post("/organization/getOrganizationTree", param, {"baseURL": 'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if (data.flag == 1) {
                            _this.orgOptions = data.result
                        } else {
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            },
            // 单条数据修改
            handleEditRow(row) {
                let _this = this
                _this.table_loading = true

                let promises = [_this.getOrganizationTree()]
                return Promise.all(promises)
                    .then(() => {
                        // 构造级联面板的选中参数
                        let result = []
                        let searchFlag = {flag: false}
                        _this.buildSingleSeletedCasecaderVal(_this.orgOptions[0], row.id, result, searchFlag)
                        console.log(result)
                        result.pop()
                        _this.$set(_this.addOrEditForm, 'parentOrg', result)
                        _this.$set(_this.addOrEditForm, 'id', row.id)
                        _this.$set(_this.addOrEditForm, 'name', row.name)
                        _this.$set(_this.addOrEditForm, 'code', row.code)
                        _this.openAddOrEditDialog()

                        _this.table_loading = false
                    })
                    .catch(err => console.error(err))

            },
            /**
             * 构造单选级联面板选中数据的完整路径
             * root : 全部数据，一颗以0为根节点的多叉树
             * target: 寻找的目标节点id,例如 id = '2'
             * res: 存放结果路径，例如：["0","1","2"]
             * searchFlag : 是否找到，找到即返回递归
             */
            buildSingleSeletedCasecaderVal(root, target, res, searchFlag) {
                if (searchFlag.flag) {
                    return
                }
                if (root.id == target) {
                    res.push(target)
                    this.$set(searchFlag, "flag", true)
                    return;
                } else {
                    res.push(root.id)
                    let children = root.children
                    if (children != undefined && children.length != 0) {
                        children.forEach(item => {
                            this.buildSingleSeletedCasecaderVal(item, target, res, searchFlag)
                        })
                    }
                    if (searchFlag.flag) {
                        return
                    }
                    res.pop();
                }
            },

            // 单条数据删除
            handleDeleteRow(row) {

                let selected = row.id
                this.deleteData(selected)
            },
            // 添加数据  -> 默认选中上级机构
            handleAddRow(row) {
                let _this = this
                _this.table_loading = true
                let promises = [_this.getOrganizationTree()]
                return Promise.all(promises)
                    .then(() => {
                        // 构造级联面板的选中参数
                        let result = []
                        let searchFlag = {flag: false}
                        _this.buildSingleSeletedCasecaderVal(_this.orgOptions[0], row.id, result, searchFlag)

                        _this.$set(_this.addOrEditForm, 'parentOrg', result)
                        _this.$set(_this.addOrEditForm, 'id', '')
                        _this.$set(_this.addOrEditForm, 'name', '')
                        _this.$set(_this.addOrEditForm, 'code', '')

                        _this.openAddOrEditDialog()
                        _this.table_loading = false
                    })
                    .catch(err => console.error(err))
            },
            // 绑定用户弹窗内  -> 根据条件查询用户 按钮
            queryUser() {
                this.userCurrentPage = 1
                this.queryBindUser()
            },
            // 绑定用户弹窗内  -> 根据条件查询用户,并绑定默认选中机构
            queryBindUser() {
                let _this = this
                _this.userTable_loading = true
                let promises = [_this.queryAllUser()]
                return Promise.all(promises)
                    .then(() => {
                        _this.userTableData.forEach(item => {
                            if (item.orgId == _this.selectedOrgId) {
                                _this.$refs.bindUserTable.toggleRowSelection(item);
                            }
                        })

                        _this.userTable_loading = false

                    })
                    .catch(err => console.error(err))
            },
            // 查询该公司的所有用户
            async queryAllUser() {
                let _this = this
                let param = this.searchUserListForm
                await this.$axios.post("/user/querySysUserList?currentPage=" + this.userCurrentPage + "&pageSize=" + this.userPageSize, param, {"baseURL": 'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if (data.flag == 1) {
                            let result = data.result
                            _this.userTableData = result.records
                            _this.userTotalData = result.total
                        } else {
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
            },
            //打开绑定用户窗口时。绑定机构用户
            handleBindUser(row) {
                let _this = this
                _this.table_loading = true
                //清除查询数据
                _this.$set(_this.searchUserListForm,"accountName","");
                _this.$set(_this.searchUserListForm,"userRealName","");
                _this.$set(_this.searchUserListForm,"accountTel","");
                _this.$set(_this.searchUserListForm,"accountEmail","");
                //记录组织机构id
                _this.selectedOrgId = row.id

                let promises = [_this.queryAllUser()]
                return Promise.all(promises)
                    .then(() => {
                        _this.table_loading = false
                        //弹窗
                        _this.dialogFormVisibleForBindUser = true
                        // 构造默认选中机构
                        _this.$nextTick(() => {
                            _this.userTableData.forEach(item => {
                                if (item.orgId == _this.selectedOrgId) {
                                    _this.$refs.bindUserTable.toggleRowSelection(item);
                                }
                            })
                        })

                    })
                    .catch(err => console.error(err))
            },
            //绑定用户弹窗内   -> 多选存值
            handleSelectionChange(val){
                this.selectedAccountIds = val
            },
            //保存用户所属组织机构
            async saveOrgUser(){
                let _this = this
                let accountIds = ""
                _this.selectedAccountIds.forEach(item=>{
                    accountIds += item.id + ','
                })


                let param = {"accountIds":accountIds.substring(0,accountIds.length-1),"orgId":_this.selectedOrgId}
                await this.$axios.post("/organization/saveOrgUser", param, {"baseURL": 'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if (data.flag == 1) {
                            _this.$message({message: data.msg, type: 'success'});
                        } else {
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                        _this.$message.error({message: "保存失败！"});
                    console.log(error);
                })
            },
            //绑定用户弹窗内   ->  保存绑定用户 按钮
            saveBindUserInfo(){
                let _this = this
                _this.userTable_loading = true
                let promises = [_this.saveOrgUser()]
                return Promise.all(promises)
                    .then(() => {
                        _this.userTable_loading = false
                        _this.queryBindUser();
                    })
                    .catch(err => console.error(err))
            },
            //绑定用户弹窗内   -> 确定按钮
            confirmBindUser(){
                let _this = this
                _this.userTable_loading = true
                let promises = [_this.saveOrgUser()]
                return Promise.all(promises)
                    .then(() => {
                        _this.userTable_loading = false
                        _this.dialogFormVisibleForBindUser = false
                    })
                    .catch(err => console.error(err))

            },
            //绑定用户弹窗内  -> 分页
            handleSizeChange(pageSize) {
                this.userPageSize = pageSize
                this.userCurrentPage = 1
                this.queryBindUser()
            },
            //绑定用户弹窗内  -> 修改当前页
            handleCurrentChange(curPage) {
                this.userCurrentPage = curPage
                this.queryBindUser()
            },
            // 新增/编辑组织机构弹窗内 ---> 确定按钮
            confirm() {
                this.saveOrgInfo()
                this.dialogFormVisible = false
            },
            // 删除数据
            deleteData(selected) {
                let _this = this
                let param = {"ids": selected}
                this.$confirm('确定是否进行删除操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.post("/organization/deleteOrganization", param, {"baseURL": 'csm-base-member'})
                        .then(function (response) {
                            let data = response.data
                            if (data.flag == 1) {
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                _this.queryAll()
                            } else {
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
            // 打开新增或编辑组织机构弹窗  --->对弹窗作前置条件处理
            openAddOrEditDialog() {
                //设置宽度 form的宽度 + 'px'
                this.formLabelWidth = this.$store.getters.windowWidth * 0.5 * 0.35 + 'px'
                //弹窗
                this.dialogFormVisible = true
            },
            // 新增组织机构 按钮
            add() {
                let _this = this
                _this.table_loading = true
                let promises = [_this.getOrganizationTree()]
                return Promise.all(promises)
                    .then(() => {
                        this.$set(this.addOrEditForm, 'id', '')
                        this.$set(this.addOrEditForm, 'name', '')
                        this.$set(this.addOrEditForm, 'code', '')
                        this.$set(this.addOrEditForm, 'parentOrg', [])
                        _this.openAddOrEditDialog()
                        _this.table_loading = false
                        _this.resetForm('addOrEditForm')
                    })
                    .catch(err => console.error(err))

            },
            //新增/编辑组织机构弹窗内 --->保存按钮
            saveOrgInfo() {
                this.buildSaveRoleParam()
                let _this = this
                this.$refs.addOrEditForm.validate((valid) => {
                    if (valid) {
                        // 构造参数
                        let param = _this.buildSaveRoleParam()
                        //处理保存信息请求
                        this.$axios.post("/organization/saveOrganization", param, {"baseURL": 'csm-base-member'})
                            .then(function (response) {
                                if (response.data.flag == 1) {
                                    _this.$message.success("保存成功");
                                    _this.resetForm('addOrEditForm')
                                    _this.queryAll()
                                } else {
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
            buildSaveRoleParam() {

                let param = Object.assign({}, this.addOrEditForm)
                this.$set(param, "parentid", this.addOrEditForm.parentOrg[this.addOrEditForm.parentOrg.length - 1])
                return param
            },
            // 新增/编辑组织机构弹窗内 ->级联面板选中改变时
            handleSelectedChange() {
                //单选，选中任意节点后，关闭下拉框
                this.$refs.orgCascader.toggleDropDownVisible(false)
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    #dialogForBindUser .el-dialog__body {
        padding: 0px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
    .singlePage{
        width: 99.7%;
        height: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        bottom: 0px;
    }
    .row-table{
        top: 0px;
        bottom:0px;
        height: calc(100% - 70px);
        box-sizing: border-box;
    }
    .table-1{
        height: 100%;
        width: 100%;
        top: 0px;
        bottom: 0px;
    }
    .bottom {
        margin: 5px;
        bottom: 4px;
    }
</style>
