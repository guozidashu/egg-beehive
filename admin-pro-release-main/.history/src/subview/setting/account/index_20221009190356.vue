<template>
  <div style="background-color: #f6f8f9">
    <el-card
      :body-style="{ padding: '15px 0 0 15px' }"
      class="card-ra"
      shadow="never"
    >
      <div slot="header">
        <span>授权信息</span>
      </div>
      <div style="display: flex; flex-wrap: wrap">
        <div v-for="o in 11" :key="o" style="width: 25%; padding-bottom: 15px">
          商城名称：商城系统
        </div>
      </div>
    </el-card>
    <div style="display: flex; justify-content: space-between">
      <el-card
        class="card-ra"
        shadow="never"
        style="width: 74%; margin-right: 20px"
      >
        <div slot="header">
          <span>通知信息</span>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="activity.color"
            :icon="activity.icon"
            :size="activity.size"
            :timestamp="activity.timestamp"
            :type="activity.type"
          >
            <p>{{ activity.content }}</p>
            <p>{{ activity.content1 }}</p>
          </el-timeline-item>
        </el-timeline>
      </el-card>
      <el-card
        class="card-ra"
        shadow="never"
        style="width: 26%; min-height: calc(56vh)"
      >
        <div slot="header">
          <span>客服信息</span>
        </div>
        <el-card
          v-for="o in 3"
          :key="o"
          :body-style="{ padding: '10px' }"
          shadow="hover"
          style="border-radius: 6px"
        >
          <div style="display: flex">
            <img class="customer-img" :src="avatar" />
            <div>
              <p>楚芝馨（售后）</p>
              <p>
                Tel：15236804776 微信
                <el-popover placement="top" trigger="click" width="100">
                  <img :src="avatar" style="margin: 10px" />
                  <el-button slot="reference" plain style="margin-left: 10px">
                    点击查看
                  </el-button>
                </el-popover>
              </p>
            </div>
          </div>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Account',
    data() {
      return {
        activities: [
          {
            content: '创建信息文本',
            content1: '更新信息文本',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
          },
          {
            content: '创建信息文本',
            content1: '更新信息文本',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
          },
          {
            content: '创建信息文本',
            content1: '更新信息文本',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
          },
          {
            content: '创建信息文本',
            content1: '更新信息文本',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87',
          },
          {
            content: '创建信息文本',
            content1: '更新信息文本',
            timestamp: '2018-04-03 20:46',
            size: 'large',
          },
          {
            content: '创建信息文本',
            content1: '更新信息文本',
            timestamp: '2018-04-03 20:46',
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .customer-img {
    width: 50px;
    height: 50px;
    margin-top: 12px;
    margin-right: 22px;
    margin-left: 12px;
    border-radius: 6px;
  }
  .card-ra {
    border-radius: 6px;
  }
  .card-ra ::v-deep .el-card__header {
    color: $base-color-blue;
    background-color: #e8f4ff;
  }
</style>
