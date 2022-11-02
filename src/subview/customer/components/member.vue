<template>
  <div>
    <el-dialog
      :before-close="handleClose"
      style="font-size: 14px"
      :title="`${numberValidateForm.id ? '编辑' : '添加'}会员等级`"
      :visible="dialogVisible"
      width="38%"
    >
      <div
        style="
          width: 100%;
          height: 1px;
          margin-top: -30px;
          background-color: #e8eaec;
        "
      ></div>
      <el-form
        ref="numberValidateForm"
        label-width="130px"
        :model="numberValidateForm"
        :rules="rules"
        style="margin-top: 20px"
      >
        <el-form-item label="等级名称">
          <el-input
            v-model.trim="numberValidateForm.name"
            placeholder="请输入等级名称"
          />
        </el-form-item>
        <el-row type="flex">
          <el-form-item label="等级">
            <el-input-number
              v-model="num"
              controls-position="right"
              :max="10"
              :min="1"
              style="width: 90px"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="享受折扣">
            <el-input-number
              v-model="numberValidateForm.discount_sm"
              controls-position="right"
              :max="10"
              :min="1"
              style="width: 90px"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="解锁需经验值达到" style="margin-left: 20px">
            <el-input-number
              v-model="num1"
              controls-position="right"
              :max="1000"
              :min="0"
              style="width: 90px"
              @change="handleChange"
            />
          </el-form-item>
        </el-row>
        <el-form-item label="图标" prop="img">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            class="uploadImg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImage">
            <img alt="" :src="dialogImageUrl" width="100%" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="会员背景" prop="img1">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            class="uploadImg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImage">
            <img alt="" :src="dialogImageUrl" width="100%" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="numberValidateForm.sp">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="等级说明">
          <el-input
            v-model="textarea2"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            type="textarea"
          />
        </el-form-item>
        <el-form-item style="margin-left: 400px">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
  // import { addGrade, updateGrade } from '@/api/basic'
  export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        radio: 3,
        num: 1,
        num1: 100,
        dialogImageUrl: '',
        dialogImage: false,
        textarea2: '',
        numberValidateForm: {
          name: '',
          discount: '',
          sp: 0,
          discount_sm: 10,
          des: '3.5',
        },
        rules: {
          img: [{ required: true, message: '请选择图标' }],
          img1: [{ required: true, message: '请选择背景' }],
        },
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:dialogVisible', false)
        this.$refs.numberValidateForm.resetFields()
        this.numberValidateForm = {
          name: '',
          discount: '',
          sp: 0,
          discount_sm: 10,
          des: '',
        }
      },
      handleChange(value) {
        // console.log(value)
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      async submit() {
        // this.$refs.numberValidateForm.validate()
        try {
          this.numberValidateForm.id
            ? await updateGrade({
                id: String(this.numberValidateForm.id),
                name: this.numberValidateForm.name,
              })
            : await addGrade(this.numberValidateForm)
          this.$parent.getGradeList()
          this.$message({
            message: `${this.numberValidateForm.id ? '编辑' : '添加'}成功`,
            type: 'success',
          })
          this.handleClose()
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .uploadImg {
    .el-upload--picture-card {
      width: 58px;
      height: 58px;
      .el-icon-plus:before {
        position: absolute;
        top: 15px;
        left: 15px;
      }
    }
  }
</style>
