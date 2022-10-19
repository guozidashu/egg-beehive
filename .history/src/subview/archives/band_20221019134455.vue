<template>
  <div style="padding-top: 20px">
    <el-form label-width="100px">
      <el-row type="flex">
        <el-form-item label="波段搜索：" style="margin-left: 50px">
          <el-input style="width: 248px" />
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: -80px" type="primary">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <el-button
      style="margin-top: 20px; margin-left: 20px"
      type="primary"
      @click="openDialog"
    >
      添加波段
    </el-button>
    <el-table
      ref="multipleTable"
      border
      :data="bandList"
      style="width: 100%; margin-top: 20px"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column
        align="center"
        label="波段名称"
        prop="name"
        width="420"
      />
      <el-table-column align="center" label="商品数量" width="320">
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="$router.push('/goods/goodsStatistical')"
          >
            {{ row.ddid }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="address"
        show-overflow-tooltip
        width="600"
      />
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="{ row }">
          <el-button size="small" style="color: #2d8cf0" type="text">
            编辑丨
          </el-button>
          <el-button
            size="small"
            style="margin-left: -2px; color: #2d8cf0"
            type="text"
            @click="del(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      :current-page.sync="currentPage3"
      layout="prev, pager, next, jumper"
      :page-size="100"
      style="margin-left: 200px"
      :total="1000"
    />
    <el-dialog
      :before-close="handleClose"
      title="提示"
      :visible.sync="dialogVisible"
      width="20%"
    >
      <span slot="footer" class="dialog-footer">
        <el-form label-width="104px" style="margin-top: -60px">
          <el-form-item label="波段名称：" style="margin-left: -30px">
            <el-input style="" />
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getWaveList, deleteWave } from '@/api/basic'
  export default {
    data() {
      return {
        page: {
          pageNo: '1',
          pageSize: '10',
        },
        currentPage3: 5,
        tableData: [
          {
            date: '春季',
            name: '100',
            address: '请开启 JavaScript 功能来使用 CRMEB。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '夏季',
            name: '312',
            address: ' BY FAR Miranda leather shoulder bag |默认',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '春季',
            name: '2132',
            address: '上海市普陀区金沙江路 1518 弄大声道撒多sadsad撒撒的',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '秋季',
            name: '90',
            address: '【供应商】金枕榴莲 新鲜水果 整果带壳特产 5-6斤1个装 | ',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '冬季',
            name: '100',
            address: '【供应商】金枕榴莲 新鲜水果 整果带壳特产 5-6斤1个装 | ',
            editor: '编辑',
            delete: '删除',
          },
        ],
        bandList: [],
        multipleSelection: [],
        dialogVisible: false,
      }
    },
    created() {
      this.getWaveList()
    },
    methods: {
      async getWaveList() {
        const res = await getWaveList(this.page)
        console.log(res)
        this.bandList = res.data.list
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      openDialog() {
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      },
      async del(id) {
        const res = await deleteWave(id)
        console.log(res)
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-input--small .el-input__inner {
    border-radius: 4px;
  }
</style>
