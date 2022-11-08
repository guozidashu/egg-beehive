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
      v-if="listType === 3"
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
    <el-pagination
      v-if="listType === 1 || listType === 3"
      background
      :current-page="list.pageNo"
      :layout="layout"
      :page-size="list.pageSize"
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
      list: {
        type: Array,
        default: () => [],
      },
      state: {
        type: Boolean,
        default: true,
      },
      total: {
        type: Number,
        default: 0,
      },
      listType: {
        type: Number,
        default: 0,
      },
      tableRowselect: {
        type: String,
        default: '',
      },
      listHeight: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        layout: 'total, sizes, prev, pager, next, jumper',
      }
    },
    created() {},
    methods: {
      // 改变每页条数事件 公共
      handleSizeChange(val) {
        this.$emit('changePageSize', val)
      },
      // 改变页数事件 公共
      handleCurrentChange(val) {
        this.$emit('changePage', val)
      },
      //多选
      setSelectRows(val) {
        this.$emit('selectRows', val)
      },
    },
  }
</script>
