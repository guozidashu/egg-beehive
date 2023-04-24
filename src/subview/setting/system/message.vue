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
        <el-form-item label="聚水潭接口是否开启：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="短信接口:" prop="status1">
          <el-select v-model="form.status1" style="width: 40%">
            <el-option label="阿里云" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="AccessKey ID:" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入AccessKey ID"
            style="width: 40%"
          />
        </el-form-item>
        <el-form-item label="AccessKey Secret:" prop="name1">
          <el-input
            v-model="form.name1"
            placeholder="请输入AccessKey Secret"
            style="width: 40%"
          />
        </el-form-item>
        <el-form-item label="短信签名:" prop="name2">
          <el-input
            v-model="form.name2"
            placeholder="请输入短信签名"
            style="width: 40%"
          />
        </el-form-item>
        <el-form-item label="注册验证码短信模板CODE:" prop="name3">
          <el-input
            v-model="form.name3"
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
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        style="padding: 20px"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="发送文本" prop="id" />
          <el-table-column
            align="center"
            label="发送时间"
            prop="id"
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
          status: 0,
          status1: 1,
          name: '',
          name1: '',
          name2: '',
          name3: '',
        },
        rules: {
          status: [
            {
              required: true,
              message: '请选择聚水潭接口是否开启',
              trigger: 'blur',
            },
          ],
          status1: [
            { required: true, message: '请选择短信接口', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入AccessKey ID', trigger: 'blur' },
          ],
          name1: [
            {
              required: true,
              message: '请输入AccessKey Secret',
              trigger: 'blur',
            },
          ],
          name2: [
            { required: true, message: '请输入短信签名', trigger: 'blur' },
          ],
          name3: [
            {
              required: true,
              message: '请输入注册验证码短信模板CODE',
              trigger: 'blur',
            },
          ],
        },
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form1: {
          id: 0,
          name: '',
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
      // 表单监听
      form1: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.pageState = false
        },
        deep: true,
      },
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
            // const { code } = await this.api.editSmsInfoSave({})
            // if (code == 200) {
            //   this.$message({
            //     message: '保存成功',
            //     type: 'success',
            //   })
            // }
          } else {
            console.log('error submit!!')
          }
        })
      },
      // 获取消息设置
      getSms() {
        this.api.getSmsInfo().then((res) => {
          console.log(111, this.form)
        })
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getBandList(this.formTemp)
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
