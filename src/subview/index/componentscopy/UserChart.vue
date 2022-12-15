<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      用户回购概括
    </template>
    <QYBranch :list="branchList" :style-chart="styleObj" />
  </el-card>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        styleObj: {
          width: '100%',
          height: '250px',
          legendx: 100,
          legendy: 200,
          center: ['50%', '40%'],
        },
        branchList: this.data,
      }
    },
    beforeDestroy() {},
    mounted() {},
  }
</script>
<style lang="scss" scoped></style>
