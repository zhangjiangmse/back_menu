<template>
    <div>
        <button @click="send">发消息</button>
        <p>消息：</p>
        <small>{{msg}}</small>
    </div>
</template>

<script>
    export default {
        name: "chatting",
        data(){
            return {
                path:"ws://203.86.7.110:8680/olcs/server_websocket/727f179a4d606b93b1bfb1e1338fb48d/1",
                socket:"",
                msg:'',
            }
        },
        created(){
            // 初始化
            this.init()
        },
        methods : {
            init: function () {
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path)
                    // 监听socket连接
                    this.socket.onopen = this.open
                    // 监听socket错误信息
                    this.socket.onerror = this.error
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage
                }
            },
            open: function () {
                console.log("socket连接成功")
            },
            error: function () {
                console.log("连接错误")
            },
            getMessage: function (msg) {
                this.msg = msg.data
                console.log(msg.data)
            },
            send: function () {
                let params = "aaaaa"
                this.socket.send(params)
            },
            close: function () {
                console.log("socket已经关闭")
            }
        },
        destroyed () {
            // 销毁监听
            this.socket.onclose = this.close
        }
    }
</script>

<style scoped>

</style>