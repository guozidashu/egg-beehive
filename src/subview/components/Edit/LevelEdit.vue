<template>
  <el-dialog
    :title="title"
    top="10vh"
    :visible.sync="dialogFormVisible"
    width="850px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="等级名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入等级名称"
          style="width: 415px"
        />
      </el-form-item>
      <el-form-item label="等级权重" prop="sort">
        <el-input-number
          v-model="form.sort"
          controls-position="right"
          :max="10"
          :min="1"
          step-strictly
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="等级图标">
        <div style="display: flex">
          <div>
            <el-button
              size="small"
              style="margin: 0 10px 0 0"
              type="primary"
              @click="handleShow(1)"
            >
              图标上传
            </el-button>
          </div>
          <img
            v-if="form.icon"
            :src="form.icon"
            style="width: 80px; height: 80px"
          />
        </div>
      </el-form-item>
      <el-form-item label="会员背景">
        <div style="display: flex">
          <div>
            <el-button
              size="small"
              style="margin: 0 10px 0 0"
              type="primary"
              @click="handleShow(2)"
            >
              背景上传
            </el-button>
          </div>
          <img
            v-if="form.banner"
            :src="form.banner"
            style="width: 80px; height: 80px"
          />
        </div>
      </el-form-item>
      <el-form-item label="整手折扣" prop="discount">
        <el-input
          v-model="form.discount"
          placeholder="例：如果想要3.5折，请输入3.5 如果没有折扣，请输入10"
          style="width: 415px"
        />
      </el-form-item>
      <el-form-item label="散码折扣" prop="discount_single">
        <el-input
          v-model="form.discount_single"
          placeholder="例：如果想要4.5折，请输入4.5 如果没有折扣，请输入10"
          style="width: 415px"
        />
      </el-form-item>
      <el-form-item label="下单件数" prop="full_num">
        <el-input
          v-model="form.full_num"
          placeholder="请输入下单件数"
          style="width: 415px"
        />
        <div style="font-size: 12px; color: #c0c4cc">
          默认值为空，小程序提交订单不受限制；设置数值后，提交订单数量小于等于该数值则不可提交订单
        </div>
      </el-form-item>
      <el-form-item label="下单金额" prop="full_amount">
        <el-input
          v-model="form.full_amount"
          placeholder="请输入下单金额"
          style="width: 415px"
        />
        <div style="font-size: 12px; color: #c0c4cc">
          默认值为空，小程序提交订单不受限制；设置数值后，提交订单金额小于等于该数值则不可提交订单
        </div>
      </el-form-item>
      <el-form-item label="能否散批" prop="single_buy">
        <el-radio-group v-model="form.single_buy">
          <el-radio :label="1">关闭</el-radio>
          <el-radio :label="0">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="保证金额">
        <el-input
          v-model="form.earnest_money"
          placeholder="请输入保证金额"
          style="width: 415px"
        />
      </el-form-item>
      <el-form-item label="等级说明" prop="remark">
        <el-input
          v-model="form.remark"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入等级说明"
          style="width: 415px"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </el-dialog>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'LevelDeit',
    components: {
      VabUpload,
    },
    data() {
      return {
        uploadType: 1,
        dialogVisible1: false,
        tagsList: [
          { name: '单笔消费金额', type: 1 },
          { name: '累计消费金额', type: 1 },
          { name: '单笔充值金额', type: 1 },
          { name: '累计充值金额', type: 1 },
          { name: '购买指定商品', type: 1 },
          { name: '购买会员卡', type: 1 },
        ],
        activeName: 'first',
        tabLabel: '基础信息',
        form: {
          id: '', //编辑时用
          sort: null, //排序
          name: null, //等级名称
          icon: '', //图片地址
          banner: '', //banner图
          discount: null, //整手折扣
          discount_single: null, //散码折扣
          single_buy: 0, //是否散批 1是 0否
          remark: null, //等级说明
          earnest_money: 0, //保证金
        },
        rules: {
          sort: [
            { required: true, message: '请输入排序', trigger: 'blur' },
            { type: 'number', message: '排序必须为数字值' },
          ],
          name: [
            { required: true, message: '请输入等级名称', trigger: 'blur' },
          ],
          discount: [
            { required: true, message: '请输入整手折扣', trigger: 'blur' },
          ],
          discount_single: [
            { required: true, message: '请输入散码折扣', trigger: 'blur' },
          ],
          full_num: [
            { required: true, message: '请输入满足数量', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value && !/^[1-9]\d*$/.test(value)) {
                  callback(new Error('请输入正整数'))
                } else {
                  callback()
                }
              },
            },
          ],
          full_amount: [
            { required: true, message: '请输入满足金额', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value && !/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
                  callback(new Error('金额正数且最多两位小数'))
                } else {
                  callback()
                }
              },
            },
          ],

          remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    watch: {
      'form.sdfjh': {
        handler: function (n) {
          if (n === 1) {
            this.dialogVisible1 = true
          }
        },
      },
    },
    created() {},
    methods: {
      close1() {
        this.dialogVisible1 = false
        this.form.sdfjh = 0
      },
      save1() {
        this.dialogVisible1 = false
        this.form.sdfjh = 1
      },
      handleClose1() {
        this.dialogVisible1 = false
      },
      handleClickTag(index) {
        this.tagsList[index].type = 2
      },
      handleClick(tab) {
        this.tabLabel = tab.label
      },
      getSon(data) {
        if (this.uploadType == 1) {
          this.form.icon = data[0]
        }
        if (this.uploadType == 2) {
          this.form.banner = data[0]
        }
        this.$forceUpdate()
      },
      handleShow(type) {
        this.uploadType = type
        this.$refs['vabUpload'].handleShow()
      },
      handleChange() {},
      showEdit(row) {
        if (!row) {
          this.title = '添加会员等级'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加') {
              const { code } = await this.api.editGradeList(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              const { code } = await this.api.editGradeList(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            }
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .tagsClass {
    padding: 5px;
    margin: 5px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
  .tagsClass1 {
    padding: 5px;
    margin: 5px;
    color: #409eff;
    border: 1px solid #409eff;
    border-radius: 5px;
  }
</style>
