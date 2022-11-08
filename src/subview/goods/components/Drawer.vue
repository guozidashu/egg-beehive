<template>
  <div class="components-drawer">
    <div v-if="form.drawerType != 3">
      <div style="padding: 30px 35px 25px">
        <div>
          <el-row :gutter="20">
            <el-col :span="12" style="display: flex">
              <img
                :src="form.img"
                style="width: 50px; height: 50px; margin: 0 10px 10px 0"
              />
              <div style="margin-top: -5px">
                <div style="margin: 15px 0 0 0">款号：{{ form.name }}</div>
                <div>名称：{{ form.name }}</div>
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
                @click="upMembers(3)"
              >
                停售
              </el-button>
              <el-button
                v-if="form.drawerType == 1"
                native-type="submit"
                size="small"
                style="float: right"
                type="primary"
                @click="print('vab-print-table')"
              >
                打印
              </el-button>
              <el-button
                native-type="submit"
                size="small"
                style="float: right"
                type="primary"
                @click="upMembers(1)"
              >
                审核
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
                style="float: right"
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
        v-model="activeName"
        style="padding: 0 25px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="商品信息" name="first" />
        <el-tab-pane label="客户销售" name="second" />
        <el-tab-pane label="发货信息" name="three" />
        <el-tab-pane label="退货信息" name="four" />
        <el-tab-pane label="入库信息" name="five" />
        <el-tab-pane label="出库信息" name="six" />
        <el-tab-pane label="调整信息" name="seven" />
        <el-tab-pane label="库存明细" name="eight" />
      </el-tabs>
    </div>
    <div v-if="tabindex == '0'">
      <div v-if="form.drawerType == 1" ref="vab-print-table" class="drawer-tab">
        <div class="conten-warp">
          <div class="conten-title">基本信息</div>
          <div class="conten-list-row">
            <div>商品款号：wf46546546</div>
            <div>商品名称： 名称一</div>
            <div>商品标题： 标题一</div>
            <div>商品分类：分类一</div>
            <div>商品品牌： 品牌一</div>
            <div>年份：2001</div>
            <div>季节： 春季</div>
            <div>上市波段： 2020</div>
            <div>年龄段： 90后</div>
            <div>性别： 男</div>
            <div>供应商： 供应商</div>
            <div>
              商品图片：
              <img :src="avatar" style="width: 20px; height: 20px" />
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">规格及库位</div>
          <div class="conten-list-row">
            <div>颜色：红色</div>
            <div>尺码：50/60/70</div>
            <div>商品条码： 1111111111111</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">价格信息</div>
          <div class="conten-list-row">
            <div>采购价： ￥500</div>
            <div>成本价： ￥500</div>
            <div>吊牌价： ￥500</div>
            <div>销售价： ￥500</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">其它信息</div>
          <div class="conten-list-row">
            <div style="width: 50%">创建时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div style="width: 50%">更新时间： 2020-02-02 10:10:10</div>
            <div style="width: 50%">操作人员： 阿白</div>
            <div>商品库位：库位一</div>
            <div>上架商城： 待确认</div>
            <div>是否同步到聚水潭： 允许</div>
            <div>库存预警： 预警信息</div>
            <div>设计师： 阿白</div>
            <div>设计师编号： 4654646</div>
            <div>商品状态： 在售</div>
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
                label="商品款号："
                style="font-size: 12px"
              >
                <el-input
                  v-model="form.sn"
                  placeholder="请输入款号"
                  style="width: 215px"
                />
              </el-form-item>

              <el-form-item class="item" label="商品名称：">
                <el-input
                  v-model="form.name"
                  placeholder="请输入商品名称"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品标题：">
                <el-input
                  v-model="form.shoptitle"
                  placeholder="请输入商品标题"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品款式：">
                <el-select v-model="form.category" placeholder="请选择商品款式">
                  <el-option
                    v-for="(item, index) in selectData[4].category"
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
              <el-form-item class="item" label="商品品牌：">
                <el-select v-model="form.brand" placeholder="请选择商品品牌：">
                  <el-option
                    v-for="(item, index) in selectData[0].brand"
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
              <el-form-item class="item" label="年份：">
                <el-select v-model="form.year" placeholder="请选择年份：">
                  <el-option
                    v-for="(item, index) in selectData[1].year"
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
              <el-form-item class="item" label="季节：">
                <el-select v-model="form.season" placeholder="请选择季节：">
                  <el-option
                    v-for="(item, index) in selectData[2].season"
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
              <el-form-item class="item" label="上市波段：">
                <el-select v-model="form.band" placeholder="请选择上市波段：">
                  <el-option
                    v-for="(item, index) in selectData[3].band"
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
              <el-form-item class="item" label="年龄段：">
                <el-select v-model="form.agegroup" placeholder="请选择年龄段：">
                  <el-option
                    v-for="(item, index) in selectData[5].agegroup"
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
              <el-form-item class="item" label="性别：">
                <el-select v-model="form.gender" placeholder="请选择性别：">
                  <el-option label="女" value="1" />
                  <el-option label="男" value="2" />
                  <el-option label="中" value="3" />
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="商品图片：">
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
            <div class="conten-title">规格及库位</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="颜色：">
                <el-cascader
                  v-model="form.colorid"
                  :options="selectData[6].color"
                  :props="{ expandTrigger: 'hover' }"
                />
                <i
                  class="el-icon-plus"
                  style="margin-left: 10px; color: #1890ff"
                ></i>
              </el-form-item>
              <el-form-item class="item" label="尺码：">
                <el-select v-model="form.sizeid" placeholder="请选择尺码：">
                  <el-option
                    v-for="(item, index) in selectData[3].band"
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
              <el-form-item class="item" label="商品条码：">
                <el-input
                  v-model="form.addressKeyword"
                  clearable
                  style="width: 215px"
                >
                  <el-button slot="append" icon="el-icon-search">
                    生成
                  </el-button>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">价格信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="采购价：">
                <el-input v-model="form.purchase_price" style="width: 215px" />
              </el-form-item>
              <el-form-item class="item" label="成本价：">
                <el-input v-model="form.addressKeyword" style="width: 215px" />
              </el-form-item>
              <el-form-item class="item" label="吊牌价：">
                <el-input v-model="form.sale_price" style="width: 215px" />
              </el-form-item>
              <el-form-item class="item" label="销售价：">
                <el-input v-model="form.price" clearable style="width: 215px">
                  <el-button slot="append" @click="changeType(1)">
                    固定价
                  </el-button>
                </el-input>
                <el-button
                  v-if="lockSta"
                  native-type="submit"
                  size="small"
                  style="margin-left: 10px"
                  type="primary"
                  @click="changeType(2)"
                >
                  <span v-if="lxSta">整手</span>
                  <span v-else>散码</span>
                </el-button>
              </el-form-item>
              <el-form-item v-if="lockSta" class="item" style="width: 100%">
                <List
                  :list="zhekouList"
                  :list-type="listType"
                  :state="listLoading"
                >
                  <template #List>
                    <el-table-column
                      label="会员名称"
                      prop="name"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="折扣"
                      prop="zhekou"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="折扣前"
                      prop="qian"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="折扣后"
                      prop="hou"
                      show-overflow-tooltip
                    />
                  </template>
                </List>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="drawer-tab">
          <div class="conten-warp">
            <div class="conten-title">其它信息</div>
            <div class="conten-list-com">
              <el-form-item class="item" label="商品库位：">
                <el-select v-model="form.brand" placeholder="请选择库位：">
                  <el-option
                    v-for="(item, index) in selectData[3].band"
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
              <el-form-item class="item" label="上架商城：">
                <el-radio-group v-model="form.name">
                  <el-radio :label="0">待确认</el-radio>
                  <el-radio :label="1">立即上架</el-radio>
                  <el-radio :label="2">定时上架</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="是否同步到聚水潭：">
                <el-radio-group v-model="form.name">
                  <el-radio :label="0">充许</el-radio>
                  <el-radio :label="1">禁止</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="item" label="库存预警：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入预警信息"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="设计师：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入设计师"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="设计师编号：">
                <el-input
                  v-model="form.addressKeyword"
                  placeholder="请输入设计师编号"
                  style="width: 215px"
                />
              </el-form-item>
              <el-form-item class="item" label="商品状态：">
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
      selectList: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        lxSta: false,
        lockSta: false,
        dialogVisible1: false,
        distitle1: '',
        activeName: 'first',
        tabindex: '0',
        form: Object.assign({}, this.drawerInof),
        selectData: Object.assign({}, this.selectList),
        listLoading: false,
        listType: 2,
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
            name: '总销量',
            value: '¥24750',
          },
          {
            name: '总销售额',
            value: '34750',
          },
          {
            name: '库存数',
            value: '247',
          },
          {
            name: '库存价值',
            value: '800元',
          },
          {
            name: '总发货',
            value: '500',
          },
          {
            name: '总入库',
            value: '34750',
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
          console.log(111111, newVal)
        },
        deep: true,
      },
      selectList: {
        handler: function (newVal) {
          this.selectData = Object.assign({}, newVal)
          console.log(2222222, newVal)
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
      changeType(val) {
        if (val == 1) {
          this.lockSta = !this.lockSta
          console.log(this.form.lock_price)
          if (this.form.lock_price != 1) {
            this.form.lock_price = 1
          } else {
            this.form.lock_price = 0
          }
        } else {
          this.lxSta = !this.lxSta
          if (this.form.type != 1) {
            this.form.type = 1
          } else {
            this.form.type = 0
          }
        }
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        console.log(selectProvince, selectCity, selectArea)
      },
      handleClose1() {
        this.dialogVisible1 = false
      },
      upMembers(type) {
        if (type == 1) {
          this.$baseConfirm('你确定要审核当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('审核成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        } else if (type == 2) {
          this.$baseConfirm('你确定要强制下线当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage(
              '强制下线成功',
              'success',
              'vab-hey-message-success'
            )
            this.fetchData()
          })
        } else if (type == 3) {
          this.$baseConfirm('你确定要停售当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('停售成功', 'success', 'vab-hey-message-success')
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
