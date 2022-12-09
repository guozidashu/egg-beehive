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
          style="width: 50%"
        >
          <div :style="wrapper_style">
            <div style="position: relative">
              <div
                v-if="data.parameters.goods_corner_mark"
                :style="{
                  position: 'absolute',
                  top: '0',
                  padding: '5px 10px',
                  fontSize: '13px',
                  color: 'white',
                  backgroundColor: ' rgba(255, 70, 80, 0.9)',
                  borderRadius:
                    data.parameters.radius_t +
                    'px ' +
                    '0px ' +
                    data.parameters.radius_b +
                    'px ' +
                    '0px',
                }"
              >
                <span v-if="item.type == 0">整手</span>
                <span v-else>散码</span>
              </div>
            </div>
            <img :src="item.img" :style="img_style" />
            <div style="padding: 10px">
              <div class="line__2" style="font-size: 14px">
                {{ item.selectTitle }}
              </div>
              <!-- <div style="color: gray">副标题副标题副标题</div> -->
              <div>
                <span style="font-size: 16px; font-weight: 600; color: red">
                  ￥2.00
                </span>
                <span
                  v-if="data.parameters.goods_original_price"
                  style="
                    font-size: 13px;
                    color: gray;
                    text-decoration: line-through;
                  "
                >
                  ￥3.00
                </span>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div
                  v-if="data.parameters.show_sales"
                  style="margin-top: 10px; font-size: 13px; color: gray"
                >
                  已售2121
                </div>
                <div
                  v-if="data.parameters.goods_tag"
                  style="
                    padding: 5px 10px;
                    font-size: 13px;
                    color: white;
                    background-color: rgba(255, 70, 80, 0.9);
                    border-radius: 30px;
                  "
                >
                  {{ data.parameters.goods_tag_text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="image-null"><span class="el-icon-picture"></span></div>
    </div>
    <div v-else>
      <div v-if="data.parameters.goods_num" :style="body_style">
        <div v-for="o in data.parameters.goods_num" :key="o" style="width: 50%">
          <div :style="wrapper_style">
            <div style="position: relative">
              <div
                v-if="data.parameters.goods_corner_mark"
                :style="{
                  position: 'absolute',
                  top: '0',
                  padding: '5px 10px',
                  fontSize: '13px',
                  color: 'white',
                  backgroundColor: ' rgba(255, 70, 80, 0.9)',
                  borderRadius:
                    data.parameters.radius_t +
                    'px ' +
                    '0px ' +
                    data.parameters.radius_b +
                    'px ' +
                    '0px',
                }"
              >
                散码
              </div>
            </div>
            <img
              src="https://img.quanyu.link/FuEmfNWb9-lb_Wags8seNOwppS2C"
              :style="img_style"
            />
            <div style="padding: 10px">
              <div class="line__2" style="font-size: 14px">
                坚实的快乐大萨达进口量撒娇打卡时间第六届奥斯卡来得及雷克萨就打开链接开了多久萨拉科技
              </div>
              <!-- <div style="color: gray">副标题副标题副标题</div> -->
              <div>
                <span style="font-size: 16px; font-weight: 600; color: red">
                  ￥2.00
                </span>
                <span
                  v-if="data.parameters.goods_original_price"
                  style="
                    font-size: 13px;
                    color: gray;
                    text-decoration: line-through;
                  "
                >
                  ￥3.00
                </span>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div style="margin-top: 10px; font-size: 13px; color: gray">
                  已售2121
                </div>
                <div
                  v-if="data.parameters.goods_tag"
                  style="
                    padding: 5px 10px;
                    font-size: 13px;
                    color: white;
                    background-color: rgba(255, 70, 80, 0.9);
                    border-radius: 30px;
                  "
                >
                  {{ data.parameters.goods_tag_text }}
                </div>
              </div>
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
            justify-content: space-between;
                margin:${val.parameters.margin_tb}px ${val.parameters.margin_lr}px;
                background-color: ${val.parameters.bg_color};
                padding: ${val.parameters.padding_tb}px ${val.parameters.padding_lr}px;
            `
            this.wrapper_style = `
            backgroundColor: ${val.parameters.color_goods_bg};
          borderRadius: ${val.parameters.radius_t}px ${val.parameters.radius_t}px ${val.parameters.radius_b}px ${val.parameters.radius_b}px;
          margin: ${val.parameters.magin_goods_tb}px ${val.parameters.magin_goods_lr}px;
            `
            this.img_style = `
            width: 100%;
            height: 165px;
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
