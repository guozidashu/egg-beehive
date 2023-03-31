<template>
  <el-dialog
    :append-to-body="true"
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <!-- 设置规格数量 -->
    <div v-if="editType == 1">
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
        <el-table-column label="颜色" prop="color_name" width="180" />
        <el-table-column label="尺码" prop="size_name" width="180" />
        <el-table-column label="件数" prop="num">
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
        v-model="completion_time"
        placeholder="选择日期时间"
        type="datetime"
      />
    </div>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
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
        //  2 设置预计完成时间 相关参数
        completion_time: null,
        completion_index: null,
      }
    },
    watch: {
      tableData: {
        handler: function (newVal) {
          // 根据 color_name 统计 num
          let colorArr = []
          let colorObj = {}
          newVal.forEach((item) => {
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
      showEdit(row, order_id, type) {
        console.log(row, order_id, type)
        if (type == 1) {
          this.title = '更改订单数量'
          this.tableData = JSON.parse(JSON.stringify(row))
          this.order_id = order_id
        } else if (type == 2) {
          this.title = '更改预计完成时间'
          this.completion_index = row
        }
        this.editType = type
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      async save() {
        if (this.editType == 1) {
          console.log(1111, this.order_id, this.tableData)
          const { code } = await this.api.editDocumentaryOrderSpec({
            order_id: this.order_id,
            spec: this.tableData,
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
