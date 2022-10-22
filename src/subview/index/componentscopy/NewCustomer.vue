<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      最近加入顾客
    </template>
    <el-timeline
      class="warp"
      style="height: 170px; padding-top: 10px; overflow: scroll"
    >
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :color="activity.color"
        :icon="activity.icon"
        :size="activity.size"
        :timestamp="activity.timestamp"
        :type="activity.type"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        activities: [
          {
            content: '张三',
            timestamp: '59分钟前加入我司',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
          },
          {
            content: '李四',
            timestamp: '一小时前加入我司',
            color: '#0bbd87',
          },
          {
            content: '王五',
            timestamp: '两小时前加入我司',
            size: 'large',
          },
          {
            content: '马六',
            timestamp: '两小时前加入我司',
          },
        ],
      }
    },
    beforeDestroy() {},
    mounted() {},
  }
</script>
<style lang="scss" scoped>
  .warp::-webkit-scrollbar {
    display: none;
  }
</style>
