<template>
  <div class="index-container">
    <el-row :gutter="20">
      <page-header />
      <TextTags :list="textTagList" />
      <el-col :lg="9" :md="18" :sm="24" :xl="9" :xs="24">
        <MembersChart />
      </el-col>
      <el-col :lg="9" :md="18" :sm="24" :xl="9" :xs="24">
        <SalesChart />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <NewCustomer />
      </el-col>
      <el-col :lg="18" :md="24" :sm="24" :xl="18" :xs="24">
        <MemberList />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <UserChart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PageHeader from './components/PageHeader'
  import TextTags from './componentscopy/TextTags'
  import MembersChart from './componentscopy/MembersChart'
  import SalesChart from './componentscopy/SalesChart'
  import NewCustomer from './componentscopy/NewCustomer'
  import MemberList from './componentscopy/MemberList'
  import UserChart from './componentscopy/UserChart'
  // import QyQy from '@/qy/components/QyQy.vue

  export default {
    name: 'Index',
    components: {
      PageHeader,
      TextTags,
      MembersChart,
      SalesChart,
      NewCustomer,
      MemberList,
      UserChart,
      // QyQy,
    },
    data() {
      return {
        textTagList: [
          {
            title: '销售额',
            number: 200,
            num: 94.32,
            type: 1,
            pay: 234,
            money: 3000,
          },
          {
            title: '销售数量',
            number: 200,
            num: 94.32,
            type: 1,
            pay: 234,
            money: 1000,
          },
          {
            title: '客户',
            number: 400,
            num: 34.32,
            type: 2,
            pay: 234,
            money: 2000,
          },
          {
            title: '新增客户',
            number: 400,
            num: 34.32,
            type: 2,
            pay: 234,
            money: 2000,
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    background: $base-color-background !important;

    ::v-deep {
      .access,
      .authorization,
      .version-information {
        min-height: 268px;
      }

      .el-card {
        .el-card__header {
          position: relative;

          .card-header-tag {
            position: absolute;
            top: 15px;
            right: $base-margin;
          }

          > div > span {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }

        .el-card__body {
          position: relative;

          .echarts {
            width: 100%;
            height: 127px;
          }
          .card-footer-tag {
            position: absolute;
            right: $base-margin;
            bottom: 15px;
          }
        }
      }

      .bottom {
        padding-top: 20px;
        margin-top: 5px;
        color: #595959;
        text-align: left;
        border-top: 1px solid $base-border-color;
      }
    }
  }
</style>
