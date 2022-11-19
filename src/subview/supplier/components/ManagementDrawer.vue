d
<template>
  <div class="components-drawer">
    <div v-if="form.drawerType != 3">
      <div style="padding: 0 20px 20px 20px">
        <div>
          <el-row :gutter="20">
            <el-col :span="12" style="display: flex">
              <p>{{ form.name }}</p>
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
                @click="changeTypeBtn(2)"
              >
                编辑
              </el-button>
              <el-button
                v-if="form.drawerType == 2"
                native-type="submit"
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
        @click="changeTypeBtn(2)"
      >
        编辑
      </el-button>
      <el-button
        v-if="form.drawerType == 2 || form.drawerType == 3"
        native-type="submit"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(1)"
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
            <div>联系人：{{ form.contact_name }}</div>
            <div>手机号码： -{{ form.tel }}</div>
            <div>
              供应商地址：{{ form.province }}{{ form.city }}{{ form.district }}
            </div>
            <div>供应商详细地址：{{ form.addr }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">供应商概况</div>
          <div class="conten-list-row">
            <div>供应商类别：{{ form.type_name }}</div>
            <div>供应商等级：{{ form.grade_name }}</div>
            <div>供应商标签：{{ form.tag_name }}</div>
            <div>
              工艺类型：
              <span v-for="item in form.craft_name" :key="item">
                {{ item }}
              </span>
            </div>
            <div>
              工序类型：
              <span v-for="item in form.produce_name" :key="item">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">账户信息</div>
          <div class="conten-list-row">
            <div>账户名：{{ form.user_name }}</div>
            <div>密码：{{ form.password }}</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">账户资金</div>
          <div class="conten-list-row">
            <div>开户人： {{ form.account_name }}</div>
            <div>账号： {{ form.account_no }}</div>
            <div>账号类型： {{ form.account_type }}</div>
            <div>开户行名称： {{ form.bank_name }}</div>
            <div>开户行地址： {{ form.bank_address }}</div>
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
            <div v-else style="width: 50%">
              供应商状态：
              <span v-if="form.status == '1'">启用</span>
              <span v-else>禁用</span>
            </div>
            <div style="width: 50%">期初欠款： {{ form.initial_amount }}</div>
            <div style="width: 100%">备注： {{ form.remark }}</div>
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
                  v-model="form.sn"
                  placeholder="请输入编号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="供应商名称：">
                <el-input
                  v-model="form.name"
                  placeholder="请输入名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="联系人：">
                <el-input
                  v-model="form.contact_name"
                  placeholder="请输入联系人"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="手机号码：">
                <el-input
                  v-model="form.tel"
                  placeholder="请输入手机号码"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item label="供应商地址：">
                <addressCity
                  :adrress="form.address1"
                  @getLawyerListInfo="selectAddress"
                />
              </el-form-item>
              <el-form-item class="item" label="供应商详细地址：">
                <el-input
                  v-model="form.addr"
                  placeholder="请输入供应商地址"
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
                  v-model="form.type"
                  placeholder="请选择供应商类别："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in selectData.supplier_type"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商等级：">
                <el-select
                  v-model="form.grade_id"
                  placeholder="请选择供应商等级："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in selectData.supplier_grade"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="供应商标签：">
                <el-select
                  v-model="form.tag"
                  placeholder="请选择供应商标签："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in selectData.supplier_tag"
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
              <el-form-item class="item" label="工艺类型：">
                <el-select
                  v-model="form.craft_type"
                  multiple
                  placeholder="请选择工艺类型："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in selectData.craft_type"
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
              <el-form-item class="item" label="工序类型：">
                <el-select
                  v-model="form.produce_type"
                  multiple
                  placeholder="请选择工序类型："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in selectData.produce_type"
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
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">账户信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="用户名：">
                <el-input
                  v-model="form.user_name"
                  placeholder="请输入用户名"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="登录密码：">
                <el-input
                  v-model="form.password"
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
              <el-form-item class="item" label="开户人：">
                <el-input
                  v-model="form.account_name"
                  placeholder="请输入开户人"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="账号：">
                <el-input
                  v-model="form.account_no"
                  placeholder="请输入账户"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="账户类型：">
                <el-select
                  v-model="form.account_type"
                  placeholder="请选择账户类型："
                  style="width: 215px"
                >
                  <el-option label="银行卡" :value="1" />
                  <el-option label="支付宝" :value="2" />
                  <el-option label="微信" :value="3" />
                  <el-option label="现金" :value="4" />
                  <el-option label="信用卡" :value="5" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="开户行名称：">
                <el-input
                  v-model="form.bank_name"
                  placeholder="请输入开户行名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="开户行地址：">
                <el-input
                  v-model="form.bank_address"
                  placeholder="请输入开户行地址"
                  style="width: 215px"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="供应商状态：">
                <el-radio-group v-model="form.status">
                  <el-radio :label="0">禁用</el-radio>
                  <el-radio :label="1">启用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="期初余额：">
                <el-input
                  v-model="form.initial_amount"
                  placeholder="请输入期初余额"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="备注：">
                <el-input
                  v-model="form.remark"
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
  import {
    editSupplierDetail,
    getCommonAllList,
    editSupplierSave,
  } from '@/api/basic'
  import addressCity from '@/subview/components/City.vue'
  export default {
    name: 'ComponentsDrawer',
    components: { List, VabUpload, addressCity },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        selectData: [],
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
          this.form.address1 = [
            this.form.province,
            this.form.city,
            this.form.district,
          ]
          console.log()
          if (this.form.produce_type != undefined) {
            if (this.form.produce_type.indexOf(',') != -1) {
              this.form.produce_type = this.form.produce_type.split(',')
            } else {
              this.form.produce_type = [Number(this.form.produce_type)]
            }
          }
          if (this.form.produce_type != undefined) {
            if (this.form.craft_type.indexOf(',') != -1) {
              this.form.craft_type = this.form.craft_type.split(',')
            } else {
              this.form.craft_type = [Number(this.form.craft_type)]
            }
          }
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.getSelectData()
    },
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
      async getSelectData() {
        const { data } = await getCommonAllList({
          type: 'supplier_type,craft_type,produce_type,supplier_tag,supplier_grade',
        })
        this.selectData = data
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        this.form.province = selectProvince
        this.form.city = selectCity
        this.form.district = selectArea
      },
      async changeTypeBtn(e) {
        console.log(89898989, e)
        if (e != 1) {
          this.form.drawerType = e
          this.$forceUpdate()
          return
        } else {
          console.log(1111, this.form)
          this.form.drawerType = e
        }
        if (this.form.id == undefined) {
          this.form.id = 0
          const { code } = await editSupplierSave(this.form)
          if (code == 200) {
            this.$baseMessage('新增成功', 'success', 'vab-hey-message-success')
            this.form.drawerType = e
            this.$forceUpdate()
          }
        } else {
          const { code } = await editSupplierSave(this.form)
          if (code == 200) {
            this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
            this.form.drawerType = e
            this.$forceUpdate()
          }
        }
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
