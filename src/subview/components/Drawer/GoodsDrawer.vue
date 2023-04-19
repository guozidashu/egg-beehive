<template>
  <div class="components-drawer">
    <!-- 头部数据 商品信息 和 商品编辑 表单-->
    <Form
      :active-name="activeName"
      :form-temp="form"
      :goods-all-num="goodsAllNum"
      :goods-details="goodsDetails"
      :list-loading="listLoading"
      :list-type="listType"
      :lock-sta="lockSta"
      :rules="rules"
      :select-data="selectData"
      :tabindex="tabindex"
      :warehouse-list="WarehouseList"
      :warehouse-position-list="WarehousePositionList"
      :zhekou-list="zhekouList"
      @changeType="changeType"
      @changeTypeBtn="changeTypeBtn"
      @handleClick="handleClick"
      @handleShow="handleShow"
    />
    <!-- tab 出去首页 表格 -->
    <div
      v-if="activeName == 1"
      style="display: flex; justify-content: space-between; padding: 0 20px"
    >
      <div></div>
      <el-input
        v-model="searchName"
        placeholder="请输入客户名称"
        style="width: 150px"
      />
    </div>
    <List
      :list="orderList"
      :list-type="listType"
      :page="page"
      :page-size="pageSize"
      :state="listLoading"
      :tabindex="tabindex"
      :total="orderTotal"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    />
    <!-- 上传图片 -->
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      :upload-type="1"
      url="/upload"
      @submitUpload="getSon"
    />
  </div>
