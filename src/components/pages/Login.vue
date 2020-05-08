<template>
    <div class="login-wrap">
        <el-row align="middle">
            <el-col :xs="2" :sm="6" :md="7" :lg="9" :xl="8">
                <div style="height: 36px"></div>
            </el-col>
            <el-col :xs="20" :sm="12" :md="10" :lg="6" :xl="8" :style="{'margin-top':height}">
                <div class="ms-login">
                    <el-row>
                        <div class="ms-title">后台管理系统</div>
                    </el-row>
                    <el-row style="margin-top: 20px">
                        <el-col :xs="1" :sm="2" :md="2" :lg="1" :xl="1">
                            <div style="height: 36px"></div>
                        </el-col>
                        <el-col :xs="22" :sm="20" :md="20" :lg="22" :xl="22">
                            <el-form ref="login" :model="form" :rules="rules">
                                <el-form-item prop="name">
                                    <el-input v-model="form.name" placeholder="请输入用户名">
                                        <el-button slot="prepend" icon="el-icon-user"></el-button>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="pwd">
                                    <el-input
                                            type="password"
                                            placeholder="请输入密码"
                                            v-model="form.pwd"
                                            @keyup.enter.native="submitForm()"
                                    >
                                        <el-button slot="prepend" icon="el-icon-unlock"></el-button>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="companyid">
                                    <el-select  v-model="form.companyid" placeholder="           请选择公司" style="width: 100%;">
                                        <el-button slot="prefix"  icon="el-icon-office-building" style="background-color: #F5F7FA;border-bottom-right-radius: 0;border-top-right-radius: 0"></el-button>
                                        <el-option
                                                v-for="item in companyOptions"
                                                :key="item.id"
                                                :label="'           ' +item.name"
                                                :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <div class="login-btn">
                                        <el-button type="primary" @click="submitForm()">登录</el-button>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :xs="1" :sm="2" :md="2" :lg="1" :xl="1">
                            <div style="height: 36px"></div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :xs="2" :sm="6" :md="7" :lg="9" :xl="8">
                <div style="height: 36px"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name:"Login",
        data(){
            return {
                form:{
                    'name':'',
                    'pwd':'',
                    'companyid':''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    pwd:[
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    companyid:[
                        { required: true, message: '请选择公司', trigger: 'change' }
                    ]
                },
                height:'',
                companyOptions:[
                    {id:1,name:'CSM'},
                    {id:2,name:'ABC'},
                ],

            }
        },
        created(){
            //初始化响应式布局
            this.myInitStyle()
            //初始化公司列表
            this.myInitCompanyList();
        },
        methods:{
            myInitStyle(){
                let height = window.innerHeight
                if(height <= 650){
                    this.height = height * 0.25+ 'px'
                } else if(height>650 && height <= 812){
                    this.height = height * 0.32+ 'px'
                }else if(height>812 && height < 1300){
                    this.height = height * 0.34+ 'px'
                }else if(height >= 1300){
                    this.height = height * 0.38+ 'px'
                }
            },
            // 初始化公司列表
            myInitCompanyList(){
                let _this = this
                this.$axios.post("/company/queryCompanyListForSelect",null,{"baseURL":'csm-base'})
                    .then(function (response) {
                        if(response.data.flag == 1){
                            _this.companyOptions = response.data.result
                        }else{
                            _this.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            submitForm() {
                let _this = this
                this.$refs.login.validate((valid) => {
                    if (valid) {
                        //处理登陆请求
                        let param = _this.form
                        this.$axios.post("/login",param,{"baseURL":'csm-auth'})
                            .then(function (response) {
                                if(response.data.flag == 1){
                                    _this.$message.success("登陆成功");
                                    localStorage.setItem('ms_username', _this.form.name);
                                    localStorage.setItem('token', response.data.result);
                                    _this.$router.push('/home');
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

        }
    }
</script>
<style>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-repeat: repeat-y;
        background-size: cover;  /*等比扩展图片来填满元素*/
    }
    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color:#333333;
        background-color: #6CCBFF;
        border-bottom: 1px solid #ddd;
        opacity: 0.7;
    }
    .ms-login {
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .ms-content {
        padding: 30px 30px;
    }
    .login-btn {
        margin-top: 20px;
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
    .el-input__prefix {
        left: 0px;
        transition: all .3s;
    }
</style>