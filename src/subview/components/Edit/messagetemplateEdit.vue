<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="form.title"
          style="width: 200px"
          @input="form.title = $WhitespaceRemoval(form.title)"
        />
      </el-form-item>
      <el-form-item label="所属员工" prop="employee_id">
        <el-select v-model="form.employee_id" style="width: 200px">
          <el-option
            v-for="(item, index) in selectDataList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">实裁数预警</el-radio>
          <el-radio :label="2">库存预警</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否推送">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        selectDataList: [],
        form: {
          id: '', // 模板id 编辑时传
          employee_id: '', // 员工id,
          title: '', // 标题
          type: 2, // 类型 1=实裁数预警 2=库存预警
          remark: '', // 备注
          status: 0, // 是否开启推送 0=否 1=是
        },
        rules: {
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
          employee_id: [
            { required: true, trigger: 'blur', message: '请选择员工' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
      this.selectData()
    },
    methods: {
      // 获取下拉框数据
      async selectData() {
        const { data } = await this.api.getEmployeeList({
          name: '',
          page: -1,
          pageSize: 20,
          department_id: '', //部门id
          role: null, //岗位id
          status: 1, // 状态 1=在职 0=停职 默认传1
        })
        this.selectDataList = data
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
              const { code } = await this.api.savePush(this.form)
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
              const { code } = await this.api.savePush(this.form)
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
