<template>
  <div style="padding: 20px; border-radius: 5px">
    <div style="font-weight: 600">商城配置</div>
    <el-divider style="margin-bottom: 0" />
    <!-- <div class="textCss" style="margin-bottom: 25px">
      <p style="font-weight: 600">使用说明</p>
    </div> -->
    <el-radio-group v-model="activeName" style="margin-bottom: 20px">
      <el-radio-button label="基础配置" />
      <el-radio-button label="注册协议" />
      <el-radio-button label="小程序绑定" />
      <el-radio-button label="支付设置" />
    </el-radio-group>
    <el-form
      v-if="activeName == '基础配置'"
      ref="form"
      class="demo-form"
      label-position="right"
      label-width="150px"
      :model="form"
      :rules="rules"
    >
      <div>
        <el-form-item label="小程序头像和昵称" prop="avatar_name">
          <el-radio-group v-model="form.avatar_name">
            <el-radio :label="1">暂不设置</el-radio>
            <el-radio :label="2">强制设置</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="强制登录" prop="forced_login">
          <el-radio-group v-model="form.forced_login">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <div style="color: #999999">开启后进入系统必须先登录</div>
        </el-form-item>
        <el-form-item label="商家名称" prop="name">
          <el-input v-model="form.name" style="width: 215px" />
        </el-form-item>
        <el-form-item label="唯一标识" prop="shopid">
          <el-input v-model="form.shopid" style="width: 215px" />
        </el-form-item>
        <el-form-item label="api域名" prop="domain">
          <el-input v-model="form.domain" style="width: 215px" />
        </el-form-item>
        <el-form-item label="商家LOGO：" prop="logo">
          <el-button type="primary" @click="handleShow(1)">图片上传</el-button>
          <span style="margin-left: 20px; color: #999999">
            建议尺寸：200×200像素
          </span>
          <div v-if="form.logo" style="margin-top: 20px">
            <img :src="form.logo" style="width: 100px; height: 100px" />
          </div>
        </el-form-item>
        <el-form-item label="商家底部图片：" prop="bottom_logo">
          <el-button type="primary" @click="handleShow(3)">图片上传</el-button>
          <span style="margin-left: 20px; color: #999999">
            建议尺寸：25×25像素
          </span>
          <div v-if="form.bottom_logo" style="margin-top: 20px">
            <img :src="form.bottom_logo" style="width: 25px; height: 25px" />
          </div>
        </el-form-item>
        <el-form-item label="商家简介" prop="desc">
          <el-input v-model="form.desc" style="width: 215px" />
        </el-form-item>
        <el-form-item label="商家服务电话" prop="tel">
          <el-input v-model="form.tel" style="width: 215px" />
        </el-form-item>
        <el-form-item label="商家地址" prop="address">
          <el-input v-model="form.address" style="width: 215px" />
        </el-form-item>
        <el-form-item label="经纬度" prop="longitude">
          <el-input v-model="form.longitude" style="width: 100px" />
          <el-input
            v-model="form.latitude"
            style="width: 100px; margin-left: 15px"
          />
        </el-form-item>
        <el-form-item label="微信客服url" prop="wechat_service_url">
          <el-input v-model="form.wechat_service_url" style="width: 215px" />
        </el-form-item>
        <el-form-item label="微信客服企业id" prop="wechat_service_corpid">
          <el-input v-model="form.wechat_service_corpid" style="width: 215px" />
        </el-form-item>
        <div style="display: flex">
          <el-form-item label="客服系统链接" prop="customer_service_url">
            <el-input
              v-model="form.customer_service_url"
              style="width: 215px"
            />
          </el-form-item>
        </div>
        <div style="margin-top: 10px; margin-left: 184px; color: #999999">
          客服链接：使用填写的客服链接，不填写则使用商城内部客服系统；
        </div>
        <div style="margin-top: 5px; margin-left: 184px; color: #999999">
          小程序客服：在小程序后台-功能-客服-小程序客服，配置客服人员；
        </div>
        <div
          style="
            margin-top: 5px;
            margin-bottom: 20px;
            margin-left: 184px;
            color: #999999;
          "
        >
          微信客服：在
          <a href="#" style="color: black">微信客服</a>
          系统注册账号并绑定，
          <a href="" style="color: black">查看绑定流程</a>
          ，填写企业ID并复制客服链接填写到客服链接处
        </div>
        <el-form-item label="是否开启截图提醒" prop="screen_notice_state">
          <el-radio-group v-model="form.screen_notice_state">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.screen_notice_state == 1"
          label="截图提醒文本"
          prop="screen_notice_content"
        >
          <el-input
            v-model="form.screen_notice_content"
            autosize
            placeholder="请输入截图提醒文本"
            style="width: 215px"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="库存查询功能" prop="look_stock">
          <el-radio-group v-model="form.look_stock">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <div style="display: flex">
          <el-form-item label="主色调" prop="main_color">
            <el-input v-model="form.main_color" style="width: 215px" />
          </el-form-item>
          <el-color-picker
            v-model="form.main_color"
            style="margin-left: 20px"
          />
          <span style="padding-top: 5px; margin-left: 20px; color: #999999">
            商城主色调，如：#FD4A46
          </span>
        </div>
        <div style="display: flex">
          <el-form-item label="辅色调" prop="assist_color">
            <el-input v-model="form.assist_color" style="width: 215px" />
          </el-form-item>
          <el-color-picker
            v-model="form.assist_color"
            style="margin-left: 20px"
          />
          <span style="padding-top: 5px; margin-left: 20px; color: #999999">
            商城辅色调，如：#7E71F6
          </span>
        </div> -->
        <el-form-item>
          <el-button
            v-has-permi="['btn:Mallhopping:save']"
            style="margin-top: 10px"
            type="primary"
            @click="submitForm('form')"
          >
            提交
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-form
      v-if="activeName == '注册协议'"
      ref="form1"
      class="demo-form"
      label-position="right"
      label-width="150px"
      :model="form1"
      :rules="rules1"
    >
      <div v-if="activeName == '注册协议'">
        <el-form-item label="用户注册协议" prop="register_status">
          <el-radio-group v-model="form1.register_status">
            <el-radio :label="0">不开启</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="协议名称" prop="register_name">
          <el-input v-model="form1.register_name" style="width: 215px" />
        </el-form-item>
        <el-form-item label="文章ID" prop="article_id">
          <el-input v-model="form1.article_id" style="width: 215px" />
        </el-form-item>
        <!-- <el-form-item class="vab-quill-content" label="内容" prop="content">
          <vab-quill
            ref="vab-quill"
            v-model="form1.register_content"
            :min-height="400"
            :options="options"
          />
        </el-form-item> -->
        <el-form-item>
          <el-button
            v-has-permi="['btn:Mallhopping:save']"
            style="margin-top: 10px"
            type="primary"
            @click="submitForm1('form1')"
          >
            提交
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <SmallProgram v-if="activeName == '小程序绑定'" />
    <PayProgram v-if="activeName == '支付设置'" />
    <vab-upload
      v-if="uploadType == 1 || uploadType == 3"
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <!-- <vab-upload
      v-if="uploadType == 2"
      ref="vabUpload"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    /> -->
  </div>
