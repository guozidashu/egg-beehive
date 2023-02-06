<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form">
        <el-form-item label="选择主题颜色:">
          <div class="radioAll" :style="{ '--color': themeColor }">
            <el-radio-group
              v-model="form.subject_color"
              fill="red"
              text-color="red"
            >
              <el-radio border :label="1" size="medium">天空蓝</el-radio>
              <el-radio border :label="2" size="medium">生鲜绿</el-radio>
              <el-radio border :label="3" size="medium">热情红</el-radio>
              <el-radio border :label="4" size="medium">魅力粉</el-radio>
              <el-radio border :label="5" size="medium">活力橙</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="当前风格示例:">
          <img :src="img" style="width: 800px; height: 454px" />
        </el-form-item>
        <el-form-item>
          <el-button
            v-has-permi="['btn:DecorateTheme:save']"
            size="small"
            type="primary"
            @click="submitForm('form')"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getBaseConfigDetail, editBaseConfigSave } from '@/api/basic'
  export default {
    name: 'DecorateTheme',
    data() {
      return {
        form: {
          subject_color: 1,
        },
        themeColor: '#1DB0FC',
        img_list: [
          'https://img.quanyu.link/FmXf_fKJAUIXbIj7UHf8adcXMNZu',
          'https://img.quanyu.link/Fm_HbXqMnnl1SPski1ZYCFbmB-8G',
          'https://img.quanyu.link/FlrzQGZp30yk-2cCiSySvxKGXW_m',
          'https://img.quanyu.link/FkpvB9_kS73RtSSieQYnn-pKfkVu',
          'https://img.quanyu.link/Ftws72Tddlzhfe7AsMuZNMaTUKEo',
        ],
        img: 'https://img.quanyu.link/FmXf_fKJAUIXbIj7UHf8adcXMNZu',
      }
    },
    watch: {
      'form.subject_color': {
        //表单筛选条件变化实时刷新列表
        handler: function (val) {
          if (val == 1) {
            this.themeColor = '#1DB0FC'
            this.img = this.img_list[0]
          } else if (val == 2) {
            this.themeColor = '#42CA4D'
            this.img = this.img_list[1]
          } else if (val == 3) {
            this.themeColor = '#E93323'
            this.img = this.img_list[2]
          } else if (val == 4) {
            this.themeColor = '#FF448F'
            this.img = this.img_list[3]
          } else if (val == 5) {
            this.themeColor = '#FE5C2D'
            this.img = this.img_list[4]
          }
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await getBaseConfigDetail()
        this.form = JSON.parse(data)
        this.form.customer_service_type = Number(
          this.form.customer_service_type
        )
      },
      async submitForm() {
        const { code } = await editBaseConfigSave(this.form)
        if (code === 200) {
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      },
    },
  }
</script>
<style lang="scss">
  .radioAll {
    .el-radio__input.is-checked + .el-radio__label {
      color: var(--color) !important;
    }
    .el-radio__input.is-checked .el-radio__inner {
      background: var(--color) !important;
      border-color: var(--color) !important;
    }
  }
</style>
