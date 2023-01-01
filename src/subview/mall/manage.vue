<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
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
    <el-card shadow="never" style="border: 0">
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
          :label="'已下架(' + tatleData.down_the_shelf + '款)'"
          name="0"
        />
        <el-tab-pane
          :label="'售空 (' + tatleData.stock_zero + '款)'"
          name="2"
        />
      </el-tabs>
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
      <!-- 表格组件使用 -->
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
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
          <el-table-column label="销量" prop="xl_num" width="120" />
          <el-table-column label="库存" prop="xh_num" width="100" />
          <el-table-column label="状态" prop="status" width="80">
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
            width="150"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:MallManage:view']"
                type="text"
                @click="handleDetail(row, 1)"
              >
                查看
              </el-button>
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
              <el-button
                v-has-permi="['btn:MallManage:upload']"
                type="text"
                @click="handleMaterial(row)"
              >
                素材上传
              </el-button>
              <el-button type="text" @click="handleCommodityDetails(row)">
                商品详情
              </el-button>
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
      <!-- 详情抽屉组件 -->
      <Drawer
        :drawer-inof="drawerInof"
        :select-list="selectList"
        @fetch-data="fetchData"
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
                <div class="ql-container ql-snow">
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
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <vab-upload
      ref="vabUpload1"
      :limit="imgNum"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon1"
    />
    <vab-upload
      ref="vabUpload2"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon2"
    />
  </div>
</template>

<script>
  import Drawer from '@/subview/components/Drawer/GoodsDrawer'
  import VabUpload from '@/extra/VabUpload'
  import VabQuill from '@/extra/VabQuill'
  import {
    getGoodList,
    getCommonAllList,
    editChangeIsShop,
    getShopGoodTabTotal,
    editSourceMaterialSave,
    getGoodBasicsDetails,
    editGoodsDetailEdit,
  } from '@/api/basic'
  import publicjosn from '@/assets/assets_josn/publicjosn'
  export default {
    name: 'GoodsManage',
    components: { Drawer, VabUpload, VabQuill },
    mixins: [publicjosn],
    data() {
      return {
        imgNum: 5,
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
        formCommodityDetails: {
          detail: '',
          id: null,
          shop_multiplot: [],
        },
        title: '',
        drawer: false,
        drawerInof: {},
        dialogVisible: false,
        dialogVisible1: false,
        formDialog: {
          goods_id: null,
          source_material: [],
          copywriting: '',
        },
        tatleData: {
          all_order: null,
          on_the_shelf: null,
          down_the_shelf: null,
          stock_zero: null,
        },
        form: {
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
        },
        deep: true,
      },
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
      async handleCommodityDetailsSub() {
        const { code } = await editGoodsDetailEdit(this.formCommodityDetails)
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
      changeBtnPage(data) {
        this.form.page = data
      },

      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      handleRemove(index) {
        this.formDialog.source_material.splice(index, 1)
      },
      delImg(index) {
        this.formCommodityDetails.shop_multiplot.splice(index, 1)
      },
      getSon(data) {
        this.formDialog.source_material = data
      },
      getSon1(data) {
        data.forEach((item) => {
          if (this.formCommodityDetails.shop_multiplot.indexOf(item) == -1) {
            this.formCommodityDetails.shop_multiplot.push(item)
          }
        })
      },
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
      async handleCommodityDetails(row) {
        const { data } = await getGoodBasicsDetails({ good_id: row.id })
        this.formCommodityDetails.detail = data.detail
        this.formCommodityDetails.shop_multiplot = data.shop_multiplot
        this.formCommodityDetails.id = data.id
        this.dialogVisible1 = true
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
      handleMaterialClose1() {
        this.dialogVisible1 = false
      },
      handleMaterialClose() {
        this.dialogVisible = false
        this.formDialog = {
          goods_id: null,
          source_material: [],
          copywriting: '',
        }
      },
      handleShow(type) {
        if (type == 0) {
          this.$refs['vabUpload'].handleShow()
        } else if (type == 1) {
          this.$refs['vabUpload1'].handleShow()
        } else if (type == 2) {
          this.$refs['vabUpload2'].handleShow()
        }
      },
      handleQuery() {
        this.fetchData()
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        this.form.shop_type = tab.name
      },
      // 列表数据请求函数 公共部分
      async fetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        const { data } = await getGoodList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
        this.getTatolData()
      },
      async getTatolData() {
        const { data } = await getShopGoodTabTotal({
          category: this.form.category, //款式分类
          brand: this.form.brand, //品牌
          year: this.form.year, //年份
          season: this.form.season, //季节
          type: this.form.type, //尺码类型 0整手  1散码
          band: this.form.band, //波段
          name: this.form.name, //商品名称
          shop_type: this.form.shop_type, // 列表类型 0下架 1上架 2售空 全部
          status: this.form.status, //0停售 1在售
        })
        this.tatleData = data
      },
      async getGoodsTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,year,season,band,category,agegroup,color,size',
        })
        this.selectList = data
      },
      // 详情抽屉
      handleDetail(row, type) {
        if (type === 1) {
          this.title = '商品详情'
        } else if (type === 2) {
          this.title = '编辑商品'
        } else {
          this.title = '添加商品'
        }
        if (row == 'add') {
          this.drawerInof = {}
          this.drawerInof.drawerType = type
          this.drawerInof.purchase_price = 0
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
              const { msg } = await editChangeIsShop({
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
              const { msg } = await editChangeIsShop({
                ids: ids,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          }
        } else {
          if (type == 3) {
            this.$baseConfirm('你确定要下架改项吗', null, async () => {
              const { msg } = await editChangeIsShop({
                ids: row.id,
              })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else if (type == 4) {
            this.$baseConfirm('你确定要上架改项吗', null, async () => {
              const { msg } = await editChangeIsShop({
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
<style lang="scss" scoped></style>
