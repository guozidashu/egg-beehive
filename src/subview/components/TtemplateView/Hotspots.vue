<template>
  <div
    :style="{
      padding:
        data.parameters.margin_top + 'px ' + data.parameters.margin_lr + 'px',
      backgroundColor: data.parameters.bg_color,
    }"
  >
    <div style="position: relative">
      <el-image
        mode="aspectFit"
        :src="data.parameters.bg_Image"
        style="width: 100%; height: 100%"
      />
      <div
        v-for="(item, index) in data.parameters.hotspots"
        :key="index"
        :style="{
          background: item.bg_color,
          width: item.width + '%',
          height: item.height + '%',
          opacity: 0.5,
          position: 'absolute',
          top: item.hotspots_margin_top + '%',
          left: item.hotspots_margin_lr + '%',
        }"
        @tap="$tools.customEvent(item)"
      ></div>
    </div>
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
        // wrapper_style: {},
      }
    },
    watch: {
      data: {
        handler: function (val) {
          if (val.parameters.bg_Image) {
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
  .image-null {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 176px;
    font-size: 50px;
    color: #c1c1c1;
    background: #ffffff;
  }
</style>
