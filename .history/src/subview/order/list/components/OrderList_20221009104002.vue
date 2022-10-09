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
    <!-- <edit ref="edit" @fetch-data="fetchData" />
    <Drawer :drawer="drawer" /> -->
  </div>
</template>

<script>
  import { getList } from '@/api/userManagement'
  // import { doDelete, getList } from '@/api/userManagement'
  // import Edit from './OrderEdit'
  // import Drawer from './ListDrawer'
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
        // activeName: 'first',
        // select: 'dingdan',
        // drawer: false,
        // list1: [
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        //   {
        //     orderid: '20160503',
        //     username: '王小虎',
        //     num: 5,
        //     money: 6400,
        //     state: '已完成',
        //   },
        //   {
        //     orderid: '20160504',
        //     username: '王小龙',
        //     num: 6,
        //     money: 32000,
        //     state: '未完成',
        //   },
        // ],
        // list: [],
        // listLoading: true,
        // total: 0,
        // selectRows: '',
        // queryForm: {
        //   pageNo: 1,
        //   pageSize: 10,
        //   username: '',
        // },
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
      async fetchData() {
        this.listLoading = true
        const {
          data: { list, total },
        } = await getList(this.queryForm)
        this.list = list
        this.total = total
        this.listLoading = false
      },
    },
  }
</script>
