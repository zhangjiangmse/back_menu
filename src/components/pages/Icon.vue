<template>
    <div style="overflow:auto">
        <el-row>
            <h2>附：官方图标 <el-link type="primary " href="https://element.eleme.cn/#/zh-CN/component/icon" target="_blank">https://element.eleme.cn/#/zh-CN/component/icon</el-link></h2>
            <p>使用方法 直接通过设置类名为 el-icon-iconName 来使用即可。例如：</p>
            <p class="example-p">
                <i class="el-icon-edit" style="font-size: 30px"></i>
                <span>&lt;i class=&quot;el-icon-<span style="color: #ff5900">edit</span>&quot;&gt;&lt;/i&gt;</span>
            </p>
            <p class="example-p">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <span>&lt;i class=&quot;el-icon-<span style="color: #ff5900">search</span>&quot;&gt;&lt;/i&gt;</span>
            </p>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <h2>自定义图标使用方法</h2>
            <p style="line-height: 50px;">
                直接通过设置类名为iconfont icon-redpacket_fill 来使用即可。例如：（共{{iconList.length}}个图标）
            </p>
            <p class="example-p">
                <i class="iconfont icon-redpacket_fill" style="font-size: 30px;color: #ff5900"></i>
                <span>&lt;i class=&quot;iconfont icon-<span style="color: #ff5900">redpacket_fill</span>&quot;&gt;&lt;/i&gt;</span>
            </p>
        </el-row>
        <el-row>
            <h2>图标</h2>
            <div class="search-box">
                <el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称" prefix-icon="el-icon-search">
                </el-input>
            </div>
            <ul>
                <li class="icon-li" v-for="(item,index) in list" :key="index">
                    <div class="icon-li-content">
                        <i :class=" `iconfont icon-${item}`"></i>
                        <span>{{item}}</span>
                    </div>
                </li>
            </ul>
        </el-row>

    </div>
</template>
<script>
    export default {
        name:'Icon',
        inject: ['reload'],
        data(){
            return {
                keyword:'',
                iconList:[
                    'smell',
                    'redpacket_fill',
                    'baidu',
                    'music',
                    'word',
                    'word1',
                    'excel',
                    'excel1',
                    'excel1-copy'

                ],
            }
        },
        computed :{
            list(){
                return this.iconList.filter((item) => {
                    return item.indexOf(this.keyword) !== -1;
                })
            }
        }
    }
</script>
<style>
    .example-p{
        height: 45px;
        display: flex;
        align-items: center;
    }
    .search-box{
        text-align: center;
        margin-top: 10px;
    }
    .search{
        width: 300px;
    }
    ul,li{
        list-style: none;
    }
    .icon-li{
        display: inline-block;
        padding: 10px;
        width: 120px;
        height: 120px;
    }
    .icon-li-content{
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .icon-li-content i{
        font-size: 36px;

    }
    .icon-li-content span{
        margin-top: 10px;

    }
</style>