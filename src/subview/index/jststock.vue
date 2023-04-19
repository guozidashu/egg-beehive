<template>
  <div style="background-color: #f5f7f8">
    <div
      style="
        padding: 20px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 顶部卡片和折线图 -->
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 18px; font-weight: 600">
          全渠道概况
          <span style="font-size: 12px; font-weight: 400; color: #515a6e">
            更新时间：{{ time }}(因为数据量巨大,所以每天零点更新)
          </span>
        </span>

        <div>
          <el-radio-group v-model="chartTime">
            <el-radio-button label="昨天" />
            <el-radio-button label="近7天" />
            <el-radio-button label="近30天" />
          </el-radio-group>
        </div>
      </el-form>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in cardList" :key="index" :span="4">
          <div
            :style="{
              border: item.checked ? '1px solid #D4E0FC' : '1px solid #F3F5F8',
              borderRadius: '5px',
              padding: '10px',
              background: item.checked ? '#F0F5FE' : '#fff',
              marginBottom: '20px',
            }"
            @click="channelBtnClick(1, index)"
          >
            <div style="font-size: 12px">
              <vab-icon icon="line-chart-line" />
              {{ item.title }}
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">{{ item.content }}</div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: 0; font-size: 14px"
                />
              </el-popover>
            </div>
            <div
              style="
                padding: 10px 0;
                font-size: 24px;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.85);
              "
            >
              <span v-if="item.type == 1">
                ￥{{ item.total | moneyFormat }}
              </span>
              <span v-else>{{ item.total }}</span>
            </div>
            <div style="font-size: 12px; color: rgba(0, 0, 0, 0.85)">
              聚水潭
              <span v-if="item.type == 1">￥{{ item.jst | moneyFormat }}</span>
              <span v-else>{{ item.jst }}</span>
            </div>
            <div
              style="
                margin-top: 10px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.85);
              "
            >
              自主渠道
              <span v-if="item.type == 1">￥{{ item.erp | moneyFormat }}</span>
              <span v-else>{{ item.erp }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 折线图 -->
      <div style="margin-top: 20px">
        <MembersChart
          v-if="cardListChecked != 11"
          :data="chartList"
          style="background-color: white"
        />
        <div v-else style="height: 300px; text-align: center">
          该数据没有图标展示
        </div>
      </div>
    </div>
    <!-- 渠道分析 -->
    <div style="padding: 20px; background-color: #ffffff; border-radius: 5px">
      <p style="margin-top: 10px; font-size: 18px; font-weight: 600">
        渠道分析
      </p>
      <el-row>
        <el-col :span="12">
          <div style="padding-right: 20px; border-right: 1px solid #f3f5f8">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div style="margin-top: 5px; font-size: 16px; font-weight: 600">
                <span v-if="channelBtnIndex == 0">
                  ￥{{ channelBtnValue | moneyFormat }}
                </span>
                <span v-if="channelBtnIndex == 1">
                  {{ channelBtnValue }}
                </span>
                <span v-if="channelBtnIndex == 2">
                  {{ channelBtnValue }}
                </span>
              </div>
              <div style="display: flex">
                <div
                  v-for="(item, index) in channelBtnList"
                  :key="index"
                  :style="{
                    padding: '5px 10px',
                    marginRight: '10px',
                    color: item.checked ? '#4B85FF' : '',
                    backgroundColor: item.checked ? '#F7F8FA' : '#F0F5FF',
                    border: item.checked
                      ? '1px solid #D4E0FC'
                      : '1px solid #F3F5F8',
                    borderRadius: '5px',
                  }"
                  @click="channelBtnClick(2, index)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <el-row :gutter="20">
              <el-col
                v-for="(item, index) in channelCardList"
                :key="index"
                :span="12"
              >
                <div
                  :style="{
                    border: item.checked
                      ? '1px solid #D4E0FC'
                      : '1px solid #F3F5F8',
                    borderRadius: '5px',
                    padding: '10px',
                    background: item.checked ? '#F0F5FE' : '#fff',
                  }"
                  @click="channelBtnClick(3, index)"
                >
                  <div style="font-size: 12px">
                    <vab-icon icon="line-chart-line" />
                    {{ item.title }}
                    <el-popover placement="right" trigger="hover">
                      <div style="font-size: 12px">{{ item.content }}</div>
                      <vab-icon
                        slot="reference"
                        icon="question-line"
                        style="position: relative; top: 0; font-size: 14px"
                      />
                    </el-popover>
                  </div>
                  <div
                    style="
                      padding: 10px 0;
                      font-size: 24px;
                      font-weight: 400;
                      color: rgba(0, 0, 0, 0.85);
                    "
                  >
                    <span v-if="item.type == 1">
                      ￥{{ item.num | moneyFormat }}
                    </span>
                    <span v-else>{{ item.num }}</span>
                    <span style="margin-top: -20px; font-size: 16px">|</span>
                    <span style="color: #4e5788">
                      {{ item.percent }}
                    </span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="12">
                <QYBranch
                  :list="branSonChList"
                  :style-chart="branSonChStyleObj"
                />
              </el-col>
              <el-col :span="12">
                <QYList
                  :list="channelList"
                  :list-type="2"
                  :state="channellistLoading"
                  style="height: 450px; overflow: auto"
                >
                  <template #List>
                    <el-table-column
                      align="center"
                      label="排行"
                      type="index"
                      width="60"
                    >
                      <template slot-scope="scope">
                        <span
                          class="index_common"
                          :class="[
                            scope.$index + 1 == '1'
                              ? 'index_one'
                              : scope.$index + 1 == '2'
                              ? 'index_two'
                              : scope.$index + 1 == '3'
                              ? 'index_three'
                              : 'index_more',
                          ]"
                        >
                          {{ scope.$index + 1 }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="平台名称" prop="shop_name" />
                    <el-table-column
                      v-if="channelBtnIndex == 0"
                      label="销售金额"
                      prop="order_total"
                    />
                    <el-table-column
                      v-if="channelBtnIndex == 1"
                      label="销售订单数"
                      prop="order_total"
                    />
                    <el-table-column
                      v-if="channelBtnIndex == 2"
                      label="销售件数"
                      prop="order_total"
                    />
                    <el-table-column label="占比" prop="rate" />
                  </template>
                </QYList>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="padding-left: 20px">
            <el-tabs v-model="rankType" @tab-click="handleRankTypeChange">
              <el-tab-pane label="店铺销售排行" name="1" />
              <el-tab-pane label="自主分销商排行" name="2" />
            </el-tabs>
            <QYList
              :list="goosList"
              :list-type="2"
              :state="listLoading"
              style="height: 450px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="排行"
                  type="index"
                  width="60"
                >
                  <template slot-scope="scope">
                    <span
                      class="index_common"
                      :class="[
                        scope.$index + 1 == '1'
                          ? 'index_one'
                          : scope.$index + 1 == '2'
                          ? 'index_two'
                          : scope.$index + 1 == '3'
                          ? 'index_three'
                          : 'index_more',
                      ]"
                    >
                      {{ scope.$index + 1 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="rankType == 1"
                  label="平台店铺"
                  prop="shop_name"
                />
                <el-table-column
                  v-if="rankType == 2"
                  label="销售商"
                  prop="shop_name"
                />
                <el-table-column label="销售金额" prop="order_total" />
                <el-table-column label="销售订单数" prop="order_count" />
                <el-table-column label="销售件数" prop="order_num" />
              </template>
            </QYList>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 商品分析 库存预警 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <div style="padding: 20px; background-color: #ffffff">
          <p style="margin-top: 10px; font-size: 18px; font-weight: 600">
            爆款分析
          </p>
          <QYList
            :list="goodsAnalysisList"
            :list-type="1"
            :state="goodslistLoading"
            style="height: 700px; overflow: auto"
            :total="goodsAnalysisTotal"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
          >
            <template #List>
              <el-table-column
                align="center"
                label="排行"
                type="index"
                width="60"
              >
                <template slot-scope="scope">
                  <span
                    v-if="goodsAnalysisForm.page == 1"
                    class="index_common"
                    :class="[
                      scope.$index + 1 == '1'
                        ? 'index_one'
                        : scope.$index + 1 == '2'
                        ? 'index_two'
                        : scope.$index + 1 == '3'
                        ? 'index_three'
                        : 'index_more',
                    ]"
                  >
                    {{ scope.$index + 1 }}
                  </span>
                  <span v-else class="index_more index_common">
                    {{ 10 * (goodsAnalysisForm.page - 1) + scope.$index + 1 }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="款式&名称&图片" prop="sn">
                <template #default="{ row }">
                  <el-image :src="row.img" style="width: 50px; height: 50px">
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <p style="margin: 5px 0">{{ row.sn }}</p>
                  <p style="margin: 5px 0">{{ row.name }}</p>
                </template>
              </el-table-column>
              <el-table-column label="销售件数" prop="num">
                <template #default="{ row }">
                  <div style="margin: 5px 0; font-size: 14px; font-weight: 600">
                    {{ row.sale_num.all }}
                  </div>
                  <div style="margin: 5px 0">聚水潭 {{ row.sale_num.jst }}</div>
                  <div style="margin: 5px 0">
                    自主渠道 {{ row.sale_num.erp }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="销售金额" prop="outage_rate">
                <template #default="{ row }">
                  <div style="margin: 5px 0; font-size: 14px; font-weight: 600">
                    ￥{{ row.sale_price.all | moneyFormat }}
                  </div>
                  <div style="margin: 5px 0">
                    聚水潭 ￥{{ row.sale_price.jst | moneyFormat }}
                  </div>
                  <div style="margin: 5px 0">
                    自主渠道 ￥{{ row.sale_price.erp | moneyFormat }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="占比" prop="outage_rate">
                <template #default="{ row }">
                  <div style="margin: 5px 0; font-size: 14px; font-weight: 600">
                    {{ row.proportion.all }}
                  </div>
                  <div style="margin: 5px 0">
                    聚水潭 {{ row.proportion.jst }}
                  </div>
                  <div style="margin: 5px 0">
                    自主渠道 {{ row.proportion.erp }}
                  </div>
                </template>
              </el-table-column>
            </template>
          </QYList>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 20px; background-color: #ffffff">
          <P style="margin-top: 10px; font-size: 18px; font-weight: 600">
            库存预警
          </P>
          <QYList
            :list="stockAnalysisList"
            :list-type="1"
            :state="stocklistLoading"
            style="height: 700px; overflow: auto"
            :total="stockAnalysisTotal"
            @changePage="changeBtnPageStock"
            @changePageSize="changeBtnPageSizeStock"
          >
            <template #List>
              <el-table-column
                align="center"
                label="排行"
                type="index"
                width="60"
              >
                <template slot-scope="scope">
                  <span
                    v-if="stockAnalysisForm.page == 1"
                    class="index_common"
                    :class="[
                      scope.$index + 1 == '1'
                        ? 'index_one'
                        : scope.$index + 1 == '2'
                        ? 'index_two'
                        : scope.$index + 1 == '3'
                        ? 'index_three'
                        : 'index_more',
                    ]"
                  >
                    {{ scope.$index + 1 }}
                  </span>
                  <span v-else class="index_more index_common">
                    {{ 10 * (stockAnalysisForm.page - 1) + scope.$index + 1 }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="款式&名称&图片" prop="sn">
                <template #default="{ row }">
                  <el-image :src="row.img" style="width: 50px; height: 50px">
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <p style="margin: 5px 0">{{ row.sn }}</p>
                  <p style="margin: 5px 0">{{ row.name }}</p>
                </template>
              </el-table-column>
              <el-table-column label="库存数" prop="num">
                <template #default="{ row }">
                  <div style="margin: 5px 0; font-size: 14px; font-weight: 600">
                    {{ row.stock_num.all }}
                  </div>
                  <div style="margin: 5px 0">
                    聚水潭 {{ row.stock_num.jst }}
                  </div>
                  <div style="margin: 5px 0">
                    自主渠道 {{ row.stock_num.erp }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="库存金额" prop="outage_rate">
                <template #default="{ row }">
                  <div style="margin: 5px 0; font-size: 14px; font-weight: 600">
                    ￥{{ row.stock_price.all | moneyFormat }}
                  </div>
                  <div style="margin: 5px 0">
                    聚水潭 ￥{{ row.stock_price.jst | moneyFormat }}
                  </div>
                  <div style="margin: 5px 0">
                    自主渠道 ￥{{ row.stock_price.erp | moneyFormat }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="占比" prop="outage_rate">
                <template #default="{ row }">
                  <div style="margin: 5px 0; font-size: 14px; font-weight: 600">
                    {{ row.stock_ratio.all }}
                  </div>
                  <div style="margin: 5px 0">
                    聚水潭 {{ row.stock_ratio.jst }}
                  </div>
                  <div style="margin: 5px 0">
                    自主渠道 {{ row.stock_ratio.erp }}
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="上架日期" prop="upper_time" /> -->
            </template>
          </QYList>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import MembersChart from '@/subview/components/Chart/MembersChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: {
      MembersChart,
    },
    mixins: [datajosn],
    data() {
      return {
        // 更新时间
        time: this.getJSTUpdateTime(),
        // 顶部数据
        cardList: [
          {
            title: '总销售金额',
            content:
              '在选定条件下，所有成功提交订单的实际应付汇总金额+聚水潭销售数据',
            type: 1,
            total: 0,
            jst: 0,
            erp: 0,
            checked: true,
          },
          {
            title: '总销售件数',
            content: '在选定条件下，所有成功提交订单的实际件数+聚水潭销售数据',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '总销售订单数',
            content:
              '在选定条件下，所有成功提交订单的实际订单数+聚水潭销售数据',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '总发货件数',
            content:
              '在选定条件下，所有成功提交发货单的发货件数+聚水潭销售数据',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '总发货金额',
            content:
              '在选定条件下，所有成功提交发货单的发货金额+聚水潭销售数据',
            type: 1,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '总退货件数',
            content:
              '在选定条件下，所有成功提交退货单的实际件数+聚水潭销售数据',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '总退货金额',
            content:
              '在选定条件下，所有成功提交退货单的实际金额+聚水潭销售数据',
            type: 1,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '铺货店铺数',
            content: '自主渠道客户数+聚水潭店铺数',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '商品款式总数',
            content: '累计创建的商品款式总数（不包含停售商品）',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '动销商品数',
            content: '在选定条件下，有过销售的商品数（自主渠道+聚水潭）',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '商品动销率',
            content: '在选定条件下，商品动销率=（动销商品数 ÷ 商品数）* 100%',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
          {
            title: '库存预警',
            content:
              '刷新时间截止时，符合商品现货库存小于设定值条件时的预警数据',
            type: 2,
            total: 0,
            jst: 0,
            erp: 0,
            checked: false,
          },
        ],
        // 顶部卡片选中索引
        cardListChecked: 1,
        // 图表 时间查询条件
        chartTime: '昨天',
        // 图表 表单查询条件
        form: {
          time: this.getYesterdayTime(),
        },
        // 图表 x轴数据
        dateList: [],
        // 图表 series 数据
        dataAllList: {
          total: [],
          jst: [],
          erp: [],
        },
        // 图表 配置数据
        chartList: {
          height: '300px',
          color: ['#1890FF'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
          legend: {
            data: ['', '聚水潭', '自主渠道'],
          },
          yAxis: [
            {
              type: 'value',
              name: '数量',
            },
          ],
          series: [
            {
              name: '',
              type: 'line',
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#1890FF',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '聚水潭',
              type: 'line',
              smooth: true,
              data: [],
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#FFC833',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '自主渠道',
              type: 'line',
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3BDFDF',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#3BDFDF',
              },
            },
          ],
        },
        // 渠道分析 店铺 分销商排行公用列表数据
        goosList: [],
        listLoading: false,
        rankType: '1', // 店铺分销切换
        // 渠道分析 列表数据
        channellistLoading: false,
        channelList: [],
        // 渠道分析 btn数据
        channelBtnList: [
          {
            name: '销售金额',
            type: 1,
            checked: true,
          },
          {
            name: '销售订单数',
            type: 2,
            checked: false,
          },
          {
            name: '销售件数',
            type: 3,
            checked: false,
          },
        ],
        // 渠道分析 选中btn
        channelBtnIndex: 0,
        // 渠道分析 选中btn的值
        channelBtnValue: 0,
        // 渠道分析 自主和聚水潭卡片数据
        channelCardIndex: 0,
        channelCardList: [
          {
            title: '聚水潭云仓',
            content: '聚水潭云仓销售金额/订单数/件数',
            type: 1,
            num: 0,
            percent: '0%',
            checked: true,
          },
          {
            title: '自主渠道',
            content: '自主渠道销售金额/订单数/件数',
            type: 1,
            num: 0,
            percent: '0%',
            checked: false,
          },
        ],
        // 渠道分析 饼图图表数据
        branSonChList: [],
        // 渠道分析 饼图图表样式
        branSonChStyleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        // 爆款分析 查询条件，列表数据，加载状态，总数
        goodsAnalysisForm: {
          page: 1,
          pageSize: 10,
        },
        goodsAnalysisList: [],
        goodslistLoading: false,
        goodsAnalysisTotal: 0,
        // 库存预警分析 查询条件，列表数据，加载状态，总数
        stockAnalysisForm: {
          page: 1,
          pageSize: 10,
        },
        stockAnalysisList: [],
        stocklistLoading: false,
        stockAnalysisTotal: 0,
      }
    },
    watch: {
      // 折线图时间切换
      chartTime: {
        handler: function (newval) {
          if (newval == '昨天') {
            this.form.time = this.getYesterdayTime()
          } else if (newval == '近7天') {
            this.form.time = this.getWeenTime()
          } else if (newval == '近30天') {
            this.form.time = this.getPastTime(29)
          }
          this.dateList = []
          this.dataAllList = {
            total: [],
            jst: [],
            erp: [],
          }
          this.getHeadList()
          this.getHomeReport()
        },
        deep: true,
      },
      // 店铺分销切换
      rankType: {
        handler: function () {
          this.getJstSaleRank()
        },
        deep: true,
      },
      // 爆款分析 表单监听
      goodsAnalysisForm: {
        handler: function () {
          this.getJstGoodslist()
        },
        deep: true,
      },
      // 库存预警 表单监听
      stockAnalysisForm: {
        handler: function () {
          this.getJstStocklist()
        },
        deep: true,
      },
      // 渠道分析 btn 监听
      channelBtnIndex: {
        handler: function () {
          this.branSonChList = []
          this.getJstChannel()
        },
        deep: true,
      },
      // 渠道分析 自主和聚水潭 监听
      channelCardIndex: {
        handler: function () {
          this.branSonChList = []
          this.getJstChannel()
        },
        deep: true,
      },
    },
    created() {
      this.getHeadList()
      this.getHomeReport()
      this.getJstChannel()
      this.getJstSaleRank()
      this.getJstGoodslist()
      this.getJstStocklist()
    },
    mounted() {},
    methods: {
      // 库存预警 页数条数改变
      changeBtnPageStock(data) {
        this.stockAnalysisForm.page = data
      },
      changeBtnPageSizeStock(data) {
        this.stockAnalysisForm.pageSize = data
      },
      // 爆品分析 页数条数改变
      changeBtnPage(data) {
        this.goodsAnalysisForm.page = data
      },
      changeBtnPageSize(data) {
        this.goodsAnalysisForm.pageSize = data
      },
      // 获取库存预警数据
      async getJstStocklist() {
        this.stocklistLoading = true
        const { data } = await this.api.getInformationStockWarning(
          this.stockAnalysisForm
        )
        this.stockAnalysisList = data.list
        this.stockAnalysisTotal = data.count
        this.stocklistLoading = false
      },
      // 获取爆款分析数据
      async getJstGoodslist() {
        this.goodslistLoading = true
        const { data } = await this.api.getInformationGoodsAnalysis(
          this.goodsAnalysisForm
        )
        this.goodsAnalysisList = data.list
        this.goodsAnalysisTotal = data.count
        this.goodslistLoading = false
      },
      // 获取头部卡片数据
      async getHeadList() {
        const { data } = await this.api.getInformationJstList({
          time: this.form.time,
        })
        data.forEach((item, index) => {
          this.cardList[index].total = item.total
          this.cardList[index].jst = item.jst
          this.cardList[index].erp = item.erp
        })
      },
      // 切换点击事件 type 1.顶部卡片 2.渠道分析 btn 3.渠道分析 聚水潭和自主
      channelBtnClick(type, index) {
        if (type == 1) {
          this.cardList.forEach((item) => {
            item.checked = false
          })
          this.cardList[index].checked = true
          this.cardListChecked = index + 1
          this.dateList = []
          this.dataAllList = {
            total: [],
            jst: [],
            erp: [],
          }
          this.getHomeReport()
        } else if (type == 2) {
          this.channelBtnList.forEach((item) => {
            item.checked = false
          })
          this.channelBtnList[index].checked = true
          this.channelBtnIndex = index
          if (index == 0) {
            this.channelCardList.forEach((item) => {
              item.type = 1
            })
          } else {
            this.channelCardList.forEach((item) => {
              item.type = 2
            })
          }
        } else if (type == 3) {
          this.channelCardList.forEach((item) => {
            item.checked = false
          })
          this.channelCardList[index].checked = true
          this.channelCardIndex = index
        }
      },
      // 店铺分销排行切换
      handleRankTypeChange(tab) {
        this.rankType = tab.name
      },
      // 渠道分销  店铺 分销表格数据
      async getJstSaleRank() {
        this.listLoading = true
        const { data } = await this.api.getInformationJstSaleRank()
        if (this.rankType == 1) {
          this.goosList = data.jst
        } else {
          this.goosList = data.erp
        }
        this.listLoading = false
      },
      // 渠道分销 表格数据
      async getJstChannel() {
        this.channellistLoading = true
        const { data } = await this.api.getInformationJstChannel({
          type: this.channelBtnIndex + 1,
        })
        this.channelBtnValue = data.list.total
        this.channelCardList[0].num = data.list.jst
        this.channelCardList[0].percent = data.list.jst_rate
        this.channelCardList[1].num = data.list.erp
        this.channelCardList[1].percent = data.list.erp_rate
        if (this.channelCardIndex == 0) {
          data.jst_shop_list.forEach((item) => {
            this.branSonChList.push({
              name: item.shop_name,
              value: item.order_total,
            })
          })
          this.channelList = data.jst_shop_list
        } else {
          data.erp_shop_list.forEach((item) => {
            this.branSonChList.push({
              name: item.shop_name,
              value: item.order_total,
            })
          })
          this.channelList = data.erp_shop_list
        }
        this.channellistLoading = false
        this.$forceUpdate()
      },
      // 折线图数据
      async getHomeReport() {
        const { data } = await this.api.getInformationJstLineChart({
          time: this.form.time,
          type: this.cardListChecked,
        })
        data.forEach((item) => {
          this.dataAllList.total.push(item.list.total)
          this.dataAllList.jst.push(item.list.jst)
          this.dataAllList.erp.push(item.list.erp)
          this.dateList.push(item.time)
        })
        if (this.cardList[this.cardListChecked - 1].type == 1) {
          this.chartList.yAxis[0].name = '金额'
        } else {
          this.chartList.yAxis[0].name = '数量'
        }
        if (
          this.cardListChecked == 8 ||
          this.cardListChecked == 9 ||
          this.cardListChecked == 12
        ) {
          this.chartList.legend.data[0] =
            this.cardList[this.cardListChecked - 1].title
          this.chartList.series[0].data = [0, data[0].list.total, 0, 0]
          this.chartList.series[0].name =
            this.cardList[this.cardListChecked - 1].title
          this.chartList.series[1].data = [0, 0, data[0].list.jst, 0]
          this.chartList.series[2].data = [0, 0, 0, data[0].list.erp]
          this.chartList.series[0].type = 'bar'
          this.chartList.series[1].type = 'bar'
          this.chartList.series[2].type = 'bar'
          this.chartList.xAxis.data = [
            '-',
            this.cardList[this.cardListChecked - 1].title,
            '聚水潭',
            '自主渠道',
            '-',
          ]
          this.$forceUpdate()
        } else if (this.cardListChecked != 11) {
          this.chartList.xAxis.data = this.dateList
          this.chartList.series[0].data = this.dataAllList.total
          this.chartList.series[0].name =
            this.cardList[this.cardListChecked - 1].title
          this.chartList.legend.data[0] =
            this.cardList[this.cardListChecked - 1].title
          this.chartList.series[1].data = this.dataAllList.jst
          this.chartList.series[2].data = this.dataAllList.erp
          this.chartList.series[0].type = 'line'
          this.chartList.series[1].type = 'line'
          this.chartList.series[2].type = 'line'
          this.$forceUpdate()
        }
      },
    },
  }
</script>
