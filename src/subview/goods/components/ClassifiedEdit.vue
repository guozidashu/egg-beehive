<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item v-if="type === 1" label="款式分类" prop="name">
        <el-select v-model="form.pid" placeholder="请选择分类">
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type === 1" label="款式名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item v-if="type === 2" label="分类名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item v-if="type === 2" label="排序" prop="name">
        <el-input v-model="form.id" style="width: 215px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import {
    editCategorySonSave,
    editCategoryMainSave,
    getCategoryMainList,
  } from '@/api/basic'
  export default {
    name: 'TagsEdit',
    data() {
      return {
        form: {
          name: '',
          pid: 0,
          sort: 0,
        },
        selectList: [],
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
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
            this.title = '添加标签'
          } else {
            this.title = '添加分类'
          }
        } else {
          if (type === 1) {
            this.title = '编辑标签'
          } else {
            this.title = '编辑分类'
          }
          this.form = Object.assign({}, row)
        }

        this.dialogFormVisible = true
        this.getSelectList()
      },
      async getSelectList() {
        const { data } = await getCategoryMainList(this.form)
        this.selectList = data
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
              if (this.type === 1) {
                const { code } = await editCategorySonSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await editCategoryMainSave(this.form)
                if (code != 200) {
                  return
                }
              }

              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              if (this.type === 1) {
                const { code } = await editCategorySonSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await editCategoryMainSave(this.form)
                if (code != 200) {
                  return
                }
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
