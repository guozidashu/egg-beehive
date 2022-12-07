<template>
  <!-- Banner & Image 通用组件 -->
  <div class="image-content">
    <p class="desc">添加图片 (最多{{ len }}张，可拖动排序）</p>
    <vuedraggable
      v-model="list.parameters.swiper_items"
      style="display: flex; flex-wrap: wrap"
    >
      <template
        v-if="
          list.parameters.swiper_items &&
          list.parameters.swiper_items.length > 0
        "
      >
        <el-card
          v-for="(item, dex) in list.parameters.swiper_items"
          :key="dex"
          class="box-card"
          shadow="hover"
          style="
            position: relative;
            width: 28%;
            margin: 10px;
            text-align: center;
            background-color: #f7f8f9;
          "
        >
          <div class="image">
            <i
              class="el-icon-close"
              style="
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 10px;
              "
              @click="removeImage(dex)"
            ></i>
            <img :src="item.img" @click="addImage(dex)" />
          </div>
          <div style="margin-top: 5px">
            <el-input v-model="item.title" placeholder="请输入标题" />
          </div>
          <el-button
            v-if="item.url == ''"
            style="margin-top: 10px"
            @click="SelectLink(dex)"
          >
            选择链接
          </el-button>
          <div v-else style="margin-top: 20px" @click="SelectLink(dex)">
            <div>
              {{ item.inputTitle }}
            </div>
            <div>
              {{ item.selectTitle }}
            </div>
          </div>
        </el-card>
      </template>

      <el-card
        class="box-card"
        shadow="hover"
        style="width: 28%; margin: 10px; text-align: center"
      >
        <i
          class="el-icon-plus"
          style="margin-top: 20px; font-size: 80px"
          @click="addImage(null)"
        ></i>
        <p class="size">(建议尺寸：750)</p>
      </el-card>
    </vuedraggable>
    <!-- <template
      v-if="
        list.parameters.swiper_items &&
        list.parameters.swiper_items.length < len
      "
    >
      <el-button
        class="add-image"
        icon="el-icon-plus"
        type="primary"
        @click="addImage(null)"
      >
        添加图片
      </el-button>
      <p class="size">（建议尺寸：{{ size }}）</p>
    </template> -->

    <el-form ref="form" label-width="0" :model="list.parameters">
      <h3>组件样式</h3>
      <div style="margin: 10px">背景色</div>
      <el-form-item>
        <div style="display: flex">
          <span style="margin-right: 20px">{{ list.parameters.bg_color }}</span>
          <el-color-picker v-model="list.parameters.bg_color" />
        </div>
      </el-form-item>
      <div style="margin: 10px">左右外边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.margin_lr"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">上下外边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.margin_tb"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">左右内边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.padding_lr"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">上下内边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.padding_tb"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">高度</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.height"
            :max="400"
            :min="100"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">轮播时间</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.interval"
            :max="10"
            :min="1"
            show-input
          />
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
    <vab-upload
      v-if="imgNum > 0 && imageIndex == null"
      ref="vabUpload"
      :limit="imgNum"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <vab-upload
      v-else
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <QYSelectLink ref="edit" @SelectLink="getSelectLink" />
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  import vuedraggable from 'vuedraggable'
  export default {
    name: 'Images',
    components: {
      vuedraggable,
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
          this.list.parameters.swiper_items = val
          this.imgNum = 10 - val.length
          this.$forceUpdate()
        },
        deep: true,
        // immediate: true,
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
      this.imgList = this.list.parameters.swiper_items
    },

    methods: {
      SelectLink(index) {
        this.$refs['edit'].showEdit(index, '1,7,8,9,10,11,12', 1)
      },
      getSelectLink(data) {
        this.list.parameters.swiper_items[data.index].url = data.name
        this.list.parameters.swiper_items[data.index].url = data.selectUrl
        this.list.parameters.swiper_items[data.index].inputTitle =
          data.selectName
        this.list.parameters.swiper_items[data.index].selectTitle =
          data.selectTitle
        if (data.link_type == undefined) {
          this.list.parameters.swiper_items[data.index].opentype = null
        } else {
          this.list.parameters.swiper_items[data.index].opentype =
            data.link_type
        }
      },
      getSon(data) {
        if (this.imageIndex != null) {
          this.list.parameters.swiper_items[this.imageIndex].img = data[0]
          this.imageIndex = null
        } else {
          data.forEach((item) => {
            this.tempList.push({
              img: item,
              url: '',
              title: '',
              opentype: '',
              inputTitle: '',
            })
          })
          if (this.imgList.length > 0) {
            this.imgList = this.imgList.concat(this.tempList)
            this.imgList = this.imgList.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.img === item.img)
            )
          } else {
            this.imgList = this.tempList
          }
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
        this.list.parameters.swiper_items.splice(index, 1)
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
  }
  .image {
    position: relative;
    width: 100%;
    height: 0px;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
