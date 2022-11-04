<template>
  <div class="components-drawer">
    <div v-if="form.drawerType != 3" style="padding: 30px 35px 25px">
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
              native-type="submit"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="upMembers(1)"
            >
              启用
            </el-button>
            <el-button
              v-if="form.drawerType == 1"
              native-type="submit"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="print('vab-print-table')"
            >
              打印
            </el-button>

            <el-button
              v-if="form.drawerType == 1"
              native-type="submit"
              size="small"
              style="float: right"
              type="primary"
              @click="form.drawerType = 2"
            >
              编辑
            </el-button>
            <el-button
              v-if="form.drawerType == 2"
              native-type="submit"
              size="small"
              style="float: right; margin-right: 10px"
              type="primary"
              @click="form.drawerType = 1"
            >
              完成
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div style="display: flex">
        <div
          v-for="(item, index) in stalist"
          :key="index"
          style="display: flex; flex: 1; flex-direction: column"
        >
          <span style="margin-bottom: 12px">{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
    <el-tabs
      v-if="form.drawerType != 3"
      v-model="activeName"
      style="padding: 0 25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="物料信息" name="first" />
      <el-tab-pane label="入库信息" name="second" />
      <el-tab-pane label="出库信息" name="three" />
      <el-tab-pane label="调整信息" name="four" />
      <el-tab-pane label="库存明细" name="five" />
    </el-tabs>
    <div v-if="tabindex == '0'">
      <div v-if="form.drawerType == 1" ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>物料编号：{{ form.material_code }}</div>
            <div>物料名称： {{ form.material_name }}</div>
            <div>门幅： {{ form.width }}</div>
            <div>克重：{{ form.weight }}</div>
            <div>空差： {{ form.spatial_difference }}</div>
            <div>单耗：{{ form.loss }}</div>
            <div>物料分类： {{ form.category_name }}</div>
            <div>供应商名称： {{ form.supplier_name }}</div>
            <div>供应商等级： {{ form.material_code }}</div>
            <div>供应商类别： {{ form.material_code }}</div>
            <div>成分： {{ form.component }}</div>
            <div>
              物料图片：
              <img :src="form.material_pic" style="width: 20px; height: 20px" />
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">规格及价格信息</div>
          <div class="conten-list-row">
            <div>采购价：红色</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 50%">更新时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 50%">物料库位：库位一</div>
            <div style="width: 50%">物料状态： 在售</div>
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
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商名称：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入供应商名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="供应商等级：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择供应商等级："
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商类别：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择供应商类别："
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="成分：">
                <el-input
                  v-model="form.component"
                  placeholder="请输入成分"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="物料图片：">
                <el-button
                  native-type="submit"
                  size="small"
                  type="primary"
                  @click="handleShow()"
                >
                  上传
                </el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">规格及价格信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="采购价：">
                <el-input v-model="form.addressKeyword" style="width: 215px" />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="物料库位：">
                <el-select v-model="form.brand" placeholder="请选择库位：">
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="物料状态：">
                <el-radio-group v-model="form.name">
                  <el-radio :label="0">在售</el-radio>
                  <el-radio :label="1">备用</el-radio>
                  <el-radio :label="2">禁用停售</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <List
      v-else
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="id" prop="id" show-overflow-tooltip />
        <el-table-column label="名称" prop="log" show-overflow-tooltip />
        <el-table-column label="操作时间" prop="time" show-overflow-tooltip />
      </template>
    </List>
    <vab-upload
      ref="vabUpload"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  import VabUpload from '@/extra/VabUpload'
  import List from '@/subview/components/List'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ComponentsDrawer',
    components: { List, VabUpload },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        activeName: 'first',
        tabindex: '0',
        form: Object.assign({}, this.drawerInof),
        listLoading: false,
        listType: 2,
        typeData: [],
        orderList: [
          {
            id: 4525,
            log: '用户付款成功',
            time: '2022-10-10 16:33:41',
          },
          {
            id: 4525,
            log: '用户付款成功',
            time: '2022-10-10 16:33:41',
          },
        ],
        stalist: [
          {
            name: '总采购数',
            value: '24750',
          },
          {
            name: '总采购金额',
            value: '￥34750',
          },
          {
            name: '库存数',
            value: '247',
          },
          {
            name: '库存价值',
            value: '800元',
          },
        ],
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
          this.form = Object.assign({}, newVal)
          console.log(2222, newVal)
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      async print(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val], { noPrintParent: true })
        await this.openSideBar()
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(8989, tab)
        this.tabindex = tab.index
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        console.log(selectProvince, selectCity, selectArea)
      },
      handleClose1() {
        this.dialogVisible1 = false
      },
      upMembers(type) {
        if (type == 1) {
          this.$baseConfirm('你确定要启用当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('审核成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
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
