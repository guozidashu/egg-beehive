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
          <el-form-item label="季节分类:">
            <el-select v-model="form.season_id" size="small">
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="波段分类:">
            <el-select v-model="form.band_id" size="small">
              <el-option
                v-for="(item, index) in selectList.band"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年份分类:">
            <el-select v-model="form.year_id" size="small">
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌分类:">
            <el-select v-model="form.brand_id" size="small">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="目标ID"
            prop="plan_id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="目标名称"
            prop="plan_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="目标总数"
            prop="plan_total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="完成数量"
            prop="completed_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:ProductPlanning:view']"
                type="text"
                @click="handleDetail(row)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" :drawer-inof-id="drawerInofId" />
    </el-drawer>
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/ProductPlanningDrawer'
  import {
    getPlanList,
    getCommonAllList,
    // getPlanDetails,
    getgetDesignerList,
  } from '@/api/basic'
  export default {
    name: 'ProductPlanning',
    components: { List, Form, Drawer },
    data() {
      return {
        drawer: false,
        drawerInof: [],
        drawerInofId: '',
        selectList: [],
        form: {
          page: 1,
          pageSize: 10,
          brand_id: null, // 品牌id
          year_id: null, // 年份id
          season_id: null, // 季节id
          band_id: null, // 波段id
          name: '', // 任务名称
        },
        formType: 4,
        listType: 1,
        list: [],
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
      this.getTypeList()
      this.fetchData()
      this.getTypeList1()
    },
    methods: {
      async handleDetail(row) {
        // const { data } = await getPlanDetails({
        //   plan_id: 1, // 目标id
        //   designer_id: null, // 设计师id
        // })
        this.drawerInofId = row.plan_id
        this.drawer = true
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,year,season,band',
        })
        this.selectList = data
      },
      async getTypeList1() {
        const { data } = await getgetDesignerList()
        this.selectList1 = this.drawerInof = data.designer
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getPlanList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
