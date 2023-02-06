<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </QYForm>
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="排行" type="index" width="50">
            <template slot-scope="scope">
              <span
                class="index_common"
                :class="[
                  scope.$index + 1 == '1'
                    ? 'index_one'
                    : scope.$index + 1 == '2'
                    ? 'index_two'
                    : scope.$index + 1 == '3'
                    ? 'index_three'
                    : 'index_more',
                ]"
              >
                {{ scope.$index + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="积分"
            prop="sum_integral"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="头像"
            prop="avatar"
            show-overflow-tooltip
            sortable
          >
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.avatar"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.avatar" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="姓名"
            prop="name"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  import { getEmployeeIntegralRank } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
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
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },

      changeBtnPage(data) {
        this.form.page = data
      },

      changeBtnPageSize(data) {
        this.form.pageSize = data
      },

      async fetchData() {
        this.listLoading = true
        const { data } = await getEmployeeIntegralRank(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
