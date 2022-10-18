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
      @click="dialogMember"
    >
      添加会员等级
    </el-button>
    <!-- 弹框组件 -->
    <member :dialog-visible.sync="dialogVisible" />
    <!-- 表格部分 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%; margin-top: 20px"
      tooltip-effect="dark"
    >
      <el-table-column label="ID" type="index" width="80" />
      <el-table-column label="等级图标" width="200">
        <template slot-scope="{ row }">
          <img alt="" :src="row.date" style="width: 36px; height: 36px" />
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
      <el-table-column label="整批折扣" prop="BulkDiscount" width="200" />
      <el-table-column label="散批折扣" prop="BulkDiscount" width="200" />
      <el-table-column label="散批" prop="allow" width="200" />
      <el-table-column label="等级说明" prop="num" width="160" />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button size="small" type="text" @click="dialogMember()">
            {{ row.editor }}丨
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
              <el-dropdown-item @click="del(row.id)">删除等级</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      :current-page.sync="currentPage3"
      layout="prev, pager, next, jumper"
      :page-size="100"
      style="margin-left: 1000px"
      :total="1000"
    />
  </div>
</template>

<script>
  import member from './components/member.vue'
  export default {
    components: {
      member,
    },
    data() {
      return {
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
        currentPage3: 5,
        value: '',
        tableData: [
          {
            date: 'https://s-pro.crmeb.net/uploads/system/fbacd351e606f494431a9c777ce7522c.png',
            name: '黄金会员',
            address: '10',
            BulkDiscount: '3.5',
            BulkBatchDiscount: '10',
            allow: '不允许',
            num: '12',
            editor: '编辑',
          },
          {
            date: 'https://s-pro.crmeb.net/uploads/system/58908a8c245f422da6e0924dec27c95d.png',
            name: '白金会员',
            address: '20',
            BulkDiscount: '3.5',
            BulkBatchDiscount: '3.8',
            allow: '允许',
            num: '10',
            editor: '编辑',
          },
          {
            date: 'https://s-pro.crmeb.net/uploads/system/e3d227d703e847a02655132f223436f8.png',
            name: '铂金会员',
            address: '3',
            BulkDiscount: '2.8',
            BulkBatchDiscount: '3.5',
            allow: '允许',
            num: '8',
            editor: '编辑',
          },
          {
            date: 'https://s-pro.crmeb.net/uploads/system/7adae9b31744480adf98a5c28a4ea095.png',
            name: '青铜会员',
            address: '20',
            BulkDiscount: '3',
            BulkBatchDiscount: '3',
            allow: '允许',
            num: '6',
            editor: '编辑',
          },
          {
            date: '	https://s-pro.crmeb.net/uploads/system/f834709c81367d94f5fb67d82a7d34bd.png',
            name: '钻石会员',
            address: '5',
            BulkDiscount: '3.8',
            BulkBatchDiscount: '2.8',
            allow: '允许',
            num: '1',
            editor: '编辑',
          },
        ],
        multipleSelection: [],
      }
    },
    methods: {
      del(row) {
        this.$confirm('确认删除吗', '提示', { type: 'warning ' })
        console.log(row)
      },
      dialogMember() {
        this.dialogVisible = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-input--small .el-input__inner {
    border-radius: 4px;
  }
</style>
