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
            <span style="margin-bottom: 12px">应付款</span>
            <span>￥{{ form.arrears | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总采购数量</span>
            <span>{{ form.product_num }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总采购金额</span>
            <span>￥{{ form.material_total | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总退货数量</span>
            <span>{{ form.product_return_num }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总退货金额</span>
            <span>￥{{ form.material_return_total | moneyFormat }}</span>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        style="padding: 0 20px"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="供应商信息" name="0" />
        <el-tab-pane label="订单记录" name="1" />
        <el-tab-pane label="入库信息 " name="2" />
        <el-tab-pane label="退货记录" name="3" />
        <el-tab-pane label="付款记录" name="4" />
      </el-tabs>
    </div>
    <div v-if="form.drawerType == 3">
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
        v-if="form.drawerType == 2 || form.drawerType == 3"
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
            <div>供应商名称： {{ form.name }}</div>
            <div>联系人：{{ form.contact_name }}</div>
            <div>手机号码： {{ form.tel }}</div>
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
            <div v-if="form.oem_type == 1">代工方式：FOB模式</div>
            <div v-if="form.oem_type == 2">代工方式：CMT模式</div>
            <div>
              特殊工艺：
              <span v-for="item in form.craft_name" :key="item">
                {{ item }}
              </span>
            </div>
            <div>
              代工范围：
              <span v-for="item in form.produce_name" :key="item">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间：{{ form.create_time }}</div>
            <div v-if="form.status == 1" style="width: 50%">
              供应商状态： 合作中
            </div>
            <div v-else style="width: 50%">
              供应商状态：
              <span v-if="form.status == '1'">启用</span>
              <span v-else>禁用</span>
            </div>
            <div style="width: 50%">期初欠款： ￥{{ form.voucher_total }}</div>
            <div style="width: 100%">备注： {{ form.remark }}</div>
          </div>
        </div>
      </div>
      <el-form
        v-if="form.drawerType == 2 || form.drawerType == 3"
        ref="form"
        label-width="120px"
        :model="form"
        :rules="rules"
        style="width: 100%"
      >
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">基本信息</div>
            <div class="conten-list-com">
              <el-form-item
                v-if="form.drawerType == 3"
                class="item"
                label="供应商名称："
                prop="name"
              >
                <el-input
                  v-model="form.name"
                  placeholder="请输入名称"
                  style="width: 215px"
                  @input="form.name = $WhitespaceRemoval(form.name)"
                />
              </el-form-item>
              <el-form-item class="item" label="联系人：" prop="contact_name">
                <el-input
                  v-model="form.contact_name"
                  placeholder="请输入联系人"
                  style="width: 215px"
                  @input="
                    form.contact_name = $WhitespaceRemoval(form.contact_name)
                  "
                />
              </el-form-item>
              <el-form-item class="item" label="手机号码：" prop="tel">
                <el-input
                  v-model="form.tel"
                  placeholder="请输入手机号码"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="供应商地址：">
                <QYAddress
                  :adrress="form.address1"
                  @getLawyerListInfo="selectAddress"
                />
              </el-form-item>
              <el-form-item class="item" label="供应商详细地址：">
                <el-input
                  v-model="form.addr"
                  placeholder="请输入供应商地址"
                  style="width: 500px"
                  type="textarea"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">供应商概况</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="供应商类别：" prop="type">
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
              <el-form-item class="item" label="代工方式：">
                <el-select
                  v-model="form.oem_type"
                  placeholder="请选择代工方式："
                  style="width: 215px"
                >
                  <el-option label="FOB模式" :value="1" />
                  <el-option label="CMT模式" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="特殊工艺：">
                <el-select
                  v-model="form.craft_type"
                  multiple
                  placeholder="请选择特殊工艺："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in selectData.craft_type"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="代工范围：">
                <el-select
                  v-model="form.produce_type"
                  multiple
                  placeholder="请选择代工范围："
                  style="width: 215px"
                >
                  <el-option
                    v-for="(item, index) in selectData.produce_type"
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
              <el-form-item class="item" label="供应商状态：" prop="status">
                <el-radio-group v-model="form.status">
                  <el-radio :label="0">禁用</el-radio>
                  <el-radio :label="1">启用</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                v-if="form.drawerType != 2"
                class="item"
                label="期初欠款："
                prop="initial_amount"
              >
                <el-input
                  v-model="form.initial_amount"
                  placeholder="请输入期初欠款"
                  style="width: 215px"
                  @input="
                    form.initial_amount = $moneyFormatInput(form.initial_amount)
                  "
                />
              </el-form-item>
              <el-form-item class="item" label="备注：" style="width: 100%">
                <el-input
                  v-model="form.remark"
                  placeholder="请输入备注"
                  type="textarea"
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <QYList
      v-if="search_type == '1'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column
          label="订单日期"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column label="订单编号" prop="sn" show-overflow-tooltip />
        <el-table-column
          label="创建时间"
          prop="create_time"
          show-overflow-tooltip
        />
        <el-table-column label="数量" prop="num" width="80" />
        <el-table-column label="金额" prop="total" width="100" />
      </template>
    </QYList>
    <QYList
      v-if="search_type == '2'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="订单编号" prop="sn" show-overflow-tooltip />
        <el-table-column
          label="订单日期"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column
          label="订单类型"
          prop="order_type"
          show-overflow-tooltip
        />
        <el-table-column label="入库数量" prop="num" width="80" />
        <el-table-column label="入库金额" prop="total" width="100" />
      </template>
    </QYList>
    <QYList
      v-if="search_type == '3'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="订单编号" prop="sn" show-overflow-tooltip />
        <el-table-column
          label="订单日期"
          prop="add_date"
          show-overflow-tooltip
        />
        <el-table-column
          label="订单类型"
          prop="order_type"
          show-overflow-tooltip
        />
        <el-table-column label="退货数量" prop="num" width="80" />
        <el-table-column label="退货金额" prop="total" width="100" />
      </template>
    </QYList>
    <QYList
      v-if="search_type == '4'"
      :list="orderList"
      :list-type="listType"
      :state="listLoading"
      style="margin: 20px"
    >
      <template #List>
        <el-table-column label="付款时间" prop="ctime" show-overflow-tooltip />
        <el-table-column label="支付类型" prop="title" show-overflow-tooltip />
        <el-table-column label="付款金额" prop="total" width="100" />
      </template>
    </QYList>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  import { mapGetters } from 'vuex'
  export default {
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
        form: JSON.parse(JSON.stringify(this.drawerInof)),
        rules: {
          name: [
            { required: true, message: '请输入供应商名称', trigger: 'blur' },
          ],
          contact_name: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur',
            },
          ],
          type: [
            { required: true, message: '请选择供应商类型', trigger: 'blur' },
          ],
          grade_id: [
            { required: true, message: '请选择供应商等级', trigger: 'blur' },
          ],
          status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
          initial_amount: [
            { required: true, message: '请输入初始金额', trigger: 'blur' },
          ],
        },
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
          this.form = JSON.parse(JSON.stringify(newVal))
          this.activeName = '0'
          this.search_type = '0'
          this.form.address1 = [
            this.form.province,
            this.form.city,
            this.form.district,
          ]
          if (this.form.produce_type != undefined) {
            if (this.form.produce_type.indexOf(',') != -1) {
              this.form.produce_type = this.form.produce_type.split(',')
              this.form.produce_type = this.form.produce_type.map((item) => {
                return Number(item)
              })
            } else {
              this.form.produce_type = [Number(this.form.produce_type)]
            }
          }
          if (this.form.produce_type != undefined) {
            if (this.form.craft_type.indexOf(',') != -1) {
              this.form.craft_type = this.form.craft_type.split(',')
              this.form.craft_type = this.form.craft_type.map((item) => {
                return Number(item)
              })
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
        const { data } = await this.api.getCommonAllList({
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
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (e == 2) {
              this.form.drawerType = e
              this.$forceUpdate()
              return
            }
            if (this.form.id == undefined) {
              this.form.id = 0
              const { code } = await this.api.editSupplierSave(this.form)
              if (code == 200) {
                this.$baseMessage(
                  '新增成功',
                  'success',
                  'vab-hey-message-success'
                )
                const { code } = await this.api.getSupplierEditDetail({
                  id: this.form.id,
                })
                if (code == 200) {
                  this.$emit('fetch-data', 1)
                }
              }
            } else {
              if (this.form.craft_type != undefined) {
                this.form.craft_type = this.form.craft_type.join(',')
              }
              if (this.form.produce_type != undefined) {
                this.form.produce_type = this.form.produce_type.join(',')
              }
              const { code } = await this.api.editSupplierSave(this.form)
              if (code == 200) {
                this.$baseMessage(
                  '修改成功',
                  'success',
                  'vab-hey-message-success'
                )
                const { data } = await this.api.getSupplierEditDetail({
                  id: this.form.id,
                })
                this.form.drawerType = data[0]
                this.form.drawerType = e
                this.search_type = '0'
                this.form.address1 = [
                  this.form.province,
                  this.form.city,
                  this.form.district,
                ]
                if (this.form.produce_type != undefined) {
                  if (this.form.produce_type.indexOf(',') != -1) {
                    this.form.produce_type = this.form.produce_type.split(',')
                    this.form.produce_type = this.form.produce_type.map(
                      (item) => {
                        return Number(item)
                      }
                    )
                  } else {
                    this.form.produce_type = [Number(this.form.produce_type)]
                  }
                }
                if (this.form.produce_type != undefined) {
                  if (this.form.craft_type.indexOf(',') != -1) {
                    this.form.craft_type = this.form.craft_type.split(',')
                    this.form.craft_type = this.form.craft_type.map((item) => {
                      return Number(item)
                    })
                  } else {
                    this.form.craft_type = [Number(this.form.craft_type)]
                  }
                }
                this.$emit('fetch-data')
              }
            }
          }
        })
      },
      async handleClick(tab) {
        this.listLoading = true
        this.search_type = tab.name
        if (tab.name == 0) {
          return
        }
        const { data } = await this.api.editSupplierDetail({
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
