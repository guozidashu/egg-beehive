<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <QYList
      v-if="type == 1"
      :list="list"
      :list-type="listType"
      :state="listLoading"
      :total="total"
    >
      <template #List>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          show-overflow-tooltip
        />

        <el-table-column
          align="center"
          label="跟进员工姓名"
          prop="employee_name"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="跟进时间"
          prop="create_time"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="跟进内容"
          prop="content"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="跟进状态"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <el-form
      v-if="type == 2"
      ref="form"
      label-width="80px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name" style="width: 215px" />
      </el-form-item>
      <el-form-item label="标签排序" prop="order">
        <el-input v-model="form.order" style="width: 215px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { editCorpTag, getFollowList } from '@/api/basic'
  export default {
    name: 'BandEdit',
    data() {
      return {
        type: 0,
        form: {
          order: null, //排序
          status: 1, //1启用 0 禁用
          name: '', //名称
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          order: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        },
        title: '',
        dialogFormVisible: false,
        listType: 2,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    created() {},
    methods: {
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getFollowList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      showEdit(row, type) {
        this.type = type
        if (type == 1) {
          this.fetchData()
        }
        this.dialogFormVisible = true
      },
      close() {
        if (this.type == 1) {
          this.dialogFormVisible = false
          return
        }
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        if (this.type == 1) {
          this.dialogFormVisible = false
          return
        }
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { code } = await editCorpTag(this.form)
            if (code != 200) {
              return
            }
            this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
            this.$emit('fetch-data')
            this.close()
          }
        })
      },
    },
  }
</script>
