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
      <el-form-item label="商品标题" prop="shop_title">
        <el-input v-model="form.shop_title" />
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img alt="" :src="dialogImageUrl" width="100%" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="款号" prop="sn">
        <el-input v-model="form.sn" />
      </el-form-item>
      <el-form-item label="商品颜色" prop="colors">
        <el-select v-model="form.colors" multiple placeholder="请选择">
          <el-option
            v-for="item in form.colorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品尺码" prop="sizes">
        <el-select v-model="form.sizes" multiple placeholder="请选择">
          <el-option
            v-for="item in form.sizeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="裁床金额" prop="cutting_price">
        <el-input v-model="form.cutting_price" />
      </el-form-item>
      <el-form-item label="加工费" prop="process_price">
        <el-input v-model="form.process_price" />
      </el-form-item>
      <el-form-item label="设计编号" prop="designer_sn">
        <el-input v-model="form.designer_sn" />
      </el-form-item>
      <el-form-item label="设计师" prop="designer_userid">
        <el-select v-model="form.designer_userid" placeholder="请选择">
          <el-option
            v-for="item in form.designerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄段" prop="age">
        <el-select v-model="form.age" placeholder="请选择">
          <el-option
            v-for="item in form.ageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
        form: {
          name: '',
          id: '',
          year: '',
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
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
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
