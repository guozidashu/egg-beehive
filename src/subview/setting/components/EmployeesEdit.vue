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
      <el-form-item label="账号:" prop="name1">
        <el-input v-model="form.name1" style="width: 215px" />
      </el-form-item>
      <el-form-item label="岗位:" prop="qx">
        <el-select v-model="form.qx">
          <el-option label="设计师" :value="1" />
          <el-option label="管理员" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门:" prop="status1">
        <el-select v-model="form.status1">
          <el-option label="研发部" :value="1" />
          <el-option label="技术部" :value="2" />
          <el-option label="销售部" :value="3" />
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
  // import { updateMeeting, addGoodsList } from '@/api/basic'
  export default {
    name: 'EmployeesEdit',
    data() {
      return {
        typeData: [],
        form: {
          name: '',
          name1: '',
          qx: '',
          status1: '',
          status: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          name1: [{ required: true, trigger: 'blur', message: '请输入账号' }],
          qx: [{ required: true, trigger: 'blur', message: '请选择岗位' }],
          status1: [{ required: true, trigger: 'blur', message: '请选择部门' }],
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
              // const { code } = await addGoodsList(this.form)
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
