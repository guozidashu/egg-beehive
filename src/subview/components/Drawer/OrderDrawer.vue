<template>
  <div class="components-drawer">
    <div style="padding: 30px 35px 25px 20px">
      <div>
        <div style="margin-bottom: 20px; font-size: 18px; font-weight: 600">
          销售单
        </div>
        <el-row>
          <el-col :span="12" style="display: flex">
            <span style="margin: 10px 0 0 0">
              订单合计
              <span style="color: red">{{ form.style_num }}</span>
              款 共计
              <span style="color: red">*{{ form.sum_num }}</span>
              已发货
              <span style="color: red">*{{ form.delivery_num }}</span>
              件
            </span>
          </el-col>
          <el-col :span="12">
            <vab-icon
              icon="align-center"
              style="float: right; margin: 6px 0 0 0"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <el-tabs v-model="search_type" class="drawer-tab" @tab-click="handleClick">
      <el-tab-pane label="订单信息" name="0">
        <div class="conten-warp">
          <div class="conten-title">用户信息</div>
          <div class="conten-list-row">
            <div>用户ID：{{ form.uid }}</div>
            <div>客户名称： {{ form.name }}</div>
            <div>
              <span>绑定电话： {{ form.mobile }}</span>
            </div>
            <div>
              <span v-if="form.sale_arrears < 0">
                销售累计欠款：
                <span style="color: red">
                  -￥{{ form.sale_arrears | moneyFormat }}
                </span>
              </span>
              <span v-else>
                销售累计余款：￥{{ form.sale_arrears | moneyFormat }}
              </span>
            </div>
            <div>
              <span v-if="form.delivery_arrears < 0">
                发货累计欠款：
                <span style="color: red">
                  -￥{{ form.delivery_arrears | moneyFormat }}
                </span>
              </span>
              <span v-else>
                发货累计余款：￥{{ form.delivery_arrears | moneyFormat }}
              </span>
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">订单信息</div>
          <div class="conten-list-row">
            <div>订单总额： ￥{{ form.total | moneyFormat }}</div>
            <div>订单优惠： ￥{{ form.discount | moneyFormat }}</div>
            <div>实际应收： ￥{{ form.final_amount | moneyFormat }}</div>
            <div>已收金额： ￥{{ form.received_amount | moneyFormat }}</div>
            <div>收款优惠： ￥{{ form.discount_cash | moneyFormat }}</div>
            <div>创建时间： {{ form.create_time }}</div>
            <div>开单日期： {{ form.add_date }}</div>
            <div>备注信息： {{ form.remark }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">收货信息</div>
          <div class="conten-list-com">
            <div>收货人：{{ form.consignee }}</div>
            <div>收货电话：{{ form.consignee_phone }}</div>
            <div>收货地址：{{ form.consignee_address }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息" name="1">
        <el-row :gutter="20">
          <el-col v-for="(item, index) in orderList" :key="index" :span="12">
            <el-card class="box-card" shadow="hover">
              <div style="display: flex; margin-bottom: 20px">
                <div style="margin: 10px 15px; text-align: center">
                  <div style="font-size: 18px; font-weight: 600; color: black">
                    {{ item.num }}
                  </div>
                  <div style="font-size: 14px; color: gray">吊牌价</div>
                  <div
                    style="
                      font-size: 14px;
                      color: gray;
                      text-decoration: line-through;
                    "
                  >
                    ￥ {{ item.sale_price | moneyFormat }}
                  </div>
                </div>
                <el-image :src="item.img" style="width: 80px; height: 80px" />
                <div style="margin: 6px 0 0 15px">
                  <div style="font-size: 18px; font-weight: 600; color: black">
                    {{ item.sn }}
                  </div>

                  <div style="margin: 8px 0; color: gray">
                    单价： ￥ {{ item.discount_price | moneyFormat }}
                  </div>
                  <div style="color: gray">
                    合计：￥{{ item.total | moneyFormat }}
                    <span style="color: red">
                      （{{ (item.discount * 10) | moneyFormat }}折）
                    </span>
                  </div>
                </div>
              </div>
              <QYList
                :list="item.goods_spec"
                :list-type="listType"
                :state="listLoading"
                style="height: 200px; overflow: auto"
              >
                <template #List>
                  <el-table-column
                    align="center"
                    label="颜色"
                    prop="colorname"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    label="尺码"
                    prop="sizename"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    label="数量"
                    prop="num"
                    show-overflow-tooltip
                  >
                    <template #default="{ row }">
                      <span v-if="row.num < 0" style="color: red">
                        {{ row.num }}
                      </span>
                      <span v-else>{{ row.num }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="待发货"
                    prop="to_shipped"
                    show-overflow-tooltip
                  />
                </template>
              </QYList>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label=" 操作记录" name="2">
        <QYList :list="orderList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column
              align="center"
              label="操作"
              prop="remark"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="操作人"
              prop="name"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="总变动金额"
              prop="new_amount"
              show-overflow-tooltip
            >
              <template #default="{ row }">
                ￥{{ row.new_amount | moneyFormat }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作时间"
              prop="ctime"
              show-overflow-tooltip
            />
            <el-table-column fixed="right" label="操作" width="50">
              <template #default="{ row }">
                <el-button
                  v-has-permi="['btn:OrderList:view']"
                  type="text"
                  @click="handleDetail(1, row)"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
          </template>
        </QYList>
      </el-tab-pane>
      <el-tab-pane label="发货记录" name="3">
        <QYList :list="orderList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column
              align="center"
              label="发货批次"
              prop="id"
              width="80"
            />
            <el-table-column
              align="center"
              label="订单号"
              prop="sn"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="发货数量"
              prop="num"
              width="80"
            />
            <el-table-column
              align="center"
              label="发货金额"
              prop="total"
              show-overflow-tooltip
            >
              <template #default="{ row }">
                ￥{{ row.total | moneyFormat }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="发货时间"
              prop="ctime"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="备注"
              prop="remark"
              show-overflow-tooltip
            >
              <template #default="{ row }">
                <span v-if="row.remark == '' || row.remark == null">无</span>
                <span v-else>{{ row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="50">
              <template #default="{ row }">
                <el-button
                  v-has-permi="['btn:OrderList:view']"
                  type="text"
                  @click="handleDetail(2, row)"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
          </template>
        </QYList>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :append-to-body="true"
      :before-close="handleClose"
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-row :gutter="20" style="height: 500px; overflow: auto">
        <el-col v-for="(item, index) in DetailList" :key="index" :span="12">
          <el-card class="box-card" shadow="hover">
            <div style="display: flex; margin-bottom: 20px">
              <el-image
                :src="item.goods_img"
                style="width: 80px; height: 80px"
              />
              <div style="margin: 0 0 0 10px">
                <div style="margin: 20px 0 0 0">
                  名称：{{ item.goods_name }}
                </div>
                <div style="margin: 20px 0 0 0">款号：{{ item.goods_sn }}</div>
              </div>
            </div>
            <QYList
              v-if="dialogType == 1"
              :list="item.goods_spec"
              :list-type="listType"
              :state="listLoading"
              style="height: 200px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="颜色"
                  prop="colorname"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="尺码"
                  prop="sizename"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="改前"
                  prop="fnum"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="改后"
                  prop="tnum"
                  show-overflow-tooltip
                />
              </template>
            </QYList>
            <QYList
              v-if="dialogType == 2"
              :list="item.goods_spec"
              :list-type="listType"
              :state="listLoading"
              style="height: 200px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="颜色"
                  prop="colorname"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="尺码"
                  prop="sizename"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="发货数量"
                  prop="num"
                  show-overflow-tooltip
                />
              </template>
            </QYList>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        title: '',
        dialogType: 1,
        DetailList: [],
        dialogVisible: false,
        formShow: {
          phonestate: false,
        },
        search_type: '0',
        form: Object.assign({}, this.drawerInof),
        listLoading: false,
        listType: 2,
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
        },
        deep: true,
        immediate: true,
      },
      search_type: {
        handler: function (newVal) {
          if (newVal != 0) {
            this.orderDetail()
          }
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      handleClose() {
        this.dialogVisible = false
      },
      async handleDetail(type, row) {
        this.dialogType = type
        if (type == 1) {
          this.title = '操作记录'
          const { data } = await this.api.getModifySpec({
            id: row.id,
          })
          this.DetailList = data
        } else {
          this.title = '发货记录'
          const { data } = await this.api.getDeliveryOrderSpec({
            id: row.id,
          })
          this.DetailList = data
        }
        this.dialogVisible = true
      },
      async orderDetail() {
        this.listLoading = true
        const { data } = await this.api.getOrderDetail({
          search_type: this.search_type,
          id: this.form.id,
          page: 1,
          pageSize: 20,
        })
        this.orderList = data.data
        this.listLoading = false
      },
      handleClick(tab) {
        this.search_type = tab.name
      },
      PrintBtn() {
        this.$emit('drawerPrint', 'multipleTable')
      },
      EditBtn() {
        this.$emit('drawerhandleEdit', this.form)
      },
    },
  }
</script>
<style lang="scss" scoped>
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
      .conten-list-row,
      .conten-list-com {
        display: flex;
        flex-wrap: wrap;
        div {
          width: 33%;
          margin-top: 16px;
        }
      }
      .conten-list-com {
        flex-direction: column;
        div {
          width: 100%;
        }
      }
    }
  }
</style>
