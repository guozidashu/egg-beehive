<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item
        v-if="type === 1 && title == '添加颜色'"
        label="颜色组分类"
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
        v-if="type === 1 && title == '添加颜色'"
        label="颜色名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 215px"
          @input="form.name = $WhitespaceRemoval(form.name)"
        />
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
        <el-input
          v-model="form.sort"
          style="width: 215px"
          @input="form.sort = $numFormatInput(form.sort)"
        />
      </el-form-item>
      <el-form-item v-if="type === 1" label="颜色编码" prop="sn">
        <el-input v-model="form.sn" style="width: 215px" />
        <div style="font-size: 12px; color: #c0c4cc">
          颜色编码为3个大写字母拼音首字母，例如：HUA,HUB,HUC
        </div>
      </el-form-item>
      <el-form-item
        v-if="type === 2 && title == '添加颜色组'"
        label="颜色组名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 215px"
          @input="form.name = $WhitespaceRemoval(form.name)"
        />
      </el-form-item>
      <el-form-item v-if="type === 2" label="排序" prop="sort">
        <el-input
          v-model="form.sort"
          style="width: 215px"
          @input="form.sort = $numFormatInput(form.sort)"
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
  export default {
    name: 'TagsEdit',
    data() {
      return {
        form: {
          status: 0,
          sn: '',
        },
        selectList: [],
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
          pid: [{ required: true, trigger: 'blur', message: '请选择分类' }],
          sn: [
            { required: true, trigger: 'blur', message: '请输入颜色编码' },
            {
              pattern: /^[A-Z]{3}$/,
              trigger: 'blur',
              message: '请输入3个大写字母',
            },
          ],
          status: [{ required: true, trigger: 'blur', message: '请选择状态' }],
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
            this.title = '添加颜色'
          } else {
            this.title = '添加颜色组'
          }
        } else {
          if (type === 1) {
            this.title = '编辑颜色'
          } else {
            this.title = '编辑颜色组'
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
            if (this.title === '添加颜色' || this.title === '添加颜色组') {
              if (this.type === 1) {
                const { code } = await this.api.addColorSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await this.api.addColorGroupSave(this.form)
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
                const { code } = await this.api.addColorSave(this.form)
                if (code != 200) {
                  return
                }
              } else {
                const { code } = await this.api.addColorGroupSave(this.form)
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
