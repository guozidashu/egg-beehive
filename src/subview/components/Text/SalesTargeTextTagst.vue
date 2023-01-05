<template>
  <div>
    <el-col
      v-for="(item, index) in list"
      :key="index"
      :lg="6"
      :md="12"
      :sm="24"
      :xl="6"
      :xs="24"
    >
      <el-card class="access" shadow="hover">
        <template #header>
          <vab-icon icon="line-chart-line" style="color: red" />
          {{ item.title }}
        </template>
        <div>
          <p
            style="
              font-size: 30px;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.85);
            "
          >
            <span v-if="item.numType == 1">￥{{ item.num | moneyFormat }}</span>
            <span v-else>{{ item.num }}</span>
          </p>
          <p>
            本月
            <span v-if="item.type === 1" style="color: #f5222d">
              {{ item.pay }}
            </span>
            <span v-else style="color: #39c15b">{{ item.pay }}</span>
            <span v-if="item.type === 1">
              较上月
              <span style="color: #f5222d">{{ item.pay }}</span>
              增长：
            </span>
            <span v-else>较上月减少：</span>
            <i v-if="item.type === 1" style="font-size: 12px; color: #f5222d">
              {{ item.number }}%
              <vab-icon icon="arrow-drop-up-fill" />
            </i>
            <i v-else style="font-size: 12px; color: #39c15b">
              {{ item.number }}%
              <vab-icon icon="arrow-drop-down-fill" />
            </i>
          </p>
          <div style="font-size: 14px; color: black">
            {{ item.dayName }} &nbsp;
            <span v-if="item.numType == 1">
              ￥{{ item.dayNum | moneyFormat }}
            </span>
            <span v-else>{{ item.dayNum }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },
    beforeDestroy() {},
    mounted() {},
  }
</script>
