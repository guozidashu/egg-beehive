<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="组别" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择组别">
          <el-option label="童装" :value="1" />
          <el-option label="服装" :value="2" />
          <el-option label="鞋子" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="尺码名称" prop="name">
        <el-input v-model="form.name" style="width: 220px" />
      </el-form-item>
      <el-form-item label="类型" prop="lx">
        <el-checkbox v-model="form.lx">整手</el-checkbox>
      </el-form-item>
      <el-form-item label="尺码" prop="size">
        <el-input v-model="form.size" style="width: 220px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { updateSize, addSize } from '@/api/basic'
  export default {
    name: 'LevelDeit',
    data() {
      return {
        form: {
          name: '',
          id: '',
          lx: true,
          size: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
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
          if (row.lx == 1) {
            this.form.lx = true
          } else {
            this.form.lx = false
          }
          console.log(this.form)
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
            if (this.form.lx == true) {
              this.form.lx = 1
            } else {
              this.form.lx = 0
            }
            if (this.form.lx == true) {
              this.form.type = '1'
            } else {
              this.form.type = '0'
            }
            this.form.sizeName = this.form.name
            this.form.group = this.form.pid
            if (this.title === '添加') {
              const { code } = await addSize(this.form)
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
              const { code } = await updateSize(this.form)
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
