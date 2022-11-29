<template>
  <div class="banner">
    <el-carousel
      v-if="
        data.parameters.swiper_items && data.parameters.swiper_items.length > 0
      "
      :interval="interval"
      :style="wrapper_style"
    >
      <el-carousel-item
        v-for="(item, index) in data.parameters.swiper_items"
        :key="index"
      >
        <img mode="aspectFill" :src="item.img" />
        <div
          class="sssdaa"
          :style="{
            backgroundColor: 'black',
            width: '100%',
            height: '20px',
            position: 'absolute',
            top: data.parameters.height - 50 + 'px',
            fontSize: '14px',
            padding: '2px 0 0 2px',
            color: 'white',
            opacity: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }"
        >
          {{ item.title }}
        </div>
      </el-carousel-item>
    </el-carousel>
    <div v-else class="image-null"><span class="el-icon-picture"></span></div>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
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
          if (val.parameters.bg_color) {
            this.wrapper_style = `
                height: ${val.parameters.height}px;
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px;
                margin: ${val.parameters.margin_tb}px ${val.parameters.margin_lr}px;
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
  .banner {
    font-size: 0;
    img {
      width: 100%;
    }
    .el-carousel__indicator--horizontal {
      padding: 12px 4px;
    }
    .el-carousel--horizontal {
      overflow-x: hidden;
      overflow-y: hidden;
    }
    .el-carousel__button {
      width: 12px;
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
  }
</style>
