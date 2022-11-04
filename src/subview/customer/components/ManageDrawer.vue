<template>
  <div class="components-drawer">
    <div style="padding: 30px 35px 25px">
      <div>
        <el-row :gutter="20">
          <el-col :span="12" style="display: flex">
            <img
              :src="form.img"
              style="
                width: 50px;
                height: 50px;
                margin: 0 10px 10px 0;
                border-radius: 50%;
              "
            />
            <span style="margin: 15px 0 0 0">
              {{ form.name }}|{{ form.level }}
            </span>
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
              @click="upMembers(2)"
            >
              升级会员
            </el-button>
            <el-button
              native-type="submit"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="upMembers(1)"
            >
              积分余额
            </el-button>
            <el-button
              v-if="form.drawerType == 1"
              native-type="submit"
              size="small"
              style="float: right"
              type="primary"
              @click="form.drawerType = 2"
            >
              编辑
            </el-button>
            <el-button
              v-if="form.drawerType == 2"
              native-type="submit"
              size="small"
              style="float: right"
              type="primary"
              @click="form.drawerType = 1"
            >
              完成
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
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="客户信息" name="first" />
      <el-tab-pane label="订单记录" name="second" />
      <el-tab-pane label=" 发货记录" name="three" />
      <el-tab-pane label="退货记录" name="four" />
      <el-tab-pane label="收银记录" name="five" />
      <el-tab-pane label="持有优惠券" name="six" />
      <el-tab-pane label=" 积分明细" name="seven" />
      <el-tab-pane label="签到记录" name="eight" />
      <el-tab-pane label="欠货统计" name="nine" />
      <el-tab-pane label="电子合同" name="ten" />
    </el-tabs>
    <div v-if="tabLabel == '客户信息'">
      <div v-if="form.drawerType == 1" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>用户编号：57711</div>
            <div>真实姓名： 阿白</div>
            <div>
              <span v-if="!formShow.phonestate">
                手机号码： {{ '15236804776' | phoneteltm }}
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
            <div>生日：2001-11-01</div>
            <div>
              <span v-if="!formShow.cardstate">
                身份证号： {{ '411425199905053315' | peridcardtm }}
              </span>
              <span v-else>身份证号： 411425199905053315</span>
              <i
                v-if="!formShow.cardstate"
                class="el-icon-view"
                style="margin-left: 10px"
                @click="formShow.cardstate = true"
              ></i>
              <i
                v-else
                class="el-icon-view"
                style="margin-left: 10px; color: #1890ff"
                @click="formShow.cardstate = false"
              ></i>
            </div>
            <div>加入时间： 2022-01-01 10：20:20</div>
            <div>客户地址： 杭州市滨江区春波小区11栋602</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">登录账户</div>
          <div class="conten-list-row">
            <div>登录账户：254784967</div>
            <div>登录密码：*******</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">客户概况</div>
          <div class="conten-list-row">
            <div>用户状态： 开启</div>
            <div>客户等级： 钻石会员</div>
            <div>客户分类： B端合伙人</div>
            <div style="width: 100%">客户标签： 小红书、00后</div>
            <div>所在城市： 杭州市</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 100%">专属客服： 阿白</div>
            <div style="width: 50%">创建时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 50%">更新时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 100%">
              备注信息： 1111111111111111111111111111
            </div>
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
                  placeholder="请选择生日"
                  type="date"
                />
              </el-form-item>
              <el-form-item class="item" label="身份证号：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入身份证号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="加入时间：">
                <el-date-picker
                  v-model="form.value1"
                  placeholder="请选择加入时间"
                  type="date"
                />
              </el-form-item>
              <el-form-item class="item" label="客户地址：">
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
            <div class="conten-title">登录账户</div>
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
            <div class="conten-title">客户概况</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="用户状态：">
                <el-switch
                  v-model="form.sp"
                  active-color="#41B584"
                  active-text="开启"
                  :active-value="1"
                  class="switch"
                  inactive-color="#D2D2D2"
                  inactive-text="关闭"
                  :inactive-value="0"
                />
              </el-form-item>
              <el-form-item class="item" label="客户等级：">
                <el-select v-model="form.type1" placeholder="请选择">
                  <el-option label="黄金" :value="1" />
                  <el-option label="白银" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="客户分类：">
                <el-select v-model="form.type1" placeholder="请选择">
                  <el-option label="快团团" :value="1" />
                  <el-option label="微信" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="客户标签：">
                <el-select v-model="form.type1" placeholder="请选择">
                  <el-option label="水瓶座" :value="1" />
                  <el-option label="金牛座" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="所在城市：" style="width: 100%">
                <addressCity @getLawyerListInfo="selectAddress" />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="专属客服：">
                <el-select v-model="form.type1" placeholder="请选择">
                  <el-option label="客服1" :value="1" />
                  <el-option label="客服2" :value="2" />
                </el-select>
              </el-form-item>
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
    <el-dialog
      :append-to-body="true"
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
  </div>
</template>

<script>
  import addressCity from '@/subview/components/City'
  import List from '@/subview/components/List'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ComponentsDrawer',
    components: { addressCity, List },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        formShow: {
          cardstate: false,
          phonestate: false,
        },
        dialogVisible1: false,
        distitle1: '',
        activeName: 'first',
        tabLabel: '客户信息',
        form: Object.assign({}, this.drawerInof),
        listLoading: false,
        listType: 2,
        formDrawer: {
          state: 0,
          state1: 0,
        },
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
          this.form = Object.assign({}, newVal)
          console.log(2222, newVal)
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        this.tabLabel = tab.label
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        console.log(selectProvince, selectCity, selectArea)
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
