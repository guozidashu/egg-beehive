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
        <p style="padding-left: 20px">公司名：{{ inof.name1 }}</p>
        <p style="padding-left: 20px">会员类型：{{ inof.type1 }}</p>
        <p style="padding-left: 20px">绑定手机：{{ inof.phone1 }}</p>
        <p style="padding-left: 20px">绑定邮箱：{{ inof.email }}</p>
        <el-divider />
        <el-form
          ref="form"
          label-width="80px"
          :model="inof"
          style="width: 100%; min-height: 500px; padding-left: 20px"
        >
          <div v-if="state">
            <el-form-item label="开票信息：" style="height: 33px">
              {{ inof.kaipiao }}
              <vab-icon
                icon="ball-pen-line"
                style="float: right"
                @click="editForm"
              />
            </el-form-item>
            <el-form-item label="企业名称：" style="height: 33px">
              {{ inof.name }}
            </el-form-item>
            <el-form-item label="公司税号：" style="height: 33px">
              {{ inof.shuihao }}
            </el-form-item>
            <el-form-item label="注册地址：" style="height: 33px">
              {{ inof.address }}
            </el-form-item>
            <el-form-item label="联系电话：" style="height: 33px">
              {{ inof.phone }}
            </el-form-item>
            <el-form-item label="开户银行：" style="height: 33px">
              {{ inof.yinhang }}
            </el-form-item>
            <el-form-item label="银行账户：" style="height: 33px">
              {{ inof.zhanghu }}
            </el-form-item>
            <el-form-item label="电子邮箱：" style="height: 33px">
              {{ inof.youxiang }}
            </el-form-item>
            <el-form-item label="发票类型：" style="height: 33px">
              {{ inof.type }}
            </el-form-item>
          </div>
          <div v-else style="width: 100%">
            <el-form-item label="开票信息：">
              <el-input v-model="inof.kaipiao" style="width: 70%" />
              <vab-icon
                icon="ball-pen-line"
                style="float: right"
                @click="editForm"
              />
            </el-form-item>
            <el-form-item label="企业名称：">
              <el-input v-model="inof.name" style="width: 70%" />
            </el-form-item>
            <el-form-item label="公司税号：">
              <el-input v-model="inof.shuihao" style="width: 70%" />
            </el-form-item>
            <el-form-item label="注册地址：">
              <el-input v-model="inof.address" style="width: 70%" />
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input v-model="inof.phone" style="width: 70%" />
            </el-form-item>
            <el-form-item label="开户银行：">
              <el-input v-model="inof.yinhang" style="width: 70%" />
            </el-form-item>
            <el-form-item label="银行账户：">
              <el-input v-model="inof.zhanghu" style="width: 70%" />
            </el-form-item>
            <el-form-item label="电子邮箱：">
              <el-input v-model="inof.youxiang" style="width: 70%" />
            </el-form-item>
            <el-form-item label="发票类型：">
              <el-select v-model="inof.type">
                <el-option label="电子发票" :value="'电子发票'" />
                <el-option label="纸质发票" :value="'纸质发票'" />
              </el-select>
            </el-form-item>
            <el-form-item label="发票类型：">
              <el-button type="primary">保存</el-button>
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
          <el-form-item v-for="(item, index) in goodsList" :key="index">
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
          </el-form-item>
        </el-form>
        <el-divider />
        <AccountProgress :list="progressList" />
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
          v-for="o in 3"
          :key="o"
          :body-style="{ padding: '10px' }"
          shadow="hover"
          style="border-radius: 6px"
        >
          <div style="display: flex">
            <img class="customer-img" :src="avatar" />
            <div>
              <p>楚芝馨（售后）</p>
              <p>
                Tel：15236804776 微信
                <el-tooltip placement="top">
                  <img slot="content" :src="avatar" style="margin: 10px" />
                  <span style="color: #1890ff">点击查看</span>
                </el-tooltip>
              </p>
            </div>
          </div>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AccountProgress from './components/AccountProgress'
  export default {
    name: 'Account',
    components: { AccountProgress },
    data() {
      return {
        state: false,
        goodsList: [
          {
            name: 'ERP开单系统：',
            time: '2023年10月26号',
            checked: true,
            list: ['买一年送三个月', '买两年送一年'],
          },
          {
            name: '设计师打版系统：',
            time: '2023年10月26号',
            checked: true,
            list: ['买一年送三个月', '买两年送一年'],
          },
          {
            name: '生产成本控制系统：',
            time: '2023年10月26号',
            checked: true,
            list: ['买一年送三个月', '买两年送一年'],
          },
          {
            name: '研发进度中台系统：',
            time: '2023年10月26号',
            checked: false,
            list: ['买一年送三个月', '买两年送一年'],
          },
          {
            name: '数据中台（标准版）：',
            time: '2023年10月26号',
            checked: false,
            list: ['买一年送三个月', '买两年送一年'],
          },
          {
            name: '数据中台（企业版）：',
            time: '2023年10月26号',
            checked: false,
            list: ['买一年送三个月', '买两年送一年'],
          },
        ],
        selevt: 1,
        ceshi: '80%',
        progressList: [
          {
            name: 'ERP',
            right: '80%',
            error: '20%',
            Number: 20,
            num: 10,
          },
          {
            name: 'PCM',
            right: '60%',
            error: '40%',
            Number: 20,
            num: 10,
          },
          {
            name: 'PDC',
            right: '50%',
            error: '50%',
            Number: 20,
            num: 10,
          },
          {
            name: 'SCRM',
            right: '30%',
            error: '70%',
            Number: 20,
            num: 10,
          },
          {
            name: 'SCM',
            right: '80%',
            error: '20%',
            num: 10,
            Number: 20,
          },
        ],
        inof: {
          name1: '圈域科技有限公司',
          type1: '钻石客户',
          phone1: '13460193682',
          email: '2547894967qq.com',
          kaipiao: '出差',
          name: '圈域科技有限公司',
          shuihao: '456613234555',
          address: '杭州市余杭区海创大厦',
          phone: '15236804776',
          yinhang: '杭州滨江支行',
          zhanghu: '64565465465666',
          type: '电子发票',
          youxiang: '2547894967qq.com',
        },
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
    created() {},
    methods: {
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
