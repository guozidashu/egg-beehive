<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="节点名称" prop="name">
        <el-input
          v-model="form.name"
          style="width: 215px"
          @input="form.name = $WhitespaceRemoval(form.name)"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model="form.sort"
          style="width: 215px"
          @input="form.sort = $numFormatInput(form.sort)"
        />
      </el-form-item>
      <!-- <el-form-item
        v-if="(title == '编辑' && form.type == 3) || title == '添加'"
        label="是否必选"
        prop="mandatory"
      >
        <el-radio-group v-model="form.mandatory">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item
        v-if="(title == '编辑' && form.type == 3) || title == '添加'"
        label="是否默认"
        prop="default"
      >
        <el-radio-group v-model="form.default">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item v-if="title == '添加'" label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">裁床单</el-radio>
          <el-radio :label="2">入库单</el-radio>
          <el-radio :label="3">无操作</el-radio>
        </el-radio-group>
      </el-form-item> -->
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
        form: {
          id: null, //编辑时用
          name: null, //名称
          sort: null, //排序
          mandatory: 0, //是否必选 0否（默认） 1是
          default: 0, //是否默认 0否（默认） 1是
          type: 3, //类型：类型：1=建裁床单 2=建入库单 3=无操作
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
          mandatory: [
            { required: true, trigger: 'blur', message: '请选择是否必选' },
          ],
          default: [
            { required: true, trigger: 'blur', message: '请选择是否默认' },
          ],
          type: [{ required: true, trigger: 'blur', message: '请选择类型' }],
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
              const { code } = await this.api.editNodeSave(this.form)
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
              const { code } = await this.api.editNodeSave(this.form)
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
