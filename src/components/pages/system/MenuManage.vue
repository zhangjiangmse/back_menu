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
                                 width="50">
                </el-table-column>
                <template v-for="item in tableLabel">
                    <el-table-column  :fixed="item.fixed" :width="item.width" align="left" v-if="item.prop == 'name'" :label="item.label" :key ="item.prop">
                        <template slot-scope="scope">
                            <i v-if="!scope.row.children" class="el-icon-document"></i>
                            <i v-else class="el-icon-folder"></i>
                            {{scope.row.name}}
                </template>
                    </el-table-column>
                    <el-table-column  :fixed="item.fixed" :width="item.width" align="center" v-else-if="item.prop == 'isShowT'" :label="item.label" :key ="item.prop">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="scope.row.isShowT == '是'" @click="handleIsShowMenu(scope.row,0)"><i  class="el-icon-check" style="color: springgreen;font-size: 20px;font-weight: 800"></i></el-button>
                            <el-button type="text" v-else @click="handleIsShowMenu(scope.row,1)"><i  class="el-icon-close" style="color: red;font-size: 20px;font-weight: 800"></i></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :key ="item.prop" :width="item.width"  :fixed="item.fixed" align="center" v-else
                                     :prop="item.prop"
                                     :label="item.label"
                    >
                    </el-table-column>
                </template>
                <el-table-column align="center"
                                 label="操作"
                                 >
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
        <el-dialog title="新增菜单" :visible.sync="dialogFormVisible" ref="addOrEditDialog">
            <el-row>
                <el-form :model="addOrEditForm"  size="mini" ref="addOrEditForm" :rules="addOrEditFormRules">
                    <el-form-item label="菜单名称：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="addOrEditForm.name" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单编码：" :label-width="formLabelWidth" prop="code">
                        <el-input v-model="addOrEditForm.code" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="url：" :label-width="formLabelWidth" prop="url">
                        <el-input v-model="addOrEditForm.url" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="组件路径：" :label-width="formLabelWidth" prop="component">
                        <el-input v-model="addOrEditForm.component" autocomplete="off" placeholder="@/components/HelloWorld.vue" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="组件前缀图标：" :label-width="formLabelWidth" prop="icon">
                        <el-input v-model="addOrEditForm.icon" autocomplete="off" placeholder="el-icon-setting" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="上级菜单：" :label-width="formLabelWidth" prop="parentMenu">
                        <el-cascader ref="menuCascader" v-model="addOrEditForm.parentMenu" :style="{width:this.addDialogInputWidth}" :show-all-levels="false"
                                     :options="menuOptions" @change="handleSelectedChange"
                                     :props="props"
                                     clearable></el-cascader>
                    </el-form-item>
                    <el-form-item label="排序：" :label-width="formLabelWidth" prop="sort">
                        <el-input v-model.number="addOrEditForm.sort" autocomplete="off" :style="{width:this.addDialogInputWidth}" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单类型：" :label-width="formLabelWidth" prop="menuType">
                        <el-select v-model="addOrEditForm.menuType" placeholder="请选择" :style="{width:this.addDialogInputWidth}" size="mini">
                            <el-option
                                    v-for="item in menuTypeOptions"
                                    :key="item.value"
                                    :label="item.content"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否显示：" :label-width="formLabelWidth" prop="isShow">
                        <el-select v-model="addOrEditForm.isShow" placeholder="请选择" :style="{width:this.addDialogInputWidth}" size="mini">
                            <el-option
                                    v-for="item in isShowOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单来源：" :label-width="formLabelWidth" prop="menuOrigin">
                        <el-select v-model="addOrEditForm.menuOrigin" placeholder="请选择" :style="{width:this.addDialogInputWidth}" size="mini">
                            <el-option
                                    v-for="item in menuOriginOptions"
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
                <el-button @click="saveMenuInfo" size="mini" type="success" plain>保 存</el-button>
                <el-button type="primary" @click="confirm" size="mini" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "MenuManage",
        data(){
            return {
                searchListForm:{},
                table_loading:false,
                defaultAddOrEditForm:{ name:'',code:'',url:'',component:'',icon:'',parentMenu:[],isShow:1,menuOrigin:'local'},
                addOrEditForm:{
                    name:'',
                    code:'',
                    url:'',
                    parentMenu:[],
                    isShow:1,
                    menuOrigin:'local'
                },
                addOrEditFormRules:{
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '请输入编码', trigger: 'blur' },
                    ],
                    parentMenu:[
                        { required: true, message: '请选择上级菜单', trigger: 'change' },
                    ],
                    sort:[
                        { required: true, message: '请输入排序', trigger: 'blur' },
                        { type: 'number', message: '排序必须为数字值'}
                    ]
                },
                tableLabel:[
                    {"prop":"name","label":"名称","width":"300","fixed":false},
                    {"prop":"code","label":"编码","width":"150","fixed":false},
                    {"prop":"url","label":"url","width":"320","fixed":false},
                    {"prop":"companyName","label":"所属公司","width":"150","fixed":false},
                    {"prop":"sort","label":"排序","width":"50","fixed":false},
                    {"prop":"isShowT","label":"是否显示","width":"100","fixed":false},
                    {"prop":"menuTypeT","label":"菜单类型","width":"100","fixed":false},
                ],
                tableData:[],
                currentPage:1,
                pageSize:10,
                totalData:0,
                dialogFormVisible:false,
                formLabelWidth:'150px',
                menuOptions:[],
                props: { value:"id",label:"text",checkStrictly: true },
                menuTypeOptions:[],
                isShowOptions:[
                    {"value":1,"label":"是"},
                    {"value":0,"label":"否"}
                ],
                menuOriginOptions:[
                    {"value":'local',"label":"本地服务"},
                    {"value":'remote',"label":"远程服务"}
                ]
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
                _this.table_loading = true

                this.$axios.post("/menu/getAllMenuTreeDetailInfo",null,{"baseURL":'csm-base-member'})
                    .then(function (response) {
                        let data = response.data

                        if(data.flag == 1){
                            _this.tableData = data.result
                            _this.table_loading = false
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //切换数据表格树形展开
            toggleRowExpansion(isExpansion){
                this.toggleRowExpansion_forAll(this.tableData,isExpansion);
            },
            toggleRowExpansion_forAll(data,isExpansion){
                data.forEach(item=>{
                    this.$refs.dataTreeList.toggleRowExpansion(item,isExpansion);
                    if(item.children != undefined && item.children != null){
                        this.toggleRowExpansion_forAll(item.children,isExpansion);
                    }
                })
            },
            // 单条数据修改
            async handleEditRow(row) {
                let _this = this
                _this.table_loading = true
                let curId = row.id

                let promises=[this.getMenuTypeOptionsPost(),this.getMenuOptionsPost()]
                return Promise.all(promises)
                    .then(()=>{
                        //设定默认值
                        let array = []
                        let searchResult = {"flag": false}
                        _this.buildDataForMenuSelected(_this.menuOptions[0], curId, array, searchResult)
                        _this.addOrEditForm = Object.assign({}, row);
                        _this.$set(_this.addOrEditForm, 'parentMenu', array)
                        // _this.$set(_this.addOrEditForm, 'menuOrigin', 'local')

                        //打开弹窗
                        _this.openAddOrEditDialog()
                        _this.table_loading = false
                    })
                    .catch(err=>console.error(err))

            },
            //递归查询树形结构，构造级联面板选中数据
            buildDataForMenuSelected(root,target,array,searchResult){
                if(searchResult.flag){
                    return;
                }
                if(root.id != undefined && root.id == target){
                    this.$set(searchResult,'flag',true)
                    return
                }else {
                    array.push(root.id)
                    let children = root.children
                    if(children!= undefined && children != null){
                        children.forEach(item=>{
                            this.buildDataForMenuSelected(item, target, array,searchResult)
                        })
                        if(!searchResult.flag){
                            array.pop()
                        }
                    }else{
                        array.pop()
                        return;
                    }
                }
            },
            // 设置菜单是否显示
            handleIsShowMenu(row,isShowFlag){
                console.log(row,isShowFlag)
                let _this = this
                let param = {"id":row.id,menuType:row.menuType,"isShow":isShowFlag}
                this.$confirm('确定是否进行设置菜单的显示操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.post("/menu/saveMenuInfo",param,{"baseURL":'csm-base-member'})
                        .then(function (response) {
                            let data = response.data
                            if(data.flag == 1){
                                _this.$message({
                                    type: 'success',
                                    message: '设置成功!'
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
                this.saveMenuInfo()
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
            //查询 上级菜单
            async getMenuOptionsPost() {
                let _this = this
                // if (_this.menuOptions == null || this.menuOptions.length == 0) {
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
                // }
            },
            //查询菜单类型数据字典
            async getMenuTypeOptionsPost() {
                let _this = this
                // if(_this.menuTypeOptions == null || _this.menuTypeOptions.length == 0){
                    let param = {"dictionaryId": "364"}
                    await this.$axios.post("/dictionarydetail/querySysDictionaryDetailInByDictId", param, {"baseURL": 'csm-base-member'})
                        .then(function (response) {
                            let data = response.data
                            if (data.flag == 1) {
                                _this.menuTypeOptions = data.result
                            } else {
                                _this.$message.error(response.data.msg);
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                // }
            },
            // 打开弹窗  --->对弹窗作前置条件处理
             openAddOrEditDialog() {
                //设置宽度 form的宽度 + 'px'
                this.formLabelWidth = this.$store.getters.windowWidth * 0.5 * 0.35 + 'px'
                //弹窗
                this.dialogFormVisible = true

            },
            // 新增 按钮
            async add() {
                let _this = this
                _this.table_loading = true

                let promises=[_this.getMenuTypeOptionsPost(),_this.getMenuOptionsPost()]
                return Promise.all(promises)
                    .then(()=>{

                        let newObj = _this.defaultAddOrEditForm
                        _this.addOrEditForm = Object.assign({},newObj)
                        _this.$set(_this.addOrEditForm, 'name', '')
                        _this.$set(_this.addOrEditForm, 'menuType', _this.menuTypeOptions[0].value)
                        //打开弹窗
                        _this.openAddOrEditDialog()
                        _this.table_loading = false
                    })
                    .catch(err=>console.error(err))
            },
            //弹窗内 --->保存按钮
            saveMenuInfo(){
                this.buildSaveRoleParam()
                let _this = this
                this.$refs.addOrEditForm.validate((valid) => {
                    if (valid) {
                        // 构造参数
                        let param =  _this.buildSaveRoleParam()
                        //处理保存信息请求
                        this.$axios.post("/menu/saveMenuInfo",param,{"baseURL":'csm-base-member'})
                            .then(function (response) {
                                if(response.data.flag == 1){
                                    _this.$message.success("保存成功");
                                    _this.resetForm('addOrEditForm')
                                    let newObj = _this.defaultAddOrEditForm
                                    _this.addOrEditForm = Object.assign({},newObj)
                                    _this.$set(_this.addOrEditForm, 'name', '')
                                    _this.$set(_this.addOrEditForm, 'menuType', _this.menuTypeOptions[0].value)
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

                let param = Object.assign({},this.addOrEditForm)
                this.$set(param,'parentId',this.addOrEditForm.parentMenu[this.addOrEditForm.parentMenu.length-1])
                this.$set(param,'index',this.addOrEditForm.code)
                return param

            },
            // 弹窗内 ->级联面板选中改变时
            handleSelectedChange(){
                //单选，选中任意节点后，关闭下拉框
                this.$refs.menuCascader.toggleDropDownVisible(false)
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
        margin-bottom: 15px;
    }
    .singlePage{
        width: 99.4%;
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
