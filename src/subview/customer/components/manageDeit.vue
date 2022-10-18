<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form
      ref="form"
      label-width="80px"
      :model="form"
      :rules="rules"
      style="width: 100%"
    >
      <el-form-item label="客户姓名:">
        <el-input
          v-model="form.name"
          placeholder="请输入姓名"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item label="客户等级:">
        <el-select v-model="form.level">
          <el-option label="普通会员" :value="1" />
          <el-option label="白银" value="shanghai" />
          <el-option label="钻石" value="shanghai" />
          <el-option label="青铜" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户分类:">
        <el-select v-model="form.type">
          <el-option label="分类一" :value="1" />
          <el-option label="分类二" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item label="地区:">
        <el-select v-model="form.district">
          <el-option label="地区1" :value="1" />
          <el-option label="地区2" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地:">
        <el-input
          v-model="form.area"
          placeholder="请输入详细地"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          v-model="form.addr"
          placeholder="请输入备注"
          style="width: 215px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { addManagementList } from '@/api/basic'
  export default {
    name: 'LevelDeit',
    data() {
      return {
        form: {
          id: '',
          name: '刘自然',
          type: 1,
          level: 1,
          mobile: '13676668464',
          addr: '备注',
          zzqx: '1',
          province: '浙江省',
          city: '湖州市',
          district: '吴兴区',
          area: '浙江省,湖州市,吴兴区1',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
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
              const { code } = await addManagementList(this.form)
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
              const { code } = await addManagementList(this.form)
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
