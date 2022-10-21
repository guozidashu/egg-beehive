<template>
  <el-card class="authorization" shadow="never">
    <template #header>
      <sapn
        style="margin-top: 0px; font-size: 20px; font-weight: 600; color: black"
      >
        <vab-icon icon="bar-chart-2-line" />
        渠道分析
      </sapn>
    </template>
    <el-row :gutter="20">
      <el-col
        :lg="12"
        :md="18"
        :sm="24"
        style="padding: 20px; border-right: 1px solid #dcdfe6"
        :xl="12"
        :xs="24"
      >
        <div style="position: relative; padding-bottom: 20px">
          <vab-icon icon="bar-chart-2-line" />
          <span style="font-size: 16px; font-weight: 600; color: black">
            今日渠道分析
          </span>
          <el-radio-group
            v-model="time"
            style="position: absolute; top: -5px; right: 0px"
          >
            <el-radio-button label="销售金额" />
            <el-radio-button label="销售件数" />
          </el-radio-group>
        </div>
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in textData"
            :key="index"
            :lg="12"
            :md="18"
            :sm="24"
            :xl="12"
            :xs="24"
          >
            <div
              :class="[item.type == 1 ? 'activeClass' : 'errorClass']"
              @click.prevent="handleChange(index)"
            >
              <p>
                <vab-icon
                  icon="bar-chart-box-fill"
                  style="font-size: 18px; color: #007aff"
                />
                {{ item.title }}
                <vab-icon icon="album-line" style="font-size: 14px" />
              </p>
              <p style="font-size: 16px; font-weight: 600; color: black">
                {{ item.num }} |
                <span style="color: gray">{{ item.number }}%</span>
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="12" :md="18" :sm="24" :xl="12" :xs="24">
            <Branch :list="branchList" :style-chart="styleObj" />
          </el-col>
          <el-col
            :lg="12"
            :md="18"
            :sm="24"
            style="padding: 20px 10px"
            :xl="12"
            :xs="24"
          >
            <List
              :list="goosList"
              :list-height="listHeight"
              :list-type="listType"
              :state="listLoading"
            >
              <template #List>
                <el-table-column label="渠道名称" prop="store_name" />
                <el-table-column label="销售金额" prop="visit" />
                <el-table-column label="占比" prop="cart" />
              </template>
            </List>
          </el-col>
        </el-row>
      </el-col>
      <el-col
        :lg="12"
        :md="18"
        :sm="24"
        style="width: 50%; padding: 5px 20px"
        :xl="12"
        :xs="24"
      >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="今日客户排行" name="first" />
          <el-tab-pane label="今日第三方排行" name="second" />
        </el-tabs>
        <List
          :list="goosList"
          :list-height="listHeightkh"
          :list-type="listType"
          :state="listLoading"
        >
          <template #List>
            <el-table-column
              align="center"
              label="排名"
              type="index"
              width="80"
            />
            <el-table-column label="客户名称" prop="name" />
            <el-table-column label="拿货金额（占比）" prop="cart">
              <template #default="{ row }">
                {{ row.visit }}（{{ row.cart }}）
              </template>
            </el-table-column>
            <el-table-column label="拿货件数" prop="num" />
            <el-table-column align="center" label="操作" width="100">
              <template #default="{ row }">
                <el-button type="text" @click="handleDetail(row)">
                  详情
                </el-button>
              </template>
            </el-table-column>
          </template>
        </List>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import Branch from '@/subview/components/Branch'
  import List from '@/subview/components/List'
  export default {
    components: { Branch, List },
    data() {
      return {
        activeName: 'first',
        time: '销售金额',
        listLoading: false,
        listType: 5,
        listHeight: 370,
        listHeightkh: 520,
        textData: [
          {
            title: '自营店铺',
            num: '￥1200',
            type: 1,
            number: 100,
          },
          {
            title: '第三方渠道',
            num: '￥100',
            type: 2,
            number: 10,
          },
        ],
        styleObj: {
          width: '100%',
          height: '300px',
          legendx: 60,
          legendy: 20,
          center: ['50%', '60%'],
        },
        branchList: [
          { value: 1048, name: '小红书' },
          { value: 735, name: '自有商城' },
          { value: 580, name: 'ERP' },
        ],
        goosList: [
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name: '小程序',
            name: '张三',
            num: '100',
          },
        ],
      }
    },
    methods: {
      handleClick(tab) {
        console.log(1111, tab.label)
      },
      handleChange(index) {
        if (index === 0) {
          this.textData[index].type = this.textData[index].type === 1 ? 2 : 1
          this.textData[index + 1].type =
            this.textData[index + 1].type === 1 ? 2 : 1
        } else {
          this.textData[index].type = this.textData[index].type === 1 ? 2 : 1
          this.textData[index - 1].type =
            this.textData[index - 1].type === 1 ? 2 : 1
        }
      },
      // 列表数据封装函数
    },
  }
</script>
<style lang="scss" scoped>
  .activeClass {
    padding: 0 20px;
    background-color: #f0f5fe;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
  .errorClass {
    padding: 0 20px;
    background-color: white;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
</style>
