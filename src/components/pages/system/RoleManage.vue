<template>
    <div  class="singlePage">
        <el-row >
            <el-form :inline="true" :model="searchListForm" class="demo-form-inline" size="mini">
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-form-item>
                        <el-input v-model="searchListForm.name" placeholder="请输入角色名" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
                    <el-select v-model="searchListForm.isLock" clearable placeholder="请选择是否锁定" size="mini">
                        <el-option
                                v-for="item in isLockOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form>
        </el-row>
        <el-row class="bottom">
            <el-button type="primary" @click="queryAll" icon="el-icon-search" size="mini">查询</el-button>
            <el-button type="primary" @click="add" icon="el-icon-plus"  size="mini">新增</el-button>
        </el-row>
        <el-row  class="row-table ">
            <el-table :data="tableData" border style="width: 100%;" size="mini" class="table-1" v-loading="table_loading"
                      :default-sort="{prop:'createTime',order:'descending'}"
                      height="100%"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"

            >
                <el-table-column align="center"
                                 type="index"
                                 width="40">
                </el-table-column>
                <el-table-column align="center"
                        label="操作"
                        width="80">
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="修改" placement="bottom-start">
                            <el-button type="text" size="medium" icon="el-icon-edit" @click="handleEditRow(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="删除" placement="bottom-start">
                            <el-button type="text" size="medium" @click="handleDeleteRow(scope.row)" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <template v-for="item in tableLabel">
                    <el-table-column  :fixed="item.fixed" align="center" v-if="item.prop == 'isDefault'" :label="item.label" :key ="item.prop">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.isDefault == 1" style="color:#42b983;font-size: 22px" type="text" size="medium" icon="el-icon-circle-check" @click="handleIsDefaultRole(scope.row)"></el-button>
                            <el-button v-else style="color:#B9181E;font-size: 22px" type="text" size="medium" icon="el-icon-circle-close" @click="handleIsDefaultRole(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :key ="item.prop"  :fixed="item.fixed" align="center" v-else
                                     :prop="item.prop"
                                     :label="item.label"
                    >
                    </el-table-column>
                </template>

            </el-table>
        </el-row>
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
        <!-- 新增弹框-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" ref="addOrEditDialog">
            <el-row>
                <el-form :model="addOrEditForm"  size="mini" ref="addOrEditForm" :rules="addOrEditFormRules">
                    <el-form-item label="角色名：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="addOrEditForm.name" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="角色权限：" :label-width="formLabelWidth" prop="menuIds">
                        <el-cascader v-model="addOrEditForm.menuIds" :style="{width:this.addDialogInputWidth}" :show-all-levels="false"
                                     :options="menuOptions"
                                     :props="props"
                                     collapse-tags
                                     clearable></el-cascader>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini" type="warning" plain>取 消</el-button>
                <el-button @click="resetForm('addOrEditForm')" size="mini" type="warning" plain>重 置</el-button>
                <el-button @click="saveRoleInfo" size="mini" type="success" plain>保 存</el-button>
                <el-button type="primary" @click="confirm" size="mini" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>


