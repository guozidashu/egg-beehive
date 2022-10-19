<template>
  <div style="padding-top: 20px">
    <el-form label-width="100px">
      <el-row type="flex">
        <el-form-item label="状态：" style="margin-left: 30px">
          <el-select
            v-model="value"
            placeholder="请选择"
            style="width: 248px; border-radius: 20px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="等级名称：" style="margin-left: 20px">
          <el-input placeholder="请输入等级名称" style="width: 250px" />
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: -80px" type="primary">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 分割 -->
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <el-button
      style="margin-top: 20px; margin-left: 20px"
      type="primary"
      @click="dialogMember('add')"
    >
      添加会员等级
    </el-button>
    <!-- 弹框组件 -->
    <member ref="memberDialog" :dialog-visible.sync="dialogVisible" />
    <!-- 表格部分 -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%; margin-top: 20px"
      tooltip-effect="dark"
    >
    <el-table-column
      type="selection"
      width="55">
      <el-table-column label="ID" prop="id" width="80" />
      <el-table-column label="等级图标" width="200">
        <template slot-scope="{ row }">
          <img alt="" :src="row.img" style="width: 36px; height: 36px" />
        </template>
      </el-table-column>
      <el-table-column label="等级名称" prop="name" width="200" />
      <el-table-column
        label="客户数量"
        prop="address"
        show-overflow-tooltip
        width="200"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="$router.push('/customer/customerLevel')"
          >
            {{ row.address }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="整批折扣" prop="des" width="200" />
      <el-table-column label="散批折扣" prop="zhekou_sm" width="200" />
      <el-table-column label="散批" prop="sp" width="200">
        <template slot-scope="{ row }">
          <span v-show="row.sp == 0">不允许</span>
          <span v-show="row.sp == 1">允许</span>
        </template>
      </el-table-column>
      <el-table-column label="等级说明" prop="num" width="160" />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button size="small" type="text" @click.native="dialogMember(row)">
            编辑丨
          </el-button>
          <el-dropdown>
            <span
              class="el-dropdown-link"
              style="font-size: 12px; color: #1890ff"
            >
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="del(row.id)">
                删除等级
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      @current-change="getGradeList"
      @size-change="getGradeList"
    />
  </div>
</template>

<script>
  import { getGradeList, deleteGrade, editGrade } from '@/api/basic'
  import member from './components/member.vue'
  export default {
    components: {
      member,
    },
    data() {
      return {
        loading: false,
        total: '',
        page: {
          pageNo: 1,
          pageSize: 10,
        },
        dialogVisible: false,
        options: [
          {
            value: '选项1',
            label: '显示',
          },
          {
            value: '选项2',
            label: '不显示',
          },
        ],
        value: '',
        tableData: [],
        multipleSelection: [],
      }
    },
    created() {
      this.getGradeList()
    },
    methods: {
      async del(id) {
        await this.$confirm('确认删除吗', '提示', { type: 'warning' })
        // console.log(id)
        await deleteGrade({ id: id })
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.getGradeList()
        // console.log(res)
      },
      async dialogMember(val) {
        if (val === 'add') {
          // console.log(45646, val)
        } else {
          // console.log(111111111, val)
          const res = await editGrade({ id: val.id })
          console.log(res)
          this.$refs.memberDialog.numberValidateForm = {
            id: val.id,
            name: res.data.name,
          }
        }
        this.dialogVisible = true

        // console.log(this.$refs.memberDialog)
      },
      async getGradeList() {
        this.loading = true
        try {
          const res = await getGradeList(this.page)
          // console.log(res)
          this.tableData = res.data.list
          this.total = res.data.total
          this.tableData.forEach((item) => {
            Object.assign(item, {
              img: 'https://s-pro.crmeb.net/uploads/system/58908a8c245f422da6e0924dec27c95d.png',
            })
          })
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
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
