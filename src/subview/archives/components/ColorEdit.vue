<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="颜色名称" prop="name">
        <el-input v-model="form.name" style="width: 220px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import {
    editColorGroupList,
    addColorGroupList,
    editColorList,
    addColorList,
  } from '@/api/basic'
  export default {
    name: 'LevelDeit',
    data() {
      return {
        form: {
          name: '',
          id: 0,
          sort: 1,
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          year: [
            {
              type: 'string',
              required: true,
              message: '请选择年份',
              trigger: 'change',
            },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(type, row) {
        if (type == 1) {
          if (!row) {
            this.title = '颜色组添加'
          } else {
            this.title = '颜色组编辑'
            this.form = Object.assign({}, row)
          }
        } else {
          if (!row.id) {
            this.form.pid = row
            this.title = '颜色添加'
          } else {
            this.title = '颜色编辑'
            console.log(row)
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
            if (this.title === '颜色组添加') {
              const { code } = await addColorGroupList(this.form)
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
            } else if (this.title === '颜色组编辑') {
              const { code } = await editColorGroupList(this.form)
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
            } else if (this.title === '颜色添加') {
              console.log(1111, this.form)
              const { code } = await addColorList(this.form)
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
            } else if (this.title === '颜色编辑') {
              this.form.pid = Number(this.form.pid)
              const { code } = await editColorList(this.form)
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
