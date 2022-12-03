<template>
  <div id="app">
    <KeFu />
    <router-view />
  </div>
</template>
<script>
  import KeFu from './subview/components/KeFu'
  export default {
    name: 'App',
    components: {
      KeFu,
    },
  }
</script>
<style lang="scss">
  @import './assets/font/index.scss';
  #app {
    font-family: 'whzzlsf' !important;
  }
</style>
