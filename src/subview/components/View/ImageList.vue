<template>
  <div>
    <div
      v-if="
        data.parameters.image_items && data.parameters.image_items.length > 0
      "
      class="grid-button"
      :style="wrapper_style"
    >
      <img
        v-for="(item, index) in data.parameters.image_items"
        :key="index"
        :src="item.img"
        :style="item_style"
      />
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
        item_style: {},
        interval: 1000,
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
            `
            this.item_style = `
            width: ${100 / val.parameters.rows}%;
                border-radius:  ${val.parameters.image_radius_t}px ${
              val.parameters.image_radius_t
            }px ${val.parameters.image_radius_b}px ${
              val.parameters.image_radius_b
            }px;
            padding: ${val.parameters.image_margin_tb}px ${
              val.parameters.image_margin_lr
            }px ;
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
  /**/
  .grid-button {
    display: flex;
    flex-wrap: wrap;
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
</style>
