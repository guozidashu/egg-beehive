<template>
  <div>
    <div v-if="form.drawerType != 3">
      <div style="padding: 0 20px 0 20px">
        <div style="display: flex">
          <img
            :src="goodsDetails.img"
            style="width: 80px; height: 80px; margin: 0 10px 10px 0"
          />
          <div>
            <div style="margin-top: 5px; font-size: 14px; font-weight: 600">
              {{ goodsDetails.name }}
            </div>
            <div style="margin: 10px 0">商品ID：{{ goodsDetails.id }}</div>
            <div>上架时间：{{ goodsDetails.upper_time }}</div>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeNameTemp"
        style="padding: 0 25px; margin-top: 10px; margin-left: -5px"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="商品信息" name="0" />
        <el-tab-pane label="客户订单" name="1" />
        <el-tab-pane label="发货列表" name="2" />
        <el-tab-pane label="退货信息" name="3" />
        <el-tab-pane label="调整记录" name="6" />
        <el-tab-pane label="库存明细" name="7" />
        <!-- <el-tab-pane label="操作日志" name="8" /> -->
      </el-tabs>
    </div>
    <div
      v-if="form.drawerType != 3"
      style="position: absolute; top: 15px; right: 60px"
    >
      <vab-icon icon="align-center" style="float: right; margin: 6px 0 0 0" />

      <el-popover
        v-if="form.drawerType == 1"
        placement="bottom"
        trigger="hover"
      >
        <div style="font-size: 12px">收藏商品，有价值的进行补偿</div>
        <el-tag
          slot="reference"
          effect="plain"
          style="margin-top: 5px; margin-right: 5px"
        >
          监控商品
        </el-tag>
      </el-popover>
      <el-button
        v-if="form.drawerType == 1 && form.path == 'erp'"
        v-has-permi="['btn:GoodsManage:edit']"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(2)"
      >
        编辑
      </el-button>
      <el-button
        v-if="form.drawerType == 2"
        v-has-permi="['btn:GoodsManage:edit']"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(1)"
      >
        完成
      </el-button>
    </div>
    <div
      v-if="form.drawerType == 3"
      style="position: absolute; top: 15px; right: 60px"
    >
      <el-button
        v-if="form.drawerType == 1"
        v-has-permi="['btn:GoodsManage:edit']"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(2)"
      >
        编辑
      </el-button>
      <el-button
        v-if="form.drawerType == 2 || form.drawerType == 3"
        v-has-permi="['btn:GoodsManage:edit']"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(1)"
      >
        完成
      </el-button>
    </div>
    <div v-if="tabindex == '0'">
      <div v-if="form.drawerType == 1" ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>商品款号：{{ goodsDetails.sn }}</div>
            <div>商品名称： {{ goodsDetails.name }}</div>
            <div>商城标题： {{ goodsDetails.shoptitle }}</div>
            <div>商品分类：{{ goodsDetails.category_name }}</div>
            <div>商品品牌： {{ goodsDetails.brand_name }}</div>
            <div>年份：{{ goodsDetails.year_name }}</div>
            <div>季节： {{ goodsDetails.season_name }}</div>
            <div>上市波段： {{ goodsDetails.band_name }}</div>
            <div>年龄段： {{ goodsDetails.agegroup_name }}</div>
            <div>
              性别：
              <span v-if="goodsDetails.gender == 1">女</span>
              <span v-if="goodsDetails.gender == 2">男</span>
              <span v-if="goodsDetails.gender == 3">中</span>
            </div>
            <div>
              商品图片：
              <img :src="goodsDetails.img" style="width: 20px; height: 20px" />
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">规格及库位</div>
          <div class="conten-list-row">
            <div>
              颜色：
              <span
                v-for="(item, index) in goodsDetails.color_name"
                :key="index"
              >
                {{ item }}
              </span>
            </div>
            <div>
              尺码：
              <span
                v-for="(item, index) in goodsDetails.size_name"
                :key="index"
              >
                {{ item }}
              </span>
            </div>
            <div>库位名称：{{ goodsDetails.position_name }}</div>
            <div>起售数量：{{ goodsDetails.from_sale }}</div>
            <div>每单限购：{{ goodsDetails.restricted_sale }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">价格信息</div>
          <div class="conten-list-row">
            <div>采购价： ￥{{ goodsDetails.purchase_price }}</div>
            <div>成本价： ￥{{ goodsDetails.cost_price }}</div>
            <div>吊牌价： ￥{{ goodsDetails.sale_price }}</div>
            <div>销售价： ￥{{ goodsDetails.price }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">
              创建时间： {{ goodsDetails.create_time }}
            </div>
            <div style="width: 50%">
              更新时间：
              {{ goodsDetails.update_time }}
            </div>
            <div>
              上架商城：
              <span v-if="goodsDetails.is_shop == 1">上架</span>
              <span v-if="goodsDetails.is_shop == 2">下架</span>
            </div>
            <div>
              置顶商品：
              <span v-if="goodsDetails.is_top == 1">关闭</span>
              <span v-if="goodsDetails.is_top == 2">开启</span>
            </div>
            <!-- <div>设计师： {{ goodsDetails.designer_name }}</div>
            <div>设计师编号： {{ goodsDetails.order_sn }}</div> -->
            <div>
              商品状态：
              <span v-if="goodsDetails.status == 1">在售</span>
              <span v-if="goodsDetails.status == 2">停售</span>
            </div>
            <div style="width: 100%">
              是否同步聚水潭：
              <span v-if="goodsDetails.is_jushuitan == 1">开启</span>
              <span v-if="goodsDetails.is_jushuitan == 0">关闭</span>
            </div>
          </div>
        </div>
      </div>
      <el-form
        v-if="form.drawerType == 2 || form.drawerType == 3"
        ref="form"
        label-width="180px"
        :model="form"
        :rules="rules"
        style="width: 100%"
      >
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">基本信息</div>
            <div class="conten-list-com">
              <el-form-item
                v-if="form.is_quote == 1"
                class="item"
                label="商品款号："
                prop="sn"
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.sn"
                  :disabled="true"
                  placeholder="请输入款号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item
                v-else
                class="item"
                label="商品款号："
                prop="sn"
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.sn"
                  placeholder="请输入款号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品名称：" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入商品名称"
                  style="width: 215px"
                />
              </el-form-item>
              <!-- <el-form-item class="item" label="商品描述：" prop="content">
                <el-input
                  v-model="form.content"
                  placeholder="请输入商品名称"
                  style="width: 215px"
                />
              </el-form-item> -->
              <el-form-item class="item" label="商城标题：" prop="shoptitle">
                <el-input
                  v-model="form.shoptitle"
                  placeholder="请输入批次商城显示的商品名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品款式：" prop="category">
                <el-select
                  v-model="form.category"
                  placeholder="请选择商品款式"
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in selectData.category"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="商品品牌：" prop="brand">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择商品品牌："
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in selectData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="年份：" prop="year">
                <el-select
                  v-model="form.year"
                  placeholder="请选择年份："
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in selectData.year"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item class="item" label="季节：" prop="season">
                <el-select
                  v-model="form.season"
                  placeholder="请选择季节："
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in selectData.season"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item class="item" label="上市波段：">
                <el-select
                  v-model="form.band"
                  placeholder="请选择上市波段："
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in selectData.band"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="年龄段：">
                <el-select
                  v-model="form.agegroup"
                  placeholder="请选择年龄段："
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in selectData.agegroup"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="性别：">
                <el-select
                  v-model="form.gender"
                  placeholder="请选择性别："
                  style="width: 130px"
                >
                  <el-option label="女" :value="1" />
                  <el-option label="男" :value="2" />
                  <el-option label="中" :value="3" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="商品图片：">
                <div style="display: flex">
                  <div>
                    <el-button
                      size="small"
                      style="margin: 0 10px 0 0"
                      type="primary"
                      @click="handleShow()"
                    >
                      上传
                    </el-button>
                  </div>
                  <img
                    v-if="form.img"
                    :src="form.img"
                    style="width: 80px; height: 80px"
                  />
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">规格及库位</div>
            <div class="conten-list-com">
              <el-form-item
                v-if="form.drawerType == 3"
                class="item"
                label="颜色："
                prop="colorid"
              >
                <qy-color-select v-model="form.colorid" />
                <div style="width: 200px; margin: -33px 0 0 90px">
                  <span v-for="(item, idex) in form.color_name" :key="idex">
                    {{ item }}
                  </span>
                </div>
              </el-form-item>
              <el-form-item
                v-if="form.drawerType == 3"
                class="item"
                label="尺码："
                prop="sizeid"
              >
                <qy-size-select v-model="form.sizeid" />
                <div style="width: 200px; margin: -33px 0 0 90px">
                  <span v-for="(item, idex) in form.size_name" :key="idex">
                    {{ item }}
                  </span>
                </div>
              </el-form-item>
              <el-form-item class="item" label="仓库">
                <el-select
                  v-model="form.warehouse"
                  placeholder="请选择仓库："
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in warehouseList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.warehouse" class="item" label="库位：">
                <el-select
                  v-model="form.position"
                  filterable
                  placeholder="请选择/搜索库位："
                  style="width: 130px"
                >
                  <el-option
                    v-for="(item, index) in warehousePositionList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                class="item"
                label="起售数量："
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.from_sale"
                  placeholder="请输入起售数量"
                  style="width: 215px"
                  @input="form.from_sale = $moneyFormatInput(form.from_sale)"
                />
              </el-form-item>
              <el-form-item
                class="item"
                label="每单限购："
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.restricted_sale"
                  placeholder="请输入每单限购数量"
                  style="width: 215px"
                  @input="
                    form.restricted_sale = $moneyFormatInput(
                      form.restricted_sale
                    )
                  "
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">价格信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="采购价：" prop="purchase_price">
                <el-input
                  v-model="form.purchase_price"
                  style="width: 215px"
                  @input="
                    form.purchase_price = $moneyFormatInput(form.purchase_price)
                  "
                />
              </el-form-item>
              <el-form-item class="item" label="成本价：" prop="cost_price">
                <el-input
                  v-model="form.cost_price"
                  style="width: 215px"
                  @input="form.cost_price = $moneyFormatInput(form.cost_price)"
                />
              </el-form-item>
              <el-form-item class="item" label="管理费：">
                <el-input
                  v-model="form.manage_price"
                  style="width: 215px"
                  @input="
                    form.manage_price = $moneyFormatInput(form.manage_price)
                  "
                />
              </el-form-item>
              <el-form-item class="item" label="吊牌价：" prop="sale_price">
                <el-input
                  v-model="form.sale_price"
                  style="width: 215px"
                  @input="form.sale_price = $moneyFormatInput(form.sale_price)"
                />
              </el-form-item>
              <el-form-item class="item" label="销售价：" prop="price">
                <el-input
                  v-model="form.price"
                  clearable
                  style="width: 215px"
                  @input="form.price = $moneyFormatInput(form.price)"
                >
                  <el-button slot="append" @click="changeType()">
                    固定价
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item v-if="lockSta" class="item" style="width: 100%">
                <QYList
                  :list="zhekouList"
                  :list-type="listType"
                  :state="listLoading"
                >
                  <template #List>
                    <el-table-column
                      label="会员等级"
                      prop="name"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="整手折扣"
                      prop="discount"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="金额"
                      prop="price"
                      show-overflow-tooltip
                    >
                      <template #default="{ row }">
                        <el-input
                          v-model="row.price"
                          @input="row.price = $moneyFormatInput(row.price)"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="散码折扣"
                      prop="discount_single"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="金额"
                      prop="price1"
                      show-overflow-tooltip
                    >
                      <template #default="{ row }">
                        <el-input
                          v-model="row.price1"
                          @input="row.price1 = $moneyFormatInput(row.price1)"
                        />
                      </template>
                    </el-table-column>
                  </template>
                </QYList>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item
                v-if="form.drawerType == 3 || form.drawerType == 2"
                class="item"
                label="商品状态："
              >
                <el-radio-group v-model="form.status">
                  <el-radio :label="1">在售</el-radio>
                  <el-radio :label="2">停售</el-radio>
                  <el-radio :label="3">待上市</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="
                  (form.drawerType == 3 || form.drawerType == 2) &&
                  form.id == undefined
                "
                class="item"
                label="是否同步聚水潭(仅限散码)："
              >
                <el-radio-group v-model="form.is_jushuitan">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="置顶商品：" style="width: 100%">
                <el-radio-group v-model="form.is_top">
                  <el-radio :label="2">是否置顶商品</el-radio>
                </el-radio-group>
                <div style="font-size: 12px; color: gray">
                  将当前商品在商品列表里置顶
                </div>
              </el-form-item>
              <el-form-item label="库存预警：" style="width: 100%">
                <el-input
                  v-model="form.goods_stock_warning"
                  placeholder="设置预警值x件时提醒我"
                  style="width: 215px"
                  @input="
                    form.goods_stock_warning = $numFormatInput(
                      form.goods_stock_warning
                    )
                  "
                />
                <div style="font-size: 12px; color: gray">
                  当商品库存小于等于预警值时，系统将发送通知消息提醒我补库存
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      warehousePositionList: {
        type: Array,
        default: () => [],
      },
      warehouseList: {
        type: Array,
        default: () => [],
      },
      goodsDetails: {
        type: Object,
        default: () => {},
      },
      formTemp: {
        type: Object,
        default: () => {},
      },
      tabindex: {
        type: String,
        default: '1',
      },
      rules: {
        type: Object,
        default: () => {},
      },
      selectData: {
        type: Object,
        default: () => {},
      },
      lockSta: {
        type: Boolean,
        default: false,
      },
      zhekouList: {
        type: Array,
        default: () => [],
      },
      listType: {
        type: Number,
        default: 0,
      },
      listLoading: {
        type: Boolean,
        default: false,
      },
      goodsAllNum: {
        type: Object,
        default: () => {},
      },
      activeName: {
        type: String,
        default: '0',
      },
    },
    data() {
      return {
        form: this.formTemp,
        activeNameTemp: this.activeName,
      }
    },
    watch: {
      formTemp(val) {
        this.form = val
      },
      activeName: {
        handler: function (val) {
          this.activeNameTemp = val
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      changeType(type) {
        this.$emit('changeType', type)
      },
      handleShow() {
        this.$emit('handleShow')
      },
      changeTypeBtn(type) {
        if (type != 1) {
          this.$emit('changeTypeBtn', type)
        } else {
          this.$refs['form'].validate(async (valid) => {
            if (valid) {
              this.$emit('changeTypeBtn', type)
            }
          })
        }
      },
      handleClick(tab) {
        this.$emit('handleClick', tab)
      },
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep {
    .el-form-item__label,
    .el-input__inner {
      font-size: 12px;
    }
  }

  .head {
    padding: 30px 35px 25px;
  }

  .drawer-tab {
    padding: 0 25px;

    .conten-warp {
      padding: 25px 0;
      border-bottom: 1px dashed #eee;

      .conten-title {
        padding-left: 10px;
        font-size: 15px;
        line-height: 15px;
        color: #303133;
        border-left: 3px solid #1890ff;
      }

      .conten-list-row {
        display: flex;
        flex-wrap: wrap;

        div {
          width: 33%;
          margin-top: 16px;
        }
      }

      .conten-list-com {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 50%;
          margin-top: 16px;
        }
      }
    }
  }
</style>
