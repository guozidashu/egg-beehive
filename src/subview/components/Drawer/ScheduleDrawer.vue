<template>
  <div class="components-drawer" style="display: flex">
    <div style="position: absolute; top: 80px; height: 200px">
      <el-tabs tab-position="left" @tab-click="handleClick">
        <el-tab-pane label="基本信息" />
        <el-tab-pane label="订单信息" />
        <el-tab-pane label="生产协同节点" />
        <el-tab-pane label="标准资料包" />
      </el-tabs>
    </div>
    <div
      style="
        position: absolute;
        top: 80px;
        right: 20px;
        z-index: 99;
        background-color: white;
      "
    >
      <el-button size="small" type="primary" @click="subForm()">完成</el-button>
    </div>
    <div style="position: relative; margin-left: 200px">
      <el-form
        ref="form"
        label-width="120px"
        :model="subFormData"
        :rules="rules"
      >
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
              >
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
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
        <div v-else style="margin-top: 20px">
          <el-badge
            v-for="(item, index) in colorBtnArr"
            :key="index"
            class="item"
            style="margin-right: 30px"
            :value="item.num"
          >
            <el-button size="small">
              {{ item.color_name }}
            </el-button>
          </el-badge>
          <el-table
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
        </div>

        <h4 id="scoll1">订单信息</h4>
        <el-form-item label="加工方式:" prop="processing">
          <el-radio-group v-model="subFormData.processing">
            <el-radio :label="1">FOB</el-radio>
            <el-radio :label="2">CMT</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="subFormData.processing == 1"
          label="供应商:"
          prop="supplier_id"
        >
          <el-select v-model="subFormData.supplier_id">
            <el-option
              v-for="(item, index) in selectLists.supplier"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="制单人:" prop="uid">
          <el-select v-model="subFormData.uid" filterable placeholder="可搜索">
            <el-option
              v-for="(item, index) in selectLists.employee"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="优先度:" prop="priority">
          <el-radio-group v-model="subFormData.priority">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">紧急</el-radio>
            <el-radio :label="3">加急</el-radio>
          </el-radio-group>
        </el-form-item>
        <h4 id="scoll1">生产准备</h4>
        <el-form-item label="布料:">
          <el-radio-group v-model="subFormData.prepare.cloth">
            <el-radio :label="1">齐全</el-radio>
            <el-radio :label="0">不齐</el-radio>
          </el-radio-group>
          <el-form-item
            v-if="subFormData.prepare.cloth == 0"
            label="缺失原因"
            style="margin-top: 20px; margin-left: -100px"
          >
            <el-input
              v-model="subFormData.prepare.cloth_note"
              placeholder="请输入缺失原因"
              style="width: 200px"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="辅料:">
          <el-radio-group v-model="subFormData.prepare.accessory">
            <el-radio :label="1">齐全</el-radio>
            <el-radio :label="0">不齐</el-radio>
          </el-radio-group>
          <el-form-item
            v-if="subFormData.prepare.accessory == 0"
            label="缺失原因"
            style="margin-top: 20px; margin-left: -100px"
          >
            <el-input
              v-model="subFormData.prepare.accessory_note"
              placeholder="请输入缺失原因"
              style="width: 200px"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="其他:">
          <el-radio-group v-model="subFormData.prepare.other">
            <el-radio :label="1">齐全</el-radio>
            <el-radio :label="0">不齐</el-radio>
          </el-radio-group>
          <el-form-item
            v-if="subFormData.prepare.other == 0"
            label="缺失原因"
            style="margin-top: 20px; margin-left: -100px"
          >
            <el-input
              v-model="subFormData.prepare.other_note"
              placeholder="请输入缺失原因"
              style="width: 200px"
            />
          </el-form-item>
        </el-form-item>
        <div style="display: flex; justify-content: space-between">
          <h4 id="scoll2">生产协同节点(长按拖动排序)</h4>
          <div style="margin-top: 20px">
            <el-button size="small" type="primary" @click="addNode()">
              添加节点
            </el-button>
          </div>
        </div>
        <div>
          <!-- vuedraggable 组件拖动如果有禁止拖动项 两种解决方式 
            1.vuedraggable 标签使用  filter=".forbid" forbid是禁止拖动的className
            2.vuedraggable 标签使用  draggable=".singlePerson" singlePerson是允许拖动的className
            ****注意： 使用 filter 时如果禁止拖动标签内有输入框一类的值绑定标签，是无法使用的，使用draggable时可以输入内容
             -->
          <vuedraggable
            v-model="ProductionNodeList"
            animation="300"
            :disabled="disabled"
            draggable=".singlePerson"
            :move="onMove"
          >
            <div
              v-for="(item, index) in ProductionNodeList"
              :key="index"
              class="item"
              :class="
                index == 0 || index == ProductionNodeList.length - 1
                  ? 'item forbid'
                  : 'item singlePerson'
              "
              length="ProductionNodeList.length"
              style="display: flex; margin-bottom: 20px"
            >
              <div style="width: 60px; margin-top: 5px; margin-right: 20px">
                <el-tag>
                  {{ item.name }}
                </el-tag>
              </div>
              <div>
                <div style="display: flex; margin-bottom: 20px">
                  <el-date-picker
                    v-model="item.completion_time"
                    placeholder="选择日期时间"
                    type="datetime"
                  />

                  <div v-if="item.type == 3" style="margin-left: 20px">
                    <el-button
                      size="small"
                      type="primary"
                      @click="delNode(index)"
                    >
                      删除
                    </el-button>
                  </div>
                </div>
                <div style="margin-left: -40px">
                  <el-form-item label="供应商备注">
                    <el-input
                      v-model="item.remark"
                      placeholder="请输入备注"
                      style="pointer-events: auto"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </vuedraggable>
        </div>
        <h4 id="scoll3">标准资料包</h4>
        <!-- 上传  -->
        <div style="display: flex">
          <div
            v-for="(item, index) in divUploadList"
            :key="index"
            style="width: 25%; padding: 10px"
          >
            <el-upload
              accept=".xls, .xlsx, .pdf, .doc, .docx, .ppt, .pptx, .jpg, .jpeg, .png"
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
        </div>
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
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image :src="row.img" style="width: 50px; height: 50px">
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
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
    <!-- 选择节点 -->
    <el-dialog
      :append-to-body="true"
      :before-close="handleGoodsCloseNode"
      title="选择节点"
      :visible.sync="dialogVisibleNode"
      width="500px"
    >
      <el-tag
        v-for="(item, index) in ProductionNodeAddList"
        :key="index"
        @click="chooseNode(item.name)"
      >
        {{ item.name }}
      </el-tag>
    </el-dialog>
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'
  import { mapGetters } from 'vuex'
  import { baseURL } from '@/config'
  export default {
    name: 'ComponentsDrawer',
    components: {
      vuedraggable,
    },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        // 供应商 员工选择器
        selectLists: {
          supplier: [],
          employee: [],
        },
        // 提交表单
        subFormData: {
          processing: 1,
          priority: 1,
          prepare: {
            cloth: 1,
            accessory: 1,
            other: 1,
          },
        },
        // 节点拖拽禁用
        disabled: false,
        // 选择节点
        dialogVisibleNode: false,
        // 选择节点数组
        ProductionNodeAddList: [],
        // 添加节点数组
        ProductionNodeList: [],
        // 上传按钮数组
        divUploadList: [
          {
            name: '上传裁床指示单',
            type: 1,
            list: [],
            url: '',
          },
          {
            name: '上传生产工艺单',
            type: 2,
            list: [],
            url: '',
          },
          {
            name: '上传大货指示单',
            type: 3,
            list: [],
            url: '',
          },
          {
            name: '上传后整指示单',
            type: 4,
            list: [],
            url: '',
          },
        ],
        // 上传请求头
        headers: {},
        // 上传类型
        uploadType: 1,
        // 选择商品弹窗
        dialogVisible: false,
        // 选择商品 列表相关
        page: 1,
        pageSize: 20,
        form: {
          page: 1,
          pageSize: 20,
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
        // 选中商品规格按钮数量
        colorBtnArr: [],
        rules: {
          priority: [
            { required: true, message: '请选择优先级', trigger: 'blur' },
          ],
          supplier_id: [
            { required: true, message: '请选择供应商', trigger: 'blur' },
          ],
          uid: [{ required: true, message: '请选择制单人', trigger: 'blur' }],
        },
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
        handler: function () {
          this.page = 1
          this.pageSize = 20
          this.fetchData()
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
      tableData: {
        handler: function (newVal) {
          // 根据 color_name 统计 num
          let colorArr = []
          let colorObj = {}
          newVal.forEach((item) => {
            if (colorObj[item.color_name]) {
              colorObj[item.color_name].num =
                Number(colorObj[item.color_name].num) + Number(item.num)
            } else {
              colorObj[item.color_name] = {
                color_name: item.color_name,
                color_id: item.color_id,
                num: item.num,
              }
            }
          })
          for (let key in colorObj) {
            colorArr.push(colorObj[key])
          }
          this.colorBtnArr = colorArr
        },
        deep: true,
      },
    },
    created() {
      this.selectData()
      this.getTypeList()
      this.getNodeList()
      // 上传接口获取token
      this.headers['Authorization'] = `${this.token}`
    },
    methods: {
      // 获取供应商列表
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'supplier',
        })
        this.selectLists.supplier = data.supplier
      },
      // 获取制单人下拉框
      async selectData() {
        const { data } = await this.api.getEmployeeList({
          name: '',
          page: -1,
          pageSize: 20,
          department_id: '', //部门id
          role: null, //岗位id
          status: 1, // 状态 1=在职 0=停职 默认传1
        })
        this.selectLists.employee = data
      },
      // 获取节点列表
      async getNodeList() {
        const { data } = await this.api.getNodeSystemList()
        // 对节点列表顺序处理
        let firstItem = ''
        let lastItem = ''
        let arr = []
        data.list.forEach((item) => {
          item.completion_time = ''
          item.remark = ''
          if (item.type == 1) {
            firstItem = item
          }
          if (item.type == 2) {
            lastItem = item
          }
          if (item.type == 3) {
            arr.push(item)
          }
        })
        arr.unshift(firstItem)
        arr.push(lastItem)
        this.ProductionNodeList = JSON.parse(JSON.stringify(arr))
        this.ProductionNodeAddList = JSON.parse(JSON.stringify(arr))
      },
      // 提交表单
      async subForm() {
        if (this.goodsDetails == null) {
          this.$message.error('请先选择商品')
          return
        }
        let allNum = 0
        this.colorBtnArr.forEach((item) => {
          allNum += Number(item.num)
        })
        if (allNum == 0) {
          this.$message.error('请输入规格件数')
          return
        }
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            this.subFormData.goods_id = this.goodsDetails.id
            this.subFormData.spec = this.tableData
          }
        })
        if (
          this.ProductionNodeList[this.ProductionNodeList.length - 1]
            .completion_time == ''
        ) {
          this.$message.error('请填写成品入库完成时间')
          return
        }
        this.ProductionNodeList.forEach((item) => {
          if (item.completion_time != '') {
            item.completion_time =
              new Date(item.completion_time).getTime() / 1000
          }
        })
        this.subFormData.node = this.ProductionNodeList
        let arr = []
        this.divUploadList.forEach((item) => {
          arr.push(item.url)
        })
        this.subFormData.package = arr
        const { code } = await this.api.editDocumentaryOrderSave(
          this.subFormData
        )
        if (code == 200) {
          this.$message.success('新增成功')
          this.$emit('fetch-data')
          this.$emit('handle-close')
        }
      },
      //禁止拖动到id为1的对象
      onMove(e) {
        if (
          e.relatedContext.element.type == 1 ||
          e.relatedContext.element.type == 2
        )
          return false
        return true
      },
      // 选择节点
      chooseNode(name) {
        let flag = false
        this.ProductionNodeList.forEach((item) => {
          if (item.name == name) {
            flag = true
          }
        })
        if (flag) {
          this.$message({
            message: '该节点已存在',
            type: 'warning',
          })
          return
        }
        this.ProductionNodeList.splice(1, 0, {
          name: name,
          time: '',
          type: 3,
        })
        this.dialogVisibleNode = false
      },
      // 删除节点
      delNode(index) {
        this.ProductionNodeList.splice(index, 1)
      },
      // 添加节点
      addNode() {
        this.dialogVisibleNode = true
      },
      // 上传处理显示列表 只能显示最新的一个
      async handleChange(res, file, fileList) {
        if (res.code == 200) {
          if (this.uploadType == 1) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
            this.divUploadList[this.uploadType - 1].url = res.data.file_url
          } else if (this.uploadType == 2) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
            this.divUploadList[this.uploadType - 1].url = res.data.file_url
          } else if (this.uploadType == 3) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
            this.divUploadList[this.uploadType - 1].url = res.data.file_url
          } else if (this.uploadType == 4) {
            this.divUploadList[this.uploadType - 1].list = fileList.slice(-1)
            this.divUploadList[this.uploadType - 1].url = res.data.file_url
          }
        }
      },
      // 上传限制
      beforeUpload(file) {
        const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
        const whiteList = [
          'xls',
          'xlsx',
          'pdf',
          'doc',
          'docx',
          'ppt',
          'pptx',
          'jpg',
          'jpeg',
          'png',
        ]
        if (whiteList.indexOf(fileSuffix) === -1) {
          this.$message.error(
            '上传文件只能是 xls、xlsx、pdf、doc、docx、ppt、pptx、jpg、jpeg、png格式'
          )
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
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 商品列表
      async debounceFetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
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
        let arr = []
        for (let i = 0; i < colorNmae.length; i++) {
          for (let j = 0; j < sizeNmae.length; j++) {
            arr.push({
              color_name: colorNmae[i],
              color_id: colorId[i],
              size_name: sizeNmae[j],
              size_id: sizeId[j],
              num: 0,
            })
          }
        }
        this.tableData = arr
        this.loading = false
        this.dialogVisible = false
      },
      // 打开商品选择
      handleGoodsOpen() {
        this.dialogVisible = true
        this.fetchData()
      },
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchData()
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
      handleGoodsCloseNode() {
        this.dialogVisibleNode = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
