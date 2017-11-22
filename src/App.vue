<template>
  <div id="app">
    <main>
      <!--<img src="./assets/logo.png" alt="Vue.js PWA">!-->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style>
body {
  margin: 0;
  background: #e9e9e9;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 50px;
  padding: 0 16px 0 24px;
  background:#00b9e7;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
