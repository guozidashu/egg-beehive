<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      发货预警
    </template>
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <div>发货进度</div>
        <Branch :list="branchList" :style-chart="styleObj" />
      </el-col>
      <el-col
        :lg="12"
        :md="24"
        :sm="24"
        style="border-left: 1px solid #dcdfe6"
        :xl="12"
        :xs="24"
      >
        <div style="padding-left: 10px">全部未发货订单</div>
        <el-timeline style="height: 528px; padding-top: 10px; overflow: scroll">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="activity.color"
            :icon="activity.icon"
            :size="activity.size"
            :type="activity.type"
          >
            <p>
              {{ activity.content }}
              <span
                style="
                  margin-left: 30px;
                  font-size: 16px;
                  font-weight: 600;
                  color: black;
                "
              >
                {{ activity.content1 }}单
              </span>
            </p>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import Branch from '@/subview/components/Branch'
  export default {
    components: { Branch },
    data() {
      return {
        styleObj: {
          width: '400px',
          height: '300px',
          legendx: 0,
          legendy: 50,
          center: ['42%', '65%'],
        },
        branchList: [
          { value: 1048, name: '今日发货订单数' },
          { value: 735, name: '昨日发货订单数' },
          { value: 580, name: '未发货订单数' },
        ],
        activities: [
          {
            content: '开单后 > 12h',
            content1: '6499',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
          },
          {
            content: '开单后 > 24h',
            content1: '322',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
          },
          {
            content: '付款后 > 12h',
            content1: '2344',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
          },
          {
            content: '付款后 > 24h',
            content1: '623',
            size: 'large',
          },
        ],
      }
    },
    methods: {},
  }
</script>
<style lang="scss" scoped></style>
