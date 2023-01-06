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
            <span v-if="item.numType == 1">
              ￥{{ item.today | moneyFormat }}
            </span>
            <span v-else>{{ item.today }}</span>
          </p>
          <p style="font-size: 12px">
            今日
            <span v-if="item.numType == 1">
              ￥{{ item.today | moneyFormat }}
            </span>
            <span v-else>{{ item.today }}</span>
            较昨日
            <span v-if="item.numType == 1">
              ￥{{ item.yesterday_total | moneyFormat }}
            </span>
            <span v-else>{{ item.yesterday_total }}</span>

            <span
              v-if="
                item.today - item.yesterday_total >= 0 ||
                item.today == 0 ||
                item.yesterday_total == 0
              "
            >
              增长
            </span>
            <span v-else>减少</span>
            &nbsp;
            <span v-if="item.today == 0" style="color: red">
              0%
              <vab-icon icon="arrow-drop-up-fill" />
            </span>
            <span v-else-if="item.yesterday_total == 0" style="color: red">
              100%
              <vab-icon icon="arrow-drop-up-fill" />
            </span>
            <span v-else>
              <span
                v-if="item.today - item.yesterday_total >= 0"
                style="color: red"
              >
                {{
                  (((item.today - item.yesterday_total) /
                    item.yesterday_total) *
                    100)
                    | moneyFormat
                }}%
                <vab-icon icon="arrow-drop-up-fill" />
              </span>
              <span v-else style="color: green">
                -{{
                  (((item.today - item.yesterday_total) /
                    item.yesterday_total) *
                    100)
                    | moneyFormat
                }}%
                <vab-icon icon="arrow-drop-down-fill" />
              </span>
            </span>
          </p>
          <p style="font-size: 12px">
            本月
            <span v-if="item.numType == 1">
              ￥{{ item.month | moneyFormat }}
            </span>
            <span v-else>{{ item.month }}</span>
            较上月
            <span v-if="item.numType == 1">
              ￥{{ item.yesterday_month | moneyFormat }}
            </span>
            <span v-else>{{ item.yesterday_month }}</span>

            <span
              v-if="
                item.month - item.yesterday_month >= 0 ||
                item.month == 0 ||
                item.yesterday_month == 0
              "
            >
              增长
            </span>
            <span v-else>减少</span>
            &nbsp;
            <span v-if="item.month == 0" style="color: red">
              0%
              <vab-icon icon="arrow-drop-up-fill" />
            </span>
            <span v-else-if="item.yesterday_month == 0" style="color: red">
              100%
              <vab-icon icon="arrow-drop-up-fill" />
            </span>
            <span v-else>
              <span
                v-if="item.month - item.yesterday_month >= 0"
                style="color: red"
              >
                {{
                  (((item.month - item.yesterday_month) /
                    item.yesterday_month) *
                    100)
                    | moneyFormat
                }}%
                <vab-icon icon="arrow-drop-up-fill" />
              </span>
              <span v-else style="color: green">
                -{{
                  (((item.month - item.yesterday_month) /
                    item.yesterday_month) *
                    100)
                    | moneyFormat
                }}%
                <vab-icon icon="arrow-drop-down-fill" />
              </span>
            </span>
          </p>
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
