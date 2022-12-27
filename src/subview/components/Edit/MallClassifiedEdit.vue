<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="商品别名">
        <el-input v-model="form.another_name" />
      </el-form-item>
      <!-- shop_is_display: 1, //1启用 0 禁用 -->
      <el-form-item label="商城是否显示" prop="shop_is_display">
        <el-radio-group v-model="form.shop_is_display">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { editShopCateGoryEdit } from '@/api/basic'
  export default {
    name: 'BandEdit',
    data() {
      return {
        form: {
          id: null,
          shop_is_display: null,
          another_name: '',
        },
        rules: {},
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '编辑'
        this.form = Object.assign({}, row)
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
            const { code } = await editShopCateGoryEdit(this.form)
            if (code != 200) {
              return
            }
            this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
            this.$emit('fetch-data')
            this.close()
          }
        })
      },
    },
  }
</script>
