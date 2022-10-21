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
        <el-table-column label="用户等级" prop="store_name" />
        <el-table-column label="销售额" prop="visit" />
        <el-table-column label="等级用户数" prop="user" />
        <el-table-column label="占比" prop="cart" />
        <el-table-column label="成交用户数" prop="orders" />
        <el-table-column label="未消费" prop="ceshi" />
      </template>
    </List>
  </el-card>
</template>

<script>
  import List from '@/subview/components/List'
  export default {
    components: { List },
    data() {
      return {
        listHeight: 250,
        listLoading: false,
        listType: 5,
        goosList: [
          {
            visit: '3900万',
            user: '55个',
            cart: '20%',
            orders: '14个',
            ceshi: '24个',
            store_name: '钻石用户',
          },
          {
            visit: '3900万',
            user: '55个',
            cart: '20%',
            orders: '14个',
            ceshi: '24个',
            store_name: '钻石用户',
          },
          {
            visit: '3900万',
            user: '55个',
            cart: '20%',
            orders: '14个',
            ceshi: '24个',
            store_name: '钻石用户',
          },
          {
            visit: '3900万',
            user: '55个',
            cart: '20%',
            orders: '14个',
            ceshi: '24个',
            store_name: '钻石用户',
          },
          {
            visit: '3900万',
            user: '55个',
            cart: '20%',
            orders: '14个',
            ceshi: '24个',
            store_name: '钻石用户',
          },
          {
            visit: '3900万',
            user: '55个',
            cart: '20%',
            orders: '14个',
            ceshi: '24个',
            store_name: '钻石用户',
          },
          {
            visit: '3900万',
            user: '55个',
            cart: '20%',
            orders: '14个',
            ceshi: '24个',
            store_name: '钻石用户',
          },
        ],
      }
    },
    beforeDestroy() {},
    mounted() {},
  }
</script>
<style lang="scss" scoped></style>
