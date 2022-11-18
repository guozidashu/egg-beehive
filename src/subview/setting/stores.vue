<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="营业状态:">
            <el-select v-model="form.status">
              <el-option label="全部" :value="0" />
              <el-option label="营业中" :value="1" />
              <el-option label="停业中" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="合作模式:">
            <el-select v-model="form.cooperate_type">
              <el-option label="直营店" :value="1" />
              <el-option label="联营店" :value="2" />
              <el-option label="加盟店" :value="3" />
              <el-option label="分销店" :value="4" />
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
          <el-table-column label="门店图片" prop="pic" width="150">
            <template slot-scope="{ row }">
              <img :src="row.pic[0]" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="门店名称" prop="name" width="120" />
          <el-table-column label="联系人" prop="person" width="100" />
          <el-table-column label="联系电话" prop="phone" width="150" />
          <el-table-column label="门店地址" prop="dizhi">
            <template #default="{ row }">
              {{ row.province }}{{ row.city }}{{ row.district }}
            </template>
          </el-table-column>
          <el-table-column label="合作模式" prop="cooperate_type" width="120">
            <template #default="{ row }">
              <span v-if="row.status == 1">直营店</span>
              <span v-else-if="row.status == 2">联营店</span>
              <span v-else-if="row.status == 3">加盟店</span>
              <span v-else-if="row.status == 4">分销店</span>
            </template>
          </el-table-column>
          <el-table-column label="营业时间" prop="business_hours">
            <template #default="{ row }">
              <div v-for="(item, index) in row.business_hours" :key="index">
                {{ item }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="营业状态" prop="status" width="150">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                active-color="#41B584"
                active-text="营业"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="停业"
                :inactive-value="0"
                style="margin: 0 10px"
                @change="turnOnOff(row)"
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
              <el-button type="text">停业</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :form="formDrawer" @shuxiandata="refresh" />
    </el-drawer>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/StoresDrawer'
  import { parseTime } from '@/utils'
  import { getStoreList, editChangeStatus } from '@/api/basic'
  export default {
    name: 'Employees',
    components: { List, Form, Drawer },
    data() {
      return {
        drawer: false,
        typeData: {},
        form: {
          name: null, //门店名称
          status: 0, //1开启2关闭0全部
          cooperate_type: null, //1直营店 2联营店 3加盟店 4分销店
          page: 1,
          pageSize: 10,
        },
        formDrawer: {},
        formType: 3,
        listType: 1,
        list: [],
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
      handleQuery() {
        this.fetchData()
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async turnOnOff(row) {
        const { code } = await editChangeStatus({ id: row.id })
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getStoreList(this.form)
        let list = data.data
        list.forEach((item) => {
          console.log(item.business_hours)
          if (item.business_hours != null) {
            item.business_hours = JSON.parse(item.business_hours)
            let arr = []
            item.business_hours.forEach((item) => {
              arr.push(parseTime(item, '{y}-{m}-{d} {h}:{i}'))
            })
            item.business_hours = arr
          }
        })

        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      refresh() {
        this.fetchData()
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
