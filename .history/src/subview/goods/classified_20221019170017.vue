<template>
  <div style="padding-top: 20px">
    <el-form label-width="104px">
      <el-row style="" type="flex">
        <el-form-item label="商品分类：" style="margin-left: 20px">
          <el-select v-model="value" placeholder="请选择" style="width: 248px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" style="">
          <el-select v-model="value1" placeholder="请选择" style="width: 248px">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称：
"
        >
          <el-input placeholder="请输入" style="width: 250px" />
        </el-form-item>
        <el-form-item label-width="20px">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 分割 -->
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <el-button
      style="margin-top: 20px; margin-left: 20px"
      type="primary"
      @click="open()"
    >
      添加分类
    </el-button>
    <!-- 弹框组件 -->
    <dialogClassificationGoods :dialog-visible.sync="dialogVisible" />
    <!-- 表单部分 -->
    <el-table
      border
      :cell-style="{ padding: 0 + 'px' }"
      :data="tableData"
      row-key="id"
      :row-style="{ height: 62 + 'px' }"
      style="width: 100%; margin-top: 20px; margin-bottom: 20px"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" />
      <el-table-column label="序列号" type="index" width="80" />

      <el-table-column label="分类名称" prop="date" sortable width="435" />
      <el-table-column label="分类图标" prop="name" sortable width="285">
        <template slot-scope="{ row }">
          <img alt="" :src="row.name" style="width: 36px; height: 36px" />
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="address" width="286" />
      <el-table-column label="状态" prop="address" width="306">
        <el-switch
          v-model="value3"
          active-color="#2d8cf0"
          inactive-color="#cccccc"
        />
      </el-table-column>
      <el-table-column label="操作" prop="name" width="120">
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
  </div>
</template>

<script>
  import dialogClassificationGoods from './components/dialogClassificationGoods'
  export default {
    components: {
      dialogClassificationGoods,
    },
    data() {
      return {
        dialogVisible: false,
        options: [
          {
            value: '选项1',
            label: '美妆个护',
          },
          {
            value: '选项2',
            label: '服饰分类',
          },
          {
            value: '选项3',
            label: '电子数码',
          },
          {
            value: '选项4',
            label: '居家生活',
          },
          {
            value: '选项5',
            label: '家电电器',
          },
          {
            value: '选项6',
            label: '出行交通',
          },
          {
            value: '选项7',
            label: '影音设备',
          },
          {
            value: '选项8',
            label: '餐厨厨房',
          },
          {
            value: '选项9',
            label: '热门推荐',
          },
        ],
        options1: [
          {
            value: '选项1',
            label: '显示',
          },
          {
            value: '选项2',
            label: '隐藏',
          },
        ],
        value: '选项9',
        value1: '',
        value3: true,
        tableData: [
          {
            id: 1,
            date: '美妆个护',
            name: 'https://qiniu.crmeb.net/attach/2021/08/f15fd202108091906109162.png',
            address: '200',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 11,
                date: '清洁护理',
                name: 'https://qiniu.crmeb.net/attach/2021/10/eaabb202110151234132234.png',
                address: '100',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 12,
                date: '香水彩妆',
                name: 'https://qiniu.crmeb.net/attach/2021/10/1bd68202110151227129162.png',
                address: '20',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 2,
            date: '服饰分类',
            name: 'https://qiniu.crmeb.net/attach/2021/10/eaabb202110151234132234.png',
            address: '11',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 21,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '12321',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 22,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '21213',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 3,
            date: '电子数码',
            name: 'https://qiniu.crmeb.net/attach/2021/08/03112202108091906082734.png',
            address: '22',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 31,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '12',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 32,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '0',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 4,
            date: '出行交通',
            name: 'https://qiniu.crmeb.net/attach/2021/10/ecd72202110151227202180.png',
            address: '213',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 41,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '44',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 42,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '5',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 5,
            date: '影音设备',
            name: '	https://qiniu.crmeb.net/attach/2021/10/6b059202110151227481558.png',
            address: '89',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 51,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '890',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 52,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '980',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 6,
            date: '餐厨厨房',
            name: 'https://qiniu.crmeb.net/attach/2021/08/5a0f4202108091906099738.png',
            address: '2',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 61,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '122',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 62,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '3',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
          {
            id: 7,
            date: '热门推荐',
            name: 'https://qiniu.crmeb.net/attach/2021/08/03112202108091906082734.png',
            address: '4',
            editor: '编辑',
            delete: '删除',
            children: [
              {
                id: 71,
                date: '居家生活',
                name: 'https://qiniu.crmeb.net/attach/2021/08/b0b1f20210809190607896.png',
                address: '11',
                editor: '编辑',
                delete: '删除',
              },
              {
                id: 72,
                date: '家电电器',
                name: 'https://qiniu.crmeb.net/attach/2021/12/17/303a531da0edeed4d49189f6028d71b1.jpg',
                address: '323',
                editor: '编辑',
                delete: '删除',
              },
            ],
          },
        ],
      }
    },
    methods: {
      open() {
        this.dialogVisible = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-input--small .el-input__inner {
    border-radius: 4px;
  }
</style>
