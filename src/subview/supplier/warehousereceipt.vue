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
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="供应商类别:">
            <el-select v-model="form.supplier_type">
              <el-option
                v-for="item in supplier_type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="入库状态:">
            <el-select v-model="form.type">
              <el-option label="未入库" :value="1" />
              <el-option label="部分入库" :value="2" />
              <el-option label="全部入库" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态:">
            <el-select v-model="form.type1">
              <el-option label="延期订单" :value="1" />
              <el-option label="预警订单" :value="2" />
            </el-select>
          </el-form-item> -->
          <el-form-item label="入库类型:">
            <el-select v-model="form.type">
              <el-option label="成品采购入库" :value="1" />
              <el-option label="生产计划入库" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="入库仓库:">
            <el-select v-model="form.warehouse">
              <el-option label="聚水潭仓库" :value="1" />
              <el-option label="自主仓库" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input
              v-model="form.keywords"
              placeholder="请输入供应商名称/款号/批次"
              size="small"
            />
          </el-form-item>
          <el-form-item label="日期搜索:">
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
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:SupplierWarehousereceipt:add']"
            size="small"
            type="primary"
          >
            新增入库单
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary">批量导出</el-button>
        </el-form-item>
      </el-form>
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" type="selection" />
          <el-table-column align="center" label="批次" prop="id" sortable />
          <el-table-column align="center" label="供应商名称" prop="name" />
          <el-table-column align="center" label="数量" prop="num" />
          <el-table-column align="center" label="金额" prop="total" />
          <el-table-column
            align="center"
            label="商品信息"
            prop="goods"
            width="300"
          >
            <template #default="{ row }">
              <div style="display: flex">
                <el-image
                  :src="row.goods.img"
                  style="width: 100px; height: 100px"
                />
                <div style="margin-left: 10px">
                  <div
                    style="
                      width: 150px;
                      margin: 20px 0;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ row.goods.name }}
                  </div>
                  <div>{{ row.goods.sn }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="入库仓库"
            prop="warehouse_name"
          />
          <el-table-column align="center" label="时间" prop="create_time" />
          <el-table-column align="center" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:SupplierWarehousereceipt:view']"
                type="text"
              >
                详情
              </el-button>
              <el-button type="text" @click="handleDelete(row)">作废</el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/BandEdit'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: { Edit },
    mixins: [datajosn],
    data() {
      return {
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          supplier_type: '',
          keywords: '',
          type: '',
          warehouse: '',
          time: [],
          page: 1,
          pageSize: 10,
        },
        supplier_type: [],
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
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
      this.fetchData()
      this.getSelectData()
    },
    methods: {
      async getSelectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'supplier_type',
        })
        this.supplier_type = data.supplier_type
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要作废当前项吗', null, async () => {
            const { code } = await this.api.delBandDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('作废成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getInboundOrder(this.formTemp)
        this.list = data.list.data
        this.total = data.list.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
