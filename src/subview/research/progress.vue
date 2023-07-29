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
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="样衣类型:">
            <el-select v-model="form.design_type">
              <el-option label="头版" :value="1" />
              <el-option label="复色" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属品牌:">
            <el-select v-model="form.brand_id" size="small">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上市年份:">
            <el-select v-model="form.year_id" size="small">
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="适合季节:">
            <el-select v-model="form.season_id" size="small">
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上市波段:">
            <el-select v-model="form.band_id" size="small">
              <el-option
                v-for="(item, index) in selectList.band"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="款式品类:">
            <el-select v-model="form.category_id" size="small">
              <el-option
                v-for="(item, index) in selectList.category"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="优先度:">
            <el-select v-model="form.priority">
              <el-option label="普通" :value="1" />
              <el-option label="紧急" :value="2" />
              <el-option label="加急" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="form.dateType"
              style="width: 100px; margin: 0 10px"
            >
              <el-option label="下单日期" :value="1" />
              <el-option label="完成日期" :value="2" />
            </el-select>
            <el-date-picker
              v-if="form.dateType == 1"
              v-model="form.expected_date"
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
            <el-date-picker
              v-if="form.dateType == 2"
              v-model="form.order_date"
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
          <el-form-item label="搜索：">
            <el-input
              v-model="form.keyword"
              placeholder="请输入样衣设计编号"
              size="small"
              style="width: 200px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <!-- 表格 -->
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.status" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label + '(' + item.Number + ')'"
          :name="item.value"
        />
      </el-tabs>
      <div style="display: flex; justify-content: space-between">
        <el-form class="demo-form-inline" :inline="true" :model="form">
          <el-button size="small" type="primary" @click="handleExamine">
            批量审核
          </el-button>
          <el-button size="small" type="primary" @click="handleDieOut">
            批量淘汰
          </el-button>
          <el-button
            size="small"
            style="margin-right: 20px"
            type="primary"
            @click="handleTransferCargo"
          >
            批量转大货
          </el-button>
          <el-checkbox v-model="form.void">不显示已淘汰订单</el-checkbox>
        </el-form>
        <el-form class="demo-form-inline" :inline="true" :model="form">
          <el-form-item label="排序">
            <el-select v-model="form.sortType" style="width: 150px">
              <el-option label="按下单日期" value="do.create_time" />
              <el-option label="按完成日期" value="do.expected_date" />
            </el-select>
          </el-form-item>
          <el-radio-group v-model="form.sort">
            <el-radio-button label="asc">正序</el-radio-button>
            <el-radio-button label="desc">倒序</el-radio-button>
          </el-radio-group>
        </el-form>
      </div>
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
          <el-table-column align="center" type="selection" />
          <el-table-column
            align="center"
            label="样衣信息"
            prop="goods"
            width="400"
          >
            <template #default="{ row }">
              <div style="display: flex">
                <el-image
                  :src="row.goods_img"
                  style="width: 105px; height: 105px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="margin-left: 10px">
                  <div style="text-align: left">
                    <span style="font-weight: 600">
                      <!-- {{ row.order_id }} -->
                      wz13012
                    </span>
                    &nbsp;| &nbsp;
                    <el-tag type="success">头版</el-tag>
                    <!-- <el-tag type="success" v-if="row.order_type == 1">头版</el-tag>
                    <el-tag v-if="row.order_type == 2" >
                      首单
                    </el-tag> -->
                  </div>
                  <div style="margin: 5px 0; text-align: left">
                    <!-- {{ row.goods_sn }}  -->
                    小鳄鱼连帽卫衣
                  </div>
                  <div style="display: flex; width: 100%; margin: 5px 0">
                    <el-tag type="info">卫衣</el-tag>
                    &nbsp;
                    <el-tag type="info">2023</el-tag>
                    &nbsp;
                    <el-tag type="info">春季</el-tag>
                    &nbsp;
                    <el-tag type="info">波段一</el-tag>
                    &nbsp;
                    <el-tag type="info">品牌</el-tag>
                    <!-- <el-tag v-if="row.cate_name != null" type="info">
                      {{ row.cate_name }}
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
                    <el-tag v-if="row.band_name != null" type="info">
                      {{ row.band_name }}
                    </el-tag> -->
                  </div>
                  <div>
                    <div style="text-align: left">
                      下单时间: 2020-02-02 02:02:02
                      <!-- {{ row.order_expected_date | formatTime }} -->
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="优先度"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="样衣费用"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="付款方式"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="设计来源"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="样衣类型"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="设计师"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="耗时"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="进度状态"
            prop="1111"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="150"
          >
            <template #default="{ row }">
              <el-button type="text" @click="DieOut(row)">淘汰</el-button>
              <el-button disabled type="text">已淘汰</el-button>
              &nbsp;
              <el-button type="text">更多</el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 页数，条数，表单查询条件 ，下拉框数据，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          void: false,
          sortType: 'do.create_time',
          sort: 'desc',
          page: 1,
          pageSize: 20,
          brand_id: '',
          season_id: '',
          category_id: '',
          year_id: '',
          priority: '',
          keyword: '',
          status: 0, // 状态 0 全部 1设计中  2待制版 3制版中 4待剪板  5未完成订单
          design_type: '', //1头版 2复色
          // --
          paytype: '', //1签单 2现金
          order_type: '', //1设计中 2设计完成 3制版中 4制版完成 5剪板中 6剪板完成 7样衣中 8样衣完成 9审核完成
          // --
          dateType: 1, //日期类型 1=下单日期 2=交货日期
          expected_date: [], //交货日期
          order_date: [], //订单创建日期
        },
        selectList: [],
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        selectRowsId: [],
        // tab数组
        tabList: [
          {
            label: '全部订单',
            value: '0',
            Number: 0,
          },
          {
            label: '设计中',
            value: '1',
            Number: 0,
          },
          {
            label: '设计完成',
            value: '2',
            Number: 0,
          },
          {
            label: '制版中',
            value: '3',
            Number: 0,
          },
          {
            label: '制版完成',
            value: '4',
            Number: 0,
          },
          {
            label: '剪板中',
            value: '5',
            Number: 0,
          },
          {
            label: '剪板完成',
            value: '6',
            Number: 0,
          },
          {
            label: '样衣中',
            value: '7',
            Number: 0,
          },
          {
            label: '样衣完成',
            value: '8',
            Number: 0,
          },
          {
            label: '审核完成',
            value: '9',
            Number: 0,
          },
        ],
      }
    },
    watch: {
      // 监听表单变化
      form: {
        handler: function () {
          this.page = 1
          this.pageSize = 20
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      // 淘汰事件
      DieOut(row) {
        this.$confirm('是否淘汰该订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '淘汰成功!',
            })
            // this.fetchData()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消淘汰',
            })
          })
      },
      // 批量审核
      async handleExamine() {
        let ids = this.selectRowsId.map((item) => item.id)
        if (ids.length == 0) {
          this.$message.error('请选择要审核的数据')
          return
        }
        // const { code, data } = await this.api.getOrderListExport(ids)
        // if (code == 200) {
        //   window.open(data.url)
        //   this.$message.success('审核成功')
        //   this.fetchData()
        // } else {
        //   this.$message.error('审核失败')
        // }
      },
      // 批量淘汰
      async handleDieOut() {
        let ids = this.selectRowsId.map((item) => item.id)
        if (ids.length == 0) {
          this.$message.error('请选择要淘汰的数据')
          return
        }
        // const { code, data } = await this.api.getOrderListExport(ids)
        // if (code == 200) {
        //   window.open(data.url)
        //   this.$message.success('淘汰成功')
        //   this.fetchData()
        // } else {
        //   this.$message.error('淘汰失败')
        // }
      },
      // 批量转大货
      async handleTransferCargo() {
        let ids = this.selectRowsId.map((item) => item.id)
        if (ids.length == 0) {
          this.$message.error('请选择要转大货的数据')
          return
        }
        // const { code, data } = await this.api.getOrderListExport(ids)
        // if (code == 200) {
        //   window.open(data.url)
        //   this.$message.success('转大货成功')
        //   this.fetchData()
        // } else {
        //   this.$message.error('转大货失败')
        // }
      },
      // 列表选中数据
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      handleClick(tab) {
        this.form.status = tab.name
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchData()
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,category,year,season,band',
        })
        this.selectList = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const { data } = await this.api.getPlannedList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
