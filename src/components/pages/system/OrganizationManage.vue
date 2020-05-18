<template>
    <div  class="singlePage">
        <el-row >
            <el-button type="primary"  @click="add" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button type="primary"  @click="toggleRowExpansion(true)" icon="el-icon-arrow-down" size="mini">全部展开</el-button>
            <el-button type="primary"  @click="toggleRowExpansion(false)" icon="el-icon-arrow-up" size="mini">全部收回</el-button>
        </el-row>
        <el-row  class="row-table">
            <el-table :data="tableData" border style="width: 100%;" size="mini" ref="dataTreeList" class="table-1"
                      :default-sort="{prop:'createTime',order:'descending'}"
                      height="100%"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                      :tree-props="{children: 'children'}"
                      row-key="id"
            >
                <el-table-column fixed align="center"
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
                                 fixed="right"
                                 label="操作"
                                 width="200">
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="修改" placement="bottom-start">
                            <el-button type="text" size="medium" icon="el-icon-edit" @click="handleEditRow(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="删除" placement="bottom-start">
                            <el-button type="text" size="medium" @click="handleDeleteRow(scope.row)" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>
        </el-row>
        <!-- 新增弹框-->
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
                <el-button @click="saveRoleInfo" size="mini" type="success" plain>保 存</el-button>
                <el-button type="primary" @click="confirm" size="mini" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "OrganizationManage",
        data(){
            return {
                searchListForm:{},
                addOrEditForm:{
                    roleId:'',
                    menuIds:[]
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
                this.$axios.post("/organization/getOrganizationTree?currentPage="+this.currentPage+"&pageSize="+this.pageSize,param,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        console.log(data)
                        if(data.flag == 1){
                            _this.tableData = data.result
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //切换数据表格树形展开
            toggleRowExpansion(isExpansion){
                this.tableData.forEach(item=>{
                    this.$refs.dataTreeList.toggleRowExpansion(item,isExpansion);
                })
            },
            // 单条数据修改
            handleEditRow(row){
                console.log(row)
                let _this = this
                let param = {"showTop":false}

                let menuId_index = row.menuIds.split(",").length
                this.$axios.post("/menu/getAllMenuTree",param,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        let menuId_Cascader = []
                        if(data.flag == 1){
                            _this.menuOptions = data.result
                            // 构造级联面板的选中参数
                            for(let i = 0 ;i < _this.menuOptions.length; ++i){
                                // eslint-disable-next-line no-debugger
                                // debugger
                                let route = []
                                let c1 = _this.menuOptions[i].children
                                route.push(_this.menuOptions[i].id)
                                if(c1 != undefined){
                                    for(let  j = 0 ;j < c1.length; ++j){

                                        route.push(c1[j].id)
                                        let c2 = c1[j].children
                                        if(c2 != undefined){
                                            for(let  k = 0 ;k < c2.length; ++k){

                                                route.push(c2[k].id)
                                                if(row.menuIds.includes(c2[k].id)){
                                                    menuId_Cascader.push(route.concat())
                                                    --menuId_index;
                                                }
                                                route.pop()
                                                if(menuId_index <= 0){
                                                    break
                                                }
                                            }
                                        }
                                        if(row.menuIds.includes(c1[j].id)){
                                            menuId_Cascader.push(route.concat())
                                            --menuId_index;
                                        }
                                        route.pop()
                                        if(menuId_index <= 0){
                                            break
                                        }
                                    }
                                }
                                if(row.menuIds.includes(_this.menuOptions[i].id)){
                                    menuId_Cascader.push(route.concat())
                                    --menuId_index;
                                }
                                route.pop()
                                if(menuId_index <= 0){
                                    break
                                }
                            }
                            console.log(menuId_Cascader)
                            _this.$set(_this.addOrEditForm,'menuIds',menuId_Cascader)
                            _this.$set(_this.addOrEditForm,'roleId',row.id)
                            _this.$set(_this.addOrEditForm,'name',row.name)
                            _this.openAddOrEditDialog()
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });


            },

            // 设置默认角色
            handleIsDefaultRole(row){
                console.log(row)
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
                if (_this.menuOptions == null) {
                    //let param = {"showTop": false}
                    await this.$axios.post("/organization/getOrganizationTree", null, {"baseURL": 'csm-base-member'})
                        .then(function (response) {
                            let data = response.data
                            if (data.flag == 1) {
                               //_this.orgOptions = data.result
                                _this.orgOptions.unshift({"id":0,"name":"全部分类",children:data.result})
                            } else {
                                _this.$message.error(response.data.msg);
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                }
                setTimeout(() => {
                    //设置宽度 form的宽度 + 'px'
                    this.formLabelWidth = this.$store.getters.windowWidth * 0.5 * 0.35 + 'px'
                    //弹窗
                    this.dialogFormVisible = true
                }, 1)
            },
            // 新增 按钮
            add(){
                this.$set(this.addOrEditForm,'roleId','')
                this.$set(this.addOrEditForm,'name','')
                this.$set(this.addOrEditForm,'menuId',[])
                //打开弹窗
                this.openAddOrEditDialog()
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
                                    _this.resetForm('addOrEditForm')
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
                // eslint-disable-next-line no-debugger
                debugger
                let roleId = this.addOrEditForm.roleId
                let menuIds = ''
                let cloneMenuIds = ''
                this.addOrEditForm.menuIds.forEach((item)=>{
                    menuIds += item[item.length-1] + ","
                    item.forEach((item_children)=>{
                        if(!cloneMenuIds.includes(item_children)){
                            cloneMenuIds += item_children + ","
                        }
                    })

                })
                menuIds = menuIds.substring(0,menuIds.length-1)
                cloneMenuIds = cloneMenuIds.substring(0,cloneMenuIds.length-1)

                let param = {id:roleId,menuIds:menuIds,cloneMenuIds:cloneMenuIds,roleType:1,name:this.addOrEditForm.name}
                return param
            },
            // 弹窗内 ->级联面板选中改变时
            handleSelectedChange(){
                //单选，选中任意节点后，关闭下拉框
                this.$refs.orgCascader.toggleDropDownVisible(false)
            },
            //重置表单
            resetForm(formName){
                this.$refs[formName].resetFields();
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
</style>
