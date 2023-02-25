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
      <div v-if="type == 1">
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
        <el-form-item label="类型" prop="type">
          <el-input v-model="form.type" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" />
        </el-form-item>
      </div>
      <div v-if="type == 2">
        <el-form-item>
          <el-button type="primary" @click="addRole()">新增</el-button>
        </el-form-item>
        <div
          v-for="(item, index) in form.guard"
          :key="index"
          style="display: flex"
        >
          <el-form-item label="按钮名称">
            <el-input v-model="item.title" />
          </el-form-item>
          <el-form-item label="按钮字符">
            <el-input v-model="item.guard" />
          </el-form-item>
          <el-form-item label="按钮排序">
            <el-input v-model="item.sort" />
          </el-form-item>
          <el-button
            circle
            icon="el-icon-delete"
            style="width: 35px; height: 35px; margin: -2px 0 0 20px"
            type="danger"
            @click="deleteRole(index)"
          />
        </div>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: 'MenuManagementEdit',
    data() {
      return {
        type: null,
        form: {
          //id: 1, // 菜单id 编辑时传
          pid: null, // 父级id
          path: null, // 路径
          name: null, // 名称
          component: null, // 路由
          title: null, // 标题
          icon: null, // 图标
          isState: 1, // 是否有vue文件路径
          type: 'menu', // 类型
        },
        rules: {
          pid: [{ required: true, trigger: 'blur', message: '请输入父级id' }],
          name: [{ required: true, trigger: 'blur', message: '请输入name' }],
          path: [{ required: true, trigger: 'blur', message: '请输入path' }],
          component: [
            { required: true, trigger: 'blur', message: '请输入component' },
          ],
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
          type: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入类型,示例值menu',
            },
          ],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      handleIcon(item) {
        this.form.meta.icon = item
      },
      showEdit(row, type) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = JSON.parse(JSON.stringify(Object.assign({}, row)))
        }
        this.type = type
        this.dialogFormVisible = true
      },
      async deleteRole(index) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await this.api.delMenuDel({
            id: this.form.guard[index].id,
          })
          this.$baseMessage(msg, 'success', 'vab-hey-message-success')
          this.form.guard.splice(index, 1)
          this.$emit('fetch-data')
        })
      },
      addRole() {
        this.form.guard.push({ guard: '', title: '', sort: 0 })
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      async save() {
        if (this.type == 1) {
          this.$refs['form'].validate(async (valid) => {
            if (valid) {
              const { msg } = await this.api.editMenuSave(this.form)
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              this.close()
              this.$emit('fetch-data')
            }
          })
        } else {
          this.form.guard.forEach((item) => {
            item.pid = this.form.id
          })
          const { msg } = await this.api.editButtonSave(this.form.guard)
          this.$baseMessage(msg, 'success', 'vab-hey-message-success')
          this.close()
          this.$emit('fetch-data')
        }
      },
    },
  }
</script>
