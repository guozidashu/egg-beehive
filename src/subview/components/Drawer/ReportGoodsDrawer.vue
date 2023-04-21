<template>
  <div style="padding: 0 20px">
    <div
      style="
        position: relative;
        display: flex;
        width: 100%;
        margin-bottom: 20px;
      "
    >
      <el-image
        :src="form.img"
        style="width: 50px; height: 50px; border-radius: 5px"
      >
        <div slot="error" class="el-image__error">暂无图片</div>
      </el-image>
      <div style="margin-left: 10px">
        <div style="margin: 8px 0 8px 0">{{ form.name }}</div>
        <div>{{ form.sn }}</div>
      </div>
      <div style="position: absolute; right: 0; padding-top: 10px">
        <span style="margin-right: 10px">时间筛选：</span>
        <el-date-picker
          v-model="time"
          align="right"
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
      </div>
    </div>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in cardList" :key="index" :span="6">
        <el-card class="box-card" shadow="never" style="border-radius: 5px">
          <div style="padding: 20px">
            <div style="margin-bottom: 10px; font-size: 14px; color: gray">
              {{ item.title }}
            </div>
            <div
              v-if="item.type == 2"
              style="font-size: 18px; font-weight: 600"
            >
              ￥{{ item.value | moneyFormat }}
            </div>
            <div v-else style="font-size: 18px; font-weight: 600">
              {{ item.value }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <QYList
      :list="list"
      :list-type="listType"
      :state="listLoading"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <template #List>
        <el-table-column align="center" label="排行" type="index" width="60">
          <template slot-scope="scope">
            <QYRanking
              :index="scope.$index"
              :page="formList.page"
              :page-size="formList.pageSize"
              :type="1"
            />
          </template>
        </el-table-column>
        <el-table-column label="客户名称" prop="name" />
        <el-table-column label="拿货件数" prop="num" width="100" />
        <el-table-column
          v-if="form.goods_type == 2"
          label="颜色"
          prop="colorname"
          width="100"
        />
        <el-table-column
          v-if="form.goods_type == 2"
          label="尺码"
          prop="sizename"
          width="100"
        />
        <el-table-column
          align="right"
          label="拿货金额"
          prop="total"
          width="150"
        >
          <template #default="{ row }">
            <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已发货数量" prop="delivery_num" width="100" />
        <el-table-column
          label="未发货数量"
          prop="not_delivery_num"
          width="100"
        />
        <el-table-column label="退货件数" prop="return_num" width="100" />
        <el-table-column align="right" label="实际退货率" width="100">
          <template #default="{ row }">
            {{ ((row.return_num / row.num) * 100).toFixed(2) | moneyFormat }}%
          </template>
        </el-table-column>
      </template>
    </QYList>
  </div>
</template>

<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        listLoading: false,
        listType: 1,
        list: [],
        time: [],
        form: JSON.parse(JSON.stringify(this.drawerInof)),
        total: 0,
        formList: {
          time: this.getYesterdayTime(),
          goods_id: null,
          page: 1,
          pageSize: 10,
        },
        cardList: [
          {
            title: '订单客户数',
            value: '0',
            name: 'order_customer',
            type: 1,
          },
          {
            title: '动销客户数',
            value: '0',
            name: 'delivery_order_customer',
            type: 1,
          },
          {
            title: '销售金额',
            value: '0',
            name: 'sale_amount',
            type: 2,
          },
          {
            title: '销售件数',
            value: '0',
            name: 'sale_num',
            type: 1,
          },
        ],
      }
    },

    watch: {
      drawerInof: {
        handler: function (newVal) {
          this.form = JSON.parse(JSON.stringify(newVal))
          if (newVal.goods_type == 2) {
            this.formList = {
              time: newVal.goods_time,
              stock_id: newVal.stock_id,
              page: 1,
              pageSize: 10,
            }
          } else {
            this.formList = {
              time: newVal.goods_time,
              goods_id: newVal.id,
              page: 1,
              pageSize: 10,
            }
          }
          this.time = newVal.goods_time
        },
        deep: true,
        // 初次监听
        immediate: true,
      },
      time: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
        // 初次监听
        immediate: true,
      },
    },
    created() {},
    methods: {
      // 分页
      changeBtnPage(data) {
        this.formList.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.formList.pageSize = data
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        if (this.form.goods_type == 2) {
          const { data } = await this.api.getGoodsDetailSpecificationAnalysis(
            this.formList
          )
          this.cardList.forEach((item) => {
            for (let i in data.list) {
              if (item.name == i) {
                if (data.list[i] == null) {
                  data.list[i] = 0
                  item.value = data.list[i]
                } else {
                  item.value = data.list[i]
                }
              }
            }
          })
          this.list = data.customers
          this.total = data.total
          this.listLoading = false
        } else {
          const { data } = await this.api.getGoodsDetailAnalysis(this.formList)
          this.cardList.forEach((item) => {
            for (let i in data.list) {
              if (item.name == i) {
                if (data.list[i] == null) {
                  data.list[i] = 0
                  item.value = data.list[i]
                } else {
                  item.value = data.list[i]
                }
              }
            }
          })
          this.list = data.customers
          this.total = data.total
          this.listLoading = false
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
