<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <!-- 查询条件 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </QYForm>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in list" :key="index" :span="6">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{ item.name }}</span>
            </div>
            <div style="display: flex; justify-content: space-between">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="item.avatar"
                  style="width: 200px; height: 200px"
                />
                <el-image
                  :src="item.avatar"
                  style="width: 50px; height: 50px; margin: 10px 0 0 10px"
                />
              </el-tooltip>
              <div>
                <div style="margin: 5px">积分：{{ item.integral }}</div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin: 5px;
                  "
                >
                  <div>积分来源：</div>
                  <div
                    style="
                      width: 200px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ item.remark }}
                  </div>
                </div>
                <div style="margin: 5px">时间：{{ item.create_time }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 页数，条数，表单查询条件 选中数据 列表类型 列表数据 列表加载状态 总条数
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
      // 条数
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 获取列表
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getEmployeeIntegralList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
