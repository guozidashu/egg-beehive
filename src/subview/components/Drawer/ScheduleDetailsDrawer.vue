<template>
  <div class="components-drawer" style="padding: 0 20px">
    <h4>商品信息</h4>
    <div
      style="
        position: absolute;
        top: 80px;
        right: 20px;
        z-index: 99;
        background-color: white;
      "
    >
      <div v-if="form.is_void == 1">
        <el-tag type="danger">此单已作废</el-tag>
      </div>
      <el-button
        v-else
        size="small"
        type="primary"
        @click="DocumentaryOrderVoid"
      >
        作废此单
      </el-button>
    </div>
    <div style="display: flex">
      <el-image :src="form.goods_img" style="width: 100px; height: 100px">
        <div slot="error" class="el-image__error">暂无图片</div>
      </el-image>
      <div style="margin-left: 20px">
        <div style="margin-bottom: 10px">款号：{{ form.goods_sn }}</div>
        <div style="margin-bottom: 10px">名称：{{ form.goods_name }}</div>
        <div style="margin-bottom: 10px">波段：{{ form.goods_band }}</div>
        <div>创建时间：{{ form.create_time | formatTime }}</div>
      </div>
    </div>
    <h4>跟单信息</h4>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">批次：{{ form.order_id }}</div>
      <div style="width: 50%">
        跟单状态：
        <el-tag v-if="form.order_status == 1">正常</el-tag>
        <el-tag v-if="form.order_status == 2" type="warning">预警</el-tag>
        <el-tag v-if="form.order_status == 3" type="danger">超期</el-tag>
        <el-tag v-if="form.order_status == 4" type="success">已完成</el-tag>
      </div>
    </div>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">单号：{{ form.order_sn }}</div>
      <div style="width: 50%">
        优先度：
        <el-tag v-if="form.order_priority == 1">正常</el-tag>
        <el-tag v-if="form.order_priority == 2" type="warning">紧急</el-tag>
        <el-tag v-if="form.order_priority == 3" type="danger">加急</el-tag>
      </div>
    </div>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">制单人：{{ form.employee_name }}</div>
      <div style="width: 50%">
        跟单类型：
        <el-tag v-if="form.order_type == 1">期货</el-tag>
        <el-tag v-if="form.order_type == 2" type="success">首单</el-tag>
        <el-tag v-if="form.order_type == 3" type="warning">补单</el-tag>
        <el-tag v-if="form.order_type == 4" type="danger">预售</el-tag>
      </div>
    </div>
    <div style="margin-bottom: 10px">供应商：{{ form.supplier_name }}</div>
    <div style="margin-bottom: 10px">
      预计交货日期：{{ form.order_expected_date | formatTime }}
    </div>
    <div style="display: flex; justify-content: space-between">
      <h4>数量信息</h4>
      <div>
        <el-button
          v-if="form.order_operate && form.is_void == 0"
          size="small"
          type="primary"
          @click="handleEdit(form.spec, form.order_id, 1)"
        >
          编辑此单
        </el-button>
      </div>
    </div>
    <el-table :data="form.spec" show-summary style="width: 100%">
      <el-table-column label="颜色" prop="color_name" />
      <el-table-column label="尺码" prop="size_name" />
      <el-table-column label="订单数" prop="num" />
      <el-table-column label="实裁数" prop="cut_num" />
      <el-table-column label="在生产" prop="zsc_num" />
      <el-table-column label="已入库" prop="entered_num" />
    </el-table>
    <div
      style="display: flex; justify-content: space-between; margin-top: 20px"
    >
      <h4>生产准备</h4>
      <div>
        <el-button
          v-if="!prepareSta == true"
          size="small"
          type="primary"
          @click="prepareSta = true"
        >
          编辑
        </el-button>
        <el-button
          v-if="prepareSta == true"
          size="small"
          type="primary"
          @click="handleEditPrepare(form.prepare, form.order_id)"
        >
          完成
        </el-button>
      </div>
    </div>
    <el-form v-if="prepareSta == true" ref="form" label-width="120px">
      <el-form-item label="布料:">
        <el-radio-group v-model="form.prepare.cloth">
          <el-radio :label="1">齐全</el-radio>
          <el-radio :label="0">不齐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.prepare.cloth == 0" label="缺失原因">
        <el-input
          v-model="form.prepare.cloth_note"
          placeholder="请输入缺失原因"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="辅料:">
        <el-radio-group v-model="form.prepare.accessory">
          <el-radio :label="1">齐全</el-radio>
          <el-radio :label="0">不齐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.prepare.accessory == 0" label="缺失原因">
        <el-input
          v-model="form.prepare.accessory_note"
          placeholder="请输入缺失原因"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="其他:">
        <el-radio-group v-model="form.prepare.other">
          <el-radio :label="1">齐全</el-radio>
          <el-radio :label="0">不齐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.prepare.other == 0" label="缺失原因">
        <el-input
          v-model="form.prepare.other_note"
          placeholder="请输入缺失原因"
          style="width: 200px"
        />
      </el-form-item>
    </el-form>
    <el-form v-else ref="form" label-width="120px">
      <el-form-item label="布料:">
        <span v-if="form.prepare.cloth == 0">不齐</span>
        <span v-else>齐全</span>
      </el-form-item>
      <el-form-item v-if="form.prepare.cloth == 0" label="缺失原因">
        <span v-if="form.prepare.cloth_note == ''">无</span>
        <span v-else>{{ form.prepare.cloth_note }}</span>
      </el-form-item>
      <el-form-item label="辅料:">
        <span v-if="form.prepare.accessory == 0">不齐</span>
        <span v-else>齐全</span>
      </el-form-item>
      <el-form-item v-if="form.prepare.accessory == 0" label="缺失原因">
        <span v-if="form.prepare.accessory_note == ''">无</span>
        <span v-else>{{ form.prepare.accessory_note }}</span>
      </el-form-item>
      <el-form-item label="其他:">
        <span v-if="form.prepare.other == 0">不齐</span>
        <span v-else>齐全</span>
      </el-form-item>
      <el-form-item v-if="form.prepare.other == 0" label="缺失原因">
        <span v-if="form.prepare.other_note == ''">无</span>
        <span v-else>{{ form.prepare.other_note }}</span>
      </el-form-item>
    </el-form>
    <h4>跟单流程</h4>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in form.node"
        :key="index"
        placement="top"
      >
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <div style="display: flex; justify-content: space-between">
              <div style="margin-top: 10px">
                {{ item.name }} {{ item.status_text }}
              </div>
              <el-dropdown v-if="form.is_void == 0">
                <el-button type="primary">
                  操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- "type": 1, // 类型：1=建裁床单 2= 建入库单 3=无操作
                  "status": 0, // 状态 0=未开始 1=已开始 2=已完成 -->
                  <el-dropdown-item>
                    <div @click="handleEdit(item.id, form.order_id, 2)">
                      设置预计完成时间
                    </div>
                  </el-dropdown-item>
                  <template v-if="item.type == 1">
                    <el-dropdown-item>
                      <div @click="handleEdit('cutting', form.order_id, 3)">
                        查看相关裁床单
                      </div>
                    </el-dropdown-item>

                    <template v-if="item.status == 1">
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(form.spec, form.order_id, 5, 1, item.id)
                          "
                        >
                          填写实裁数量
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(
                              item.id,
                              form.order_id,
                              4,
                              2,
                              '完成裁床裁剪'
                            )
                          "
                        >
                          完成裁床裁剪
                        </div>
                      </el-dropdown-item>
                    </template>
                  </template>
                  <template v-if="item.type == 2">
                    <el-dropdown-item>
                      <div @click="handleEdit('storage', form.order_id, 3)">
                        查看相关入库单
                      </div>
                    </el-dropdown-item>
                    <template v-if="item.status == 0">
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(item.id, form.order_id, 4, 1, '成品入库')
                          "
                        >
                          开始成品入库
                        </div>
                      </el-dropdown-item>
                    </template>
                    <template v-if="item.status == 1">
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(form.spec, form.order_id, 5, 2, item.id)
                          "
                        >
                          填写入库数量
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(
                              item.id,
                              form.order_id,
                              4,
                              2,
                              '完成成品入库'
                            )
                          "
                        >
                          完成成品入库
                        </div>
                      </el-dropdown-item>
                    </template>
                  </template>
                  <template v-if="item.type == 3">
                    <template v-if="item.status == 0">
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(
                              item.id,
                              form.order_id,
                              4,
                              1,
                              '开始' + item.name
                            )
                          "
                        >
                          开始{{ item.name }}
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(
                              item.id,
                              form.order_id,
                              4,
                              3,
                              '跳过' + item.name
                            )
                          "
                        >
                          跳过{{ item.name }}
                        </div>
                      </el-dropdown-item>
                    </template>
                    <template v-if="item.status == 1">
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(
                              item.id,
                              form.order_id,
                              4,
                              2,
                              '完成' + item.name
                            )
                          "
                        >
                          完成{{ item.name }}
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div
                          @click="
                            handleEdit(
                              item.id,
                              form.order_id,
                              4,
                              3,
                              '跳过' + item.name
                            )
                          "
                        >
                          跳过{{ item.name }}
                        </div>
                      </el-dropdown-item>
                    </template>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-if="item.remark == ''">供应商备注：未知</div>
            <div v-else>供应商备注：{{ item.remark }}</div>
            <div v-if="item.rate != undefined" style="margin-top: 10px">
              裁剪率：{{ item.rate }}%
            </div>
          </div>
          <div style="padding: 10px">
            <div
              v-for="(item1, index1) in item.log"
              :key="index1"
              style="margin-bottom: 10px"
            >
              {{ item1.content }}:
              {{ item1.create_time | formatTime }}
            </div>
          </div>
          <div style="text-align: right">
            预计完成日期：
            <span v-if="item.estimate_completion_time == 0">未设置</span>
            <span v-else>
              {{ item.estimate_completion_time | formatTime }}
            </span>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div style="display: flex; justify-content: space-between">
      <h4>资料包</h4>
      <div v-if="form.is_void == 0">
        <el-button
          v-if="PackageState == 1 || PackageState == 3"
          size="small"
          type="primary"
          @click="changePackage(2)"
        >
          编辑资料包
        </el-button>
        <el-button
          v-if="PackageState == 2"
          size="small"
          type="primary"
          @click="changePackage(3)"
        >
          保存资料包
        </el-button>
      </div>
    </div>
    <div v-if="PackageState == 2" style="display: flex">
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
          <el-button size="small" type="primary" @click="handleShow(item.type)">
            {{ item.name }}
          </el-button>
        </el-upload>
      </div>
    </div>
    <div v-else style="display: flex">
      <div
        v-for="(item, index) in divUploadList"
        :key="index"
        style="width: 25%; padding: 10px; text-align: center"
      >
        <div style="margin-bottom: 10px">
          {{ item.name }}
        </div>
        <el-tag @click="viewPackage(index)">查看</el-tag>
      </div>
    </div>
    <div
      style="display: flex; justify-content: space-between; margin-top: 10px"
    >
      <h4>跟单记录</h4>
      <div>
        <el-button
          v-if="form.is_void == 0"
          size="small"
          type="primary"
          @click="handleEdit(form.node, form.order_id, 6)"
        >
          写跟进
        </el-button>
      </div>
    </div>
    <div v-if="followList.length > 0">
      <el-card
        v-for="(item, index) in followList"
        :key="index"
        class="box-card"
        shadow="hover"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          "
        >
          <div>{{ item.employee_name }}</div>
          <el-tag effect="plain">{{ item.node_name }}</el-tag>
        </div>
        <div style="margin-bottom: 10px">{{ item.content }}</div>
        <div style="text-align: right">{{ item.create_time | formatTime }}</div>
      </el-card>
    </div>
    <el-image
      v-else
      class="vab-data-empty"
      :src="require('@/assets/empty_images/data_empty.png')"
    />
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/ScheduleEdit'
  import { mapGetters } from 'vuex'
  import { baseURL } from '@/config'
  export default {
    name: 'ComponentsDrawer',
    components: { Edit },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        prepareSta: false,
        form: {},
        // 排期跟进列表
        followList: [],
        // 上传资料包状态 1=查看 2=编辑 3=上传
        PackageState: 1,
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
      }
    },
    computed: {
      // 上传接口获取token缓存
      ...mapGetters({
        token: 'user/token',
      }),
    },
    watch: {
      drawerInof: {
        handler: function (newVal) {
          this.getDetail(newVal)
          this.getFollowList(newVal)
        },
        immediate: true,
        deep: true,
      },
    },

    created() {
      // 上传接口获取token
      this.headers['Authorization'] = `${this.token}`
    },
    methods: {
      async handleEdit(row, order_id, type, status, title) {
        // type 1 设置规格数量 2 设置预计完成时间 3 查看相关裁床单 (row ,'cutting':裁床单, 'storage':入库单)
        // 4 修改节点状态（status,1=进行中 2=已完成 3=已跳过) 5 创建单据（status :1=裁床单创建，2入库单创建 title:node_id）
        // 6 新增跟进
        if (type != 4) {
          if (type == 5) {
            row.forEach((item) => {
              item.subNum = 0
            })
          }
          this.$refs['edit'].showEdit(row, order_id, type, status, title)
        } else {
          this.$baseConfirm('你确定要' + title + '吗？', null, async () => {
            const { code } = await this.api.editNodeStatus({
              node_id: row,
              order_id: order_id,
              status: status,
            })
            if (code != 200) {
              return
            }
            this.$message.success('操作成功')
            this.fetchData()
          })
        }
      },
      async handleEditPrepare(obj, id) {
        const { code } = await this.api.editSavePrepare({
          prepare: obj,
          order_id: id,
        })
        if (code != 200) {
          return
        }
        this.$message.success('编辑成功')
        this.prepareSta = false
      },
      async getDetail(row) {
        const { data } = await this.api.getDocumentaryOrderDetail({
          order_id: row.order_id,
        })
        this.form = JSON.parse(JSON.stringify(data))
      },
      async getFollowList(row) {
        const { data } = await this.api.getDocumentaryOrderFollowList({
          order_id: row.order_id,
        })
        this.followList = data.list
      },

      fetchData() {
        this.getDetail(this.drawerInof)
        this.getFollowList(this.drawerInof)
      },
      // 作废排期
      async DocumentaryOrderVoid() {
        const { code } = await this.api.editDocumentaryOrderVoid({
          order_id: this.form.order_id,
        })
        if (code != 200) {
          return
        }
        this.$message.success('作废成功')
        this.fetchData()
      },
      // 改变资料包状态  编辑资料包
      async changePackage(type) {
        if (type == 3) {
          let arr = []
          this.divUploadList.forEach((item) => {
            arr.push(item.url)
          })
          const { code } = await this.api.editPackage({
            order_id: this.form.order_id,
            package: arr,
          })
          if (code != 200) {
            return
          }
          this.$message.success('上传成功')
          this.fetchData()
          this.PackageState = type
        } else {
          this.PackageState = type
        }
      },
      // 查看资料包
      viewPackage(index) {
        if (this.form.order_package[index] != '') {
          window.open(this.form.order_package[index])
        } else {
          this.$message.error('暂无资料包,请先上传')
        }
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
    },
  }
</script>
<style lang="scss" scoped></style>
