<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="品牌图片" prop="img">
        <div style="display: flex">
          <div>
            <el-button
              size="small"
              style="margin: 0 10px 0 0"
              type="primary"
              @click="handleShow(1)"
            >
              图片上传
            </el-button>
          </div>
          <el-image
            prop="url"
            :src="form.img"
            style="width: 80px; height: 80px"
          >
            <div slot="error" class="el-image__error">上传轮播</div>
          </el-image>
        </div>
      </el-form-item>
      <el-form-item label="跳转链接" prop="url">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="form.status"
          active-color="#41B584"
          active-text="启用"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="停用"
          :inactive-value="2"
          style="margin: 0 10px"
        />
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
    components: {
      VabUpload,
    },
    data() {
      return {
        form: {
          id: '', // id 编辑时传
          img: '', // 图片地址
          url: '', // 跳转链接
          status: 1, // 状态 1=启用 2=停用
        },
        rules: {
          url: [{ required: true, trigger: 'blur', message: '请输入跳转链接' }],
          img: [{ required: true, trigger: 'blur', message: '请上传图片' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      getSon(data) {
        this.form.img = data[0]
        this.$forceUpdate()
      },
      handleShow(type) {
        this.uploadType = type
        this.$refs['vabUpload'].handleShow()
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
              const { code } = await this.api.addBannerSave(this.form)
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
              const { code } = await this.api.addBannerSave(this.form)
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
