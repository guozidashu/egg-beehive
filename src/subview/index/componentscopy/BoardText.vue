<template>
  <el-card class="authorization" shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between">
        <div>
          <vab-icon icon="bar-chart-2-line" />
          商品排行
        </div>
        <div>
          <vab-icon icon="bar-chart-2-line" />
          客户排行
        </div>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col
        :lg="12"
        :md="18"
        :sm="24"
        style="width: 50%; padding: 5px 20px"
        :xl="12"
        :xs="24"
      >
        <List
          :list="goosList"
          :list-height="listHeightkh"
          :list-type="listType"
          :state="listLoading"
        >
          <template #List>
            <el-table-column
              align="center"
              label="排名"
              type="index"
              width="80"
            />
            <el-table-column label="商品名称&图片" prop="name">
              <template #default="{ row }">
                <div style="display: flex">
                  <img
                    :src="row.img"
                    style="width: 50px; height: 50px; margin: 10px 10px 0 0"
                  />
                  <div style="margin-top: 20px">
                    {{ row.name }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="销售件数" prop="sum_num" width="80" />
            <el-table-column label="销售金额" prop="sum_total" width="180" />
          </template>
        </List>
      </el-col>
      <el-col
        :lg="12"
        :md="18"
        :sm="24"
        style="width: 50%; padding: 5px 20px"
        :xl="12"
        :xs="24"
      >
        <List
          :list="goosList1"
          :list-height="listHeightkh"
          :list-type="listType"
          :state="listLoading"
        >
          <template #List>
            <el-table-column
              align="center"
              label="排名"
              type="index"
              width="80"
            />
            <el-table-column label="客户名称" prop="name" />
            <el-table-column label="拿货金额（占比）" prop="sum_total" />
            <el-table-column label="拿货件数" prop="sum_num" />
          </template>
        </List>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import List from '@/subview/components/List'
  export default {
    components: { List },
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      list1: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        listLoading: false,
        listType: 5,
        listHeight: 370,
        listHeightkh: 520,
        goosList: this.list,
        goosList1: this.list1,
      }
    },
    watch: {
      list: {
        handler: function (newval) {
          this.goosList = newval
        },
        deep: true,
        immediate: true,
      },
      list1: {
        handler: function (newval) {
          this.goosList1 = newval
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {},
  }
</script>
<style lang="scss" scoped></style>
