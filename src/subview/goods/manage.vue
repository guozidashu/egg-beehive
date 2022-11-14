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
          <el-form-item label="款式类别:">
            <el-select v-model="form.category" placeholder="请选择类别款式">
              <el-option
                v-for="(item, index) in selectList.category"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:">
            <el-select v-model="form.brand" placeholder="请选择品牌">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年份:">
            <el-select v-model="form.year" placeholder="请选择年份">
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="季节:">
            <el-select v-model="form.season" placeholder="请选择季节">
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="尺码类型:">
            <el-select v-model="form.type">
              <el-option label="整手" value="0" />
              <el-option label="散码" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="上市波段:">
            <el-select v-model="form.band" placeholder="请选择波段">
              <el-option
                v-for="(item, index) in selectList.band"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称/关键字/ID"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="form.list_type" @tab-click="handleClick">
        <el-tab-pane label="全部商品 (3)" name="0" />
        <el-tab-pane label="仓库中 (129)" name="1" />
        <el-tab-pane label=" 已售罄 (18)" name="2" />
        <el-tab-pane label="库存预警 (2)" name="3" />
        <el-tab-pane label="待确认 (10)" name="4" />
        <el-tab-pane label="自营商城 (2)" name="5" />
        <el-tab-pane label="第三方平台 (10)" name="6" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDetail('add', 3)"
          >
            添加商品
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit(0)"
          >
            批量下架
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit(1)"
          >
            批量上架
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="商品Id" prop="id" width="80" />
          <el-table-column label="款号" prop="sn" width="80" />
          <el-table-column label="商品图" prop="img" width="80">
            <template #default="{ row }">
              <img :src="row.img" style="width: 50px; height: 50px" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" width="180" />
          <el-table-column label="商品标题" prop="shoptitle" />
          <el-table-column label="款号类别" prop="type" width="120">
            <template #default="{ row }">
              <span v-if="row.type == 0">整手</span>
              <span v-else-if="row.type == 1">散码</span>
            </template>
          </el-table-column>
          <el-table-column label="销售价" prop="price" width="120" />
          <el-table-column label="吊牌价" prop="sale_price" width="120" />
          <el-table-column label="销量" prop="xl_num" width="120" />
          <el-table-column label="库存" prop="xh_num" width="100" />
          <el-table-column label="状态" prop="status" width="150">
            <template #default="{ row }">
              <span v-if="row.status == 0">下架</span>
              <span v-else-if="row.status == 1">上架</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row, 1)">
                详情
              </el-button>
              <el-button type="text" @click="handleDetail(row, 2)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" :select-list="selectList" />
    </el-drawer>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Edit from './components/ManageEdit'
  import Drawer from './components/Drawer'
  import {
    getGoodList,
    getCommonAllList,
    editGoodBatchLower,
  } from '@/api/basic'
  import publicjosn from '@/assets/assets_josn/publicjosn'
  export default {
    name: 'GoodsManage',
    components: { List, Form, Drawer, Edit },
    mixins: [publicjosn],
    data() {
      return {
        title: '',
        drawer: false,
        drawerInof: {},
        form: {
          page: 1,
          pageSize: 10,
          list_type: 0, // 列表类型 0=全部 1=仓库中 2=已售完 3=库存预警 4=待确认 5=自营商城 6=第三方平台
          category: '', //款式分类
          brand: '', //品牌
          year: '', //年份
          season: '', //季节
          type: '', //尺码类型 0整手  1散码
          band: '', //波段
          name: '', //商品名称
        },
        listType: 1,
        formType: 4,
        list: [],
        selectList: [],
        selectRowsId: [],
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
      this.getGoodsTypeList()
      this.fetchData()
    },
    methods: {
      handleQuery() {},
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        this.form.list_type = tab.name
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getGoodList(this.form)
        // const { data } = await getGoodTotalDetails(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async getGoodsTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,year,season,band,category,agegroup,color,size',
        })
        // data.size.forEach((item) => {
        //   item.value = item.id
        //   item.label = item.name
        //   if (item.children) {
        //     item.children.unshift({
        //       id: 0,
        //       label: '无',
        //       name: '无',
        //       value: 0,
        //     })
        //     item.children.forEach((item2) => {
        //       item2.value = item2.id
        //       item2.label = item2.name
        //     })
        //   }
        // })
        this.selectList = data
      },
      // 详情抽屉
      handleDetail(row, type) {
        if (type === 1) {
          this.title = '商品详情'
        } else if (type === 2) {
          this.title = '编辑商品'
        } else {
          this.title = '添加商品'
        }
        if (row == 'add') {
          this.drawerInof = {}
          this.drawerInof.drawerType = type
        } else {
          this.drawerInof = JSON.parse(JSON.stringify(row))
          this.drawerInof.drawerType = type
        }
        this.drawer = true
      },
      handleClose() {
        this.drawer = false
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      handleEdit(type) {
        if (this.selectRowsId.length > 0) {
          if (type == 1) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.status == 1) {
                this.$message.error('所选数据中有已上架的商品')
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            let ids = this.selectRowsId.map((item) => item.id)
            this.$baseConfirm('你确定要上架选中项吗', null, async () => {
              const { msg } = await editGoodBatchLower({
                good_ids: ids,
                status: type,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.status == 0) {
                this.$message.error('所选数据中有已下架的商品')
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            let ids = this.selectRowsId.map((item) => item.id)
            this.$baseConfirm('你确定要下架选中项吗', null, async () => {
              const { msg } = await editGoodBatchLower({
                good_ids: ids,
                status: type,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          }
        } else {
          this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
