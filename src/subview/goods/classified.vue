<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="商品分类" prop="region">
            <el-select v-model="form.value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="region">
            <el-select v-model="form.value1" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
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
            label="序列号"
            type="index"
            width="80"
          />
          <el-table-column
            align="center"
            label="分类名称"
            prop="date"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="分类图标"
            prop="name"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img alt="" :src="row.name" style="width: 36px; height: 36px" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="排序"
            prop="address"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="状态"
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
  import Edit from './components/ClassifiedEdit'
  import Form from '@/subview/components/Form'
  // import { getBrandList, editBrand, deleteBrand } from '@/api/basic'
  export default {
    name: 'GoodsClassified',
    components: { List, Edit, Form },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          name: '',
          pageNo: 1,
          pageSize: 10,
          value: '选项9',
          value1: '',
        },
        formType: 4,
        options: [
          {
            value: '选项1',
            label: '美妆个护',
          },
          {
            value: '选项2',
            label: '服饰分类',
          },
          {
            value: '选项3',
            label: '电子数码',
          },
          {
            value: '选项4',
            label: '居家生活',
          },
          {
            value: '选项5',
            label: '家电电器',
          },
          {
            value: '选项6',
            label: '出行交通',
          },
          {
            value: '选项7',
            label: '影音设备',
          },
          {
            value: '选项8',
            label: '餐厨厨房',
          },
          {
            value: '选项9',
            label: '热门推荐',
          },
        ],
        options1: [
          {
            value: '选项1',
            label: '显示',
          },
          {
            value: '选项2',
            label: '隐藏',
          },
        ],

        // 列表数据相关
        selectRows: [],
        listType: 3,
        list: [
          {
            id: 1,
            date: '美妆个护',
            name: 'https://qiniu.crmeb.net/attach/2021/08/f15fd202108091906109162.png',
            address: '200',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 11,
                date: '清洁护理',
                name: 'https://qiniu.crmeb.net/attach/2021/10/eaabb202110151234132234.png',
                address: '100',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 12,
                date: '香水彩妆',
                name: 'https://qiniu.crmeb.net/attach/2021/10/1bd68202110151227129162.png',
                address: '20',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 2,
            date: '服饰分类',
            name: 'https://qiniu.crmeb.net/attach/2021/10/eaabb202110151234132234.png',
            address: '11',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 21,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '12321',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 22,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '21213',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 3,
            date: '电子数码',
            name: 'https://qiniu.crmeb.net/attach/2021/08/03112202108091906082734.png',
            address: '22',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 31,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '12',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 32,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '0',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 4,
            date: '出行交通',
            name: 'https://qiniu.crmeb.net/attach/2021/10/ecd72202110151227202180.png',
            address: '213',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 41,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '44',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 42,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '5',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 5,
            date: '影音设备',
            name: '	https://qiniu.crmeb.net/attach/2021/10/6b059202110151227481558.png',
            address: '89',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 51,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '890',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 52,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '980',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 6,
            date: '餐厨厨房',
            name: 'https://qiniu.crmeb.net/attach/2021/08/5a0f4202108091906099738.png',
            address: '2',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 61,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '122',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 62,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '3',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 7,
            date: '热门推荐',
            name: 'https://qiniu.crmeb.net/attach/2021/08/03112202108091906082734.png',
            address: '4',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 71,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '11',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 72,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '323',
                editor: '编辑',
                delete: '删除',
              },
            ],
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
            // const { code, data } = await editBrand({ id: row.id })
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
            // const { code } = await deleteBrand({ id: row.id })
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
          //     const { code } = await deleteBrand(ids)
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
        // } = await getBrandList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
