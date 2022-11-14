<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType">
        <template #Form>
          <el-form-item label="订单号" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="订单编号"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="积分商品"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="数量"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="总积分"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="订单状态"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="下单时间"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button
                v-if="row.status != 1"
                type="text"
                @click="handleDelete(row)"
              >
                核销
              </el-button>
              <span v-else>已核销</span>
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
  import {
    getIntegralOrderList,
    editIntegralOrderVerification,
  } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    components: { List, Form },
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
          order_sn: '',
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
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
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要核销当前项吗', null, async () => {
            const { code } = await editIntegralOrderVerification({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('核销成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
        console.log(data)
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getIntegralOrderList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
