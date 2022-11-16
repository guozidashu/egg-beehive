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
      <el-form-item label="状态:">
        <el-switch
          v-model="form.status"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="0"
          style="margin: 0 10px"
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
  import { editEmployeeSave, getCommonAllList } from '@/api/basic'
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
        const { data } = await getCommonAllList({
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
            if (this.title === '添加') {
              const { code } = await editEmployeeSave(this.form)
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
              const { code } = await editEmployeeSave({
                id: this.form.id,
                department_id: this.form.department_id,
                name: this.form.name,
                role: this.form.role,
                status: this.form.status,
              })
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
