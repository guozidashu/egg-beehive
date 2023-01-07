<template>
  <el-card class="authorization" shadow="hover" style="border-radius: 5px">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      {{ title }}
    </template>
    <QYList
      :list="goosList"
      :list-height="listHeight"
      :list-type="listType"
      :state="listLoading"
    >
      <template #List>
        <el-table-column label="批次" prop="id" width="50" />
        <el-table-column label="订单来源" prop="online">
          <template #default="{ row }">
            <el-tag v-if="row.online == 1">线上</el-tag>
            <el-tag v-else type="warning">线下</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" prop="customer_name" />
        <el-table-column label="订单件数" prop="num" />
        <el-table-column label="订单状态" prop="status_text">
          <template #default="{ row }">
            <el-tag>{{ row.status_text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="create_time" />
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
      title: {
        type: String,
        default: '',
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