export default {
    name: "RoleManage",
    data(){
        return {
            searchListForm:{},
            table_loading:false,
            addOrEditForm:{
                roleId:'',
                menuIds:[]
            },
            isLockOptions:[
                {label:'锁定',value:1},
                {label:'未锁定',value:0}
            ],
            addOrEditFormRules:{
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                menuIds:[
                    { required: true, message: '请输入选择角色权限', trigger: 'blur' },
                ]
            },

            tableLabel:[
                {"prop":"name","label":"角色名","width":"200","fixed":false},
                {"prop":"roleTypeValue","label":"角色类型","width":"200","fixed":false},
                {"prop":"isDefault","label":"默认角色","width":"200","fixed":false},
                {"prop":"isLockValue","label":"是否锁定","width":"200","fixed":false},
                {"prop":"createTime","label":"创建时间","width":"200","fixed":false}
            ],
            tableData:[],
            currentPage:1,
            pageSize:10,
            totalData:0,
            dialogFormVisible:false,
            formLabelWidth:'150px',
            menuOptions:[],
            props: { multiple: true,value:"id",label:"name" },
            dialogTitle:""

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
            this.$axios.post("/role/querySysRoleList?currentPage="+this.currentPage+"&pageSize="+this.pageSize,param,{"baseURL":'csm-base-member'})
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
            let param = {"showTop":true}

            this.$axios.post("/menu/getAllMenuTree",param,{"baseURL":'csm-base-member'})
                .then(function (response) {
                    let data = response.data

                    if(data.flag == 1){

                        _this.menuOptions = data.result

                        _this.$set(_this.addOrEditForm,'menuIds',JSON.parse(row.menuIds))
                        _this.$set(_this.addOrEditForm,'roleId',row.id)
                        _this.$set(_this.addOrEditForm,'name',row.name)
                        _this.dialogTitle = '编辑角色'
                        _this.openAddOrEditDialog()
                    }else{
                        _this.$message.error(response.data.msg);
                    }
                }).catch(function (error) {
                console.log(error);
            });
        },
        //递归寻找级联面板路径
        buildCascaderMultipleData(root,targets,currRes,result,searchFlag){
            let _this = this
            if(searchFlag.index <= 0){
                return
            }
            if(root.id != undefined && targets.includes(root.id)){
                currRes.push(root.id)
                result.push(currRes.concat())
                if(root.children == undefined || root.children.length == 0){
                    currRes.pop()
                }
                let index = searchFlag.index
                this.$set(searchFlag,'index',--index)
                return
            }else {
                currRes.push(root.id)
                let children = root.children
                if(children!= undefined && children != null){
                    children.forEach(item=>{
                        _this.buildCascaderMultipleData(item, targets,currRes, result,searchFlag)
                    })
                    if(searchFlag.index > 0){
                        currRes.pop()
                    }
                }else{
                    currRes.pop()
                    return;
                }
            }
        },
        // 设置默认角色
        handleIsDefaultRole(row){

            let _this = this
            let param = {"id":row.id}
            this.$confirm('确定是否进行设置默认角色操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.post("/role/markDefaultRole",param,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if(data.flag == 1){
                            _this.$message({
                                type: 'success',
                                message: '设置默认角色成功!'
                            });
                            _this.queryAll()
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 单条数据删除
        handleDeleteRow(row){

            let selected = row.id
            this.deleteData(selected)
        },
        // 弹窗内 ---> 确定按钮
        confirm(){
            this.saveRoleInfo()
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
                this.$axios.post("/role/deleteSysRole",param,{"baseURL":'csm-base-member'})
                    .then(function (response) {
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
        // 打开弹窗  --->对弹窗作前置条件处理
        async openAddOrEditDialog() {
            let _this = this
            //查询 角色菜单
            if (_this.menuOptions == null || _this.menuOptions.length == 0) {
                let param = {"showTop": true}
                await this.$axios.post("/menu/getAllMenuTree", param, {"baseURL": 'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if (data.flag == 1) {
                            _this.menuOptions = data.result
                        } else {
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            }
            //设置宽度 form的宽度 + 'px'
            this.formLabelWidth = this.$store.getters.windowWidth * 0.5 * 0.35 + 'px'
            //弹窗
            this.dialogFormVisible = true
        },
        // 新增 按钮
        add(){
            this.table_loading=true
            this.$set(this.addOrEditForm,'roleId','')
            this.$set(this.addOrEditForm,'name','')
            this.$set(this.addOrEditForm,'menuId',[])
            this.dialogTitle = '新增角色'
            //打开弹窗
            this.openAddOrEditDialog()
            this.table_loading=false
            this.$nextTick(()=>{
                this.resetForm('addOrEditForm')
            })
        },
        //弹窗内 --->保存按钮
        saveRoleInfo(){
            this.buildSaveRoleParam()
            let _this = this
            this.$refs.addOrEditForm.validate((valid) => {
                if (valid) {
                    // 构造参数
                    let param =  _this.buildSaveRoleParam()
                    //处理保存信息请求
                    this.$axios.post("/role/saveSysRole",param,{"baseURL":'csm-base-member'})
                        .then(function (response) {
                            if(response.data.flag == 1){
                                _this.$message.success("保存成功");
                                if(_this.dialogTitle == '新增角色'){
                                    _this.resetForm('addOrEditForm')
                                }
                                _this.queryAll()
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
        // 构造保存角色参数
        buildSaveRoleParam(){

            let roleId = this.addOrEditForm.roleId
            let menuIds = JSON.stringify(this.addOrEditForm.menuIds)
            let cloneMenuIds =  ''
            let param = {id:roleId,menuIds:menuIds,cloneMenuIds:cloneMenuIds,roleType:1,name:this.addOrEditForm.name}
            return param
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
        width: 99.7%;
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