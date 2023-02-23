<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="申请状态:">
            <el-select
              v-model="form.status"
              placeholder="申请状态"
              size="small"
            >
              <el-option label="待审核" :value="1" />
              <el-option label="已知晓" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="申请名称">
            <el-input
              v-model="form.name"
              placeholder="客户名称/商品名称"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column label="ID" prop="id" width="50" />
          <el-table-column label="客户名称" prop="customer_name" width="120" />
          <el-table-column label="申请商品" prop="goods_img">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.goods_img"
                  style="width: 200px; height: 200px"
                />
                <div style="display: flex">
                  <el-image
                    :src="row.goods_img"
                    style="width: 50px; height: 50px"
                  />
                  <div style="margin: 2px 0 0 10px">
                    <div>{{ row.sn }}</div>
                    <div>{{ row.goods_name }}</div>
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="申请数量" prop="num" width="80" />
          <el-table-column align="center" label="申请备注" prop="reason" />
          <el-table-column label="状态" prop="status" width="120">
            <template #default="{ row }">
              <el-tag
                v-if="row.status === 1"
                size="small"
                style="margin-right: 5px"
                type="success"
              >
                等待审核
              </el-tag>
              <el-tag
                v-if="row.status === 2"
                size="small"
                style="margin-right: 5px"
                type="warning"
              >
                已知晓
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" prop="create_time" width="200" />
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="{ row }">
              <el-button
                v-if="row.status === 1"
                type="text"
                @click="handleEdit(row, 1)"
              >
                处理
              </el-button>
              <el-button v-else disabled type="text">已处理</el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  import { getCustomerApplyList, getCustomerApplyAgree } from '@/api/basic'
  export default {
    name: 'CustomerApplication',
    mixins: [datajosn],
    data() {
      return {
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          name: '',
          level_id: null,
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
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleEdit(row, type) {
        if (row.id) {
          if (type == 1) {
            this.$baseConfirm('你确定要知晓当前项吗', null, async () => {
              const { code } = await getCustomerApplyAgree({
                id: row.id,
              })
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '知晓成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            })
          }
        }
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },

      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },

      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },

      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await getCustomerApplyList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
