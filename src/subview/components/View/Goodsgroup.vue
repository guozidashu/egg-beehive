<template>
  <div>
    <div v-if="data.parameters.bg_color" style="display: flex; flex-wrap: wrap">
      <div
        v-for="(item, index) in image_items"
        :key="index"
        class="item"
        :style="wrapper_style"
      >
        <div
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
          热卖
        </div>
        <img :src="item.img" :style="img_style" />
        <div class="line__2">
          坚实的快乐大萨达进口量撒娇打卡时间第六届奥斯卡来得及雷克萨就打开链接开了多久萨拉科技
        </div>
        <div style="color: gray">副标题副标题副标题</div>
        <div>
          <span style="font-weight: 600; color: black">￥2.00</span>
          <span style="color: gray">￥3.00</span>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div style="margin-top: 10px; color: gray">已售2121</div>
          <div
            style="
              padding: 5px 10px;
              font-size: 16px;
              color: white;
              background-color: red;
              border-radius: 30px;
            "
          >
            购买
          </div>
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
        img_style: {},
        interval: 1000,
        image_items: [
          {
            img: 'https://wx.qlogo.cn/mmhead/LHdtlaBo22eh6FW1wN32cWKv7pbw5o7gtIIq8vbSVFcjQqF6q9ewDA/0',
            url: '',
          },
          {
            img: 'https://wx.qlogo.cn/mmhead/LHdtlaBo22eh6FW1wN32cWKv7pbw5o7gtIIq8vbSVFcjQqF6q9ewDA/0',
            url: '',
          },
          {
            img: 'https://wx.qlogo.cn/mmhead/LHdtlaBo22eh6FW1wN32cWKv7pbw5o7gtIIq8vbSVFcjQqF6q9ewDA/0',
            url: '',
          },
          {
            img: 'https://wx.qlogo.cn/mmhead/LHdtlaBo22eh6FW1wN32cWKv7pbw5o7gtIIq8vbSVFcjQqF6q9ewDA/0',
            url: '',
          },
        ],
      }
    },
    watch: {
      data: {
        handler: function (val) {
          console.log(val)
          if (val.parameters.bg_color) {
            this.wrapper_style = `
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px;
                margin: ${val.parameters.margin_tb}px ${val.parameters.margin_lr}px;
            `
            this.img_style = `
            width: 100%;
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
