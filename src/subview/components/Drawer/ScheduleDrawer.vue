<template>
  <div class="components-drawer" style="display: flex">
    <div style="position: absolute; top: 80px; height: 200px">
      <el-tabs tab-position="left" @tab-click="handleClick">
        <el-tab-pane label="基本信息" />
        <el-tab-pane label="订单信息" />
        <el-tab-pane label="生产协同节点" />
        <el-tab-pane label="标准资料包" />
        <el-tab-pane label="关联信息" />
      </el-tabs>
    </div>
    <div style="position: absolute; top: 80px; right: 20px; z-index: 99">
      <el-button size="small" type="primary" @click="subForm()">完成</el-button>
    </div>
    <div style="position: relative; margin-left: 200px">
      <el-form ref="form" label-width="120px" :model="orderForm" :rules="rules">
        <h4 id="scoll0">基本信息</h4>
        <div style="display: flex">
          <div style="margin-right: 20px">
            <el-button size="small" type="primary" @click="handleGoodsOpen()">
              选择商品
            </el-button>
          </div>
          <!-- 商品信息置灰 -->
          <el-skeleton v-if="goodsDetails == null">
            <template slot="template">
              <div style="display: flex">
                <el-skeleton-item
                  style="width: 150px; height: 150px"
                  variant="image"
                />
                <div style="margin-left: 12px">
                  <div style="margin: 15px 0">
                    <el-skeleton-item style="width: 200px" variant="p" />
                  </div>
                  <div style="margin: 15px 0">
                    <el-skeleton-item style="width: 200px" variant="p" />
                  </div>
                  <div style="margin: 15px 0">
                    <el-skeleton-item style="width: 200px" variant="p" />
                  </div>
                  <div style="margin: 15px 0">
                    <el-skeleton-item style="width: 200px" variant="p" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
          <div v-else>
            <div style="display: flex">
              <el-image
                :src="goodsDetails.img"
                style="width: 150px; height: 150px"
              />
              <div style="margin-left: 12px">
                <div style="margin: 15px 0">
                  <div style="width: 100%">款号：{{ goodsDetails.sn }}</div>
                </div>
                <div style="margin: 15px 0">
                  <div style="width: 100%">名称：{{ goodsDetails.name }}</div>
                </div>
                <div style="margin: 15px 0">
                  <div style="width: 100%">
                    波段：{{ goodsDetails.year_name }}
                    {{ goodsDetails.season_name }} {{ goodsDetails.band_name }}
                  </div>
                </div>
                <div style="margin: 15px 0">
                  <div style="width: 100%">
                    创建时间：{{ goodsDetails.create_time }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-skeleton-item
          v-if="goodsDetails == null"
          style="width: 100%; height: 200px; margin-top: 20px"
          variant="table"
        />
        <el-table
          v-else
          border
          :data="tableData"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column label="颜色" prop="color_name" width="180" />
          <el-table-column label="尺码" prop="size_name" width="180" />
          <el-table-column label="件数" prop="num">
            <template #default="{ row }">
              <el-input
                v-model="row.num"
                placeholder="请输入件数"
                @input="row.num = $moneyFormatInput(row.num)"
              />
            </template>
          </el-table-column>
        </el-table>
        <h4 id="scoll1">订单信息</h4>
        <el-form-item label="供应商:">
          <el-select v-model="orderForm.type5">
            <el-option label="供应商1" :value="1" />
            <el-option label="供应商2" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="优先度:">
          <el-radio-group v-model="orderForm.radio">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">紧急</el-radio>
            <el-radio :label="3">加急</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="订单类型:">
          <el-radio-group v-model="orderForm.radio1">
            <el-radio :label="1">期货</el-radio>
            <el-radio :label="2">首单</el-radio>
            <el-radio :label="3">补单</el-radio>
            <el-radio :label="4">预售</el-radio>
          </el-radio-group>
        </el-form-item>
        <h4 id="scoll2">生产协同节点</h4>
        <div>暂时不做</div>
        <h4 id="scoll3">标准资料包</h4>
        <!-- 上传  -->
        <div style="display: flex">
          <div
            v-for="(item, index) in divUploadList"
            :key="index"
            style="width: 25%"
          >
            <el-upload
              accept=".doc, .docx, .pdf"
              :action="getAction()"
              :before-upload="beforeUpload"
              class="upload-demo"
              :file-list="divUploadList[index].list"
              :headers="headers"
              :limit="2"
              :on-success="handleChange"
              :show-file-list="true"
            >
              <el-button
                size="small"
                type="primary"
                @click="handleShow(item.type)"
              >
                {{ item.name }}
              </el-button>
            </el-upload>
          </div>
          <!-- <div style="width: 25%">
            
            <el-button size="small" type="primary" @click="handleShow(2)">
              上传生产工艺单
            </el-button>
            <el-tooltip
              v-if="orderForm.TechnologyImg != undefined"
              placement="top"
            >
              <el-image
                slot="content"
                :src="orderForm.TechnologyImg"
                style="width: 200px; height: 200px"
              />
              <el-image
                :src="orderForm.TechnologyImg"
                style="width: 100px; height: 100px; margin-top: 20px"
              />
            </el-tooltip>
          </div>
          <div style="width: 25%">
            <el-button size="small" type="primary" @click="handleShow(3)">
              上传大货指示单
            </el-button>
            <el-tooltip
              v-if="orderForm.IndicationImg != undefined"
              placement="top"
            >
              <el-image
                slot="content"
                :src="orderForm.IndicationImg"
                style="width: 200px; height: 200px"
              />
              <el-image
                :src="orderForm.IndicationImg"
                style="width: 100px; height: 100px; margin-top: 20px"
              />
            </el-tooltip>
          </div>
          <div style="width: 25%">
            <el-button size="small" type="primary" @click="handleShow(4)">
              上传后整指示单
            </el-button>
            <el-tooltip
              v-if="orderForm.FinishingImg != undefined"
              placement="top"
            >
              <el-image
                slot="content"
                :src="orderForm.FinishingImg"
                style="width: 200px; height: 200px"
              />
              <el-image
                :src="orderForm.FinishingImg"
                style="width: 100px; height: 100px; margin-top: 20px"
              />
            </el-tooltip>
          </div> -->
        </div>
        <h4 id="scoll4">关联信息</h4>
        <el-form-item label="关联款式：">
          <el-input
            v-model="form.keywords"
            placeholder="请输入相关款式链接"
            size="small"
            style="width: 400px"
          />
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择商品弹窗 -->
    <el-dialog
      :append-to-body="true"
      :before-close="handleGoodsClose"
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <QYForm
        :form="form"
        :form-type="4"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="商品搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称/款号"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </QYForm>
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
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
            align="center"
            fixed="right"
            label="操作"
            width="150"
          >
            <template #default="{ row }">
              <el-button type="text" @click="chooseGoods(row)">
                选择商品
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { baseURL } from '@/config'
  export default {
    name: 'ComponentsDrawer',
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        // 上传按钮数组
        divUploadList: [
          {
            name: '上传裁床指示单',
            type: 1,
            list: [],
          },
          {
            name: '上传生产工艺单',
            type: 2,
            list: [],
          },
          {
            name: '上传大货指示单',
            type: 3,
            list: [],
          },
          {
            name: '上传后整指示单',
            type: 4,
            list: [],
          },
        ],
        // 上传请求头
        headers: {},
        // 上传类型
        uploadType: 1,
        // 选择商品参数
        // 选择商品弹窗
        dialogVisible: false,
        // 选择商品 列表相关
        pageState: false,
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          name: '',
        },
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        // 选中商品详情
        goodsDetails: null,
        // 选中商品规格
        tableData: [],
        // 新建订单参数
        orderForm: {},
        rules: {},
      }
    },
    computed: {
      // 上传接口获取token缓存
      ...mapGetters({
        token: 'user/token',
      }),
    },
    watch: {
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
      drawerInof: {
        handler: function () {
          this.goodsDetails = null
          this.tableData = []
          this.loading = true
        },
        deep: true,
      },
    },
    created() {
      // 上传接口获取token
      this.headers['Authorization'] = `${this.token}`
    },
    methods: {
      subForm() {
        console.log('提交函数')
      },
      // 上传处理显示列表 只能显示最新的一个
      async handleChange(res, file, fileList) {
        if (res.code == 200) {
          if (this.uploadType == 1) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
          } else if (this.uploadType == 2) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
          } else if (this.uploadType == 3) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
          } else if (this.uploadType == 4) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
          }
        }
      },
      // 上传限制
      beforeUpload(file) {
        const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
        const whiteList = ['pdf', 'doc', 'docx']
        if (whiteList.indexOf(fileSuffix) === -1) {
          this.$message.error('上传文件只能是 pdf、doc、docx格式')
          return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB')
          return false
        }
      },
      // 上传获取上传接口路径
      getAction() {
        return baseURL + '/common/uploadPic'
      },
      // 上传记录上传类型 1.裁床 2.生产 3.大货 4.指示
      handleShow(type) {
        this.uploadType = type
      },
      // 切换tabs 滑动到指定位置
      handleClick(tab, event) {
        this.$el.querySelector(`#scoll${tab.index}`).scrollIntoView({
          behavior: 'smooth', // 平滑过渡
          block: 'start', // 上边框与视窗顶部平齐。默认值
        })
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
      // 选择商品
      async chooseGoods(row) {
        const { data } = await this.api.getGoodBasicsDetails({
          good_id: row.id,
        })
        this.goodsDetails = data
        const colorNmae = this.goodsDetails.color_name
        const sizeNmae = this.goodsDetails.size_name
        const colorId = this.goodsDetails.color_id
        const sizeId = this.goodsDetails.size_id
        this.tableData = []
        for (let i = 0; i < colorNmae.length; i++) {
          for (let j = 0; j < sizeNmae.length; j++) {
            this.tableData.push({
              color_name: colorNmae[i],
              color_id: colorId[i],
              size_name: sizeNmae[j],
              size_id: sizeId[j],
              num: 0,
            })
          }
        }
        this.loading = false
        this.dialogVisible = false
      },
      // 打开商品选择
      handleGoodsOpen() {
        this.dialogVisible = true
        this.fetchData()
      },
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleGoodsClose() {
        this.dialogVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
