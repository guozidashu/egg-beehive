<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form">
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          remark: '', //名称
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '备注'
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.setOrderRemark({
              order_id: this.form.id,
              remark: this.form.remark,
            })
            if (code != 200) {
              return
            }
            this.$baseMessage('添加成功', 'success', 'vab-hey-message-success')
            this.$emit('fetch-data')
            this.close()
          }
        })
      },
    },
  }
</script>
