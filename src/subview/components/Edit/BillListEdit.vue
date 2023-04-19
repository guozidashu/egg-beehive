<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="收支类别:" prop="category_id">
        <el-cascader
          v-model="form.category_id"
          :options="options"
          placeholder="请选择收支类别"
          :props="{ expandTrigger: 'hover' }"
        />
        <!-- <el-select v-model="form.category_id" placeholder="请选择收支类别">
          <el-option
            v-for="(item, index) in selectList.finance_category"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select> -->
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
      <el-form-item label="金额:" prop="amount">
        <el-input
          v-model="form.amount"
          placeholder="请输入金额"
          style="width: 220px"
          @input="form.amount = $moneyFormatInput(form.amount)"
        />
      </el-form-item>
      <el-form-item label="报销凭证:" prop="voucher_image">
        <el-button type="primary" @click="handleShow()">图片上传</el-button>
      </el-form-item>
      <el-form-item v-if="form.voucher_image">
        <el-image :src="form.voucher_image" style="width: 80px; height: 80px">
          <div slot="error" class="el-image__error">暂无图片</div>
        </el-image>
      </el-form-item>
      <el-form-item label="备注:">
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
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </el-dialog>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  export default {
    components: {
      VabUpload,
    },
    data() {
      return {
        options: [],
        selectList: [],
        form: {
          id: 0, // 主键id (新增时传0),
          category_id: null, // 分类id
          corporate_account_id: null, // 结算账户id
          amount: '', // 金额
          remark: '', // 备注信息
          voucher_image: '', // 凭证图片
        },
        rules: {
          amount: [{ required: true, trigger: 'blur', message: '请输入金额' }],
          category_id: [
            { required: true, trigger: 'blur', message: '请选择收支类别' },
          ],
          corporate_account_id: [
            { required: true, trigger: 'blur', message: '请选择结算账户' },
          ],
          voucher_image: [
            { required: true, trigger: 'blur', message: '请上传报销凭证' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      getSon(data) {
        this.form.voucher_image = data[0]
        this.$forceUpdate()
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'corporate_account',
        })
        this.selectList = data
        this.getDefault()
      },
      async getFinance() {
        const { data } = await this.api.getFinanceCategory()
        data.forEach((item) => {
          item.value = item.type
          item.label = item.type_text
          if (item.children) {
            item.children.forEach((child) => {
              child.value = child.id
              child.label = child.name
            })
          }
        })
        this.options = data
      },
      async getDefault() {
        const { data } = await this.api.getDefaultCorporateAccount()
        this.form.corporate_account_id = data.id
      },
      async showEdit(row) {
        this.getFinance()
        this.getTypeList()
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
          this.form.category_id = [row.category_type, row.category_id]
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
            this.form.category_id = this.form.category_id[1]
            if (this.title === '添加') {
              const { code } = await this.api.editBillSave(this.form)
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
              const { code } = await this.api.editBillSave(this.form)
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
