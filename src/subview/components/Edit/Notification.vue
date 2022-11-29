<template>
  <!-- Banner & Image 通用组件 -->
  <div class="image-content">
    <vuedraggable
      v-if="
        list.parameters.speaker_items &&
        list.parameters.speaker_items.length > 0
      "
      v-model="list.parameters.speaker_items"
      class="image-list"
      :class="{ disable: data.tabType == 2 }"
      draggable="li"
      style="margin-top: 20px"
      tag="ul"
    >
      <li v-for="(item, dex) in list.parameters.speaker_items" :key="dex">
        <div class="l-info">
          <p>
            <span style="margin-top: 5px">标题：</span>
            <el-input
              v-model="item.title"
              placeholder="请输入标题"
              size="mini"
            />
          </p>
        </div>
        <div class="r-image">
          <span class="el-icon-close" @click="removeImage(dex)"></span>
        </div>
      </li>
    </vuedraggable>
    <el-form ref="form" label-width="100px" :model="list.parameters">
      <el-button
        class="add-image"
        icon="el-icon-plus"
        style="margin-bottom: 20px"
        type="primary"
        @click="addImage()"
      >
        添加标题
      </el-button>
      <el-form-item label="背景色">
        <div style="display: flex">
          <span style="margin-right: 20px">{{ list.parameters.bg_color }}</span>
          <el-color-picker v-model="list.parameters.bg_color" />
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
      <el-form-item label="轮播时间">
        <div class="block">
          <el-slider v-model="list.parameters.interval" :max="10" :min="1" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'
  export default {
    name: 'Notification',
    components: {
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
      removeImage(index) {
        this.list.parameters.speaker_items.splice(index, 1)
      },
      addImage() {
        this.list.parameters.speaker_items.push({
          title: '',
        })
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
