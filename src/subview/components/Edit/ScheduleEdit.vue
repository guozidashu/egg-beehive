<template>
  <el-dialog
    :append-to-body="true"
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <!-- 设置规格数量/创建裁床单，入库单 -->
    <div v-if="editType == 1 || editType == 5">
      <div v-if="colorBtnArr.length > 0">
        <el-badge
          v-for="(item, index) in colorBtnArr"
          :key="index"
          class="item"
          style="margin-right: 30px"
          :value="item.num"
        >
          <el-button size="small">
            {{ item.color_name }}
          </el-button>
        </el-badge>
      </div>
      <el-table border :data="tableData" style="width: 100%; margin-top: 20px">
        <el-table-column label="颜色" prop="color_name" />
        <el-table-column label="尺码" prop="size_name" />
        <el-table-column v-if="editType == 5" label="订单数" prop="num" />
        <el-table-column
          v-if="title == '填写入库单'"
          label="已入库"
          prop="entered_num"
        />
        <el-table-column
          v-if="title == '填写入库单'"
          label="将入库"
          prop="subNum"
        >
          <template #default="{ row }">
            <el-input
              v-model="row.subNum"
              placeholder="请输入件数"
              @input="row.subNum = $moneyFormatInput(row.subNum)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="title == '创建裁床单'"
          label="已裁数"
          prop="cut_num"
        />
        <el-table-column
          v-if="title == '创建裁床单'"
          label="将裁数"
          prop="subNum"
        >
          <template #default="{ row }">
            <el-input
              v-model="row.subNum"
              placeholder="请输入件数"
              @input="row.subNum = $moneyFormatInput(row.subNum)"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="editType == 1" label="件数" prop="num">
          <template #default="{ row }">
            <el-input
              v-model="row.num"
              placeholder="请输入件数"
              @input="row.num = $moneyFormatInput(row.num)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 设置预计完成时间 -->
    <div v-if="editType == 2">
      <el-date-picker
        v-model="estimate_completion_time"
        placeholder="选择日期时间"
        type="datetime"
      />
    </div>
    <!-- 查看裁床单，入库单 -->
    <div v-if="editType == 3">
      <div v-if="orderList.length > 0">
        <el-card
          v-for="(item, index) in orderList"
          :key="index"
          class="box-card"
          shadow="hover"
        >
          <div style="margin-bottom: 10px; text-align: right">
            <el-tag @click="handleDetail(item.order_id)">查看详情</el-tag>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            "
          >
            <div>批次ID：{{ item.order_id }}</div>
            <div>{{ item.create_time | formatTime }}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>订单编号：{{ item.order_sn }}</div>
            <div>{{ item.order_num }}件</div>
          </div>
        </el-card>
      </div>
      <el-image
        v-else
        class="vab-data-empty"
        :src="require('@/assets/empty_images/data_empty.png')"
      />
    </div>
    <!-- 创建裁床单，入库单 -->
    <div v-if="editType == 5">
      <div v-if="title == '创建裁床单'">
        <div style="margin: 20px 0">裁床单备注</div>
        <el-input
          v-model="remarks"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输裁床单备注"
          type="textarea"
        />
      </div>
      <!-- <div v-if="title == '填写入库单'">
        <div
          :style="{
            padding: '10px',
            margin: ' 20px 0',
            color: receipt_type == 2 ? 'white' : '#5e5e5e',
            backgroundColor: receipt_type == 2 ? '#3B74C5' : '#e3e4e4',
            borderRadius: '10px',
          }"
          @click="change(2)"
        >
          <div>从裁床单入库</div>
          <div>将会减少在生产库存，增加成品库存数量</div>
        </div>
        <div
          :style="{
            padding: '10px',
            color: receipt_type == 4 ? 'white' : '#5e5e5e',
            backgroundColor: receipt_type == 4 ? '#3B74C5' : '#e3e4e4',
            borderRadius: '10px',
          }"
          @click="change(4)"
        >
          <div>从裁床单入库到聚水潭主仓</div>
          <div>
            将会减少在生产库存，增加聚水潭库存（请去通用暂存上架到具体仓位）
          </div>
        </div>
        <div style="margin: 20px 0">入库单备注</div>
        <el-input
          v-model="remarks"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入库单备注"
          type="textarea"
        />
      </div> -->
    </div>
    <!-- 新增跟进 -->
    <div v-if="editType == 6">
      <el-form class="demo-form-inline" :model="formInline">
        <el-form-item label="相关跟进">
          <el-radio-group v-model="formInline.node_id">
            <el-radio
              v-for="(item, index) in nodeList"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-input
          v-model="formInline.content"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入备注"
          type="textarea"
        />
      </el-form>
    </div>
    <template #footer v-if="editType != 3">
      <el-button @click="close">取 消</el-button>
      <el-button v-if="editType != 5" type="primary" @click="save">
        确 定
      </el-button>
      <el-button v-else type="primary" @click="save">确认创建</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        // 订单id
        order_id: null,
        // 弹窗类型 1 设置规格数量 2 设置预计完成时间
        editType: null,
        //弹窗类型 1 设置规格数量相关参数
        tableData: [],
        colorBtnArr: [],
        //弹窗类型  2 设置预计完成时间 相关参数
        estimate_completion_time: null, // 预计完成时间
        node_id: null, // 节点id
        //弹窗类型  3 裁床单列表 相关参数
        // 列表类型  ('cutting':裁床单, 'storage':入库单)
        orderList: [],
        listType: null,
        // 弹窗类型  5 创建裁床单，入库单 相关参数
        remarks: null, // 备注
        receipt_type: 2, // 入库单 入库类型  2=生产入库 4=聚水潭生产入库
        // 弹窗类型  6 新增跟进 相关参数
        nodeList: [],
        formInline: {
          node_id: null,
          content: '',
        },
      }
    },
    watch: {
      tableData: {
        handler: function (newVal) {
          // 根据 color_name 统计 num
          let colorArr = []
          let colorObj = {}
          newVal.forEach((item) => {
            if (this.editType == 5) {
              if (colorObj[item.color_name]) {
                colorObj[item.color_name].num =
                  Number(colorObj[item.color_name].num) + Number(item.subNum)
              } else {
                colorObj[item.color_name] = {
                  color_name: item.color_name,
                  color_id: item.color_id,
                  num: item.subNum,
                }
              }
            } else {
              if (colorObj[item.color_name]) {
                colorObj[item.color_name].num =
                  Number(colorObj[item.color_name].num) + Number(item.num)
              } else {
                colorObj[item.color_name] = {
                  color_name: item.color_name,
                  color_id: item.color_id,
                  num: item.num,
                }
              }
            }
          })
          for (let key in colorObj) {
            colorArr.push(colorObj[key])
          }
          this.colorBtnArr = colorArr
        },
        immediate: true,
        deep: true,
      },
    },
    methods: {
      // 弹窗类型  5 入库类型
      change(type) {
        this.receipt_type = type
      },
      // 弹窗类型，type 1 设置规格数量 2 设置预计完成时间 3 查看相关裁床单 (row ,'cutting':裁床单, 'storage':入库单)
      // 4 修改节点状态（status,1=进行中 2=已完成 3=已跳过) 5 创建单据（status :1=裁床单创建，2入库单创建 title:node_id）
      // 6 新增跟进
      async showEdit(row, order_id, type, status, title) {
        this.order_id = order_id
        this.editType = type
        if (type == 1 || type == 5) {
          if (type == 1) {
            this.title = '更改订单数量'
          } else {
            this.node_id = title
            if (status == 1) {
              this.title = '创建裁床单'
            } else {
              this.title = '填写入库单'
            }
          }
          this.tableData = JSON.parse(JSON.stringify(row))
        } else if (type == 2) {
          this.title = '更改预计完成时间'
          this.node_id = row
        } else if (type == 3) {
          if (row == 'cutting') {
            this.title = '裁床单列表'
            const { data } = await this.api.getCuttingOrderList({
              order_id: order_id,
              page: 1,
              pageSize: 20,
            })
            this.listType = row
            this.orderList = data.list
          } else if (row == 'storage') {
            this.title = '入库单列表'
            const { data } = await this.api.getInboundOrderList({
              order_id: order_id,
              page: 1,
              pageSize: 20,
            })
            this.listType = row
            this.orderList = data.list
          }
        } else if (type == 6) {
          this.title = '新增跟进'
          this.nodeList = row
          this.formInline.node_id = row[0].id
        }
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      handleDetail(row) {
        if (this.title == '裁床单列表') {
          this.$router.push({
            path: '/supplier/supplierCutbedsheet',
            query: {
              id: row,
            },
          })
        } else if (this.title == '入库单列表') {
          this.$router.push({
            path: '/supplier/supplierWarehousereceipt',
            query: {
              id: row,
            },
          })
        }
      },
      async save() {
        if (this.editType == 1) {
          const { code } = await this.api.editDocumentaryOrderSpec({
            order_id: this.order_id,
            spec: this.tableData,
          })
          if (code == 200) {
            this.$message.success('新增成功')
            this.$emit('fetch-data')
            this.dialogFormVisible = false
          }
        } else if (this.editType == 2) {
          const { code } = await this.api.editNodeEstimateDate({
            order_id: this.order_id,
            node_id: this.node_id,
            estimate_completion_time:
              new Date(this.estimate_completion_time).getTime() / 1000,
          })
          if (code == 200) {
            this.$message.success('修改成功')
            this.$emit('fetch-data')
            this.dialogFormVisible = false
          }
        } else if (this.editType == 5) {
          if (this.title == '创建裁床单') {
            let spec = []
            this.tableData.forEach((item) => {
              if (item.subNum != 0) {
                spec.push({
                  color_id: item.color_id,
                  size_id: item.size_id,
                  num: item.subNum,
                })
              }
            })
            const { code } = await this.api.editCreateCuttingOrder({
              order_id: this.order_id,
              node_id: this.node_id,
              remark: this.remarks,
              spec: spec,
            })
            if (code == 200) {
              this.$message.success('创建成功')
              this.$emit('fetch-data')
              this.dialogFormVisible = false
            }
          } else if (this.title == '填写入库单') {
            let spec = []
            this.tableData.forEach((item) => {
              if (item.subNum != 0) {
                spec.push({
                  color_id: item.color_id,
                  size_id: item.size_id,
                  num: item.subNum,
                })
              }
            })
            const { code } = await this.api.editFillInboundNum({
              order_id: this.order_id,
              node_id: this.node_id,
              spec: spec,
            })
            if (code == 200) {
              this.$message.success('填写成功')
              this.$emit('fetch-data')
              this.dialogFormVisible = false
            }
          }
        } else if (this.editType == 6) {
          const { code } = await this.api.editDocumentaryOrderFollowSave({
            order_id: this.order_id,
            node_id: this.formInline.node_id,
            content: this.formInline.content,
          })
          if (code == 200) {
            this.$message.success('新增成功')
            this.$emit('fetch-data')
            this.dialogFormVisible = false
          }
        }
      },
    },
  }
</script>
