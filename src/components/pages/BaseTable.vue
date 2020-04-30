<template>
    <div>
        <el-row  style="margin-bottom: 10px">
            <el-col :xs="10" :sm="4" :md="4" :lg="3" :xl="3" class="el_row_condition">
                <el-input v-model="nameValue" placeholder="请输入姓名"  size="mini"></el-input>
            </el-col>
            <el-col :xs="11" :sm="4" :md="4" :lg="3" :xl="3" class="el_row_condition">
                <el-select v-model="sexValue" placeholder="请选择性别" size="mini">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="18" :xl="18">
                <el-button type="primary" size="mini" icon="el-icon-search" @click="queryAll" >搜索</el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="add" >新增</el-button>
                <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteAll" >删除</el-button>
                <el-button type="primary" size="mini" icon="el-icon-download" @click="exportExcel" >导出</el-button>
                <el-button type="primary" size="mini" icon="el-icon-refresh" @click="cur_reload" >刷新</el-button>
            </el-col>
        </el-row>
        <el-row class="el_row_table">
            <el-table :data="tableData" border style="width: 100%;" size="mini"
                      :default-sort="{prop:'date',order:'descending'}"
                      :max-height="maxTableHeight" :height="tableHeight" @selection-change="handleSelectionChange"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"

            >
                <el-table-column
                        type="selection" fixed
                        width="40">
                </el-table-column>
                <el-table-column fixed
                        type="index"
                        width="40">
                </el-table-column>
                <template v-for="item in tableLabel">
                    <el-table-column :key ="item.prop"  :fixed="item.fixed" align="center"
                            :prop="item.prop"
                            :label="item.label"
                            >
                    </el-table-column>
                </template>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDeleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
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
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="姓名：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" style="width: 350px" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="性别：" :label-width="formLabelWidth">
                    <el-radio v-model="form.sex" label="男">男</el-radio>
                    <el-radio v-model="form.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="地市：" :label-width="formLabelWidth">
                    <el-cascader size="mini" style="width: 350px"
                                 v-model="form.pca"
                                 :options="pcaOptions"
                                 :props="{ expandTrigger: 'hover',value:'code',label:'name'}"
                                 @change="handleChange"/>
                </el-form-item>
                <el-form-item label="地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off" style="width: 350px" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button @click="saveInfo" size="mini">保 存</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    import pcaJson from '@/assets/json/pca-code'

    export default {
        name:'BaseTable',
        inject: ['reload'],
        data() {
            return {
                TabName:'基础表格',
                nameValue: '',
                sexValue:'',
                currentPage:1,
                pageSize:10,
                totalData:'',
                maxTableHeight:'',
                tableHeight:'',
                multipleSelection:'',
                dialogFormVisible:false,
                formLabelWidth:"300",
                form:{},
                pcaOptions:[],
                options:[
                    {
                        value: '男',
                        label: '男'
                    }, {
                        value: '女',
                        label: '女'
                    }
                ],
                tableLabel:[
                    {"prop":"date","label":"日期","width":"200","fixed":"left"},
                    {"prop":"name","label":"姓名","width":"200","fixed":false},
                    {"prop":"sex","label":"性别","width":"200","fixed":false},
                    {"prop":"province","label":"省份","width":"200","fixed":false},
                    {"prop":"city","label":"地市","width":"200","fixed":false},
                    {"prop":"address","label":"地址","width":"200","fixed":false},
                    {"prop":"zip","label":"邮编","width":"120","fixed":false},
                    ],
                tableData:[],
                remote_tableData: [
                    {
                    date: '2016-05-02',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    sex:'女',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    sex:'男',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }]

            };
        },
        created(){
            this.initTableAttr();
            this.queryAll();
        },
        methods:{
            initTableAttr(){
                let init_maxTableHeight = this.$store.getters.tabPanelHeight
                this.maxTableHeight = init_maxTableHeight
                //设定Table的高度
                this.tableHeight = init_maxTableHeight * 0.85
            },
            cur_reload(){
                let title = this.TabName
                this.reload(title)
            },
            // 多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDeleteRow(row){
                this.multipleSelection = row
                let selected = row.date
                this.deleteData(selected)
            },
            //查询按钮事件
            queryAll(){
                this.currentPage = 1
                this.queryData();
            },
            queryData(){
                let _this = this
                //条件筛选
                if(_this.nameValue != ''){
                    _this.tableData = this.remote_tableData.filter(item=>{
                        return item.name == _this.nameValue
                    })
                }else if( _this.sexValue != ''){
                    _this.tableData = this.remote_tableData.filter(item=>{
                        return  item.sex == _this.sexValue
                    })
                }else if((_this.nameValue != '') && _this.sexValue != ''){
                    _this.tableData = this.remote_tableData.filter(item=>{
                        return item.name == _this.nameValue && item.sex == _this.sexValue
                    })
                }else {
                    _this.tableData = this.remote_tableData
                }
                _this.totalData = _this.tableData.length
                //分页数据
                let startIndex = (_this.currentPage-1) * _this.pageSize;
                let endIndex = startIndex + _this.pageSize;

                _this.tableData =  _this.tableData.slice(startIndex,endIndex)

            },
            add(){
                //this.form = []
                //弹窗
                this.dialogFormVisible = true

                //级联面板 获取 省市县 联动数据
                this.pcaOptions = pcaJson;
            },
            deleteAll(){

                let selected = []
                this.multipleSelection.forEach(item=>{
                    selected.push(item.date)
                })
                this.deleteData(selected)

            },
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
            exportExcel(){

            },
            // 弹窗内——>省市县级联面板 切换
            handleChange(value) {
                console.log(value);
            },
            // 弹窗内 -> 确定按钮,保存完毕， 关闭窗口
            confirm(){
                this.saveInfo()
                //关闭窗口
                this.dialogFormVisible = false
            },
            // 弹窗内 -> 保存按钮，保存完毕，不关闭窗口
            saveInfo(){
                let _this = this

                let pca =  this.form.pca
                //获取省份信息
                let arr = _this.pcaOptions.filter((item)=>{
                    if(item.code == pca[0]){
                        return item
                    }
                })
                let provicenObj = arr[0]
                // 获取地市信息
                arr = provicenObj.children.filter((item)=>{
                    if(item.code == pca[1]){
                        return item
                    }
                })
                let cityObj = arr[0]
                // 获取区域信息
                arr = cityObj.children.filter((item)=>{
                    if(item.code == pca[2]){
                        return item
                    }
                })
                let areaObj = arr[0]
                console.log(provicenObj.name ,cityObj.name,areaObj.name)
                // 构造新的对象
                let newObj = {"name":_this.form.name,"sex":_this.form.sex,"province":provicenObj.name,"city":cityObj.name,"address":_this.form.address}

                this.remote_tableData.push(newObj)
                this.$notify({
                    title: this.$t('message.tip'),
                    message: this.$t('message.save_success'),
                    position: 'bottom-right'
                });

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
<style>
    .el-form-item {
        margin-bottom: 0px;
    }
    .el_row_table {
        margin: 0 3px;
    }
    .el_row_condition div{
        margin:0 3px;
    }

</style>