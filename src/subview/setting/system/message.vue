<template>
  <div style="padding: 10px; background-color: white">
    <el-card class="tabs-card" shadow="hover" style="border-radius: 5px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="短信设置" name="短信设置" />
        <el-tab-pane label="发送记录" name="发送记录" />
      </el-tabs>
      <el-form
        v-if="activeName == '短信设置'"
        ref="form"
        label-position="right"
        label-width="220px"
        :model="form"
        :rules="rules"
        style="width: 100%; padding: 20px"
      >
        <el-form-item label="接口是否开启：" prop="ali_sms_open">
          <el-radio-group v-model="form.ali_sms_open">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="AccessKey ID:" prop="ali_sms_key">
          <el-input
            v-model="form.ali_sms_key"
            placeholder="请输入AccessKey ID"
            style="width: 40%"
          />
        </el-form-item>
        <el-form-item label="AccessKey Secret:" prop="ali_sms_secret">
          <el-input
            v-model="form.ali_sms_secret"
            placeholder="请输入AccessKey Secret"
            style="width: 40%"
          />
        </el-form-item>
        <el-form-item label="短信签名:" prop="ali_sms_sign">
          <el-input
            v-model="form.ali_sms_sign"
            placeholder="请输入短信签名"
            style="width: 40%"
          />
        </el-form-item>
        <el-form-item label="注册验证码短信模板CODE:" prop="ali_sms_code">
          <el-input
            v-model="form.ali_sms_code"
            placeholder="请输入注册验证码短信模板CODE"
            style="width: 40%"
          />
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 10px" type="primary" @click="saveSms()">
            保存
          </el-button>
        </el-form-item>
      </el-form>
      <QYList
        v-if="activeName == '发送记录'"
        :list="list"
        :list-type="listType"
        :page-no="form1.page"
        :page-size="form1.pageSize"
        :state="listLoading"
        style="padding: 20px"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="手机号" prop="phone" />
          <el-table-column align="center" label="验证码" prop="code" />
          <el-table-column
            align="center"
            label="发送时间"
            prop="create_time"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '短信设置',
        form: {
          ali_sms_open: 1,
          ali_sms_key: 'LTAI5tDBbzJaKfkRDLLdmzyU',
          ali_sms_secret: 'W0MGxZH43wGtgcSbHOyPJTdolooj4c',
          ali_sms_sign: '圈域云',
          ali_sms_code: 'SMS_261455102',
        },
        rules: {
          ali_sms_open: [
            {
              required: true,
              message: '接口是否开启',
              trigger: 'blur',
            },
          ],
          ali_sms_key: [
            { required: true, message: '请输入AccessKey ID', trigger: 'blur' },
          ],
          ali_sms_secret: [
            {
              required: true,
              message: '请输入AccessKey Secret',
              trigger: 'blur',
            },
          ],
          ali_sms_sign: [
            { required: true, message: '请输入短信签名', trigger: 'blur' },
          ],
          ali_sms_code: [
            {
              required: true,
              message: '请输入注册验证码短信模板CODE',
              trigger: 'blur',
            },
          ],
        },
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        form1: {
          page: 1,
          pageSize: 10,
        },
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      activeName: {
        handler: function (newVal) {
          if (newVal == '发送记录') {
            this.fetchData()
          } else {
            this.getSms()
          }
        },
        deep: true,
      },
      form1: {
        handler: function (newVal) {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getSms()
    },
    methods: {
      // 保存消息 editSmsInfoSave
      saveSms() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            console.log(22, this.form)
            const { code } = await this.api.editSmsInfoSave(this.form)
            if (code == 200) {
              this.$message({
                message: '保存成功',
                type: 'success',
              })
            }
          } else {
            console.log('error submit!!')
          }
        })
      },
      // 获取消息设置
      getSms() {
        this.api.getSmsInfo().then((res) => {
          this.form = res.data
        })
      },
      // 分页
      changeBtnPage(data) {
        this.form1.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.form1.pageSize = data
      },
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getSmsList(this.form1)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
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
