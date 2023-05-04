<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:ArchivesBandlist:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
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
            label="轮播ID"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column label="图片地址" prop="img" width="150">
            <template #default="{ row }">
              <el-image
                prop="url"
                :src="row.img"
                style="width: 80px; height: 80px"
              >
                <div slot="error" class="el-image__error">上传轮播</div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="跳转链接"
            prop="url"
            show-overflow-tooltip
          />

          <el-table-column label="状态" prop="status" width="150">
            <template #default="{ row }">
              <el-tag v-if="row.status == 1">开启</el-tag>
              <el-tag v-else type="danger">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
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
              <el-button
                v-has-permi="['btn:ArchivesBandlist:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesBandlist:del']"
                type="text"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 新增编辑 -->
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/BannerEdit'
  export default {
    components: { Edit },
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          id: 0,
          name: '',
          page: 1,
          pageSize: 10,
        },
        listType: 2,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {},
    created() {
      this.fetchData()
    },
    methods: {
      // 新增编辑弹出
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
      // 表单查询
      handleQuery() {
        this.fetchData()
      },
      // 重置表单
      resetForm() {
        this.form = this.$options.data().form
      },
      // 删除操作
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await this.api.delBannerDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getBannerList()
        this.list = data.list
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
