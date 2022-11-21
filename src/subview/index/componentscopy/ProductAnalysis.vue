<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      渠道分析
    </template>
    <Branch :list="branchList" :style-chart="styleObj" />
  </el-card>
</template>

<script>
  import Branch from '@/subview/components/Branch'
  export default {
    components: { Branch },
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        styleObj: {
          width: '100%',
          height: '300px',
          legendx: 60,
          legendy: 20,
          center: ['50%', '60%'],
        },
        branchList: this.list,
      }
    },
    watch: {
      list: {
        handler: function (newval) {
          this.branchList = newval
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {},
  }
</script>
<style lang="scss" scoped></style>
