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
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:ArchivesBom:add']"
            size="small"
            type="primary"
            @click="handleDetail('add', 3)"
          >
            添加物料
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
          <el-table-column type="selection" width="55" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="物料编号" prop="material_sn" width="120" />
          <el-table-column label="物料图片" width="120">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :preview-src-list="[row.material_pic]"
                  :src="row.material_pic"
                  style="width: 200px; height: 200px"
                />
                <el-image
                  :preview-src-list="[row.material_pic]"
                  :src="row.material_pic"
                  style="width: 100px; height: 100px"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="物料名称" prop="material_name" />
          <el-table-column label="物料分类" prop="category_name" width="120" />
          <el-table-column label="供应商名称" prop="supplier_name" />
          <el-table-column
            align="right"
            label="采购价"
            prop="material_price"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.material_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="总采购量" prop="num" width="120" />
          <el-table-column label="当前库存" prop="material_stock" width="120" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:ArchivesBom:view']"
                type="text"
                @click="handleDetail(row, 1)"
              >
                详情
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesBom:edit']"
                type="text"
                @click="handleDetail(row, 2)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesBom:del']"
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
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <Drawer :drawer-inof="drawerInof" />
    </el-drawer>
  </div>
</template>
<script>
  import Drawer from '@/subview/components/Drawer/BomDrawer'
  import {
    getCommonAllList,
    getMaterialList,
    delMaterialDel,
    getMaterialInfo,
  } from '@/api/basic'
  export default {
    name: 'ArchivesBom',
    components: { Drawer },
    data() {
      return {
        title: '',
        drawer: false,
        drawerInof: {},
        form: {
          category_id: null,
          supplier_name: '',
          keyword: '',
          page: 1,
          pageSize: 10,
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
      async handleDetail(row, type) {
        if (type === 1) {
          this.title = '物料详情'
        } else if (type === 2) {
          this.title = '编辑物料'
        } else {
          this.title = '添加物料'
        }
        if (row == 'add') {
          let arr = {
            width: null, //规格宽度
            material_spec: [
              {
                spec_name: null, //规格名称
                spec_price: null, //规格单价
              },
            ],
            drawerType: type,
          }
          this.drawerInof = JSON.parse(JSON.stringify(arr))
        } else {
          const { data } = await getMaterialInfo({
            material_id: row.id,
          })
          data[0].material_stock = row.material_stock
          data[0].num = row.num
          data[0].total = row.total
          data[0].id = row.id
          this.drawerInof = JSON.parse(JSON.stringify(data[0]))
          this.drawerInof.drawerType = type
        }
        this.drawer = true
      },
      handleClose() {
        this.drawerInof = {}
        this.drawer = false
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
            '你确定要删除当前物料吗？</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await delMaterialDel({
                material_id: row.id,
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
        this.material_category = data.material_category
      },
    },
  }
</script>
<style lang="scss" scoped></style>
