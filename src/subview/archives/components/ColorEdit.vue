<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item v-if="type === 1" label="颜色组分类" prop="name">
        <el-select v-model="form.select" placeholder="请选择分类">
          <el-option label="分类1" :value="1" />
          <el-option label="分类2" :value="2" />
          <el-option label="分类3" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type === 1" label="颜色名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item v-if="type === 2" label="颜色组名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item v-if="type === 2" label="排序" prop="name">
        <el-input v-model="form.id" style="width: 215px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { updateWave, addWave } from '@/api/basic'
  export default {
    name: 'TagsEdit',
    data() {
      return {
        form: {
          name: '',
          select: '',
          id: '',
        },
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row, type) {
        this.type = type
        if (row === 'add') {
          if (type === 1) {
            this.title = '添加颜色'
          } else {
            this.title = '添加颜色组'
          }
        } else {
          if (type === 1) {
            this.title = '编辑颜色'
          } else {
            this.title = '编辑颜色组'
          }
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
              const { code } = await addWave(this.form)
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
              const { code } = await updateWave(this.form)
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
