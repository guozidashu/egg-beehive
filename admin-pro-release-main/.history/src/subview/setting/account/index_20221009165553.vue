<template>
  <div style="background-color: #f6f8f9">
    <el-card class="card-ra" shadow="never">
      <div slot="header">
        <span>授权信息</span>
      </div>
      <div class="account-warp">
        <div class="account-item">商城名称：商城系统</div>
        <div class="account-item">联系人: 演示（没有关联ERP)</div>
        <div class="account-item">联系人: 15236804776</div>
        <div class="account-item">授权到期日: 2023-03-15 14:06:06</div>
        <div class="account-item">研发模块: 未开通</div>
        <div class="account-item">ERP模块: 未开通</div>
        <div class="account-item">跟单模块：未开通</div>
      </div>
    </el-card>
    <div style="display: flex; justify-content: space-between">
      <el-card
        class="card-ra"
        shadow="never"
        style="width: 80%; margin-right: 20px"
      >
        <div slot="header">
          <span>通知信息11</span>
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
      <el-card class="card-ra" shadow="never" style="width: 20%">
        <div slot="header">
          <span>客服信息</span>
        </div>
        <div class="customer-warp">
          <el-avatar class="customer-img" :size="50" :src="avatar" />
          <div>
            <p>楚芝馨</p>
            <p>15236804776</p>
          </div>
        </div>
        <div class="customer-warp">
          <el-avatar class="customer-img" :size="50" :src="avatar" />
          <div>
            <p>楚芝馨</p>
            <p>15236804776</p>
          </div>
        </div>
        <div class="customer-warp">
          <el-avatar class="customer-img" :size="50" :src="avatar" />
          <div>
            <p>楚芝馨</p>
            <p>15236804776</p>
          </div>
        </div>
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
  .card-ra {
    border-radius: 20px;
    .account-warp {
      display: flex;
      flex-wrap: wrap;
      .account-item {
        width: 33%;
        padding-top: 10px;
      }
    }
    .customer-warp {
      display: flex;
      .customer-img {
        margin-top: 10px;
        margin-right: 10px;
      }
    }
  }
  .card-ra ::v-deep .el-card__header {
    background-color: #e8f4ff;
  }
</style>
