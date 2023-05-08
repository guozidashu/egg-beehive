<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 查询条件 -->
      <el-form
        ref="form"
        :inline="true"
        label-width="100px"
        :model="form"
        style="padding: 20px 0 0 0"
      >
        <el-form-item label="款式类别:">
          <el-select v-model="form.category_id" placeholder="请选择类别款式">
            <el-option
              v-for="(item, index) in selectList.category"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
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
        <el-form-item label="上市年份:">
          <el-select v-model="form.year_id" placeholder="请选择上市年份">
            <el-option
              v-for="(item, index) in selectList.year"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上市季节:">
          <el-select v-model="form.season_id" placeholder="请选择上市季节">
            <el-option
              v-for="(item, index) in selectList.season"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单类型:">
          <el-select v-model="form.order_type" placeholder="请选择订单类型">
            <el-option label="库存调整" :value="1" />
            <el-option label="在生产调整" :value="2" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="状态:">
          <el-select v-model="form.goods_status" placeholder="请选择状态">
            <el-option label="停售" value="2" />
            <el-option label="在售" value="1" />
            <el-option label="待上市" value="3" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="类型:" placeholder="请选择类型">
          <el-select v-model="form.goods_type">
            <el-option label="整手" value="1" />
            <el-option label="散码" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="订单备注:">
          <el-input
            v-model="form.remark"
            placeholder="请输入订单备注"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="指定搜索:">
          <el-input
            v-model="form.keyword"
            placeholder="请输入商品名称/款号/操作人"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="时间筛选:">
          <el-date-picker
            v-model="form.time"
            align="left"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item>
          <div style="display: flex; margin-left: 20px">
            <el-button size="small" type="primary" @click="resetForm">
              重置
            </el-button>
            <el-button size="small" type="primary" @click="handleQuery">
              查询
            </el-button>
            <el-button size="small" type="primary" @click="handleDerive(1)">
              全部导出
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <!-- tab 选项卡 -->
      <el-tabs v-model="form.list_type">
        <el-tab-pane label="按款号/货号" name="1" />
        <el-tab-pane label="按颜色尺码" name="2" />
      </el-tabs>
      <!-- 操作按钮 -->
      <div style="display: flex; justify-content: space-between">
        <el-form ref="form" :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-button
              size="small"
              style="margin-right: 20px"
              type="primary"
              @click="handleDerive(2)"
            >
              批量导出
            </el-button>
          </el-form-item>
        </el-form>
        <el-form class="demo-form-inline" :inline="true" :model="form">
          <el-form-item label="排序">
            <el-select v-model="form.sort_field" style="width: 150px">
              <el-option label="按创建时间" value="gao.create_time" />
              <el-option label="按上市时间" value="g.upper_time" />
              <el-option label="按商品款号" value="g.sn" />
            </el-select>
          </el-form-item>
          <el-radio-group v-model="form.sort_type">
            <el-radio-button label="asc">正序</el-radio-button>
            <el-radio-button label="desc">倒序</el-radio-button>
          </el-radio-group>
        </el-form>
      </div>

      <!-- 表格 -->
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column align="center" type="selection" width="40" />
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
                  <div style="display: flex">
                    <div style="font-size: 14px; font-weight: 600">
                      批次号：{{ row.order_id }} | &nbsp;
                    </div>
                    <el-tag v-if="row.goods_type == 0" type="info">整手</el-tag>
                    <el-tag v-if="row.goods_type == 1" type="info">散码</el-tag>
                  </div>
                  <div style="display: flex; margin: 5px 0 0 0">
                    <div style="font-size: 14px; font-weight: 600">
                      {{ row.goods_sn }} | &nbsp;
                    </div>
                    <el-tag type="success">{{ row.goods_name }}</el-tag>
                  </div>
                  <div style="display: flex; width: 100%; margin: 5px 0">
                    <el-tag v-if="row.category_name != null" type="info">
                      {{ row.category_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="row.year_name != null" type="info">
                      {{ row.year_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="row.season_name != null" type="info">
                      {{ row.season_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="row.brand_name != null" type="info">
                      {{ row.brand_name }}
                    </el-tag>
                  </div>
                  <div style="margin: 5px 0 0 0">
                    <div>上市时间：{{ row.goods_upper_time | formatTime }}</div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="form.list_type == '2'"
            align="center"
            label="颜色"
            prop="color_name"
          />
          <el-table-column
            v-if="form.list_type == '2'"
            align="center"
            label="尺码"
            prop="size_name"
          />
          <el-table-column align="center" label="调整前" prop="order_fnum" />
          <el-table-column align="center" label="调整后" prop="order_tnum" />
          <el-table-column align="center" label="调整数量" prop="order_num" />
          <el-table-column align="center" label="调整类型" prop="order_type">
            <template #default="{ row }">
              <div v-if="row.order_type == 1">库存调整</div>
              <div v-if="row.order_type == 2">在生产调整</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作人" prop="employee_name" />
          <el-table-column align="center" label="备注" prop="order_remark" />
          <el-table-column
            align="center"
            label="订单时间"
            prop="order_time"
            width="180"
          >
            <template #default="{ row }">
              <div>{{ row.order_time | formatTime }}</div>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
  </div>
</template>

<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  import table2excel from 'js-table2excel'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 下拉框数据
        selectList: [],
        // 表格选中 ids
        selectRowsId: [],
        // 表格相关数据 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        pageState: false,
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          year_id: '', // 年份id
          category_id: '', // 分类id
          brand_id: '', // 品牌id
          season_id: '', // 季节id
          goods_type: '', // 商品类型 1=整首 2=散码
          order_type: '', // 订单类型 1=库存调整 2=在生产调整
          goods_status: '1', // 商品状态 1=在售 2=停售 3=待上市
          remark: '', // 订单备注
          keyword: '', // 关键字
          sort_field: 'g.sn', // 排序字段 g.sn = 按款号 g.upper_time = 按上市时间 gao.create_time = 按订单创建时间
          sort_type: 'desc', // desc asc,
          list_type: '1', // 1=按颜色尺码 2=按商品
          time: this.getPastTime(29),
        },
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单数据变化
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
            this.formTemp.pageSize = 20
            this.page = 1
            this.pageSize = 20
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
      // 导出商品
      async handleDerive(type) {
        if (type == 2 && this.selectRowsId.length == 0) {
          this.$message.error('请选择要导出的规格')
          return
        }
        let order_ids = []
        let order_sids = []
        if (this.selectRowsId.length != 0) {
          this.selectRowsId.forEach((item) => {
            if (this.form.list_type == 1) {
              order_ids.push(item.order_id)
            } else {
              order_sids.push(item.order_sid)
            }
          })
        }
        let formTemp1 = JSON.parse(JSON.stringify(this.form))
        if (formTemp1.list_type == 1) {
          formTemp1.order_ids = order_ids
        } else {
          formTemp1.order_sids = order_sids
        }
        const { code, data } = await this.api.getGoodsAdjustExport(formTemp1)

        let columnSn = [
          {
            title: '图片',
            type: 'image',
            width: 100,
            height: 100,
            key: 'goods_img',
          },
          {
            title: '商品款号',
            type: 'text',
            key: 'goods_sn',
          },
          {
            title: '商品名称',
            type: 'text',
            key: 'goods_name',
          },
          {
            title: '调整前',
            type: 'text',
            key: 'order_fnum',
          },
          {
            title: '调整后',
            type: 'text',
            key: 'order_tnum',
          },

          {
            title: '调整数量',
            type: 'text',
            key: 'order_num',
          },
          {
            title: '品牌',
            type: 'text',
            key: 'brand_name',
          },
          {
            title: '上市年份',
            type: 'text',
            key: 'year_name',
          },
          {
            title: '上市季节',
            type: 'text',
            key: 'season_name',
          },
          {
            title: '调整类型',
            type: 'text',
            key: 'order_type',
          },
          {
            title: '操作人',
            type: 'text',
            key: 'employee_name',
          },
          {
            title: '操作时间',
            type: 'text',
            key: 'order_time',
            width: 300,
          },
          {
            title: '备注',
            type: 'text',
            key: 'order_remark',
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
            title: '商品款号',
            type: 'text',
            key: 'goods_sn',
          },
          {
            title: '商品名称',
            type: 'text',
            key: 'goods_name',
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
            title: '调整前',
            type: 'text',
            key: 'order_fnum',
          },
          {
            title: '调整后',
            type: 'text',
            key: 'order_tnum',
          },

          {
            title: '调整数量',
            type: 'text',
            key: 'order_num',
          },
          {
            title: '品牌',
            type: 'text',
            key: 'brand_name',
          },
          {
            title: '上市年份',
            type: 'text',
            key: 'year_name',
          },
          {
            title: '上市季节',
            type: 'text',
            key: 'season_name',
          },
          {
            title: '调整类型',
            type: 'text',
            key: 'order_type',
          },
          {
            title: '操作人',
            type: 'text',
            key: 'employee_name',
          },
          {
            title: '操作时间',
            type: 'text',
            key: 'order_time',
            width: 300,
          },
          {
            title: '备注',
            type: 'text',
            key: 'order_remark',
          },
        ]
        data.list.forEach((item) => {
          if (item.order_type == 1) {
            item.order_type = '库存调整 '
          }
          if (item.order_type == 2) {
            item.order_type = '再生产调整 '
          }
          item.order_time = this.formatTime(item.order_time)
        })
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
          '-' +
          minute +
          '-' +
          second
        // 拼接文件名称
        const excelName = '库存调整单-' + time
        if (code == 200) {
          if (this.form.list_type == 1) {
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
      formatTime(value) {
        if (value) {
          let date = new Date(value * 1000) // 时间戳为秒：10位数
          let year = date.getFullYear()
          let month =
            date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1
          let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
          let hour =
            date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
          let minute =
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
          let second =
            date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
          return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        } else {
          return ''
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 商品列表
      async debounceFetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getGoodsAdjustList(this.formTemp)
        this.list = data.list
        this.total = data.total
        this.listLoading = false
      },
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,year,season,band,category,agegroup,color,size',
        })
        this.selectList = data
      },
      // 重置表单
      resetForm() {
        this.form = {
          page: 1,
          pageSize: 10,
          year_id: '', // 年份id
          category_id: '', // 分类id
          brand_id: '', // 品牌id
          season_id: '', // 季节id
          goods_type: '', // 商品类型 1=整首 2=散码
          order_type: '', // 订单类型 1=库存调整 2=在生产调整
          goods_status: '1', // 商品状态 1=在售 2=停售 3=待上市
          remark: '', // 订单备注
          keyword: '', // 关键字
          sort_field: 'g.sn', // 排序字段 g.sn = 按款号 g.upper_time = 按上市时间 gao.create_time = 按订单创建时间
          sort_type: 'desc', // desc asc,
          list_type: '1', // 1=按颜色尺码 2=按商品
          time: this.getPastTime(29),
        }
      },
      // 列表选中数据
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
    },
  }
</script>
