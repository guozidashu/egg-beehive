<template>
  <div>
    <div v-if="data.parameters.bg_color" :style="wrapper_style">
      {{ data.parameters.title }}
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
        wrapper_style: {},
      }
    },
    watch: {
      data: {
        handler: function (val) {
          console.log(val)
          if (val.parameters.bg_color) {
            this.wrapper_style = `
            background-color: ${val.parameters.bg_color};
                border-radius:  ${val.parameters.radius_t}px ${val.parameters.radius_t}px ${val.parameters.radius_b}px ${val.parameters.radius_b}px;
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px ;
                margin: ${val.parameters.margin_tb}px ${val.parameters.margin_lr}px ;
                color: ${val.parameters.title_color};
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
