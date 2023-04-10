<template>
  <div class="components-drawer">
    <div v-if="form.drawerType != 3">
      <div style="padding: 0 25px">
        <div>
          <el-row :gutter="20">
            <el-col :span="12" style="display: flex">
              <img
                :src="form.avatar"
                style="
                  width: 50px;
                  height: 50px;
                  margin: 0 10px 10px 0;
                  border-radius: 50%;
                "
              />
              <span style="margin: 15px 0 0 0">
                {{ form.name }}|{{ form.grade_name }}
              </span>
            </el-col>

            <el-col :span="12">
              <vab-icon
                icon="align-center"
                style="float: right; margin: 6px 0 0 0"
              />
              <el-button
                v-if="form.drawerType == 1"
                size="small"
                style="float: right; margin-right: 10px"
                type="primary"
                @click="changeTypeBtn(2)"
              >
                编辑
              </el-button>
              <el-button
                v-if="form.drawerType == 2"
                size="small"
                style="float: right; margin-right: 10px"
                type="primary"
                @click="changeTypeBtn(1)"
              >
                完成
              </el-button>
              <el-button
                size="small"
                style="float: right; margin-right: 10px"
                type="primary"
                @click="getBillList()"
              >
                对账单
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div style="display: flex">
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">余额/欠款</span>
            <span v-if="form.balance < 0">
              -￥{{ form.balance | moneyFormat }}
            </span>
            <span v-else>￥{{ form.balance | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总消费次数</span>
            <span>{{ form.count_num }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总消费金额</span>
            <span>￥{{ form.final_count | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总发货金额</span>
            <span>￥{{ form.sum_delivery_money | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总退货金额</span>
            <span>￥{{ form.sum_return_money | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">累计收银</span>
            <span>￥{{ form.sum_voucher_money | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">最后一次消费时间</span>
            <span>{{ form.last_use_time }}</span>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        style="padding: 0 25px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="客户信息" name="0" />
        <el-tab-pane label="订单记录" name="1" />
        <el-tab-pane label="发货记录" name="2" />
        <el-tab-pane label="退货记录" name="3" />
        <el-tab-pane label="收银记录" name="4" />
        <el-tab-pane label="欠货统计" name="8" />
      </el-tabs>
    </div>
    <div v-if="form.drawerType == 3" style="margin-bottom: 20px">
      <el-button
        v-if="form.drawerType == 1"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(2)"
      >
        编辑
      </el-button>
      <el-button
        v-if="form.drawerType == 2 || form.drawerType == 3"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(1)"
      >
        完成
      </el-button>
    </div>
    <div v-if="tabLabel == '客户信息'">
      <div v-if="form.drawerType == 1" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <!-- <div>用户编号：{{ form.sn }}</div> -->
            <div>客户名称： {{ form.name }}</div>
            <div>
              <span v-if="!formShow.phonestate">
                手机号码： {{ form.mobile | phoneteltm }}
              </span>
              <span v-else>手机号码： 15236804776</span>
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
            <div>生日：{{ form.birthday }}</div>
            <div>
              所在城市： {{ form.province }}{{ form.city }}{{ form.district }}
            </div>
            <div>详细地址： {{ form.addr }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">客户概况</div>
          <div class="conten-list-row">
            <div>客户等级： {{ form.grade_name }}</div>
            <div>客户分类： {{ form.type_name }}</div>
            <div>客户来源： {{ form.source_name }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div>
              用户状态：
              <span v-if="form.status == 1">开启</span>
              <span v-else>关闭</span>
            </div>
            <div>
              期初金额：
              <span>{{ form.initial_amount }}</span>
            </div>
            <div>加入时间： {{ form.create_time }}</div>
            <div style="width: 100%">备注信息： {{ form.remark }}</div>
          </div>
        </div>
      </div>
      <el-form
        v-if="form.drawerType == 2 || form.drawerType == 3"
        ref="form"
        label-width="140px"
        :model="form"
        :rules="rules"
        style="width: 100%"
      >
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">基本信息</div>
            <div class="conten-list-com">
              <el-form-item
                v-if="form.drawerType == 3"
                class="item"
                label="客户名称："
                prop="name"
              >
                <el-input
                  v-model="form.name"
                  placeholder="例：杭州 | 张三"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="手机号码：" prop="mobile">
                <el-input
                  v-model="form.mobile"
                  placeholder="请输入手机号码"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="生日：">
                <el-date-picker
                  v-model="form.birthday"
                  placeholder="请选择生日"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item class="item" label="所在城市：">
                <QYAddress
                  :adrress="form.address1"
                  @getLawyerListInfo="selectAddress"
                />
              </el-form-item>
              <el-form-item class="item" label="详细地址：" style="width: 100%">
                <el-input
                  v-model="form.addr"
                  placeholder="请输入客户详情地址"
                  type="textarea"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">客户概况</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="客户等级：" prop="level">
                <el-select v-model="form.level" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in selectData.customer_grade"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="客户分类：" prop="type">
                <el-select v-model="form.type" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in selectData.customer_type"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="客户来源：">
                <el-select v-model="form.source" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in selectData.customer_source"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item
                class="item"
                label="是否允许线上更改折扣："
                style="width: 100%"
              >
                <el-radio-group v-model="form.change_discount">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- <el-form-item
                class="item"
                label="是否显示改价："
                style="width: 100%"
              >
                <el-radio-group v-model="form.change_price">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
              </el-form-item> -->
              <el-form-item class="item" label="汇款方式：" style="width: 100%">
                <el-radio-group v-model="form.remit_role">
                  <el-radio :label="0">仅上线付款</el-radio>
                  <el-radio :label="1">允许线下付款</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="发货方式：" style="width: 100%">
                <el-radio-group v-model="form.order_belong">
                  <el-radio :label="1">自主发货</el-radio>
                  <el-radio :label="2">聚水潭发货</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                class="item"
                label="是否允许线上订货："
                style="width: 100%"
              >
                <el-radio-group v-model="form.is_online_order">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="客户状态：">
                <el-switch
                  v-model="form.status"
                  active-color="#41B584"
                  active-text="开启"
                  :active-value="1"
                  class="switch"
                  inactive-color="#D2D2D2"
                  inactive-text="关闭"
                  :inactive-value="0"
                />
              </el-form-item>
              <el-form-item
                v-if="form.drawerType == 3"
                class="item"
                label="期初金额："
              >
                <el-input
                  v-model="form.initial_amount"
                  placeholder="欠款请填负数"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="授信额度：" prop="max_arrears">
                <el-input
                  v-model="form.max_arrears"
                  placeholder="0为不限制"
                  style="width: 215px"
                  @input="
                    form.max_arrears = $moneyFormatInput(form.max_arrears)
                  "
                />
              </el-form-item>
              <el-form-item class="item" label="备注信息：" style="width: 100%">
                <el-input
                  v-model="form.remark"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="请输入备注"
                  type="textarea"
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <QYList
      v-if="tabLabel == '订单记录'"
      :list="orderList"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="listLoading"
      style="margin: 20px"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <template #List>
        <el-table-column label="订单编号" prop="sn" show-overflow-tooltip />
        <el-table-column
          label="订单日期"
          prop="create_time"
          show-overflow-tooltip
        />
        <el-table-column label="数量" prop="num" width="80" />
        <el-table-column label="金额" prop="total" width="100" />
        <el-table-column
          label="订单状态"
          prop="order_status"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <QYList
      v-if="tabLabel == '发货记录'"
      :list="orderList"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="listLoading"
      style="margin: 20px"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <template #List>
        <el-table-column label="订单编号" prop="sn" show-overflow-tooltip />
        <el-table-column
          label="订单日期"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column label="发货数量" prop="num" width="80" />
        <el-table-column label="发货金额" prop="total" width="100" />
      </template>
    </QYList>
    <QYList
      v-if="tabLabel == '退货记录'"
      :list="orderList"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="listLoading"
      style="margin: 20px"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <template #List>
        <el-table-column label="订单编号" prop="sn" show-overflow-tooltip />
        <el-table-column
          label="订单日期"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column label="退货数量" prop="num" width="80" />
        <el-table-column label="退货金额" prop="total" width="100" />
      </template>
    </QYList>
    <QYList
      v-if="tabLabel == '收银记录'"
      :list="orderList"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="listLoading"
      style="margin: 20px"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <template #List>
        <el-table-column label="类型" prop="type" width="100" />
        <el-table-column label="收款金额" prop="total" width="120" />
        <el-table-column label="优惠金额" prop="discount" width="80" />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <QYList
      v-if="tabLabel == '欠货统计'"
      :list="orderList"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="listLoading"
      style="margin: 20px"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <template #List>
        <el-table-column label="商品名称" prop="name" show-overflow-tooltip />
        <el-table-column
          label="商品款号"
          prop="goods_sn"
          show-overflow-tooltip
        />
        <el-table-column label="订货数量" prop="num" width="80" />
        <el-table-column label="欠货数量" prop="owe_goods" width="80" />
      </template>
    </QYList>
    <el-dialog
      :before-close="handleClose1"
      :title="distitle1"
      :visible.sync="dialogVisible1"
      width="500PX"
    >
      <el-form
        v-if="distitle1 == '修改积分余额'"
        label-width="120px"
        :model="formDrawer"
      >
        <el-form-item label="修改余额">
          <el-radio-group v-model="formDrawer.state">
            <el-radio :label="0">增加</el-radio>
            <el-radio :label="1">减少</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item label="修改积分">
          <el-radio-group v-model="formDrawer.state1">
            <el-radio :label="0">增加</el-radio>
            <el-radio :label="1">减少</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="积分">
          <el-input v-model="name1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确 定</el-button>
        </el-form-item>
      </el-form>
      <el-form v-else label-width="120px" :model="formDrawer">
        <el-form-item label="选择会员">
          <el-select v-model="formDrawer.type1">
            <el-option label="黄金" :value="1" />
            <el-option label="白银" :value="2" />
            <el-option label="青铜" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :append-to-body="true"
      :before-close="handleBillClose"
      title="导出对账单"
      :visible.sync="dialogVisibleBill"
      width="500PX"
    >
      <el-form label-width="50px" :model="formBill">
        <el-form-item label="日期:">
          <el-date-picker
            v-model="formBill.time"
            align="left"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="formBill.state">
            <el-radio :label="1">拿货欠款</el-radio>
            <el-radio :label="2">发货欠款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formBillSub()">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ComponentsDrawer',
    mixins: [datajosn],
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        dialogVisibleBill: false,
        formBill: {
          time: null,
          state: 1,
        },
        selectData: [],
        formShow: {
          cardstate: false,
          phonestate: false,
        },
        dialogVisible1: false,
        distitle1: '',
        activeName: '0',
        tabLabel: '客户信息',
        form: Object.assign({}, this.drawerInof),
        rules: {
          name: [
            { required: true, message: '请输入客户名称', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur',
            },
          ],
          level: [
            { required: true, message: '请选择客户等级', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择客户类型', trigger: 'blur' },
          ],
        },
        page: 1,
        pageSize: 10,
        total: 0,
        listLoading: false,
        listType: 1,
        formDrawer: {
          state: 0,
          state1: 0,
        },
        goosList: [],
        stareList: [],
        orderList: [],
        stalist: [
          {
            name: '余额/欠款',
            value: '¥247.50',
          },
          {
            name: '总消费次数',
            value: '800笔',
          },
          {
            name: '总消费金额',
            value: '¥24750',
          },
          {
            name: '总发货金额',
            value: '¥34750',
          },
          {
            name: '总退货余额',
            value: '¥24750',
          },
          {
            name: '累计收银',
            value: '¥34750',
          },
          {
            name: '最后一次消费时间',
            value: '2022-10-1 16:33:41',
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
      type(val) {
        this.type = val
      },
      drawerInof: {
        handler: function (newVal) {
          this.activeName = '0'
          this.tabLabel = '客户信息'
          this.form = Object.assign({}, newVal)
          this.form.address1 = [
            this.form.province,
            this.form.city,
            this.form.district,
          ]
          if (newVal.drawerType != 3) {
            this.getDetail()
          }
          // 预警跳转判断
          if (newVal.pathType == 'board') {
            this.activeName = '8'
            this.tabLabel = '欠货统计'
            this.getInfoList(this.activeName)
          }
        },
        deep: true,
        immediate: true,
      },
      page: {
        handler: function () {
          this.getInfoList(this.activeName)
        },
        deep: true,
      },
      pageSize: {
        handler: function () {
          this.getInfoList(this.activeName)
        },
        deep: true,
      },
    },
    created() {
      this.getSelectData()
    },
    methods: {
      async getDetail() {
        const { data } = await this.api.giteCustomerDetail({ id: this.form.id })
        let type = this.form.drawerType
        this.form = JSON.parse(JSON.stringify(data[0]))
        this.form.drawerType = type
        this.form.address1 = [
          this.form.province,
          this.form.city,
          this.form.district,
        ]
      },
      async formBillSub() {
        let temp = {
          customer_id: this.drawerInof.id,
          start_date: '',
          end_date: '',
          state: this.formBill.state,
        }
        if (this.formBill.time != null) {
          temp.start_date = this.formBill.time[0]
          temp.end_date = this.formBill.time[1]
        }
        const { data, code } = await this.api.getCustomerExportBill(temp)
        this.dialogVisibleBill = false
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
        } else {
          this.$message.error('导出失败')
        }
      },
      handleBillClose() {
        this.dialogVisibleBill = false
      },
      getBillList() {
        this.dialogVisibleBill = true
      },
      async changeTypeBtn(e) {
        if (e != 1) {
          this.form.drawerType = e
          this.$forceUpdate()
          return
        }
        if (this.form.tag != undefined) {
          if (this.form.tag.length == 2) {
            this.form.tag = this.form.tag[1]
          } else {
            this.form.tag = null
          }
        }
        if (this.form.id == undefined) {
          this.form.id = 0
          const { code } = await this.api.editCustomerSave(this.form)
          if (code == 200) {
            this.$baseMessage('新增成功', 'success', 'vab-hey-message-success')
            this.$emit('fetch-data', 1)
          }
        } else {
          const { code } = await this.api.editCustomerSave(this.form)
          if (code == 200) {
            this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
            this.form.drawerType = e
            this.$emit('fetch-data')
          }
        }
      },
      async getSelectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade,customer_type,customer_source,customer_tag,customer_service',
        })
        data.customer_tag.forEach((item) => {
          item.value = item.id
          item.label = item.name
          if (item.child.length > 0) {
            item.child.forEach((item1) => {
              item1.value = item1.id
              item1.label = item1.name
            })
            item.children = item.child
          }
        })
        this.selectData = data
      },
      changeBtnPage(data) {
        this.pageState = true
        this.page = data
      },
      changeBtnPageSize(data) {
        this.pageSize = data
      },
      async handleClick(tab) {
        this.page = 1
        this.pageSize = 10
        this.listLoading = true
        this.tabLabel = tab.label
        if (tab.name == 0) {
          return
        }
        this.getInfoList(tab.name)
      },
      async getInfoList(name) {
        const { data } = await this.api.getCustomerInfoList({
          type: name, //搜索条件 1订单记录 2入库信息 3退货记录 4付款记录 5对账单记录
          id: this.form.id,
          page: this.page,
          pageSize: this.pageSize,
        })
        this.total = data.total
        this.orderList = data.data
        this.listLoading = false
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        this.form.province = selectProvince
        this.form.city = selectCity
        this.form.district = selectArea
      },
      handleClose1() {
        this.dialogVisible1 = false
      },
      upMembers(type) {
        if (type == 1) {
          this.distitle1 = '修改积分余额'
          this.dialogVisible1 = true
        } else {
          this.distitle1 = '升级会员'
          this.dialogVisible1 = true
        }
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
