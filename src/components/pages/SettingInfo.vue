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
        name:'SettingInfo',
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
                this.getCityOptions()
            },
            getCityOptions(){
                let _this = this
                this.$axios.post('/area/getAreaOptionsForSDProvince', null)
                    .then(function (response) {
                        _this.cityOptions = response.data.result
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            /**
             * 根据地级市code，级联查询县级市
             */
            getCountyOptions(){

                let _this = this
                _this.optionValue_county = ''
                let param = {"parentCode":_this.optionValue_city};
                this.$axios.post('/area/getAreaOptionsByParentCode', param)
                    .then(function (response) {
                        _this.countyOptions = response.data.result
                    }).catch(function (error) {
                    console.log(error);
                });
            },

        }
    }
</script>