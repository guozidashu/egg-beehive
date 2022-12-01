<template>
  <div>
    <div
      v-if="data.parameters.hotspots && data.parameters.hotspots.length > 0"
      :style="{
        width: '100%',
        height: '300px',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + data.parameters.bg_Image + ') ',
        marginTop: data.parameters.margin_top + 'px',
        marginLeft: data.parameters.margin_lr + 'px',
        marginRight: data.parameters.margin_lr + 'px',
        position: 'relative',
      }"
    >
      <!-- name: '',
          url: '',
          opentype: '',
          hotspots_margin_top: 0,
          hotspots_margin_lr: 0,
          width: 50,
          height: 50, -->
      <div
        v-for="(item, index) in data.parameters.hotspots"
        :key="index"
        :style="{
          width: item.width + 'px',
          height: item.height + 'px',
          background: item.bg_color,
          position: 'absolute',
          opacity: 0.5,
          top: item.hotspots_margin_top + 'px',
          left: item.hotspots_margin_lr + 'px',
        }"
      ></div>
    </div>
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
        // wrapper_style: {},
      }
    },
    watch: {
      data: {
        handler: function (val) {
          console.log('视图区域的值', val)
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
