<template>
  <div style="width: 100%">
    <div style="padding: 20px; font-size: 26px">
      <span>合作客户</span>
      <span style="margin-left: 20px">合作渠道</span>
    </div>
    <div style="padding: 20px; border-bottom: 20px solid #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-top: 10px">
            合作客户数
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">测试</div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -2px; font-size: 14px"
              />
            </el-popover>
          </div>
          <div style="display: flex; margin-top: 50px">
            <div style="font-size: 32px">16</div>
            <div style="margin-top: 15px; margin-left: 10px">位</div>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="margin-top: 10px">监控热销客户</div>
          <div style="display: flex; margin-top: 20px">
            <div style="display: flex; width: 33%">
              <el-image src="row.img" style="width: 80px; height: 80px" />
              <div style="margin-left: 10px">
                <div style="margin: 5px 0 0 0">吉林王平</div>
                <div style="margin: 10px 0 0 0; color: gray">
                  普通会员|零售店
                </div>
                <div style="margin: 10px 0 0 0; color: gray">
                  加入时间:2020-02-02 12:12:12
                </div>
              </div>
            </div>
            <div style="display: flex; width: 33%">
              <el-image src="row.img" style="width: 80px; height: 80px" />
              <div style="margin-left: 10px">
                <div
                  style="
                    width: 150px;
                    margin: 5px 0 0 0;
                    overflow: hidden;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  心优选空间站团购das;ldjkasl;djlskdl
                </div>
                <div style="margin: 10px 0 0 0; color: gray">粉丝数 13213</div>
                <div style="margin: 10px 0 0 0; color: gray">
                  合作直播数量 2
                </div>
              </div>
            </div>
            <div style="display: flex; width: 33%">
              <el-image src="row.img" style="width: 80px; height: 80px" />
              <div style="margin-left: 10px">
                <div
                  style="
                    width: 150px;
                    margin: 5px 0 0 0;
                    overflow: hidden;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  心优选空间站团购das;ldjkasl;djlskdl
                </div>
                <div style="margin: 10px 0 0 0; color: gray">粉丝数 13213</div>
                <div style="margin: 10px 0 0 0; color: gray">
                  合作直播数量 2
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        border: 1px solid #f6f8f9;
      "
    >
      <div style="margin-top: 10px">合作客户列表</div>
      <el-date-picker
        v-model="goodsForm1.time"
        align="right"
        :clearable="false"
        :default-time="['00:00:00', '23:59:59']"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        style="margin-left: 10px"
        type="daterange"
        unlink-panels
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin-left: 20px;
      "
    >
      <div style="display: flex">
        <QYPopover
          v-model="goodsForm1.brand"
          :list="selectList.brand"
          :name="'销售渠道'"
        />
        <QYPopover
          v-model="goodsForm1.year"
          :list="selectList.year"
          :name="'带货风格'"
        />
        <div style="padding: 8px">最新合作</div>
        <div style="padding: 8px">拿货排行</div>
      </div>
      <div>
        <el-input
          v-model="goodsForm1.name"
          placeholder="请输入商品名称/款号"
          style="width: 215px"
        />
        <el-button
          size="small"
          style="margin-left: 10px"
          type="primary"
          @click="resetForm1('goodsForm1')"
        >
          重置
        </el-button>
      </div>
    </div>
    <div style="padding: 0 20px 20px 20px">
      <QYList
        :list="goosList"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column label="客户信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image :src="row.img" style="width: 80px; height: 80px" />
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="margin: 10px 0 0 0">杭州测试</div>
                  <div style="margin: 10px 0 0 0; color: gray">普通会员</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="拿货次数"
            prop="count_customer"
          />
          <el-table-column align="center" label="拿货件数" prop="sum_num" />
          <el-table-column align="center" label="拿货金额" prop="sum_total" />
          <el-table-column align="center" label="加入时间" prop="sum_profit" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="150"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                监控客户
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        selectList: [],
        // 列表加载状态、列表组件的类型、列表数据、列表总数、表单查询条件、页数、条数
        listLoading: false,
        listType: 1,
        goosList: [],
        total: 0,
        formTemp: null,
        page: 1,
        pageSize: 10,
        goodsForm1: {
          time: this.getPastTime(30),
          page: 1,
          pageSize: 10,
          goods_type: 1,
          year: null,
          type: null,
          brand: null,
          band: null,
          sn: null,
          order: 'sum_num',
          season: null,
          category: null,
          gender: null,
          agegroup: null,
          recommend: null,
          price: null,
          status: null,
          sort: 'desc',
          is_return: false,
        },
      }
    },
    watch: {
      // 监听表格查询条件
      goodsForm1: {
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
          this.getTableList()
          this.pageState = false
        },
        deep: true,
        // 初次监听
        immediate: true,
      },
    },
    created() {
      this.getTypeList()
      this.getTableList()
    },
    methods: {
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year,band,category,agegroup,size',
        })
        this.selectList = data
        this.selectList.price = [
          {
            name: '不限',
            start: 0,
            end: 0,
          },
          {
            name: '￥50以下',
            start: 0,
            end: 50,
          },
          {
            name: '￥50-100',
            start: 50,
            end: 100,
          },
          {
            name: '￥100-200',
            start: 100,
            end: 200,
          },
          {
            name: '￥200-300',
            start: 200,
            end: 300,
          },
          {
            name: '￥300元以上',
            start: 300,
            end: 0,
          },
        ]
        this.selectList.gender = [
          {
            name: '女',
            id: 1,
          },
          {
            name: '男',
            id: 2,
          },
          {
            name: '中',
            id: 3,
          },
        ]
        this.selectList.status = [
          {
            name: '停售',
            id: 2,
          },
          {
            name: '在售',
            id: 1,
          },
        ]
        this.selectList.recommend = [
          {
            name: '取消推荐',
            id: 0,
          },
          {
            name: '推荐中',
            id: 1,
          },
        ]
        this.selectList.type = [
          {
            name: '整手',
            id: 0,
          },
          {
            name: '散码',
            id: 1,
          },
        ]
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.goodsForm1.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.goodsForm1.pageSize = data
      },
      // 获取列表数据
      async getTableList() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
        }
        let temp = JSON.parse(JSON.stringify(this.formTemp))
        const { data } = await this.api.getGoodsRank(temp)
        this.goosList = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
