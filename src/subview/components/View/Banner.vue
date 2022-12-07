<template>
  <div>
    <div v-if="data.tab_type == 1 || data.tab_type == 2" class="banner2">
      <el-carousel
        v-if="
          data.parameters.swiper_items &&
          data.parameters.swiper_items.length > 0
        "
        :interval="interval"
        :style="wrapper_style"
      >
        <el-carousel-item
          v-for="(item, index) in data.parameters.swiper_items"
          :key="index"
          :style="{
            height: data.parameters.height + 'px',
          }"
        >
          <el-image
            :src="item.img"
            :style="{ width: '100%', height: data.parameters.height + 'px' }"
          />
        </el-carousel-item>
      </el-carousel>
      <div v-else class="image-null"><span class="el-icon-picture"></span></div>
    </div>
    <div v-if="data.tab_type == 3" class="banner3">
      <el-carousel
        v-if="
          data.parameters.swiper_items &&
          data.parameters.swiper_items.length > 0
        "
        indicator-position="none"
        :interval="interval"
        :style="wrapper_style"
      >
        <el-carousel-item
          v-for="(item, index) in data.parameters.swiper_items"
          :key="index"
          :style="{
            height: data.parameters.height + 'px',
            borderRadius: '24px',
          }"
        >
          <el-image
            :src="item.img"
            :style="{ width: '100%', height: data.parameters.height + 'px' }"
          />
          <div
            :style="{
              backgroundColor: 'black',
              width: '100%',
              height: '20px',
              position: 'absolute',
              top: data.parameters.height - 20 + 'px',
              fontSize: '14px',
              padding: '2px 0 0 2px',
              color: 'white',
              opacity: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }"
          >
            <span style="margin-left: 15px">{{ item.title }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-if="data.tab_type == 4" class="banner3">
      <el-carousel
        v-if="
          data.parameters.swiper_items &&
          data.parameters.swiper_items.length > 0
        "
        :interval="interval"
        :style="wrapper_style"
      >
        <el-carousel-item
          v-for="(item, index) in data.parameters.swiper_items"
          :key="index"
          :style="{
            height: data.parameters.height + 'px',
          }"
        >
          <el-image
            :src="item.img"
            :style="{ width: '100%', height: data.parameters.height + 'px' }"
          />
        </el-carousel-item>
      </el-carousel>
      <div v-else class="image-null"><span class="el-icon-picture"></span></div>
    </div>
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
            if (val.tab_type == 1) {
              this.wrapper_style = `
                height: ${val.parameters.height}px;
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px;
                margin: ${val.parameters.margin_tb}px ${val.parameters.margin_lr}px;
            `
            } else if (val.tab_type == 2) {
              this.wrapper_style = `
                height: ${val.parameters.height}px;
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px 0 ${
                val.parameters.padding_tb
              }px ${val.parameters.padding_lr + 30}px;
                margin: ${val.parameters.margin_tb}px ${
                val.parameters.margin_lr
              }px;
            `
            } else if (val.tab_type == 3) {
              this.wrapper_style = `
                height: ${val.parameters.height}px;
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${
                val.parameters.padding_lr + 20
              }px;
                margin: ${val.parameters.margin_tb}px ${
                val.parameters.margin_lr
              }px;
            `
            } else if (val.tab_type == 4) {
              this.wrapper_style = `
                height: ${val.parameters.height + 20}px;
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${
                val.parameters.padding_lr
              }px ${val.parameters.padding_tb + 30}px ${
                val.parameters.padding_lr + 20
              }px;
                margin: ${val.parameters.margin_tb}px ${
                val.parameters.margin_lr
              }px;
            `
            }

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

<style lang="scss">
  .banner3,
  .banner2,
  .banner4 {
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
  .banner3 {
    .el-carousel__button {
      width: 12px;
    }
  }
  .banner2 {
    .el-carousel__button {
      // 指示器按钮
      width: 10px;
      height: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      border-radius: 50%;
    }
    .is-active .el-carousel__button {
      // 指示器激活按钮
      background: #3f8ec8;
    }
  }
</style>
