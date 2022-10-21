<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品标题" prop="shoptitle">
        <el-input v-model="form.shoptitle" />
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="/upload"
          :auto-upload="false"
          :file-list="fileList"
          list-type="picture-card"
          :on-change="handleChange"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog
          append-to-body
          title="查看大图"
          :visible.sync="dialogVisible"
        >
          <div>
            <el-image :src="dialogImageUrl" />
          </div>
        </el-dialog>
      </el-form-item>
      <el-form-item label="品牌:">
        <el-select v-model="form.brand" placeholder="请选择品牌">
          <el-option
            v-for="(item, index) in typeData.brand"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类别款式:">
        <el-select v-model="form.kuanshi" placeholder="请选择类别款式">
          <el-option
            v-for="(item, index) in typeData.goods_category"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
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
  import { updateMeeting, addMeeting } from '@/api/basic'
  export default {
    name: 'LevelDeit',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [
          {
            url: '',
          },
        ],
        typeData: [],
        form: {
          name: '',
          id: '',
          year: '',
          img: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          year: [
            {
              type: 'date',
              required: true,
              message: '请选择年份',
              trigger: 'change',
            },
          ],
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
      handleRemove(file, fileList) {
        console.log(222, file, fileList)
      },
      handlePictureCardPreview(file) {
        console.log(3333, file)
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleChange(file, fileList) {
        console.log(22343423, file, fileList)
        if (file.size > 1048576 * this.size) {
          fileList.filter((item) => item !== file)
          this.fileList = fileList
        } else {
          this.allImgNum = fileList.length
        }
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
              const { code } = await addMeeting(this.form)
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
              const { code } = await updateMeeting(this.form)
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
