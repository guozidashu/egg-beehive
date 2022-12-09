<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <QYForm :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="状态:">
            <el-select v-model="form.status">
              <el-option label="全部" :value="0" />
              <el-option label="开启" :value="1" />
              <el-option label="关闭" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入配送名称"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDetail('add')"
          >
            添加
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <QYList
        ref="multipleTable"
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
          <el-table-column type="selection" width="55" />
          <el-table-column label="ID" prop="id" width="80" />

          <el-table-column label="名称" prop="name" width="180" />
          <el-table-column label="区域及价格" prop="price">
            <template slot-scope="{ row }">
              <span style="font-weight: 700; color: #000">
                {{ row.price.text }}
              </span>
              <div v-if="row.price.state === 1">
                {{ row.price.weight }}克以下{{ row.price.price }}元，每超出{{
                  row.price.weight1
                }}克加{{ row.price.price1 }}元
              </div>
              <div v-else>全部</div>
            </template>
          </el-table-column>
          <el-table-column label="满额包邮" prop="bao" width="120" />
          <el-table-column label="序号" prop="num" width="80" />
          <el-table-column label="状态" prop="zt" width="100">
            <template #default="{ row }">
              <el-switch
                v-model="row.zt"
                active-color="#41B584"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="关闭"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :form="formDrawer" />
    </el-drawer>
  </div>
</template>

<script>
  import Drawer from './components/DistributionDrawer'
  // import { getStaffList } from '@/api/basic'
  export default {
    name: 'Distribution',
    components: { Drawer },
    data() {
      return {
        drawer: false,
        typeData: {},
        form: {
          name: '',
          page: 1,
          pageSize: 10,
          status: 0,
        },
        formDrawer: {
          title: '',
          name: '',
          phone: '',
          dizhi: '',
          img: '',
          status: 0,
          address: '',
        },
        formType: 3,
        listType: 1,
        list: [
          {
            id: '8',
            name: '普通快递',
            state: '按重量',
            price: {
              text: '全国（默认运费）：',
              state: 1,
              weight: 1000,
              price: 0,
              weight1: 1000,
              price1: 0,
            },
            bao: '不开启',
            num: '0',
            zt: '开启',
          },
          {
            id: '9',
            name: '到店自提',
            state: '按件数',
            price: {
              text: '自提门店：',
              state: 2,
            },
            bao: '不开启',
            num: '0',
            zt: '开启',
          },
        ],
        downloadLoading: false,
        exclList: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        //表单筛选条件变化实时刷新列表
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
      handleQuery() {},
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getStaffList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
        this.list.forEach((item) => {
          if (item.price.state === 1) {
            item.priceText =
              item.price.text +
              item.price.weight +
              '克以下' +
              item.price.price +
              '元，每超出' +
              item.price.weight1 +
              '克加' +
              item.price.price1 +
              '元'
          } else {
            item.priceText = item.price.text + '全部'
          }
        })
      },
      // 详情抽屉
      handleDetail(row) {
        if (row === 'add') {
          this.formDrawer.title = '新增配送方式'
        } else {
          this.formDrawer = row
          this.formDrawer.title = '编辑配送方式'
        }
        this.drawer = true
      },
      // 新增修改
      // async handleEdit(row) {
      //   this.$refs.edit.typeData = this.typeData
      //   if (row === 'add') {
      //     this.$refs['edit'].showEdit()
      //   } else {
      //     this.$refs['edit'].showEdit(row)
      //   }
      // },
      // 导出
      handleSelectionChange(val) {
        this.exclList = val
      },
      handleDownload() {
        if (this.exclList.length) {
          this.downloadLoading = true
          import('@/utils/excel').then((excel) => {
            const tHeader = ['Id', '名称', '区域及价格', '满额包邮', '状态']
            const filterVal = ['id', 'name', 'priceText', 'bao', 'zt']
            const list = this.exclList
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename,
            })
            this.$refs.multipleTable.$children[0].clearSelection()
            this.downloadLoading = false
          })
        } else {
          this.$baseMessage('请至少选择一行', 'error', 'vab-hey-message-error')
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>
