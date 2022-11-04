<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="仓库名称" prop="name">
        <el-input v-model="form.name" style="width: 215px" />
      </el-form-item>
      <el-form-item label="仓库类型" prop="type_id">
        <el-radio-group v-model="form.type_id">
          <el-radio :label="1" style="margin: 10px 5px">样板仓库</el-radio>
          <el-radio :label="3">成品仓库</el-radio>
          <el-radio :label="4">面料仓库</el-radio>
          <el-radio :label="5">辅料仓库</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否默认" prop="isdefault">
        <el-radio-group v-model="form.isdefault">
          <el-radio :label="1">关闭</el-radio>
          <el-radio :label="0">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" style="width: 215px" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" style="width: 215px" />
      </el-form-item>
      <el-form-item>
        注：一种仓库类型，仅可全局默认一个仓库，如需要灵活，可在操作人员设置关联
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { editArchiveList } from '@/api/basic'
  export default {
    name: 'DepartmentManagementEdit',
    data() {
      return {
        form: {
          name: '',
          type_id: 1,
          isdefault: 0,
          sort: 0,
          remark: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
          remark: [{ required: true, trigger: 'blur', message: '请输入备注' }],
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
          this.form = Object.assign({}, row)
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
              const { code } = await editArchiveList(this.form)
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
              const { code } = await editArchiveList(this.form)
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
