<template>
    <el-row>
        <!-- 折叠按钮 -->
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <div class="collapse-btn" @click="collapseChage">
                <i v-if="!collapse" class="el-icon-s-fold"></i>
                <i v-else class="el-icon-s-unfold"></i>
            </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <div class="logo">后台管理系统</div>
        </el-col>
        <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17">
            <div style="min-height: 36px;"></div>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <!-- 全屏显示 -->
            <div  class="btn-fullscreen" @click="handleFullScreen">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            <!-- 消息中心 -->
            <div class="btn-bell">
                <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                >
                    <router-link to="/tabs">
                        <i class="el-icon-bell"></i>
                        <span class="btn-bell-badge" v-if="message"></span>
                    </router-link>
                </el-tooltip>
            </div>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <!-- 用户头像 -->
            <div class="user-avator" style="float: left">
                <img src="../../assets/img/img.jpg" />
            </div>
            <div style="float: left">
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand" style="float: left" size="mini" >
                        <span class="el-dropdown-link">
                            {{username}}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="" target="_blank">
                         <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div style="float: left;margin-left: 10px">
                <!-- 语言下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand_lang" style="float: left" size="mini">
                        <span class="el-dropdown-link">
                           {{currentLanguage}}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="cn">{{$t('message.cn')}}</el-dropdown-item>
                        <el-dropdown-item divided command="en">{{$t('message.en')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            currentLanguage:'中文',
            collapse: false,
            fullscreen: false,
            name: 'admin',
            message: 2
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },

    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
        },
        // 语言切换下拉菜单选择事件
        handleCommand_lang(command) {
            this.currentLanguage = this.$t('message[\''+command+'\']')
            this.$i18n.locale = command
            this.$notify({
                title: this.$t('message.tip'),
                message: this.$t('message.Switch_language_successfully'),
                position: 'bottom-right'
            });
        },
        // 侧边栏折叠
        collapseChage() {
            // eslint-disable-next-line no-debugger
            debugger
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    color: #ffffff;
    font-size: 20px;
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 60px;
}
div .logo {
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    color: white;
    transform: rotate(45deg);
    margin-left: 8px;
    font-size: 24px;
    width: 0px;
    height: 0px;
    text-align: center;
    border-radius: 15px;
    line-height: 70px;
}
.btn-bell {
    height: 50px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    line-height: 70px;
}
.btn-bell-badge {
    position: absolute;
    top: 18px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;

}
.btn-bell .el-icon-bell {
    font-size: 25px;
    color: #fff;
}
.user-name {
    margin-top: 20px;
}
.user-avator {
    width: 45px;
    margin-top: 10px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
