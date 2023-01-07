<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="收支类别:" prop="category_id">
        <el-select v-model="form.category_id" placeholder="请选择收支类别">
          <el-option
            v-for="(item, index) in selectList.finance_category"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="结算账户:" prop="corporate_account_id">
        <el-select
          v-model="form.corporate_account_id"
          placeholder="请选择结算账户"
        >
          <el-option
            v-for="(item, index) in selectList.corporate_account"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input
          v-model="form.amount"
          placeholder="请输入金额"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注"
          :rows="2"
          style="width: 220px"
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
  import { editBillSave, getCommonAllList } from '@/api/basic'
  export default {
    name: 'LevelDeit',
    data() {
      return {
        selectList: [],
        form: {
          id: 0, // 主键id (新增时传0),
          category_id: null, // 分类id
          corporate_account_id: null, // 结算账户id
          amount: '', // 金额
          remark: '', // 备注信息
        },
        rules: {
          amount: [{ required: true, trigger: 'blur', message: '请输入金额' }],
          category_id: [
            { required: true, trigger: 'blur', message: '请选择收支类别' },
          ],
          corporate_account_id: [
            { required: true, trigger: 'blur', message: '请选择结算账户' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
      this.getTypeList()
    },
    methods: {
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'finance_category,corporate_account',
        })
        this.selectList = data
      },
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
              const { code } = await editBillSave(this.form)
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
              const { code } = await editBillSave(this.form)
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
