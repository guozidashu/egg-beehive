<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @changeSta="changeBtnSta"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item v-show="form.fold" label="用户搜索:">
            <el-input
              v-model="form.keywords"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.search_type"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="手机号" value="mobile" />
                <el-option label="用户昵称" value="nick_name" />
                <el-option label="客户名称" value="name" />
                <el-option label="客户账号" value="account" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item
            v-show="!form.fold"
            label="用户搜索:"
            style="display: block"
          >
            <el-input
              v-model="form.keywords"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.search_type"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="手机号" value="mobile" />
                <el-option label="用户昵称" value="nick_name" />
                <el-option label="客户名称" value="name" />
                <el-option label="客户账号" value="account" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户等级:">
            <el-select v-model="form.level" style="width: 300px">
              <el-option
                v-for="(item, index) in selectDataList.customer_grade"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户分类:">
            <el-select v-model="form.type" style="width: 300px">
              <el-option
                v-for="(item, index) in selectDataList.customer_type"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户标签:">
            <el-cascader
              v-model="form.tag"
              :options="selectDataList.customer_tag"
              :show-all-levels="false"
              style="width: 300px"
            />
          </el-form-item>
          <!-- <el-form-item v-show="!form.fold" label="客户来源:">
            <el-select v-model="form.source" style="width: 300px">
              <el-option
                v-for="(item, index) in selectDataList.customer_source"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item v-show="!form.fold" label="注册时间:">
            <el-date-picker
              v-model="form.create_time"
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
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first" />
        <el-tab-pane label="ERP平台 (100)" name="second" />
        <el-tab-pane label=" 微信公众号 (10)" name="three" />
        <el-tab-pane label="微信小程序 (100)" name="four" />
        <el-tab-pane label="移动App (10)" name="five" />
        <el-tab-pane label="第三方平台 (100)" name="six" />
        <el-tab-pane label="企业微信 (10)" name="seven" />
      </el-tabs> -->
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:CustomerManage:add']"
            size="small"
            type="primary"
            @click="handleDetail('add', 3)"
          >
            添加客户
          </el-button>
          <!-- <el-button
            
            size="small"
            type="primary"
            @click="addCoupons()"
          >
            发送优惠券
          </el-button> -->
          <!-- <el-button size="small" type="primary" @click="handleDownload">
            批量导出
          </el-button> -->
        </el-form-item>
      </el-form>
      <QYList
        ref="multipleTable"
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="ID" prop="id" width="50" />
          <el-table-column label="客户编码" prop="sn" width="120" />
          <!-- <el-table-column label="头像" width="120">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.avatar"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.avatar" style="width: 50px; height: 50px" />
              </el-tooltip>
            </template>
          </el-table-column> -->
          <el-table-column label="客户名称" prop="name" width="150" />
          <el-table-column label="手机号" prop="mobile" width="120" />
          <el-table-column label="客户等级" prop="grade_name" width="120" />
          <el-table-column label="客户分类" prop="type_name" width="120" />
          <el-table-column label="订单归属" prop="order_belong" width="120">
            <template #default="{ row }">
              <span v-if="row.order_belong == 1">ERP商城</span>
              <span v-else>聚水潭</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="客户来源" prop="source_name" width="120" /> -->
          <el-table-column
            align="right"
            label="保证金"
            prop="earnest_money"
            width="150"
          >
            <template #default="{ row }">
              <el-tag v-if="row.earnest_money >= 0">
                ￥{{ row.earnest_money | moneyFormat }}
              </el-tag>
              <el-tag v-else type="danger">
                -￥{{ row.earnest_money | moneyFormat }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            align="right"
            label="成交额"
            prop="final_count"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.final_count | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="累计收银"
            prop="sum_voucher_money"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_voucher_money | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="余额/欠款"
            prop="delivery_arrears"
            width="150"
          >
            <template #default="{ row }">
              <el-tag v-if="row.balance < 0" type="danger">
                -￥{{ row.balance | moneyFormat }}
              </el-tag>
              <el-tag v-else>￥{{ row.balance | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" prop="create_time" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:CustomerManage:edit']"
                type="text"
                @click="handleDetail(row, 2)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:CustomerManage:view']"
                type="text"
                @click="handleDetail(row, 1)"
              >
                详情
              </el-button>
              <el-button type="text" @click="handleDeposit(row.id)">
                保证金
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" @fetch-data="fetchData" />
    </el-drawer>
    <el-dialog
      :before-close="handleClose1"
      title="客户保证金"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-button
        size="small"
        style="margin-bottom: 20px"
        type="primary"
        @click="handleDepositEdit()"
      >
        新增
      </el-button>
      <QYList
        :list="depositList"
        :list-type="depositListType"
        :state="depositListLoading"
      >
        <template #List>
          <el-table-column
            align="center"
            label="支付类型"
            prop="pay_type"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.pay_type == 1">支付宝</el-tag>
              <el-tag v-else-if="row.pay_type == 2">微信</el-tag>
              <el-tag v-else-if="row.pay_type == 3">银行卡</el-tag>
              <el-tag v-else-if="row.pay_type == 4">信用卡</el-tag>
              <el-tag v-else-if="row.pay_type == 5">现金</el-tag>
              <el-tag v-else>其他</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="保证金额度"
            prop="amount"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.amount >= 0">￥{{ row.amount }}</el-tag>
              <el-tag v-else type="danger">-￥{{ row.amount }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="备注"
            prop="remark"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作时间"
            prop="create_time"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </el-dialog>
    <el-dialog
      :before-close="handleCloseEdit1"
      title="新增客户保证金"
      :visible.sync="dialogVisibleEdit"
      width="35%"
    >
      <el-form
        ref="DepositEdit"
        label-width="120px"
        :model="DepositEditForm"
        :rules="DepositEditRules"
      >
        <el-form-item label="支付类型" prop="pay_type">
          <el-select v-model="DepositEditForm.pay_type">
            <el-option label="支付宝" :value="1" />
            <el-option label="微信" :value="2" />
            <el-option label="银行卡" :value="3" />
            <el-option label="信用卡" :value="4" />
            <el-option label="现金" :value="5" />
            <el-option label="其他" :value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="保证金额度" prop="money">
          <el-input
            v-model="DepositEditForm.money"
            placeholder="请输入保证金额度"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="转账证明">
          <div style="display: flex">
            <div>
              <el-button
                size="small"
                style="margin: 0 10px 0 0"
                type="primary"
                @click="handleShow(1)"
              >
                图片上传
              </el-button>
            </div>
            <div
              v-if="DepositEditForm.imgList.length > 0"
              style="display: flex; flex-wrap: wrap; margin-top: 20px"
            >
              <div
                v-for="(item, index) in DepositEditForm.imgList"
                :key="index"
                style="position: relative; padding: 10px"
              >
                <span
                  style="position: absolute; top: 0; right: 0"
                  @click="delImg(index)"
                >
                  x
                </span>
                <img :src="item" style="width: 100px; height: 100px" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="DepositEditForm.remark"
            placeholder="请输入备注"
            :rows="2"
            style="width: 215px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="DepositEditClose">取 消</el-button>
        <el-button type="primary" @click="DepositEditSave">确 定</el-button>
      </template>
    </el-dialog>
    <vab-upload
      ref="vabUpload"
      :limit="imgNum"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/ManageEdit'
  import Drawer from '@/subview/components/Drawer/ManageDrawer'
  import VabUpload from '@/extra/VabUpload'
  import {
    getCommonAllList,
    getCustomerList,
    getCustomerEarnestList,
    addCustomerEarnest,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'CustomerManage',
    components: { Edit, Drawer, VabUpload },
    mixins: [datajosn],
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!/^[1-9]\d*(\.\d{1,2})?$/.test(value)) {
          callback(new Error('金额必须是数字且大于0'))
        } else {
          callback()
        }
      }
      return {
        imgNum: 5,
        DepositEditForm: {
          customer_id: null,
          money: null,
          pay_type: null,
          remark: '',
          imgList: [],
        },
        DepositEditRules: {
          //money 金额 且必须大于零
          money: [
            { required: true, validator: validateUsername, trigger: 'blur' },
          ],

          pay_type: [
            { required: true, message: '请选择状态', trigger: 'blur' },
          ],
        },
        dialogVisibleEdit: false,
        DepositForm: {
          page: 1,
          pageSize: 10,
        },
        depositList: [],
        depositListType: 2,
        depositListLoading: false,
        depositTotal: 0,
        dialogVisible: false,
        title: '',
        selectDataList: [],
        filename: '客户列表',
        downloadLoading: false,
        exclList: [],
        drawer: false,
        drawerInof: {},
        activeName: 'first',
        form: {
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //搜索内容
          level: null, //等级id
          type: null, //客户分类
          //source: null, //客户来源
          tag: null, //标签id
          create_time: [], //注册时间区间搜索
          page: 1,
          page_size: 10,
          id: null,
        },
        form1: {
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //搜索内容
          level: null, //等级id
          type: null, //客户分类
          //source: null, //客户来源
          tag: null, //标签id
          create_time: [], //注册时间区间搜索
          page: 1,
          page_size: 10,
          id: null,
        },
        listType: 1,
        formType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        //表单筛选条件变化实时刷新列表
        handler: function (newval) {
          this.form1 = JSON.parse(JSON.stringify(newval))
          if (newval.tag != undefined) {
            if (newval.tag.length == 2) {
              this.form1.tag = newval.tag[1]
            } else {
              this.form1.tag = null
            }
          }
          this.fetchData()
        },
        deep: true,
      },
      dialogVisible: {
        //表单筛选条件变化实时刷新列表
        handler: function (newval) {
          if (newval == false) {
            this.fetchData()
          }
        },
        deep: true,
      },
      '$route.query.id': {
        //表单筛选条件变化实时刷新列表
        handler: async function (newval) {
          if (newval == undefined) {
            this.form.id = null
            this.form1.id = null
            await this.fetchData()
            this.selectData()
          } else {
            this.form.id = newval
            this.form1.id = newval
            await this.fetchData()
            this.selectData()
            this.handleDetail(this.list[0], 1)
          }
        },
        deep: true,
        immediate: true,
      },
      DepositEditForm: {
        handler: function (n) {
          this.imgNum = 5 - n.imgList.length
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.fetchData()
      this.selectData()
    },
    methods: {
      delImg(index) {
        this.DepositEditForm.imgList.splice(index, 1)
      },
      getSon(data) {
        data.forEach((item) => {
          if (this.DepositEditForm.imgList.indexOf(item) == -1) {
            this.DepositEditForm.imgList.push(item)
          }
        })
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      DepositEditClose() {
        this.dialogVisibleEdit = false
      },
      DepositEditSave() {
        this.dialogVisibleEdit = false
        // 二次确认弹框
        this.$confirm('确认新增保证金吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$refs['DepositEdit'].validate(async (valid) => {
              if (valid) {
                const { code } = await addCustomerEarnest(this.DepositEditForm)
                if (code == 200) {
                  this.$message.success('新增成功')
                  this.dialogVisibleEdit = false
                  this.handleDeposit(this.DepositEditForm.customer_id)
                }
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消新增',
            })
          })
      },
      handleDepositEdit() {
        this.dialogVisibleEdit = true
        this.DepositEditForm = {
          customer_id: this.DepositEditForm.customer_id,
          money: null,
          status: null,
          remark: '',
          imgList: [],
        }
      },
      handleDeposit(ID) {
        this.getCustomerEarnest(ID)
        this.dialogVisible = true
      },
      async getCustomerEarnest(ID) {
        this.depositListLoading = true
        const { data } = await getCustomerEarnestList({ customer_id: ID })
        this.DepositEditForm.customer_id = ID
        this.depositList = data
        this.depositListLoading = false
      },
      handleClose1() {
        this.dialogVisible = false
      },
      handleCloseEdit1() {
        this.dialogVisibleEdit = false
      },
      // 新增优化圈
      async addCoupons() {
        this.$refs['edit'].showEdit()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleClose() {
        this.drawer = false
      },
      handleQuery() {
        this.fetchData()
      },
      changeBtnSta(data) {
        this.form.fold = data
      },
      handleClick() {
        this.form.page = 1
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      changeBtnPageDeposit(data) {
        this.DepositForm.page = data
      },
      changeBtnPageSizeDeposit(data) {
        this.DepositForm.pageSize = data
      },
      async fetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        const { data } = await getCustomerList(this.form1)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 下拉框数据请求
      async selectData() {
        const { data } = await getCommonAllList({
          type: 'customer_grade,customer_type,customer_source,customer_tag',
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
        this.selectDataList = data
      },
      // 详情抽屉
      handleDetail(row, type) {
        if (type === 1) {
          this.title = '客户详情'
        } else if (type === 2) {
          this.title = '编辑客户'
        } else {
          this.title = '新增客户'
        }
        if (row == 'add') {
          this.drawerInof = {}
          this.drawerInof.drawerType = type
          this.drawerInof.order_belong = 1
          this.drawerInof.status = 1
        } else {
          this.drawerInof = JSON.parse(JSON.stringify(row))
          this.drawerInof.drawerType = type
        }
        this.drawer = true
      },
      // 导出
      handleSelectionChange(val) {
        this.exclList = val
      },
      handleDownload() {
        if (this.exclList.length) {
          this.downloadLoading = true
          import('@/utils/excel').then((excel) => {
            const tHeader = [
              'ID',
              '客户编码',
              '客户名称',
              '客户等级',
              '客户分类',
              '客户来源',
              '成交额',
              '余额/欠款',
              '注册时间',
            ]
            const filterVal = [
              'id',
              'sn',
              'name',
              'grade_name',
              'type_name',
              'source_name',
              'money',
              'final_count',
              'create_time',
            ]
            const list = this.exclList
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename,
            })
            this.$refs.multipleTable.$children[0].clearSelection()
            this.downloadLoading = false
          })
        } else {
          this.$baseMessage('请至少选择一行', 'error', 'vab-hey-message-error')
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>
<style lang="scss" scoped></style>
