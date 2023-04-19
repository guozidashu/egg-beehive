<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="50%"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" style="width: 215px" />
      </el-form-item>
      <el-form-item class="vab-quill-content" label="内容" prop="content">
        <vab-quill
          ref="vab-quill"
          v-model="form.content"
          :min-height="400"
          :options="options"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
    <vab-upload
      ref="vabUpload"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </el-dialog>
</template>

<script>
  import VabQuill from '@/extra/VabQuill'
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'BandEdit',
    components: {
      VabQuill,
      VabUpload,
    },
    data() {
      return {
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ color: [] }, { background: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                [{ font: [] }],
                ['clean'],
                ['link', 'image'],
              ],
              handlers: {
                image: () => {
                  this.$baseConfirm(
                    '点击上传图片',
                    '上传图片',
                    () => {
                      this.$refs['vabUpload'].handleShow()
                    },
                    () => {},
                    '上传',
                    '取消'
                  )
                },
              },
            },
          },
          placeholder: '内容...',
          readOnly: false,
        },
        form: {
          title: '', //名称
          content: '', //内容
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入文章标题',
              trigger: 'blur',
            },
          ],
          content: [
            {
              required: true,
              message: '请输入文章内容',
              trigger: 'blur',
            },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      getSon(data) {
        if (data.length > 0) {
          data.forEach((item) => {
            if (this.form.content.indexOf(item) == -1) {
              this.form.content += `<el-image src="${item}" />`
            }
          })
        }
      },
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
              const { code } = await this.api.editArticleSave(this.form)
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
              const { code } = await this.api.editArticleSave(this.form)
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
<style lang="scss" scoped>
  .vab-quill-content {
    ::v-deep {
      .el-form-item__content {
        line-height: normal;
      }
    }
  }
</style>
