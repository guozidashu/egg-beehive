<template>
  <div style="padding: 20px; background-color: white">
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-tabs v-model="activeName">
        <el-tab-pane label="商品编码" name="商品编码">
          <div class="textCss">
            <h2>商品内部编码规则设置</h2>
            <p style="font-weight: 600">
              内部商品编码的组成规则规则：商品编码（款号）+ 颜色编码 + 尺码编码
            </p>
            <p style="font-weight: 400">
              前缀（默认没有）长度两位，只能输入数字和字母
            </p>
            <p style="font-weight: 400">
              间隔符（默认没有）长度一位，只能输入- 或者 _
            </p>
            <p>
              <span style="color: red">*举例*</span>
              ：如果前缀设置为QY，一个款号为WZ32888、颜色编码为HUA、尺码编码为80-120的款
            </p>
            <p>整手生成的商品编码就为：QYWZ32888HUA000</p>
            <p>
              散码生成的商品编码就为：QYWZ32888HUA080、QYWZ32888HUA090、QYWZ32888HUA100、QYWZ32888HUA110、QYWZ32888HUA120
            </p>
            <p>启用间隔符-的整手商品编码就为：QY-WZ32888-HUA-000</p>
            <p>
              启用间隔符-的散码商品编码就为：QY-WZ32888-HUA-080、QY-WZ32888-HUA-090、QY-WZ32888-HUA-100、QY-WZ32888-HUA-110、QY-WZ32888-HUA-120
            </p>
          </div>
          <el-form-item label="编码名称:" prop="fakeName">
            <el-input v-model="form.fakeName" disabled style="width: 300px" />
          </el-form-item>
          <el-form-item label="前缀:">
            <el-switch
              v-model="form.prefix"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <el-form-item v-if="form.prefix" label="前缀文本:" prop="prefixValue">
            <el-input v-model="form.prefixValue" style="width: 300px" />
          </el-form-item>
          <el-form-item label="间隔符:">
            <el-switch
              v-model="form.spacer"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <el-form-item
            v-if="form.spacer"
            label="间隔符文本:"
            prop="spacerValue"
          >
            <el-input v-model="form.spacerValue" style="width: 300px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="防伪编码" name="防伪编码">
          <div class="textCss">
            <h2>防伪编码规则设置</h2>
            <p style="font-weight: 600">
              前5位由系统定义随机值以@@@@@占位， 编码不能连续两个 -，不能以 -
              结尾，可自定义长度最长10位，最少7位
            </p>
            <p style="font-weight: 400">1、@是随机字符串包括数字和字母大写</p>
            <p style="font-weight: 400">2、#是随机数字</p>
            <p style="font-weight: 400">3、A是随机字母大写</p>
            <p style="font-weight: 400">4、-既是-（分隔符）</p>
          </div>
          <el-form-item label="编码名称:" prop="name">
            <el-input v-model="form.name" disabled style="width: 300px" />
          </el-form-item>
          <el-form-item
            v-if="activeName == '防伪编码'"
            label="编码字符:"
            prop="code"
          >
            <el-input
              v-model="form.code"
              maxlength="10"
              placeholder="请输入编码"
              style="width: 300px"
            >
              <template slot="prepend">@@@@@</template>
            </el-input>
          </el-form-item>
          <el-form-item label="预览">
            <div>{{ preview }}</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // tabs 选中的标签
        activeName: '商品编码',
        // 预览值
        preview: this.code('@@@@@'),
        // 表单
        form: {
          name: '商品条码',
          fakeName: '商品条码',
          code: '',
          prefix: false,
          spacer: false,
          prefixValue: 'A0',
          spacerValue: '-',
        },
        // 表单验证规则
        rules: {
          fakeName: [
            { required: true, trigger: 'blur', message: '请输入防伪编码名称' },
          ],
          name: [
            { required: true, trigger: 'blur', message: '请输入商品编码名称' },
          ],
          spacerValue: [
            { required: true, trigger: 'blur', message: '请输入间隔符文本' },
            {
              validator: (rule, value, callback) => {
                if (value.length > 1) {
                  callback(new Error('长度只能为1个字符'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                const reg = /^[-_]+$/
                if (!reg.test(value)) {
                  callback(new Error('只能是-或者_'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
          prefixValue: [
            { required: true, trigger: 'blur', message: '请输入前缀文本' },
            {
              validator: (rule, value, callback) => {
                if (value.length > 2) {
                  callback(new Error('长度只能为2个字符'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                const reg = /^[A-Za-z0-9]+$/
                if (!reg.test(value)) {
                  callback(new Error('只能是数字和字母'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
          code: [
            { required: true, trigger: 'blur', message: '请输入编码字符' },
            {
              validator: (rule, value, callback) => {
                if (value.length < 7 || value.length > 10) {
                  callback(new Error('长度在 7 到 10 个字符'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                const reg = /^[@#A-]+$/
                if (!reg.test(value)) {
                  callback(new Error('字符只能是 @ # A - 四种'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                const reg = /--/
                if (reg.test(value)) {
                  callback(new Error('不能连续出现 -'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                if (value.endsWith('-')) {
                  callback(new Error('不能以 - 结尾'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
        },
      }
    },
    watch: {
      form: {
        handler: function (newval) {
          this.preview = this.code('@@@@@' + newval.code)
        },
        deep: true,
      },
      activeName: {
        handler: function (newval) {
          if (newval == '商品编码') this.getCode(2)
          else this.getCode(1)
        },
        deep: true,
      },
    },
    created() {
      this.getCode(2)
    },
    methods: {
      // 获取code 对数据处理
      async getCode(type) {
        const { code, data } = await this.api.getCodeRule({
          type: type,
        })
        if (code == 200) {
          if (data.type == 1) {
            this.form.name = data.name
            this.form.code = data.code.substring(5)
            this.preview = data.code
          } else {
            this.form.name = data.name
            this.form.code = data.code.substring(5)
            this.preview = data.code
            if (data.code == '') {
              this.form.prefix = false
              this.form.spacer = false
            } else if (data.code.startsWith('+')) {
              this.form.prefix = false
              this.form.spacer = true
              this.form.spacerValue = data.code.substring(1, 2)
            } else if (data.code.endsWith('+')) {
              this.form.prefix = true
              this.form.spacer = false
              this.form.prefixValue = data.code.substring(0, 2)
            } else {
              this.form.prefix = true
              this.form.spacer = true
              this.form.prefixValue = data.code.substring(0, 2)
              this.form.spacerValue = data.code.substring(3, 4)
            }
          }
        }
      },
      // 提交
      onSubmit() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            let temp = '@@@@@' + this.form.code
            let temp1 = null
            if (this.form.prefix && this.form.spacer) {
              temp1 = this.form.prefixValue + '+' + this.form.spacerValue
            } else if (!this.form.prefix && !this.form.spacer) {
              temp1 = ''
            } else if (this.form.prefix && !this.form.spacer) {
              temp1 = this.form.prefixValue + '+'
            } else if (!this.form.prefix && this.form.spacer) {
              temp1 = '+' + this.form.spacerValue
            }
            let ogj = {}
            if (this.activeName == '商品编码') {
              ogj.type = 2
              ogj.name = this.form.fakeName
              ogj.code = temp1
            } else if (this.activeName == '防伪编码') {
              ogj.type = 1
              ogj.name = this.form.name
              ogj.code = temp
            }
            const { code } = await this.api.setCodeRule(ogj)
            if (code == 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          } else {
            return false
          }
        })
      },
      // 一下均是编码生成 方法
      code(code) {
        // @是随机字符串包括数字和字母大写
        // #是随机数字
        // A是随机字母大写
        //-就是分隔符
        const arr = code.split('')
        let str = ''
        arr.forEach((item) => {
          if (item === '@') {
            str += this.randomString(1)
          } else if (item === '#') {
            str += this.randomNum(1)
          } else if (item === 'A') {
            str += this.randomString(1, true)
          } else {
            str += item
          }
        })
        return str
      },
      randomString(len, upper) {
        len = len || 32
        const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
        const maxPos = $chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        if (upper) {
          pwd = pwd.toUpperCase()
        }
        return pwd
      },
      randomNum(len) {
        len = len || 32
        const $chars = '0123456789'
        const maxPos = $chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
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
</style>
