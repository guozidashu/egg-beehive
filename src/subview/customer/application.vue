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
          <el-form-item label="客户等级:">
            <el-select
              v-model="form.level_id"
              placeholder="请选择等级"
              size="small"
            >
              <el-option
                v-for="(item, index) in selectList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请状态:">
            <el-select
              v-model="form.status"
              placeholder="申请状态"
              size="small"
            >
              <el-option label="等待审核" :value="0" />
              <el-option label="审核通过" :value="1" />
              <el-option label="审核失败" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.name"
              placeholder="请输入申请名称"
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
          <el-table-column
            align="center"
            label="等级名称"
            prop="level_name"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="客户名称"
            prop="customer_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="申请时间"
            prop="create_time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="推荐人"
            prop="referrer"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="备注"
            prop="remark"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="状态"
            prop="status"
            show-overflow-tooltip
            sortable
          >
            <template #default="{ row }">
              <el-tag
                v-if="row.status === 0"
                size="small"
                style="margin-right: 5px"
                type="warning"
              >
                等待审核
              </el-tag>
              <el-tag
                v-if="row.status === 1"
                size="small"
                style="margin-right: 5px"
                type="success"
              >
                审核通过
              </el-tag>
              <el-tag
                v-if="row.status === 2"
                size="small"
                style="margin-right: 5px"
                type="danger"
              >
                审核未通过
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
                v-if="row.status === 0"
                type="text"
                @click="handleEdit(row, 1)"
              >
                通过
              </el-button>
              <el-button
                v-if="row.status === 0"
                type="text"
                @click="handleEdit(row, 2)"
              >
                拒绝
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
  export default {
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
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      handleEdit(row, type) {
        if (row.id) {
          if (type == 1) {
            this.$baseConfirm('你确定要审核当前项吗', null, async () => {
              const { code } = await this.api.editApplyAgree({
                id: row.id,
              })
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '审核成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            })
          } else {
            this.$prompt('请输入拒绝原因', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputValidator(value) {
                if (!value) {
                  return '请输入拒绝原因'
                }
              },
              inputErrorMessage: '请输入拒绝原因',
            }).then(async ({ value }) => {
              const { code } = await this.api.editApplyDisagree({
                id: row.id,
                fail_remark: value,
              })
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '拒绝成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            })
          }
        }
      },
      async getTypeList() {
        const { data } = await this.api.getGradeList()
        this.selectList = data.data
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
        const { data } = await this.api.getApplyList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
