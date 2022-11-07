<template>
  <div>
    <el-row :gutter="20" style="display: flex">
      <el-col v-for="(item, index) in list" :key="index" style="width: 20%">
        <el-card class="access" shadow="hover">
          <template #header>
            <vab-icon icon="line-chart-line" />
            {{ item.title }}
            <el-tag
              v-if="item.type === 1"
              class="card-header-tag"
              style="float: right"
              type="danger"
            >
              今日
            </el-tag>
            <el-tag
              v-else
              class="card-header-tag"
              style="float: right"
              type="success"
            >
              今日
            </el-tag>
          </template>
          <div>
            <p
              style="
                font-size: 30px;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.85);
              "
            >
              {{ item.num }}
            </p>
            <p>
              较昨日
              <span v-if="item.type === 1" style="color: #f5222d">
                {{ item.pay }}
              </span>
              <span v-else style="color: #39c15b">{{ item.pay }}</span>
              <span v-if="item.type === 1">环比增长：</span>
              <span v-else>环比减少：</span>
              <i v-if="item.type === 1" style="font-size: 12px; color: #f5222d">
                {{ item.number }}%
                <vab-icon icon="arrow-drop-up-fill" />
              </i>
              <i v-else style="font-size: 12px; color: #39c15b">
                {{ item.number }}%
                <vab-icon icon="arrow-drop-down-fill" />
              </i>
            </p>
          </div>
          <div class="bottom">
            <span>
              本月销售额
              <el-tag
                v-if="item.type === 1"
                class="card-footer-tag"
                style="float: right"
                type="danger"
              >
                {{ item.money }}
              </el-tag>
              <el-tag
                v-else
                class="card-footer-tag"
                style="float: right"
                type="success"
              >
                {{ item.money }}
              </el-tag>
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
