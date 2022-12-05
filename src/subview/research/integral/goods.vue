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
          <el-form-item label="商品名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:IntegralGoods:add']"
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in list" :key="index" :span="6">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{ item.name }}</span>
              <el-button
                v-has-permi="['btn:IntegralGoods:del']"
                style="float: right; padding: 3px"
                type="text"
                @click="handleDelete(item)"
              >
                删除
              </el-button>
              <el-button
                v-has-permi="['btn:IntegralGoods:edit']"
                style="float: right; padding: 3px"
                type="text"
                @click="handleEdit(item)"
              >
                编辑
              </el-button>
            </div>
            <div style="display: flex; justify-content: space-between">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="item.pic"
                  style="width: 200px; height: 200px"
                />
                <el-image
                  :src="item.pic"
                  style="width: 50px; height: 50px; margin: 20px 0 0 20px"
                />
              </el-tooltip>
              <div>
                <div style="margin: 5px">积分：{{ item.integral }}</div>
                <div style="margin: 5px">库存：{{ item.stock }}</div>
                <div style="margin: 5px">
                  实际价格：￥{{ item.actual_price | moneyFormat }}
                </div>
                <div style="margin: 5px">
                  状态：
                  <el-tag v-if="item.status == 1">上架</el-tag>
                  <el-tag v-else type="danger">下架</el-tag>
                </div>
                <div style="margin: 5px">时间：{{ item.create_time }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- <List
        :list="list"
        :list-type="listType"
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
            label="图片"
            prop="pic"
            show-overflow-tooltip
            sortable
          >
            <template #default="{ row }">
              <el-image :src="row.pic" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品名称"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="积分"
            prop="integral"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="库存"
            prop="stock"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="上下架"
            prop="status"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span v-if="row.status == 1">上架</span>
              <span v-else>下架</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="添加时间"
            prop="create_time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </List> -->
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Form from '@/subview/components/Form'
  import Edit from './components/GoodsEdit'
  import { getIntegralGoodsList, delIntegralGoodsDel } from '@/api/basic'
  export default {
    name: 'IntegralGoods',
    components: { Form, Edit },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          name: '',
          page: 1,
          pageSize: 100,
        },
        formType: 4,
        // 列表数据相关
        selectRows: [],
        // listType: 1,
        list: [],
        // listLoading: false,
        // total: 0,
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
      // 新增修改
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
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await delIntegralGoodsDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 多选获取数据   公共部分
      selectBtnRows(data) {
        this.selectRows = data
      },

      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        const { data } = await getIntegralGoodsList(this.form)
        this.list = data.data
        // this.total = data.total
        // this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
