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
          <el-form-item label="角色:">
            <el-select v-model="form.role_id" size="small">
              <el-option
                v-for="(item, index) in selectList.role"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="日期筛选:">
            <el-date-picker
              v-model="form.date"
              align="left"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
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
          <el-table-column
            align="center"
            label="用户ID"
            prop="user_id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="用户名称"
            prop="user_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="完成价值"
            prop="complete_worth"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="淘汰价值"
            prop="out_worth"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="用户价值"
            prop="employee_worth"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          date: ['', ''],
          role_id: null,
        },
        selectList: [],
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
          if (this.pageState) {
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
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
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要核销当前项吗', null, async () => {
            const { code } = await this.api.editIntegralOrderVerification({
              id: row.id,
            })
            if (code != 200) {
              return
            }
            this.$baseMessage('核销成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'role',
        })
        this.selectList = data
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
        const { data } = await this.api.getEmployeeCostAnalysis({
          page: this.page,
          pageSize: this.pageSize,
          start_date: this.form.date[0],
          end_date: this.form.date[1],
          role_id: this.form.role_id,
        })
        this.list = data.data.data
        this.total = data.data.total
        this.listLoading = false
      },
    },
  }
</script>
