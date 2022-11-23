<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="季节搜索：" prop="region">
            <el-input
              v-model="form.name"
              placeholder="请输入季节搜索"
              size="small"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:ArchivesSeasonal:add']"
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加季节
          </el-button>
        </el-form-item>
      </el-form>
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column type="selection" width="55" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="季节名称" prop="name" width="120" />
          <el-table-column label="使用商品" prop="count" />
          <el-table-column label="状态" prop="status" width="150">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                active-color="#41B584"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="关闭"
                :inactive-value="0"
                style="margin: 0 10px"
                @change="turnOnOff(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="sort" width="80" />
          <el-table-column label="创建时间" prop="create_time" />
          <el-table-column align="center" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:ArchivesSeasonal:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesSeasonal:del']"
                type="text"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Edit from './components/SeasonalEdit'
  import Form from '@/subview/components/Form'
  import { getSeasonList, delSeasonDel, addSeasonSave } from '@/api/basic'
  export default {
    name: 'ArchivesSeasonal',
    components: { List, Edit, Form },
    data() {
      return {
        form: {
          name: '',
          page: 1,
          pageSize: 10,
        },
        formType: 3,
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
      async turnOnOff(row) {
        const { code } = await addSeasonSave(row)
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
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
            '你确定要删除当前季节吗?</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await delSeasonDel({ id: row.id })
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
        const { data } = await getSeasonList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
