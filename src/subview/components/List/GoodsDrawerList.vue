<template>
  <div>
    <QYList
      v-if="tabindex == '1'"
      :list="list"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="state"
      style="margin: 20px"
      :total="total"
      @changePage="changePage"
      @changePageSize="changePageSize"
    >
      <template #List>
        <el-table-column align="center" label="批次号" prop="id" width="80" />
        <el-table-column label="客户信息" width="300">
          <template #default="{ row }">
            <div style="display: flex">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.avatar"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image :src="row.avatar" style="width: 80px; height: 80px">
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
              <div style="margin-left: 10px">
                <div>
                  {{ row.name }}
                </div>
                <div style="display: flex; width: 100%; margin: 5px 0">
                  <el-tag type="success">{{ row.level_name }}</el-tag>
                  &nbsp;
                  <el-tag type="warning">{{ row.type_name }}</el-tag>
                  &nbsp;
                </div>
                <div style="margin: 5px 0 0 0">{{ row.cu_create }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品数量"
          prop="num"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="订单金额"
          prop="total"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="订单来源" show-overflow-tooltip>
          <template #default="{ row }">
            <span v-if="row.online == 1">线上订单</span>
            <span v-if="row.online == 0">线下订单</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="create_time"
          width="200"
        />
      </template>
    </QYList>
    <QYList
      v-if="tabindex == '2'"
      :list="list"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="state"
      style="margin: 20px"
      :total="total"
      @changePage="changePage"
      @changePageSize="changePageSize"
    >
      <template #List>
        <el-table-column align="center" label="批次号" prop="id" width="80" />
        <el-table-column label="客户信息" width="300">
          <template #default="{ row }">
            <div style="display: flex">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.avatar"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image :src="row.avatar" style="width: 80px; height: 80px">
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
              <div style="margin-left: 10px">
                <div>
                  {{ row.name }}
                </div>
                <div style="display: flex; width: 100%; margin: 5px 0">
                  <el-tag type="success">{{ row.level_name }}</el-tag>
                  &nbsp;
                  <el-tag type="warning">{{ row.type_name }}</el-tag>
                  &nbsp;
                </div>
                <div style="margin: 5px 0 0 0">{{ row.cu_create }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发货数量"
          prop="num"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="发货金额"
          prop="total"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="订单来源" show-overflow-tooltip>
          <template #default="{ row }">
            <span v-if="row.online == 1">线上订单</span>
            <span v-if="row.online == 0">线下订单</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发货时间"
          prop="ctime"
          width="200"
        />
      </template>
    </QYList>
    <QYList
      v-if="tabindex == '3'"
      :list="list"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="state"
      style="margin: 20px"
      :total="total"
      @changePage="changePage"
      @changePageSize="changePageSize"
    >
      <template #List>
        <el-table-column align="center" label="批次号" prop="id" width="80" />
        <el-table-column label="客户信息" width="300">
          <template #default="{ row }">
            <div style="display: flex">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.avatar"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image :src="row.avatar" style="width: 80px; height: 80px">
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
              <div style="margin-left: 10px">
                <div>
                  {{ row.name }}
                </div>
                <div style="display: flex; width: 100%; margin: 5px 0">
                  <el-tag type="success">{{ row.level_name }}</el-tag>
                  &nbsp;
                  <el-tag type="warning">{{ row.type_name }}</el-tag>
                  &nbsp;
                </div>
                <div style="margin: 5px 0 0 0">{{ row.cu_create }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退货数量"
          prop="num"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="退货金额"
          prop="total"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="订单来源" show-overflow-tooltip>
          <template #default="{ row }">
            <span v-if="row.jst_external_id == null">erp订单</span>
            <span v-else>聚水潭订单</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退货时间"
          prop="ctime"
          width="200"
        />
      </template>
    </QYList>
    <QYList
      v-if="tabindex == '6'"
      :list="list"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="state"
      style="margin: 20px"
      :total="total"
      @changePage="changePage"
      @changePageSize="changePageSize"
    >
      <template #List>
        <el-table-column
          align="center"
          label="动作"
          prop="remark"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="调整变动后"
          prop="tnum"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="变动前"
          prop="fnum"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="操作人"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="创建时间"
          prop="ctime"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <QYList
      v-if="tabindex == '7'"
      :list="list"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="state"
      style="margin: 20px"
      :total="total"
      @changePage="changePage"
      @changePageSize="changePageSize"
    >
      <template #List>
        <el-table-column
          align="center"
          label="颜色"
          prop="color_name"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="尺码"
          prop="size_name"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="销量"
          prop="xl_num"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="自有仓库存"
          prop="xh_num"
          width="150"
        />
        <el-table-column
          align="center"
          label="聚水潭可用库存"
          prop="jst_xh_num"
          width="150"
        />
        <el-table-column
          align="center"
          label="聚水潭占用库存"
          prop="jst_occupy_num"
          width="150"
        />
        <el-table-column
          align="center"
          label="待发货"
          prop="df_num"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="生产中"
          prop="zsc_num"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <!-- <QYList
      v-if="tabindex == '8'"
      :list="list"
      :list-type="listType"
      :page-no="page"
      :page-size="pageSize"
      :state="state"
      style="margin: 20px"
      :total="total"
      @changePage="changePage"
      @changePageSize="changePageSize"
    >
      <template #List>
        <el-table-column
          align="center"
          label="商品ID"
          prop="sn"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="操作记录"
          prop="fnum"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="操作人"
          prop="tnum"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="操作时间"
          prop="tnum"
          show-overflow-tooltip
        />
      </template>
    </QYList> -->
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
      total: {
        type: Number,
        default: 0,
      },
      page: {
        type: Number,
        default: 1,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
    },
    methods: {
      changePage(val) {
        this.$emit('changePage', val)
      },
      changePageSize(val) {
        this.$emit('changePageSize', val)
      },
    },
  }
</script>
