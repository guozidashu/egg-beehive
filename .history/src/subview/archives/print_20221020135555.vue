<template>
  <div style="padding-top: 20px">
    <el-button style="margin-left: 20px" type="primary">打印吊牌条码</el-button>
    <el-button style="margin-left: 40px" type="primary">
      导入打印吊牌条码
    </el-button>
    <!-- 分签页 -->
    <el-tabs
      v-model="activeName"
      style="margin-left: 20px"
      @tab-click="handleClick"
    >
      <div
        v-if="activeName === 'first'"
        style="
          width: 100%;
          height: 60px;
          padding-left: 30px;
          line-height: 60px;
          background-color: #e8f4ff;
        "
      >
        Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value
        属性来指定当前选中的标签页。
      </div>
      <div
        v-if="activeName === 'second'"
        style="
          width: 100%;
          height: 60px;
          padding-top: 10px;
          padding-left: 30px;
          background-color: #e8f4ff;
        "
      >
        <span>①找到订单单号，复制到粘贴框</span>
        <span style="display: block; margin-top: 5px">
          ②点击导入商品，导入明细进行打印
        </span>
      </div>
      <el-tab-pane label="常规打印" name="first">
        <!-- 插入第一部分内容 -->
        <el-form label-width="104px">
          <el-form-item label="商品搜索：" style="margin-top: 20px">
            <el-input placeholder="请输入款号" style="width: 248px" />
            <el-button style="margin-left: 20px" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="导入式打印" name="second">
        <!-- 插入第二部分内容 -->
        <el-form>
          <el-form-item>
            <el-row type="flex">
              <el-select
                v-model="value"
                placeholder="请选择"
                style="width: 120px; margin-top: 20px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input
                placeholder="粘贴到这里"
                style="width: 248px; margin-top: 20px"
              />
              <el-button
                style="height: 32px; margin-top: 20px; margin-left: 20px"
                type="primary"
              >
                导入商品
              </el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
      <el-table-column align="center" label="图片" prop="img" width="80" />
      <el-table-column
        align="center"
        label="商品名称"
        prop="name"
        width="220"
      />
      <el-table-column align="center" label="款号" prop="model" width="220" />
      <el-table-column
        label="颜色"
        prop="color"
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        options: [
          {
            value: '选项1',
            label: '采购单',
          },
          {
            value: '选项2',
            label: '生产计划单',
          },
          {
            value: '选项3',
            label: '外发加工单',
          },
        ],
        value: '',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
