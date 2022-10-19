<template>
  <div>
    <el-dialog
      :before-close="handleClose"
      title="添加分类"
      :visible="dialogVisible"
      width="40%"
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
        ref="dialogClassificationGoods"
        label-width="140px"
        :rules="rules"
        style="margin-top: 20px"
      >
        <el-form-item label="父级">
          <el-select v-model="value" placeholder="请选择" style="width: 541px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="aa">
          <el-input style="width: 541px" />
        </el-form-item>
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
        <el-form-item label="排序">
          <el-input-number
            v-model="num"
            controls-position="right"
            :max="1000"
            :min="0"
            style="width: 90px"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="radio">
            <el-radio :label="3">显示</el-radio>
            <el-radio :label="6">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-left: 400px">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="ojbk">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
          },
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项4',
            label: '龙须面',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
        ],
        value: '',
        num: 0,
        radio: 3,
        rules: {
          aa: [{ required: true, message: '请输入分类名称' }],
        },
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:dialogVisible', false)
      },
      ojbk() {
        this.$refs.dialogClassificationGoods.validate()
      },
      handleRemove(file) {
        console.log(file)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
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
