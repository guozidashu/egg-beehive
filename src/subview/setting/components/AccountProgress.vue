<template>
  <el-form label-width="140px" style="width: 100%; padding-left: 20px">
    <el-form-item
      v-for="(item, index) in list"
      :key="index"
      :label="item.name + '授权账户数：'"
    >
      <div style="display: flex">
        <div>{{ item.Number }}</div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            width: 60%;
            margin: 0 20px;
            background-color: #ebeef5;
            border-radius: 25px;
            position: relative;
          "
        >
          <div
            :style="{
              width: item.right,
              backgroundColor: '#E8F4FF',
              borderRadius: '25px',
            }"
          ></div>
          <div style="position: absolute; left: 10px">
            已使用{{ item.right }}
          </div>
          <div style="position: absolute; right: 10px">
            未使用{{ item.error }}
          </div>
        </div>
        <div style="margin-right: 20px">{{ item.num }}个剩余</div>
        <el-button type="primary">购买</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'EmployeesEdit',
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        progressList: this.list,
      }
    },
    created() {},
    methods: {
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
    },
  }
</script>
