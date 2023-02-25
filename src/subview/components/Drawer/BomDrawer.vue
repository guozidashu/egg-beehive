<template>
  <div class="components-drawer">
    <div v-if="form.drawerType != 3" style="padding: 0 25px">
      <div>
        <el-row :gutter="20">
          <el-col :span="12" style="display: flex">
            <img
              :src="form.material_pic"
              style="width: 50px; height: 50px; margin: 0 10px 10px 0"
            />
            <div style="margin-top: -5px">
              <div style="margin: 15px 0 0 0">
                编号：{{ form.material_code }}
              </div>
              <div>名称：{{ form.material_name }}</div>
            </div>
          </el-col>

          <el-col :span="12">
            <vab-icon
              icon="align-center"
              style="float: right; margin: 6px 0 0 0"
            />
            <el-button
              v-if="form.drawerType == 1"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="changeTypeBtn(2)"
            >
              编辑
            </el-button>
            <el-button
              v-if="form.drawerType == 2"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="changeTypeBtn(1)"
            >
              完成
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div style="display: flex">
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">总采购数</span>
          <span>{{ form.num }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">总采购金额</span>
          <span>￥{{ form.total | moneyFormat }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">库存数</span>
          <span>{{ form.material_stock }}</span>
        </div>
        <div style="display: flex; flex: 1; flex-direction: column">
          <span style="margin-bottom: 12px">库存价值</span>
          <span>￥{{ form.stock_price | moneyFormat }}</span>
        </div>
      </div>
    </div>
    <div v-if="form.drawerType == 3">
      <el-button
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(1)"
      >
        完成
      </el-button>
    </div>
    <el-tabs
      v-if="form.drawerType != 3"
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="物料信息" name="0" />
      <el-tab-pane label="入库信息" name="1" />
      <el-tab-pane label="出库信息" name="2" />
      <el-tab-pane label="采购明细" name="3" />
      <el-tab-pane label="退货明细" name="4" />
    </el-tabs>
    <div v-if="activeName == '0'">
      <div v-if="form.drawerType == 1" ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>物料编号：{{ form.material_code }}</div>
            <div>物料名称： {{ form.material_name }}</div>
            <div>物料分类： {{ form.material_name }}</div>
            <div>供应商： {{ form.material_name }}</div>
            <div>物料单价： {{ form.material_name }}</div>
            <div>单位： {{ form.material_name }}</div>
            <div>门幅： {{ form.width }}</div>
            <div>克重：{{ form.weight }}</div>
            <div>空差： {{ form.spatial_difference }}</div>
            <div>成分：{{ form.component }}</div>
            <div>单耗：{{ form.loss }}</div>
            <div>
              物料图片：
              <img :src="form.material_pic" style="width: 20px; height: 20px" />
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">规格及价格信息</div>
          <div class="conten-list-row">
            <div
              v-for="(item, index) in form.material_spec"
              :key="index"
              style="display: flex; width: 100%"
            >
              <div style="width: 50%">规格名称：{{ item.spec_name }}</div>
              <div style="width: 50%">规格单价：{{ item.spec_price }}</div>
            </div>
          </div>
        </div>
      </div>
      <el-form
        v-if="form.drawerType != 1"
        ref="form"
        label-width="120px"
        :model="form"
        style="width: 100%"
      >
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">基本信息</div>
            <div class="conten-list-com">
              <el-form-item
                class="item"
                label="物料编号："
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.material_code"
                  placeholder="请输入物料编号"
                  style="width: 215px"
                />
              </el-form-item>

              <el-form-item class="item" label="物料名称：">
                <el-input
                  v-model="form.material_name"
                  placeholder="请输入物料名称"
                  style="width: 215px"
                />
              </el-form-item>

              <el-form-item class="item" label="物料单价：">
                <el-input
                  v-model="form.material_price"
                  placeholder="请输入门幅"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="门幅：">
                <el-input
                  v-model="form.width"
                  placeholder="请输入门幅"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="克重：">
                <el-input
                  v-model="form.weight"
                  placeholder="请输入克重"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="空差：">
                <el-input
                  v-model="form.spatial_difference"
                  placeholder="请输入空差"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="成分：">
                <el-input
                  v-model="form.component"
                  placeholder="请输入成分"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="单耗：">
                <el-input
                  v-model="form.loss"
                  placeholder="请输入单耗"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="物料分类：">
                <el-select
                  v-model="form.category_id"
                  placeholder="请选择物料分类："
                >
                  <el-option
                    v-for="(item, index) in selectList.material_category"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商：">
                <el-select
                  v-model="form.supplier_id"
                  placeholder="请选择供应商："
                >
                  <el-option
                    v-for="(item, index) in selectList.supplier"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="单位：">
                <el-select v-model="form.unit_id" placeholder="请选择单位：">
                  <el-option
                    v-for="(item, index) in selectList.unit"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="物料图片：">
                <div style="display: flex">
                  <div>
                    <el-button
                      size="small"
                      style="margin: 0 10px 0 0"
                      type="primary"
                      @click="handleShow()"
                    >
                      上传
                    </el-button>
                  </div>
                  <img
                    v-if="form.material_pic"
                    :src="form.material_pic"
                    style="width: 80px; height: 80px"
                  />
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">规格及价格信息</div>
            <div class="conten-list-com">
              <div
                v-for="(item, index) in form.material_spec"
                :key="index"
                style="display: flex; width: 100%; margin-top: 20px"
              >
                <el-form-item label="规格名称：" style="width: 50%">
                  <el-input v-model="item.spec_name" style="width: 215px" />
                </el-form-item>
                <el-form-item label="规格单价：" style="width: 50%">
                  <el-input v-model="item.spec_price" style="width: 215px" />
                  <i
                    v-if="index == 0"
                    class="el-icon-plus"
                    style="margin: 10px 0 0 30px; color: #1890ff"
                    @click="handleAdd()"
                  ></i>
                  <i
                    v-else
                    class="el-icon-minus"
                    style="margin: 10px 0 0 30px; color: #1890ff"
                    @click="handleDelete(index)"
                  ></i>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <QYList
      v-if="activeName == '1' || activeName == '2' || activeName == '4'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="编号" prop="sn" show-overflow-tooltip />
        <el-table-column label="仓库名称" prop="name" show-overflow-tooltip />
        <el-table-column label="金额" prop="total" show-overflow-tooltip />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <QYList
      v-if="activeName == '3'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="编号" prop="sn" show-overflow-tooltip />
        <el-table-column label="金额" prop="total" show-overflow-tooltip />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
      </template>
    </QYList>
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getImgList"
    />
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ComponentsDrawer',
    components: { VabUpload },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        activeName: '0',
        form: JSON.parse(JSON.stringify(this.drawerInof)),
        listLoading: false,
        listType: 2,
        selectList: [],
        orderList: [],
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
    },
    watch: {
      type(val) {
        this.type = val
      },
      drawerInof: {
        handler: function (newVal) {
          this.form = JSON.parse(JSON.stringify(newVal))
          this.activeName = '0'
          if (this.form.drawerType == 3) {
            this.form.material_spec = [
              {
                spec_name: null, //规格名称
                spec_price: null, //规格单价
              },
            ]
          }
        },
        deep: true,
      },
    },
    created() {
      this.getGoodsTypeList()
    },
    methods: {
      getImgList(data) {
        this.form.material_pic = data[0]
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'material_category,supplier,unit',
        })
        this.selectList = data
      },
      async changeTypeBtn(e) {
        if (e == 2) {
          this.form.drawerType = e
          return
        }
        if (this.form.id == undefined) {
          this.form.id = 0
          const { code } = await this.api.addMaterialSave(this.form)
          if (code == 200) {
            this.$baseMessage('新增成功', 'success', 'vab-hey-message-success')
            this.form.drawerType = e
            this.$forceUpdate()
          }
        } else {
          const { code } = await this.api.addMaterialSave(this.form)
          if (code == 200) {
            this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
            this.form.drawerType = e
            this.$forceUpdate()
          }
        }
        this.form.drawerType = e
        this.$forceUpdate()
      },
      handleAdd() {
        this.form.material_spec.push({
          spec_name: null, //规格名称
          spec_price: null, //规格单价
        })
      },
      handleDelete(index) {
        this.form.material_spec.splice(index, 1)
      },
      // 列表数据表头切换监听 自定义部分
      async handleClick(tab) {
        if (tab.index != 0) {
          const { data } = await this.api.getMaterialInfoList({
            material_id: this.form.id, //物料id
            type: tab.index, //1入库信息 2出库信息 3调整明细 4库存明细
          })
          this.orderList = data.data
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep {
    .el-form-item__label,
    .el-input__inner {
      font-size: 12px;
    }
  }
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
      .conten-list-row {
        display: flex;
        flex-wrap: wrap;
        div {
          width: 33%;
          margin-top: 16px;
        }
      }
      .conten-list-com {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 50%;
          margin-top: 16px;
        }
      }
    }
  }
</style>
