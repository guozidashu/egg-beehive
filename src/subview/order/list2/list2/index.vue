<template>
  <div style="padding-top: 20px">
    <el-form label-width="70px" style="margin-left: 50px">
      <el-row type="flex">
        <el-form-item class="slt1" label="订单状态：">
          <el-select v-model="value" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          class="slt1"
          label="支付方式：
"
          style="margin-left: 35px"
        >
          <el-select v-model="value1" placeholder="全部">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="创建时间：
"
          style="margin-left: 35px"
        >
          <el-date-picker
            v-model="date1"
            align="right"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
          />
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item
          class="slt1"
          label="活动类型：
"
        >
          <el-select v-model="value2" placeholder="全部">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- v-if控制显隐 -->
        <el-form-item
          v-if="name == 'third'"
          class="slt1"
          label="供应商：
"
          style="margin-left: 34px"
        />
        <el-select
          v-if="name == 'third'"
          v-model="value2"
          placeholder="全部"
          style="width: 248px"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-form-item
          label="订单搜索：
"
          style="margin-left: 35px"
        >
          <el-input
            v-model="input3"
            class="input-with-select"
            placeholder="请输入内容"
            style="width: 248px"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-input>
        </el-form-item>
        <el-button
          class="btn1"
          style="height: 32px; margin-left: 20px"
          type="primary"
        >
          查询
        </el-button>
      </el-row>
    </el-form>
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <el-tabs
      v-model="activeName"
      style="margin-left: 20px"
      @tab-click="handleClick"
    >
      <el-button
        class="btn2"
        :disabled="disabled.length == 0 ? true : false"
        type="info"
      >
        批量删除订单
      </el-button>
      <el-button class="btn2" type="primary">手动批量发货</el-button>
      <el-button class="btn2" disabled type="info">自动批量发货</el-button>
      <el-button class="btn2" disabled type="info">打印配货订单</el-button>
      <el-dropdown>
        <el-button style="margin-left: 10px">
          更多菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="nav-info">
          <el-dropdown-item>导出发货单</el-dropdown-item>
          <el-dropdown-item>导出订单</el-dropdown-item>
        </el-dropdown-menu>
        <el-button>订单核销</el-button>
        <el-button style="margin-left: 650px">批量发货记录</el-button>
        <el-button>下载物流公司对照表</el-button>
      </el-dropdown>
      <el-tab-pane label="所有订单（143）" name="first" />
      <el-tab-pane label="平台订单（119）" name="second" />
      <el-tab-pane label="供应商订单（2）" name="third" />
    </el-tabs>
    <!-- 插入表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%; margin-top: 20px"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60" />
      <el-table-column label="订单号" width="183">
        <template slot-scope="{ row }">
          <el-button size="small" type="text">{{ row.date }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" prop="name" width="143" />
      <el-table-column label="用户信息" prop="address" width="162">
        <template slot-scope="{ row }">
          <el-button size="small" type="text">{{ row.address }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="	商品信息"
        prop="shoping"
        show-overflow-tooltip
        width="332"
      >
        <template slot-scope="{ row }">
          <img alt="" :src="row.img" style="width: 30px; height: 30px" />
          <span>{{ row.shoping }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际支付" prop="pay" width="102" />
      <el-table-column label="支付时间" prop="time" width="162" />
      <el-table-column label="支付类型" prop="type" width="133" />
      <el-table-column label="订单状态" prop="typeing" width="133">
        <template slot-scope="{ row }">
          <el-button plain :type="row.typeing == '已退款' ? 'danger' : ''">
            {{ row.typeing }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="operation" width="173">
        <template slot-scope="{ row }">
          <el-button size="small" type="text">{{ row.operation }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second',
        options: [
          {
            value: '选项1',
            label: '全部',
          },
          {
            value: '选项2',
            label: '未支付',
          },
          {
            value: '选项3',
            label: '未发货',
          },
          {
            value: '选项4',
            label: '待收货',
          },
          {
            value: '选项5',
            label: '待评价',
          },
          {
            value: '选项6',
            label: '交易完成',
          },
          {
            value: '选项7',
            label: '已删除',
          },
        ],
        value: '',
        options1: [
          {
            value: '选项1',
            label: '全部',
          },
          {
            value: '选项2',
            label: '微信支付',
          },
          {
            value: '选项3',
            label: '支付宝支付',
          },
          {
            value: '选项4',
            label: '余额支付',
          },
          {
            value: '选项5',
            label: '线下支付',
          },
        ],
        options2: [
          {
            value: '选项1',
            label: '普通订单',
          },
          {
            value: '选项2',
            label: '秒杀订单',
          },
          {
            value: '选项3',
            label: '砍价订单',
          },
          {
            value: '选项4',
            label: '拼团订单',
          },
          {
            value: '选项5',
            label: '积分商品',
          },
          {
            value: '选项6',
            label: '套餐商品',
          },
          {
            value: '选项7',
            label: '预售商品',
          },
        ],
        options3: [
          {
            value: '选项1',
            label: '全部',
          },
          {
            value: '选项2',
            label: '订单号',
          },
          {
            value: '选项3',
            label: '用户UID',
          },
          {
            value: '选项4',
            label: '用户姓名',
          },
          {
            value: '选项5',
            label: '用户电话',
          },
          {
            value: '选项6',
            label: '商品名称',
          },
          {
            value: '选项7',
            label: '商品件数',
          },
        ],
        value1: '',
        value2: '',
        value3: '',
        pickerOptions: {
          cellClassName: (time) => {
            if (
              new Date().getDate() === time.getDate() &&
              new Date().getMonth() === time.getMonth() &&
              new Date().getFullYear() === time.getFullYear()
            ) {
              return 'dateArrClass' // 返回值设置的是我们添加的类名
            }
          },
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        date1: '',
        input3: '',
        select: '',
        name: '',
        tableData: [
          {
            date: 'wx311135348316962816',
            name: '[普通订单]',
            address: '阿白',
            shoping: ' BY FAR Miranda leather shoulder bag |默认',
            img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
            pay: '597.00',
            time: '2022-10-11 13:40:47',
            type: '余额支付',
            typeing: '已退款',
            operation: '详情',
          },
          {
            date: 'wx311135348316912328',
            name: '[普通订单]',
            address: '155****0161',
            shoping: '【供应商】金枕榴莲 新鲜水果 整果带壳特产 5-6斤1个装 | ',
            img: 'https://s-pro.crmeb.net/uploads/attach/2022/09/28/a22df8c033b57be21a7ee30023f03a2d.jpg',
            pay: '0.93',
            time: '2022-10-11 13:40:47',
            type: '余额支付',
            typeing: '已完成',
            operation: '详情',
          },
          {
            date: 'wx311135348316962816',
            name: '[普通订单]',
            address: '阿白',
            shoping: ' BY FAR Miranda leather shoulder bag |默认',
            img: 'https://qiniu.crmeb.net/attach/2021/08/7dd96202108091906115467.png',
            pay: '597.00',
            time: '2022-10-11 13:40:47',
            type: '余额支付',
            typeing: '已退款',
            operation: '详情',
          },
          {
            date: 'wx311135348316912328',
            name: '[普通订单]',
            address: '155****0161',
            shoping: '【供应商】金枕榴莲 新鲜水果 整果带壳特产 5-6斤1个装 | ',
            img: 'https://qiniu.crmeb.net/attach/2021/08/c4a77202108091906111650.png',
            pay: '0.93',
            time: '2022-10-11 13:40:47',
            type: '余额支付',
            typeing: '已完成',
            operation: '详情',
          },
        ],
        search: '',
        disabled: [],
      }
    },
    methods: {
      handleClick(tab) {
        this.name = tab.name
      },
      handleSelectionChange(index) {
        this.disabled = index
      },
    },
  }
</script>

<style scoped lang="scss">
  ::v-deep .slt1 .el-input--small .el-input__inner {
    width: 248px;
    border-radius: 4px;
  }
  ::v-deep .el-form-item__label {
    font-size: 12px;
    color: #515a6e;
  }
  ::v-deep .el-icon-arrow-up:before {
    color: #000;
  }
  ::v-deep .input-with-select .el-select {
    width: 120px;
    text-align: left;
  }
  [data-v-2fa96ee3] .input-with-select .el-select {
    width: 120px;
    padding-right: 13px;
    padding-left: 10px;
    margin-left: -19px;
    text-align: center;
  }
  ::v-deep .el-input-group__prepend {
    padding: unset;
    font-size: 12px;
  }
  ::v-deep .el-input-group--prepend .el-input__inner {
    // width: 167px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .nav-info {
    top: 360px !important;
    right: 1050px !important;
    left: auto !important;
  }
  .el-popover {
    right: 20px !important;
    left: auto !important;
  }
</style>
