<template>
  <div style="padding: 20px">
    <div
      style="
        width: 100%;
        height: 20px;
        padding-left: 10px;
        font-size: 16px;
        line-height: 10px;
      "
    >
      云打印机设置
    </div>
    <div style="width: 100%; height: 2px; background-color: #e4e7ed"></div>
    <div
      style="
        width: 100%;
        height: 62px;
        padding-left: 20px;
        margin-top: 10px;
        line-height: 62px;
        background-color: #e8f4ff;
        border-radius: 8px;
      "
    >
      小票打印机用于用户下单成功后自动打印小票+语音播报，目前支持易联云和飞鹅的小票打印机，请先购买小票打印机后进行配置，点击进入易联云购买地址，点击进入飞鹅购买地址
    </div>
    <QYForm :form="form" :form-type="formType" @changeSearch="handleQuery">
      <template #Form>
        <el-form-item>
          <el-button type="primary" @click="add('易联云', 1)">
            添加易联云打印机
          </el-button>
          <el-button type="primary" @click="add('飞鹅', 1)">
            添加飞鹅打印机
          </el-button>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="form.status">
            <el-option label="全部" :value="0" />
            <el-option label="开启" :value="1" />
            <el-option label="关闭" :value="2" />
          </el-select>
        </el-form-item>
      </template>
    </QYForm>
    <QYList
      :list="list"
      :list-type="listType"
      :state="listLoading"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <!-- 表格组件具名插槽 自定义表头 -->
      <template #List>
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" prop="id" width="80" />
        <el-table-column label="类型" prop="leixing" width="150" />
        <el-table-column label="名称" prop="mingcheng" width="180" />
        <el-table-column label="标题" prop="biaoti" show-overflow-tooltip />
        <el-table-column
          label="终端号"
          prop="zhongduan"
          show-overflow-tooltip
        />
        <el-table-column label="添加时间" prop="tianjia" width="200" />
        <el-table-column label="状态" prop="zhuangtai" width="150">
          <template #default="{ row }">
            <el-switch
              v-model="row.zhuangtai"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
              style="margin: 0 10px"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template #default="{ row }">
            <el-button type="text" @click="add(row.leixing, 2)">编辑</el-button>
            <el-button type="text">打印测试OK</el-button>
          </template>
        </el-table-column>
      </template>
    </QYList>
    <!-- 弹框1 -->
    <el-dialog
      :before-close="handleClose"
      :title="distitle"
      top="10vh"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        label-width="120px"
        style="margin-top: -20px; border-top: 1px solid #d2d2d2"
      >
        <el-form-item label="名称：" style="margin-top: 10px">
          <el-input v-model="name" style="width: 248px" />
        </el-form-item>
        <el-form-item label="小票标题：">
          <el-input v-model="title" style="width: 248px" />
        </el-form-item>
        <el-form-item label="应用ID：">
          <el-input v-model="ID" style="width: 248px" />
          <span style="margin-left: 20px; color: #999">
            请在
            <a href="https://www.yilianyun.net/" style="color: #000">易联云</a>
            创建创建自有型应用 获取应用ID
          </span>
        </el-form-item>
        <el-form-item label="应用密钥：">
          <el-input v-model="ID" style="width: 248px" />
          <span style="margin-left: 20px; color: #999">
            请在
            <a href="https://www.yilianyun.net/" style="color: #000">易联云</a>
            创建创建自有型应用 获取应用密钥
          </span>
        </el-form-item>
        <el-form-item label="Access Token：">
          <el-input v-model="ID" style="width: 248px" />
          <span style="margin-left: 20px; color: #999">
            请求token，不填写将自动获取
          </span>
        </el-form-item>
        <el-form-item label="终端号：">
          <el-input style="width: 248px" />
        </el-form-item>
        <el-form-item label="终端密钥：">
          <el-input style="width: 248px" />
        </el-form-item>
        <el-form-item label="自动打印：">
          <el-radio v-model="radio" label="1">开启</el-radio>
          <el-radio v-model="radio" label="2">关闭</el-radio>
          <span style="color: #999">
            关闭自动打印后需要在订单列表手动点击打印才会打印
          </span>
        </el-form-item>
        <el-form-item label="配送订单：">
          <el-radio v-model="radio1" label="3">打印</el-radio>
          <el-radio v-model="radio1" label="4">不打印</el-radio>
        </el-form-item>
        <el-form-item label="自提订单：">
          <el-radio v-model="radio2" label="10">不打印</el-radio>
          <el-radio v-model="radio2" label="11">全部门店</el-radio>
          <el-radio v-model="radio2" label="12">选择门店</el-radio>
        </el-form-item>
        <el-form-item v-if="radio2 == '12'" label="选择门店：">
          <el-select placeholder="请选择门店">
            <el-option label="门店一" :value="0" />
            <el-option label="门店二" :value="1" />
            <el-option label="门店三" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="音量大小：">
          <el-radio v-model="radio21" label="100">不播报</el-radio>
          <el-radio v-model="radio21" label="200">低音量</el-radio>
          <el-radio v-model="radio21" label="300">中音量</el-radio>
          <el-radio v-model="radio21" label="400">高音量</el-radio>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="radio22" label="3">开启</el-radio>
          <el-radio v-model="radio22" label="4">关闭</el-radio>
        </el-form-item>
        <el-button
          style="margin-left: 70px"
          type="primary"
          @click="dialogVisible = false"
        >
          提交
        </el-button>
      </el-form>
    </el-dialog>
    <!-- 弹框2 -->
    <el-dialog
      :before-close="handleClose1"
      :title="distitle1"
      top="10vh"
      :visible.sync="dialogVisible1"
      width="50%"
    >
      <el-form
        label-width="120px"
        style="margin-top: -20px; border-top: 1px solid #d2d2d2"
      >
        <el-form-item label="名称：" style="margin-top: 10px">
          <el-input v-model="name" style="width: 248px" />
        </el-form-item>
        <el-form-item label="小票标题：">
          <el-input v-model="title" style="width: 248px" />
        </el-form-item>
        <el-form-item label="USER：">
          <el-input v-model="ID" style="width: 248px" />
          <span style="margin-left: 20px; color: #999">
            请在
            <a href="http://www.feieyun.com/" style="color: #000">飞鹅</a>
            注册认证后 个人中心查找
          </span>
        </el-form-item>
        <el-form-item label="UKEY：">
          <el-input v-model="ID" style="width: 248px" />
          <span style="margin-left: 20px; color: #999">
            请在
            <a href="http://www.feieyun.com/" style="color: #000">飞鹅</a>
            注册认证后 个人中心查找
          </span>
        </el-form-item>
        <el-form-item label="编号（SN）：">
          <el-input v-model="ID" style="width: 248px" />
        </el-form-item>
        <el-form-item label="密钥（KEY）：">
          <el-input style="width: 248px" />
        </el-form-item>
        <el-form-item label="自动打印：">
          <el-radio v-model="radio" label="1">开启</el-radio>
          <el-radio v-model="radio" label="2">关闭</el-radio>
          <span style="color: #999">
            关闭自动打印后需要在订单列表手动点击打印才会打印
          </span>
        </el-form-item>
        <el-form-item label="配送订单：">
          <el-radio v-model="radio1" label="3">打印</el-radio>
          <el-radio v-model="radio1" label="4">不打印</el-radio>
        </el-form-item>
        <el-form-item label="自提订单：">
          <el-radio v-model="radio2" label="10">不打印</el-radio>
          <el-radio v-model="radio2" label="11">全部门店</el-radio>
          <el-radio v-model="radio2" label="12">选择门店</el-radio>
        </el-form-item>
        <el-form-item v-if="radio2 == '12'" label="选择门店：">
          <el-select placeholder="请选择门店">
            <el-option label="门店一" :value="0" />
            <el-option label="门店二" :value="1" />
            <el-option label="门店三" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="打印机类型：">
          <el-radio v-model="radio21" label="100">小票打印机</el-radio>
          <el-radio v-model="radio21" label="200">标签打印机</el-radio>
        </el-form-item>
        <el-form-item label="打印模板：">
          <el-radio v-model="radio22" label="3">默认</el-radio>
          <el-radio v-model="radio22" label="4">自定义</el-radio>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="radio22" label="3">开启</el-radio>
          <el-radio v-model="radio22" label="4">关闭</el-radio>
        </el-form-item>
        <el-button
          style="margin-left: 70px"
          type="primary"
          @click="dialogVisible1 = false"
        >
          提交
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formType: 3,
        form: {
          name: '',
          page: 1,
          pageSize: 10,
          status: 0,
        },
        listType: 1,
        list: [
          {
            id: '1',
            leixing: '易联云',
            mingcheng: '针式打印机',
            biaoti: '北京租赁复印机复印机打印机租赁价格查询',
            zhongduan:
              '以佳博智能打印机为例，打印机终端编号是在蜂巢云云端中心即可查看',
            tianjia: '2016-05-02',
          },
          {
            id: '2',
            leixing: '飞鹅',
            mingcheng: '喷墨打印机',
            biaoti: '北京租赁复印机复印机打印机租赁价格查询',
            zhongduan:
              '以佳博智能打印机为例，打印机终端编号是在蜂巢云云端中心即可查看',
            tianjia: '2016-05-02',
          },
          {
            id: '3',
            leixing: '易联云',
            mingcheng: '激光打印机',
            biaoti: '北京租赁复印机复印机打印机租赁价格查询',
            zhongduan:
              '以佳博智能打印机为例，打印机终端编号是在蜂巢云云端中心即可查看',
            tianjia: '2016-05-02',
          },
          {
            id: '4',
            leixing: '易联云',
            mingcheng: '30-300ppm分别为低',
            biaoti: '北京租赁复印机复印机打印机租赁价格查询',
            zhongduan:
              '以佳博智能打印机为例，打印机终端编号是在蜂巢云云端中心即可查看',
            tianjia: '2016-05-02',
          },
          {
            id: '5',
            leixing: '飞蛾',
            mingcheng: '打印速度在30ppm以下、',
            biaoti: '北京租赁复印机复印机打印机租赁价格查询',
            zhongduan:
              '以佳博智能打印机为例，打印机终端编号是在蜂巢云云端中心即可查看',
            tianjia: '2016-05-02',
          },
          {
            id: '6',
            leixing: '易联云',
            mingcheng: '中速和高速激光打印机',
            biaoti: '北京租赁复印机复印机打印机租赁价格查询',
            zhongduan:
              '以佳博智能打印机为例，打印机终端编号是在蜂巢云云端中心即可查看',
            tianjia: '2016-05-02',
          },
          {
            id: '7',
            leixing: '易联云',
            mingcheng: '40-120ppm',
            biaoti: '北京租赁复印机复印机打印机租赁价格查询',
            zhongduan:
              '以佳博智能打印机为例，打印机终端编号是在蜂巢云云端中心即可查看',
            tianjia: '2016-05-02',
          },
        ],
        listLoading: false,
        total: 0,
        radio22: '3',
        radio21: '300',
        checked: false,
        radio2: '11',
        radio1: '3',
        radio: '1',
        ID: '',
        title: '商城系统',
        name: '小票打印机',
        dialogVisible: false,
        dialogVisible1: false,
        distitle: '',
        distitle1: '',
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleClose() {
        this.dialogVisible = false
      },
      add(type, lx) {
        if (type == '易联云') {
          this.dialogVisible = true
          if (lx == 1) {
            this.distitle = '添加易联云打印机'
          } else {
            this.distitle = '编辑易联云打印机'
          }
        } else {
          this.dialogVisible1 = true
          if (lx == 1) {
            this.distitle1 = '添加飞鹅打印机'
          } else {
            this.distitle1 = '编辑飞鹅打印机'
          }
        }
      },
      handleClose1() {
        this.dialogVisible1 = false
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 多选获取数据   公共部分
      selectBtnRows(data) {
        this.selectRows = data
      },

      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getWaveList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
      // 查询
      handleQuery() {
        this.form.page = 1
      },
    },
  }
</script>

<style></style>
