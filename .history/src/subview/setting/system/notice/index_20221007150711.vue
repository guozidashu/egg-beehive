<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="短信" name="first">
          <el-form
            ref="form"
            class="demo-form"
            label-position="left"
            label-width="120px"
            :model="form"
          >
            <el-form-item label="短信状态">
              <el-radio-group v-model="form.resource">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="短信接口">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="AccessKey ID">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="AccessKey Secret">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="短信签名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="短信状态" />
            <el-divider />
            <el-form-item label="短信验证码">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="微信模板" name="second">敬请期待</el-tab-pane>
        <el-tab-pane label="企业微信模板" name="three">敬请期待</el-tab-pane>
        <el-tab-pane label="小程序通知模板" name="four">敬请期待</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { getList } from '@/api/area'

  export default {
    name: 'SystemNotice',
    data() {
      return {
        activeName: 'first',
        form: {
          name: '',
          region: '',
          date: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          description: '',
          area: [],
        },
        areaOptions: [],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur',
            },
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' },
          ],
          date: [
            {
              type: 'date',
              required: true,
              message: '请选择日期',
              trigger: 'change',
            },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个活动性质',
              trigger: 'change',
            },
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' },
          ],
          description: [
            { required: true, message: '请填写活动形式', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //获取行政区划
      async fetchData() {
        const {
          data: { list },
        } = await getList()
        this.areaOptions = list
      },
    },
  }
</script>

<style lang="scss" scoped>
  .comprehensive-form-container {
    .demo-form {
      margin-top: 10px;
    }
  }
</style>
