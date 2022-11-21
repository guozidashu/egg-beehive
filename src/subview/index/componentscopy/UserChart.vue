<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      购买用户统计
    </template>
    <Branch :list="branchList" :style-chart="styleObj" />
  </el-card>
</template>

<script>
  import Branch from '@/subview/components/Branch'
  export default {
    components: { Branch },
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        styleObj: {
          width: '400px',
          height: '250px',
          legendx: 0,
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
