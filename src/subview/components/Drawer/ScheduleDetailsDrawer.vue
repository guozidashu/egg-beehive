<template>
  <div class="components-drawer" style="padding: 0 20px">
    <div style="display: flex; justify-content: space-between">
      <h4>商品信息</h4>
      <div><el-button size="small" type="primary">作废此单</el-button></div>
    </div>
    <div style="display: flex">
      <el-image :src="form.goods_img" style="width: 100px; height: 100px" />
      <div style="margin-left: 20px">
        <div style="margin-bottom: 10px">款号：{{ form.goods_sn }}</div>
        <div style="margin-bottom: 10px">名称：{{ form.goods_name }}</div>
        <div style="margin-bottom: 10px">波段：{{ form.goods_band }}</div>
        <div>创建时间：{{ form.create_time | formatTime }}</div>
      </div>
    </div>
    <h4>跟单信息</h4>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">批次：{{ form.order_id }}</div>
      <div style="width: 50%">
        跟单状态：
        <el-tag v-if="form.order_status == 1">正常</el-tag>
        <el-tag v-if="form.order_status == 2" type="warning">预警</el-tag>
        <el-tag v-if="form.order_status == 3" type="danger">超期</el-tag>
        <el-tag v-if="form.order_status == 4" type="success">已完成</el-tag>
      </div>
    </div>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">单号：{{ form.order_sn }}</div>
      <div style="width: 50%">
        优先度：
        <el-tag v-if="form.order_priority == 1">正常</el-tag>
        <el-tag v-if="form.order_priority == 2" type="warning">紧急</el-tag>
        <el-tag v-if="form.order_priority == 3" type="danger">加急</el-tag>
      </div>
    </div>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">制单人：{{ form.employee_name }}</div>
      <div style="width: 50%">
        跟单类型：
        <el-tag v-if="form.order_type == 1">期货</el-tag>
        <el-tag v-if="form.order_type == 2" type="success">首单</el-tag>
        <el-tag v-if="form.order_type == 3" type="warning">补单</el-tag>
        <el-tag v-if="form.order_type == 4" type="danger">预售</el-tag>
      </div>
    </div>
    <div>预计交货日期：{{ form.order_expected_date | formatTime }}</div>
    <div style="display: flex; justify-content: space-between">
      <h4>数量信息</h4>
      <div>
        <el-button
          size="small"
          type="primary"
          @click="handleEdit(form.spec, form.order_id, 1)"
        >
          编辑此单
        </el-button>
      </div>
    </div>
    <el-table :data="form.spec" show-summary style="width: 100%">
      <el-table-column label="颜色" prop="color_name" />
      <el-table-column label="尺码" prop="size_name" />
      <el-table-column label="订单数" prop="num" />
      <el-table-column label="实裁数" prop="cut_num" />
      <el-table-column label="在生产" prop="zsc_num" />
      <el-table-column label="已入库" prop="entered_num" />
    </el-table>
    <h4>跟单流程</h4>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in form.node"
        :key="index"
        placement="top"
      >
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <div style="display: flex; justify-content: space-between">
              <div style="margin-top: 10px">
                {{ item.name }} {{ item.status_text }}
              </div>
              <el-dropdown>
                <el-button type="primary">
                  操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- "type": 1, // 类型：1=建裁床单 2= 建入库单 3=无操作
                  "status": 0, // 状态 0=未开始 1=已开始 2=已完成 -->
                  <el-dropdown-item @click="handleEdit(1, form.order_id, 2)">
                    设置预计完成时间
                  </el-dropdown-item>
                  <template v-if="item.type == 1">
                    <template v-if="item.status == 1">
                      <el-dropdown-item>查看相关裁床单</el-dropdown-item>
                      <el-dropdown-item>填写实裁数量</el-dropdown-item>
                      <el-dropdown-item>完成裁床裁剪</el-dropdown-item>
                    </template>
                    <template v-if="item.status == 2">
                      <el-dropdown-item>查看相关裁床单</el-dropdown-item>
                    </template>
                  </template>
                  <template v-if="item.type == 2">
                    <template v-if="item.status == 0">
                      <el-dropdown-item>查看相关入库单</el-dropdown-item>
                      <el-dropdown-item>开始成品入库</el-dropdown-item>
                    </template>
                    <template v-if="item.status == 1">
                      <el-dropdown-item>查看相关入库单</el-dropdown-item>
                      <el-dropdown-item>填写入库数量</el-dropdown-item>
                      <el-dropdown-item>完成成品入库</el-dropdown-item>
                    </template>
                    <template v-if="item.status == 2">
                      <el-dropdown-item>查看相关入库单</el-dropdown-item>
                    </template>
                  </template>
                  <template v-if="item.type == 3">
                    <template v-if="item.status == 0">
                      <el-dropdown-item>开始{{ item.name }}</el-dropdown-item>
                      <el-dropdown-item>跳过{{ item.name }}</el-dropdown-item>
                    </template>
                    <template v-if="item.status == 1">
                      <el-dropdown-item>完成{{ item.name }}</el-dropdown-item>
                      <el-dropdown-item>跳过{{ item.name }}</el-dropdown-item>
                    </template>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div style="text-align: right">
            预计完成日期：
            <span v-if="item.estimate_completion_time == 0">未设置</span>
            <span v-else>
              {{ item.estimate_completion_time | formatTime }}
            </span>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/ScheduleEdit'
  export default {
    name: 'ComponentsDrawer',
    components: { Edit },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        form: {},
      }
    },
    watch: {
      drawerInof: {
        handler: function (newVal) {
          this.getDetail(newVal)
          this.getFollowList(newVal)
        },
        immediate: true,
        deep: true,
      },
    },
    created() {},
    methods: {
      async handleEdit(row, order_id, type) {
        // type 1 设置规格数量 2 设置预计完成时间
        this.$refs['edit'].showEdit(row, order_id, type)
      },

      async getDetail(row) {
        const { data } = await this.api.getDocumentaryOrderDetail({
          order_id: row.order_id,
        })
        this.form = JSON.parse(JSON.stringify(data))
      },
      async getFollowList(row) {
        const { data } = await this.api.getDocumentaryOrderFollowList({
          order_id: row.order_id,
        })
        console.log(9999, data)
        // this.FollowList = JSON.parse(JSON.stringify())
      },

      fetchData() {
        this.getDetail(this.drawerInof)
      },
    },
  }
</script>
<style lang="scss" scoped></style>
