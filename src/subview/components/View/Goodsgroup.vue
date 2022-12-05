<template>
  <div>
    <div v-if="data.parameters.goods_type == 2">
      <div
        v-if="
          data.parameters.goods_item && data.parameters.goods_item.length > 0
        "
        :style="body_style"
      >
        <div
          v-for="(item, index) in data.parameters.goods_item"
          :key="index"
          class="item"
          :style="wrapper_style"
        >
          <div
            v-if="data.parameters.goods_corner_mark"
            style="
              position: absolute;
              top: 10px;
              padding: 5px 10px;
              font-size: 16px;
              color: white;
              background-color: red;
              border-radius: 30px;
            "
          >
            <span v-if="item.type == 0">整手</span>
            <span v-else>散码</span>
          </div>
          <img :src="item.img" :style="img_style" />
          <div class="line__2">
            {{ item.selectTitle }}
          </div>
          <div style="color: gray">副标题副标题副标题</div>
          <div>
            <span style="font-weight: 600; color: black">￥2.00</span>
            <span
              v-if="data.parameters.goods_original_price"
              style="color: gray"
            >
              ￥3.00
            </span>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div style="margin-top: 10px; color: gray">已售2121</div>
            <div
              v-if="data.parameters.goods_tag"
              style="
                padding: 5px 10px;
                font-size: 16px;
                color: white;
                background-color: red;
                border-radius: 30px;
              "
            >
              {{ data.parameters.goods_tag_text }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="image-null"><span class="el-icon-picture"></span></div>
    </div>
    <div v-else>
      <div v-if="data.parameters.goods_num" :style="body_style">
        <div
          v-for="o in data.parameters.goods_num"
          :key="o"
          class="item"
          :style="wrapper_style"
        >
          <div
            v-if="data.parameters.goods_corner_mark"
            style="
              position: absolute;
              top: 10px;
              padding: 5px 10px;
              font-size: 16px;
              color: white;
              background-color: red;
              border-radius: 30px;
            "
          >
            散码
          </div>
          <img
            src="https://img.quanyu.link/FuEmfNWb9-lb_Wags8seNOwppS2C"
            :style="img_style"
          />
          <div class="line__2">
            坚实的快乐大萨达进口量撒娇打卡时间第六届奥斯卡来得及雷克萨就打开链接开了多久萨拉科技
          </div>
          <div style="color: gray">副标题副标题副标题</div>
          <div>
            <span style="font-weight: 600; color: black">￥2.00</span>
            <span
              v-if="data.parameters.goods_original_price"
              style="color: gray"
            >
              ￥3.00
            </span>
          </div>

          <div style="display: flex; justify-content: space-between">
            <div style="margin-top: 10px; color: gray">已售2121</div>
            <div
              v-if="data.parameters.goods_tag"
              style="
                padding: 5px 10px;
                font-size: 16px;
                color: white;
                background-color: red;
                border-radius: 30px;
              "
            >
              {{ data.parameters.goods_tag_text }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="image-null"><span class="el-icon-picture"></span></div>
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
        wrapper_style: {},
        img_style: {},
        body_style: {},
      }
    },
    watch: {
      data: {
        handler: function (val) {
          if (val.parameters.bg_color) {
            this.body_style = `
            display: flex; flex-wrap: wrap;
                padding:${val.parameters.margin_tb}px ${val.parameters.margin_lr}px;
            `
            this.wrapper_style = `
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px;
            `
            this.img_style = `
            width: 100%;
            height: 150px;
            background-color: ${val.parameters.color_goods_bg};
                margin: ${val.parameters.magin_goods_tb}px ${val.parameters.magin_goods_lr}px;
                border-radius: ${val.parameters.radius_t}px ${val.parameters.radius_t}px ${val.parameters.radius_b}px ${val.parameters.radius_b}px;
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
  .item {
    position: relative;
    width: 45%;
  }
  .line__2 {
    display: -webkit-box;
    overflow: hidden;
    font-weight: 600;
    color: black;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
