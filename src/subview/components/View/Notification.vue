<template>
  <div>
    <el-carousel
      v-if="
        data.parameters.speaker_items &&
        data.parameters.speaker_items.length > 0
      "
      arrow="never"
      direction="horizontal"
      indicator-position="none"
      :interval="interval"
      :style="wrapper_style"
    >
      <i class="el-icon-loading"></i>
      <el-carousel-item
        v-for="(item, index) in data.parameters.speaker_items"
        :key="index"
        style="
          margin-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        "
      >
        {{ item.title }}
      </el-carousel-item>
    </el-carousel>
    <div v-else class="image-null"><span class="el-icon-picture"></span></div>
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        wrapper_style: {},
        interval: 1000,
      }
    },
    watch: {
      data: {
        handler: function (val) {
          console.log(val)
          if (val.parameters.bg_color) {
            this.wrapper_style = `
                height: 30px;
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_lr}px ${val.parameters.padding_tb}px;
                margin: ${val.parameters.margin_lr}px ${val.parameters.margin_tb}px;
            `
            this.interval = val.parameters.interval * 1000
            this.$forceUpdate()
          }
        },
        deep: true,
        immediate: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  /**/
  .notice {
    position: absolute;
    left: 50%;
    z-index: 2;
    width: 1200px;
    height: 50px;
    padding: 0;
    transform: translate(-50%);
  }
  .image-null {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 176px;
    font-size: 50px;
    color: #c1c1c1;
    background: #ffffff;
  }
  .el-carousel--horizontal {
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .notice_item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
  }
  .notice_item img {
    width: 40px;
    /*height: 16px;*/
    margin: 0 44px 0 32px;
  }
</style>
