<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; width: 100%">
      <div v-for="(item, index) in list" :key="index" :style="textStyle">
        <vab-icon
          icon="bar-chart-box-fill"
          style="margin-right: 15px; font-size: 32px; color: #1890ff"
        />
        <div style="display: flex; flex-direction: column; margin-top: 5px">
          <div>
            {{ item.title }}
            <el-popover v-if="item.content" placement="right" trigger="hover">
              <div style="font-size: 12px">{{ item.content }}</div>

              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -2px; font-size: 14px"
              />
            </el-popover>
            <vab-icon
              v-else
              icon="question-line"
              style="position: relative; top: -2px; font-size: 14px"
            />
          </div>
          <div
            style="
              padding: 10px 0;
              font-size: 30px;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.85);
            "
          >
            <span v-if="item.numType == 1">￥{{ item.num | moneyFormat }}</span>
            <span v-else>{{ item.num }}</span>
          </div>
          <div
            v-if="item.onlineBillingPercentage"
            style="margin-bottom: 10px; font-size: 12px"
          >
            线下开单：&nbsp;
            <span v-if="item.title != '退货率'">
              ￥{{ item.onlineBilling | moneyFormat }}
            </span>
            &nbsp;
            {{ item.onlineBillingPercentage }}
          </div>
          <div v-if="item.onlineBillingPercentage" style="font-size: 12px">
            线上商城：&nbsp;
            <span v-if="item.title != '退货率'">
              ￥{{ item.onlineMall | moneyFormat }}
            </span>
            &nbsp;
            {{ item.onlineMallPercentage }}
          </div>
          <div v-if="item.typeSta">
            <span v-if="item.type === 1">较昨日增长：</span>
            <span v-else>较昨日减少：</span>
            <i v-if="item.type === 1" style="font-size: 12px; color: #f5222d">
              {{ item.number }}%
              <vab-icon icon="arrow-drop-up-fill" />
            </i>
            <i v-else style="font-size: 12px; color: #39c15b">
              {{ item.number }}%
              <vab-icon icon="arrow-drop-down-fill" />
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      width: {
        type: String,
        default: '20%',
      },
    },
    data() {
      return {
        textStyle: {
          display: 'flex',
          marginBottom: '30px',
          width: this.width,
        },
      }
    },
  }
</script>
