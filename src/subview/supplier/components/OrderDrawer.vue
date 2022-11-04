<template>
  <div class="components-drawer">
    <div style="padding: 30px 35px 25px">
      <div>
        <p v-if="type == 2" style="font-size: 16px; font-weight: 600">
          成品采购单
        </p>
        <P v-else style="font-size: 16px; font-weight: 600">物料采购单</P>
        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="12" style="display: flex">
            <img
              :src="avatar"
              style="
                width: 50px;
                height: 50px;
                margin: 0 10px 10px 0;
                border-radius: 50%;
              "
            />
            <div style="margin-top: -5px">
              <div style="margin: 15px 0 0 0">供应商名称：{{ form.name }}</div>
              <div>订单编号：{{ form.name }}</div>
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
              style="float: right; margin-right: 10px"
              type="primary"
              @click="upMembers(3)"
            >
              提醒发货
            </el-button>
            <el-button
              native-type="submit"
              size="small"
              style="float: right; margin-right: 10px"
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
              作废
            </el-button>
          </el-col>
        </el-row>
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
    <el-tabs
      v-if="type == 2"
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="订单信息" name="first" />
      <el-tab-pane label="商品信息" name="second" />
      <el-tab-pane label="订单记录" name="three" />
      <el-tab-pane label="收货记录" name="four" />
      <el-tab-pane label="退货记录" name="five" />
      <el-tab-pane label="电子合同" name="six" />
    </el-tabs>
    <el-tabs
      v-else
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="订单信息" name="first" />
      <el-tab-pane label="物料信息" name="second" />
      <el-tab-pane label="订单记录" name="three" />
      <el-tab-pane label="收货记录" name="four" />
      <el-tab-pane label="退货记录" name="five" />
      <el-tab-pane label="电子合同" name="six" />
    </el-tabs>
    <div v-if="tabindex == '0'">
      <div ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">供应商信息</div>
          <div class="conten-list-row">
            <div>供应商UID：6565</div>
            <div>供应商名称： 名称一</div>
            <div>绑定电话： -1526804776</div>
            <div>供应商等级： 等级一</div>
            <div>供应商类别： 类别一</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">订单信息</div>
          <div class="conten-list-row">
            <div>创建时间：2020-12-12 10:10:10</div>
            <div>商品总数：50</div>
            <div>商品总价：2000</div>
            <div>支付时间：2020-12-12 10:10:10</div>
            <div>支付邮费：50</div>
            <div>结算方式：月结</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 50%">更新时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 50%">订单状态： 作废</div>
            <div style="width: 50%">跟单人员： 阿白</div>
            <div style="width: 100%">备注： 1111111111111111</div>
          </div>
        </div>
      </div>
    </div>
    <List
      v-else
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="id" prop="id" show-overflow-tooltip />
        <el-table-column label="名称" prop="log" show-overflow-tooltip />
        <el-table-column label="操作时间" prop="time" show-overflow-tooltip />
      </template>
    </List>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  import List from '@/subview/components/List'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ComponentsDrawer',
    components: { List },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
      drawerType: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        type: this.drawerType,
        activeName: 'first',
        tabindex: '0',
        form: Object.assign({}, this.drawerInof),
        listLoading: false,
        listType: 2,
        typeData: [],
        formDrawer: {
          state: 0,
          state1: 0,
        },
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
            value: '未入库',
          },
          {
            name: '订单数量',
            value: '34750',
          },
          {
            name: '订单金额',
            value: '￥800',
          },
          {
            name: '预计交货时间',
            value: '2022-01-02 10:10:10',
          },
          {
            name: '完成状态',
            value: '状态一',
          },
          {
            name: '延期预警',
            value: '延期一天',
          },
        ],
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
      },
      drawerType: {
        handler: function (newVal) {
          console.log(131313213, newVal)
          this.type = newVal
        },
      },
    },
    created() {},
    methods: {
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      async print(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val], { noPrintParent: true })
        await this.openSideBar()
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(8989, tab)
        this.tabindex = tab.index
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        console.log(selectProvince, selectCity, selectArea)
      },
      upMembers(type) {
        if (type == 1) {
          this.$baseConfirm('你确定要作废吗？', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('作废成功', 'success', 'vab-hey-message-success')
            this.btntype = 2
            this.fetchData()
          })
        } else if (type == 3) {
          this.$baseConfirm('你确定要提醒发货吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('提醒成功', 'success', 'vab-hey-message-success')
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
