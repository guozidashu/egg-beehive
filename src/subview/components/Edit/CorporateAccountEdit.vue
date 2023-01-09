<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="账户类型:" prop="type">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="银行" :value="1" />
          <el-option label="支付宝" :value="2" />
          <el-option label="微信" :value="3" />
          <el-option label="其他" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type == 1" label="开户行:" prop="bank_name">
        <el-input v-model="form.bank_name" size="small" style="width: 215px" />
      </el-form-item>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="form.name" size="small" style="width: 215px" />
      </el-form-item>
      <el-form-item label="账户:" prop="account">
        <el-input v-model="form.account" size="small" style="width: 215px" />
      </el-form-item>
      <el-form-item label="是否默认:">
        <el-radio-group v-model="form.is_default">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { editCorporateAccountSavee } from '@/api/basic'
  export default {
    name: 'LevelDeit',
    data() {
      return {
        selectList: [],
        form: {
          id: 0, // 主键id (新增时传0),
          name: '', // 开户人姓名
          bank_name: '', // 开户银行
          account: '', // 账号
          type: null, // 类别 1银行 2支付宝 3微信 4其它
          is_default: 0, // 是否默认 0否 1是
        },
        rules: {
          amount: [{ required: true, trigger: 'blur', message: '请输入金额' }],
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
              const { code } = await editCorporateAccountSavee(this.form)
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
              const { code } = await editCorporateAccountSavee(this.form)
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
