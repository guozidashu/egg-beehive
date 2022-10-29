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
