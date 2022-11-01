<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-tabs
      v-model="activeName"
      style="margin-bottom: 20px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基础信息" name="first" />
      <el-tab-pane label="升级策略" name="second" />
      <el-tab-pane label="降级策略" name="three" />
    </el-tabs>
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <div v-if="tabLabel == '基础信息'">
        <el-form-item label="等级名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入等级名称"
            style="width: 415px"
          />
        </el-form-item>
        <el-form-item label="等级" prop="discount">
          <el-input-number
            v-model="form.discount"
            controls-position="right"
            :max="10"
            :min="1"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="图标">
          <el-button type="primary" @click="handleShow()">图标上传</el-button>
        </el-form-item>
        <el-form-item label="会员背景">
          <el-button type="primary" @click="handleShow()">背景上传</el-button>
        </el-form-item>
        <el-form-item label="整手折扣" prop="zhekou">
          <el-input v-model="form.discount_sm" style="width: 415px" />
        </el-form-item>
        <el-form-item label="散码折扣" prop="zhekou_sm">
          <el-input v-model="form.discount_sm" style="width: 415px" />
        </el-form-item>
        <el-form-item label="能否散批" prop="sp">
          <el-radio-group v-model="form.sp">
            <el-radio :label="1">关闭</el-radio>
            <el-radio :label="0">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="等级说明" prop="des">
          <el-input
            v-model="form.des"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入等级说明"
            style="width: 415px"
            type="textarea"
          />
        </el-form-item>
      </div>
      <div v-if="tabLabel == '升级策略'">
        <el-form-item label="升级策略">
          <el-radio-group v-model="form.sp">
            <el-radio :label="1">满足以下任意条件</el-radio>
            <el-radio :label="0">满足以下所有条件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button size="mini">单笔消费金额</el-button>
          <el-button size="mini">累计消费金额</el-button>
          <el-button size="mini">单笔充值金额</el-button>
          <el-button size="mini">累计充值金额</el-button>
          <el-button size="mini">购买指定商品</el-button>
          <el-button size="mini">购买会员卡</el-button>
        </el-form-item>
      </div>
      <div v-if="tabLabel == '降级策略'">
        <el-form-item label="降级策略">
          <el-radio-group v-model="form.sp">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <p>开启时，为满足条件自动降级</p>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
    <vab-upload
      ref="vabUpload"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
    />
  </el-dialog>
</template>

<script>
  import { updateGrade, addGrade } from '@/api/basic'
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'LevelDeit',
    components: {
      VabUpload,
    },
    data() {
      return {
        activeName: 'first',
        tabLabel: '基础信息',
        form: {
          name: '',
          id: '',
          discount: '',
          discount_sm: '',
          sp: 0,
          des: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          discount: [
            { required: true, trigger: 'blur', message: '请选择等级' },
          ],
          sp: [{ required: true, trigger: 'change', message: '请选择散批' }],
          zhekou_sm: [
            { required: true, trigger: 'blur', message: '请输入散码折扣' },
          ],
          zhekou: [
            { required: true, trigger: 'blur', message: '请输入整手折扣' },
          ],
          des: [{ required: true, trigger: 'blur', message: '请输入备注' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      handleClick(tab) {
        this.tabLabel = tab.label
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      handleChange(value) {
        console.log(value)
      },
      showEdit(row) {
        if (!row) {
          this.title = '添加'
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
              const { code } = await addGrade(this.form)
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
              const { code } = await updateGrade(this.form)
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
