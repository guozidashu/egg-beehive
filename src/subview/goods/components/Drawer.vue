<template>
  <div class="components-drawer">
    <div style="padding: 30px 35px 25px">
      <div>
        <p style="font-size: 16px; font-weight: 600">[普通订单]</p>
        <div style="display: flex">
          <img
            :src="avatar"
            style="width: 50px; height: 50px; margin: 0 10px 10px 0"
          />
          <span style="margin: 10px 0 0 0">订单编号：wx310090959855550464</span>
        </div>
      </div>
      <div style="display: flex">
        <div
          v-for="(item, index) in stalist"
          :key="index"
          style="display: flex; flex: 1; flex-direction: column"
        >
          <span style="margin-bottom: 12px">{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" class="drawer-tab">
      <el-tab-pane label="订单信息" name="first">
        <div class="conten-warp">
          <div class="conten-title">用户信息</div>
          <div class="conten-list-row">
            <div>用户UID：577</div>
            <div>用户昵称： 阿白</div>
            <div>绑定电话： -15236804776</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">收货信息</div>
          <div class="conten-list-com">
            <div>收货人：测试</div>
            <div>收货电话：186****9581</div>
            <div>
              收货地址：辽宁 大连市 甘井子区 凌水街道不想要了不想要了，怎么退款
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">订单信息</div>
          <div class="conten-list-row">
            <div>创建时间： 2022-10-08 16:30:46</div>
            <div>商品总数： 3</div>
            <div>商品总价： 297</div>
            <div>优惠券金额： 0.00</div>
            <div>积分抵扣： 0.00</div>
            <div>支付邮费： 0.00</div>
            <div>会员商品优惠： 0.00</div>
            <div>推广人： 无/ID 6</div>
            <div>支付时间： 2022-10-08 16:30:4</div>
            <div>支付方式： 余额支付</div>
            <div>第二件半价： -￥49.50</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">物流信息</div>
          <div class="conten-list-row">
            <div>快递公司： 宅急送</div>
            <div>快递单号： 111111111111111111</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息" name="second">
        <!-- 表格组件使用 -->
        <List :list="goosList" :state="listLoading" :type="listType">
          <!-- 表格组件具名插槽 自定义表头 -->
          <template #List>
            <el-table-column
              align="center"
              label="商品信息"
              prop="inof"
              width="330"
            >
              <template #default="{ row }">
                <div style="display: flex">
                  <el-image
                    :src="row.inof.img"
                    style="width: 50px; height: 50px; margin-right: 20px"
                  />
                  <span>{{ row.inof.wenzi }}|{{ row.inof.color }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="售价"
              prop="money"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="实付金额"
              prop="pay"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="数量"
              prop="num"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="小计"
              prop="comutp"
              show-overflow-tooltip
            />
          </template>
        </List>
      </el-tab-pane>
      <el-tab-pane label=" 订单记录" name="three">
        <List :list="orderList" :state="listLoading" :type="listType">
          <!-- 表格组件具名插槽 自定义表头 -->
          <template #List>
            <el-table-column
              align="center"
              label="订单ID"
              prop="id"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="操作记录"
              prop="log"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="操作时间"
              prop="time"
              show-overflow-tooltip
            />
          </template>
        </List>
      </el-tab-pane>
      <el-tab-pane label="发货记录" name="four">
        <List :list="stareList" :state="listLoading" :type="listType">
          <!-- 表格组件具名插槽 自定义表头 -->
          <template #List>
            <el-table-column
              align="center"
              label="订单号"
              prop="id"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="商品信息"
              prop="inof"
              width="330"
            >
              <template #default="{ row }">
                <div style="display: flex">
                  <el-image
                    :src="row.inof.img"
                    style="width: 50px; height: 50px; margin-right: 20px"
                  />
                  <span>{{ row.inof.wenzi }}|{{ row.inof.color }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="发货信息"
              prop="time"
              show-overflow-tooltip
            />
            <el-table-column align="center" label="操作" width="85">
              <template #default="{ row }">
                <el-button type="text" @click="handleDetail(row)">
                  立即核销
                </el-button>
                <el-button type="text">更多</el-button>
              </template>
            </el-table-column>
          </template>
        </List>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ComponentsDrawer',
    components: { List },
    data() {
      return {
        activeName: 'first',
        listLoading: false,
        listType: 2,
        goosList: [
          {
            inof: {
              img: 'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
              color: '粉',
              wenzi:
                '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            },
            money: 12,
            pay: 11,
            num: 1,
            comutp: 1.0,
          },
        ],
        stareList: [
          {
            inof: {
              img: 'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
              color: '粉',
              wenzi:
                '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            },
            id: 'wx310816471104094208[金家酒便利]',
            time: '2022-10-10 16:33:41',
          },
        ],
        orderList: [
          {
            id: 4525,
            log: '用户付款成功',
            time: '2022-10-10 16:33:41',
          },
          {
            id: 4525,
            log: '用户付款成功',
            time: '2022-10-10 16:33:41',
          },
        ],
        stalist: [
          {
            name: '订单状态',
            value: '待评价',
          },
          {
            name: '实际支付',
            value: '¥247.50',
          },
          {
            name: '支付方式',
            value: '余额支付',
          },
          {
            name: '支付时间',
            value: '2022-10-08 16:30:46',
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
    },
    created() {},
    methods: {},
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
