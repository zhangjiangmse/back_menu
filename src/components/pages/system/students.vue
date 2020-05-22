<template>
    <div class="border">
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple text" >是否可网络约车</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">学员是否报名即上传交通局</div></el-col>
            <el-col :span="15"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否 (如报名未上传,可在学员信息审核内设置学员信息上传,操作:先勾选信息上传,再勾选学员审核)</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">姓名:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"></div><template>
                <el-input v-model="input" placeholder="请输入姓名" autosize clearable size="mini"  show-word-limit class="shewidth_name"></el-input>
                <el-button type="info" size="mini" class="button">读身份证信息</el-button>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">身份证号:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入身份证号" autosize clearable size="mini" maxlength="18" minlength="18" show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">拍摄登记照:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-button type="info" size="mini" class="button">拍摄登记照</el-button></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">上传登记照:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-button type="info" size="mini" class="button">选择文件</el-button> 未选择任何文件</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">学员性别:</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">身份证地址:</div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入身份证地址" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">联系地址:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入联系地址" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input>(联系地址可通过系统超级管理员账号在驾校进行设置)</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">手机号:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入手机号" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">备用号码:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入备用号码" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">登记地址行政区:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
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
            </el-select>
                <el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">邮政编码:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入邮政编码" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">居住证号:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入居住证号" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">居住证地址(邮寄地址):</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input>外地学员填写此项,申请表需要此信息</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">联系地址行政区:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
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
            </el-select>
                <el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">初次驾照</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">初</el-radio>
                <el-radio v-model="radio" label="2">增</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">已有证件:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">档案编号:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input>(驾照-学员申请表档案表号)</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">已有证件初次领证时间:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input>请确保领证的准确性</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">所学车型:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">分点:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">实收款:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input>学员可通过系统拆机管理员账号进行设置</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">优惠:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">付费方式:</div></el-col>
            <el-col :span="15"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">现金</el-radio>
                <el-radio v-model="radio" label="2">刷卡</el-radio>
                <el-radio v-model="radio" label="2">网上支付</el-radio>
                <el-radio v-model="radio" label="2">支付宝</el-radio>
                <el-radio v-model="radio" label="2">微信</el-radio>
                <el-radio v-model="radio" label="2">商户</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">场地费(体检缴费):</div></el-col>
            <el-col :span="15"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">未交</el-radio>
                <el-radio v-model="radio" label="2">已交</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">考试费缴费:</div></el-col>
            <el-col :span="15"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">未交</el-radio>
                <el-radio v-model="radio" label="2">已交</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">发票号:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">收据号:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">报名时间:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" suffix-icon="el-icon-date" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">报名来源(介绍人):</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">保险种类:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-select   v-model="value" placeholder="请选择" size="mini" class="shewidth_stu">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select> 险种在驾校基本设置_保险险种管理内自主添加
            </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">保险金额:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light">¥<el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">保险年限:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input>年</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">入保时间:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" suffix-icon="el-icon-date" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_stu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">学员类型:</div></el-col>
            <el-col :span="15"><div class="grid-content bg-purple-light"></div><template>
                <el-radio v-model="radio" label="1">校外</el-radio>
                <el-radio v-model="radio" label="2">学生</el-radio>
                <el-radio v-model="radio" label="2">老师</el-radio>
            </template></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">备注:</div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="" autosize clearable size="mini"  show-word-limit class="shewidth_beizhu"></el-input></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><el-button type="success">提交</el-button></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "students",
        data(){
            return{
                radio:'1'
            }
        }
    }
</script>

<style scoped>
.el-row {
    padding: 10px;
}
    .border {
        /*text-align:center;*/
        border: 1px solid black;
        font-size: 12px;
        height: 2000px;
    }
    .input_w {
        width: 200px;
        height: 10px;
    }
    .button {
        margin-left: 5px;
    }
    .shewidth_stu {
        width:240px ;
    }
    .shewidth_name {
        width: 120px;
    }
    .shewidth_stu {
        width: 120px;
    }
    .shewidth_beizhu{
        width: 200px;
    }
    .text {
        /*text-align: right;*/
    }
</style>