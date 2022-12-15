<template>
  <div style="padding: 20px">
    <el-form ref="form" :inline="true" @submit.native.prevent>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleEdit('add')">
          添加库位
        </el-button>
      </el-form-item>
      <el-form-item label="仓库名称：">
        <el-input
          v-model="form.name"
          placeholder="请输入仓库名称"
          size="small"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          size="small"
          type="primary"
          @click="handleQuery"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="list.length == 0">暂无库位</div>
    <div v-else>
      <el-card
        v-for="(item, index) in list"
        :key="index"
        class="box-card"
        shadow="hover"
      >
        <div slot="header" class="clearfix">
          <span>{{ item.name }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="handleDelete(item)"
          >
            删除
          </el-button>
          <el-button
            style="float: right; padding: 3px 0; margin-right: 10px"
            type="text"
            @click="handleEdit(item)"
          >
            编辑
          </el-button>
        </div>
        <p class="text item">
          <span>库位排序：</span>
          <span>{{ item.sort }}</span>
        </p>
        <p class="text item">
          <span>是否默认：</span>
          <span v-if="item.isdefault == 0">否</span>
          <span v-else>默认</span>
        </p>
      </el-card>
    </div>
    <el-dialog
      ref="edit"
      :append-to-body="true"
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      @close="close"
    >
      <el-form ref="form" label-width="80px" :model="formEdit" :rules="rules">
        <el-form-item label="库位名称" prop="name">
          <el-input v-model="formEdit.name" style="width: 215px" />
        </el-form-item>
        <el-form-item label="库位排序" prop="sort">
          <el-input v-model="formEdit.sort" style="width: 215px" />
        </el-form-item>
        <el-form-item label="是否默认" prop="isdefault">
          <el-radio-group v-model="formEdit.isdefault">
            <el-radio :label="1">关闭</el-radio>
            <el-radio :label="0">开启</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDepotPositionSaveList,
    addDepotPositionSave,
    delDepotPositionSave,
  } from '@/api/basic'
  export default {
    name: 'ComponentsDrawer',
    props: {
      drawerId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        dialogVisible: false,
        title: '',
        list: [],
        form: {
          name: '',
          id: this.drawerId,
        },
        formEdit: {
          isdefault: 0,
          warehouse_id: this.drawerId,
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        },
      }
    },

    watch: {
      drawerId: {
        handler: function (n) {
          console.log(66666, n)
          this.form.id = n
          this.formEdit.warehouse_id = n
          this.fetchData()
        },
        deep: true,
        immediate: true,
      },
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleQuery() {
        this.fetchData()
      },
      handleEdit(row) {
        if (row === 'add') {
          this.title = '新增库位'
          this.dialogVisible = true
        } else {
          this.formEdit = Object.assign({}, row)
          this.title = '编辑库位'
          this.dialogVisible = true
        }
      },
      async fetchData() {
        const { data } = await getDepotPositionSaveList(this.form)
        this.list = data.data
      },
      close() {
        this.formEdit = Object.assign({}, { isdefault: 0 })
        this.dialogVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加') {
              const { code } = await addDepotPositionSave(this.formEdit)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.close()
              this.fetchData()
            } else {
              const { code } = await addDepotPositionSave(this.formEdit)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.close()
              this.fetchData()
            }
          }
        })
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(
            '你确定要删除当前库位吗?</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await delDepotPositionSave({ id: row.id })
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '删除成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            }
          )
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