</template>
<script>
  import VabUpload from '@/extra/VabUpload'
  import List from '@/subview/components/List/GoodsDrawerList'
  import Form from '@/subview/components/Form/GoodsDrawerForm'
  import { mapGetters } from 'vuex'
  export default {
    components: { VabUpload, List, Form },
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
        formDialog: {
          copy: '',
        },
        searchName: '',
        lockSta: false,
        activeName: '0',
        tabindex: '0',
        goodsAllNum: {},
        goodsDetails: {},
        form: JSON.parse(JSON.stringify(this.drawerInof)),
        rules: {
          sn: [
            { required: true, message: '请输入商品编号', trigger: 'blur' },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur',
            },
          ],
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur',
            },
          ],
          content: [
            { required: true, message: '请输入商品描述', trigger: 'blur' },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur',
            },
          ],
          shoptitle: [
            { required: true, message: '请输入商城标题', trigger: 'blur' },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur',
            },
          ],
          category: [
            { required: true, message: '请选择商品分类', trigger: 'blur' },
          ],
          brand: [
            { required: true, message: '请选择商品品牌', trigger: 'blur' },
          ],
          year: [
            { required: true, message: '请选择商品年份', trigger: 'blur' },
          ],
          season: [
            { required: true, message: '请选择商品季节', trigger: 'blur' },
          ],
          colorid: [
            { required: true, message: '请选择商品颜色', trigger: 'blur' },
          ],
          sizeid: [
            { required: true, message: '请选择商品尺码', trigger: 'blur' },
          ],
          purchase_price: [
            { required: true, message: '请输入采购价', trigger: 'blur' },
          ],
          // manage_price: [
          //   { required: true, message: '请输入管理费', trigger: 'blur' },
          // ],
          cost_price: [
            { required: true, message: '请输入成本价', trigger: 'blur' },
          ],
          sale_price: [
            { required: true, message: '请输入吊牌价', trigger: 'blur' },
          ],
          price: [{ required: true, message: '请输入销售价', trigger: 'blur' }],
        },
        selectData: JSON.parse(JSON.stringify(this.selectList)),
        listLoading: false,
        listType: 1,
        ids: undefined,
        WarehouseList: [],
        WarehousePositionList: [],
        zhekouList: [],
        orderList: [],
        orderTotal: 0,
        page: 1,
        pageSize: 10,
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
    },
    watch: {
      // 抽屉数据监听
      drawerInof: {
        handler: function (newVal) {
          this.form = JSON.parse(JSON.stringify(newVal))
          this.lockSta = false
          this.tabindex = '0'
          this.activeName = '0'
          if (newVal.drawerType != 3) {
            this.getGoodsAllDetail()
            this.getGoodsDetail()
          }
          if (newVal.drawerType != 1) {
            this.initSelect()
          }
        },
        deep: true,
        immediate: true,
      },
      // 下拉框数据监听
      selectList: {
        handler: function (newVal) {
          this.selectData = JSON.parse(JSON.stringify(newVal))
        },
        deep: true,
        immediate: true,
      },
      // 价格监听
      'form.price': {
        handler: function () {
          this.zhekouList.forEach((item) => {
            item.price = this.form.price * (item.discount / 10)
            item.price1 = this.form.price * (item.discount_single / 10)
          })
        },
        deep: true,
      },
      // 颜色监听
      'form.colorid': {
        handler: function () {
          if (!this.form.colorid) {
            return
          }
          let arr = []
          this.form.colorid.forEach((item) => {
            this.selectData.color.forEach((item1) => {
              item1.children.forEach((item2) => {
                if (item == item2.id) {
                  arr.push(item2.name)
                }
              })
            })
          })
          if (arr.length >= 3) {
            arr = arr.slice(0, 2)
            arr.push('等颜色')
          }

          this.form.color_name = arr
        },
        deep: true,
      },
      // 尺码监听
      'form.sizeid': {
        handler: function () {
          if (!this.form.sizeid) {
            return
          }
          let arr = []
          this.form.sizeid.forEach((item) => {
            this.selectData.size.forEach((item1) => {
              if (item.pid == item1.id) {
                item1.children.forEach((item2) => {
                  if (item.id == item2.id) {
                    arr.push(item2.name)
                  }
                })
              } else {
                if (item.id == item1.id) {
                  arr.push(item1.name)
                }
              }
            })
          })
          if (arr.length >= 3) {
            arr = arr.slice(0, 2)
            arr.push('等尺码')
          }
          this.form.size_name = arr
        },
        deep: true,
      },
      // 仓库监听
      'form.warehouse': {
        handler: function (newVal) {
          if (this.form.drawerType != 1 && newVal != undefined) {
            this.selectProvinceFun(newVal)
          }
        },
        deep: true,
      },
      page: {
        handler: function (newVal) {
          this.changeBtnPageList()
        },
        deep: true,
      },
      pageSize: {
        handler: function (newVal) {
          this.changeBtnPageList()
        },
        deep: true,
      },
      searchName: {
        handler: function (newVal) {
          this.page = 1
          this.changeBtnPageList()
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      changeBtnPage(data) {
        this.page = data
      },
      changeBtnPageSize(data) {
        this.pageSize = data
      },
      // 获取头部详情
      async getGoodsAllDetail() {
        const { data } = await this.api.getGoodTotalDetails({
          good_id: this.form.id,
        })
        this.goodsAllNum = data
      },
      // 获取基础详情
      async getGoodsDetail() {
        let temp = this.form.drawerType
        const { data } = await this.api.getGoodBasicsDetails({
          good_id: this.form.id,
        })
        this.goodsDetails = JSON.parse(JSON.stringify(data))
        let tempForm = JSON.parse(JSON.stringify(data))
        tempForm.category = data.category_id
        tempForm.brand = data.brand_id
        tempForm.year = data.year_id
        tempForm.season = data.season_id
        tempForm.agegroup = data.agegroup_id
        tempForm.band = data.band_id
        tempForm.warehouse = data.warehouse_id
        tempForm.position = data.position_id
        tempForm.drawerType = temp
        this.form = JSON.parse(JSON.stringify(tempForm))
        this.$forceUpdate()
      },
      // 获取库位列表
      async selectProvinceFun(e) {
        const { data } = await this.api.getWarehousePositionList({
          warehouse_id: e,
        })
        this.WarehousePositionList = data.list
      },
      // 获取仓库
      async initSelect() {
        const { data } = await this.api.getWarehouseList()
        this.WarehouseList = data.list
      },
      // 新增修改
      async changeTypeBtn(e) {
        // this.$refs['form'].validate(async (valid) => {
        //   if (valid) {
        //     console.log()
        //             }
        // })
        if (e != 1) {
          this.form.drawerType = e
          this.$forceUpdate()
          return
        }
        if (this.lockSta) {
          this.form.lock_price = 1
          let arr = []
          let arr1 = []
          this.zhekouList.forEach((item) => {
            arr.push({
              level_id: item.id,
              price: item.price,
            })
            arr1.push({
              level_id: item.id,
              price: item.price1,
            })
          })
          this.form.prices = arr
          this.form.prices_sm = arr1
        } else {
          this.form.lock_price = 0
        }
        let temp1 = []
        if (this.form.sizeid != undefined) {
          if (this.form.sizeid[0].type == 'zs') {
            temp1 = this.form.sizeid.map((item) => {
              return item.id
            })
          } else {
            let temp = ''
            this.form.sizeid_sm = this.form.sizeid
            this.form.sizeid_sm = this.form.sizeid_sm.map((item) => {
              temp = item.pid
              return item.id
            })
            temp1 = [temp]
          }
        }
        let obj1 = JSON.parse(JSON.stringify(this.form))
        obj1.sizeid = temp1
        if (this.form.id == undefined) {
          // this.form.id = 0
          obj1.id = 0
          const { code } = await this.api.editGoodSave(obj1)
          if (code == 200) {
            this.form.drawerType = e
            this.$baseMessage('新增成功', 'success', 'vab-hey-message-success')
            this.$emit('fetch-data', 1)
            this.$emit('handle-close')
          }
        } else {
          const { code } = await this.api.editGoodSave(obj1)
          if (code == 200) {
            this.form.drawerType = e
            this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
            this.getGoodsDetail()
            this.$emit('fetch-data')
          }
        }
      },
      // 上传回显
      getSon(data) {
        if (data instanceof Array) {
          this.form.img = data[0]
        } else {
          this.form.vdian_img = data
        }
        this.$forceUpdate()
      },
      // 上传触发
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      // tab 切换
      async handleClick(tab) {
        this.tabindex = tab.name
        this.activeName = tab.name
        this.listLoading = true
        if (tab.name == 0) {
          return
        }
        const { data } = await this.api.getGoodOrderDetails({
          type: tab.name, //搜索条件 1订单记录 2入库信息 3退货记录 4付款记录 5对账单记录
          good_id: this.drawerInof.id, //物料采购订单id
          page: 1,
          pageSize: 10,
          name: this.searchName,
        })
        this.orderList = data.data
        this.orderTotal = data.total
        this.listLoading = false
      },
      async changeBtnPageList() {
        const { data } = await this.api.getGoodOrderDetails({
          type: this.activeName, //搜索条件 1订单记录 2入库信息 3退货记录 4付款记录 5对账单记录
          good_id: this.drawerInof.id, //物料采购订单id
          page: this.page,
          pageSize: this.pageSize,
          name: this.searchName,
        })
        this.orderList = data.data
        this.orderTotal = data.total
        this.listLoading = false
      },
      // 固定价
      async changeType() {
        if (!this.form.price) {
          this.$baseMessage(
            '请先输入销售价',
            'success',
            'vab-hey-message-success'
          )
          return
        }
        this.lockSta = !this.lockSta
        if (this.form.lock_price != 1) {
          this.form.lock_price = 1
        } else {
          this.form.lock_price = 0
        }
        const { data } = await this.api.getGradeList()
        data.data.forEach((item) => {
          let temp = this.form.price * (item.discount / 10)
          let temp1 = this.form.price * (item.discount_single / 10)
          item.price = temp.toFixed(2)
          item.price1 = temp1.toFixed(2)
        })
        this.zhekouList = data.data
      },
    },
  }
</script>
