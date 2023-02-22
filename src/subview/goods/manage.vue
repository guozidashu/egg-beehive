<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="款式类别:">
            <el-select v-model="form.category" placeholder="请选择类别款式">
              <el-option
                v-for="(item, index) in selectList.category"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:">
            <el-select v-model="form.brand" placeholder="请选择品牌">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年份:">
            <el-select v-model="form.year" placeholder="请选择年份">
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="季节:">
            <el-select v-model="form.season" placeholder="请选择季节">
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="form.status">
              <el-option label="停售" value="2" />
              <el-option label="在售" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="推荐:">
            <el-select v-model="form.recommend">
              <el-option label="取消推荐" value="0" />
              <el-option label="推荐中" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="尺码类型:">
            <el-select v-model="form.type">
              <el-option label="整手" value="0" />
              <el-option label="散码" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="上市波段:">
            <el-select v-model="form.band" placeholder="请选择波段">
              <el-option
                v-for="(item, index) in selectList.band"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称/款号"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.list_type" @tab-click="handleClick">
        <el-tab-pane
          :label="'全部商品 (' + tatleData.all_order + ')'"
          name="0"
        />
        <!-- <el-tab-pane
          :label="'仓库中 (' + tatleData.repository + ')'"
          name="1"
        /> -->
        <el-tab-pane :label="'已售罄 (' + tatleData.sole_out + ')'" name="2" />
        <el-tab-pane
          :label="'库存预警 (' + tatleData.stock_alert + ')'"
          name="3"
        />
        <el-tab-pane
          :label="'已同步聚水潭 (' + tatleData.jushuitan_sync + ')'"
          name="7"
        />
        <el-tab-pane
          :label="'未同步聚水潭 (' + tatleData.jushuitan_not_sync + ')'"
          name="8"
        />
        <!-- <el-tab-pane :label="'待确认 (' + tatleData.confirmed + ')'" name="4" /> -->
        <!-- <el-tab-pane
          :label="'自营商城 (' + tatleData.self_operated + ')'"
          name="5"
        />
        <el-tab-pane
          :label="'第三方平台 (' + tatleData.third_platform + ')'"
          name="6"
        /> -->
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:GoodsManage:add']"
            size="small"
            type="primary"
            @click="handleDetail('add', 3)"
          >
            添加商品
          </el-button>
          <el-button size="small" type="primary" @click="handleEdit(0)">
            批量停售
          </el-button>
          <el-button size="small" type="primary" @click="handleEdit(1)">
            批量在售
          </el-button>
          <el-button
            v-has-permi="['btn:GoodsManage:synchronization']"
            size="small"
            type="primary"
            @click="handleEditJST()"
          >
            批量同步聚水潭
          </el-button>
          <el-button size="small" type="primary" @click="handleDerive()">
            批量导出
          </el-button>
        </el-form-item>
      </el-form>
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="商品Id" prop="id" width="80" />
          <el-table-column label="款号" prop="sn" width="100" />
          <el-table-column label="商品图" prop="img" width="80">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.img"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.img" style="width: 50px; height: 50px" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" width="180" />
          <el-table-column label="商品标题" prop="shoptitle" />
          <el-table-column label="款号类别" prop="type" width="80">
            <template #default="{ row }">
              <span v-if="row.type == 0">整手</span>
              <span v-else-if="row.type == 1">散码</span>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="销售价"
            prop="price"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="吊牌价"
            prop="sale_price"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sale_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column label="预售状态" prop="status" width="120">
            <template #default="{ row }">
              <div
                v-if="row.goods_persell.length == 0"
                style="margin-bottom: 10px"
              >
                <el-tag>没有设置预售</el-tag>
              </div>
              <div v-else style="margin-bottom: 10px">
                <el-switch
                  v-model="row.goods_persell.status"
                  active-color="#41B584"
                  active-text="开启"
                  :active-value="1"
                  class="switch"
                  inactive-color="#D2D2D2"
                  inactive-text="关闭"
                  :inactive-value="0"
                  style="margin: 0 10px"
                  @change="turnOnOff(row)"
                />
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="状态" prop="status" width="120">
            <template #default="{ row }">
              <div v-if="row.status == 1" style="margin-bottom: 10px">
                <el-tag>在售</el-tag>
              </div>
              <div v-else style="margin-bottom: 10px">
                <el-tag type="danger">停售</el-tag>
              </div>
              <div v-if="row.recommend == 0">
                <el-tag type="danger">已取消推荐</el-tag>
              </div>
              <div v-else-if="row.recommend == 1">
                <el-tag>推荐中</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="销量" prop="xl_num" width="120" />
          <el-table-column label="库存" prop="xh_num" width="100" />
          <el-table-column label="聚水潭库存" prop="jst_xh_num" width="100" />
          <el-table-column
            label="聚水潭占用库存"
            prop="jst_occupy_num"
            width="100"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="150"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:GoodsManage:view']"
                type="text"
                @click="handleDetail(row, 1)"
              >
                详情
              </el-button>
              <el-button
                v-has-permi="['btn:GoodsManage:edit']"
                type="text"
                @click="handleDetail(row, 2)"
              >
                编辑
              </el-button>
              <el-button
                v-if="row.status == 2 || row.status == 3"
                type="text"
                @click="handleEdit(4, row)"
              >
                在售
              </el-button>
              <el-button
                v-if="row.status == 1"
                type="text"
                @click="handleEdit(3, row)"
              >
                停售
              </el-button>
              <el-button
                v-if="row.recommend == 1"
                type="text"
                @click="handleEdit(5, row)"
              >
                取消推荐
              </el-button>
              <el-button
                v-if="row.recommend == 0"
                type="text"
                @click="handleEdit(6, row)"
              >
                设置推荐
              </el-button>
              <!-- <el-button
                v-has-permi="['btn:GoodsManage:presell']"
                type="text"
                @click="handlePresell(row)"
              >
                设置预售
              </el-button> -->
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <Drawer
        :drawer-inof="drawerInof"
        :select-list="selectList"
        @fetch-data="fetchData"
        @handle-close="handleClose"
      />
    </el-drawer>
    <el-dialog
      :append-to-body="true"
      :before-close="handleMaterialClose"
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="formDialog" label-width="80px" :model="formDialog">
        <el-form-item label="文案文本：">
          <el-input
            v-model="formDialog.copywriting"
            :autosize="{ minRows: 2, maxRows: 4 }"
            style="white-space: pre-line"
            type="textarea"
          />
        </el-form-item>
        <el-form-item class="item" label="文案图片：">
          <div
            v-if="formDialog.source_material.length > 0"
            style="display: flex"
          >
            <div
              v-for="(item, index) in formDialog.source_material"
              :key="index"
              style="display: flex; margin: 10px"
            >
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="item"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="item" style="width: 50px; height: 50px" />
              </el-tooltip>
              <i
                class="el-icon-close"
                style="position: relative; top: -12px; left: -8px"
                @click="handleRemove(index)"
              ></i>
            </div>
          </div>
          <el-button size="small" type="primary" @click="handleShow()">
            上传
          </el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMaterialSub">确 定</el-button>
      </span>
    </el-dialog>
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Drawer from '@/subview/components/Drawer/GoodsDrawer'
  import Edit from '@/subview/components/Edit/PresellEdit'
  import VabUpload from '@/extra/VabUpload'
  import {
    getGoodList,
    getCommonAllList,
    editGoodBatchLower,
    getGoodTabTotal,
    editSourceMaterialSave,
    editChangeRecommend,
    saveGoodsSyncJuShuiTan,
    getGoodsExport,
    changePresellStatus,
  } from '@/api/basic'
  import publicjosn from '@/assets/assets_josn/publicjosn'
  export default {
    name: 'GoodsManage',
    components: { Drawer, VabUpload, Edit },
    mixins: [publicjosn],
    data() {
      return {
        title: '',
        drawer: false,
        drawerInof: {},
        dialogVisible: false,
        formDialog: {
          goods_id: null,
          source_material: [],
          copywriting: '',
        },
        tatleData: {
          all_order: null, // 全部
          repository: null, // 仓库中
          sole_out: null, // 已售完
          stock_alert: null, // 预警
          confirmed: null, // 待确认
          self_operated: null, // 自营
          third_platform: null, // 第三方
          jushuitan_not_sync: null, // 聚水潭未同步
          jushuitan_sync: null, // 聚水潭已同步
        },
        form: {
          page: 1,
          pageSize: 10,
          list_type: 0, // 列表类型 0=全部 1=仓库中 2=已售完 3=库存预警 4=待确认 5=自营商城 6=第三方平台
          category: '', //款式分类
          brand: '', //品牌
          year: '', //年份
          season: '', //季节
          type: '', //尺码类型 0整手  1散码
          band: '', //波段
          name: '', //商品名称
          recommend: '', //推荐
          status: '', //状态
        },
        listType: 1,
        formType: 4,
        list: [],
        selectList: [],
        selectRowsId: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler: function () {
          this.fetchData()
          this.getTatolData()
        },
        deep: true,
      },
    },
    created() {
      this.getGoodsTypeList()
    },
    methods: {
      async turnOnOff(row) {
        const { code } = await changePresellStatus({ goods_id: row.id })
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
      // 预售设置
      handlePresell(row) {
        this.$refs['edit'].showEdit(row)
      },
      async handleDerive() {
        const { code, data } = await getGoodsExport(this.form)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      async handleMaterialSub() {
        const { code } = await editSourceMaterialSave(this.formDialog)
        if (code == 200) {
          this.$message.success('操作成功')
          this.dialogVisible = false
          this.formDialog = {
            goods_id: null,
            source_material: [],
            copywriting: '',
          }
          this.fetchData()
        }
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      handleRemove(index) {
        this.formDialog.source_material.splice(index, 1)
      },
      getSon(data) {
        this.formDialog.source_material = data
      },
      handleMaterial(row) {
        if (row.source_material != null) {
          this.formDialog = row.source_material
          this.formDialog.source_material = JSON.parse(
            this.formDialog.source_material
          )
          this.formDialog.copywriting = this.formDialog.copywriting.replace(
            /\\n/g,
            '\n'
          )
        } else {
          this.formDialog = {
            goods_id: row.id,
            source_material: [],
            copywriting: '',
          }
        }
        this.dialogVisible = true
      },
      handleMaterialClose() {
        this.dialogVisible = false
        this.formDialog = {
          goods_id: null,
          source_material: [],
          copywriting: '',
        }
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      handleQuery() {
        this.fetchData()
        this.getTatolData()
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        this.form.list_type = tab.name
      },

      async fetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        const { data } = await getGoodList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async getTatolData() {
        const { data } = await getGoodTabTotal(this.form)
        this.tatleData = data
      },
      async getGoodsTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,year,season,band,category,agegroup,color,size',
        })
        this.selectList = data
      },

      handleDetail(row, type) {
        if (type === 1) {
          this.title = '商品详情'
          this.drawerInof.path = 'erp'
        } else if (type === 2) {
          this.title = '编辑商品'
        } else {
          this.title = '添加商品'
        }
        if (row == 'add') {
          this.drawerInof = {}
          this.drawerInof.drawerType = type
          this.drawerInof.purchase_price = 0
          this.drawerInof.is_jushuitan = 0
          this.drawerInof.cost_price = 0
          this.drawerInof.sale_price = 0
          this.drawerInof.price = 0
          this.drawerInof.status = 1
          this.drawerInof.lockSta = false
        } else {
          this.drawerInof = JSON.parse(JSON.stringify(row))
          this.drawerInof.drawerType = type
          this.drawerInof.lockSta = false
        }
        this.drawer = true
      },
      handleClose() {
        this.drawer = false
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      handleEditJST() {
        if (this.selectRowsId.length > 0) {
          let ids = this.selectRowsId.map((item) => item.id)
          this.$baseConfirm(
            '你确定要将选中商品同步聚水潭吗?',
            null,
            async () => {
              const { msg } = await saveGoodsSyncJuShuiTan({
                goods_id: ids,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
              await this.getTatolData()
            }
          )
        } else {
          this.$message.error('请先选择商品')
        }
      },
      handleEdit(type, row) {
        if (this.selectRowsId.length > 0) {
          if (type == 1) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.status == 1) {
                this.$message.error('所选数据中有已在售的商品')
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            let ids = this.selectRowsId.map((item) => item.id)
            this.$baseConfirm('你确定要在售选中项吗', null, async () => {
              const { msg } = await editGoodBatchLower({
                good_ids: ids,
                status: type,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 0) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.status == 0) {
                this.$message.error('所选数据中有已停售的商品')
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            let ids = this.selectRowsId.map((item) => item.id)
            this.$baseConfirm('你确定要停售选中项吗', null, async () => {
              const { msg } = await editGoodBatchLower({
                good_ids: ids,
                status: type,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          }
        } else {
          if (type == 3) {
            this.$baseConfirm('你确定要停售改项吗', null, async () => {
              const { msg } = await editGoodBatchLower({
                good_ids: row.id,
                status: 2,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 4) {
            this.$baseConfirm('你确定要在售改项吗', null, async () => {
              const { msg } = await editGoodBatchLower({
                good_ids: row.id,
                status: 1,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 5) {
            this.$baseConfirm('你确定要设置该项为推荐吗？', null, async () => {
              const { msg } = await editChangeRecommend({
                id: row.id,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 6) {
            this.$baseConfirm('你确定要取消该项为推荐吗', null, async () => {
              const { msg } = await editChangeRecommend({
                id: row.id,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
