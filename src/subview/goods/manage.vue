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
      <!-- 查询条件 -->
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
          <el-form-item label="状态:">
            <el-select v-model="form.status">
              <el-option label="停售" value="2" />
              <el-option label="在售" value="1" />
              <el-option label="待上市" value="3" />
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
      <!-- tab 选项卡 -->
      <el-tabs v-model="form.list_type" @tab-click="handleClick">
        <el-tab-pane
          :label="'全部商品 (' + tatleData.all_order + ')'"
          name="0"
        />
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
      </el-tabs>
      <!-- 操作按钮 -->
      <div style="display: flex; justify-content: space-between">
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
            <el-button
              size="small"
              type="primary"
              @click="handleExportBarcode()"
            >
              批量导出条形码
            </el-button>
          </el-form-item>
        </el-form>
        <el-form class="demo-form-inline" :inline="true" :model="form">
          <el-form-item label="排序">
            <el-select v-model="form.sort_field" style="width: 150px">
              <el-option label="按创建时间" value="create_time" />
              <el-option label="按上架时间" value="upper_time" />
              <el-option label="按商品款号" value="sn" />
            </el-select>
          </el-form-item>
          <el-radio-group v-model="form.sort_type">
            <el-radio-button label="asc">正序</el-radio-button>
            <el-radio-button label="desc">倒序</el-radio-button>
          </el-radio-group>
        </el-form>
      </div>

      <!-- 表格 -->
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column align="center" type="selection" width="40" />
          <el-table-column align="center" label="类型" width="80">
            <template #default="{ row }">
              <el-tag v-if="row.type == 0" effect="plain" type="success">
                整手
              </el-tag>
              <el-tag v-else-if="row.type == 1" effect="plain" type="danger">
                散码
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="商品信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image :src="row.img" style="width: 105px; height: 105px">
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    {{ row.sn }}
                  </div>

                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 5px 0 0 0;
                    "
                  >
                    <div
                      style="
                        width: 150px;
                        overflow: hidden;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ row.name }}
                    </div>
                  </div>

                  <div style="display: flex; width: 100%; margin: 5px 0">
                    <el-tag v-if="row.cate_name != null" type="info">
                      {{ row.cate_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="row.year_name != null" type="info">
                      {{ row.year_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="row.season_name != null" type="info">
                      {{ row.season_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="row.band_name != null" type="info">
                      {{ row.band_name }}
                    </el-tag>
                  </div>
                  <div style="margin: 5px 0 0 0">
                    {{ row.upper_time | formatTime }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="销售价" prop="price">
            <template #default="{ row }">
              <el-tag>￥{{ row.price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="销量" prop="xl_num" />
          <el-table-column align="center" label="自有仓" prop="xh_num" />
          <el-table-column
            align="center"
            label="聚水潭可用库存"
            prop="jst_xh_num"
          />
          <el-table-column
            align="center"
            label="聚水潭占用库存"
            prop="jst_occupy_num"
          />
          <el-table-column align="center" label="生产中" prop="zsc_num" />
          <el-table-column align="center" label="状态" prop="status">
            <template #default="{ row }">
              <div v-if="row.status == 1" style="margin-bottom: 10px">
                <el-tag>在售</el-tag>
              </div>
              <div v-else-if="row.status == 2" style="margin-bottom: 10px">
                <el-tag type="danger">停售</el-tag>
              </div>
              <div v-else-if="row.status == 3" style="margin-bottom: 10px">
                <el-tag type="warning">待上市</el-tag>
              </div>

              <div v-if="row.is_shop == 1" style="margin-bottom: 10px">
                <el-tag type="danger">未置顶</el-tag>
              </div>
              <div v-else-if="row.is_shop == 2" style="margin-bottom: 10px">
                <el-tag>置顶</el-tag>
              </div>
              <div v-if="row.recommend == 0">
                <el-tag type="danger">已取消推荐</el-tag>
              </div>
              <div v-else-if="row.recommend == 1">
                <el-tag>推荐中</el-tag>
              </div>
            </template>
          </el-table-column>

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
              &nbsp;
              <el-dropdown>
                <el-button class="el-dropdown-link" type="text">
                  <span>更多</span>
                  <vab-icon
                    class="vab-dropdown-active"
                    icon="arrow-up-s-line"
                  />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
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
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="addColor(row)">
                      添加颜色
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
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
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 详情编辑新增抽屉 -->
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

    <!-- 添加颜色弹窗 -->
    <ColorEdit
      ref="ColorEdit"
      :drawer-sta="drawerColor"
      @fetch-data="fetchData"
    />
  </div>
</template>

<script>
  import Drawer from '@/subview/components/Drawer/GoodsDrawer'
  import ColorEdit from '@/subview/components/Edit/AddColorEdit'
  export default {
    components: { Drawer, ColorEdit },
    data() {
      return {
        // 添加颜色 弹窗
        drawerColor: false,

        // 抽屉相关 标题，是否显示，数据
        title: '',
        drawer: false,
        drawerInof: {},
        // 表格 tab 数据
        tatleData: {
          all_order: null, // 全部
          sole_out: null, // 已售完
          stock_alert: null, // 预警
          jushuitan_not_sync: null, // 聚水潭未同步
          jushuitan_sync: null, // 聚水潭已同步
        },
        // 下拉框数据
        selectList: [],
        // 表格选中 ids
        selectRowsId: [],
        // 表格相关数据 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        pageState: false,
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          sort_field: 'upper_time',
          sort_type: 'desc',
          page: 1,
          pageSize: 10,
          list_type: '0', // 列表类型 0=全部 1=仓库中 2=已售完 3=库存预警 4=待确认 5=自营商城 6=第三方平台
          category: '',
          brand: '',
          year: '',
          season: '',
          type: '', //尺码类型 0整手  1散码
          band: '',
          name: '',
          recommend: '',
          status: '1', //状态 1 在售 2 售罄 3 待上市
        },
        listType: 1,
        formType: 4,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单数据变化
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.getTatolData()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.getGoodsTypeList()
      this.fetchData()
      this.getTatolData()
    },
    methods: {
      // 添加颜色弹窗
      addColor(row) {
        this.$refs['ColorEdit'].showEdit(row)
      },

      // 导出商品条形码
      async handleExportBarcode() {
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { code, data } = await this.api.getGoodsExportBarcode(
          this.formTemp
        )
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 导出商品
      async handleDerive() {
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { code, data } = await this.api.getGoodsExport(this.formTemp)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 查询
      handleQuery() {
        this.fetchData()
        this.getTatolData()
      },
      // tab 切换
      handleClick(tab) {
        this.form.list_type = tab.name
      },
      // 商品列表
      async fetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getGoodList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 商品 tab 总数
      async getTatolData() {
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getGoodTabTotal(this.formTemp)
        this.tatleData = data
      },
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,year,season,band,category,agegroup,color,size',
        })
        this.selectList = data
      },
      // 商品详情编辑新增抽屉
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
          this.drawerInof.manage_price = 0
          this.drawerInof.price = 0
          this.drawerInof.status = 3
          this.drawerInof.lockSta = false
        } else {
          this.drawerInof = JSON.parse(JSON.stringify(row))
          this.drawerInof.drawerType = type
          this.drawerInof.lockSta = false
        }
        this.drawer = true
      },
      // 商品详情编辑新增抽屉关闭
      handleClose() {
        this.drawer = false
      },
      // 重置表单
      resetForm() {
        this.form = {
          sort_field: 'upper_time',
          sort_type: 'desc',
          page: 1,
          pageSize: 10,
          list_type: '0', // 列表类型 0=全部 1=仓库中 2=已售完 3=库存预警 4=待确认 5=自营商城 6=第三方平台
          category: '',
          brand: '',
          year: '',
          season: '',
          type: '', //尺码类型 0整手  1散码
          band: '',
          name: '',
          recommend: '',
          status: '1', //状态 1 在售 2 售罄 3 待上市
        }
      },
      // 列表选中数据
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      // 同步聚水潭
      handleEditJST() {
        if (this.selectRowsId.length > 0) {
          let ids = this.selectRowsId.map((item) => item.id)
          this.$baseConfirm(
            '你确定要将选中商品同步聚水潭吗?',
            null,
            async () => {
              const { msg } = await this.api.saveGoodsSyncJuShuiTan({
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
      // 停在售 推荐 取消推荐 批量停在售
      handleEdit(type, row) {
        if (this.selectRowsId.length > 0) {
          if (type == 1) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (temp) {
                return
              }
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
              const { msg } = await this.api.editGoodBatchLower({
                good_ids: ids,
                status: 1,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 0) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (temp) {
                return
              }
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
              const { msg } = await this.api.editGoodBatchLower({
                good_ids: ids,
                status: 2,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          }
        } else {
          if (type == 3) {
            this.$baseConfirm('你确定要停售改项吗', null, async () => {
              const { msg } = await this.api.editGoodBatchLower({
                good_ids: [row.id],
                status: 2,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 4) {
            this.$baseConfirm('你确定要在售改项吗', null, async () => {
              const { msg } = await this.api.editGoodBatchLower({
                good_ids: [row.id],
                status: 1,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 5) {
            this.$baseConfirm('你确定要设置该项为推荐吗？', null, async () => {
              const { msg } = await this.api.editChangeRecommend({
                id: row.id,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 6) {
            this.$baseConfirm('你确定要取消该项为推荐吗', null, async () => {
              const { msg } = await this.api.editChangeRecommend({
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
