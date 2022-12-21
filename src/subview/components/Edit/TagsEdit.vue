<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <div v-if="title == '添加分类'">
        <el-form-item label="分类名称" prop="group_name">
          <el-input
            v-model="form.group_name"
            placeholder="请输入名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input v-model="form.order" style="width: 215px" />
        </el-form-item>
        <div v-for="(item, index) in form.tag" :key="index">
          <el-form-item label="标签名称">
            <el-input v-model="item.name" style="width: 215px" />
          </el-form-item>
          <el-form-item label="标签排序">
            <el-input v-model="item.order" style="width: 215px" />
            <i
              v-if="index == 0"
              class="el-icon-plus"
              style="margin: 10px 0 0 30px; color: #1890ff"
              @click="handleAdd()"
            ></i>
            <i
              v-else
              class="el-icon-minus"
              style="margin: 10px 0 0 30px; color: #1890ff"
              @click="handleDelete(index)"
            ></i>
          </el-form-item>
        </div>
      </div>
      <div v-if="title == '添加标签'">
        <el-form-item label="标签分类">
          <el-select
            v-model="form.group_id"
            placeholder="请选择分类"
            style="width: 215px"
          >
            <el-option
              v-for="(item, index) in selectList"
              :key="index"
              :label="item.group_name"
              :value="item.group_id"
            />
          </el-select>
        </el-form-item>
        <div v-for="(item, index) in form.tag" :key="index">
          <el-form-item label="标签名称">
            <el-input v-model="item.name" style="width: 215px" />
          </el-form-item>
          <el-form-item label="标签排序">
            <el-input v-model="item.order" style="width: 215px" />
          </el-form-item>
        </div>
      </div>
      <div v-if="title == '编辑标签' || title == '编辑分类'">
        <el-form-item label="名称">
          <el-input v-model="form.name" style="width: 215px" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.order" style="width: 215px" />
        </el-form-item>
      </div>
      <!-- <el-form-item v-if="type === 1" label="标签分类" prop="name">
        <el-select v-model="form.pid" placeholder="请选择分类">
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type === 1" label="标签名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
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
      <el-form-item v-if="type === 2" label="排序" prop="sort">
        <el-input v-model="form.sort" style="width: 215px" />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { addCorpTag, getTagGroupList, editCorpTag } from '@/api/basic'
  export default {
    name: 'TagsEdit',
    data() {
      return {
        form: {
          id: null, // 修改的标签id或者标签组id
          name: null, // 修改的标签名称或者标签组名称
          order: null, // 排序
          group_name: null,
          group_id: null,
          tag: [
            {
              name: '',
              order: '',
            },
          ],
        },
        selectList: [],
        type: 1,
        rules: {
          group_name: [
            { required: true, trigger: 'blur', message: '请输入名称' },
          ],
          order: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      handleAdd() {
        this.form.tag.push({
          name: '',
          order: '',
        })
      },
      handleDelete(index) {
        this.form.tag.splice(index, 1)
      },
      showEdit(row, type) {
        this.type = type
        if (row === 'add') {
          if (type === 1) {
            this.title = '添加标签'
          } else {
            this.title = '添加分类'
          }
        } else {
          if (type === 1) {
            this.title = '编辑标签'
            this.form.id = row.tag_id
            this.form.name = row.tag_name
          } else {
            this.title = '编辑分类'
            this.form.id = row.group_id
            this.form.name = row.group_name
          }
          console.log(6666, row)
          // this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
        this.getSelectList()
      },
      async getSelectList() {
        const { data } = await getTagGroupList()
        this.selectList = data
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加分类' || this.title === '添加标签') {
              const { code } = await addCorpTag(this.form)
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
              const { code } = await editCorpTag({
                id: this.form.id,
                name: this.form.name,
                order: this.form.order,
              })
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
