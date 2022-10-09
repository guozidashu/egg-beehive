<template>
  <div class="link-container">
    <el-drawer title="我是标题" :visible="drawer" :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
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
