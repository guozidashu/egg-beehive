<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item v-if="type === 1" label="科目分类" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择分类">
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="科目编号：" prop="sn">
        <el-input
          v-model="form.sn"
          placeholder="请输入科目编号："
          style="width: 215px"
          @input="form.sn = $WhitespaceRemoval(form.sn)"
        />
      </el-form-item>
      <el-form-item label="科目名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入科目名称"
          style="width: 215px"
          @input="form.name = $WhitespaceRemoval(form.name)"
        />
      </el-form-item>
      <el-form-item label="类别：" prop="type">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="收" :value="1" />
          <el-option label="支" :value="2" />
        </el-select>
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
    name: 'TagsEdit',
    data() {
      return {
        form: {
          id: 0, // 主键id (新增时传0),
          pid: null, // 父级id (添加主科目传0)
          name: '', // 名称
          sn: '', // 会计科目编号
          type: null, // 类别 1收 2支
        },
        selectList: [],
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sn: [{ required: true, trigger: 'blur', message: '请输入科目编号' }],
          type: [{ required: true, trigger: 'blur', message: '请选择类别' }],
          pid: [{ required: true, trigger: 'blur', message: '请选择科目分类' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row, type) {
        this.type = type
        if (row === 'add') {
          if (type === 1) {
            this.title = '添加科目'
          } else {
            this.title = '添加分类'
          }
        } else {
          if (type === 1) {
            this.title = '编辑科目'
          } else {
            this.title = '编辑分类'
          }
          this.form = Object.assign({}, row)
        }

        this.dialogFormVisible = true
        this.getSelectList()
      },
      async getSelectList() {
        const { data } = await this.api.getAccountList({
          page: 1,
          pageSize: 20,
          id: 0, // 父级id （取父级时传0）
          type: null, // 类别 1收 2支
          name: '', // 科目名称
        })
        this.selectList = data.data
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title == '添加科目' || this.title == '添加分类') {
              if (this.type == 2) {
                this.form.pid = 0
              }
              const { code } = await this.api.editAccountSave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data', 1)
              this.close()
            } else {
              const { code } = await this.api.editAccountSave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data', 1)
              this.close()
            }
          }
        })
      },
    },
  }
</script>
