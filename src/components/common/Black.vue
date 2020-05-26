<template>
    <div>

    </div>
</template>
<script>
    export default {
        name:'Black',
        beforeRouteLeave  (to, from, next) {
            next()
            //路由进入之前，获取数据
            next(to.path)
        },
        methods:{

        }
    }


</script>