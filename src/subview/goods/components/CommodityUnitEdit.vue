<template>
  <div>
    <el-dialog
      v-if="type == 2"
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width: 215px" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            active-color="#41B584"
            active-text="开启"
            :active-value="1"
            class="switch"
            inactive-color="#D2D2D2"
            inactive-text="关闭"
            :inactive-value="0"
            style="margin: 0 10px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </template>
    </el-dialog>
    <el-dialog
      v-if="type == 1"
      :title="title"
      :visible.sync="dialogFormVisible"
      width="70%"
      @close="close"
    >
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width: 215px" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            active-color="#41B584"
            active-text="开启"
            :active-value="1"
            class="switch"
            inactive-color="#D2D2D2"
            inactive-text="关闭"
            :inactive-value="0"
            style="margin: 0 10px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { editGoodsGroupSave } from '@/api/basic'
  export default {
    name: 'TagsEdit',
    data() {
      return {
        form: {
          name: '',
          pid: null,
          sort: null,
          status: 1,
        },
        selectList: [],
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
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
          this.title = '添加分组'
        } else {
          this.title = '编辑分组'
          this.form = Object.assign({}, row)
        }

        this.dialogFormVisible = true
      },
      close() {
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加') {
              const { code } = await editGoodsGroupSave(this.form)
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
              const { code } = await editGoodsGroupSave(this.form)
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
