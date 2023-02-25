<template>
  <div>
    <QYList
      v-if="tabindex != '0'"
      :list="list"
      :list-type="listType"
      :state="state"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column
          v-if="
            tabindex == '1' ||
            tabindex == '2' ||
            tabindex == '3' ||
            tabindex == '4' ||
            tabindex == '5'
          "
          label="客户名称"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '1'"
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '1'"
          label="已发货数量"
          prop="delivery_num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '1'"
          label="未发货数量"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span>{{ row.num - row.delivery_num }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="tabindex == '2'"
          label="批次号"
          prop="id"
          width="50"
        />
        <el-table-column
          v-if="
            tabindex == '2' ||
            tabindex == '3' ||
            tabindex == '4' ||
            tabindex == '5'
          "
          label="订单号"
          prop="sn"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '2'"
          label="发货时间"
          prop="ctime"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '2'"
          label="发货数量"
          prop="num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '3'"
          label="退货时间"
          prop="ctime"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '3'"
          label="退货数量"
          prop="num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '4'"
          label="入库时间"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '4'"
          label="入库数量"
          prop="num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '5'"
          label="出库时间"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '5'"
          label="出库数量"
          prop="num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '6'"
          label="商品款号"
          prop="sn"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '6'"
          label="调整前"
          prop="fnum"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '6'"
          label="调整后"
          prop="tnum"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="尺码"
          prop="size_name"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="颜色"
          prop="color_name"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="聚水潭库存"
          prop="jst_xh_num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="聚水潭占用库存"
          prop="jst_occupy_num"
          width="150"
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="待发货数量"
          prop="df_num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="再生产数量"
          prop="zsc_num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="现货数量"
          prop="xh_num"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="tabindex == '7'"
          label="销量数量"
          prop="xl_num"
          show-overflow-tooltip
        />
      </template>
    </QYList>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      state: {
        type: Boolean,
        default: true,
      },
      listType: {
        type: Number,
        default: 0,
      },
      tabindex: {
        type: String,
        default: '1',
      },
    },
  }
</script>
