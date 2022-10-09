<template>
  <div>
    <div class="headed">
      <slot name="Head"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ComponentsDrawer',
    data() {
      return {}
    },
    created() {},
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .headed {
    padding: 30px 35px 25px;
  }
</style>
