<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="年份" prop="year">
        <el-date-picker
          v-model="form.year"
          :clearable="false"
          :default-time="['00:00:00', '23:59:59']"
          format="yyyy-MM-dd"
          placeholder="选择年份"
          type="year"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="款式" prop="name">
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
  // import { updateMeeting, addMeeting } from '@/api/basic'
  export default {
    name: 'LevelDeit',
    data() {
      return {
        form: {
          name: '',
          id: '',
          year: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          year: [
            {
              type: 'date',
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
              // const { code } = await addMeeting(this.form)
              // if (code != 200) {
              //   return
              // }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              // const { code } = await updateMeeting(this.form)
              // if (code != 200) {
              //   return
              // }
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
