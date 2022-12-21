<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
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
    <el-card shadow="never" style="border: 0">
      <QYList
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
            label="客户名称"
            prop="customer_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="商品名称"
            prop="goods_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="商品图片"
            prop="goods_img"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.goods_img"
                  style="width: 200px; height: 200px"
                />
                <el-image
                  :src="row.goods_img"
                  style="width: 50px; height: 50px"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="申请时间"
            prop="create_time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="拒绝原因"
            prop="reason"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="状态"
            prop="status"
            show-overflow-tooltip
          >
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
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button
                v-if="row.status === 1"
                type="text"
                @click="handleEdit(row, 1)"
              >
                知晓
              </el-button>
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
      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getCustomerApplyList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
