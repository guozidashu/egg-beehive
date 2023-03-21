<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="close"
  >
    <el-form ref="form" label-width="140px" :model="form" :rules="rules">
      <el-form-item label="预售日期" prop="time">
        <el-date-picker
          v-model="form.time"
          end-placeholder="结束时间"
          :picker-options="DisableDatesOption"
          range-separator="至"
          start-placeholder="开始时间"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="预计发货日期" prop="estimated_delivery_date">
        <el-date-picker
          v-model="form.estimated_delivery_date"
          :disabled="Forbidden"
          :picker-options="DisableDatesOption1"
          placeholder="选择日期时间"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="客户等级:" prop="customer_grade">
        <el-select v-model="form.customer_grade" multiple style="width: 200px">
          <el-option
            v-for="(item, index) in selectDataList.customer_grade"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <div style="font-size: 12px; color: #c0c4cc">
          充许选择的客户等级，参与预售抢购
        </div>
      </el-form-item>
      <div v-for="(item, index) in form.customer_grade_price" :key="index">
        <el-form-item
          :label="item.level_name + '预售价格'"
          prop="customer_grade_price"
        >
          <el-input
            v-model="form.customer_grade_price[index].level_price"
            placeholder="请输入预售价格"
            style="width: 215px"
            @input="
              form.customer_grade_price[index].level_price = $moneyFormatInput(
                form.customer_grade_price[index].level_price
              )
            "
          />
        </el-form-item>
      </div>

      <el-form-item label="定金是否退还" prop="final_type">
        <el-radio-group v-model="form.final_type">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
        <div style="font-size: 12px; color: #c0c4cc">
          预售结束时未付尾款、付完尾款ERP作废取消会影响
        </div>
      </el-form-item>
      <el-form-item label="尾款支付天数" prop="final_payment_day">
        <el-input
          v-model="form.final_payment_day"
          placeholder="请输入尾款支付天数"
          style="width: 215px"
          @input="
            form.final_payment_day = $numFormatInput(form.final_payment_day)
          "
        />
        <div style="font-size: 12px; color: #c0c4cc">
          预售结束日期向后推迟多少天内
        </div>
      </el-form-item>
      <el-form-item label=" 定金支付比例" prop="payment_ratio">
        <el-input
          v-model="form.payment_ratio"
          style="width: 100px"
          @input="form.payment_ratio = $moneyFormatInput(form.payment_ratio)"
        />
        %
      </el-form-item>
      <el-form-item label="超期赔付比例" prop="penalty_ratio">
        <el-input
          v-model="form.penalty_ratio"
          style="width: 100px"
          @input="form.penalty_ratio = $moneyFormatInput(form.penalty_ratio)"
        />
        %
        <div style="font-size: 12px; color: #c0c4cc">
          每超过发货日期1天24小时，就算一次
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: 'BrandEdit',
    props: {
      drawerSta: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        disabledDateState: false,
        defaultTime: '00:00:00',
        defaultValue: new Date(),
        Forbidden: true,
        DisableDatesOption: {
          disabledDate(date) {
            return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
          },
        },
        DisableDatesOption1: {
          disabledDate: this.disabledDate,
        },
        selectDataList: {},
        form: {
          customer_grade_price: [],
          goods_id: null, //关联商品表id
          is_edit: null, //是否是修改预售 1 是 0或者不传 新增预售
          time: null,
          price: null, //预售价格
          start_date: null, //预售开始日期
          end_date: null, //预售结束日期
          estimated_delivery_date: null, //预计发货日期
          customer_grade: null, //参与预售的客户等级  英文逗号分割
          payment_ratio: null, //预售支付定金比例 0-100 百分比
          penalty_ratio: null, //超过发货日期未发货需要支付的违约金比例（订单金额比例1-100）
          final_type: null, //默认1超过尾款支付时间退预售定金 2 超过尾款支付时间不退预售定金
          final_payment_day: null, //尾款支付时间（预售结束后多少天，单位【天】）
        },
        rules: {
          time: [
            {
              required: true,
              message: '请选择预售日期',
              trigger: 'change',
            },
          ],
          estimated_delivery_date: [
            {
              required: true,
              message: '请选择预计发货日期',
              trigger: 'change',
            },
          ],
          customer_grade_price: [
            {
              required: true,
              message: '请填写预售价格',
              trigger: 'change',
            },
          ],
          customer_grade: [
            {
              required: true,
              message: '请选择客户等级',
              trigger: 'change',
            },
          ],
          final_type: [
            {
              required: true,
              message: '请选择定金是否退还',
              trigger: 'change',
            },
          ],
          final_payment_day: [
            {
              required: true,
              message: '请输入尾款支付天数',
              trigger: 'change',
            },
            {
              validator: (rule, value, callback) => {
                if (value < 0) {
                  callback(new Error('尾款支付天数不能为负数'))
                } else if (value.toString().indexOf('.') > -1) {
                  callback(new Error('尾款支付天数只能输入正整数'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
          payment_ratio: [
            {
              required: true,
              message: '请输入订金支付金',
              trigger: 'change',
            },
            {
              validator: (rule, value, callback) => {
                if (value < 0) {
                  callback(new Error('订金支付金不能为负数'))
                } else if (value > 100) {
                  callback(new Error('订金支付金不能大于100%'))
                } else if (value.toString().indexOf('.') > -1) {
                  callback(new Error('订金支付金只能输入正整数'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
          penalty_ratio: [
            {
              required: true,
              message: '请输入超期违约金',
              trigger: 'change',
            },
            {
              validator: (rule, value, callback) => {
                if (value < 0) {
                  callback(new Error('订金支付金不能为负数'))
                } else if (value > 100) {
                  callback(new Error('订金支付金不能大于100%'))
                } else if (value.toString().indexOf('.') > -1) {
                  callback(new Error('订金支付金只能输入正整数'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    watch: {
      'form.time'(val) {
        if (val) {
          if (!this.drawerSta) {
            this.form.estimated_delivery_date = val[1]
          }
          this.Forbidden = false
        } else {
          this.Forbidden = true
        }
      },
      'form.customer_grade'(val) {
        let arr = []
        if (val == null) {
          this.form.customer_grade_price = []
          return
        }
        this.selectDataList.customer_grade.forEach((item) => {
          val.forEach((item1) => {
            if (item1 == item.id) {
              let temp = {}
              temp.level_id = item.id
              temp.level_price = 0
              temp.level_name = item.name
              arr.push(temp)
            }
          })
        })
        arr.forEach((item) => {
          let flag = true
          this.form.customer_grade_price.forEach((item1) => {
            if (item.level_id == item1.level_id) {
              flag = false
            }
          })
          if (flag) {
            this.form.customer_grade_price.push(item)
          }
        })
      },
    },
    created() {
      this.selectData()
    },
    methods: {
      disabledDate(date) {
        if (!this.disabledDateState) {
          return date.getTime() < new Date(this.form.time[1]).getTime()
        }
      },
      async selectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade',
        })
        this.selectDataList = data
      },
      showEdit(row) {
        if (row.goods_persell.length == 0) {
          this.form.goods_id = row.id
          this.form.is_edit = 0
        } else {
          this.form.goods_id = row.id
          this.form.is_edit = 1
          this.form.time = [
            row.goods_persell.start_date,
            row.goods_persell.end_date,
          ]
          this.form.price = row.goods_persell.price
          this.form.estimated_delivery_date =
            row.goods_persell.estimated_delivery_date
          this.form.customer_grade = row.goods_persell.customer_grade
          this.form.customer_grade = this.form.customer_grade.map((item) => {
            return Number(item)
          })
          this.form.payment_ratio = row.goods_persell.payment_ratio
          this.form.penalty_ratio = row.goods_persell.penalty_ratio
          this.form.final_type = row.goods_persell.final_type
          this.form.final_payment_day = row.goods_persell.final_payment_day
          this.form.customer_grade_price =
            row.goods_persell.customer_grade_price
        }
        this.title = '预售编辑'
        this.dialogFormVisible = true
      },
      close() {
        this.disabledDateState = true
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.editPresellAdd({
              customer_grade_price: this.form.customer_grade_price, //客户等级价格
              goods_id: this.form.goods_id, //关联商品表id
              is_edit: this.form.is_edit, //是否是修改预售 1 是 0或者不传 新增预售
              start_date: this.form.time[0], //预售开始日期
              end_date: this.form.time[1], //预售结束日期
              estimated_delivery_date: this.form.estimated_delivery_date, //预计发货日期
              customer_grade: this.form.customer_grade, //参与预售的客户等级  英文逗号分割
              payment_ratio: this.form.payment_ratio, //预售支付定金比例 0-100 百分比
              penalty_ratio: this.form.penalty_ratio, //超过发货日期未发货需要支付的违约金比例（订单金额比例1-100）
              final_type: this.form.final_type, //默认1超过尾款支付时间退预售定金 2 超过尾款支付时间不退预售定金
              final_payment_day: this.form.final_payment_day, //尾款支付时间（预售结束后多少天，单位【天】）
            })
            if (code == 200) {
              this.$message.success('保存成功')
              this.dialogFormVisible = false
              this.$emit('fetch-data')
            } else {
              this.$message.error('保存失败')
            }
          }
        })
      },
    },
  }
</script>
