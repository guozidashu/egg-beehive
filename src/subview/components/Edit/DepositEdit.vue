<!-- <template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="客户名称" prop="name">
        <el-input v-model="form.name" style="width: 215px" />
      </el-form-item>
      <el-form-item label="客户手机号" prop="phone">
        <el-input v-model="form.phone" style="width: 215px" />
      </el-form-item>
      <el-form-item label="客户分类" prop="customer_type_id">
        <el-select v-model="form.customer_type_id" placeholder="请选择客户分类">
          <el-option
            v-for="(item, index) in selectData.customer_type"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户等级" prop="customer_grade_id">
        <el-select
          v-model="form.customer_grade_id"
          placeholder="请选择客户等级"
        >
          <el-option
            v-for="(item, index) in selectData.customer_grade"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户保证金" prop="margin_money">
        <el-input v-model="form.margin_money" disabled style="width: 215px" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注"
          :rows="2"
          style="width: 215px"
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
  import { editMarginAdd, getCommonAllList } from '@/api/basic'
  export default {
    name: 'BandEdit',
    data() {
      return {
        form: {
          phone: '',
          name: '',
          customer_grade_id: null, //等级id
          customer_type_id: null, //类型id
          remark: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          customer_grade_id: [
            { required: true, trigger: 'blur', message: '请选择客户等级' },
          ],
          customer_type_id: [
            { required: true, trigger: 'blur', message: '请选择客户分类' },
          ],
          phone: [
            { required: true, trigger: 'blur', message: '请输入手机号' },
            {
              pattern: /^1[3456789]\d{9}$/,
              trigger: 'blur',
              message: '请输入正确的手机号',
            },
          ],
          margin_money: [
            { required: true, trigger: 'blur', message: '请输入保证金' },
          ],
        },
        title: '',
        dialogFormVisible: false,
        selectData: [],
      }
    },
    watch: {
      form: {
        handler: function (newVal) {
          if (newVal.customer_grade_id != null) {
            this.form.margin_money = this.selectData.customer_grade.find(
              (item) => item.id == newVal.customer_grade_id
            ).margin_money
          }
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.getTypeList()
    },
    methods: {
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'customer_grade,customer_type',
        })
        this.selectData = data
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
              const { code } = await editMarginAdd(this.form)
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
              const { code } = await editMarginAdd(this.form)
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
</script> -->
