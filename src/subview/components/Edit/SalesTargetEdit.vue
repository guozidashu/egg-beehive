<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="55%"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="模式" prop="status">
        <el-radio-group v-model="form.status" @change="changeHandler">
          <el-radio :label="1">分配模式</el-radio>
          <el-radio :label="2">输入模式</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.status == 1" style="display: flex; flex-wrap: wrap">
        <el-form-item label="年度总金额" style="width: 100%">
          <el-input
            v-model="form.money"
            class="input-with-select"
            placeholder="请输入金额"
            style="width: 215px"
            @input="form.money = $moneyFormatInput(form.money)"
          >
            <el-button slot="append" @click="Allocation">分配</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="一月" prop="one" style="width: 50%">
          <el-input v-model="form.one" :disabled="true" style="width: 215px" />
        </el-form-item>
        <el-form-item label="二月" prop="two" style="width: 50%">
          <el-input v-model="form.one" :disabled="true" style="width: 215px" />
        </el-form-item>
        <el-form-item label="三月" prop="three" style="width: 50%">
          <el-input
            v-model="form.three"
            :disabled="true"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="四月" prop="four" style="width: 50%">
          <el-input v-model="form.four" :disabled="true" style="width: 215px" />
        </el-form-item>
        <el-form-item label="五月" prop="five" style="width: 50%">
          <el-input v-model="form.five" :disabled="true" style="width: 215px" />
        </el-form-item>
        <el-form-item label="六月" prop="six" style="width: 50%">
          <el-input v-model="form.six" :disabled="true" style="width: 215px" />
        </el-form-item>
        <el-form-item label="七月" prop="seven" style="width: 50%">
          <el-input
            v-model="form.seven"
            :disabled="true"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="八月" prop="eight" style="width: 50%">
          <el-input
            v-model="form.eight"
            :disabled="true"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="九月" prop="nine" style="width: 50%">
          <el-input v-model="form.nine" :disabled="true" style="width: 215px" />
        </el-form-item>
        <el-form-item label="十月" prop="ten" style="width: 50%">
          <el-input v-model="form.ten" :disabled="true" style="width: 215px" />
        </el-form-item>
        <el-form-item label="十一月" prop="eleven" style="width: 50%">
          <el-input
            v-model="form.eleven"
            :disabled="true"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="十二月" prop="twelve" style="width: 50%">
          <el-input
            v-model="form.twelve"
            :disabled="true"
            style="width: 215px"
          />
        </el-form-item>
      </div>
      <div v-if="form.status == 2" style="display: flex; flex-wrap: wrap">
        <el-form-item label="年度总金额" prop="money" style="width: 100%">
          <el-input
            v-model="form.money"
            :disabled="true"
            placeholder="请输入金额"
            style="width: 215px"
            @input="form.money = $moneyFormatInput(form.money)"
          />
        </el-form-item>
        <el-form-item label="一月" prop="one" style="width: 50%">
          <el-input
            v-model="form.one"
            style="width: 215px"
            @input="form.one = $moneyFormatInput(form.one)"
          />
        </el-form-item>
        <el-form-item label="二月" prop="two" style="width: 50%">
          <el-input
            v-model="form.two"
            style="width: 215px"
            @input="form.two = $moneyFormatInput(form.two)"
          />
        </el-form-item>
        <el-form-item label="三月" prop="three" style="width: 50%">
          <el-input
            v-model="form.three"
            style="width: 215px"
            @input="form.three = $moneyFormatInput(form.three)"
          />
        </el-form-item>
        <el-form-item label="四月" prop="four" style="width: 50%">
          <el-input
            v-model="form.four"
            style="width: 215px"
            @input="form.four = $moneyFormatInput(form.four)"
          />
        </el-form-item>
        <el-form-item label="五月" prop="five" style="width: 50%">
          <el-input
            v-model="form.five"
            style="width: 215px"
            @input="form.five = $moneyFormatInput(form.five)"
          />
        </el-form-item>
        <el-form-item label="六月" prop="six" style="width: 50%">
          <el-input
            v-model="form.six"
            style="width: 215px"
            @input="form.six = $moneyFormatInput(form.six)"
          />
        </el-form-item>
        <el-form-item label="七月" prop="seven" style="width: 50%">
          <el-input
            v-model="form.seven"
            style="width: 215px"
            @input="form.seven = $moneyFormatInput(form.seven)"
          />
        </el-form-item>
        <el-form-item label="八月" prop="eight" style="width: 50%">
          <el-input
            v-model="form.eight"
            style="width: 215px"
            @input="form.eight = $moneyFormatInput(form.eight)"
          />
        </el-form-item>
        <el-form-item label="九月" prop="nine" style="width: 50%">
          <el-input
            v-model="form.nine"
            style="width: 215px"
            @input="form.nine = $moneyFormatInput(form.nine)"
          />
        </el-form-item>
        <el-form-item label="十月" prop="ten" style="width: 50%">
          <el-input
            v-model="form.ten"
            style="width: 215px"
            @input="form.ten = $moneyFormatInput(form.ten)"
          />
        </el-form-item>
        <el-form-item label="十一月" prop="eleven" style="width: 50%">
          <el-input
            v-model="form.eleven"
            style="width: 215px"
            @input="form.eleven = $moneyFormatInput(form.eleven)"
          />
        </el-form-item>
        <el-form-item label="十二月" prop="twelve" style="width: 50%">
          <el-input
            v-model="form.twelve"
            style="width: 215px"
            @input="form.twelve = $moneyFormatInput(form.twelve)"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: 'BandEdit',
    data() {
      return {
        year: '',
        form: {
          money: 0,
          status: 1,
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          six: 0,
          seven: 0,
          eight: 0,
          nine: 0,
          ten: 0,
          eleven: 0,
          twelve: 0,
        },
        rules: {},
        title: '',
        dialogFormVisible: false,
      }
    },
    watch: {
      form: {
        handler: function (newValue) {
          if (newValue.status == 2) {
            this.form.money =
              Number(this.form.one) +
              Number(this.form.two) +
              Number(this.form.three) +
              Number(this.form.four) +
              Number(this.form.five) +
              Number(this.form.six) +
              Number(this.form.seven) +
              Number(this.form.eight) +
              Number(this.form.nine) +
              Number(this.form.ten) +
              Number(this.form.eleven) +
              Number(this.form.twelve)
          }
        },
        deep: true,
      },
      year: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      async fetchData() {
        const { data } = await this.api.editDetailsSaleTarget({
          year: this.year,
        })
        if (data.length != 0) {
          this.form.money = Number(data.total)
          this.form.one = data.content[0].target
          this.form.two = data.content[1].target
          this.form.three = data.content[2].target
          this.form.four = data.content[3].target
          this.form.five = data.content[4].target
          this.form.six = data.content[5].target
          this.form.seven = data.content[6].target
          this.form.eight = data.content[7].target
          this.form.nine = data.content[8].target
          this.form.ten = data.content[9].target
          this.form.eleven = data.content[10].target
          this.form.twelve = data.content[11].target
        }
      },
      Allocation() {
        this.form.one = (this.form.money / 12).toFixed(2)
        this.form.two = (this.form.money / 12).toFixed(2)
        this.form.three = (this.form.money / 12).toFixed(2)
        this.form.four = (this.form.money / 12).toFixed(2)
        this.form.five = (this.form.money / 12).toFixed(2)
        this.form.six = (this.form.money / 12).toFixed(2)
        this.form.seven = (this.form.money / 12).toFixed(2)
        this.form.eight = (this.form.money / 12).toFixed(2)
        this.form.nine = (this.form.money / 12).toFixed(2)
        this.form.ten = (this.form.money / 12).toFixed(2)
        this.form.eleven = (this.form.money / 12).toFixed(2)
        this.form.twelve = (this.form.money / 12).toFixed(2)
        this.$baseMessage('分配成功', 'success', 'vab-hey-message-success')
      },
      changeHandler(value) {
        this.form = {
          money: 0,
          status: value,
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          six: 0,
          seven: 0,
          eight: 0,
          nine: 0,
          ten: 0,
          eleven: 0,
          twelve: 0,
        }
      },

      showEdit(row) {
        this.year = row
        this.title = row + '年销售目标设置'
        this.dialogFormVisible = true
        this.fetchData()
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      async save() {
        if (!/^[1-9]\d*(\.\d{1,2})?$/.test(this.form.money)) {
          this.$baseMessage(
            '金额必须是数字且大于0',
            'error',
            'vab-hey-message-error'
          )
          return
        }
        let temp = {
          year: this.year,
          content: [
            {
              month: '01',
              target: this.form.one,
            },
            {
              month: '02',
              target: this.form.two,
            },
            {
              month: '03',
              target: this.form.three,
            },
            {
              month: '04',
              target: this.form.four,
            },
            {
              month: '05',
              target: this.form.five,
            },
            {
              month: '06',
              target: this.form.six,
            },
            {
              month: '07',
              target: this.form.seven,
            },
            {
              month: '08',
              target: this.form.eight,
            },
            {
              month: '09',
              target: this.form.nine,
            },
            {
              month: '10',
              target: this.form.ten,
            },
            {
              month: '11',
              target: this.form.eleven,
            },
            {
              month: '12',
              target: this.form.twelve,
            },
          ],
          total: this.form.money,
        }
        const { code } = await this.api.editSaveSaleTarget(temp)
        if (code != 200) {
          return
        }
        this.$baseMessage('新增成功', 'success', 'vab-hey-message-success')
        this.$emit('fetch-data')
        this.close()
      },
    },
  }
</script>
