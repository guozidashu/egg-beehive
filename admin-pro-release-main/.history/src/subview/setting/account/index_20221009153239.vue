<template>
  <div class="comprehensive-form-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <p>
        商城名称：
        <span>商城系统</span>
      </p>
      <p>
        联系人：
        <span>演示（没有关联ERP)</span>
      </p>
      <p>
        联系电话：
        <span></span>
      </p>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
    <!-- <el-card shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="授权信息" name="first" />
        <el-tab-pane label="客服信息" name="second">
          <p>
            授权到期日：
            <span>2023-03-15 14:06:06</span>
          </p>
          <p>
            研发模块：
            <span>未开通</span>
          </p>
          <p>
            ERP模块：
            <span>未开通</span>
          </p>
          <p>
            跟单模块：
            <span>未开通</span>
          </p>
        </el-tab-pane>
      </el-tabs>
    </el-card> -->
  </div>
</template>

<script>
  import { getList } from '@/api/area'

  export default {
    name: 'Account',
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
