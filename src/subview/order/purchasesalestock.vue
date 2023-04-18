<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 查询条件/操作按钮 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="品牌:">
            <el-select v-model="form.brand_id" placeholder="请选择品牌">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年份:">
            <el-select v-model="form.year_id" placeholder="请选择年份">
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="季节:">
            <el-select v-model="form.season_id" placeholder="请选择季节">
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="款号:">
            <el-input
              v-model="form.sn"
              placeholder="请输入款号"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </QYForm>
      <div>
        <el-button
          size="small"
          style="margin-top: 20px; margin-right: 20px"
          type="primary"
          @click="handleDownload()"
        >
          全部导出
        </el-button>
      </div>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.order_source">
        <el-tab-pane :label="'按款号/货号'" name="0" />
        <el-tab-pane :label="'按颜色尺码'" name="1" />
      </el-tabs>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
      >
        <div style="display: flex">
          <el-button
            size="small"
            style="margin-right: 10px"
            type="primary"
            @click="handleDownload(2)"
          >
            批量导出
          </el-button>
          <div style="display: flex; margin-top: 5px">
            <el-checkbox v-model="form.is_return">不显示已停售商品</el-checkbox>
            <el-checkbox v-model="form.is_return1">不统计作废数据</el-checkbox>
            <div>
              &nbsp; &nbsp; | &nbsp; 指标说明
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">
                  实际库存 = 期初数量 + 生产入库 - 生产退货 - 销售发货 +
                  销售退货 +- 调整
                </div>
                <div style="font-size: 12px">
                  可售库存 = 实际库存 -订单占有数（代发货）
                </div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </div>
          </div>
        </div>
        <div>
          排序
          <el-select v-model="form.region" style="width: 150px; margin: 0 10px">
            <el-option label="按创建时间" value="1" />
            <el-option label="按上架时间" value="2" />
            <el-option label="按商品款号" value="3" />
          </el-select>
          <el-radio-group v-model="form.order_sort">
            <el-radio-button :label="1">正序</el-radio-button>
            <el-radio-button :label="2">倒序</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 列表 -->
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="selectBtnRows"
      >
        <template #List>
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column label="商品信息" width="400">
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
                    style="width: 105px; height: 105px"
                  />
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    {{ row.goods_sn }}
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 5px 0 0 0;
                    "
                  >
                    <div
                      style="
                        width: 150px;
                        overflow: hidden;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      商品名称
                    </div>
                  </div>

                  <div style="display: flex; width: 100%; margin: 5px 0">
                    <el-tag type="info">商品款式</el-tag>
                    &nbsp;
                    <el-tag type="info">年份</el-tag>
                    &nbsp;
                    <el-tag v-if="row.season_name != null" type="info">
                      {{ row.season_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="row.brand_name != null" type="info">
                      {{ row.brand_name }}
                    </el-tag>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 5px 0 0 0;
                    "
                  >
                    上架日期
                    <el-tag>停在售</el-tag>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="颜色" prop="color_name" />
          <el-table-column align="center" label="尺码" prop="size_name" />
          <el-table-column align="center" label="期初数量" prop="size_name1" />
          <el-table-column align="center" label="裁床数" prop="cutting_num" />
          <el-table-column align="center" label="生产入库" prop="size_name1" />
          <el-table-column align="center" label="生产退货" prop="size_name1" />
          <el-table-column align="center" label="销售发货" prop="size_name1" />
          <el-table-column align="center" label="销售退货" prop="size_name1" />
          <el-table-column align="center" label="调整数量" prop="size_name1" />
          <el-table-column align="center" label="实际库存" prop="size_name1" />
          <el-table-column
            align="center"
            label="订单占有数"
            prop="size_name1"
          />
          <el-table-column align="center" label="可售库存" prop="size_name1" />
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  // 表格导出插件
  import table2excel from 'js-table2excel'
  export default {
    data() {
      return {
        // 选中的行
        selectRows: [],
        // 下拉框数据
        selectList: [],
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          sn: '', //订单号
          brand_id: '', //品牌
          season_id: '', //季节
          year_id: '', //年份
          order_source: '0', //款号，规格
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单变化
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
          this.fetchData()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.getGoodsTypeList()
      this.fetchData()
    },
    methods: {
      // 列表选中
      selectBtnRows(data) {
        this.selectRows = data
      },
      // 获取下拉框数据
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year',
        })
        this.selectList = data
      },
      // 导出
      async handleDownload() {
        let stock_id = []
        if (this.selectRows.length != 0) {
          this.selectRows.forEach((item) => {
            stock_id.push(item.stock_id)
          })
        }
        const { code, data } = await this.api.getInventoryExport({
          sn: this.form.sn, // 商品款号
          brand_id: this.form.brand_id, //品牌id
          season_id: this.form.season_id, //季节id
          stock_id: stock_id, // 导出指定规格数据
        })
        const column = [
          {
            title: '图片',
            type: 'image',
            width: 100,
            height: 100,
            key: 'goods_img',
          },
          {
            title: '款号',
            type: 'text',
            key: 'goods_sn',
          },
          {
            title: '颜色',
            type: 'text',
            key: 'color_name',
          },
          {
            title: '尺码',
            type: 'text',
            key: 'size_name',
          },
          {
            title: '品牌',
            type: 'text',
            key: 'brand_name',
          },
          {
            title: '季节',
            type: 'text',
            key: 'season_name',
          },
          {
            title: '裁床数',
            type: 'text',
            key: 'cutting_num',
          },
          {
            title: '入库数',
            type: 'text',
            key: 'inbound_num',
          },
          {
            title: '入库成本',
            type: 'text',
            key: 'inbound_cost',
          },
          {
            title: '销售数',
            type: 'text',
            key: 'sale_num',
          },
          {
            title: '销售额',
            type: 'text',
            key: 'total_price',
          },
          {
            title: '库存数',
            type: 'text',
            key: 'stock_num',
          },
          {
            title: '库存成本',
            type: 'text',
            key: 'stock_cost',
          },
          {
            title: '吊牌价',
            type: 'text',
            key: 'sale_price',
          },
          {
            title: '成本价',
            type: 'text',
            key: 'cost_price',
          },
        ]
        const excelData = data.list
        const excelName = '进销存表格' //文件名称
        if (code == 200) {
          table2excel(column, excelData, excelName) //生成Excel表格，自动下载
          this.$message.success('导出成功')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = {
          page: 1,
          pageSize: 10,
          sn: '', //订单号
          brand_id: '', //品牌
          season_id: '', //季节
          year_id: '', //年份
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 每页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getInventoryList(this.formTemp)
        this.list = data.list
        this.total = data.count
        this.listLoading = false
      },
    },
  }
</script>
