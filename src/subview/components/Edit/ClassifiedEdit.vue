<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item v-if="type === 1" label="款式分类">
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
      <el-form-item v-if="type === 2" label="排序" prop="sort">
        <el-input v-model="form.sort" style="width: 215px" />
      </el-form-item>
      <el-form-item label="上传">
        <div style="display: flex">
          <div>
            <el-button
              size="small"
              style="margin: 0 10px 0 0"
              type="primary"
              @click="handleShow()"
            >
              上传
            </el-button>
          </div>
          <img
            v-if="form.icon"
            :src="form.icon"
            style="width: 80px; height: 80px"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </el-dialog>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  export default {
    components: { VabUpload },
    data() {
      return {
        form: {
          name: '',
          pid: null,
          sort: null,
          icon: '',
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
      getSon(data) {
        this.form.icon = data[0]
        this.$forceUpdate()
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      showEdit(row, type) {
        this.type = type
        if (row === 'add') {
          if (type === 1) {
            this.title = '添加款式'
          } else {
            this.title = '添加分类'
          }
        } else {
          if (type === 1) {
            this.title = '添加款式'
          } else {
            this.title = '编辑分类'
          }
          this.form = Object.assign({}, row)
        }

        this.dialogFormVisible = true
        this.getSelectList()
      },
      async getSelectList() {
        const { data } = await this.api.getCategoryMainList(this.form)
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
                const { code } = await this.api.editCategorySonSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await this.api.editCategoryMainSave(this.form)
                if (code != 200) {
                  return
                }
              }

              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.close()
              this.$emit('fetch-data')
            } else {
              if (this.type === 1) {
                const { code } = await this.api.editCategorySonSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await this.api.editCategoryMainSave(this.form)
                if (code != 200) {
                  return
                }
              }

              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.close()
              this.$emit('fetch-data')
            }
          }
        })
      },
    },
  }
</script>
