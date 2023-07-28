<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="成本名称" prop="name">
        <el-input v-model="form.name" style="width: 300px" />
      </el-form-item>
      <div style="display: flex; flex-wrap: wrap">
        <el-form-item label="一月" style="width: 50%">
          <el-input
            v-model="form.month.January"
            style="width: 150px"
            @input="form.month.January = $moneyFormatInput(form.month.January)"
          />
        </el-form-item>
        <el-form-item label="二月" style="width: 50%">
          <el-input
            v-model="form.month.February"
            style="width: 150px"
            @input="
              form.month.February = $moneyFormatInput(form.month.February)
            "
          />
        </el-form-item>
        <el-form-item label="三月" style="width: 50%">
          <el-input
            v-model="form.month.March"
            style="width: 150px"
            @input="form.month.March = $moneyFormatInput(form.month.March)"
          />
        </el-form-item>
        <el-form-item label="四月" style="width: 50%">
          <el-input
            v-model="form.month.April"
            style="width: 150px"
            @input="form.month.April = $moneyFormatInput(form.month.April)"
          />
        </el-form-item>
        <el-form-item label="五月" style="width: 50%">
          <el-input
            v-model="form.month.May"
            style="width: 150px"
            @input="form.month.May = $moneyFormatInput(form.month.May)"
          />
        </el-form-item>
        <el-form-item label="六月" style="width: 50%">
          <el-input
            v-model="form.month.June"
            style="width: 150px"
            @input="form.month.June = $moneyFormatInput(form.month.June)"
          />
        </el-form-item>
        <el-form-item label="七月" style="width: 50%">
          <el-input
            v-model="form.month.July"
            style="width: 150px"
            @input="form.month.July = $moneyFormatInput(form.month.July)"
          />
        </el-form-item>
        <el-form-item label="八月" style="width: 50%">
          <el-input
            v-model="form.month.August"
            style="width: 150px"
            @input="form.month.August = $moneyFormatInput(form.month.August)"
          />
        </el-form-item>
        <el-form-item label="九月" style="width: 50%">
          <el-input
            v-model="form.month.September"
            style="width: 150px"
            @input="
              form.month.September = $moneyFormatInput(form.month.September)
            "
          />
        </el-form-item>
        <el-form-item label="十月" style="width: 50%">
          <el-input
            v-model="form.month.October"
            style="width: 150px"
            @input="form.month.October = $moneyFormatInput(form.month.October)"
          />
        </el-form-item>
        <el-form-item label="十一月" style="width: 50%">
          <el-input
            v-model="form.month.November"
            style="width: 150px"
            @input="
              form.month.November = $moneyFormatInput(form.month.November)
            "
          />
        </el-form-item>
        <el-form-item label="十二月" style="width: 50%">
          <el-input
            v-model="form.month.December"
            style="width: 150px"
            @input="
              form.month.December = $moneyFormatInput(form.month.December)
            "
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
    data() {
      return {
        form: {
          name: '', //名称
          month: {
            January: '',
            February: '',
            March: '',
            April: '',
            May: '',
            June: '',
            July: '',
            August: '',
            September: '',
            October: '',
            November: '',
            December: '',
          },
        },
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请输入成本名称' },
          ],
        },
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit() {
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
            const { code } = await this.api.addOperatingCostsAdd(this.form)
            if (code != 200) {
              return
            }
            this.$baseMessage('新增成功', 'success', 'vab-hey-message-success')
            this.$emit('fetch-data')
            this.close()
          }
        })
      },
    },
  }
</script>
