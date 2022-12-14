<template>
  <!-- Banner & Image 通用组件 -->
  <div class="image-content">
    <el-form ref="form" :model="list.parameters" style="margin-top: 20px">
      <h3>组件样式</h3>
      <img
        v-if="list.parameters.bg_Image"
        :src="list.parameters.bg_Image"
        style="width: 150px; height: 150px"
        @click="addImage()"
      />
      <el-form-item v-else>
        <el-button
          class="add-image"
          icon="el-icon-plus"
          type="primary"
          @click="addImage()"
        >
          添加背景图片
        </el-button>
      </el-form-item>
      <div style="margin: 10px">背景色</div>
      <el-form-item>
        <div style="display: flex">
          <span style="margin-right: 20px">{{ list.parameters.bg_color }}</span>
          <el-color-picker v-model="list.parameters.bg_color" />
        </div>
      </el-form-item>
      <div style="margin: 10px">与上方距离</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.margin_top"
            :max="100"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">左右边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.margin_lr"
            :max="100"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <h3>热区样式</h3>
      <vuedraggable
        v-if="list.parameters.hotspots && list.parameters.hotspots.length > 0"
        v-model="list.parameters.hotspots"
        class="image-list"
        :class="{ disable: data.tab_type == 2 }"
        draggable="li"
        tag="ul"
      >
        <li v-for="(item, dex) in list.parameters.hotspots" :key="dex">
          <div class="l-info">
            <el-form class="demo-form-inline">
              <div style="margin: 10px">跳转链接</div>
              <el-form-item>
                <el-input
                  v-model="item.title"
                  class="input-with-select"
                  placeholder="请输入跳转链接"
                >
                  <el-button slot="append" @click="SelectLink(dex)">
                    选择链接
                  </el-button>
                </el-input>
              </el-form-item>
              <div style="margin: 10px">热区色块</div>
              <el-form-item>
                <div style="display: flex">
                  <span style="margin-right: 20px">
                    {{ item.bg_color }}
                  </span>
                  <!-- <el-color-picker v-model="item.bg_color" /> -->
                </div>
              </el-form-item>
              <div style="margin: 10px">与上方距离</div>
              <el-form-item>
                <div style="padding: 0 10px">
                  <el-slider
                    v-model="item.hotspots_margin_top"
                    :format-tooltip="handlDelta"
                    :max="100"
                    :min="0"
                    show-input
                  />
                </div>
              </el-form-item>
              <div style="margin: 10px">左右边距</div>
              <el-form-item>
                <div style="padding: 0 10px">
                  <el-slider
                    v-model="item.hotspots_margin_lr"
                    :format-tooltip="handlDelta"
                    :max="100"
                    :min="0"
                    show-input
                  />
                </div>
              </el-form-item>
              <div style="margin: 10px">宽度</div>
              <el-form-item>
                <div style="padding: 0 10px">
                  <el-slider
                    v-model="item.width"
                    :format-tooltip="handlDelta"
                    :max="100"
                    :min="0"
                    show-input
                  />
                </div>
              </el-form-item>
              <div style="margin: 10px">高度</div>
              <el-form-item>
                <div style="padding: 0 10px">
                  <el-slider
                    v-model="item.height"
                    :format-tooltip="handlDelta"
                    :max="100"
                    :min="0"
                    show-input
                  />
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="r-image">
            <span class="el-icon-close" @click="removeImage(dex)"></span>
          </div>
        </li>
      </vuedraggable>
      <el-form-item>
        <el-button
          class="add-image"
          icon="el-icon-plus"
          type="primary"
          @click="addHotspots()"
        >
          添加热区
        </el-button>
      </el-form-item>
    </el-form>
    <vab-upload
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
    name: 'Hotspots',
    components: {
      VabUpload,
      vuedraggable,
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        list: {},
      }
    },
    watch: {
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
      handlDelta(e) {
        return e + '%'
      },
      removeImage(index) {
        this.list.parameters.hotspots.splice(index, 1)
      },
      SelectLink(index) {
        this.$refs['edit'].showEdit(index, '1,7,8,9,10,11,12', 1)
      },
      getSelectLink(data) {
        // this.list.parameters.hotspots[data.index].url = data.name
        this.list.parameters.hotspots[data.index].url = data.selectUrl
        this.list.parameters.hotspots[data.index].title = data.selectName
        this.list.parameters.hotspots[data.index].selectTitle = data.selectTitle
        if (data.link_type == undefined) {
          this.list.parameters.hotspots[data.index].opentype = null
        } else {
          this.list.parameters.hotspots[data.index].opentype = data.link_type
        }
        this.$forceUpdate()
      },
      getSon(data) {
        this.list.parameters.bg_Image = data[0]
      },
      addImage() {
        this.$refs['vabUpload'].handleShow()
      },
      addHotspots() {
        this.list.parameters.hotspots.push({
          name: '',
          url: '',
          opentype: '',
          hotspots_margin_top: 0,
          hotspots_margin_lr: 0,
          width: 50,
          height: 50,
          bg_color: this.color16(),
        })
      },
      //十六进制颜色随机
      color16() {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        return color
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
</style>
