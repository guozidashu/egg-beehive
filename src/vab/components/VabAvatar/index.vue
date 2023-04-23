<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar" />
      <div class="user-name">
        <span class="hidden-xs-only">{{ username }}</span>
        <vab-icon
          class="vab-dropdown"
          :class="{ 'vab-dropdown-active': active }"
          icon="arrow-down-s-line"
        />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- <el-dropdown-item command="personalCenter">
          <vab-icon icon="user-line" />
          {{ translateTitle('个人中心') }}
        </el-dropdown-item> -->
        <el-dropdown-item command="changePassword">
          <vab-icon icon="user-line" />
          {{ translateTitle('修改密码') }}
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <vab-icon icon="logout-circle-r-line" />
          {{ translateTitle('退出登录') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <el-dialog
      :append-to-body="true"
      :title="title"
      :visible.sync="changePasswordVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="验证码" prop="verify" style="position: relative">
          <el-input
            v-model="form.verify"
            placeholder="请输入图片验证码"
            tabindex="3"
            type="text"
          >
            <template slot="append">
              <el-image :src="codeUrl" style="width: 100px" @click="changeCode">
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            @input="form.phone = $numFormatInput(form.phone)"
          />
        </el-form-item>
        <el-form-item label="短信验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码">
            <el-button v-if="sending" slot="append" @click="getCode">
              获取验证码
            </el-button>
            <el-button v-else slot="append" :disabled="disabled">
              {{ second }}秒后获取
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="账户" prop="account">
          <el-input v-model="form.account" disabled />
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item> -->
        <el-form-item label="新密码" prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model.trim="form.password"
            :placeholder="translateTitle('请输入密码')"
            tabindex="2"
            :type="passwordType"
          >
            <template #prefix>
              <vab-icon icon="lock-line" />
            </template>
            <template v-if="passwordType === 'password'" #suffix>
              <vab-icon
                class="show-password"
                icon="eye-off-line"
                @click="handlePassword"
              />
            </template>
            <template v-else #suffix>
              <vab-icon
                class="show-password"
                icon="eye-line"
                @click="handlePassword"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input
            :key="passwordType1"
            ref="password1"
            v-model.trim="form.password1"
            :placeholder="translateTitle('请输入密码')"
            tabindex="2"
            :type="passwordType1"
          >
            <template #prefix>
              <vab-icon icon="lock-line" />
            </template>
            <template v-if="passwordType1 === 'password'" #suffix>
              <vab-icon
                class="show-password"
                icon="eye-off-line"
                @click="handlePassword1"
              />
            </template>
            <template v-else #suffix>
              <vab-icon
                class="show-password"
                icon="eye-line"
                @click="handlePassword1"
              />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </template>
    </el-dialog>
  </el-dropdown>
</template>

<script>
  import { editChangePassword } from '@/api/basic'
  import { translateTitle } from '@/utils/i18n'
  import { mapActions, mapGetters } from 'vuex'
  import { toLoginRoute } from '@/utils/routes'
  import { getVerify } from '@/api/user'
  export default {
    name: 'VabAvatar',
    data() {
      return {
        codeUrl: '',
        sending: true, //是否发送验证码
        disabled: false, //是否禁发验证码
        second: 59, //倒计时间
        active: false,
        changePasswordVisible: false,
        passwordType: 'password',
        passwordType1: 'password',
        form: {
          account: this.username,
          password: '',
          password1: '',
          phone: '',
          verify: '',
          code: '',
        },
        rules: {
          account: [{ required: true, message: '请输入账户', trigger: 'blur' }],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          password1: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
          ],
          phone: [
            {
              required: true,
              trigger: 'blur',
              message: '手机号不能空',
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              trigger: 'blur',
              message: '手机号格式不正确',
            },
          ],
          verify: [
            {
              required: true,
              trigger: 'blur',
              message: '验证码不能空',
            },
          ],
          code: [
            {
              required: true,
              trigger: 'blur',
              message: '短信验证码不能空',
            },
          ],
        },
        title: '',
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    watch: {
      username: {
        handler: function (newVal) {
          this.form.account = newVal
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      translateTitle,
      ...mapActions({
        _logout: 'user/logout',
      }),
      //倒计时
      timeDown() {
        let result = setInterval(() => {
          --this.second
          if (this.second < 0) {
            clearInterval(result)
            this.sending = true
            this.disabled = false
            this.second = 59
          }
        }, 1000)
      },
      getVerifyImg() {
        getVerify().then((res) => {
          this.codeUrl = window.URL.createObjectURL(res)
        })
      },
      changeCode() {
        this.getVerifyImg()
      },
      getCode() {
        if (this.form.verify == '') {
          this.$message.error('请输入验证码')
          return
        }
        if (this.form.phone == '') {
          this.$message.error('请输入手机号')
          return
        }
        if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
          this.$message.error('手机号格式不正确')
          return
        }
        this.sending = false
        this.disabled = true
        this.timeDown()
      },
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.logout()
            break
          case 'personalCenter':
            this.personalCenter()
            break
          case 'changePassword':
            this.changePassword()
            break
        }
      },
      handlePassword() {
        this.passwordType === 'password'
          ? (this.passwordType = '')
          : (this.passwordType = 'password')
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handlePassword1() {
        this.passwordType1 === 'password'
          ? (this.passwordType1 = '')
          : (this.passwordType1 = 'password')
        this.$nextTick(() => {
          this.$refs.password1.focus()
        })
      },
      handleVisibleChange(val) {
        this.active = val
      },
      personalCenter() {
        this.$router.push('/setting/personal')
      },
      changePassword() {
        this.getVerifyImg()
        this.changePasswordVisible = true
      },
      close() {
        this.form = this.$options.data().form
        this.changePasswordVisible = false
      },
      save() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            // 弹出弹框二次确认
            this.$confirm('确认修改密码吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(async () => {
                if (this.form.password !== this.form.password1) {
                  this.$baseMessage(
                    '两次输入密码不一致',
                    'error',
                    'vab-hey-message-error'
                  )
                  return
                }
                const { code } = await editChangePassword({
                  new_password: this.form.password,
                })
                if (code != 200) {
                  return
                }
                this.$baseMessage(
                  '修改成功',
                  'success',
                  'vab-hey-message-success'
                )
                this.close()
                this.logout()
              })
              .catch(() => {
                this.$baseMessage('已取消修改', 'info', 'vab-hey-message-info')
              })
          }
        })
      },
      async logout() {
        await this._logout()
        await this.$router.push(toLoginRoute(this.$route.fullPath))
        // 水印 回调
        this.$event.$emit('watermark', false)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      line-height: 40px;
      cursor: pointer;

      [class*='ri-'] {
        margin-left: 0 !important;
      }
    }
  }
</style>
