<template>
  <div style="padding: 20px; background-color: white">
    <el-form ref="form" label-width="170px" :model="form" :rules="rules">
      <el-form-item label="预售订单超时取消时间:" prop="presell_cancel_mins">
        <el-input v-model="form.presell_cancel_mins" style="width: 300px" />
        <div style="font-size: 12px; color: #c0c4cc">
          默认值为30分钟，小程序商城提交的预售订单，未按约定的时间支付定金比例，将会自动取消该预售的订单。
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          presell_cancel_mins: 30,
        },
        rules: {
          presell_cancel_mins: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入预售订单超时时间',
            },
          ],
        },
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.setPresellCancelMins(this.form)
            if (code == 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .textCss {
    padding: 8px 16px 8px 16px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 22px;
    color: #666;
    background-color: #e8f4ff;
    border-radius: 6px;
  }
</style>
