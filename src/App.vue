<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  // 钩子函数
  mounted () {
    //保存屏幕宽度
    this.$store.commit('saveWindowWidth',document.body.clientWidth)
  }
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:0px;
}
body {
  display: block;
  margin: 0px;
}
html,body,#app{
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
</style>
