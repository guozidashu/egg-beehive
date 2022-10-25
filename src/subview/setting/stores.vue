<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="状态:">
            <el-select v-model="form.status">
              <el-option label="全部" :value="0" />
              <el-option label="营业中" :value="1" />
              <el-option label="停业中" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入门店名称"
              style="width: 215px"
            />
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
            @click="handleDetail('add')"
          >
            添加门店
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
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="门店名称" prop="name" width="200" />
          <el-table-column label="门店图片" prop="img">
            <template slot-scope="{ row }">
              <img :src="row.img" style="width: 200px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="门店电话/地址" prop="dizhi">
            <template slot-scope="{ row }">
              <span>{{ row.men.phone }}</span>
              <p>{{ row.men.dizhi }}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="time" />
          <el-table-column label="状态" prop="zhuangtai" width="150" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">编辑</el-button>
              <el-button type="text">停业</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :form="formDrawer" />
    </el-drawer>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/StoresDrawer'
  // import { getStaffList } from '@/api/basic'
  export default {
    name: 'Employees',
    components: { List, Form, Drawer },
    data() {
      return {
        drawer: false,
        typeData: {},
        form: {
          name: '',
          pageNo: 1,
          pageSize: 10,
          status: 0,
        },
        formDrawer: {
          name: '',
          phone: '',
          dizhi: '',
          img: '',
          status: 0,
          address: '',
          title: '',
        },
        formType: 3,
        listType: 1,
        list: [
          {
            id: '1',
            name: '下沙店',
            zhuangtai: '营业中',
            men: {
              phone: '268-1185',
              dizhi: '下沙街道白羊小区门口2栋11-11',
            },
            time: '2022-03-15 14:06',
            img: 'https://img0.baidu.com/it/u=286715445,3841954973&fm=253&fmt=auto&app=120&f=JPEG?w=674&h=500',
          },
          {
            id: '2',
            name: '西湖店',
            zhuangtai: '营业中',
            men: {
              phone: '268-1185',
              dizhi: '西华文化中心广场C座A-1',
            },
            time: '2022-03-15 14:06',
            img: 'https://img0.baidu.com/it/u=4178934027,994064546&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=458',
          },
          {
            id: '3',
            name: '金沙湖店',
            zhuangtai: '营业中',
            men: {
              phone: '268-1185',
              dizhi: '幸福里小区门口边上3-11',
            },
            time: '2022-03-15 14:06',
            img: 'https://img2.baidu.com/it/u=2634194466,1574358241&fm=253&fmt=auto&app=120&f=JPEG?w=668&h=504',
          },
          {
            id: '4',
            name: '尚品折扣店',
            zhuangtai: '营业中',
            men: {
              phone: '268-1185',
              dizhi: '尚品商场2楼-3-0-2',
            },
            time: '2022-03-15 14:06',
            img: 'https://img2.baidu.com/it/u=2677049865,3831399706&fm=253&fmt=auto&app=138&f=JPEG?w=468&h=312',
          },
        ],
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
        this.form.pageNo = data
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
      },
      // 详情抽屉
      handleDetail(row) {
        if (row === 'add') {
          this.formDrawer = {}
          this.formDrawer.title = '添加门店'
          this.drawer = true
        } else {
          this.formDrawer = row
          this.formDrawer.title = '编辑门店'
          this.drawer = true
        }
      },
    },
  }
</script>
