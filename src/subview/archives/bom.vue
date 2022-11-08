<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="供应商搜索">
            <el-input
              v-model="form.supplier_name"
              placeholder="请输入供应商名称"
              size="small"
            />
          </el-form-item>
          <el-form-item label="物料搜索">
            <el-input
              v-model="form.keyword"
              placeholder="请输入物料名称或物料编号"
              size="small"
            />
          </el-form-item>
          <el-form-item label="物料分类">
            <el-select v-model="form.category_id" placeholder="请选择">
              <el-option
                v-for="item in material_category"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDetail('add', 3)"
          >
            添加物料
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
          <el-table-column label="ID" prop="material_id" width="80" />
          <el-table-column label="物料编号" prop="material_sn" width="120" />
          <el-table-column label="物料图片" width="120">
            <template #default="{ row }">
              <el-image
                :preview-src-list="[row.material_pic]"
                :src="row.material_pic"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="物料名称" prop="material_name" />
          <el-table-column label="物料分类" prop="name" width="120" />
          <el-table-column label="供应商名称" prop="supplier_name" />
          <el-table-column label="采购价" prop="name" width="120" />
          <el-table-column label="总采购量" prop="name" width="120" />
          <el-table-column label="当前库存" prop="material_stock" width="120" />
          <el-table-column label="状态" prop="name" width="120">
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
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row, 1)">
                详情
              </el-button>
              <el-button type="text" @click="handleDetail(row, 2)">
                编辑
              </el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" />
    </el-drawer>
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/BomDrawer'
  import {
    getCommonAllList,
    getMaterialList,
    delMaterialDel,
    getMaterialInfo,
  } from '@/api/basic'
  export default {
    name: 'ArchivesBom',
    components: { List, Form, Drawer },
    data() {
      return {
        drawer: false,
        drawerInof: {},
        form: {
          category_id: null,
          supplier_name: '',
          keyword: '',
          page: 1,
          page_size: 10,
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        material_category: [],
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
      this.getSelectData()
    },
    methods: {
      // 详情抽屉
      async handleDetail(row, type) {
        if (row == 'add') {
          this.drawerInof = {}
          this.drawerInof.drawerType = type
        } else {
          const { data } = await getMaterialInfo({
            material_id: row.material_id,
          })
          this.drawerInof = JSON.parse(JSON.stringify(data[0]))
          this.drawerInof.drawerType = type
        }
        this.drawer = true
      },
      handleQuery() {
        this.form.page = 1
      },
      handleDelete(row) {
        if (row.material_id) {
          this.$baseConfirm(
            '你确定要删除当前物料吗？</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await delMaterialDel({
                material_id: row.material_id,
              })
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
        this.form.page_size = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getMaterialList(this.form)
        this.list = data.list.data
        this.total = data.list.total
        this.listLoading = false
      },
      async getSelectData() {
        const { data } = await getCommonAllList({ type: 'material_category' })
        this.material_category = data[0].material_category
      },
    },
  }
</script>
<style lang="scss" scoped></style>
