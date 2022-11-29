<template>
  <div class="system-log-container">
    <el-card v-if="viewSta == 1" class="box-card">
      <div slot="header" class="clearfix">
        <span>页面列表</span>
      </div>
      <div>
        <el-form
          ref="form"
          :inline="true"
          label-width="80px"
          :model="queryForm"
        >
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = true">
              添加
            </el-button>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="queryForm.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="display: flex; flex-wrap: wrap">
        <div
          v-for="(item, index) in list"
          :key="index"
          style="width: 22%; margin: 20px"
        >
          <div style="margin: 10px">{{ item.name }}</div>
          <img :src="item.img" style="width: 100%; height: 500px" />
          <div>
            <i
              class="el-icon-edit"
              style="margin: 10px; font-size: 16px"
              @click="editBtn(item)"
            ></i>
            <i
              v-if="item.is_default != 1"
              class="el-icon-s-tools"
              style="margin: 10px; font-size: 16px"
              @click="setDefault(item)"
            ></i>
            <i
              class="el-icon-document-copy"
              style="margin: 10px; font-size: 16px"
              @click="addTemplateSaveBtn(item)"
            ></i>
            <i
              class="el-icon-delete"
              style="margin: 10px; font-size: 16px"
              @click="delTemplateDelBtn(item.id)"
            ></i>
          </div>
        </div>
      </div>
      <el-pagination
        background
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <Decorate v-if="viewSta == 2" :item-id="itemId" @submitUpload="getSon" />
    新增弹窗
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogClose"
    >
      <el-form ref="form" label-width="80px" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action=""
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <img v-if="form.img" class="avatar" :src="form.img" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Decorate from './decorate.vue'
  import { getTemplateList, delTemplateDel, addTemplateSave } from '@/api/basic'
  export default {
    name: 'Design',
    components: { Decorate },
    data() {
      return {
        dialogVisible: false,
        itemId: 0,
        viewSta: 1,
        form: {
          name: '',
        },
        list: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        queryForm: {
          name: '',
          page: 1,
          pageSize: 10,
        },
      }
    },
    watch: {
      queryForm: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
      viewSta: {
        handler: function () {
          if (this.viewSta == 1) {
            this.fetchData()
          }
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      getSon(data) {
        this.viewSta = data
      },
      setDefault(item) {
        this.$confirm('确定设置为默认模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            let temp = item
            temp.is_default = 1
            addTemplateSave(temp).then(() => {
              this.$message({
                type: 'success',
                message: '设置成功!',
              })
              this.fetchData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消设置',
            })
          })
      },
      editBtn(item) {
        if (item == 'add') {
          console.log('add')
          this.itemId = 0
        } else {
          this.itemId = item.id
          console.log(item)
        }
        this.viewSta = 2
      },
      handleQuery() {
        this.fetchData()
      },
      addTemplateSaveBtn(item) {
        let temp = item
        temp.name = item.name + '副本'
        delete temp.id
        addTemplateSave(temp).then(() => {
          this.$message({
            message: '复制成功',
            type: 'success',
          })
        })
      },
      delTemplateDelBtn(item) {
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delTemplateDel({ id: item }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      queryData() {
        this.queryForm = {
          name: '', //操作名称
          admin_name: '', //操作人
          create_time: [],
          page: 1,
          pageSize: 10,
        }
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getTemplateList(this.queryForm)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
