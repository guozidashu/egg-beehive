<template>
  <div class="user-management-container">
    <el-table v-loading="orderState" border :data="orderList">
      <!-- @selection-change="setSelectRows" -->
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="orderList.pageNo"
      :layout="layout"
      :page-size="orderList.pageSize"
      :total="orderTotal"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
  import { getList } from '@/api/userManagement'
  export default {
    name: 'ComponentsOrderList',
    // components: { Edit, Drawer },
    props: {
      orderList: {
        type: Array,
        default: () => [],
      },
      orderState: {
        type: Boolean,
        default: true,
      },
      orderTotal: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        layout: 'total, sizes, prev, pager, next, jumper',
      }
    },
    created() {},
    methods: {
      // 改变每页条数事件 公共
      handleSizeChange(val) {
        console.log(45454545, val)
        this.$emit('changePageSize', val)
      },
      // 改变页数事件 公共
      handleCurrentChange(val) {
        console.log(2666662, val)
        this.$emit('changePage', val)
      },
    },
  }
</script>
