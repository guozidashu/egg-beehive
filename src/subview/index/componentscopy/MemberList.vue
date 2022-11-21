<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      会员贡献榜
    </template>
    <List
      :list="goosList"
      :list-height="listHeight"
      :list-type="listType"
      :state="listLoading"
    >
      <template #List>
        <el-table-column align="center" label="序号" type="index" width="80" />
        <el-table-column label="用户等级" prop="name" />
        <el-table-column label="成交用户数" prop="turnover_customer" />
        <el-table-column label="销售金额" prop="sale_price" />
        <el-table-column label="等级用户数" prop="level_num" />
        <el-table-column label="占比" prop="all_total">
          <template #default="{ row }">
            {{ (row.level_num / row.turnover_customer).toFixed(2) * 100 }}%
          </template>
        </el-table-column>
      </template>
    </List>
  </el-card>
</template>

<script>
  import List from '@/subview/components/List'
  export default {
    components: { List },
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
