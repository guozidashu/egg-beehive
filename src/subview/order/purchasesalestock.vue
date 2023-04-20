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
          @click="handleDownload(1)"
        >
          全部导出
        </el-button>
      </div>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.type">
        <el-tab-pane label="按款号/货号" name="1" />
        <el-tab-pane label="按颜色尺码" name="2" />
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
            <el-checkbox v-model="form.is_void">不统计作废数据</el-checkbox>
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
          <el-select v-model="form.order" style="width: 150px; margin: 0 10px">
            <el-option label="按创建时间" value="create_time" />
            <el-option label="按上架时间" value="upper_time" />
            <el-option label="按商品款号" value="sn" />
          </el-select>
          <el-radio-group v-model="form.sort">
            <el-radio-button label="asc">正序</el-radio-button>
            <el-radio-button label="desc">倒序</el-radio-button>
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
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image
                    :src="row.goods_img"
                    style="width: 105px; height: 105px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
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
                    <el-tag type="info">{{ row.category_name }}</el-tag>
                    &nbsp;
                    <el-tag type="info">{{ row.year_name }}</el-tag>
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
                    {{ row.upper_time }}
                    <el-tag v-if="row.status == 1">在售</el-tag>
                    <el-tag v-if="row.status == 2" type="danger">停售</el-tag>
                    <el-tag v-if="row.status == 3" type="warning">
                      待上市
                    </el-tag>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="form.type == 2"
            align="center"
            label="颜色"
            prop="color_name"
          />
          <el-table-column
            v-if="form.type == 2"
            align="center"
            label="尺码"
            prop="size_name"
          />
          <el-table-column align="center" label="裁床数" prop="zsc_num" />
          <el-table-column
            align="center"
            label="生产入库"
            prop="sum_inbound_num"
          />
          <el-table-column align="center" label="生产退货" prop="sum_out_num" />
          <el-table-column
            align="center"
            label="销售发货"
            prop="sum_delivery_num"
          />
          <el-table-column
            align="center"
            label="销售退货"
            prop="sum_return_num"
          />
          <el-table-column
            align="center"
            label="调整数量"
            prop="sum_adjust_num_num"
          />
          <el-table-column align="center" label="实际库存" prop="real_stock" />
          <el-table-column
            align="center"
            label="订单占有数"
            prop="sum_wait_num"
          />
          <el-table-column align="center" label="可售库存" prop="sale_stock" />
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
          type: '1', //按照款号 2按照颜色c
          is_return: false, //
          is_void: true, //
          order: 'create_time', //create_time upper_time
          sort: 'desc', //
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
      async handleDownload(type) {
        if (type == 2 && this.selectRows.length == 0) {
          this.$message.error('请选择要导出的规格')
          return
        }
        let stock_id = []
        if (this.selectRows.length != 0) {
          this.selectRows.forEach((item) => {
            if (this.form.type == 1) {
              stock_id.push(item.goods_id)
            } else {
              stock_id.push(item.stock_id)
            }
          })
        }
        const { code, data } = await this.api.getInventoryExport({
          sn: this.form.sn, // 商品款号
          brand_id: this.form.brand_id, //品牌id
          season_id: this.form.season_id, //季节id
          ids: stock_id, // 导出指定规格数据
          type: this.form.type, //按照款号 2按照颜色c
          is_return: this.form.is_return, //
          is_void: this.form.is_void, //
          order: this.form.order, //create_time upper_time sn
          sort: this.form.sort, //按照款号 2按照颜色
          page: this.form.page,
          pageSize: this.form.pageSize,
        })

        let columnSn = [
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
            key: 'zsc_num',
          },
          {
            title: '生产入库',
            type: 'text',
            key: 'sum_inbound_num',
          },
          {
            title: '销售发货',
            type: 'text',
            key: 'sum_delivery_num',
          },
          {
            title: '销售退货',
            type: 'text',
            key: 'sum_return_num',
          },
          {
            title: '调整数量',
            type: 'text',
            key: 'sum_adjust_num_num',
          },
          {
            title: '实际库存',
            type: 'text',
            key: 'real_stock',
          },
          {
            title: '订单占有数',
            type: 'text',
            key: 'sum_wait_num',
          },
          {
            title: '可售库存',
            type: 'text',
            key: 'sale_stock',
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
        let columnSize = [
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
            key: 'zsc_num',
          },
          {
            title: '生产入库',
            type: 'text',
            key: 'sum_inbound_num',
          },
          {
            title: '销售发货',
            type: 'text',
            key: 'sum_delivery_num',
          },
          {
            title: '销售退货',
            type: 'text',
            key: 'sum_return_num',
          },
          {
            title: '调整数量',
            type: 'text',
            key: 'sum_adjust_num_num',
          },
          {
            title: '实际库存',
            type: 'text',
            key: 'real_stock',
          },
          {
            title: '订单占有数',
            type: 'text',
            key: 'sum_wait_num',
          },
          {
            title: '可售库存',
            type: 'text',
            key: 'sale_stock',
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
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        // 拼接年月日时分秒
        const time =
          year +
          '-' +
          month +
          '-' +
          day +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
        // 拼接文件名称
        const excelName = '进销存统计' + time
        if (code == 200) {
          if (this.form.type == 1) {
            table2excel(columnSn, excelData, excelName) //生成Excel表格，自动下载
          } else {
            table2excel(columnSize, excelData, excelName) //生成Excel表格，自动下载
          }

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
          type: '2', //按照款号 2按照颜色c
          is_return: false, //
          is_void: true, //
          order: 'create_time', //create_time upper_time
          sort: 'desc', //
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
