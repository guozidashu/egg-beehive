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
          <el-form-item label="仓库类型：" prop="region">
            <el-select v-model="form.type_id">
              <el-option label="样板仓库" :value="1" />
              <el-option label="成品仓库" :value="3" />
              <el-option label="面料仓库" :value="4" />
              <el-option label="辅料仓库" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="仓库名称：" prop="region">
            <el-input
              v-model="form.name"
              placeholder="请输入仓库名称"
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
            v-has-permi="['btn:ArchivesWarehouse:add']"
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加仓库
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
          <el-table-column label="仓库名称" prop="name" width="150" />

          <el-table-column label="库位数量" prop="count" width="150" />
          <el-table-column label="仓库类型" prop="type_name" width="150" />
          <el-table-column label="是否默认" prop="isdefault" width="80">
            <template #default="{ row }">
              <span v-if="row.isdefault == 0">否</span>
              <span v-else>默认</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" />
          <el-table-column label="创建时间" prop="create_time" />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="150"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:ArchivesWarehouse:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesWarehouse:del']"
                type="text"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesWarehouse:kuwei']"
                type="text"
                @click="handleDetail(row.id)"
              >
                库位
              </el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :drawer-id="drawerId" />
    </el-drawer>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Edit from './components/WareHouseEdit'
  import Form from '@/subview/components/Form'
  import Drawer from './components/WareHouseDrawer'
  import { getArchive, delArchive } from '@/api/basic'
  export default {
    name: 'ArchivesWarehouse',
    components: { List, Edit, Form, Drawer },
    data() {
      return {
        drawer: false,
        drawerId: 0,
        form: {
          id: 0,
          name: '',
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
      // 详情抽屉
      handleDetail(id) {
        this.drawerId = id
        this.drawer = true
      },
      handleEdit(row) {
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
            '你确定要删除当前仓库吗?</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await delArchive({ id: row.id })
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
        const { data } = await getArchive(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: white;
  }
  .table-pos {
    position: relative;
    top: -20px;
  }
</style>
