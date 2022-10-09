<template>
  <div class="link-container">
    <span>我来啦!</span>
    <!-- <p>{{ drawer }}</p> -->
  </div>
</template>

<script>
  export default {
    name: 'ComponentsDrawer',
    props: {
      drawer: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
    created() {},
    methods: {},
  }
</script>
<style lang="scss" scoped></style>
