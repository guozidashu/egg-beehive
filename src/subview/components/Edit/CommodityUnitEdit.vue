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
      <div style="position: relative; top: -30px">
        <QYForm
          :form="formEdit"
          :form-type="formType"
          @changeSearch="handleQuery"
          @resetForm="resetForm"
        >
          <template #Form>
            <el-form-item label="款式类别:">
              <el-select
                v-model="formEdit.category"
                placeholder="请选择类别款式"
              >
                <el-option
                  v-for="(item, index) in selectLists.category"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="品牌:">
              <el-select v-model="formEdit.brand" placeholder="请选择品牌">
                <el-option
                  v-for="(item, index) in selectLists.brand"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年份:">
              <el-select v-model="formEdit.year" placeholder="请选择年份">
                <el-option
                  v-for="(item, index) in selectLists.year"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="季节:">
              <el-select v-model="formEdit.season" placeholder="请选择季节">
                <el-option
                  v-for="(item, index) in selectLists.season"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="波段:">
              <el-select
                v-model="formEdit.band"
                placeholder="请选择波段"
                style="width: 215px"
              >
                <el-option
                  v-for="(item, index) in selectLists.band"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品搜索:">
              <el-input
                v-model="formEdit.name"
                placeholder="请输入商品名称"
                style="width: 215px"
              />
            </el-form-item>
          </template>
        </QYForm>
        <el-form class="demo-form-inline" :inline="true" :model="formInline">
          <el-form-item label="分组名称:" label-width="100px">
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
        <div style="height: 500px; overflow: auto">
          <QYList
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
              <el-table-column label="ID" prop="id" width="50" />
              <el-table-column label="商品名称" prop="name" />
              <el-table-column label="商品图" prop="img" width="80">
                <template #default="{ row }">
                  <el-tooltip placement="top">
                    <el-image
                      slot="content"
                      :src="row.img"
                      style="width: 200px; height: 200px"
                    />
                    <el-image
                      :src="row.img"
                      style="width: 50px; height: 50px"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="商品标题" prop="shoptitle" />
              <el-table-column label="商品编号" prop="sn" />
              <el-table-column label="商品价格" prop="price" />
              <el-table-column label="款式类别" prop="cate_name" />
              <el-table-column label="波段" prop="band_name" />
              <el-table-column label="季节" prop="season_name" />
              <el-table-column label="品牌" prop="brand_name" />
              <el-table-column label="年份" prop="year_name" />
              <el-table-column label="状态" prop="status" width="150">
                <template #default="{ row }">
                  <el-tag v-if="row.is_shop == 1">上架</el-tag>
                  <el-tag v-else type="danger">下架</el-tag>
                </template>
              </el-table-column>
            </template>
          </QYList>
        </div>
      </div>

      <!-- <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </template> -->
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCommonAllList,
    editGoodsGroupSave,
    getGoodsUnitList,
    addGroupGoodsAdd,
    getGoodsGroupList,
  } from '@/api/basic'

  export default {
    name: 'TagsEdit',
    data() {
      return {
        selectLists: [],
        selectList: [],
        formInline: {
          group_id: null,
        },
        selectRowsIds: [],
        formEdit: {
          page: 1,
          pageSize: 10,
          name: '',
          category: null,
          brand: null,
          year: null,
          season: null,
          band: null,
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
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
      formInline: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getSelectType()
      this.getGoodsTypeList()
    },
    methods: {
      async getGoodsTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,year,season,category,band',
        })
        this.selectLists = data
      },
      showEdit(row, type) {
        this.type = type
        if (row === 'add') {
          this.title = '新增商品到分组'
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

      changeBtnPage(data) {
        this.formEdit.page = data
      },

      changeBtnPageSize(data) {
        this.formEdit.pageSize = data
      },

      async fetchData() {
        this.listLoading = true
        this.formEdit.group_id = this.formInline.group_id
        const { data } = await getGoodsUnitList(this.formEdit)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
