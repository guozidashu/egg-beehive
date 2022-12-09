<template>
  <div class="components-drawer">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <el-form :inline="true" :model="formInline">
        <el-form-item label="请先选择设计师:" style="margin: 10px 0 0 10px">
          <el-select v-model="formInline.designer_id" size="small">
            <el-option
              v-for="(item, index) in orderList"
              :key="index"
              :label="item.designer_name"
              :value="item.designer_id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div style="padding: 30px 35px 25px">
        <div style="display: flex">
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="width: 30%; margin-bottom: 12px">目标名称</span>
            <span>{{ form.plan_name }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="width: 30%; margin-bottom: 12px">目标总数</span>
            <span>{{ form.plan_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="width: 30%; margin-bottom: 12px">完成总数</span>
            <span>{{ form.completed_total }}</span>
          </div>
        </div>
      </div>
      <QYList :list="tabList" :list-type="listType" :state="listLoading">
        <template #List>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.designer" style="width: 100%">
                <el-table-column
                  align="center"
                  label="名称"
                  prop="designer_name"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="头像"
                  prop="designer_avatar"
                  show-overflow-tooltip
                >
                  <template #default="{ row }">
                    <el-tooltip placement="top">
                      <el-image
                        slot="content"
                        :src="row.designer_avatar"
                        style="width: 200px; height: 200px"
                      />
                      <el-image
                        fit="cover"
                        :src="row.designer_avatar"
                        style="width: 50px; height: 50px"
                      />
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="目标数量"
                  prop="designer_target_num"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="完成数量"
                  prop="designer_completed_num"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  label="淘汰数量"
                  prop="designer_out_num"
                  show-overflow-tooltip
                />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="分类ID"
            prop="category_id"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="分类名称"
            prop="category_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="总目标数"
            prop="target_total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="总完成数量"
            prop="completed_num"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  import { getPlanDetails } from '@/api/basic'
  export default {
    name: 'ComponentsDrawer',
    props: {
      drawerInof: {
        type: Array,
        default: () => [],
      },
      drawerInofId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        formInline: {
          designer_id: null,
        },
        form: {
          plan_name: '',
          plan_total: '',
          plan_completed: '',
        },
        tabList: [],
        plan_id: this.drawerInofId,
        orderList: JSON.parse(JSON.stringify(this.drawerInof)),
        listLoading: false,
        listType: 2,
      }
    },
    watch: {
      drawerInof: {
        handler: function (newVal) {
          this.orderList = JSON.parse(JSON.stringify(newVal))
        },
        deep: true,
        immediate: true,
      },
      formInline: {
        handler: function () {
          this.getDetail()
        },
        deep: true,
      },
      drawerInofId: {
        handler: function (newVal) {
          this.plan_id = newVal
        },
        deep: true,
      },
    },
    created() {
      this.getDetail()
    },
    methods: {
      async getDetail() {
        const { data } = await getPlanDetails({
          plan_id: this.plan_id, // 目标id
          designer_id: this.formInline.designer_id, // 设计师id
        })
        this.form = data
        this.tabList = data.plan
      },
    },
  }
</script>
<style lang="scss" scoped>
  .head {
    padding: 30px 35px 25px;
  }
  .drawer-tab {
    padding: 0 25px;
    .conten-warp {
      padding: 25px 0;
      border-bottom: 1px dashed #eee;

      .conten-title {
        padding-left: 10px;
        font-size: 15px;
        line-height: 15px;
        color: #303133;
        border-left: 3px solid #1890ff;
      }
      .conten-list-row,
      .conten-list-com {
        display: flex;
        flex-wrap: wrap;
        div {
          width: 33%;
          margin-top: 16px;
        }
      }
      .conten-list-com {
        flex-direction: column;
        div {
          width: 100%;
        }
      }
    }
  }
</style>
