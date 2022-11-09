<template>
  <div class="components-drawer">
    <div v-if="form.drawerType != 3">
      <div style="padding: 30px 35px 25px">
        <div>
          <el-row :gutter="20">
            <el-col :span="12" style="display: flex">
              <img
                :src="goodsDetails.img"
                style="width: 50px; height: 50px; margin: 0 10px 10px 0"
              />
              <div style="margin-top: -5px">
                <div style="margin: 15px 0 0 0">
                  款号：{{ goodsDetails.sn }}
                </div>
                <div>名称：{{ goodsDetails.name }}</div>
              </div>
            </el-col>

            <el-col :span="12">
              <vab-icon
                icon="align-center"
                style="float: right; margin: 6px 0 0 0"
              />
              <el-button
                native-type="submit"
                size="small"
                style="float: right; margin: 0 10px"
                type="primary"
                @click="upMembers(3)"
              >
                停售
              </el-button>
              <el-button
                v-if="form.drawerType == 1"
                native-type="submit"
                size="small"
                style="float: right"
                type="primary"
                @click="print('vab-print-table')"
              >
                打印
              </el-button>
              <el-button
                native-type="submit"
                size="small"
                style="float: right"
                type="primary"
                @click="upMembers(1)"
              >
                审核
              </el-button>
              <el-button
                v-if="form.drawerType == 1"
                native-type="submit"
                size="small"
                style="float: right"
                type="primary"
                @click="form.drawerType = 2"
              >
                编辑
              </el-button>
              <el-button
                v-if="form.drawerType == 2"
                native-type="submit"
                size="small"
                style="float: right"
                type="primary"
                @click="form.drawerType = 1"
              >
                完成
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div style="display: flex">
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总销量</span>
            <span>{{ goodsAllNum.sales_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总销售额</span>
            <span>￥{{ goodsAllNum.volume_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">库存数</span>
            <span>{{ goodsAllNum.stock_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">库存价值</span>
            <span>￥{{ goodsAllNum.inventory_value }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总发货</span>
            <span>{{ goodsAllNum.shipments_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总入库</span>
            <span>{{ goodsAllNum.warehousing_total }}</span>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        style="padding: 0 25px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="商品信息" name="0" />
        <el-tab-pane label="客户销售" name="1" />
        <el-tab-pane label="发货信息" name="2" />
        <el-tab-pane label="退货信息" name="3" />
        <el-tab-pane label="入库信息" name="4" />
        <el-tab-pane label="出库信息" name="5" />
        <el-tab-pane label="调整信息" name="6" />
        <el-tab-pane label="库存明细" name="7" />
      </el-tabs>
    </div>
    <div v-if="tabindex == '0'">
      <div v-if="form.drawerType == 1" ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>商品款号：{{ goodsDetails.sn }}</div>
            <div>商品名称： {{ goodsDetails.name }}</div>
            <div>商品标题： {{ goodsDetails.shoptitle }}</div>
            <div>商品分类：{{ goodsDetails.category_name }}</div>
            <div>商品品牌： {{ goodsDetails.brand_name }}</div>
            <div>年份：{{ goodsDetails.year_name }}</div>
            <div>季节： {{ goodsDetails.season_name }}</div>
            <div>上市波段： {{ goodsDetails.band_name }}</div>
            <div>年龄段： {{ goodsDetails.agegroup_name }}</div>
            <div>
              性别：
              <span v-if="goodsDetails.gender == 1">男</span>
              <span v-if="goodsDetails.gender == 2">女</span>
              <span v-if="goodsDetails.gender == 3">中</span>
            </div>
            <div>供应商： 暂无</div>
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
            <div>商品条码： 暂无</div>
            <div>库位名称：{{ goodsDetails.position_name }}</div>
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
              创建时间： {{ goodsDetails.created | formatTime }}
            </div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div style="width: 50%">
              更新时间：
              {{ goodsDetails.updated_time | formatTime }}
            </div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div>
              上架商城：
              <span v-if="goodsDetails.online_id == 0">待确认</span>
              <span v-else>已确定</span>
            </div>
            <div>是否同步到聚水潭： 暂无</div>
            <div>库存预警： 暂无</div>
            <div>设计师： {{ goodsDetails.designer_name }}</div>
            <div>设计师编号： {{ goodsDetails.order_sn }}</div>
            <div>
              商品状态：
              <span v-if="goodsDetails.status == 1">上架</span>
              <span v-if="goodsDetails.status == 0">下架</span>
            </div>
          </div>
        </div>
      </div>
      <el-form
        v-if="form.drawerType == 2 || form.drawerType == 3"
        ref="form"
        label-width="120px"
        :model="form"
        style="width: 100%"
      >
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">基本信息</div>
            <div class="conten-list-com">
              <el-form-item
                class="item"
                label="商品款号："
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.sn"
                  placeholder="请输入款号"
                  style="width: 215px"
                />
              </el-form-item>

              <el-form-item class="item" label="商品名称：">
                <el-input
                  v-model="form.name"
                  placeholder="请输入商品名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品标题：">
                <el-input
                  v-model="form.shoptitle"
                  placeholder="请输入商品标题"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品款式：">
                <el-select v-model="form.category" placeholder="请选择商品款式">
                  <el-option
                    v-for="(item, index) in selectData.category"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="商品品牌：">
                <el-select v-model="form.brand" placeholder="请选择商品品牌：">
                  <el-option
                    v-for="(item, index) in selectData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="年份：">
                <el-select v-model="form.year" placeholder="请选择年份：">
                  <el-option
                    v-for="(item, index) in selectData.year"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="季节：">
                <el-select v-model="form.season" placeholder="请选择季节：">
                  <el-option
                    v-for="(item, index) in selectData.season"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="上市波段：">
                <el-select v-model="form.band" placeholder="请选择上市波段：">
                  <el-option
                    v-for="(item, index) in selectData.band"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="年龄段：">
                <el-select v-model="form.agegroup" placeholder="请选择年龄段：">
                  <el-option
                    v-for="(item, index) in selectData.agegroup"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="性别：">
                <el-select v-model="form.gender" placeholder="请选择性别：">
                  <el-option label="女" value="1" />
                  <el-option label="男" value="2" />
                  <el-option label="中" value="3" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="商品图片：">
                <el-button
                  native-type="submit"
                  size="small"
                  type="primary"
                  @click="handleShow()"
                >
                  上传
                </el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">规格及库位</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="颜色：">
                <qy-color-select v-model="form.colorid" />
              </el-form-item>
              <el-form-item class="item" label="尺码：">
                <el-cascader
                  v-model="form.sizeid"
                  :options="selectData.size"
                  :props="{ expandTrigger: 'hover' }"
                />
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="仓库">
                <el-select
                  v-model="form.warehouse"
                  placeholder="请选择仓库："
                  @change="selectProvinceFun($event)"
                >
                  <el-option
                    v-for="(item, index) in WarehouseList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="库位：">
                <el-select
                  v-model="form.position"
                  filterable
                  placeholder="请选择/搜索库位："
                >
                  <el-option
                    v-for="(item, index) in WarehousePositionList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="商品条码：">
                <el-input
                  v-model="form.addressKeyword"
                  clearable
                  style="width: 215px"
                >
                  <el-button slot="append" icon="el-icon-search">
                    生成
                  </el-button>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">价格信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="采购价：">
                <el-input v-model="form.purchase_price" style="width: 215px" />
              </el-form-item>
              <el-form-item class="item" label="成本价：">
                <el-input v-model="form.addressKeyword" style="width: 215px" />
              </el-form-item>
              <el-form-item class="item" label="吊牌价：">
                <el-input v-model="form.sale_price" style="width: 215px" />
              </el-form-item>
              <el-form-item class="item" label="销售价：">
                <el-input v-model="form.price" clearable style="width: 215px">
                  <el-button slot="append" @click="changeType(1)">
                    固定价
                  </el-button>
                </el-input>
                <el-button
                  v-if="lockSta"
                  native-type="submit"
                  size="small"
                  style="margin-left: 10px"
                  type="primary"
                  @click="changeType(2)"
                >
                  <span v-if="lxSta">整手</span>
                  <span v-else>散码</span>
                </el-button>
              </el-form-item>
              <el-form-item v-if="lockSta" class="item" style="width: 100%">
                <List
                  :list="zhekouList"
                  :list-type="listType"
                  :state="listLoading"
                >
                  <template #List>
                    <el-table-column
                      label="会员名称"
                      prop="name"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="折扣"
                      prop="zhekou"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="折扣前"
                      prop="qian"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="折扣后"
                      prop="hou"
                      show-overflow-tooltip
                    />
                  </template>
                </List>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="上架商城：">
                <el-radio-group v-model="form.status">
                  <el-radio :label="1">上架</el-radio>
                  <el-radio :label="0">下架</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="是否同步到聚水潭：">
                <el-radio-group v-model="form.name">
                  <el-radio :label="0">充许</el-radio>
                  <el-radio :label="1">禁止</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="库存预警：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入预警信息"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="设计师：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入设计师"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="设计师编号：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入设计师编号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品状态：">
                <el-radio-group v-model="form.name">
                  <el-radio :label="0">在售</el-radio>
                  <el-radio :label="1">备用</el-radio>
                  <el-radio :label="2">禁用停售</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <List
      v-if="
        tabindex == '1' || tabindex == '3' || tabindex == '4' || tabindex == '5'
      "
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="姓名" prop="name" show-overflow-tooltip />
        <el-table-column label="金额" prop="total" show-overflow-tooltip />
        <el-table-column label="数量" prop="num" show-overflow-tooltip />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
      </template>
    </List>
    <List
      v-if="tabindex == '2'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="姓名" prop="name" show-overflow-tooltip />
        <el-table-column label="金额" prop="total" show-overflow-tooltip />
        <el-table-column label="数量" prop="num" show-overflow-tooltip />
        <el-table-column
          label="创建时间"
          prop="add_date"
          show-overflow-tooltip
        />
      </template>
    </List>
    <List
      v-if="tabindex == '6'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="姓名" prop="name" show-overflow-tooltip />
        <el-table-column label="调整前" prop="fnum" show-overflow-tooltip />
        <el-table-column label="调整后" prop="tnum" show-overflow-tooltip />
        <el-table-column label="备注" prop="remark" show-overflow-tooltip />
        <el-table-column
          label="创建时间"
          prop="add_date"
          show-overflow-tooltip
        />
      </template>
    </List>
    <List
      v-if="tabindex == '7'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="尺码" prop="size_name" show-overflow-tooltip />
        <el-table-column label="颜色" prop="color_name" show-overflow-tooltip />
        <el-table-column label="条形码" prop="barcode" show-overflow-tooltip />
        <el-table-column
          label="再生产数量"
          prop="zsc_num"
          show-overflow-tooltip
        />
        <el-table-column label="现货数量" prop="xh_num" show-overflow-tooltip />
        <el-table-column label="销量数量" prop="xl_num" show-overflow-tooltip />
      </template>
    </List>
    <vab-upload
      ref="vabUpload"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  import VabUpload from '@/extra/VabUpload'
  import List from '@/subview/components/List'
  import {
    getWarehouseList,
    getWarehousePositionList,
    getGoodTotalDetails,
    getGoodBasicsDetails,
    getGoodOrderDetails,
  } from '@/api/basic'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ComponentsDrawer',
    components: { List, VabUpload },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
      selectList: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        lxSta: false,
        lockSta: false,
        activeName: '0',
        tabindex: '0',
        goodsAllNum: {},
        goodsDetails: {},
        form: Object.assign({}, this.drawerInof),
        selectData: Object.assign({}, this.selectList),
        listLoading: false,
        listType: 2,
        ids: undefined,
        WarehouseList: [],
        WarehousePositionList: [],
        zhekouList: [
          {
            name: '普通会员',
            zhekou: '3.5折',
            qian: 200,
            hou: 100,
          },
          {
            name: '白银会员',
            zhekou: '4.5折',
            qian: 200,
            hou: 100,
          },
        ],
        orderList: [],
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
    },
    watch: {
      drawerInof: {
        handler: function (newVal) {
          this.form = Object.assign({}, newVal)
          if (newVal.drawerType != 3) {
            this.getGoodsAllDetail()
            this.getGoodsDetail()
          }
        },
        deep: true,
        immediate: true,
      },
      selectList: {
        handler: function (newVal) {
          this.selectData = Object.assign({}, newVal)
        },
        deep: true,
      },
    },
    created() {
      this.initSelect()
    },
    methods: {
      async getGoodsAllDetail() {
        const { data } = await getGoodTotalDetails({ good_id: this.form.id })
        this.goodsAllNum = data
      },
      async getGoodsDetail() {
        const { data } = await getGoodBasicsDetails({ good_id: this.form.id })
        this.goodsDetails = data
      },
      async selectProvinceFun(e) {
        const { data } = await getWarehousePositionList({ warehouse_id: e })
        this.WarehousePositionList = data.list
      },
      async initSelect() {
        const { data } = await getWarehouseList()
        this.WarehouseList = data.list
      },
      // 打印
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      async print(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val], { noPrintParent: true })
        await this.openSideBar()
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      // 列表数据表头切换监听 自定义部分
      async handleClick(tab) {
        this.tabindex = tab.name
        this.listLoading = true
        if (tab.name == 0) {
          return
        }
        const { data } = await getGoodOrderDetails({
          type: tab.name, //搜索条件 1订单记录 2入库信息 3退货记录 4付款记录 5对账单记录
          good_id: this.drawerInof.id, //物料采购订单id
          page: 1,
          pageSize: 5,
        })
        this.orderList = data.list.data
        this.listLoading = false
      },
      changeType(val) {
        if (val == 1) {
          this.lockSta = !this.lockSta
          console.log(this.form.lock_price)
          if (this.form.lock_price != 1) {
            this.form.lock_price = 1
          } else {
            this.form.lock_price = 0
          }
        } else {
          this.lxSta = !this.lxSta
          if (this.form.type != 1) {
            this.form.type = 1
          } else {
            this.form.type = 0
          }
        }
      },
      upMembers(type) {
        if (type == 1) {
          this.$baseConfirm('你确定要审核当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('审核成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        } else if (type == 2) {
          this.$baseConfirm('你确定要强制下线当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage(
              '强制下线成功',
              'success',
              'vab-hey-message-success'
            )
            this.fetchData()
          })
        } else if (type == 3) {
          this.$baseConfirm('你确定要停售当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('停售成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
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
