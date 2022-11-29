<template>
  <!-- Banner & Image 通用组件 -->
  <div class="image-content">
    <p class="desc">添加图片 (最多{{ len }}张，可拖动排序）</p>
    <!-- <vuedraggable
      v-if="image_items && image_items.length > 0"
      v-model="image_items"
      class="image-list"
      :class="{ disable: data.tabType == 2 }"
      draggable="li"
      tag="ul"
    >
      <li v-for="(item, dex) in image_items" :key="dex">
        <div class="l-info">
          <p style="margin-top: 40px">
            <span>是否热卖：</span>
            <el-radio-group v-model="item.sta">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </p>
        </div>
        <div class="r-image">
          <span class="el-icon-close" @click="removeImage(dex)"></span>
          <div class="image-box">
            <img :src="item.img" />
          </div>
        </div>
      </li>
    </vuedraggable> -->
    <!-- <template v-if="image_items && image_items.length < len">
      <el-button
        class="add-image"
        icon="el-icon-plus"
        type="primary"
        @click="addImage(null)"
      >
        添加图片
      </el-button>
      <p class="size">（建议尺寸：{{ size }}</p>
    </template> -->

    <el-form ref="form" label-width="100px" :model="list.parameters">
      <el-form-item label="背景色">
        <div style="display: flex">
          <span style="margin-right: 20px">{{ list.parameters.bg_color }}</span>
          <el-color-picker v-model="list.parameters.bg_color" />
        </div>
      </el-form-item>
      <el-form-item label="商品背景色">
        <div style="display: flex">
          <span style="margin-right: 20px">
            {{ list.parameters.color_goods_bg }}
          </span>
          <el-color-picker v-model="list.parameters.color_goods_bg" />
        </div>
      </el-form-item>
      <el-form-item label="左右内边距">
        <div class="block">
          <el-slider v-model="list.parameters.margin_lr" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="上下内边距">
        <div class="block">
          <el-slider v-model="list.parameters.margin_tb" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="左右外边距">
        <div class="block">
          <el-slider v-model="list.parameters.padding_lr" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="上下外边距">
        <div class="block">
          <el-slider v-model="list.parameters.padding_tb" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="商品左右内边距">
        <div class="block">
          <el-slider
            v-model="list.parameters.magin_goods_lr"
            :max="50"
            :min="0"
          />
        </div>
      </el-form-item>
      <el-form-item label="商品上下内边距">
        <div class="block">
          <el-slider
            v-model="list.parameters.magin_goods_tb"
            :max="50"
            :min="0"
          />
        </div>
      </el-form-item>
      <el-form-item label="商品上方圆角">
        <div class="block">
          <el-slider v-model="list.parameters.radius_t" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="商品下方圆角">
        <div class="block">
          <el-slider v-model="list.parameters.radius_b" :max="50" :min="0" />
        </div>
      </el-form-item>
    </el-form>
    <!-- <el-upload
      ref="upload"
      action
      :http-request="upload"
      multiple
      :show-file-list="false"
      style="display: none"
    /> -->
    <el-dialog title="请填写图片跳转链接" :visible.sync="show" @close="close">
      <el-form label-width="100px">
        <el-form-item label="跳转链接">
          <el-input v-model="url" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <vab-upload
      v-if="imgNum > 0"
      ref="vabUpload"
      :limit="imgNum"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  // import vuedraggable from 'vuedraggable'
  export default {
    name: 'Images',
    components: {
      // vuedraggable,
      VabUpload,
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        imgNum: 10,
        tempList: [],
        imgList: [],
        list: {},
        url: '',
        index: null,
        show: false,
        imageIndex: null,
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
    computed: {
      size() {
        return this.list.type == 'images' ? '750*750' : '750*400'
      },
      len() {
        return this.list.type == 'images' ? 8 : 10
      },
    },
    watch: {
      imgList: {
        handler(val) {
          this.tempList = []
          this.list.data = val
          this.imgNum = 10 - val.length
          this.$forceUpdate()
        },
        deep: true,
        immediate: true,
      },
      data: {
        handler(val) {
          this.list = val
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.list = this.data
    },

    methods: {
      getSon(data) {
        data.forEach((item) => {
          this.tempList.push({
            url: item,
            title: '',
            name: '',
            link: '',
          })
        })
        if (this.imgList.length > 0) {
          this.imgList = this.imgList.concat(this.tempList)
          this.imgList = this.imgList.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.url === item.url)
          )
        } else {
          this.imgList = this.tempList
        }
      },
      close() {
        this.show = false
        this.url = ''
      },
      confirm() {
        this.list['data'][this.index]['link'] = this.url
        this.close()
      },
      urlPopup(index) {
        this.show = true
        this.index = index
        // this.url = link
      },
      removeImage(index) {
        this.list.data.splice(index, 1)
      },
      addImage(index) {
        this.imageIndex = index
        this.$refs['vabUpload'].handleShow()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .image-content {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    overflow: auto;

    .desc {
      padding-bottom: 10px;
      margin: 18px 0;
      font-size: 12px;
      color: #666;
      text-align: center;
      border-bottom: 1px dashed #ddd;
    }

    .size {
      margin-bottom: 0;
      font-size: 12px;
      color: #999;
      text-align: center;
    }

    .add-image {
      width: calc(100% - 20px);
      height: 34px;
      padding: 0;
      margin-top: 10px;
      margin-left: 10px;
      font-size: 12px;
      line-height: 34px;
    }

    .image-list {
      padding: 0 10px;
      margin: 0;

      // overflow: auto;
      &::-webkit-scrollbar-thumb {
        background: #dbdbdb;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f6f6f6;
        border-radius: 10px;
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      li {
        display: flex;
        justify-content: space-between;
        padding: 6px 14px 10px;
        margin-bottom: 10px;
        list-style: none;
        background: #f7f8f9;
        border-radius: 4px;

        &.disable div {
          pointer-events: none;
          user-select: none;
        }

        .l-info {
          width: calc(100% - 70px);
          padding-top: 8px;
          font-size: 12px;

          p {
            display: flex;
            margin: 12px 0 0;
            overflow: hidden;
            white-space: nowrap;

            .link {
              color: #1b8bff;
              cursor: pointer;
            }

            .text {
              overflow: hidden;
              text-align: -webkit-auto;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .r-image {
          text-align: right;

          .el-icon-close {
            margin-bottom: 6px;
            font-size: 12px;
            font-weight: 600;
            color: #999;
            cursor: pointer;

            &:hover {
              color: red;
            }
          }

          .image-box {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            overflow: hidden;
            background: #fff;
            border-radius: 5px;

            &::before {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              content: '';
              background: rgba(0, 0, 0, 0.5);
              opacity: 0;
              transition: all 0.3s;
            }

            span {
              position: absolute;
              top: 50%;
              left: 50%;
              font-size: 20px;
              color: #fff;
              cursor: pointer;
              opacity: 0;
              transition: all 0.3s;
              transform: translate(-50%, -50%);
            }

            img {
              max-width: 100%;
            }

            &:hover {
              &::before,
              span {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
</style>
