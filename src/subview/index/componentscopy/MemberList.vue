<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      客户等级分布概括
    </template>
    <QYList
      :list="goosList"
      :list-height="listHeight"
      :list-type="listType"
      :state="listLoading"
    >
      <template #List>
        <el-table-column align="center" label="排行" type="index" width="50">
          <template slot-scope="scope">
            <span
              class="index_common"
              :class="[
                scope.$index + 1 == '1'
                  ? 'index_one'
                  : scope.$index + 1 == '2'
                  ? 'index_two'
                  : scope.$index + 1 == '3'
                  ? 'index_three'
                  : 'index_more',
              ]"
            >
              {{ scope.$index + 1 }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="用户等级" prop="name" />
        <el-table-column label="等级用户数" prop="level_num" />
        <el-table-column label="成交用户数" prop="turnover_customer" />
        <el-table-column label="当前等级占比" prop="all_total">
          <template #default="{ row }">
            <span v-if="row.turnover_customer == 0">0%</span>
            <span v-else>
              {{ (row.level_num / row.turnover_customer).toFixed(2) * 100 }}%
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="销售金额"
          prop="sale_price"
          width="150"
        >
          <template #default="{ row }">
            <el-tag>￥{{ row.sale_price | moneyFormat }}</el-tag>
          </template>
        </el-table-column>
      </template>
    </QYList>
  </el-card>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        listHeight: 250,
        listLoading: false,
        listType: 5,
        goosList: this.data,
      }
    },
    watch: {
      data: {
        handler: function (newval) {
          this.goosList = newval
        },
        deep: true,
        immediate: true,
      },
    },
    beforeDestroy() {},
    mounted() {},
  }
</script>
<style lang="scss" scoped></style>
