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
              v-if="type == 2"
              :src="form.info.img"
              style="
                width: 50px;
                height: 50px;
                margin: 0 10px 10px 0;
                border-radius: 50%;
              "
            />
            <img
              v-else
              :src="form.info.material_pic"
              style="
                width: 50px;
                height: 50px;
                margin: 0 10px 10px 0;
                border-radius: 50%;
              "
            />
            <div style="margin-top: -5px">
              <div style="margin: 15px 0 0 0">
                供应商名称：{{ form.su_name }}
              </div>
              <div>订单编号：{{ form.sn }}</div>
            </div>
          </el-col>

          <el-col :span="12">
            <vab-icon
              icon="align-center"
              style="float: right; margin: 6px 0 0 0"
            />
          </el-col>
        </el-row>
      </div>
      <div style="display: flex">
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">订单状态</span>
          <span>{{ form.order_status }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">订单数量</span>
          <span>{{ form.num }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">订单金额</span>
          <span>￥{{ form.total | moneyFormat }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">预计交货时间</span>
          <span>{{ form.expected_date }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">超期状态</span>
          <span>{{ form.delay }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">延期预警</span>
          <span>暂无</span>
        </div>
      </div>
    </div>
    <el-tabs
      v-if="type == 2"
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="订单信息" name="0" />
      <el-tab-pane label="成品信息" name="1" />
      <el-tab-pane label="订单记录" name="2" />
      <el-tab-pane label="入库记录" name="3" />
      <el-tab-pane label="退货记录" name="4" />
      <el-tab-pane label="电子合同" name="5" />
    </el-tabs>
    <el-tabs
      v-else
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="订单信息" name="0" />
      <el-tab-pane label="物料信息" name="1" />
      <el-tab-pane label="订单记录" name="2" />
      <el-tab-pane label="入库记录" name="3" />
      <el-tab-pane label="退货记录" name="4" />
      <el-tab-pane label="电子合同" name="5" />
    </el-tabs>
    <div v-if="search_type == '0'">
      <div ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">供应商信息</div>
          <div class="conten-list-row">
            <div>供应商UID：{{ form.su_id }}</div>
            <div>供应商名称：{{ form.su_name }}</div>
            <div>绑定电话： -{{ form.tel }}</div>
            <div>供应商等级： {{ form.grade_name }}</div>
            <div>供应商类别： {{ form.sut_name }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">订单信息</div>
          <div class="conten-list-row">
            <div>创建时间：{{ form.add_date }}</div>
            <div>商品总数：{{ form.num }}</div>
            <div>商品总价：{{ form.total }}</div>
            <div>支付时间：暂无</div>
            <div>支付邮费：暂无</div>
            <div>结算方式：暂无</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间： {{ form.add_date }}</div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div style="width: 50%">更新时间： 暂无</div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div v-if="form.is_void == 0" style="width: 50%">
              订单状态： 正常
            </div>
            <div v-if="form.is_void == 1" style="width: 50%">
              订单状态： 作废
            </div>
            <div style="width: 50%">跟单人员： 暂无</div>
            <div style="width: 100%">备注： {{ form.remark }}</div>
          </div>
        </div>
      </div>
    </div>
    <QYList
      v-if="search_type == '1'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column
          v-if="drawerType == 2"
          label="编号"
          prop="sn"
          show-overflow-tooltip
        />
        <el-table-column
          v-else
          label="编号"
          prop="material_sn"
          show-overflow-tooltip
        />
        <el-table-column label="数量" prop="num" show-overflow-tooltip />
        <el-table-column label="单价" prop="price" show-overflow-tooltip />
        <el-table-column label="总价格" prop="total" show-overflow-tooltip />
      </template>
    </QYList>
    <div v-if="search_type == '2'" style="margin-left: 20px">暂无</div>
    <QYList
      v-if="search_type == '3'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column
          label="供应商姓名"
          prop="su_name"
          show-overflow-tooltip
        />
        <el-table-column label="编号" prop="sn" show-overflow-tooltip />
        <el-table-column label="数量" prop="num" show-overflow-tooltip />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
        <el-table-column
          label="入库时间"
          prop="add_date"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <QYList
      v-if="search_type == '4'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column
          label="供应商姓名"
          prop="su_name"
          show-overflow-tooltip
        />
        <el-table-column label="仓库" prop="w_name" show-overflow-tooltip />
        <el-table-column label="编号" prop="sn" show-overflow-tooltip />
        <el-table-column label="数量" prop="num" show-overflow-tooltip />
        <el-table-column
          label="退货时间"
          prop="add_date"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <div v-if="search_type == '5'" style="margin-left: 20px">暂无</div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'

  import { mapGetters } from 'vuex'
  export default {
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
        activeName: '0',
        search_type: '0',
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
      },
      drawerType: {
        handler: function (newVal) {
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
      async handleClick(tab) {
        this.listLoading = true
        this.search_type = tab.name
        if (tab.name == 0) {
          return
        }
        if (this.drawerType == 2) {
          const { data } = await this.api.getFinishDetail({
            search_type: tab.name, //搜索条件 1成品信息 2订单记录 3入库记录 4退货记录 5电子合同
            id: this.drawerInof.id, //物料采购订单id
            page: 1,
            pageSize: 20,
          })
          this.orderList = data.data
        } else {
          const { data } = await this.api.getPurchaseDetail({
            search_type: tab.name, //搜索条件 1物料信息 2订单记录 3入库记录 4退货记录 5电子合同
            id: this.drawerInof.id, //物料采购订单id
            page: 1,
            pageSize: 20,
          })
          this.orderList = data.data
        }
        this.listLoading = false
      },
      upMembers(type) {
        if (type == 1) {
          this.$baseConfirm('你确定要作废吗？', null, async () => {
            if (this.drawerType == 2) {
              const { code } = await this.api.editFinishCancellation({
                id: this.form.id,
              })
              if (code != 200) {
                return
              }
            } else {
              const { code } = await this.api.editPurchaseCancellation({
                id: this.form.id,
              })
              if (code != 200) {
                return
              }
            }

            this.$baseMessage('作废成功', 'success', 'vab-hey-message-success')
            this.btntype = 2
            this.$emit('fetch-data')
          })
        } else if (type == 3) {
          this.$baseConfirm('你确定要提醒发货吗？接口暂无', null, async () => {
            // const { code } = await this.api.deleteBrand({ id: row.id })
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
