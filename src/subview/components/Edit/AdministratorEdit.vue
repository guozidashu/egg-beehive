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
      <el-form-item label="绑定手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <!-- <el-form-item label="短信验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码">
          <el-button v-if="sending" slot="append" @click="getCode">
            获取验证码
          </el-button>
          <el-button v-else slot="append" :disabled="disabled">
            {{ second }}秒后获取
          </el-button>
        </el-input>
      </el-form-item> -->
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
        // sending: true, //是否发送验证码
        // disabled: false, //是否禁发验证码
        // second: 59, //倒计时间
        typeData: [],
        form: {
          status: 0,
        },
        rules: {
          code: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
          phone: [
            { required: true, trigger: 'blur', message: '请输入手机号' },
            {
              pattern: /^1[3456789]\d{9}$/,
              trigger: 'blur',
              message: '手机号格式不正确',
            },
          ],
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
      // 获取短信验证码
      // async getCode() {
      //   // if (this.form_phone.verify == '') {
      //   //   this.$message.error('请输入验证码')
      //   //   return
      //   // }
      //   if (this.form.phone == '') {
      //     this.$message.error('请输入手机号')
      //     return
      //   }
      //   if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
      //     this.$message.error('手机号格式不正确')
      //     return
      //   }
      //   const { code } = await this.api.getPhoneLogin({
      //     phone: this.form.phone,
      //   })
      //   if (code == 200) {
      //     this.$message.success('发送成功')
      //     this.sending = false
      //     this.disabled = true
      //     this.timeDown()
      //   }
      // },
      // //倒计时
      // timeDown() {
      //   let result = setInterval(() => {
      //     --this.second
      //     if (this.second < 0) {
      //       clearInterval(result)
      //       this.sending = true
      //       this.disabled = false
      //       this.second = 59
      //     }
      //   }, 1000)
      // },
      getSelectList() {
        this.api.getRoleList().then((res) => {
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
              const { code } = await this.api.addAdminSave(this.form)
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
              const { code } = await this.api.addAdminSave(this.form)
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
