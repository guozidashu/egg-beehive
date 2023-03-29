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
          <el-form-item label="节点名称" prop="region">
            <el-input
              v-model="form.name"
              placeholder="请输入节点名称"
              size="small"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:ArchivesBrand:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加节点
          </el-button>
        </el-form-item>
      </el-form>
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column type="selection" width="50" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="节点名称" prop="name" width="120" />
          <el-table-column label="排序" prop="sort" width="120" />
          <el-table-column label="是否必选" prop="mandatory" width="150">
            <template #default="{ row }">
              <el-tag v-if="row.mandatory == 1">是</el-tag>
              <el-tag v-else type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否默认" prop="default" width="150">
            <template #default="{ row }">
              <el-tag v-if="row.default == 1">是</el-tag>
              <el-tag v-else type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="类型" prop="type" width="150">
            <template #default="{ row }">
              <el-tag v-if="row.type == 1" type="success">裁床单</el-tag>
              <el-tag v-else-if="row.type == 2" type="warning">入库单</el-tag>
              <el-tag v-else type="danger">无操作</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="create_time" />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:ArchivesBrand:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesBrand:del']"
                type="text"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/NodeEdit'
  export default {
    components: { Edit },
    data() {
      return {
        form: {
          name: '',
          page: 1,
          pageSize: 10,
        },
        formType: 4,
        listType: 2,
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
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(
            '你确定要删除当前节点吗?</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await this.api.delNode({ id: row.id })
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '删除成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            }
          )
        }
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getNodeList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
