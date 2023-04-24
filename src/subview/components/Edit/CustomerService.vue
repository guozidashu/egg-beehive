<template>
  <el-dialog
    center
    class="Customerservice"
    style="border-radius: 25px"
    :visible.sync="Visible"
    width="450px"
    @close="close"
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px 20px 20px;
      "
    >
      <div
        style="padding: 20px 0; font-size: 20px; font-weight: 600; color: red"
      >
        在线客服
      </div>
      <div
        style="
          width: 100%;
          padding: 20px 0;
          font-size: 16px;
          text-align: center;
          border-top: 1px solid #efefef;
          border-bottom: 1px solid #efefef;
        "
      >
        你的私人顾问：老何
      </div>
      <div style="padding: 10px 0 0 0">
        <div style="padding: 10px 0 0 0; font-size: 16px; text-align: center">
          <vab-icon
            icon="wechat-line"
            style="font-size: 20px; color: #4daf29"
          />
          微信咨询
        </div>
        <el-image
          src="https://oss.business.quanyu123.com//dee133c54041034454ca94d27b301a2f.png"
          style="width: 200px; height: 200px"
        />
      </div>
      <div
        style="
          width: 100%;
          padding: 20px 0;
          font-size: 14px;
          text-align: center;
          border-top: 1px solid #efefef;
          border-bottom: 1px solid #efefef;
        "
      >
        服务热线 &nbsp;&nbsp;
        <span style="font-size: 20px; font-weight: 600; color: red">
          191-0655-9871
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      centerDialogVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // 客服弹窗
        Visible: this.centerDialogVisible,
      }
    },
    watch: {
      // 抽屉数据监听
      centerDialogVisible: {
        handler: function (newVal) {
          this.Visible = newVal
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      close() {
        this.$emit('close')
      },
    },
  }
</script>
