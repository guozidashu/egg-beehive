<template>
  <div>
    <el-dialog
      v-if="type == 2"
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width: 215px" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            active-color="#41B584"
            active-text="开启"
            :active-value="1"
            class="switch"
            inactive-color="#D2D2D2"
            inactive-text="关闭"
            :inactive-value="0"
            style="margin: 0 10px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </template>
    </el-dialog>
    <el-dialog
      v-if="type == 1"
      :title="title"
      :visible.sync="dialogFormVisible"
      width="70%"
      @close="close"
    >
      <div style="display: flex; justify-content: space-between">
        <Form
          :form="formEdit"
          :form-type="formType"
          @changeSearch="handleQuery"
          @resetForm="resetForm"
        >
          <template #Form>
            <el-form-item>
              <el-input
                v-model="formEdit.name"
                placeholder="请输入商品名称"
                style="width: 215px"
              />
            </el-form-item>
          </template>
        </Form>
        <el-form
          class="demo-form-inline"
          :inline="true"
          :model="formInline"
          style="margin-top: 20px"
        >
          <el-form-item label="分组名称">
            <el-select v-model="formInline.group_id" placeholder="请选择分组">
              <el-option
                v-for="(item, index) in selectList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addGoodsIn">
              新增商品到分组
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div style="height: 500px; overflow: auto">
        <List
          :list="list"
          :list-type="listType"
          :state="listLoading"
          :total="total"
          @changePage="changeBtnPage"
          @changePageSize="changeBtnPageSize"
          @selectRows="handleSelectionChange"
        >
          <template #List>
            <el-table-column type="selection" />
            <el-table-column label="ID" prop="id" />
            <el-table-column label="商品名称" prop="goods_name" />
            <el-table-column label="商品图" prop="img" width="80">
              <template #default="{ row }">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image :src="row.img" style="width: 50px; height: 50px" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="商品标题" prop="shoptitle" />
            <el-table-column label="商品编号" prop="sn" />
            <el-table-column label="商品价格" prop="price" />
            <el-table-column label="状态" prop="status" width="150">
              <template #default="{ row }">
                <el-tag v-if="row.status == 0" type="danger">下架</el-tag>
                <el-tag v-else-if="row.status == 1">上架</el-tag>
              </template>
            </el-table-column>
          </template>
        </List>
      </div>

      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {
    editGoodsGroupSave,
    getGoodsUnitList,
    addGroupGoodsAdd,
    getGoodsGroupList,
  } from '@/api/basic'
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  export default {
    name: 'TagsEdit',
    components: { List, Form },
    data() {
      return {
        selectList: [],
        formInline: {
          group_id: null,
        },
        selectRowsIds: [],
        formEdit: {
          page: 1,
          pageSize: 10,
          name: '',
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        form: {
          name: '',
          pid: null,
          sort: null,
          status: 1,
        },
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    watch: {
      formEdit: {
        handler: function (val) {
          this.fetchList(val.id)
        },
        deep: true,
      },
    },
    created() {
      this.getSelectType()
    },
    methods: {
      showEdit(row, type) {
        this.type = type
        if (row === 'add') {
          this.title = '添加分组'
          if (type == 1) {
            this.fetchData()
          }
        } else {
          this.title = '编辑分组'
          this.form = Object.assign({}, row)
        }

        this.dialogFormVisible = true
      },
      close() {
        this.form = this.$options.data().form
        this.$emit('fetch-data')
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加') {
              const { code } = await editGoodsGroupSave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              const { code } = await editGoodsGroupSave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            }
          }
        })
      },
      async addGoodsIn() {
        if (this.formInline.group_id == null) {
          this.$baseMessage('请选择分组', 'error', 'vab-hey-message-error')
          return
        }
        if (this.selectRowsId != undefined) {
          let temp = []
          this.selectRowsId.forEach((item) => {
            temp.push(item.id)
          })
          const { msg } = await addGroupGoodsAdd({
            group_id: this.formInline.group_id,
            goods_id: temp,
          })
          this.$baseMessage(msg, 'success', 'vab-hey-message-success')
          await this.fetchData()
        } else {
          this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
        }
      },
      async getSelectType() {
        const { data } = await getGoodsGroupList(this.form)
        this.selectList = data
      },
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.formEdit = this.$options.data().formEdit
      },
      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.formEdit.page = data
      },
      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.formEdit.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getGoodsUnitList(this.formEdit)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
