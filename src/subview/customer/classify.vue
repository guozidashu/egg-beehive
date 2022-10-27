<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="分类名称" prop="region">
            <el-input v-model="form.name" size="small" />
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
            @click="handleEdit('add')"
          >
            添加
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
        @selectRows="selectBtnRows"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="分类名称"
            prop="date"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户数"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="分类说明（备注）"
            prop="address"
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
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Edit from './components/ClassifyEdit'
  import Form from '@/subview/components/Form'
  // import { getGradeList, editGrade, deleteGrade } from '@/api/basic'
  export default {
    name: 'ArchivesBand',
    components: { List, Edit, Form },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          name: '',
          pageNo: 1,
          pageSize: 10,
        },
        formType: 4,
        // 列表数据相关
        selectRows: [],
        listType: 1,
        list: [
          {
            date: '零售店',
            name: '10',
            address: '抖音快团团',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '网店',
            name: '20',
            address:
              '如果您使用 Shopify 中的免费模板，那么您可以联系 Shopify 支持以获',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '超市连锁店',
            name: '0',
            address:
              '订单备注、购物车属性和订单项目属性是具有类似功能的三个单独的工具。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '趣店',
            name: '111',
            address:
              '可在您模板的购物车页面上启用订单备注。请按照以下步骤操作，或参阅您的模板的文档，以详细了解如何在您的模板中查找此设置。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '社区团购',
            name: '12',
            address:
              '如果您的屏幕宽度超过 1600 像素，则您的自定义和编辑选项会显示在屏幕右侧。如果您的屏幕宽度小于 1600 像素，则它们将显示在屏幕左侧。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '零售',
            name: '23',
            address: '在销售渠道部分，轻触在线商店。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '商场',
            name: '3',
            address: '选中启用购物车备注。',
            editor: '编辑',
            delete: '删除',
          },
        ],
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
      // 新增修改
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            // const { code, data } = await editGrade({ id: row.id })
            // if (code === 200) {
            //   this.$refs['edit'].showEdit(data)
            // }
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            // const { code } = await deleteGrade({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        } else {
          // if (this.selectRows.length > 0) {
          //   const ids = this.selectRows.map((item) => item.id).join()
          //   this.$baseConfirm('你确定要删除选中项吗', null, async () => {
          //     const { code } = await deleteGrade(ids)
          //     if (code != 200) {
          //       return
          //     }
          //     this.fetchData()
          //   })
          // } else {
          //   this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          // }
        }
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.pageNo = data
      },
      // 多选获取数据   公共部分
      selectBtnRows(data) {
        this.selectRows = data
      },

      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
        console.log(data)
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getGradeList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
