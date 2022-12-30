<template>
  <div class="components-drawer">
    <div style="padding: 20px">
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
          <span style="margin: 20px 0 0 0">姓名 | 研发部</span>
        </el-col>
        <el-col :span="12" style="margin: 10px 0 0 0">
          <vab-icon
            icon="align-center"
            style="float: right; margin: 6px 0 0 0"
          />
          <el-button
            size="small"
            style="float: right; margin-right: 10px"
            type="primary"
            @click="handleEdit('add')"
          >
            赠送积分
          </el-button>
          <el-button
            v-if="form.drawerType == 1"
            size="small"
            style="float: right; margin-right: 10px"
            type="primary"
            @click="form.drawerType = 2"
          >
            编辑
          </el-button>
          <el-button
            v-if="form.drawerType == 2"
            size="small"
            style="float: right; margin-right: 10px"
            type="primary"
            @click="form.drawerType = 1"
          >
            完成
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col
          v-for="(item, index) in stalist"
          :key="index"
          :span="4"
          style="display: flex; flex: 1; flex-direction: column"
        >
          <span style="margin-bottom: 12px">{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </el-col>
      </el-row>
    </div>
    <el-tabs
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="员工信息" name="first" />
      <el-tab-pane label="积分明细" name="second" />
      <el-tab-pane label="订单明细" name="three" />
      <el-tab-pane label="签到记录" name="four" />
      <el-tab-pane label="持有优惠券" name="five" />
      <el-tab-pane label="排行榜" name="six" />
    </el-tabs>
    <div v-if="tabindex == '0'">
      <div v-if="form.drawerType == 1" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>用户编号：577</div>
            <div>真实姓名： 阿白</div>
            <div>手机号： 15236804776</div>
            <div>生日： 05.05</div>
            <div>性别： 男</div>
            <div>身份证号： 411425199905053316</div>
            <div>员工地址： 浙江省杭州市余杭区昌源清苑</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">账户信息</div>
          <div class="conten-list-row">
            <div>账户信息：25478894698</div>
            <div>登录密码：*******</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 50%">更新时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 100%">备注：备注信息</div>
          </div>
        </div>
      </div>
      <el-form
        v-if="form.drawerType == 2"
        ref="form"
        label-width="120px"
        :model="form"
        style="width: 100%"
      >
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">基本信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="用户编号：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入用户编号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="真实姓名：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入真实姓名"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="手机号码：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入手机号码"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="生日：">
                <el-date-picker
                  v-model="form.value1"
                  :clearable="false"
                  :default-time="['00:00:00', '23:59:59']"
                  format="yyyy-MM-dd"
                  placeholder="请选择生日"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
              <el-form-item class="item" label="性别：">
                <el-select v-model="form.type1" placeholder="请选择">
                  <el-option label="男" :value="1" />
                  <el-option label="女" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="身份证号：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入身份证号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="员工地址：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入客户地址"
                  style="width: 215px"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">账户信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="登录账户：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入登录账户"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="登录密码：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入登录密码"
                  style="width: 215px"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="备注信息：">
                <el-input
                  v-model="form.des"
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
    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="员工信息" name="first" />
      <el-tab-pane label="积分明细" name="second">
        <QYList :list="goosList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column label="来源/用途" prop="inof">
              <template #default="{ row }">
                <span>{{ row.wenzi }}|{{ row.color }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="积分变化"
              prop="money"
              show-overflow-tooltip
            />
            <el-table-column
              label="变化前积分"
              prop="pay"
              show-overflow-tooltip
            />
            <el-table-column label="日期" prop="num" show-overflow-tooltip />
            <el-table-column label="备注" prop="comutp" show-overflow-tooltip />
          </template>
        </QYList>
      </el-tab-pane>
      <el-tab-pane label=" 订单明细" name="three">
        <QYList :list="orderList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column label="订单ID" prop="id" show-overflow-tooltip />
            <el-table-column
              label="操作记录"
              prop="log"
              show-overflow-tooltip
            />
            <el-table-column
              label="操作时间"
              prop="time"
              show-overflow-tooltip
            />
          </template>
        </QYList>
      </el-tab-pane>
      <el-tab-pane label="签到记录" name="four">
        <QYList :list="stareList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column label="获得积分" prop="id" show-overflow-tooltip />
            <el-table-column label="签到时间" prop="inof" width="330" />
            <el-table-column label="备注" prop="time" show-overflow-tooltip />
          </template>
        </QYList>
      </el-tab-pane>
      <el-tab-pane label=" 持有优惠券" name="five">
        <QYList :list="orderList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column
              label="优惠券名称"
              prop="id"
              show-overflow-tooltip
            />
            <el-table-column label="面值" prop="log" show-overflow-tooltip />
            <el-table-column
              label="有效期(天)"
              prop="day"
              show-overflow-tooltip
            />
            <el-table-column
              label="操作时间"
              prop="time"
              show-overflow-tooltip
            />
          </template>
        </QYList>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="six">
        <QYList :list="orderList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column label="名次" type="index" width="50" />
            <el-table-column
              label="创建时间"
              prop="time"
              show-overflow-tooltip
            />
          </template>
        </QYList>
      </el-tab-pane>
    </el-tabs> -->
    <QYList
      v-else
      :list="goosList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="来源/用途" prop="inof">
          <template #default="{ row }">
            <span>{{ row.wenzi }}|{{ row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分变化" prop="money" show-overflow-tooltip />
        <el-table-column label="变化前积分" prop="pay" show-overflow-tooltip />
        <el-table-column label="日期" prop="num" show-overflow-tooltip />
        <el-table-column label="备注" prop="comutp" show-overflow-tooltip />
      </template>
    </QYList>
  </div>
</template>

<script>
  export default {
    name: 'EmployeesDrawer',
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        activeName: 'first',
        tabindex: '0',
        form: Object.assign({}, this.drawerInof),
        listLoading: false,
        listType: 2,
        goosList: [
          {
            color: '小程序',
            wenzi: '折扣券',
            money: 12,
            pay: 11,
            num: '2021-12-31 23:59:59',
            comutp: '不吃辣',
          },
        ],
        stareList: [
          {
            time: '备注',
            id: 231233,
            inof: '2022-10-10 16:33:41',
          },
        ],
        orderList: [
          {
            id: '九折优惠卷',
            log: '10元',
            day: 1,
            time: '2022-10-10 16:33:41',
          },
        ],
        stalist: [
          {
            name: '总订单数',
            value: '385单',
          },
          {
            name: '总数量',
            value: '15800件',
          },
          {
            name: '总销售额',
            value: '800000元',
          },
          {
            name: '积分',
            value: '5000',
          },
          {
            name: '员工等级',
            value: '牛人',
          },
        ],
      }
    },
    watch: {
      type(val) {
        this.type = val
      },
      drawerInof: {
        handler: function (newVal) {
          this.form = Object.assign({}, newVal)
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      handleClick(tab) {
        this.tabindex = tab.index
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
