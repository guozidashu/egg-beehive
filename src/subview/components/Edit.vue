<template>
  <el-dialog :title="title" :visible="state" width="500px" @close="close">
    <el-form ref="form" label-width="80px" :model="editForm" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="editForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  // import { updateWave, addWave } from '@/api/basic'
  export default {
    name: 'ComponentsEdit',
    props: {
      form: {
        type: Object,
        default: () => {},
      },
      state: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        editForm: this.form,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
      }
    },
    created() {},
    methods: {
      // showEdit(row) {
      //   if (!row) {
      //     this.title = '添加'
      //   } else {
      //     this.title = '编辑'
      //     this.form = Object.assign({}, row)
      //   }
      //   this.dialogFormVisible = true
      // },
      // close() {
      //   this.$refs['form'].resetFields()
      //   this.form = this.$options.data().form
      //   this.dialogFormVisible = false
      // },
      // save() {
      //   this.$refs['form'].validate(async (valid) => {
      //     if (valid) {
      //       if (this.title === '添加') {
      //         const { code } = await addWave(this.form)
      //         if (code != 200) {
      //           return
      //         }
      //         this.$baseMessage(
      //           '新增成功',
      //           'success',
      //           'vab-hey-message-success'
      //         )
      //         this.$emit('fetch-data')
      //         this.close()
      //       } else {
      //         const { code } = await updateWave(this.form)
      //         if (code != 200) {
      //           return
      //         }
      //         this.$baseMessage(
      //           '修改成功',
      //           'success',
      //           'vab-hey-message-success'
      //         )
      //         this.$emit('fetch-data')
      //         this.close()
      //       }
      //     }
      //   })
      // },
    },
  }
</script>
