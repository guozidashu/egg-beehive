<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="60%"
    @close="close"
  >
    <el-form
      ref="form"
      :inline="true"
      label-width="140px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="父级Id" prop="pid">
        <el-input v-model="form.pid" />
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="form.path" />
      </el-form-item>
      <el-form-item label="等级">
        <el-select v-model="form.level" style="width: 200px">
          <el-option label="一级菜单" :value="1" />
          <el-option label="二级菜单" :value="2" />
          <el-option label="三级级菜单" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有vue文件路径">
        <el-select v-model="form.isState" style="width: 200px">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="form.isState == 1"
        label="vue文件路径"
        prop="component"
      >
        <el-input v-model="form.component" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon" />
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="form.type" />
      </el-form-item>

      <!-- <el-form-item label="badge">
        <el-input v-model="form.meta.badge" />
      </el-form-item>
      <el-form-item label="dot">
        <el-switch v-model="form.meta.dot" />
      </el-form-item>
      <el-form-item label="隐藏">
        <el-switch v-model="form.meta.hidden" />
      </el-form-item>
      <el-form-item label="始终显示当前节点">
        <el-switch v-model="form.meta.levelHidden" />
      </el-form-item>
      <el-form-item label="自定义svg图标">
        <el-switch v-model="form.meta.isCustomSvg" />
      </el-form-item>
      <el-form-item label="固定">
        <el-switch v-model="form.meta.noClosable" />
      </el-form-item>
      <el-form-item label="无缓存">
        <el-switch v-model="form.meta.noKeepAlive" />
      </el-form-item>
      <el-form-item label="不显示当前标签页">
        <el-switch v-model="form.meta.tabHidden" />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { editMenuSave } from '@/api/basic'

  export default {
    name: 'MenuManagementEdit',
    data() {
      return {
        form: {
          //id: 1, // 菜单id 编辑时传
          pid: null, // 父级id
          path: null, // 路径
          name: null, // 名称
          component: null, // 路由
          title: null, // 标题
          icon: null, // 图标
          isState: 1, // 是否有vue文件路径
        },
        rules: {
          pid: [{ required: true, trigger: 'blur', message: '请输入父级id' }],
          name: [{ required: true, trigger: 'blur', message: '请输入name' }],
          path: [{ required: true, trigger: 'blur', message: '请输入path' }],
          component: [
            { required: true, trigger: 'blur', message: '请输入component' },
          ],
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      handleIcon(item) {
        this.form.meta.icon = item
      },
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = JSON.parse(JSON.stringify(Object.assign({}, row)))
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
            const { msg } = await editMenuSave(this.form)
            this.$baseMessage(msg, 'success', 'vab-hey-message-success')
            this.close()
            this.$emit('fetch-data')
          }
        })
      },
    },
  }
</script>
