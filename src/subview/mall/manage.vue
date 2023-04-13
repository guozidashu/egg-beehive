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
          <el-form-item label="预售状态:">
            <el-select v-model="form.presell">
              <el-option label="未预售" value="0" />
              <el-option label="预售中" value="1" />
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
      <!-- tabs切换 -->
      <el-tabs v-model="form.shop_type" @tab-click="handleClick">
        <el-tab-pane
          :label="'全部商品 (' + tatleData.all_order + '款)'"
          name="3"
        />
        <el-tab-pane
          :label="'上架中 (' + tatleData.on_the_shelf + '款)'"
          name="1"
        />
        <el-tab-pane
          :label="'已下架(' + tatleData.stock_zero + '款)'"
          name="2"
        />
        <el-tab-pane
          :label="'售空 (' + tatleData.down_the_shelf + '款)'"
          name="4"
        />
      </el-tabs>
      <!-- 操作按钮 -->
      <div style="display: flex; justify-content: space-between">
        <el-form ref="form" :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-button
              v-has-permi="['btn:MallManage:shelves']"
              size="small"
              type="primary"
              @click="handleEdit(0)"
            >
              批量下架
            </el-button>
            <el-button
              v-has-permi="['btn:MallManage:upshelves']"
              size="small"
              type="primary"
              @click="handleEdit(1)"
            >
              批量上架
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

      <!-- 表格组件使用 -->
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
          <el-table-column label="商品信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image
                    :src="row.img"
                    style="width: 105px; height: 105px"
                  />
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
          <el-table-column align="center" label="吊牌价" prop="sale_price">
            <template #default="{ row }">
              <el-tag>￥{{ row.sale_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="销量" prop="xl_num" />
          <el-table-column align="center" label="库存" prop="xh_num" />
          <el-table-column
            align="center"
            label="聚水潭库存"
            prop="jst_xh_num"
          />
          <el-table-column
            align="center"
            label="聚水潭占用库存"
            prop="jst_occupy_num"
          />

          <el-table-column align="center" label="预售状态" prop="status">
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
                  style="margin: 0 10px; text-align: left"
                  @change="turnOnOff(row)"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" prop="status">
            <template #default="{ row }">
              <div v-if="row.is_shop == 1" style="margin-bottom: 10px">
                <el-tag>上架</el-tag>
              </div>
              <div v-else style="margin-bottom: 10px">
                <el-tag type="danger">下架</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:MallManage:view']"
                type="text"
                @click="handleDetail(row, 1)"
              >
                查看
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
                      v-if="row.is_shop == 1"
                      v-has-permi="['btn:MallManage:shelves']"
                      type="text"
                      @click="handleEdit(3, row)"
                    >
                      下架商品
                    </el-button>
                    <el-button
                      v-else
                      v-has-permi="['btn:MallManage:upshelves']"
                      type="text"
                      @click="handleEdit(4, row)"
                    >
                      上架商品
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      v-has-permi="['btn:MallManage:upload']"
                      type="text"
                      @click="handleMaterial(row)"
                    >
                      素材上传
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="handleCommodityDetails(row)">
                      商品详情
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      v-has-permi="['btn:MallManage:presell']"
                      type="text"
                      @click="handlePresell(row)"
                    >
                      设置预售
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 详情抽屉组件 -->
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
      />
    </el-drawer>
    <!-- 素材上传新增编辑弹窗 -->
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
          <el-button size="small" type="primary" @click="handleShow(0)">
            上传
          </el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMaterialSub">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 商品详情新增编辑弹窗 -->
    <el-dialog
      :append-to-body="true"
      :before-close="handleMaterialClose1"
      title="提示"
      :visible.sync="dialogVisible1"
      width="60%"
    >
      <el-form
        ref="formDialog"
        label-width="120px"
        :model="formCommodityDetails"
      >
        <el-form-item label="轮播图：" prop="logo">
          <el-button type="primary" @click="handleShow(1)">多图上传</el-button>
          <div
            v-if="formCommodityDetails.shop_multiplot.length > 0"
            style="display: flex; flex-wrap: wrap; margin-top: 20px"
          >
            <div
              v-for="(item, index) in formCommodityDetails.shop_multiplot"
              :key="index"
              style="position: relative; padding: 10px"
            >
              <span
                style="position: absolute; top: 0; right: 0"
                @click="delImg(index)"
              >
                x
              </span>
              <img :src="item" style="width: 100px; height: 100px" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div style="font-size: 12px; color: gray">推荐图片宽度750px</div>
        </el-form-item>
        <div style="display: flex">
          <el-form-item
            class="vab-quill-content"
            label="商品详情编辑："
            style="width: 500px"
          >
            <div style="height: 800px; overflow: auto">
              <vab-quill
                ref="vab-quill"
                v-model="formCommodityDetails.detail"
                :min-height="600"
                :options="options"
              />
            </div>
          </el-form-item>
          <el-form-item
            class="vab-quill-content"
            label="商品详情预览："
            style="width: 500px"
          >
            <div style="display: flex">
              <div style="width: 100%; margin-left: 20px">
                <div class="ql-container">
                  <div
                    class="ql-editor"
                    style="width: 100%; height: 720px; border: 1px solid #ccc"
                    v-html="formCommodityDetails.detail"
                  ></div>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handleCommodityDetailsSub">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 素材上传图片上传 -->
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <!-- 商品详情多图片上传 -->
    <vab-upload
      ref="vabUpload1"
      :limit="imgNum"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon1"
    />
    <!-- 商品详情编辑器图片上传 -->
    <vab-upload
      ref="vabUpload2"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon2"
    />
    <!-- 预售设置弹窗 -->
    <edit ref="edit" :drawer-sta="drawerSta" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Drawer from '@/subview/components/Drawer/GoodsDrawer'
  import VabUpload from '@/extra/VabUpload'
  import VabQuill from '@/extra/VabQuill'
  import Edit from '@/subview/components/Edit/PresellEdit'
  export default {
    name: 'GoodsManage',
    components: { Drawer, VabUpload, VabQuill, Edit },
    data() {
      return {
        // 预售 弹窗
        drawerSta: false,
        // 详情抽屉组件 标题，是否显示，数据,下拉框数据
        title: '',
        drawer: false,
        drawerInof: {},
        selectList: [],
        // 商品详情多图片上传，上传图片数量
        imgNum: 5,
        // 商品详情编辑器参数配置
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ color: [] }, { background: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                [{ font: [] }],
                ['clean'],
                ['link', 'image'],
              ],
              handlers: {
                image: () => {
                  this.$baseConfirm(
                    '点击上传图片',
                    '上传图片',
                    () => {
                      this.handleShow(2)
                    },
                    () => {},
                    '上传',
                    '取消'
                  )
                },
              },
            },
          },
          placeholder: '内容...',
          readOnly: false,
        },
        // 商品详情新增编辑弹窗 表单
        formCommodityDetails: {
          detail: '',
          id: null,
          shop_multiplot: [],
        },
        // 商品详情弹窗是否显示
        dialogVisible1: false,
        // 素材上传弹窗是否显示
        dialogVisible: false,
        // 素材上传弹窗表单
        formDialog: {
          goods_id: null,
          source_material: [],
          copywriting: '',
        },
        // 表格 tabs数据
        tatleData: {
          all_order: null,
          on_the_shelf: null,
          down_the_shelf: null,
          stock_zero: null,
        },
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表筛选中数，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          sort_field: 'upper_time',
          sort_type: 'desc',
          page: 1,
          pageSize: 10,
          shop_type: '3', // 列表类型 0下架 1上架 2售空 全部
          category: '', //款式分类
          brand: '', //品牌
          year: '', //年份
          season: '', //季节
          type: '', //尺码类型 0整手  1散码
          band: '', //波段
          name: '', //商品名称
          status: 1, //0停售 1在售
          presell: '',
        },
        listType: 1,
        formType: 4,
        list: [],
        selectRowsId: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单变化，变化后重新请求数据
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
          this.pageState = false
        },
        deep: true,
      },
      // 监听商品详情弹窗数据对多图上传数量做监听限制
      formCommodityDetails: {
        handler: function (n) {
          this.imgNum = 10 - n.shop_multiplot.length
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.getGoodsTypeList()
      this.fetchData()
    },
    methods: {
      // 预售状态修改
      async turnOnOff(row) {
        const { code } = await this.api.changePresellStatus({
          goods_id: row.id,
        })
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
      // 预售设置弹窗
      handlePresell(row) {
        if (row.goods_persell.length == 0) {
          this.drawerSta = false
        } else {
          this.drawerSta = true
        }
        this.$refs['edit'].showEdit(row)
      },
      // 素材上传保存
      async handleMaterialSub() {
        const { code } = await this.api.editSourceMaterialSave(this.formDialog)
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
      // 商品详情保存
      async handleCommodityDetailsSub() {
        const { code } = await this.api.editGoodsDetailEdit(
          this.formCommodityDetails
        )
        if (code == 200) {
          this.$message.success('操作成功')
          this.dialogVisible = false
          this.formDialog = {
            goods_id: null,
            source_material: [],
            copywriting: '',
          }
          // this.fetchData()
        }
        this.dialogVisible1 = false
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
      // 素材上传图片移除操作
      handleRemove(index) {
        this.formDialog.source_material.splice(index, 1)
      },
      // 商品详情多图片上传移除操作
      delImg(index) {
        this.formCommodityDetails.shop_multiplot.splice(index, 1)
      },
      // 素材上传成功回调方法
      getSon(data) {
        this.formDialog.source_material = data
      },
      // 商品详情多图上传成功回调方法
      getSon1(data) {
        data.forEach((item) => {
          if (this.formCommodityDetails.shop_multiplot.indexOf(item) == -1) {
            this.formCommodityDetails.shop_multiplot.push(item)
          }
        })
      },
      // 商品详情编辑器上传成功回调方法
      getSon2(data) {
        data.forEach((item) => {
          if (this.formCommodityDetails.detail == null) {
            this.formCommodityDetails.detail = ''
          }
          if (this.formCommodityDetails.detail.indexOf(item) == -1) {
            this.formCommodityDetails.detail += `<img src="${item}" />`
          }
        })
      },
      // 商品详情弹窗显示
      async handleCommodityDetails(row) {
        const { data } = await this.api.getGoodBasicsDetails({
          good_id: row.id,
        })
        this.formCommodityDetails.detail = data.detail
        this.formCommodityDetails.shop_multiplot = data.shop_multiplot
        this.formCommodityDetails.id = data.id
        this.dialogVisible1 = true
      },
      // 素材上传弹窗显示
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
      // 商品详情弹窗关闭
      handleMaterialClose1() {
        this.dialogVisible1 = false
      },
      // 素材上传弹窗关闭
      handleMaterialClose() {
        this.dialogVisible = false
        this.formDialog = {
          goods_id: null,
          source_material: [],
          copywriting: '',
        }
      },
      // 上传判断，0为素材上传，1为商品详情多图上传，2为商品详情编辑器上传
      handleShow(type) {
        if (type == 0) {
          this.$refs['vabUpload'].handleShow()
        } else if (type == 1) {
          this.$refs['vabUpload1'].handleShow()
        } else if (type == 2) {
          this.$refs['vabUpload2'].handleShow()
        }
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        this.form.shop_type = tab.name
      },
      // 获取列表数据
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
        this.getTatolData()
      },
      // 获取列表tabs数据
      async getTatolData() {
        const { data } = await this.api.getShopGoodTabTotal({
          category: this.form.category, //款式分类
          brand: this.form.brand, //品牌
          year: this.form.year, //年份
          season: this.form.season, //季节
          type: this.form.type, //尺码类型 0整手  1散码
          band: this.form.band, //波段
          name: this.form.name, //商品名称
          shop_type: this.form.shop_type, // 列表类型 0下架 1上架 2售空 全部
          status: this.form.status, //0停售 1在售
          presell: this.form.presell,
          sort_field: this.form.sort_field,
          sort_type: this.form.sort_type,
        })
        this.tatleData = data
      },
      // 获取下拉框数据
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,year,season,band,category,agegroup,color,size',
        })
        this.selectList = data
      },
      // 商品抽屉打开
      handleDetail(row, type) {
        this.title = '商品详情'
        this.drawerInof.path = 'mall'
        this.drawerInof = JSON.parse(JSON.stringify(row))
        this.drawerInof.drawerType = type
        this.drawerInof.lockSta = false
        this.drawer = true
      },
      // 商品抽屉关闭
      handleClose() {
        this.drawer = false
      },
      // 重置表单
      resetForm() {
        this.form = this.$options.data().form
      },
      // 表格数据选中
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      // 上下架 批量上下架
      handleEdit(type, row) {
        if (this.selectRowsId.length > 0) {
          if (type == 1) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.is_shop == 1) {
                this.$message.error('所选数据中有已上架的商品')
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            let ids = this.selectRowsId.map((item) => item.id).join(',')
            this.$baseConfirm('你确定要上架选中项吗', null, async () => {
              const { msg } = await this.api.editChangeIsShop({
                ids: ids,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 0) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.is_shop == 2 || item.is_shop == 3) {
                this.$message.error('所选数据中有已下架的商品')
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            let ids = this.selectRowsId.map((item) => item.id).join(',')
            this.$baseConfirm('你确定要下架选中项吗', null, async () => {
              const { msg } = await this.api.editChangeIsShop({
                ids: ids,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          }
        } else {
          if (type == 3) {
            this.$baseConfirm('你确定要下架改项吗', null, async () => {
              const { msg } = await this.api.editChangeIsShop({
                ids: row.id,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 4) {
            this.$baseConfirm('你确定要上架改项吗', null, async () => {
              const { msg } = await this.api.editChangeIsShop({
                ids: row.id,
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
