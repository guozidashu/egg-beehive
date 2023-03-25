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
            <el-select v-model="form.level" style="width: 200px">
              <el-option
                v-for="(item, index) in selectDataList.customer_grade"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户分类:">
            <el-select v-model="form.type" style="width: 200px">
              <el-option
                v-for="(item, index) in selectDataList.customer_type"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
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
          <el-button size="small" type="primary" @click="handleDerive()">
            批量导出
          </el-button>
        </el-form-item>
      </el-form>
      <QYList
        ref="multipleTable"
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="ID" prop="id" width="50" />
          <el-table-column label="客户编码" prop="sn" width="120" />
          <el-table-column label="客户名称" prop="name" width="150" />
          <el-table-column label="手机号" prop="mobile" width="120" />
          <el-table-column label="客户等级" prop="grade_name" width="120" />
          <el-table-column label="客户分类" prop="type_name" width="120" />
          <el-table-column label="发货方式" prop="order_belong" width="120">
            <template #default="{ row }">
              <span v-if="row.order_belong == 1">自主发货</span>
              <span v-else>聚水潭发货</span>
            </template>
          </el-table-column>
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
          <el-table-column align="right" label="合同" width="150">
            <template #default="{ row }">
              <el-upload
                v-if="row.agreement == null"
                :action="getAction()"
                class="upload-demo"
                :headers="headers"
                :limit="1"
                :on-success="handleChange"
                :show-file-list="false"
              >
                <el-tag type="danger" @click="handleChangeupload(row.id)">
                  上传合同
                </el-tag>
              </el-upload>
              <el-tooltip v-else placement="top">
                <div slot="content" style="display: flex">
                  <el-tag
                    style="margin-right: 10px"
                    @click="handleViewupload(row.agreement)"
                  >
                    查看
                  </el-tag>
                  <el-upload
                    :action="getAction()"
                    class="upload-demo"
                    :headers="headers"
                    :limit="1"
                    :on-success="handleChange"
                    :show-file-list="false"
                  >
                    <el-tag @click="handleChangeupload(row.id)">上传</el-tag>
                  </el-upload>
                </div>
                <el-tag>已有合同</el-tag>
              </el-tooltip>
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
          <el-table-column label="注册时间" prop="create_time" width="200" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="120"
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
              <el-button
                v-has-permi="['btn:CustomerManage:deposit']"
                type="text"
                @click="handleDeposit(row.id)"
              >
                保证金
              </el-button>
              <!-- <el-button type="text" @click="handleIntegral(row.id)">
                积分
              </el-button> -->
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
            @input="
              DepositEditForm.money = $moneyFormatInput(DepositEditForm.money)
            "
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
    <IntegralEdit ref="IntegralEdit" @fetch-data="fetchData" />
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
  import { mapGetters } from 'vuex'
  import { baseURL } from '@/config'
  import Edit from '@/subview/components/Edit/ManageEdit'
  import IntegralEdit from '@/subview/components/Edit/CustomerIntegralEdit'
  import Drawer from '@/subview/components/Drawer/ManageDrawer'
  import VabUpload from '@/extra/VabUpload'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: { Edit, Drawer, VabUpload, IntegralEdit },
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
        up_customer_id: null,
        headers: {},
        // 新增客户保证金相关
        imgNum: 5, // 上传图片数量
        // 新增保证金表单
        DepositEditForm: {
          customer_id: null,
          money: null,
          pay_type: null,
          remark: '',
          imgList: [],
        },
        // 新增保证金表单验证
        DepositEditRules: {
          money: [
            { required: true, validator: validateUsername, trigger: 'blur' },
          ],

          pay_type: [
            { required: true, message: '请选择状态', trigger: 'blur' },
          ],
        },
        dialogVisibleEdit: false,
        // 客户保证金列表相关
        depositList: [],
        depositListType: 2,
        depositListLoading: false,
        dialogVisible: false,
        // 抽屉相关
        title: '',
        drawer: false,
        drawerInof: {},
        // 表格 表单相关
        // 下拉框数据
        selectDataList: [],
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //关键字
          level: null,
          type: null,
          tag: null,
          create_time: [],
          page: 1,
          pageSize: 10,
          id: null,
        },
        listType: 1,
        formType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    computed: {
      ...mapGetters({
        token: 'user/token',
      }),
    },
    watch: {
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.pageState = false
        },
        deep: true,
      },
      // 客户保证金列表
      dialogVisible: {
        handler: function (newval) {
          if (newval == false) {
            this.fetchData()
          }
        },
        deep: true,
      },
      // 客户分析跳转
      '$route.query.id': {
        handler: async function (newval) {
          if (newval != undefined) {
            this.form.id = newval
            await this.selectData()
            this.handleDetail(this.list[0], 1)
          }
        },
        deep: true,
        immediate: true,
      },
      // 新增保证金表单
      DepositEditForm: {
        handler: function (n) {
          this.imgNum = 5 - n.imgList.length
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.headers['Authorization'] = `${this.token}`
      this.selectData()
      this.fetchData()
    },
    methods: {
      getAction() {
        return baseURL + '/common/uploadPic'
      },
      handleViewupload(url) {
        window.open(url)
      },
      handleChangeupload(id) {
        this.up_customer_id = id
      },
      // 合同上传
      async handleChange(res) {
        if (res.code == 200) {
          const { code } = await this.api.getCustomerAgreement({
            customer_id: this.up_customer_id,
            agreement: res.data.file_url,
          })
          if (code == 200) {
            this.$message.success('上传成功')
            this.fetchData()
          } else {
            this.$message.error('上传失败')
          }
        }
      },
      // 客户积分
      handleIntegral(row) {
        this.$refs['IntegralEdit'].showEdit(row)
      },
      // 客户导出
      async handleDerive() {
        const { code, data } = await this.api.getCustomerExport(this.form)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
        } else {
          this.$message.error('导出失败')
        }
      },
      // 新增客户保证金 删除图片
      delImg(index) {
        this.DepositEditForm.imgList.splice(index, 1)
      },
      // 新增客户保证金 上传图片 数据回传
      getSon(data) {
        data.forEach((item) => {
          if (this.DepositEditForm.imgList.indexOf(item) == -1) {
            this.DepositEditForm.imgList.push(item)
          }
        })
      },
      // 新增客户保证金 上传图片
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      DepositEditClose() {
        this.dialogVisibleEdit = false
      },
      // 新增客户保证金 确认
      DepositEditSave() {
        this.$refs['DepositEdit'].validate((valid) => {
          if (valid) {
            this.$confirm('确认新增保证金吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(async () => {
                const { code } = await this.api.addCustomerEarnest(
                  this.DepositEditForm
                )
                if (code == 200) {
                  this.$message.success('新增成功')
                  this.dialogVisibleEdit = false
                  this.handleDeposit(this.DepositEditForm.customer_id)
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消新增',
                })
              })
          }
        })
      },
      // 新增客户保证金 打开
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
      // 客户保证金列表 选中
      handleDeposit(ID) {
        this.getCustomerEarnest(ID)
        this.dialogVisible = true
      },
      // 客户保证金列表 新增界面
      async getCustomerEarnest(ID) {
        this.depositListLoading = true
        const { data } = await this.api.getCustomerEarnestList({
          customer_id: ID,
        })
        this.DepositEditForm.customer_id = ID
        this.depositList = data
        this.depositListLoading = false
      },
      // 获取客户列表
      async fetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getCustomerList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 获取下拉框数据
      async selectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade,customer_type,',
        })
        this.selectDataList = data
      },
      // 客户详情新增编辑
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
          this.drawerInof.remit_role = 1
          // this.drawerInof.change_price = 0
          this.drawerInof.change_discount = 0
          this.drawerInof.order_belong = 2
          this.drawerInof.status = 1
          this.drawerInof.is_online_order = 0
        } else {
          this.drawerInof = JSON.parse(JSON.stringify(row))
          this.drawerInof.drawerType = type
        }
        this.drawer = true
      },
      handleClose1() {
        this.dialogVisible = false
      },
      handleCloseEdit1() {
        this.dialogVisibleEdit = false
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
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
    },
  }
</script>
