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
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="账户" prop="account">
          <el-input v-model="form.account" disabled />
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item> -->
        <el-form-item label="密码" prop="password">
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

  export default {
    name: 'VabAvatar',
    data() {
      return {
        active: false,
        changePasswordVisible: false,
        passwordType: 'password',
        passwordType1: 'password',
        form: {
          account: this.username,
          password: '',
          password1: '',
        },
        rules: {
          account: [{ required: true, message: '请输入账户', trigger: 'blur' }],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          password1: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
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
        this.changePasswordVisible = true
      },
      close() {
        console.log('close')
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
