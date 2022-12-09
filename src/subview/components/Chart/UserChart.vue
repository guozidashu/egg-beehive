<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      购买用户统计
    </template>
    <QYBranch :list="branchList" :style-chart="styleObj" />
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        styleObj: {
          width: '400px',
          height: '250px',
          legendx: 0,
          legendy: 200,
          center: ['50%', '40%'],
        },
        branchList: [
          { value: 1048, name: '未消费客户' },
          { value: 735, name: '消费一次客户' },
          { value: 580, name: '消费10次客户' },
          { value: 484, name: '消费20次客户' },
        ],
      }
    },
    beforeDestroy() {},
    mounted() {},
  }
</script>
<style lang="scss" scoped></style>
