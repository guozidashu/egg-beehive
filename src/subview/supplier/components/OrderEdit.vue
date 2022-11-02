<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="close"
  >
    <el-form ref="form" label-width="140px" :model="form" :rules="rules">
      <el-form-item
        label="供应商名称："
        placeholder="请输入供应商名称"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="联系人姓名："
        placeholder="请输入联系人姓名"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="联系电话：" placeholder="请输入联系电话" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="省市区地址" prop="name">
        <el-select v-model="form.region">
          <el-option label="北京" value="shanghai" />
          <el-option label="上海" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="供应商地址："
        placeholder="请输入供应商地址"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="供应商邮箱："
        placeholder="请输入供应商邮箱"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="备注：" placeholder="请输入" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="供应商登录用户名："
        placeholder="请输入登录名称"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="供应商登录密码："
        placeholder="请输入登录密码"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="确认登录密码："
        placeholder="请确认登录密码"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="是否开启">
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#ff4949"
          inactive-text="关闭"
          :inactive-value="0"
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
  // import { updateWave, addWave } from '@/api/basic'
  export default {
    name: 'BandEdit',
    data() {
      return {
        form: {
          name: '',
          id: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
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
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加') {
              // const { code } = await addWave(this.form)
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
              // const { code } = await updateWave(this.form)
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
