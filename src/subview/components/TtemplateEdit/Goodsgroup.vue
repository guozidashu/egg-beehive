<template>
  <div class="image-content">
    <el-form ref="form" :model="list.parameters">
      <!-- <el-form-item>
        <el-button icon="el-icon-plus" type="primary" @click="SelectLink()">
          选择商品
        </el-button>
      </el-form-item> -->
      <h3>组件样式</h3>
      <div style="margin: 10px">展示商品</div>
      <el-form-item>
        <el-radio-group v-model="list.parameters.goods_type">
          <el-radio :label="0">分组</el-radio>
          <el-radio :label="1">分类</el-radio>
          <el-radio :label="2">指定</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="list.parameters.goods_type == 0" style="margin: 10px">
        商品分组
      </div>
      <el-form-item v-if="list.parameters.goods_type == 0">
        <el-select
          v-model="list.parameters.goods_group_id"
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
      <div v-if="list.parameters.goods_type == 1" style="margin: 10px">
        商品分类
      </div>
      <el-form-item v-if="list.parameters.goods_type == 1">
        <el-cascader
          v-model="list.parameters.goods_classify"
          clearable
          :options="goodsCategoryList"
          placeholder="请选择商品分组"
          :props="{ checkStrictly: true }"
        />
      </el-form-item>
      <div v-if="list.parameters.goods_type == 0" style="margin: 10px">
        分组个数
      </div>
      <div v-if="list.parameters.goods_type == 1" style="margin: 10px">
        分类个数
      </div>
      <el-form-item
        v-if="
          list.parameters.goods_type == 0 || list.parameters.goods_type == 1
        "
      >
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.goods_num"
            :max="10"
            :min="1"
            show-input
          />
        </div>
      </el-form-item>
      <vuedraggable
        v-if="list.parameters.goods_type == 2"
        v-model="list.parameters.goods_item"
        style="display: flex; flex-wrap: wrap"
      >
        <template
          v-if="
            list.parameters.goods_item && list.parameters.goods_item.length > 0
          "
        >
          <el-card
            v-for="(item, dex) in list.parameters.goods_item"
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
            <div style="position: relative">
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
              <el-image :src="item.img">
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
            </div>
            <div style="margin-top: 20px">
              <div>
                {{ item.title }}
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
            @click="SelectLink()"
          ></i>
          <p class="size">选择商品</p>
          <p class="size">(建议尺寸：750)</p>
        </el-card>
      </vuedraggable>
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
      <div style="margin: 10px">显示尺码类型</div>
      <el-form-item>
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
      <div style="margin: 10px">显示原价</div>
      <el-form-item>
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
      <div style="margin: 10px">显示销售价</div>
      <el-form-item>
        <el-switch
          v-model="list.parameters.show_sales"
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
      <div style="margin: 10px">是否显示购买按钮</div>
      <el-form-item>
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
      <div v-if="list.parameters.goods_tag == 1" style="margin: 10px">
        购买按钮文字
      </div>
      <el-form-item v-if="list.parameters.goods_tag == 1">
        <div style="padding: 0 10px">
          <el-input v-model="list.parameters.goods_tag_text" />
        </div>
      </el-form-item>
      <h3>商品样式</h3>
      <div style="margin: 10px">商品背景色</div>
      <el-form-item>
        <div style="display: flex">
          <span style="margin-right: 20px">
            {{ list.parameters.color_goods_bg }}
          </span>
          <el-color-picker v-model="list.parameters.color_goods_bg" />
        </div>
      </el-form-item>
      <div style="margin: 10px">商品左右外边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.magin_goods_lr"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">商品上下外边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.magin_goods_tb"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">商品上方圆角</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.radius_t"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">商品下方圆角</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.radius_b"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
    </el-form>
    <QYSelectLink ref="edit" @SelectLink="getSelectLink" />
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'
  export default {
    name: 'Goodsgroup',
    components: { vuedraggable },
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
      },
      removeImage(index) {
        this.list.parameters.goods_item.splice(index, 1)
      },
      getSelectLink(data) {
        let arr = []
        data.forEach((item) => {
          let obj = {}
          obj.url = item.selectUrl
          obj.title = item.selectName
          obj.selectTitle = item.selectTitle
          obj.img = item.img
          obj.type = item.type
          obj.goods_id = item.id
          if (item.link_type == undefined) {
            obj.opentype = null
          } else {
            obj.opentype = item.link_type
          }
          arr.push(obj)
        })
        this.list.parameters.goods_item =
          this.list.parameters.goods_item.concat(arr)
        this.list.parameters.goods_item =
          this.list.parameters.goods_item.filter((item, index, self) => {
            return self.findIndex((t) => t.url === item.url) === index
          })
      },
      async getGoodsGroup() {
        const { data } = await this.api.getGoodsGroupList()
        this.goodsGroupList = data
      },
      async getGoodsCategory() {
        const { data } = await this.api.getGoodsCategoryTree()
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
