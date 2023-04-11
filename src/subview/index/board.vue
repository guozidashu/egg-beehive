<template>
  <div style="background-color: #f6f8f9">
    <!-- 顶部卡片 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div
          style="
            padding: 20px 20px 16px 20px;
            background-color: white;
            border-radius: 5px;
          "
        >
          <div
            style="
              position: relative;
              display: flex;
              justify-content: space-between;
              padding: 20px;
              font-weight: 600;
              color: white;
              background-color: #f79a29;
              border-radius: 5px;
            "
          >
            <div style="margin-top: 15px; font-size: 18px">未发货</div>
            <div style="margin-top: 15px">
              <div style="margin-bottom: 10px; font-size: 20px">
                {{ not_deliver_data[0].total }}
                <span style="font-size: 14px">单</span>
                {{ not_deliver_data[0].count }}
                <span style="font-size: 14px">件</span>
              </div>
            </div>
            <vab-icon
              icon="error-warning-line"
              style="position: absolute; top: 10px; right: 10px"
            />
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>12h</div>
            <div v-if="not_deliver_data[0].h12total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h12total }}单{{
                not_deliver_data[0].h12count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>24h</div>
            <div v-if="not_deliver_data[0].h24total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h24total }}单{{
                not_deliver_data[0].h24count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>36h</div>
            <div v-if="not_deliver_data[0].h36total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h36total }}单{{
                not_deliver_data[0].h36count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>48h</div>
            <div v-if="not_deliver_data[0].h48total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h48total }}单{{
                not_deliver_data[0].h48count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>72h</div>
            <div v-if="not_deliver_data[0].h72total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h72total }}单{{
                not_deliver_data[0].h72count
              }}件
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row
          :gutter="20"
          style="
            padding: 20px 10px 20px 10px;
            margin-right: 1px;
            margin-left: 1px;
            background-color: white;
          "
        >
          <el-col v-for="(item, index) in cardList" :key="index" :span="8">
            <div style="border-radius: 5px">
              <div
                :style="{
                  position: 'relative',
                  padding: '20px',
                  fontWeight: '600',
                  color: '#6f2024',
                  backgroundColor: item.bgColor,
                  borderRadius: '5px',
                }"
              >
                <div style="font-size: 18px">
                  {{ item.name }}
                </div>
                <vab-icon
                  icon="error-warning-line"
                  style="position: absolute; top: 10px; right: 10px"
                />
              </div>
              <div style="margin: 22px; font-size: 14px">
                {{ item.content1 }} {{ item.total }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                {{ item.content2 }} {{ item.count }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                较昨日
                {{ item.yesterday_count }}&nbsp;
                <span
                  v-if="
                    item.count - item.yesterday_count >= 0 ||
                    item.count == 0 ||
                    item.yesterday_count == 0
                  "
                >
                  增长
                </span>
                <span v-else>减少</span>
                <span v-if="item.count == 0" style="color: red">0%</span>
                <span v-else-if="item.yesterday_count == 0" style="color: red">
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.count - item.yesterday_count >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.count - item.yesterday_count) /
                        item.yesterday_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.count - item.yesterday_count) /
                        item.yesterday_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                </span>
              </div>
              <div style="margin: 22px; font-size: 14px">
                本月 {{ item.month_count }}&nbsp;较上月
                {{ item.yesterday_month_count }}&nbsp;
                <span
                  v-if="
                    item.month_count - item.yesterday_month_count >= 0 ||
                    item.month_count == 0 ||
                    item.yesterday_month_count == 0
                  "
                >
                  增长
                </span>
                <span v-else>减少</span>
                <span v-if="item.month_count == 0" style="color: red">0%</span>
                <span
                  v-else-if="item.yesterday_month_count == 0"
                  style="color: red"
                >
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.month_count - item.yesterday_month_count >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.month_count - item.yesterday_month_count) /
                        item.yesterday_month_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.month_count - item.yesterday_month_count) /
                        item.yesterday_month_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div
      style="
        padding: 20px;
        margin-top: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <div style="margin-bottom: 20px">
        <el-radio-group v-model="radioButton">
          <el-radio-button label="1">按款号欠货明细</el-radio-button>
          <el-radio-button label="2">按客户欠货明细</el-radio-button>
        </el-radio-group>
      </div>
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="form"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <el-form-item style="margin-right: 0">
          <div v-if="radioButton == 1">
            <el-form-item label="品牌" prop="brand_id">
              <el-select
                v-model="form.brand_id"
                placeholder="请选择品牌"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.brand"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="款式" prop="category_id">
              <el-select
                v-model="form.category_id"
                placeholder="请选择款式"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.category"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年份" prop="year_id">
              <el-select
                v-model="form.year_id"
                placeholder="请选择年份"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.year"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="季节" prop="season_id">
              <el-select
                v-model="form.season_id"
                placeholder="请选择季节"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.season"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="波段" prop="band_id">
              <el-select
                v-model="form.band_id"
                placeholder="请选择波段"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.band"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="款号" prop="goods_sn">
              <el-input
                v-model="form.goods_sn"
                placeholder="请输入款号"
                size="small"
              />
            </el-form-item>
          </div>
          <div v-if="radioButton == 2">
            <el-form-item label="会员等级" prop="level_id">
              <el-select
                v-model="form.level_id"
                placeholder="请选择会员等级"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.customer_grade"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="客户分类" prop="customer_type">
              <el-select
                v-model="form.customer_type"
                placeholder="请选择客户分类"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.customer_type"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="form.name" size="small" />
            </el-form-item>
          </div>
          <el-form-item prop="time">
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="resetForm()"
            >
              重置
            </el-button>
            <el-button size="small" type="primary" @click="handleQuery()">
              查询
            </el-button>
            <el-button size="small" type="primary" @click="handleDownload()">
              导出
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <el-table
        v-show="radioButton == 1"
        v-loading="listLoading"
        border
        :data="goodsOwedList"
        style="width: 100%"
        @expand-change="expandChange"
        @selection-change="setSelectRows"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.is_show" style="width: 100%">
              <el-table-column label="颜色" prop="color" />
              <el-table-column label="尺码" prop="size" />
              <el-table-column label="订货数量" prop="order_num" />
              <el-table-column label="欠货数量" prop="not_delivery_num" />
              <el-table-column label="欠货率" prop="outage_rate" />
              <el-table-column label="库存数" prop="xh_num" />
              <el-table-column label="生产中" prop="zsc_num" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排行" type="index" width="60">
          <template slot-scope="scope">
            <span
              v-if="page == 1"
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
              {{ 10 * (page - 1) + scope.$index + 1 }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品" width="400">
          <template #default="{ row }">
            <div style="display: flex">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.goods_img"
                  style="width: 200px; height: 200px"
                />
                <el-image
                  :src="row.goods_img"
                  style="width: 100px; height: 100px"
                />
              </el-tooltip>
              <div style="width: 280px; margin-left: 10px">
                <div
                  style="
                    margin: 10px 0;
                    font-size: 16px;
                    font-weight: 600;
                    text-align: left;
                  "
                >
                  {{ row.goods_sn }}
                </div>
                <div
                  style="
                    width: 150px;
                    overflow: hidden;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ row.goods_name }}
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    margin: 10px 0;
                  "
                >
                  <div style="color: red">￥{{ row.sale_price }}</div>
                  <div>{{ row.create_time | formatTime }}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总订货数量" prop="num" />
        <el-table-column
          align="center"
          label="总欠货数量"
          prop="not_delivery_num"
        />
        <el-table-column align="center" label="欠货率" prop="outage_rate" />
        <el-table-column align="center" label="库存数" prop="xh_total" />
        <el-table-column align="center" label="生产中" prop="zsc_total" />
        <template #empty>
          <el-image
            class="vab-data-empty"
            :src="require('@/assets/empty_images/data_empty.png')"
          />
        </template>
      </el-table>
      <el-table
        v-show="radioButton == 2"
        v-loading="listLoading"
        border
        :data="goodsOwedList"
        style="width: 100%"
      >
        <el-table-column align="center" label="排行" type="index" width="60">
          <template slot-scope="scope">
            <span
              v-if="page == 1"
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
              {{ 10 * (page - 1) + scope.$index + 1 }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="客户" width="400">
          <template #default="{ row }">
            <div style="display: flex">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.customer_avatar"
                  style="width: 200px; height: 200px"
                />
                <el-image
                  :src="row.customer_avatar"
                  style="width: 100px; height: 100px"
                />
              </el-tooltip>
              <div style="width: 280px; margin-left: 10px">
                <div
                  style="
                    width: 150px;
                    overflow: hidden;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ row.customer_name }}
                </div>
                <div style="margin: 15px 0; text-align: left">
                  {{ row.customer_mobile }}
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    margin: 15px 0;
                  "
                >
                  <div>
                    <el-tag>{{ row.level_name }}</el-tag>
                  </div>
                  <div>{{ row.customer_type }}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总订货数量" prop="num" />
        <el-table-column
          align="center"
          label="总欠货数量"
          prop="not_delivery_num"
        />
        <el-table-column align="center" label="欠货率" prop="outage_rate" />
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template #default="{ row }">
            <el-button type="text" @click="handleDetail(row)">详情</el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-image
            class="vab-data-empty"
            :src="require('@/assets/empty_images/data_empty.png')"
          />
        </template>
      </el-table>
      <el-pagination
        background
        :current-page="page"
        layout="total, sizes, prev, pager,next,jumper"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40, 100]"
        :total="listTotal"
        @current-change="changeBtnPage"
        @size-change="changeBtnPageSize"
      />
      <el-dialog
        :before-close="handleClose"
        title="导出"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-radio-group v-model="exportType">
          <el-radio :label="1">按款号汇总</el-radio>
          <el-radio :label="2">按颜色汇总</el-radio>
          <el-radio :label="3">按颜色尺码汇总</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleExport">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 选中的行
        // selectRows: [],
        // 表格每行数据
        rowDate: null,
        // 导出类型
        exportType: 1,
        // 导出弹窗
        dialogVisible: false,
        // 表格类型切换 1:按款号 2:按客户
        radioButton: '1',
        // 头部卡片 未发货数据
        not_deliver_data: [
          {
            total: null,
            count: null,
            h12total: null,
            h12count: null,
            h24total: null,
            h24count: null,
            h36total: null,
            h36count: null,
            h48total: null,
            h48count: null,
            h72total: null,
            h72count: null,
          },
        ],
        // 头部卡片 其余数据
        cardList: [
          {
            name: '已发货',
            content1: '发货单数',
            content2: '发货件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#FFF4F6',
          },
          {
            name: '入库',
            content1: '入库单数',
            content2: '入库件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#EEF5FE',
          },
          {
            name: '销售单',
            content1: '订单数',
            content2: '订单件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#D8EFE5',
          },
        ],
        // 查询，分页表格处理相关参数
        formTemp: null,
        page: 1,
        pageSize: 10,
        // 查询条件表单
        form: {
          page: 1,
          pageSize: 10,
          goods_sn: '', // 商品款号
          brand_id: '', // 品牌id
          year_id: '', // 年份id
          band_id: '', // 波段id
          season_id: '', // 季节id
          category_id: '', // 分类id
          name: '', // 客户名称
          level_id: '', // 等级id
          customer_type: '', // 客户分类
        },
        // 欠货明细 下拉框数据
        selectList: [],
        // 欠货明细 表格数据
        listTotal: 0,
        listLoading: false,
        listType: 8,
        goodsOwedList: [],
      }
    },
    watch: {
      // 欠货查询表单监听
      form: {
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
          this.getGoodsOwedTableList()
          this.pageState = false
        },
        deep: true,
      },
      radioButton: {
        handler: function () {
          this.formTemp.page = 1
          this.formTemp.pageSize = 10
          this.page = 1
          this.pageSize = 10
          this.getGoodsOwedTableList()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.getGoodsOwedTableList()
      this.fetchData()
    },
    methods: {
      handleClose() {
        this.dialogVisible = false
      },
      // 客户欠货详情跳转跳转到客户详情
      handleDetail(row) {
        window.open(
          `#/customer/customerManage?id=${row.customer_id}&type=board`,
          '_blank'
        )
        // this.$router.push({
        //   path: '/customer/customerManage',
        //   query: {
        //     id: row.customer_id,
        //     type: 'board', // 从首页预警跳转
        //   },
        // })
      },
      // 表格选中数据
      setSelectRows(val) {
        this.selectRows = val
      },
      // 导出款号欠货明细
      async handleExport() {
        const { code, data } =
          await this.api.getWarehouseAnalysisSnOutStockExport({
            type: this.exportType, // 导出类型 1=按款号 2=按颜色 3=按尺码
            goods_sn: this.form.goods_sn, // 商品款号
            brand_id: this.form.brand_id, // 品牌id
            year_id: this.form.year_id, // 年份id
            band_id: this.form.band_id, // 波段id
            season_id: this.form.season_id, // 季节id
            category_id: this.form.category_id, // 分类id
          })
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.dialogVisible = false
          this.getGoodsOwedTableList()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 欠货明细表格切换页数
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 欠货明细表格切换条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 欠货明细 查询表单重置
      resetForm() {
        this.form = {
          page: 1,
          pageSize: 10,
          goods_sn: '', // 商品款号
          brand_id: '', // 品牌id
          year_id: '', // 年份id
          band_id: '', // 波段id
          season_id: '', // 季节id
          category_id: '', // 分类id
          name: '', // 客户名称
          level_id: '', // 等级id
          customer_type: '', // 客户分类
        }
      },
      handleQuery() {
        this.getGoodsOwedTableList()
      },
      // 导出客户欠货明细
      async handleDownload() {
        if (this.radioButton == 1) {
          this.dialogVisible = true
          return
        }
        // let stock_id = []
        // if (this.selectRows.length != 0) {
        //   this.selectRows.forEach((item) => {
        //     stock_id.push(item.stock_id)
        //   })
        // }
        const { code, data } =
          await this.api.getWarehouseAnalysisCustomerOutStockExport({
            name: this.form.name, // 客户名称
            level_id: this.form.level_id, // 等级id
            customer_type: this.form.customer_type, // 客户分类
          })
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.dialogVisible = false
          this.getGoodsOwedTableList()
        } else {
          this.$message.error('导出失败')
        }
      },
      async expandChange(row) {
        if (this.radioButton == 1) {
          const { data } = await this.api.getWarehouseAnalysisRankDetail({
            goods_id: row.goods_id,
          })
          row.is_show = data
          this.$forceUpdate()
        }
      },
      // 欠货明细 查询表单 会员等级下拉框
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade,customer_type,brand,year,season,band,category',
        })
        this.selectList = data
      },
      // 获取欠货明细表格
      async getGoodsOwedTableList() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        if (this.radioButton == 1) {
          const { data } = await this.api.getWarehouseAnalysisSnOutStockAnalyse(
            this.formTemp
          )
          this.goodsOwedList = data.list
          this.listTotal = data.total
          this.listLoading = false
        } else {
          const { data } =
            await this.api.getWarehouseAnalysisCustomerOutStockAnalyse(
              this.formTemp
            )
          this.goodsOwedList = data.list
          this.listTotal = data.total
          this.listLoading = false
        }
      },
      // 获取头部数据
      async fetchData() {
        const { data } = await this.api.getWarehouseAnalysisHeadData()
        let arr = data
        arr.already_deliver_data.name = '已发货'
        arr.already_deliver_data.content1 = '发货单数'
        arr.already_deliver_data.content2 = '发货件数'
        arr.inbound_data.name = '入库'
        arr.inbound_data.content1 = '入库单数'
        arr.inbound_data.content2 = '入库件数'
        arr.sale_data.name = '销售单'
        arr.sale_data.content1 = '订单数'
        arr.sale_data.content2 = '订单件数'
        arr.already_deliver_data.bgColor = '#FFF4F6'
        arr.inbound_data.bgColor = '#EEF5FE'
        arr.sale_data.bgColor = '#D8EFE5'
        this.not_deliver_data[0] = data.not_deliver_data
        this.cardList[0] = data.already_deliver_data
        this.cardList[1] = data.inbound_data
        this.cardList[2] = data.sale_data
      },
    },
  }
</script>
