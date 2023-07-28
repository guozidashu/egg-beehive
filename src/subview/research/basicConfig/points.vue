<template>
  <div style="padding: 20px; border-radius: 5px">
    <div style="font-weight: 600">积分价值设置</div>
    <el-divider style="margin-bottom: 0" />
    <el-form
      ref="form"
      class="demo-form"
      label-position="right"
      label-width="150px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="积分价值" prop="integrated_worth">
        <el-input
          v-model="form.integrated_worth"
          placeholder="请输入积分价值"
          style="width: 215px"
          @input="
            form.integrated_worth = $moneyFormatInput(form.integrated_worth)
          "
        >
          <template slot="prepend">每积分等值</template>
        </el-input>
        &nbsp;
        <span>元</span>
        &nbsp;
        <span style="color: gray">员工价值评估时积分等值规则;</span>
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-top: 10px"
          type="primary"
          @click="submitForm('form')"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 基础配置表单
        form: {
          integrated_worth: '', //积分价值
        },
        // 基础配置验证规则
        rules: {
          integrated_worth: [
            { required: true, message: '请输入积分价值', trigger: 'blur' },
          ],
        },
      }
    },
    watch: {},
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await this.api.getIntegratedWorth()
        this.form.integrated_worth = data.integrated_worth
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.setIntegratedWorth({
              integrated_worth: this.form.integrated_worth,
            })
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          } else {
            console.log('error submit!!')
          }
        })
      },
    },
  }
</script>
