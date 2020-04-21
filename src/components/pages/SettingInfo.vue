<template>
    <el-row>
        设置页面
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-divider></el-divider>
        <el-select v-model="optionValue_city" placeholder="请选择地级市" @change="getCountyOptions" size="mini">
            <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="optionValue_county" placeholder="请选择县级市" size="mini">
            <el-option
                    v-for="item in countyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </el-row>
</template>
<script>
    export default {
        data(){
            return{
                input:'',
                optionValue_city:'',
                optionValue_county:'',
                cityOptions:[],
                countyOptions:[],
            };
        },
        created(){
            this.myInitData();
        },
        methods : {
            myInitData(){

            },

        }
    }
</script>