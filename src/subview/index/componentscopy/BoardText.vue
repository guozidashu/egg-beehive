<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :lg="12"
        :md="18"
        :sm="24"
        style="width: 50%; padding: 5px 10px 5px 10px"
        :xl="12"
        :xs="24"
      >
        <el-card class="authorization" shadow="never">
          <template #header>
            <div style="display: flex; justify-content: space-between">
              <div>
                <vab-icon icon="bar-chart-2-line" />
                商品排行
              </div>
            </div>
          </template>
          <QYList
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
                width="50"
              >
                <template slot-scope="scope">
                  <span
                    class="index_common"
                    :class="[
                      scope.$index + 1 == '1'
                        ? 'index_one'
                        : scope.$index + 1 == '2'
                        ? 'index_two'
                        : scope.$index + 1 == '3'
                        ? 'index_three'
                        : 'index_more',
                    ]"
                  >
                    {{ scope.$index + 1 }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="商品图片&名称" prop="name">
                <template #default="{ row }">
                  <div style="display: flex">
                    <el-tooltip placement="top">
                      <el-image slot="content" :src="row.img" />
                      <el-image :src="row.img" />
                    </el-tooltip>
                    <div style="margin: 15px 0 0 15px">
                      {{ row.name }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="销售件数" prop="sum_num" width="80" />
              <el-table-column
                align="right"
                label="销售金额"
                prop="sum_total"
                width="150"
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.sum_total | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
            </template>
          </QYList>
        </el-card>
      </el-col>
      <el-col
        :lg="12"
        :md="18"
        :sm="24"
        style="width: 50%; padding: 5px 0 5px 10px"
        :xl="12"
        :xs="24"
      >
        <el-card class="authorization" shadow="never">
          <template #header>
            <div style="display: flex; justify-content: space-between">
              <div>
                <vab-icon icon="bar-chart-2-line" />
                客户排行
              </div>
            </div>
          </template>
          <QYList
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
                width="50"
              >
                <template slot-scope="scope">
                  <span
                    class="index_common"
                    :class="[
                      scope.$index + 1 == '1'
                        ? 'index_one'
                        : scope.$index + 1 == '2'
                        ? 'index_two'
                        : scope.$index + 1 == '3'
                        ? 'index_three'
                        : 'index_more',
                    ]"
                  >
                    {{ scope.$index + 1 }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="客户名称" prop="name" />
              <el-table-column label="拿货件数" prop="sum_num" />
              <el-table-column
                align="right"
                label="拿货金额"
                prop="sum_total"
                width="150"
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.sum_total | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
            </template>
          </QYList>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
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
