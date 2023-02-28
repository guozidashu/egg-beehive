<template>
  <div style="background-color: #f6f8f9">
    <el-card
      shadow="never"
      style="width: 100%; background-color: #fbfcff; border-radius: 5px"
    >
      <div style="display: flex; justify-content: space-between">
        <div>
          <el-avatar :src="avatar" />
          <span style="position: relative; top: -5px; left: 10px">
            您好，
            {{ username }}
            &nbsp;&nbsp;授权编码：UID54646852111WX &nbsp;
            服务商ID：UID54646852111
          </span>
        </div>
        <div style="padding-top: 10px; margin-right: 40px">
          <span style="position: relative; top: -5px; right: 10px">
            关联业务
          </span>
          <img
            src="../../assets/quanyu.png"
            style="
              width: 20px;
              height: 20px;
              margin-right: 5px;
              border-radius: 50%;
            "
          />
          <img
            src="../../assets/quanyubao.png"
            style="
              width: 20px;
              height: 20px;
              margin-right: 5px;
              border-radius: 50%;
            "
          />
          <img
            src="../../assets/shangcheng.png"
            style="width: 20px; height: 20px; border-radius: 50%"
          />
        </div>
      </div>
    </el-card>
    <div style="display: flex; justify-content: space-between">
      <el-card
        shadow="never"
        style="width: 20%; margin-right: 20px; border-radius: 5px"
      >
        <div style="padding: 10px; font-size: 16px; font-weight: 600">
          授权信息
        </div>
        <div style="padding: 0 10px; margin-top: 10px; font-size: 14px">
          <div style="padding: 10px 0">授权主体：湖州发生米服饰有限公司</div>
          <!-- <div style="padding: 10px 0">授权主体：杭州洛一有限公司</div> -->
          <div style="padding: 10px 0">注册时间：2022年12月31日 16:53:21</div>
          <div style="padding: 10px 0">到期时间：2023年12月31日 16:53:21</div>
        </div>
      </el-card>
      <el-card shadow="never" style="width: 80%; border-radius: 5px">
        <div style="padding: 10px; font-size: 16px; font-weight: 600">
          授权应用
        </div>
        <div style="display: flex; flex-wrap: nowrap">
          <div
            style="
              padding: 10px;
              margin: 10px;
              background: -webkit-linear-gradient(top, #fff5d1, #fff);
              border-radius: 5px;
            "
          >
            <div style="padding: 10px 0; font-size: 14px; font-weight: 600">
              <img
                src="../../assets/quanyu.png"
                style="width: 20px; height: 20px"
              />
              <span style="position: relative; top: -5px; left: 5px">
                ERP开单
              </span>
            </div>
            <div style="padding: 5px 0; font-size: 12px; color: #fbc049">
              到期时间：2023年12月31日 16:53:21
            </div>
            <div
              style="padding: 5px 0; font-size: 12px; color: #46a6ff"
              @click="centerDialogVisible = true"
            >
              去咨询
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div
            style="
              padding: 10px;
              margin: 10px;
              background: -webkit-linear-gradient(top, #fff5d1, #fff);
              border-radius: 5px;
            "
          >
            <div style="padding: 10px 0; font-size: 14px; font-weight: 600">
              <img
                src="../../assets/shangcheng.png"
                style="width: 20px; height: 20px"
              />
              <span style="position: relative; top: -5px; left: 5px">
                私域订货商城
              </span>
            </div>
            <div style="padding: 5px 0; font-size: 12px; color: #fbc049">
              到期时间：2023年12月31日 16:53:21
            </div>
            <div
              style="padding: 5px 0; font-size: 12px; color: #46a6ff"
              @click="centerDialogVisible = true"
            >
              去咨询
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div
            style="
              padding: 10px;
              margin: 10px;
              background: -webkit-linear-gradient(top, #fff5d1, #fff);
              border-radius: 5px;
            "
          >
            <div style="padding: 10px 0; font-size: 14px; font-weight: 600">
              <img
                src="../../assets/yanfa.png"
                style="width: 20px; height: 20px"
              />
              <span style="position: relative; top: -5px; left: 5px">
                研发协同
              </span>
            </div>
            <div style="padding: 5px 0; font-size: 12px; color: #fbc049">
              到期时间：2023年12月31日 16:53:21
            </div>
            <div
              style="padding: 5px 0; font-size: 12px; color: #46a6ff"
              @click="centerDialogVisible = true"
            >
              去咨询
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div
            style="
              padding: 10px;
              margin: 10px;
              background: -webkit-linear-gradient(top, #fff5d1, #fff);
              border-radius: 5px;
            "
          >
            <div style="padding: 10px 0; font-size: 14px; font-weight: 600">
              <img
                src="../../assets/quanyubao.png"
                style="width: 20px; height: 20px"
              />
              <span style="position: relative; top: -5px; left: 5px">
                圈域宝SCRM
              </span>
            </div>
            <div style="padding: 5px 0; font-size: 12px; color: #fbc049">
              到期时间：2023年12月31日 16:53:21
            </div>
            <div
              style="padding: 5px 0; font-size: 12px; color: #46a6ff"
              @click="centerDialogVisible = true"
            >
              去咨询
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div
            style="
              width: 220px;
              padding: 10px;
              margin: 10px;
              background-color: #f8f8f9;
              border-radius: 5px;
            "
          >
            <div style="padding: 10px 0; font-size: 14px; font-weight: 600">
              <img
                src="../../assets/gendan.png"
                style="width: 20px; height: 20px"
              />
              <span style="position: relative; top: -5px; left: 5px">
                生产跟单
              </span>
            </div>
            <div style="padding: 5px 0; font-size: 12px; color: #969aa0">
              未开通
            </div>
            <div
              style="padding: 5px 0; font-size: 12px; color: #46a6ff"
              @click="centerDialogVisible = true"
            >
              去咨询
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div style="display: flex; justify-content: space-between">
      <el-card
        shadow="never"
        style="width: 74%; margin-right: 20px; border-radius: 5px"
      >
        <div slot="header">
          <span style="font-size: 16px; font-weight: 600">版本更新记录</span>
        </div>
        <div style="width: 100%; max-height: calc(35vh); overflow: scroll">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              placement="top"
            >
              <div style="margin-bottom: 10px">
                {{ activity.timestamp }}&nbsp;&nbsp; {{ activity.timestamp1 }}
                <el-tag
                  v-if="index == 0"
                  effect="dark"
                  size="mini"
                  style="margin-left: 5px"
                  type="danger"
                >
                  最新版本
                </el-tag>
              </div>
              <el-card shadow="hover" style="background-color: #f6f8f9">
                <el-collapse
                  class="fold-warp"
                  style="font-size: 12px"
                  @change="handleChange"
                >
                  <el-collapse-item name="1" :title="activity.content">
                    <div
                      v-for="(item, index1) in activity.contentList"
                      :key="index1"
                    >
                      <span>{{ item }}</span>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
      <el-card shadow="never" style="width: 26%; border-radius: 5px">
        <div slot="header">
          <span style="font-size: 16px; font-weight: 600">技术支持团队</span>
        </div>
        <div style="padding-left: 10px">
          <p>核心开发团队</p>
          <p style="font-size: 12px">产品：老何是刀客</p>
          <p style="font-size: 12px">技术：时间不等人、@Dong、小杨哥、Liquor</p>
          <p style="font-size: 12px">
            设计 UI：时间不等人、TheFireflyAwn、xy-yyds、LXT
          </p>
          <p style="font-size: 12px">质检：老何、绵绵绵、Xaboy</p>
          <p style="margin-top: 40px">参与开发人员</p>
          <p style="font-size: 12px">产品：小雨、晓啾--Leoy Studio、大师兄</p>
          <p style="font-size: 12px">
            技术：WeChat
            Pay、以爱为半径、斌、武香君、很复杂、聆听、吖珊、不点@%、娜娜、归来仍是少年
          </p>
          <p style="font-size: 12px">
            设计：蒹葭、莹宝 70、啵一口小奶勋、Sɪʟᴇɴᴛ
          </p>
          <p style="font-size: 12px">测试：夏天是草原</p>
        </div>
      </el-card>
    </div>
    <el-dialog
      center
      class="Customerservice"
      style="border-radius: 25px"
      :visible.sync="centerDialogVisible"
      width="450px"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px 20px 20px;
        "
      >
        <div
          style="padding: 20px 0; font-size: 20px; font-weight: 600; color: red"
        >
          在线客服
        </div>
        <div
          style="
            width: 100%;
            padding: 20px 0;
            font-size: 16px;
            text-align: center;
            border-top: 1px solid #efefef;
            border-bottom: 1px solid #efefef;
          "
        >
          你的私人顾问：老何
        </div>
        <div style="padding: 10px 0 0 0">
          <div style="padding: 10px 0 0 0; font-size: 16px; text-align: center">
            <vab-icon
              icon="wechat-line"
              style="font-size: 20px; color: #4daf29"
            />
            微信咨询
          </div>
          <img
            src="https://oss.business.quanyu123.com//dee133c54041034454ca94d27b301a2f.png"
            style="width: 200px; height: 200px"
          />
        </div>
        <div
          style="
            width: 100%;
            padding: 20px 0;
            font-size: 14px;
            text-align: center;
            border-top: 1px solid #efefef;
            border-bottom: 1px solid #efefef;
          "
        >
          服务热线 &nbsp;&nbsp;
          <span style="font-size: 20px; font-weight: 600; color: red">
            191-0655-9871
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Account',
    data() {
      return {
        centerDialogVisible: false,
        erp_openChecked: true,
        design_openChecked: true,
        platform_openChecked: true,
        state: false,
        serviceList: [],
        selevt: 1,
        inof: {},
        activities: [
          {
            timestamp: '2023-02-27 20:46:03',
            timestamp1: '版本：V2.0.8',
            content:
              '【新增】[数据中台] 可设置商城最小单位数量/金额提交订单，根据不同会员等级、设置不同门槛',
            contentList: [
              '【新增】[数据中台] 退货单列表，商品吊牌条码打印，增加EXCEL导出功能',
              '【优化】[数据中台] 优化商品编码规则，商品内部条码、商品防伪码',
              '【优化】[数据中台] 优化商品预售规则和业务流程，如超时取消、定金是否充许退还、尾款支付天数、定金支付比例，超期必赔服务',
              '【优化】[订货商城] 优化前端UI界面配色问题，尽量减少视觉疲劳，只为更懂你',
              '【优化】[订货商城] 可控制提交订单的最小单位数量/金额的设置条件',
              '【优化】[订货商城] 优化预售页面所呈现给用户的合理化布局',
              '【其它】修复了一些系统已知问题，提升应用稳定性',
              '【其它】优化了一些体验细节~',
            ],
          },
          {
            timestamp: '2023-02-11 20:39:16',
            timestamp1: '版本：V2.0.7',
            content: '【新增】[数据中台] 全渠道数据大屏实时数据分析功能',
            contentList: [
              '【新增】[数据中台] 聚水潭占用库存，聚水潭现货库存',
              '【新增】[数据中台] 聚水潭开放接口服务商应用授权方式',
              '【新增】[数据中台] 增加吊牌/条码打印模块，商品管理增加SKU条形码',
              '【新增】[数据中台] 商品管理 | 客户管理 | 客户销售排行，增加EXCEL导出功能',
              '【新增】[数据中台] 客户提醒补货申请订单统计',
              '【新增】[ERP开单] 聚水潭云仓和自主渠道智能分仓、相互调拨功能',
              '【新增】[ERP开单] 商品入仓的库存可直接入聚水潭云仓，且自动同步到聚水潭',
              '【新增】[ERP开单] 聚水潭发货后返回ERP&数据中台物流信息、快递信息',
              '【新增】[订货商城] 商品预售功能，营造紧迫抢货的氛围细节优化',
              '【新增】[SCRM] 企微AI机器人，ChatGPT营销功能',
              '【新增】[SCRM] 视频号直播裂变模块上线',
              '【新增】[SCRM] 引流外链增加跳转直播间模式',
              '【新增】[SCRM] 营销自动化群SOP上线',
              '【优化】[数据中台] 客户分析，库存统计报表细节修化',
              '【优化】[订货商城] 聚水潭发货返回发货单物流信息、快递信息',
              '【优化】[SCRM] 转盘类应用概率优化',
              '【修复】[数据中台] 商城首页装修模板图片预览自适应问题',
              '【修复】[SCRM] 群发宝分组超1万发送bug',
              '【修复】[SCRM] 任务宝营销推广小尾巴发送文字bug',
              '【其它】更多细节优化~~',
            ],
          },
          {
            timestamp: '2023-01-13 08:29:13 ',
            timestamp1: '版本：V2.0.6',
            content: '【新增】[数据中台] 增加销售目标看板',
            contentList: [
              '【新增】[数据中台] 增加欠货数据预警分析功能',
              '【新增】[数据中台] 增加发货统计报表和导出EXCEL功能',
              '【新增】[订货商城] 会员中心增加销售分析自定义模板',
              '【新增】[订货商城] 客户提醒品牌商/供应链补货功能',
              '【优化】[数据中台] 优化数据分析决策模块，着重优化经营指导、预警、洞察数据呈现',
              '【优化】[数据中台] 优化首页看板和规范全局UI界面的统一性',
              '【优化】[数据中台] 优化完善账户信息的完整性',
              '【优化】[数据中台] 优化调整中台菜单的布局和图标优化',
              '【优化】[数据中台] 同步聚水潭的商品、订单、库存的业务流程优化',
              '【优化】[SCRM] 企业微信用户画像侧边栏优化',
              '【优化】[订货商城] 客户等级申请流程优化',
              '【修复】[订货商城] 商城详情页图片适配问题',
              '【修得】[SCRM] 企业微信授权方式问题',
              '【其它】其它细节及BUG优化',
            ],
          },
          {
            timestamp: '2022-12-31 03:49:32',
            timestamp1: '版本：V2.0.5',
            content: '【新增】[数据中台] 增加账户信息功能',
            contentList: [
              '【新增】[数据中台] 总后台系统设置增加检测和修改密码功能',
              '【新增】[SCRM] 企微客户画像增加添加手机号与打电话',
              '【优化】[SCRM] 企微客户同步逻辑',
              '【新增】[SCRM] 砍价模块上线',
              '【新增】[数据中台] 增加客户保证金功能',
              '【新增】[订货商城] 增加客户在线保证金、查阅功能',
              '【修复】[ERP开单] 发货报表统计导出包不包含退货问题',
              '【修复】[订货商城] 优化会员中心全局界面等',
            ],
          },
          {
            timestamp: '2022-11-19 00:46:18',
            timestamp1: '版本：V2.0.4',
            content: '【新增】[SCRM] 分销活动链接加密',
            contentList: [
              '【新增】[SCRM] 集字裂变增加虚拟参与数据',
              '【优化】[SCRM] 集字移动端页面优化',
              '【优化】[SCRM] 企微大转盘、公众号大转盘抽奖机制优化',
              '【优化】[SCRM] 企微群红包支持在一个群内发放多次',
              '【优化】[SCRM] 企微红包商付零的发送',
              '【修复】[SCRM] 群发宝客服消息发送小程序异常',
            ],
          },
          {
            timestamp: '2022-10-12 02:35:40',
            timestamp1: '版本：V2.0.3',
            content: '【安全性更新】修复分销漏洞',
            contentList: [
              '【安全性更新】新增上下架和改价需要管理员密码',
              '【安全性更新】暂时关闭分销回调',
            ],
          },
          {
            timestamp: '2022-09-16 05:28:18',
            timestamp1: '版本：V2.0.2',
            content:
              '【全新设计并重构】供应链SCM数据后台全面VUE+Element UI 重构',
            contentList: [
              '由于本次更新内容较多,请联系您的私人专属顾问协助升级',
            ],
          },
          {
            timestamp: '2022-04-22 04:01:06',
            timestamp1: '版本：V2.0.1',
            content: '智多链V2.0 大客户定制版SCM全面上线',
            contentList: [
              '内测版本非市场销售标准版，非定制版大客户，请耐心等待后更新',
            ],
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleChange() {},
      async fetchData() {
        const { data } = await this.api.getAccountDetail()
        if (data.merchant != null) {
          this.inof = data.merchant
        }
        if (this.inof.erp_open == 1) {
          this.erp_openChecked = true
        } else {
          this.erp_openChecked = false
        }
        if (this.inof.design_open == 1) {
          this.design_openChecked = true
        } else {
          this.design_openChecked = false
        }
        if (this.inof.platform_open == 1) {
          this.platform_openChecked = true
        } else {
          this.platform_openChecked = false
        }
        this.serviceList = data.service
      },
      // accountSave
      subSave() {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            const { code } = await this.api.editAdminAccountSave({
              name: this.inof.name, //商户名称
              tel: this.inof.tel, //商户联系方式
              address: this.inof.address, //商户地址
              email: this.inof.email, //邮箱
              invoice: this.inof.invoice, //税号
              bank: this.inof.bank, //开户行
              bank_card: this.inof.bank_card, //银行账号
              bank_name: this.inof.bank_name, //银行开户名
            })
            if (code !== 200) return
            this.$message({
              type: 'success',
              message: '提交成功!',
            })
            this.state = !this.state
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交',
            })
          })
      },
      editForm() {
        this.state = !this.state
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fold-warp ::v-deep .el-collapse-item__content {
    background-color: #f6f8f9;
  }
  ::v-deep .el-collapse {
    border: 0;
  }

  .fold-warp ::v-deep .el-collapse-item__header {
    background-color: #f6f8f9;
    border: 0;
  }
  ::v-deep .el-collapse-item__warp {
    border: 0;
  }
  .Customerservice ::v-deep .el-dialog {
    border-radius: 5px;
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  .customer-img {
    width: 50px;
    height: 50px;
    margin-top: 12px;
    margin-right: 22px;
    margin-left: 12px;
    border-radius: 6px;
  }
  .card-ra {
    border-radius: 6px;
  }
  .card-ra ::v-deep .el-card__header {
    font-size: 16px;
    color: $base-color-blue;
    background-color: #e8f4ff;
  }
</style>
