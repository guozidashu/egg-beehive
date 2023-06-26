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
    <div v-if="tabindex == '6'">
      <el-table
        ref="expandstable"
        v-loading="state"
        border
        class="GoodsDrawerList"
        :data="list"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
        style="width: 100%"
      >
        <el-table-column type="expand" width="1">
          <template slot-scope="props">
            <el-table :data="props.row.detail" style="width: 100%">
              <el-table-column label="颜色" prop="color_name" />
              <el-table-column label="尺码" prop="size_name" />
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
                label="变动值"
                prop="num"
                show-overflow-tooltip
              />
            </el-table>
          </template>
        </el-table-column>
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
          label="变动值"
          prop="num"
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
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          prop="unit"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              class="fs-16"
              size="medium"
              type="text"
              @click="expandsHandle(scope.row)"
            >
              更多
              <i class="el-icon-arrow-down el-icon--right fs-20"></i>
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-image
            class="vab-data-empty"
            :src="require('@/assets/empty_images/data_empty.png')"
          />
        </template>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        :current-page="page"
        layout="total, sizes, prev, pager,next,jumper"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @current-change="changePage"
        @size-change="changePageSize"
      />
    </div>

    <!-- <QYList
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
    </QYList> -->
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
        default: 20,
      },
    },
    data() {
      return {
        //设置row-key只展示一行
        expands: [], //只展开一行放入当前行id
        getRowKeys: (row) => {
          //获取当前行id
          return row.id //这里看这一行中需要根据哪个属性值是id
        },
      }
    },
    methods: {
      changePage(val) {
        this.$emit('changePage', val)
      },
      changePageSize(val) {
        this.$emit('changePageSize', val)
      },
      // 款号欠货明细表格展开
      async expandsHandle(row) {
        this.$refs.expandstable.toggleRowExpansion(row)
      },
    },
  }
</script>
<style lang="scss">
  .GoodsDrawerList .el-icon-arrow-right {
    opacity: 0;
  }
</style>
