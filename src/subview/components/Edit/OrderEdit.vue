<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="选择类型：">
        <el-radio-group v-model="form.state">
          <el-radio :label="0">发货</el-radio>
          <el-radio :label="1">送货</el-radio>
          <el-radio :label="2">无需配送</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.state == 0">
        <el-form-item label="发货类型：">
          <el-radio-group v-model="form.state7">
            <el-radio :label="0">手动填写</el-radio>
            <el-radio :label="1">电子面单打印</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快递公司：">
          <el-select
            v-model="form.state2"
            placeholder="请选择快递公司"
            style="width: 415px"
          >
            <el-option label="圆通" value="1" />
            <el-option label="韵达" value="2" />
            <el-option label="邮政" value="3" />
            <el-option label="顺丰" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.state7 == 0" label="快递单号：" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请选择快递单号"
            style="width: 415px"
          />
        </el-form-item>
        <div v-if="form.state7 == 1">
          <el-form-item label="电子面单：">
            <el-select
              v-model="form.state2"
              placeholder="请选择电子面单"
              style="width: 415px"
            >
              <el-option label="面单1" value="1" />
              <el-option label="面单2" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="寄件人姓名：" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入寄件人姓名"
              style="width: 415px"
            />
          </el-form-item>
          <el-form-item label="寄件人电话：" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入寄件人电话"
              style="width: 415px"
            />
          </el-form-item>
          <el-form-item label="寄件人地址：" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入寄件人地址"
              style="width: 415px"
            />
          </el-form-item>
        </div>
      </div>
      <div v-if="form.state == 1">
        <el-form-item label="配送类型：">
          <el-radio-group v-model="form.state1">
            <el-radio :label="0">商家配送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="送货人：" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请选择送货人"
            style="width: 415px"
          />
        </el-form-item>
      </div>
      <div v-if="form.state == 2">
        <el-form-item label="备注：" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请选择送货人"
            :rows="3"
            style="width: 415px"
            type="textarea"
          />
        </el-form-item>
      </div>
      <div v-if="form.state != 2">
        <el-form-item label="分单发货：" prop="name">
          <el-switch
            v-model="form.isdefault"
            active-color="#41B584"
            active-text="开启"
            :active-value="1"
            class="switch"
            inactive-color="#D2D2D2"
            inactive-text="关闭"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item>
          可选择表格中的商品单独发货，发货后会形成新的订单且不能撤回，请谨慎操作！
        </el-form-item>
        <el-form-item>
          <QYList
            v-if="form.isdefault == 1"
            :list="orderList"
            :list-type="listType"
            :state="listLoading"
          >
            <template #List>
              <el-table-column type="selection" width="50" />
              <el-table-column label="商品信息" prop="name">
                <template #default="{ row }">
                  <img :src="row.img" style="width: 50px; height: 50px" />
                  <span style="margin-left: 10px">{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格" prop="name" />
              <el-table-column label="商品售价" prop="name" />
              <el-table-column label="商品优惠价" prop="zhekou" />
              <el-table-column label="总数" prop="tiem" />
              <el-table-column label="待发数量" prop="tiem">
                <template #default="{ row }">
                  <el-input-number
                    v-model="row.num"
                    controls-position="right"
                    :max="10"
                    :min="1"
                    @change="handleChange"
                  />
                </template>
              </el-table-column>
            </template>
          </QYList>
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
        listType: 2,
        listLoading: false,
        orderList: [
          {
            id: 4525,
            log: '用户付款成功',
            time: '2022-10-10 16:33:41',
          },
          {
            id: 4525,
            log: '用户付款成功',
            time: '2022-10-10 16:33:41',
          },
        ],
        form: {
          name: '',
          id: '',
          state: 0,
          state1: 0,
          state2: 0,
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
        title: '订单发送货',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (row) {
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      handleChange() {},
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加') {
              // const { code } = await this.api.addWave(this.form)
              // if (code != 200) {
              //   return
              // }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              // const { code } = await this.api.updateWave(this.form)
              // if (code != 200) {
              //   return
              // }
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