</template>
<script>
  import VabUpload from '@/extra/VabUpload'
  import SmallProgram from '@/subview/components/Form/SmallProgram.vue'
  import PayProgram from '@/subview/components/Form/PayProgram.vue'
  // import VabQuill from '@/extra/VabQuill'
  export default {
    name: 'SystemStore',
    components: {
      VabUpload,
      SmallProgram,
      PayProgram,
      // VabQuill,
    },
    data() {
      return {
        uploadType: 1,
        activeName: '基础配置',
        // options: {
        //   theme: 'snow',
        //   bounds: document.body,
        //   debug: 'warn',
        //   modules: {
        //     toolbar: {
        //       container: [
        //         ['bold', 'italic', 'underline', 'strike'],
        //         [{ header: [1, 2, 3, 4, 5, 6, false] }],
        //         [{ size: ['small', false, 'large', 'huge'] }],
        //         [{ color: [] }, { background: [] }],
        //         ['blockquote', 'code-block'],
        //         [{ list: 'ordered' }, { list: 'bullet' }],
        //         [{ script: 'sub' }, { script: 'super' }],
        //         [{ indent: '-1' }, { indent: '+1' }],
        //         [{ align: [] }],
        //         [{ direction: 'rtl' }],
        //         [{ font: [] }],
        //         ['clean'],
        //         ['link', 'image'],
        //       ],
        //       handlers: {
        //         image: () => {
        //           this.$baseConfirm(
        //             '点击上传图片',
        //             '上传图片',
        //             () => {
        //               this.handleShow(2)
        //             },
        //             () => {},
        //             '上传',
        //             '取消'
        //           )
        //         },
        //       },
        //     },
        //   },
        //   placeholder: '内容...',
        //   readOnly: false,
        // },
        form: {
          look_stock: 0,
          bottom_logo: 'https://new.shopvvv.cn/static/imgsrc/logo.jpg', //商家底部图片
          avatar_name: 2,
          forced_login: 1,
          name: '商城系统', //商家名称
          shopid: 'quanyudemo', //唯一标识
          domain: 'demo.quanyu123.com', //api域名
          logo: 'https://new.shopvvv.cn/static/imgsrc/logo.jpg', //商家logo
          desc: '', //商家简介
          tel: '', //商家服务电话
          address: '', //商家地址
          longitude: '', //经度
          latitude: '', //纬度
          customer_service_type: '0', //客服类型 0 客服链接 1 小程序客服 2 微信客服
          customer_service_url: '', //客服系统链接
          wechat_service_url: '', //微信客服url
          wechat_service_corpid: '', //微信客服企业id
          // main_color: '#FD4A46', //主色调
          // assist_color: '#7E71F6', //辅色调
          screen_notice_state: null, //是否开启截图提醒 1开启 2关闭
          screen_notice_content: null, //截图提醒文本
        },
        rules: {
          look_stock: [
            {
              required: true,
              message: '请选择是否开启库存查询',
              trigger: 'blur',
            },
          ],
          forced_login: [
            {
              required: true,
              message: '请选择是否强制登录',
              trigger: 'blur',
            },
          ],
          avatar_name: [
            {
              required: true,
              message: '请选择是否强制设置头像昵称',
              trigger: 'blur',
            },
          ],
          name: [
            { required: true, message: '请输入商家名称', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          shopid: [
            { required: true, message: '请输入唯一标识', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          domain: [
            { required: true, message: '请输入api域名', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          logo: [
            { required: true, message: '请上传商家logo', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '请输入商家简介', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          address: [
            { required: true, message: '请输入商家地址', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          longitude: [
            { required: true, message: '请输入经度', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          latitude: [
            { required: true, message: '请输入纬度', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          customer_service_type: [
            { required: true, message: '请选择客服类型', trigger: 'blur' },
          ],
          customer_service_url: [
            { required: true, message: '请输入客服系统链接', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          wechat_service_url: [
            { required: true, message: '请输入微信客服url', trigger: 'blur' },
          ],
          wechat_service_corpid: [
            {
              required: true,
              message: '请输入微信客服企业id',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          screen_notice_state: [
            {
              required: true,
              message: '请选择是否开启截图提醒',
              trigger: 'blur',
            },
          ],
          screen_notice_content: [
            { required: true, message: '请输入截图提醒文本', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          bottom_logo: [
            { required: true, message: '请上传商家底部图片', trigger: 'blur' },
          ],
        },
        form1: {
          register_status: '0', //0不开启 1开启
          register_name: '测试', //注册协议名称
          article_id: null, //注册协议内容
        },
        rules1: {
          register_status: [
            {
              required: true,
              message: '请选择是否开启注册协议',
              trigger: 'blur',
            },
          ],
          register_name: [
            { required: true, message: '请输入注册协议名称', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          article_id: [
            { required: true, message: '请输入文章id', trigger: 'blur' },
          ],
        },
      }
    },
    watch: {
      activeName: {
        handler: function (val) {
          if (val == '基础配置') {
            this.fetchData()
          } else {
            this.fetchData1()
          }
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      getSon(data) {
        if (this.uploadType == 1) {
          this.form.logo = data[0]
        } else if (this.uploadType == 2) {
          if (data.length > 0) {
            data.forEach((item) => {
              if (this.form1.register_content.indexOf(item) == -1) {
                this.form1.register_content += `<img src="${item}" />`
              }
            })
          }
        } else if (this.uploadType == 3) {
          this.form.bottom_logo = data[0]
        }
        this.$forceUpdate()
      },
      handleShow(type) {
        this.uploadType = type
        this.$refs['vabUpload'].handleShow()
      },
      async fetchData() {
        const { data } = await this.api.getBaseConfigDetail()
        this.form = JSON.parse(data)
        this.form.customer_service_type = Number(
          this.form.customer_service_type
        )
      },
      async fetchData1() {
        const { data } = await this.api.getRegisterDealDetail()
        this.form1 = JSON.parse(data)
        this.form1.register_status = Number(this.form1.register_status)
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.editBaseConfigSave(this.form)
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          } else {
            console.log('error submit!!')
          }
        })
      },
      submitForm1(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.editRegisterDealSave(this.form1)
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          } else {
            console.log('error submit!!')
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .textCss {
    padding: 8px 16px 8px 16px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 22px;
    color: #666;
    background-color: #e8f4ff;
    border-radius: 6px;
  }
  .vab-quill-content {
    ::v-deep {
      .el-form-item__content {
        line-height: normal;
      }
    }
  }
</style>
