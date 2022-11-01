<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="选择类型：">
        <el-radio-group v-model="form.state">
          <el-radio :label="0">发货</el-radio>
          <el-radio :label="1">送货</el-radio>
          <el-radio :label="2">无需配送</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发货类型：">
        <el-radio-group v-model="form.state1">
          <el-radio :label="0">手动填写</el-radio>
          <el-radio :label="1">电子面单打印</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="快递公司：">
        <el-select v-model="form.state2" placeholder="请选择快递公司">
          <el-option label="圆通" value="1" />
          <el-option label="韵达" value="2" />
          <el-option label="邮政" value="3" />
          <el-option label="顺丰" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="快递单号：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请选择快递单号"
          style="width: 215px"
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
  import { updateWave, addWave } from '@/api/basic'
  export default {
    name: 'BandEdit',
    data() {
      return {
        form: {
          name: '',
          id: '',
          state: 0,
          state1: 0,
          state2: 0,
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
        title: '订单发送货',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (row) {
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
