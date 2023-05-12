<template>
  <el-dialog
    :append-to-body="true"
    title="导出对账单"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <div style="padding: 20px; border: 1px solid #f0f0f0">
      <el-form label-width="0" :model="formBill">
        <div style="margin-bottom: 20px; font-size: 40px">
          {{ form.name }}
        </div>
        <div style="margin-bottom: 20px; font-size: 16px">账单周期：</div>
        <el-form-item>
          <el-date-picker
            v-model="formBill.time"
            align="left"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <div style="margin-bottom: 20px; font-size: 16px">账单类型：</div>
        <el-form-item>
          <el-radio-group v-model="formBill.state">
            <el-radio :label="1">销售开单欠款</el-radio>
            <el-radio :label="2">发货欠款</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="margin-bottom: 20px; font-size: 16px">当前欠款/余额：</div>
        <div
          v-if="formBill.state == 1"
          style="margin-bottom: 20px; font-size: 26px"
        >
          ￥{{ form.sale_arrears | moneyFormat }}
        </div>
        <div
          v-if="formBill.state == 2"
          style="margin-bottom: 20px; font-size: 26px"
        >
          ￥{{ form.delivery_arrears | moneyFormat }}
        </div>
      </el-form>
    </div>
    <div
      style="
        display: flex;
        padding: 20px;
        color: #919191;
        background-color: #fafafa;
        border-right: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        border-left: 1px solid #f0f0f0;
      "
    >
      <div style="width: 100%; padding: 0 30%; text-align: center">
        <div @click="formBillSub()">
          <div>
            <vab-icon icon="file-copy-2-line" style="font-size: 30px" />
          </div>
          <div>快速导出</div>
        </div>
      </div>
      <!-- <div style="width: 1px; border: 1px solid #f0f0f0"></div>
      <div style="width: 50%; padding: 0 15%; text-align: center">
        <div @click="formBillSub1()">
          <div>
            <vab-icon icon="file-list-2-line" style="font-size: 30px" />
          </div>
          <div>打印账单</div>
        </div>
      </div> -->
    </div>
    <div style="margin-top: 20px; color: #3875ff; text-align: center">
      「&nbsp;先进品牌&nbsp;先用圈域&nbsp;」&nbsp;立即咨询
    </div>
  </el-dialog>
</template>

<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        form: {},
        dialogFormVisible: false,
        formBill: {
          time: null,
          state: 1,
        },
      }
    },
    created() {},
    mounted() {},
    methods: {
      btnClickPrint: function (type) {},
      showEdit(row) {
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.formBill = {
          time: null,
          state: 1,
        }
        this.dialogFormVisible = false
      },
      // 导出对账单
      async formBillSub() {
        const { code, data } = await this.api.getCustomerExportBill({
          customer_id: this.form.id, // 客户id
          start_date: this.formBill.time ? this.formBill.time[0] : '',
          end_date: this.formBill.time ? this.formBill.time[1] : '',
          type: this.formBill.state, // 1=拿货欠款 2=发货欠款
        })
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
        } else {
          this.$message.error('导出失败')
        }
        // this.btnClickPrint(1)
      },
      // 打印预览
      async formBillSub1() {
        const { code, data } = await this.api.getCustomerExportBill({
          customer_id: this.form.id, // 客户id
          start_date: this.formBill.time ? this.formBill.time[0] : '',
          end_date: this.formBill.time ? this.formBill.time[1] : '',
          type: this.formBill.state, // 1=拿货欠款 2=发货欠款
        })
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
        } else {
          this.$message.error('导出失败')
        }
        // this.btnClickPrint(2)
      },
    },
  }
</script>
