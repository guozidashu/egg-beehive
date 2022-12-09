<template>
  <div>
    <div v-if="data.tab_type == 1" :style="wrapper_style">
      <div>&#xe69b;</div>
      <div
        :style="{
          margin: ' 0 10px',
          color: data.parameters.title_color,
        }"
      >
        {{ data.parameters.title }}
      </div>
      <div class="">&#xe69b;</div>
    </div>
    <div v-else-if="data.tab_type == 2" :style="wrapper_style">
      <div>&#xe69b;</div>
      <div
        :style="{
          margin: ' 0 10px',
          color: data.parameters.title_color,
        }"
      >
        {{ data.parameters.title }}
      </div>
      <div class="">&#xe69b;</div>
    </div>
    <div v-else-if="data.tab_type == 3" :style="wrapper_style1">
      <div
        :style="{
          color: data.parameters.title_color,
        }"
      >
        {{ data.parameters.title }}
      </div>
      <div style="font-size: 12px; color: gray">更多</div>
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
        wrapper_style1: {},
      }
    },
    watch: {
      data: {
        handler: function (val) {
          if (val.parameters.bg_color) {
            this.wrapper_style = `
            display: flex;
            justify-content:center;
            align-items: center;
            background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px ;
                margin: ${val.parameters.margin_tb}px ${val.parameters.margin_lr}px ;
            `
            this.wrapper_style1 = `
            display: flex;
            justify-content: space-between;
            background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px ;
                margin: ${val.parameters.margin_tb}px ${val.parameters.margin_lr}px ;
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
