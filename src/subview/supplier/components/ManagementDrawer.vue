d
<template>
  <div class="components-drawer">
    <div v-if="form.drawerType != 3">
      <div style="padding: 0 20px 20px 20px">
        <div>
          <el-row :gutter="20">
            <el-col :span="12" style="display: flex">
              <img
                :src="avatar"
                style="width: 50px; height: 50px; margin: 0 10px 10px 0"
              />
              <p>成都 | 老何</p>
            </el-col>

            <el-col :span="12">
              <vab-icon
                icon="align-center"
                style="float: right; margin: 6px 0 0 0"
              />
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
                style="float: right; margin-right: 10px"
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
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">应付款</span>
            <span>￥{{ form.arrears }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总采购数量</span>
            <span>{{ form.product_num }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总采购金额</span>
            <span>￥{{ form.material_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总退货数量</span>
            <span>{{ form.product_return_num }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总退货金额</span>
            <span>￥{{ form.material_return_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">累计付款</span>
            <span>暂无</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">供应商等级</span>
            <span>{{ form.grade_name }}</span>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        style="padding: 0 25px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="供应商信息" name="0" />
        <el-tab-pane label="订单记录" name="1" />
        <el-tab-pane label="入库信息 " name="2" />
        <el-tab-pane label="退货记录" name="3" />
        <el-tab-pane label="付款记录" name="4" />
        <el-tab-pane label="对账单记录" name="5" />
      </el-tabs>
    </div>
    <div v-if="form.drawerType == 3">
      <el-button
        v-if="form.drawerType == 1"
        native-type="submit"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="form.drawerType = 2"
      >
        编辑
      </el-button>
      <el-button
        v-if="form.drawerType == 2 || form.drawerType == 3"
        native-type="submit"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="form.drawerType = 1"
      >
        完成
      </el-button>
    </div>
    <div v-if="search_type == '0'">
      <div v-if="form.drawerType == 1" ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>供应商编号：{{ form.sn }}</div>
            <div>供应商名称： {{ form.name }}</div>
            <div>手机号码： -{{ form.tel }}</div>
            <div>客户地址：暂无</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">供应商概况</div>
          <div class="conten-list-row">
            <div>供应商类别：{{ form.type_name }}</div>
            <div>供应商等级：{{ form.grade_name }}</div>
            <div>
              供应商类型：
              <span v-for="item in form.craft_name" :key="item">
                {{ item }}
              </span>
              <span v-for="item in form.produce_name" :key="item">
                {{ item }}
              </span>
            </div>
            <div>供应商标签：{{ form.tag_name }}</div>
            <div>所在城市：暂无</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">账户信息</div>
          <div class="conten-list-row">
            <div>密码：暂无</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">账户资金</div>
          <div class="conten-list-row">
            <div>账户名称： 暂无</div>
            <div>账号： 暂无</div>
            <div>账号类型： 暂无</div>
            <div>开户行名称： 暂无</div>
            <div>开户行地址： 暂无</div>
            <div>结算方式： 暂无</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间：{{ form.create_time }}</div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div style="width: 50%">更新时间： 暂无</div>
            <div style="width: 50%">操作人员： 暂无</div>
            <div v-if="form.status == 1" style="width: 50%">
              供应商状态： 合作中
            </div>
            <div v-else style="width: 50%">供应商状态： 终止合作</div>
            <div style="width: 50%">期初欠款： 暂无</div>
            <div style="width: 100%">备注： 暂无</div>
          </div>
        </div>
      </div>
      <el-form
        v-if="form.drawerType == 2 || form.drawerType == 3"
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
                label="供应商编号："
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入编号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="供应商名称：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="手机号码：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入手机号码"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="客户地址：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入客户地址"
                  style="width: 215px"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">供应商概况</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="供应商类别：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择供应商类别："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商等级：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择供应商等级："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商类型：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择供应商类型："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商标签：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择供应商标签："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="所在城市：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入所在城市"
                  style="width: 215px"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">账户信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="登录密码：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入密码"
                  style="width: 215px"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">账户资金</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="账户名称：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入账户名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="账号：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入账户"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="账户类型：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择账户类型："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="开户行名称：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入开户行名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="开户行地址：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入开户行地址"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="结算方式：">
                <el-select
                  v-model="form.brand"
                  placeholder="请选择结算方式："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in typeData.brand"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="跟单人员：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入跟单人员"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="操作人员：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入操作人员"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="供应商状态：">
                <el-radio-group v-model="form.name">
                  <el-radio :label="0">合作中</el-radio>
                  <el-radio :label="1">放弃</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="月初欠款：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入月初欠款"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="备注：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入备注"
                  style="width: 100%"
                  type="textarea"
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <List
      v-if="search_type == '1'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="编号" prop="sn" show-overflow-tooltip />
        <el-table-column label="数量" prop="num" show-overflow-tooltip />
        <el-table-column
          label="入库时间"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
      </template>
    </List>
    <List
      v-if="search_type == '2' || search_type == '3'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="编号" prop="sn" show-overflow-tooltip />
        <el-table-column label="数量" prop="num" show-overflow-tooltip />
        <el-table-column
          label="入库时间"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column label="价格" prop="total" show-overflow-tooltip />
      </template>
    </List>
    <List
      v-if="search_type == '4'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="备注" prop="remark" show-overflow-tooltip />
        <el-table-column label="价格" prop="total" show-overflow-tooltip />
        <el-table-column label="标题" prop="title" show-overflow-tooltip />
      </template>
    </List>
    <List
      v-if="search_type == '5'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column
          label="开始时间"
          prop="start_date"
          show-overflow-tooltip
        />
        <el-table-column
          label="结束时间"
          prop="end_date"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
        <el-table-column label="价格" prop="price" show-overflow-tooltip />
        <el-table-column label="pdf文件" prop="pdf" show-overflow-tooltip />
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
  import { editSupplierDetail } from '@/api/basic'
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
        xstype: false,
        hutype: false,
        dialogVisible1: false,
        distitle1: '',
        activeName: '0',
        search_type: '0',
        form: Object.assign({}, this.drawerInof),
        listLoading: false,
        listType: 2,
        typeData: [],
        formDrawer: {
          state: 0,
          state1: 0,
        },
        zhekouList: [
          {
            name: '普通会员',
            zhekou: '3.5折',
            qian: 200,
            hou: 100,
          },
          {
            name: '白银会员',
            zhekou: '4.5折',
            qian: 200,
            hou: 100,
          },
        ],
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
      async handleClick(tab) {
        this.listLoading = true
        this.search_type = tab.name
        if (tab.name == 0) {
          return
        }
        const { data } = await editSupplierDetail({
          search_type: tab.name, //搜索条件 1订单记录 2入库信息 3退货记录 4付款记录 5对账单记录
          id: this.drawerInof.id, //物料采购订单id
          page: 1,
          pageSize: 20,
        })
        this.orderList = data.data
        this.listLoading = false
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
