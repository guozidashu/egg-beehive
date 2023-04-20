<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding: 20px 20px 0 20px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <el-form ref="form" :inline="true">
        <el-form-item label="店铺名称：">
          <el-input
            v-model="form.shop_name"
            placeholder="请输入店铺名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="所属平台：">
          <el-input
            v-model="form.shop_site"
            placeholder="请输入所属平台"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleQuery">
            查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="resetForm">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        "
      >
        <div>
          <el-button
            v-has-permi="['btn:ArchivesBrand:add']"
            size="small"
            type="primary"
            @click="handleEdit()"
          >
            同步聚水潭店铺
          </el-button>
          <el-button plain type="info">公司编号：{{ list[1].co_id }}</el-button>
        </div>
        <div style="padding-top: 10px">
          平台授权说明
          <el-popover placement="right" trigger="hover">
            <div style="font-size: 12px">测试</div>
            <vab-icon
              slot="reference"
              icon="question-line"
              style="position: relative; top: -2px; font-size: 14px"
            />
          </el-popover>
        </div>
      </div>
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" type="index" width="50" />
          <el-table-column align="center" label="店铺编号" prop="shop_id" />
          <el-table-column align="center" label="店铺名称" prop="shop_name" />
          <el-table-column align="center" label="所属平台" prop="shop_site" />
          <el-table-column align="center" label="授权账号" prop="nick" />
          <el-table-column
            align="center"
            label="授权过期时间"
            prop="session_expired"
          />
          <el-table-column align="center" label="店铺简称" prop="short_name" />
          <el-table-column align="center" label="创建时间" prop="created" />
          <el-table-column
            align="center"
            label="更新时间戳"
            prop="create_time"
          />
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
          shop_name: '', //店铺名称
          shop_site: '', //所属平台
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
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
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
        const { data } = await this.api.getjstShopList(this.form)
        this.list = data
        this.total = data.length
        this.listLoading = false
      },
    },
  }
</script>
