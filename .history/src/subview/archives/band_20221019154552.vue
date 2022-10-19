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
      @click="openDialog('add')"
    >
      添加波段
    </el-button>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      border
      :data="bandList"
      sortable
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
          <el-button
            size="small"
            style="color: #2d8cf0"
            type="text"
            @click="openDialog(row.id)"
          >
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
      :current-page.sync="page.pageNo"
      layout="prev, pager, next, jumper,sizes,total"
      :page-size.sync="page.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      style="margin-left: 200px"
      :total="Number(total)"
      @current-change="getWaveList"
      @size-change="getWaveList"
    />
    <!-- 弹框组件 -->
    <el-dialog
      :before-close="handleClose"
      :title="`${formdata.id ? '编辑波段' : '添加波段'}`"
      :visible.sync="dialogVisible"
      width="25%"
    >
      <span slot="footer" class="dialog-footer">
        <el-form label-width="104px" style="margin-top: -60px">
          <el-form-item label="波段名称：">
            <el-input v-model="formdata.name" style="width: 248px" />
          </el-form-item>
          <el-form-item label="是否默认：">
            <el-radio-group
              v-model="radio"
              style="width: 255px; margin-left: 0px"
            >
              <el-radio :label="3">关闭</el-radio>
              <el-radio :label="6">备开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品数量：">
            <el-input style="width: 248px" />
          </el-form-item>
        </el-form>
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getWaveList,
    deleteWave,
    addWave,
    editWave,
    updateWave,
  } from '@/api/basic'

  export default {
    data() {
      return {
        loading: false,
        total: '',
        radio: 3,
        formdata: {
          name: '',
        },
        page: {
          pageNo: 1,
          pageSize: 10,
        },
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
        this.loading = true
        try {
          const res = await getWaveList(this.page)
          // console.log(res)
          this.bandList = res.data.list
          this.total = res.data.total
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      async openDialog(val) {
        if (val == 'add') {
          console.log('添加')
        } else {
          console.log('编辑', val)
          const res = await editWave({ id: val })
          this.formdata = { id: val, name: res.data.name }
        }
        this.dialogVisible = true
      },
      handleClose() {
        this.formdata = {
          name: '',
        }
        this.dialogVisible = false
      },
      async del(id) {
        await this.$confirm('确认删除吗', '提示', { type: 'warning' })
        await deleteWave({ id: id })
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.getWaveList()
      },
      async add() {
        try {
          this.formdata.id
            ? await updateWave({
                id: this.formdata.id,
                name: this.formdata.name,
              })
            : await addWave(this.formdata)
          this.getWaveList()
          this.dialogVisible = false
          this.$message({
            message: `${this.formdata.id ? '编辑' : '添加'}成功`,
            type: 'success',
          })
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-input--small .el-input__inner {
    border-radius: 4px;
  }
</style>
