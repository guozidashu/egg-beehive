<template>
  <div>
    <el-row :gutter="20" style="display: flex">
      <el-col v-for="(item, index) in list" :key="index" style="width: 25%">
        <el-card class="access" shadow="hover" style="border-radius: 5px">
          <template #header>
            <vab-icon icon="line-chart-line" />
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
              <span>{{ item.num }}</span>
            </p>
            <p v-if="item.type == 1">
              较上期
              <span
                v-if="item.oldNum == 0 || item.num - item.oldNum >= 0"
                style="color: #f5222d"
              >
                {{ item.oldNum }} &nbsp;
              </span>
              <span v-else style="color: #39c15b">{{ item.oldNum }}</span>
              <span v-if="item.oldNum == 0 || item.num - item.oldNum >= 0">
                增长：
              </span>
              <span v-else>减少：</span>
              <span v-if="item.oldNum == 0" style="color: #f5222d">100%</span>
              <span v-else-if="item.num == 0" style="color: #39c15b">0%</span>
              <span
                v-else-if="item.num - item.oldNum >= 0"
                style="color: #f5222d"
              >
                {{ item.number }}%
              </span>
              <span v-else style="color: #39c15b">{{ item.number }}%</span>
              <i
                v-if="item.oldNum == 0 || item.num - item.oldNum >= 0"
                style="font-size: 12px; color: #f5222d"
              >
                <vab-icon icon="arrow-drop-up-fill" />
              </i>
              <i v-else style="font-size: 12px; color: #39c15b">
                <vab-icon icon="arrow-drop-down-fill" />
              </i>
            </p>
            <p v-if="item.type == 2">
              动销客户占比&nbsp;
              <span style="color: #f5222d">{{ item.number }}</span>
            </p>
            <p v-if="item.type == 3">
              欠款总金额&nbsp;
              <span style="color: #f5222d">
                ￥ {{ item.money | moneyFormat }}
              </span>
              欠款客户占比 &nbsp;
              <span style="color: #f5222d">{{ item.number }}</span>
            </p>
            <p v-if="item.type == 4">
              回款总金额&nbsp;
              <span style="color: #f5222d">
                ￥{{ item.money | moneyFormat }}
              </span>
              回款客户占比 &nbsp;
              <span style="color: #f5222d">{{ item.number }}</span>
            </p>
            <p>总客户 &nbsp; {{ item.allNum }}</p>
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
