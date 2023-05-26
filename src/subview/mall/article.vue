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
          <el-form-item label="文章名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleEdit('add')">
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
        @selectRows="selectBtnRows"
      >
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="文章ID"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="文章标题"
            prop="title"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="150"
          >
            <template #default="{ row }">
              <el-popover
                placement="right"
                trigger="click"
                @show="getQrcode(row.id)"
              >
                <el-image
                  v-if="Qrcode != ''"
                  :src="Qrcode"
                  style="width: 200px; height: 200px"
                />
                <el-image
                  v-else
                  src="https://oss.business.quanyu123.com/88e5e42d9cdf41a632faab9ee48814ed.jpeg"
                  style="width: 200px; height: 200px"
                />
                <el-button slot="reference" type="text">小程序码</el-button>
              </el-popover>
              &nbsp;
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/ArticleEdit'
  export default {
    name: 'ArchivesArticle',
    components: { Edit },
    data() {
      return {
        Qrcode: '',
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，选中数据,列表数据，列表加载状态，列表总数
        formTemp: null,
        pageState: 0,
        page: 1,
        pageSize: 20,
        form: {
          id: 0,
          name: '',
          page: 1,
          pageSize: 20,
        },
        formType: 4,
        listType: 1,
        selectRows: [],
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单变化
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState == 1) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 2) {
            this.formTemp.page = 1
            this.formTemp.pageSize = newVal.pageSize
            this.page = 1
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 0) {
            this.formTemp.page = 1
            this.formTemp.pageSize = 20
            this.page = 1
            this.pageSize = 20
          }
          this.fetchData()
          this.pageState = 0
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 获取文章二维码
      async getQrcode(id) {
        this.Qrcode = ''
        const { code, data } = await this.api.getWechatArticleQrcode({
          article_id: id, // 商品id
        })
        if (code == 200) {
          this.Qrcode = data
        }
      },
      // 新增编辑
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
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await this.api.delArticleDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = 1
        this.form.page = data
      },
      // 选中数据
      selectBtnRows(data) {
        this.selectRows = data
      },
      // 每页条数
      changeBtnPageSize(data) {
        this.pageState = 2
        this.form.pageSize = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getArticleList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
