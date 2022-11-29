<template>
  <div>
    <div v-if="data.parameters.bg_color" :style="wrapper_style"></div>
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
                height: ${val.parameters.height}px;
                background-color: ${val.parameters.bg_color};
            `
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
