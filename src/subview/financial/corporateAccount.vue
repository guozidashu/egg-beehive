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
          <el-form-item label="账户类型:" prop="type">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option label="银行" :value="1" />
              <el-option label="支付宝" :value="2" />
              <el-option label="微信" :value="3" />
              <el-option label="其他" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type == 1" label="开户行:" prop="bank_name">
            <el-input v-model="form.bank_name" size="small" />
          </el-form-item>
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
          <el-form-item label="账户:" prop="account">
            <el-input v-model="form.account" size="small" />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:FinancialCorporateAccount:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
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
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="账户类型"
            prop="type"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span v-if="row.type == 1">银行</span>
              <span v-else-if="row.type == 2">支付宝</span>
              <span v-else-if="row.type == 3">微信</span>
              <span v-else-if="row.type == 4">其他</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="开户人姓名"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="开户银行"
            prop="bank_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="开户账户"
            prop="account"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="是否默认"
            prop="is_default"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span v-if="row.is_default == 1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:FinancialCorporateAccount:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:FinancialCorporateAccount:del']"
                type="text"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
      <edit ref="edit" @fetch-data="fetchData" />
    </el-card>
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/CorporateAccountEdit'
  import { getCorporateAccountList, delCorporateAccountDel } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialCorporateAccount',
    components: { Edit },
    mixins: [datajosn],
    data() {
      return {
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          name: '', // 开户人姓名
          type: null, // 1、银行 2、支付宝 3、微信 4、其它
          bank_name: '', // 开户银行
          account: '', // 账户
        },
        formType: 4,
        listType: 1,
        list: [
          {
            id: 1,
            name: '测试科目',
          },
        ],
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
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },

      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await delCorporateAccountDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },

      resetForm() {
        this.form = this.$options.data().form
      },
      handleQuery() {
        this.fetchData()
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
        const { data } = await getCorporateAccountList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
