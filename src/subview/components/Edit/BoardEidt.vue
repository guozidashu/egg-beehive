<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="50%"
    @close="close"
  >
    <div style="padding: 0 20px; background-color: white; border-radius: 5px">
      <QYList :list="goodsOwedList" :list-type="2" :state="listLoading">
        <template #List>
          <el-table-column
            align="center"
            label="颜色"
            prop="color"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="尺码"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="订货件数"
            prop="order_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="欠货件数"
            prop="not_delivery_num"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </div>
  </el-dialog>
</template>

<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 欠货明细 表格数据
        listTotal: 0,
        listLoading: false,
        listType: 1,
        goodsOwedList: [],
        title: '',
        dialogFormVisible: false,
        goods_id: null,
      }
    },
    watch: {},
    created() {},
    methods: {
      showEdit(row) {
        this.title = '明细'
        this.goods_id = row.goods_id
        this.dialogFormVisible = true
        this.getGoodsOwedTableList()
      },
      close() {
        this.dialogFormVisible = false
      },
      // 获取欠货明细表格
      async getGoodsOwedTableList() {
        this.listLoading = true
        const { data } = await this.api.getWarehouseAnalysisRankDetail({
          goods_id: this.goods_id,
        })
        this.goodsOwedList = data
        this.listLoading = false
      },
    },
  }
</script>
