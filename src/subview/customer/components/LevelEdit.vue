<template>
  <el-dialog
    :title="title"
    top="10vh"
    :visible.sync="dialogFormVisible"
    width="850px"
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
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <div v-if="tabLabel == '基础信息'">
        <el-form-item label="等级名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入等级名称"
            style="width: 415px"
          />
        </el-form-item>
        <el-form-item label="等级权重" prop="discount">
          <el-input-number
            v-model="form.discount"
            controls-position="right"
            :max="10"
            :min="1"
            step-strictly
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="等级图标">
          <el-button type="primary" @click="handleShow()">图标上传</el-button>
        </el-form-item>
        <el-form-item label="会员背景">
          <el-button type="primary" @click="handleShow()">背景上传</el-button>
        </el-form-item>
        <el-form-item label="整手折扣" prop="zhekou">
          <el-input
            v-model="form.discount_sm"
            placeholder="例：如果想要3.5折，请输入3.5 如果没有折扣，请输入10"
            style="width: 415px"
          />
        </el-form-item>
        <el-form-item label="散码折扣" prop="zhekou_sm">
          <el-input
            v-model="form.discount_sm"
            placeholder="例：如果想要4.5折，请输入4.5 如果没有折扣，请输入10"
            style="width: 415px"
          />
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
          <span
            v-for="(item, index) in tagsList"
            :key="index"
            :class="[item.type === 1 ? 'tagsClass' : 'tagsClass1']"
            @click="handleClickTag(index)"
          >
            {{ item.name }}
          </span>
        </el-form-item>
        <el-form-item
          v-if="tagsList[0].type == 2"
          label="单笔消费金额"
          prop="zhekou"
        >
          <el-input
            v-model="form.addressKeyword"
            clearable
            style="width: 415px"
          >
            <el-button slot="append">元</el-button>
          </el-input>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="text"
            @click="tagsList[0].type = 1"
          >
            删除
          </el-button>
        </el-form-item>
        <el-form-item
          v-if="tagsList[1].type == 2"
          label="累计消费金额"
          prop="zhekou"
        >
          <el-input
            v-model="form.addressKeyword"
            clearable
            style="width: 415px"
          >
            <el-button slot="append">元</el-button>
          </el-input>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="text"
            @click="tagsList[1].type = 1"
          >
            删除
          </el-button>
        </el-form-item>
        <el-form-item
          v-if="tagsList[2].type == 2"
          label="单笔充值金额"
          prop="zhekou"
        >
          <el-input
            v-model="form.addressKeyword"
            clearable
            style="width: 415px"
          >
            <el-button slot="append">元</el-button>
          </el-input>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="text"
            @click="tagsList[2].type = 1"
          >
            删除
          </el-button>
        </el-form-item>
        <el-form-item
          v-if="tagsList[3].type == 2"
          label="累计充值金额"
          prop="zhekou"
        >
          <el-input
            v-model="form.addressKeyword"
            clearable
            style="width: 415px"
          >
            <el-button slot="append">元</el-button>
          </el-input>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="text"
            @click="tagsList[3].type = 1"
          >
            删除
          </el-button>
        </el-form-item>
        <el-form-item
          v-if="tagsList[4].type == 2"
          label="指定商品"
          prop="zhekou"
        >
          <el-button size="small" type="primary">添加商品</el-button>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="text"
            @click="tagsList[4].type = 1"
          >
            删除
          </el-button>
        </el-form-item>
        <el-form-item
          v-if="tagsList[5].type == 2"
          label="购买会员卡"
          prop="zhekou"
        >
          <el-button size="small" type="primary">添加会员卡</el-button>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="text"
            @click="tagsList[5].type = 1"
          >
            删除
          </el-button>
        </el-form-item>
      </div>
      <div v-if="tabLabel == '降级策略'">
        <el-form-item label="降级策略">
          <el-radio-group v-model="form.sdfjh">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <div>开启时，为满足条件自动降级</div>
        </el-form-item>
        <div v-if="form.sdfjh == 1">
          <el-form-item>
            新策略：
            <span v-if="form.radio9 == 1">
              所有该等级会员从2022-11-02 10:39:18开始执行降级策略
            </span>
            <span v-else>新升级成该等级的会员 30 天后执行降级策略</span>
          </el-form-item>
          <el-form-item label="等级保护期">
            <el-input
              v-model="form.addressKeyword"
              clearable
              style="width: 200px"
            >
              <el-button slot="append">天</el-button>
            </el-input>
            <div>
              在保护期内，会员不会自动降级，保护区过后未满足条件时自动降级
            </div>
          </el-form-item>
          <el-form-item label="降级条件">
            <el-radio-group v-model="form.sdfjh1">
              <el-radio :label="1" style="margin-top: 10px">
                近
                <el-input
                  v-model="form.addressKeyword"
                  clearable
                  style="width: 200px; margin-top: -10px"
                >
                  <el-button slot="append">天</el-button>
                </el-input>
                满足以下任意条件
              </el-radio>
              <el-radio :label="0">无条件自动降级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              v-model="form.checked"
              style="width: 100%; margin-bottom: 10px"
            >
              单笔消费金额未满
              <el-input
                v-model="form.addressKeyword"
                clearable
                style="width: 200px; margin-top: -10px"
              >
                <el-button slot="append">元</el-button>
              </el-input>
            </el-checkbox>
            <el-checkbox
              v-model="form.checked1"
              style="width: 100%; margin-bottom: 10px"
            >
              累计消费金额未满
              <el-input
                v-model="form.addressKeyword"
                clearable
                style="width: 200px; margin-top: -10px"
              >
                <el-button slot="append">元</el-button>
              </el-input>
            </el-checkbox>
            <el-checkbox
              v-model="form.checked2"
              style="width: 100%; margin-bottom: 10px"
            >
              单笔充值金额未满
              <el-input
                v-model="form.addressKeyword"
                clearable
                style="width: 200px; margin-top: -10px"
              >
                <el-button slot="append">元</el-button>
              </el-input>
            </el-checkbox>
            <el-checkbox
              v-model="form.checked3"
              style="width: 100%; margin-bottom: 10px"
            >
              累计充值金额未满
              <el-input
                v-model="form.addressKeyword"
                clearable
                style="width: 200px; margin-top: -10px"
              >
                <el-button slot="append">元</el-button>
              </el-input>
            </el-checkbox>
            <el-checkbox
              v-model="form.checked4"
              style="width: 100%; margin-bottom: 10px"
            >
              未购买指定商品
            </el-checkbox>
            <div>
              指定商品：
              <el-button native-type="submit" size="small" type="primary">
                添加商品
              </el-button>
            </div>
            <el-checkbox
              v-model="form.checked5"
              style="width: 100%; margin-bottom: 10px"
            >
              未购买指定会员卡
            </el-checkbox>
            <div>
              指定会员卡：
              <el-button native-type="submit" size="small" type="primary">
                添加会员卡
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="会员降级为">
            <el-radio-group v-model="form.ew85">
              <el-radio :label="1">降一级</el-radio>
              <el-radio :label="0">降级到特定等级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.ew85 == 0">
            <el-select v-model="form.type12" placeholder="请选择">
              <el-option label="黄金" :value="1" />
              <el-option label="白银" :value="2" />
            </el-select>
          </el-form-item>
        </div>
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
    <el-dialog
      :append-to-body="true"
      :before-close="handleClose1"
      title="降级策略设置"
      :visible.sync="dialogVisible1"
      width="50%"
    >
      <el-form label-width="120px" :model="form">
        <el-radio-group v-model="form.radio9" style="margin-bottom: 10px">
          <el-radio :label="1" style="width: 100%; margin-bottom: 10px">
            所有该等级会员从
            <el-date-picker
              v-model="form.value1"
              placeholder="选择日期"
              type="date"
            />
            的
            <span style="color: #46a6ff">30</span>
            天后执行降级策略
          </el-radio>
          <el-radio :label="2" style="width: 100%">
            新升级成该等级的会员
            <span style="color: #46a6ff">30</span>
            天后执行降级策略
          </el-radio>
        </el-radio-group>
        <el-form-item>
          <el-button @click="close1">取消</el-button>
          <el-button type="primary" @click="save1">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import { editGradeList } from '@/api/basic'
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'LevelDeit',
    components: {
      VabUpload,
    },
    data() {
      return {
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
          name: '',
          id: '',
          discount: '',
          discount_sm: '',
          sp: 0,
          des: '',
          sdfjh: 0,
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
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      handleChange(value) {
        console.log(value)
      },
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
              const { code } = await editGradeList(this.form)
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
              const { code } = await editGradeList(this.form)
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
