<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="仓库名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="是否默认" prop="mr">
        <el-radio-group v-model="form.mr">
          <el-radio :label="1">关闭</el-radio>
          <el-radio :label="0">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="库位" prop="position">
        <el-input v-model="form.position" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { updateWarehouse, addWarehouse } from '@/api/basic'
  export default {
    name: 'DepartmentManagementEdit',
    data() {
      return {
        form: {
          name: '',
          id: '',
          mr: 0,
          position: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          mr: [
            { required: true, trigger: 'change', message: '请选择是否默认' },
          ],
          position: [
            { required: true, trigger: 'blur', message: '请输入库位' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          if (row.mr == 1) {
            this.form = Object.assign({}, row)
          } else {
            this.form = Object.assign({}, row)
          }
        }
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
            if (this.title === '添加') {
              const { code } = await addWarehouse(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              const { code } = await updateWarehouse(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            }
          }
        })
      },
    },
  }
</script>
