<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="员工姓名:" prop="name">
        <el-input v-model="form.name" style="width: 215px" />
      </el-form-item>
      <el-form-item label="岗位:" prop="role">
        <el-select v-model="form.role" collapse-tags multiple>
          <el-option
            v-for="(item, index) in selectList.role"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门:" prop="department_id">
        <el-select v-model="form.department_id">
          <el-option
            v-for="(item, index) in selectList.department"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="每月成本:">
        <el-input
          v-model="form.wages_month"
          style="width: 215px"
          @input="form.wages_month = $moneyFormatInput(form.wages_month)"
        />
      </el-form-item>
      <el-form-item label="每日成本:">
        <el-input
          v-model="form.wages"
          style="width: 215px"
          @input="form.wages = $moneyFormatInput(form.wages)"
        />
      </el-form-item>
      <el-form-item label="工作制:">
        <el-input
          v-model="form.duty"
          style="width: 215px"
          @input="form.duty = $numFormatInput(form.duty)"
        />
      </el-form-item>
      <el-form-item label="其它福利:">
        <el-input
          v-model="form.other_benefits"
          style="width: 215px"
          @input="form.other_benefits = $moneyFormatInput(form.other_benefits)"
        />
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="form.remark" style="width: 215px" />
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
    name: 'EmployeesEdit',
    data() {
      return {
        typeData: [],
        form: {
          id: null, // 员工id（新增时传空）
          department_id: 1, // 部门id
          name: '', // 员工名称
          role: '', // 岗位
          status: 1, // 状态 1正常 2禁用
          wages: '', // 每日成本
          wages_month: '', // 每月成本
          duty: '', // 工作制
          other_benefits: '', // 其他福利
          remark: '', // 备注
        },
        selectList: [],
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          role: [{ required: true, trigger: 'blur', message: '请选择岗位' }],
          department_id: [
            { required: true, trigger: 'blur', message: '请选择部门' },
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
          if (this.form.role != null) {
            this.form.role = this.form.role.split(',')
            this.form.role = this.form.role.map(Number)
          }
        }
        this.dialogFormVisible = true
        this.getTypeList()
      },
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'role,department',
        })
        this.selectList = data
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.editEmployeeSave(this.form)
            if (code != 200) {
              return
            }
            this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
            this.$emit('fetch-data')
            this.close()
          }
        })
      },
    },
  }
</script>
