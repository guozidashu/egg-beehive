<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:ArchivesBrand:add']"
            size="small"
            type="primary"
            @click="handleEdit()"
          >
            同步
          </el-button>
        </el-form-item>
      </el-form>
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column label="店铺ID" prop="shop_id" width="80" />
          <el-table-column label="店铺名称" prop="shop_name" />
          <el-table-column label="公司编号" prop="co_id" />

          <el-table-column label="店铺网点" prop="shop_site" />
          <el-table-column label="店铺网址" prop="shop_url" />
          <el-table-column label="创建时间" prop="created" />
          <el-table-column label="主账号" prop="nick" />

          <el-table-column
            label="授权过期时间"
            prop="session_expired"
            width="120"
          />
          <el-table-column
            label="会话用户编号"
            prop="session_uid"
            width="120"
          />
          <el-table-column label="店铺简称" prop="short_name" />
          <el-table-column label="更新时间戳" prop="create_time" />
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'ArchivesBrand',
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        form: {
          page: 1,
          pageSize: 10,
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
      this.fetchData()
    },
    methods: {
      // 同步
      async handleEdit() {
        const { data, code } = await this.api.jstShopSync()
        if (code == 200) {
          this.$message.success('同步成功')
          this.fetchData()
        } else {
          this.$message.error('同步失败')
        }
      },
      // 分页
      changeBtnPage(data) {
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getjstShopList()
        this.list = data
        this.total = data.length
        this.listLoading = false
      },
    },
  }
</script>
