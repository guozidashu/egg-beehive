<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>成品核算单</span>
      </div>
      <el-form
        ref="form"
        :inline="true"
        :model="orderForm"
        @submit.native.prevent
      >
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            添加
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            删除
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            导入
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            上架
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            下架
          </el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button
            icon="el-icon-search"
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            查询
          </el-button>
        </el-form-item>
        <el-form-item label="状态:" prop="region" style="float: right">
          <el-select
            v-model="orderForm.dataSelect"
            size="small"
            style="width: 150px"
          >
            <el-option label="全部" value="0" />
            <el-option label="已上架" value="beijing" />
            <el-option label="已下架" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="分组:" prop="region" style="float: right">
          <el-select
            v-model="orderForm.dataSelect"
            size="small"
            style="width: 150px"
          >
            <el-option label="全部" value="0" />
            <el-option label="新款" value="beijing" />
            <el-option label="热销" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类:" prop="region" style="float: right">
          <el-select
            v-model="orderForm.dataSelect"
            size="small"
            style="width: 150px"
          >
            <el-option label="全部" value="0" />
            <el-option label="分类一" value="beijing" />
            <el-option label="分类二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品款号" prop="region" style="float: right">
          <el-input
            v-model="orderForm.orderId"
            size="small"
            style="width: 150px; padding-left: 10px"
          />
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <List
        :order-list="list"
        :order-state="listLoading"
        :order-total="total"
        :type="listType"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="ID"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="成品核算单"
            prop="name"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="款号"
            prop="time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="库存"
            prop="sta"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="显示销量"
            prop="sta"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="实际销量"
            prop="sta"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="序号"
            prop="sta"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="sta"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="商品状态"
            prop="sta"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  export default {
    name: 'GoodsManage',
    components: { List },
    data() {
      return {
        // 表单数据/列表参数
        orderForm: {
          // 自定义参数
          orderSta: '全部',
          paySta: '全部',
          orderSource: 'ERP订单',
          fold: true,
          typeSelect: 'order',
          dataSelect: '0',
          data: '',
          orderId: '',
          // 公共参数
          pageNo: 1,
          pageSize: 10,
        },
        // 列表数据相关
        // 公共参数
        listType: 1,
        list: [
          {
            id: 'pc12138',
            name: '成品核算单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '成品核算单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '成品核算单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '成品核算单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '成品核算单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '成品核算单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
        ],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      orderForm: {
        //表单筛选条件变化实时刷新列表
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleQuery() {},
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.orderForm.pageNo = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        this.orderForm.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getList(this.orderForm)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: white;
  }
  .table-pos {
    position: relative;
    top: -20px;
  }
</style>
