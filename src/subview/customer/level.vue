<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:CustomerLevel:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加会员等级
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
          <el-table-column type="selection" width="50px" />
          <el-table-column
            align="center"
            label="等级图标"
            prop="banner"
            width="80px"
          >
            <template #default="{ row }">
              <img :src="row.icon" style="width: 50px; height: 50px" />
            </template>
          </el-table-column>
          <el-table-column label="等级名称" prop="name" width="150px" />
          <el-table-column label="客户数" prop="count" width="80px" />
          <el-table-column label="整手折扣" prop="discount" width="100px" />
          <el-table-column
            label="散码折扣"
            prop="discount_single"
            width="100px"
          />
          <el-table-column label="是否允许散批" prop="single_buy" width="150px">
            <template #default="{ row }">
              <el-switch
                v-model="row.single_buy"
                active-color="#41B584"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="关闭"
                :inactive-value="0"
                @change="turnOnOff(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" />
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:CustomerLevel:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/LevelEdit'
  export default {
    components: { Edit },
    data() {
      return {
        // 表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        form: {
          name: '',
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
      // 新增编辑弹窗
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            const { data } = await this.api.getInfoGradeList({ id: row.id })
            this.$refs['edit'].showEdit(data)
          } else {
            this.$refs['edit'].showEdit()
          }
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
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await this.api.delGradeList({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 开启关闭
      async turnOnOff(row) {
        const { code } = await this.api.editGradeList(row)
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
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
        const { data } = await this.api.getGradeList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
