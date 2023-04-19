<template>
  <div>
    <div
      v-if="data.parameters.grid_items && data.parameters.grid_items.length > 0"
      class="grid-button"
      :style="wrapper_style"
    >
      <div
        v-for="(item, index) in data.parameters.grid_items"
        :key="index"
        :style="item_style"
      >
        <div
          :style="{
            padding:
              data.parameters.image_padding_tb +
              'px ' +
              data.parameters.image_padding_lr +
              'px',
          }"
        >
          <el-image mode="aspectFill" :src="item.img" :style="img_style">
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
          <div>{{ item.inputTitle }}</div>
        </div>
      </div>
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
        img_style: {},
      }
    },
    watch: {
      data: {
        handler: function (val) {
          if (val.parameters.bg_color) {
            this.wrapper_style = `
                background-color: ${val.parameters.bg_color};
                border-radius:  ${val.parameters.radius_t}px ${val.parameters.radius_t}px ${val.parameters.radius_b}px ${val.parameters.radius_b}px;
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px ;
                margin: ${val.parameters.margin_tb}px ${val.parameters.margin_lr}px ;
            `
            this.item_style = `
            text-align: center;
            width: ${100 / val.parameters.rows}%;
            `
            this.img_style = `
            height: 40px;
            width: 40px;
           border-radius:  ${val.parameters.image_radius_t}px ${val.parameters.image_radius_t}px ${val.parameters.image_radius_b}px ${val.parameters.image_radius_b}px;
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
