<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="权限分组:">
        <el-select v-model="form.group_id" placeholder="请选择" prop="group_id">
          <el-option
            v-for="item in typeData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="form.status"
          active-color="#41B584"
          active-text="正常"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="禁用"
          :inactive-value="2"
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
  import { addAdminSave, getRoleList } from '@/api/basic'
  export default {
    name: 'BrandEdit',
    data() {
      return {
        typeData: [],
        form: {
          status: 0,
        },
        rules: {
          username: [
            { required: true, trigger: 'blur', message: '请输入管理员名称' },
          ],
          password: [
            { required: true, trigger: 'blur', message: '请输入管理员密码' },
          ],
          status: [{ required: true, trigger: 'blur', message: '请选择状态' }],
          group_id: [
            { required: true, trigger: 'blur', message: '请选择权限分组' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
      this.getSelectList()
    },
    methods: {
      getSelectList() {
        getRoleList().then((res) => {
          this.typeData = res.data
        })
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
              this.form.id = 0
              const { code } = await addAdminSave(this.form)
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
              const { code } = await addAdminSave(this.form)
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
