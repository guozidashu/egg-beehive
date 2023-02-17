<template>
  <div style="padding: 20px; background-color: white">
    <div class="textCss">
      <p style="font-weight: 600">
        前5位由系统定义随机值以@@@@@占位， 编码不能连续两个 -，不能以 -
        结尾，可自定义长度最长10位，最少7位
      </p>
      <p style="font-weight: 400">1、@是随机字符串包括数字和字母大写</p>
      <p style="font-weight: 400">2、#是随机数字</p>
      <p style="font-weight: 400">3、A是随机字母大写</p>
      <p style="font-weight: 400">4、-既是-（分隔符）</p>
    </div>
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="编码名称:" prop="name">
        <el-input v-model="form.name" disabled style="width: 300px" />
      </el-form-item>
      <el-form-item label="编码字符:" prop="code">
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
    </el-form>
  </div>
</template>
<script>
  import { getCodeRule, setCodeRule } from '@/api/basic'
  export default {
    data() {
      return {
        preview: this.code('@@@@@'),
        form: {
          name: '商品条码1',
          code: '',
        },
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请输入编码名称' },
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
    },
    created() {
      this.getCode()
    },
    methods: {
      async getCode() {
        const { code, data } = await getCodeRule({
          type: 1,
        })
        if (code == 200) {
          this.form.name = data.name
          this.form.code = data.code.substring(5)
          this.preview = data.code
        }
      },
      onSubmit() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            let temp = '@@@@@' + this.form.code
            const { code } = await setCodeRule({
              type: 1,
              name: this.form.name,
              code: temp,
            })
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
