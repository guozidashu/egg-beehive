<template>
  <div>
    <el-button
      style="margin-top: 20px; margin-left: 20px"
      type="primary"
      @click="add1('add')"
    >
      添加分类
    </el-button>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      style="width: 100%; margin-top: 20px"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" type="index" width="155" />
      <el-table-column
        align="center"
        label="分类名称"
        prop="date"
        width="420"
      />
      <el-table-column align="center" label="客户数" prop="name" width="320" />
      <el-table-column
        label="分类说明（备注）"
        prop="address"
        show-overflow-tooltip
        width="500"
      />
      <el-table-column align="center" label="操作" prop="name" width="120">
        <template slot-scope="{ row }">
          <el-button size="small" style="color: #2d8cf0" type="text">
            {{ row.editor }}丨
          </el-button>
          <el-button
            size="small"
            style="margin-left: -2px; color: #2d8cf0"
            type="text"
          >
            {{ row.delete }}
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
    <!-- 弹框组件 -->
    <el-dialog
      :before-close="handleClose"
      title="添加季节"
      :visible.sync="dialogVisible"
      width="25%"
    >
      <el-form label-width="104px" style="margin-top: -20px">
        <el-form-item label="波段名称：">
          <el-input v-model="formdata.name" style="width: 248px" />
        </el-form-item>
        <el-form-item label="是否默认：">
          <el-radio-group v-model="radio">
            <el-radio :label="3">关闭</el-radio>
            <el-radio :label="6">备开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品数量：">
          <el-input style="width: 248px" />
        </el-form-item>
      </el-form>
      <el-button style="margin-left: 30px" @click="handleClose">
        取 消
      </el-button>
      <el-button type="primary">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [
          {
            date: '零售店',
            name: '10',
            address: '抖音快团团',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '网店',
            name: '20',
            address:
              '如果您使用 Shopify 中的免费模板，那么您可以联系 Shopify 支持以获',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '超市连锁店',
            name: '0',
            address:
              '订单备注、购物车属性和订单项目属性是具有类似功能的三个单独的工具。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '趣店',
            name: '111',
            address:
              '可在您模板的购物车页面上启用订单备注。请按照以下步骤操作，或参阅您的模板的文档，以详细了解如何在您的模板中查找此设置。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '社区团购',
            name: '12',
            address:
              '如果您的屏幕宽度超过 1600 像素，则您的自定义和编辑选项会显示在屏幕右侧。如果您的屏幕宽度小于 1600 像素，则它们将显示在屏幕左侧。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '零售',
            name: '23',
            address: '在销售渠道部分，轻触在线商店。',
            editor: '编辑',
            delete: '删除',
          },
          {
            date: '商场',
            name: '3',
            address: '选中启用购物车备注。',
            editor: '编辑',
            delete: '删除',
          },
        ],
        multipleSelection: [],
        currentPage3: 5,
      }
    },
    methods: {
      add1(val) {
        if (val == 'add') {
          console.log('添加')
        } else {
          console.log('编辑')
        }
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      },
    },
  }
</script>

<style></style>
