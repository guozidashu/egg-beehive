<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item v-if="type === 1" label="收支分类" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择分类">
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="会计科目" prop="account_id">
        <el-cascader
          v-model="form.account_id"
          :options="options"
          placeholder="请选择会计科目"
          :props="{ expandTrigger: 'hover' }"
        />
        <!-- <el-select v-model="form.account_id" placeholder="请选择会计科目">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model="form.sort"
          placeholder="请输入排序："
          style="width: 215px"
          @input="form.sort = $numFormatInput(form.sort)"
        />
      </el-form-item>
      <el-form-item label="收支名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入收支名称"
          style="width: 215px"
          @input="form.name = $WhitespaceRemoval(form.name)"
        />
      </el-form-item>
      <el-form-item label="类别：" prop="type">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="收" :value="1" />
          <el-option label="支" :value="2" />
        </el-select>
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
    data() {
      return {
        options: [],
        // typeList: [],
        form: {
          id: 0, // 主键id (新增时传0),
          pid: null, // 父级id (添加主分类传0)
          name: '', // 名称
          account_id: null, // 归属会计科目id
          sort: null, // 排序
          type: null, // 类别 1收 2支
        },
        selectList: [],
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
          type: [{ required: true, trigger: 'blur', message: '请选择类别' }],
          pid: [{ required: true, trigger: 'blur', message: '请选择收支分类' }],
          account_id: [
            { required: true, trigger: 'blur', message: '请选择会计科目' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row, type) {
        this.type = type
        if (row === 'add') {
          if (type === 1) {
            this.title = '添加收支'
          } else {
            this.title = '添加分类'
          }
        } else {
          if (type === 1) {
            this.title = '编辑收支'
          } else {
            this.title = '编辑分类'
          }
          this.form = Object.assign({}, row)
          this.form.account_id = [row.type, row.account_id]
        }

        this.dialogFormVisible = true
        this.getSelectList()
        this.getTypeList()
      },
      async getSelectList() {
        const { data } = await this.api.getCategoryList({
          page: 1,
          pageSize: 10,
          id: 0, // 父级id （取父级时传0）-1 = 所有子分类
          name: '', // 分类名称
        })
        this.selectList = data.data
      },
      async getTypeList() {
        const { data } = await this.api.getFinanceAccountList()
        data.forEach((item) => {
          item.value = item.type
          item.label = item.type_text
          if (item.children) {
            item.children.forEach((child) => {
              child.value = child.id
              child.label = child.name
            })
          }
        })
        this.options = data
        // this.typeList = data.data
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            this.form.account_id = this.form.account_id[1]
            if (this.title == '添加标签' || this.title == '添加分类') {
              if (this.type == 2) {
                this.form.pid = 0
              }
              const { code } = await this.api.editCategorySave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data', 1)
              this.close()
            } else {
              const { code } = await this.api.editCategorySave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data', 1)
              this.close()
            }
          }
        })
      },
    },
  }
</script>
