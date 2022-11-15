<template>
  <div class="components-drawer">
    <div style="padding: 30px 35px 25px">
      <div>
        <p style="font-size: 16px; font-weight: 600">[{{ form.order_type }}]</p>
        <el-row :gutter="20">
          <el-col :span="12" style="display: flex">
            <img
              :src="avatar"
              style="width: 50px; height: 50px; margin: 0 10px 10px 0"
            />
            <span style="margin: 10px 0 0 0">订单编号：{{ form.sn }}</span>
          </el-col>

          <el-col :span="12">
            <vab-icon
              icon="align-center"
              style="float: right; margin: 6px 0 0 0"
            />
            <el-button
              native-type="submit"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="PrintBtn"
            >
              打印
            </el-button>
            <!-- <el-button
              native-type="submit"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="EditBtn"
            >
              发送货
            </el-button> -->
          </el-col>
        </el-row>
      </div>
      <div style="display: flex">
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">订单状态</span>
          <span>{{ form.order_status1 }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">实际支付</span>
          <span>暂无</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">支付方式</span>
          <span>暂无</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">支付时间</span>
          <span>暂无</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">累计欠款</span>
          <span>{{ form.sale_arrears }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="search_type" class="drawer-tab" @tab-click="handleClick">
      <el-tab-pane label="订单信息" name="0">
        <div class="conten-warp">
          <div class="conten-title">用户信息</div>
          <div class="conten-list-row">
            <div>用户UID：{{ form.uid }}</div>
            <div>客户名称： {{ form.name }}</div>
            <div>
              <span v-if="!formShow.phonestate">
                绑定电话： {{ form.mobile | phoneteltm }}
              </span>
              <span v-else>绑定电话：{{ form.mobile }}</span>
              <i
                v-if="!formShow.phonestate"
                class="el-icon-view"
                style="margin-left: 10px"
                @click="formShow.phonestate = true"
              ></i>
              <i
                v-else
                class="el-icon-view"
                style="margin-left: 10px; color: #1890ff"
                @click="formShow.phonestate = false"
              ></i>
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">收货信息</div>
          <div class="conten-list-com">
            <div>收货人：{{ form.consignee }}</div>
            <div>收货电话：{{ form.uid }}</div>
            <div>收货地址：{{ form.consignee_address }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">订单信息</div>
          <div class="conten-list-row">
            <div>创建时间： {{ form.create_time }}</div>
            <div>商品总数： {{ form.sum_num }}</div>
            <div>商品总价： {{ form.sum_price }}</div>
            <div>优惠券金额： 暂无</div>
            <div>积分抵扣： 暂无</div>
            <div>支付邮费： 暂无</div>
            <div>会员商品优惠： 暂无</div>
            <div>支付时间： 暂无</div>
            <div>支付方式： 暂无</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">物流信息</div>
          <div class="conten-list-row">
            <div>快递公司： {{ form.delivery.company_name }}</div>
            <div>快递单号： {{ form.delivery.express_number }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间： {{ form.create_time }}</div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div style="width: 50%">更新时间： 暂无</div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div style="width: 100%">订单备注： 暂无</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息" name="1">
        <List :list="orderList" :list-type="listType" :state="listLoading">
          <!-- 表格组件具名插槽 自定义表头 -->
          <template #List>
            <el-table-column
              align="center"
              label="商品编号"
              prop="sn"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="商品数量"
              prop="num"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="商品单价"
              prop="price"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="商品总金额"
              prop="total"
              show-overflow-tooltip
            />
          </template>
        </List>
      </el-tab-pane>
      <el-tab-pane label=" 操作记录" name="2">
        <List :list="orderList" :list-type="listType" :state="listLoading">
          <!-- 表格组件具名插槽 自定义表头 -->
          <template #List>
            <el-table-column
              align="center"
              label="订单号"
              prop="ordersn"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="订单金额"
              prop="total"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="客户名称"
              prop="name"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="创建时间"
              prop="ctime"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="备注"
              prop="remark"
              show-overflow-tooltip
            />
          </template>
        </List>
      </el-tab-pane>
      <el-tab-pane label="发货记录" name="3">
        <List :list="orderList" :list-type="listType" :state="listLoading">
          <!-- 表格组件具名插槽 自定义表头 -->
          <template #List>
            <el-table-column
              align="center"
              label="快递公司"
              prop="company_name"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="快递单号"
              prop="express_number"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="订单号"
              prop="sn"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="创建时间"
              prop="ctime"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="商品数量"
              prop="num"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="商品金额"
              prop="total"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="最终支付"
              prop="final_amount"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="备注"
              prop="remark"
              show-overflow-tooltip
            />
          </template>
        </List>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import { mapGetters } from 'vuex'
  import { getOrderDetail } from '@/api/basic'
  export default {
    name: 'ComponentsDrawer',
    components: { List },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
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
      async orderDetail() {
        this.listLoading = true
        const { data } = await getOrderDetail({
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
        console.log('打印')
        this.$emit('drawerPrint', 'multipleTable')
      },
      EditBtn() {
        console.log('编辑')
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
