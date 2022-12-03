<template>
  <div class="image-content">
    <vuedraggable
      v-if="list.parameters.goods_item && list.parameters.goods_item.length > 0"
      v-model="list.parameters.goods_item"
      class="image-list"
      :class="{ disable: data.tabType == 2 }"
      draggable="li"
      style="margin: 20px 0 0 0"
      tag="ul"
    >
      <li v-for="(item, dex) in list.parameters.goods_item" :key="dex">
        <div class="l-info">
          <el-form class="demo-form-inline" label-width="80px">
            <el-form-item label="商品名称：">
              <el-input
                v-model="item.goods_name"
                placeholder="请输入商品名称"
                style="width: 82%"
              />
            </el-form-item>
            <el-form-item label="跳转类型：">
              <el-input
                v-model="item.link_type"
                class="input-with-select"
                placeholder="请输入跳转链接"
                style="width: 82%"
              />
            </el-form-item>
            <el-form-item label="跳转链接：">
              <el-input
                v-model="item.goods_url"
                class="input-with-select"
                placeholder="请输入跳转链接"
                style="width: 82%"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="r-image">
          <span class="el-icon-close" @click="removeImage(dex)"></span>
          <div class="image-box">
            <img :src="item.goods_img" />
          </div>
        </div>
      </li>
    </vuedraggable>
    <el-form ref="form" label-width="100px" :model="list.parameters">
      <el-form-item>
        <el-button icon="el-icon-plus" type="primary" @click="SelectLink()">
          选择商品
        </el-button>
      </el-form-item>
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
      <el-form-item class="item" label="商品分组：">
        <el-select
          v-model="list.parameters.goods_grouping"
          placeholder="请选择商品分组"
        >
          <el-option
            v-for="(item, dex) in goodsGroupList"
            :key="dex"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="item" label="商品分类：">
        <el-cascader
          v-model="list.parameters.goods_classify"
          filterable
          :options="goodsCategoryList"
          placeholder="请选择商品分组"
        />
      </el-form-item>
      <el-form-item label="尺码类型">
        <el-radio-group v-model="list.parameters.goods_type">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">整手</el-radio>
          <el-radio :label="2">散码</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-switch
          v-model="list.parameters.goods_tag"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="0"
          style="margin: 0 10px"
        />
      </el-form-item>
      <el-form-item label="显示原价">
        <el-switch
          v-model="list.parameters.goods_original_price"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="0"
          style="margin: 0 10px"
        />
      </el-form-item>
      <el-form-item label="显示角标">
        <el-switch
          v-model="list.parameters.goods_corner_mark"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="0"
          style="margin: 0 10px"
        />
      </el-form-item>
      <el-form-item label="显示一首数量">
        <el-switch
          v-model="list.parameters.goods_num"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="0"
          style="margin: 0 10px"
        />
      </el-form-item>
      <el-form-item label="购买按钮显示文字">
        <el-switch
          v-model="list.parameters.goods_text_state"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="0"
          style="margin: 0 10px"
        />
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
    <QYSelectLink ref="edit" @SelectLink="getSelectLink" />
  </div>
</template>

<script>
  import { getGoodsGroupList, getGoodsCategoryTree } from '@/api/basic'
  export default {
    name: 'Images',
    components: {},
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        tempList: [],
        list: {},
        goodsGroupList: [],
        goodsCategoryList: [],
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
      this.getGoodsGroup()
      this.getGoodsCategory()
    },

    methods: {
      SelectLink() {
        this.$refs['edit'].showEdit(null, '10', 2)
        // '1,7,8,9,10,11,12'
      },
      removeImage(index) {
        this.list.parameters.goods_item.splice(index, 1)
      },
      getSelectLink(data, data1) {
        let arr = []
        data.forEach((item) => {
          arr.push({
            goods_id: item.id,
            goods_name: item.name,
            goods_img: item.img,
            goods_url: data1.url + item.id,
            link_type: data1.link_type,
          })
        })
        this.list.parameters.goods_item =
          this.list.parameters.goods_item.concat(arr)
        this.list.parameters.goods_item =
          this.list.parameters.goods_item.filter((item, index, self) => {
            return (
              self.findIndex((t) => {
                return t.goods_id === item.goods_id
              }) === index
            )
          })
      },
      async getGoodsGroup() {
        const { data } = await getGoodsGroupList()
        this.goodsGroupList = data
      },
      async getGoodsCategory() {
        const { data } = await getGoodsCategoryTree()
        data.forEach((item) => {
          item.label = item.name
          item.value = item.id
          if (item.children) {
            item.children.forEach((item2) => {
              item2.label = item2.name
              item2.value = item2.id
            })
          }
        })
        this.goodsCategoryList = data
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
