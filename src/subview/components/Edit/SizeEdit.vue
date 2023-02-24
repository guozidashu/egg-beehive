<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item
        v-if="type === 1 && title == '添加尺码'"
        label="组别分类"
        prop="pid"
      >
        <el-select v-model="form.pid" placeholder="请选择分类">
          <el-option
            v-for="item in selectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1 && title == '添加尺码'"
        label="尺码组名"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item
        v-if="type === 1 && title == '添加尺码'"
        label="尺码"
        prop="sn"
      >
        <el-input v-model="form.sn" style="width: 215px" />
      </el-form-item>
      <el-form-item v-if="type === 1" label="状态" prop="status">
        <el-switch
          v-model="form.status"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="0"
          style="margin: 0 10px"
        />
      </el-form-item>
      <el-form-item v-if="type === 1" label="排序" prop="sort">
        <el-input v-model="form.sort" style="width: 215px" />
      </el-form-item>
      <el-form-item v-if="type === 1" label="尺码编码" prop="sn">
        <el-input v-model="form.sn" style="width: 215px" />
        <div style="font-size: 12px; color: #c0c4cc">
          尺码编码为3位数字，例如：080、090、110
        </div>
      </el-form-item>
      <el-form-item
        v-if="type === 1 && title == '添加尺码'"
        label="尺码类型"
        prop="type"
      >
        <el-radio-group v-model="form.type">
          <el-radio :label="1">整手</el-radio>
          <el-radio :label="0">散码</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="type === 1 && form.type == 1 && title == '添加尺码'"
        label="整手尺码"
        prop="size"
      >
        <el-input
          v-model="form.size"
          placeholder="例子：80/90/100/110/120"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item v-if="type === 2" label="分类名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
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
  import { addSizeSave, addSizeGroupSave } from '@/api/basic'
  export default {
    name: 'TagsEdit',
    data() {
      return {
        form: {
          status: 0,
          type: 0,
          size: '',
          sn: '',
        },
        selectList: [],
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
          sn: [
            { required: true, trigger: 'blur', message: '请输入编号' },
            {
              pattern: /^[0-9]{3}$/,
              trigger: 'blur',
              message: '长度为3，只能输入数字',
            },
          ],
          pid: [{ required: true, trigger: 'blur', message: '请选择分类' }],
          status: [{ required: true, trigger: 'blur', message: '请选择状态' }],
          type: [{ required: true, trigger: 'blur', message: '请选择类型' }],
          size: [{ required: true, trigger: 'blur', message: '请输入尺码' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row, type, list) {
        this.type = type
        let temp = JSON.parse(JSON.stringify(list))
        this.selectList = temp.splice(1)
        if (row === 'add') {
          if (type === 1) {
            this.title = '添加尺码'
          } else {
            this.title = '添加尺码组'
          }
        } else {
          if (type === 1) {
            this.title = '编辑尺码'
          } else {
            this.title = '编辑尺码组'
          }
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
              if (this.type === 1) {
                const { code } = await addSizeSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await addSizeGroupSave(this.form)
                if (code != 200) {
                  return
                }
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              if (this.type === 1) {
                const { code } = await addSizeSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await addSizeGroupSave(this.form)
                if (code != 200) {
                  return
                }
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
