<template>
    <div>
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
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="3">
                    <el-form-item>
                        <el-button type="primary" @click="queryAll" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <el-row style="background-color: #efefef">
            <el-button type="success" plain @click="add" icon="el-icon-plus" size="mini" style="border: 0">新增</el-button>
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
                <el-table-column align="center"
                        fixed
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
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible" ref="addOrEditDialog">
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
            maxTableHeight:'',
            tableHeight:'',
            dialogFormVisible:false,
            formLabelWidth:'150px',
            menuOptions:[],
            props: { multiple: true,value:"id",label:"text" },

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
            this.$axios.post("/role/querySysRoleList?currentPage="+this.currentPage+"&pageSize="+this.pageSize,param,{"baseURL":'csm-base-member'})
                .then(function (response) {
                    let data = response.data
                    console.log(data)
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
            this.multipleSelection = row
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
        // 打开弹窗  --->对弹窗作前置条件处理
        openAddOrEditDialog(){
            let _this = this
            //查询 角色菜单
            if(_this.menuOptions == null){
                let param = {"showTop":false}
                this.$axios.post("/menu/getAllMenuTree",param,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        let data = response.data
                        if(data.flag == 1){
                            _this.menuOptions = data.result
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            }
            setTimeout(()=>{
                //设置宽度 form的宽度 + 'px'
                this.formLabelWidth = this.$store.getters.windowWidth * 0.5 * 0.35 + 'px'
                //弹窗
                this.dialogFormVisible = true
            },1)
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