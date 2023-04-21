<template>
  <div>
    <el-table
      v-if="listType === 1"
      v-loading="state"
      border
      :data="list"
      style="width: 100%"
      @selection-change="setSelectRows"
    >
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-table
      v-if="listType === 2"
      v-loading="state"
      border
      :data="list"
      style="width: 100%"
      @selection-change="setSelectRows"
    >
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-table
      v-if="listType === 4"
      v-loading="state"
      :data="list"
      max-height="500"
      style="width: 100%"
      @selection-change="setSelectRows"
    >
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-table
      v-if="listType === 5"
      v-loading="state"
      :data="list"
      :max-height="listHeight"
      style="width: 100%"
      @selection-change="setSelectRows"
    >
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-table
      v-if="listType === 6"
      v-loading="state"
      border
      :data="list"
      row-key="category_id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="setSelectRows"
    >
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-table
      v-if="listType === 7"
      v-loading="state"
      border
      :data="list"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="setSelectRows"
    >
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-table
      v-if="listType === 8"
      v-loading="state"
      border
      :data="list"
      style="width: 100%"
      @expand-change="expandChange"
      @selection-change="setSelectRows"
    >
      <slot name="List"></slot>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-pagination
      v-if="listType === 1 || listType === 8"
      background
      :current-page="pageNo"
      :layout="layout"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
  export default {
    name: 'ComponentsList',
    props: {
      // 数据
      list: {
        type: Array,
        default: () => [],
      },
      // 加载状态
      state: {
        type: Boolean,
        default: true,
      },
      // 总条数
      total: {
        type: Number,
        default: 0,
      },
      // 列表类型
      // 1.选中分页列表 2.选中列表  4.固定高度选中列表 5.自定义高度选中列表 6.树形（category_id）选中列表 7.树形（id）选中列表 8.展开行选中分页列表
      listType: {
        type: Number,
        default: 0,
      },
      // 选中行
      tableRowselect: {
        type: String,
        default: '',
      },
      // 列表高度
      listHeight: {
        type: Number,
        default: 0,
      },
      // 当前页
      pageNo: {
        type: Number,
        default: 1,
      },
      // 每页条数
      pageSize: {
        type: Number,
        default: 10,
      },
    },
    data() {
      return {
        layout: 'total, sizes, prev, pager, next, jumper',
      }
    },
    created() {},
    methods: {
      // 分页
      handleSizeChange(val) {
        this.$emit('changePageSize', val)
      },
      // 分页条数
      handleCurrentChange(val) {
        this.$emit('changePage', val)
      },
      // 选中行
      setSelectRows(val) {
        this.$emit('selectRows', val)
      },
      // 展开行
      expandChange(row) {
        this.$emit('expandChange', row)
      },
    },
  }
</script>
