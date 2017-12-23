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
  background: #f8f9fa;
}

#app {
  font-family: 'Prompt', sans-serif;
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
  background:#ffffff;
  color: #003a8c;
  width: 366px;
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
@import url('https://fonts.googleapis.com/css?family=Prompt');
</style>
