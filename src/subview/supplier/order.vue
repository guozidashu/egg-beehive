<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="创建时间:">
            <el-date-picker v-model="form.date" type="date" />
          </el-form-item>
          <el-form-item label="供应商:">
            <el-select v-model="form.region">
              <el-option label="张三" value="shanghai" />
              <el-option label="李四" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型:">
            <el-select v-model="form.region">
              <el-option label="全部" value="shanghai" />
              <el-option label="计划生产" value="shanghai" />
              <el-option label="成品采购" value="shanghai" />
              <el-option label="面料供应商" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单搜索:">
            <el-input
              v-model="form.input3"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.select"
                slot="prepend"
                placeholder="全部"
                style="width: 100px"
              >
                <el-option label="计划生产" value="1" />
                <el-option label="成品采购" value="2" />
                <el-option label="面料供应商" value="3" />
                <el-option label="全部" value="4" />
                <el-option label="订单号" value="5" />
                <el-option label="商品名称" value="6" />
                <el-option label="货号" value="6" />
              </el-select>
            </el-input>
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单 (3)" name="first" />
        <el-tab-pane label="成品采购订单 (129)" name="second" />
        <el-tab-pane label="计划生产单 (18)" name="three" />
        <el-tab-pane label="物料采购 (2)" name="four" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            导出
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            打印
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="订单号" prop="orderno" sortable width="120" />
          <el-table-column label="订单类型" prop="type" width="80" />
          <el-table-column label="供应商" prop="name" width="120" />
          <el-table-column label="商品信息" prop="inof">
            <template #default="{ row }">
              <div
                v-for="(item, index) in row.inof"
                :key="index"
                style="display: flex"
              >
                <img
                  :src="item.img"
                  style="
                    width: 30px;
                    height: 30px;
                    margin-top: 10px;
                    margin-right: 10px;
                  "
                />
                <p
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ item.text }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="num" width="80" />
          <el-table-column label="采购金额" prop="money" width="80" />
          <el-table-column label="创建时间" prop="creat_time" width="200" />
          <el-table-column label="交货时间" prop="end_time" width="200" />
          <el-table-column label="订单状态" prop="state" width="120">
            <template #default="{ row }">
              <div
                style="
                  width: 80px;
                  line-height: 22px;
                  color: #ffa39e;
                  text-align: center;
                  background: #fff1f0;
                  border-color: #ffa39e;
                "
              >
                {{ row.state }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
              <el-button type="text">作废</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  export default {
    name: 'SupplierOrder',
    components: { List, Form },
    data() {
      return {
        activeName: 'first',
        // 表单数据/列表参数
        form: {
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
        formType: 4,
        // orderno type name inof num money creat_time end_time state
        list: [
          {
            orderno: 'wx312009361683644416',
            creat_time: '2022-10-13 23:33:48',
            end_time: '2022-11-13 23:33:48',
            type: '计划生产',
            inof: [
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
            ],
            name: '阿白',
            num: 23,
            money: 345,
            state: '部分入库',
          },
          {
            orderno: 'wx312009361683644416',
            creat_time: '2022-10-13 23:33:48',
            end_time: '2022-11-13 23:33:48',
            type: '成品采购',
            inof: [
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
            ],
            name: '阿白',
            num: 23,
            money: 345,
            state: '未入库',
          },
        ],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
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
        this.form.pageNo = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.pageNo = 1
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
    },
  }
</script>
<style lang="scss" scoped></style>
