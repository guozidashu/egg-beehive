<template>
  <div style="background-color: #f6f8f9">
    <div style="display: flex; justify-content: space-between">
      <el-card
        class="card-ra"
        shadow="never"
        style="width: 50%; margin-right: 20px"
      >
        <div slot="header">
          <span>公司信息</span>
        </div>
        <!-- <p style="padding-left: 20px">公司名：{{ inof.name1 }}</p>
        <p style="padding-left: 20px">会员类型：{{ inof.type1 }}</p>
        <p style="padding-left: 20px">绑定手机：{{ inof.phone1 }}</p>
        <p style="padding-left: 20px">绑定邮箱：{{ inof.email }}</p> -->
        <!-- <el-divider /> -->
        <el-form
          ref="form"
          label-width="120px"
          :model="inof"
          style="width: 100%; min-height: 500px; padding-left: 20px"
        >
          <div v-if="!state">
            <el-form-item label="商户名称：" style="height: 33px">
              {{ inof.name }}
              <el-button
                v-has-permi="['btn:Account:edit']"
                circle
                icon="el-icon-edit"
                style="float: right"
                type="primary"
                @click="editForm"
              />
            </el-form-item>
            <el-form-item label="商户联系方式：" style="height: 33px">
              {{ inof.tel }}
            </el-form-item>
            <el-form-item label="商户地址：" style="height: 33px">
              {{ inof.address }}
            </el-form-item>
            <el-form-item label="邮箱：" style="height: 33px">
              {{ inof.email }}
            </el-form-item>
            <el-form-item label="税号：" style="height: 33px">
              {{ inof.invoice }}
            </el-form-item>
            <el-form-item label="开户行：" style="height: 33px">
              {{ inof.bank }}
            </el-form-item>
            <el-form-item label="银行账户：" style="height: 33px">
              {{ inof.bank_card }}
            </el-form-item>
            <el-form-item label="银行开户名：" style="height: 33px">
              {{ inof.bank_name }}
            </el-form-item>
          </div>
          <div v-else style="width: 100%">
            <el-form-item label="商户名称：">
              <el-input v-model="inof.name" style="width: 70%" />
              <el-button
                v-has-permi="['btn:Account:edit']"
                circle
                icon="el-icon-edit"
                style="float: right"
                type="primary"
                @click="editForm"
              />
            </el-form-item>
            <el-form-item label="商户联系方式：">
              <el-input v-model="inof.tel" style="width: 70%" />
            </el-form-item>
            <el-form-item label="商户地址：">
              <el-input v-model="inof.address" style="width: 70%" />
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="inof.email" style="width: 70%" />
            </el-form-item>
            <el-form-item label="税号：">
              <el-input v-model="inof.invoice" style="width: 70%" />
            </el-form-item>
            <el-form-item label="开户行：">
              <el-input v-model="inof.bank" style="width: 70%" />
            </el-form-item>
            <el-form-item label="银行账户：">
              <el-input v-model="inof.bank_card" style="width: 70%" />
            </el-form-item>
            <el-form-item label="银行开户名：">
              <el-input v-model="inof.bank_name" style="width: 70%" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="subSave">保存</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
      <el-card class="card-ra" shadow="never" style="width: 50%">
        <div slot="header">
          <span>服务信息</span>
        </div>
        <el-form
          ref="form"
          label-width="20px"
          :model="inof"
          style="width: 100%; padding-left: 20px"
        >
          <!-- <el-form-item v-for="(item, index) in goodsList" :key="index">
            <el-checkbox v-model="item.checked" disabled>
              <span style="color: #606266">{{ item.name }}</span>
              <span v-if="item.checked">
                <span style="color: #606266">
                  服务到期时间： {{ item.time }}
                </span>
                <el-dropdown>
                  <el-badge class="item" value="促销">
                    <el-button type="primary">去续费</el-button>
                  </el-badge>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item1, index1) in item.list"
                      :key="index1"
                    >
                      {{ item1 }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
              <el-button v-else type="primary">购买</el-button>
            </el-checkbox>
          </el-form-item> -->
          <div style="margin: 20px 0">
            <el-checkbox v-model="erp_openChecked" disabled>
              <span style="color: #606266">ERP权限</span>
              <span>
                <span style="margin-right: 10px; color: #606266">
                  服务开通时间： {{ inof.erp_starttime | formatTime }}
                </span>
                <span style="margin-right: 10px; color: #606266">
                  服务到期时间： {{ inof.erp_starttime | formatTime }}
                </span>
                <span style="color: #606266">
                  可使用账号数量： {{ inof.erp_num }}
                </span>
              </span>
            </el-checkbox>
          </div>
          <div style="margin: 20px 0">
            <el-checkbox v-model="design_openChecked" disabled>
              <span style="color: #606266">研发模块</span>
              <span>
                <span style="margin-right: 10px; color: #606266">
                  服务开通时间： {{ inof.design_starttime | formatTime }}
                </span>
                <span style="margin-right: 10px; color: #606266">
                  服务到期时间： {{ inof.design_endtime | formatTime }}
                </span>
                <span style="color: #606266">
                  研发允许账号数量： {{ inof.design_num }}
                </span>
              </span>
            </el-checkbox>
          </div>
          <div style="margin: 20px 0">
            <el-checkbox v-model="platform_openChecked" disabled>
              <span style="color: #606266">中台服务</span>
              <span>
                <span style="margin-right: 10px; color: #606266">
                  服务开通时间： {{ inof.platform_starttime | formatTime }}
                </span>
                <span style="margin-right: 10px; color: #606266">
                  服务到期时间： {{ inof.platform_endtime | formatTime }}
                </span>
                <span style="color: #606266">
                  中台允许最大账号数量： {{ inof.platform_num }}
                </span>
              </span>
            </el-checkbox>
          </div>
        </el-form>
        <!-- <el-divider />
        <AccountProgress :list="progressList" /> -->
      </el-card>
    </div>

    <div style="display: flex; justify-content: space-between">
      <el-card
        class="card-ra"
        shadow="never"
        style="width: 74%; margin-right: 20px"
      >
        <div slot="header">
          <span>版本更新记录</span>
          <el-select v-model="selevt" style="float: right; margin-top: -5px">
            <el-option label="ERP" :value="1" />
            <el-option label="商城" :value="2" />
            <el-option label="中台" :value="3" />
            <el-option label="生产" :value="4" />
          </el-select>
        </div>
        <div style="width: 100%; max-height: calc(56vh); overflow: scroll">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              placement="top"
              :timestamp="activity.timestamp"
            >
              <el-card shadow="hover">
                <p>{{ activity.content }}</p>
                <p>{{ activity.content1 }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
      <el-card class="card-ra" shadow="never" style="width: 26%">
        <div slot="header">
          <span>企业VIP专属客服</span>
        </div>
        <el-card
          v-for="(item, index) in serviceList"
          :key="index"
          :body-style="{ padding: '10px' }"
          shadow="hover"
          style="border-radius: 6px"
        >
          <div style="display: flex">
            <img class="customer-img" :src="avatar" />
            <div>
              <p>{{ item.name }}</p>
              <p>{{ item.remark }}</p>
              <!-- <p>
                Tel：15236804776 微信
                <el-tooltip placement="top">
                  <img slot="content" :src="avatar" style="margin: 10px" />
                  <span style="color: #1890ff">点击查看</span>
                </el-tooltip>
              </p> -->
            </div>
          </div>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import AccountProgress from './components/AccountProgress'
  import { getAccountDetail, editAdminAccountSave } from '@/api/basic'
  export default {
    name: 'Account',
    // components: { AccountProgress },
    data() {
      return {
        erp_openChecked: true,
        design_openChecked: true,
        platform_openChecked: true,
        state: false,
        serviceList: [],
        // goodsList: [
        //   {
        //     name: 'ERP开单系统：',
        //     time: '2023年10月26号',
        //     checked: true,
        //     list: ['买一年送三个月', '买两年送一年'],
        //   },
        //   {
        //     name: '设计师打版系统：',
        //     time: '2023年10月26号',
        //     checked: true,
        //     list: ['买一年送三个月', '买两年送一年'],
        //   },
        //   {
        //     name: '生产成本控制系统：',
        //     time: '2023年10月26号',
        //     checked: true,
        //     list: ['买一年送三个月', '买两年送一年'],
        //   },
        //   {
        //     name: '研发进度中台系统：',
        //     time: '2023年10月26号',
        //     checked: false,
        //     list: ['买一年送三个月', '买两年送一年'],
        //   },
        //   {
        //     name: '数据中台（标准版）：',
        //     time: '2023年10月26号',
        //     checked: false,
        //     list: ['买一年送三个月', '买两年送一年'],
        //   },
        //   {
        //     name: '数据中台（企业版）：',
        //     time: '2023年10月26号',
        //     checked: false,
        //     list: ['买一年送三个月', '买两年送一年'],
        //   },
        // ],
        selevt: 1,
        // progressList: [
        //   {
        //     name: 'ERP',
        //     right: '80%',
        //     error: '20%',
        //     Number: 20,
        //     num: 10,
        //   },
        //   {
        //     name: 'PCM',
        //     right: '60%',
        //     error: '40%',
        //     Number: 20,
        //     num: 10,
        //   },
        //   {
        //     name: 'PDC',
        //     right: '50%',
        //     error: '50%',
        //     Number: 20,
        //     num: 10,
        //   },
        //   {
        //     name: 'SCRM',
        //     right: '30%',
        //     error: '70%',
        //     Number: 20,
        //     num: 10,
        //   },
        //   {
        //     name: 'SCM',
        //     right: '80%',
        //     error: '20%',
        //     num: 10,
        //     Number: 20,
        //   },
        // ],
        inof: {},
        activities: [
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.5',
          },
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.4',
          },
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.3',
          },
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.2',
          },
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.5',
          },
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.4',
          },
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.3',
          },
          {
            content: '版本新增........功能',
            content1: '版本修复........功能',
            timestamp: '2018-04-12 20:46 ERP系统版本：V2.0.2',
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await getAccountDetail()
        this.inof = data.merchant
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
            const { data } = await editAdminAccountSave({
              name: this.inof.name, //商户名称
              tel: this.inof.tel, //商户联系方式
              address: this.inof.address, //商户地址
              email: this.inof.email, //邮箱
              invoice: this.inof.invoice, //税号
              bank: this.inof.bank, //开户行
              bank_card: this.inof.bank_card, //银行账号
              bank_name: this.inof.bank_name, //银行开户名
            })
            console.log(data)
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
