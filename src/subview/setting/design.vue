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
      <!-- <el-pagination
        background
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      /> -->
    </el-card>
    <Decorate v-if="viewSta == 2" :item-id="itemId" @submitUpload="getSon" />
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" label-width="120px" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.name" style="width: 215px" />
        </el-form-item>
        <el-form-item label="是否设置默认">
          <el-switch
            v-model="form.is_default"
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
        <!-- <el-form-item label="图片上传">
          <div style="display: flex">
            <div>
              <el-button
                native-type="submit"
                size="small"
                style="margin: 0 10px 0 0"
                type="primary"
                @click="handleShow()"
              >
                上传
              </el-button>
            </div>
            <img
              v-if="form.img"
              :src="form.img"
              style="width: 80px; height: 80px"
            />
          </div>
        </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeTemplate">取 消</el-button>
        <el-button type="primary" @click="addTemplate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getImgList"
    /> -->
  </div>
</template>

<script>
  import Decorate from './decorate.vue'
  import {
    getTemplateList,
    delTemplateDel,
    addTemplateSave,
    getTemplateCopy,
  } from '@/api/basic'
  // import VabUpload from '@/extra/VabUpload'
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
          is_default: 0,
          status: 1,
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
      // getImgList(data) {
      //   this.form.img = data[0]
      // },
      // handleShow() {
      //   this.$refs['vabUpload'].handleShow()
      // },
      closeTemplate() {
        this.dialogVisible = false
        this.form = {
          name: '',
          is_default: 0,
          status: 1,
          img: '',
        }
      },
      async addTemplate() {
        const { code } = await addTemplateSave(this.form)
        if (code == 200) {
          this.$message({
            message: '添加成功',
            type: 'success',
          })
          this.dialogVisible = false
          this.fetchData()
          this.form = {
            name: '',
            is_default: 0,
            status: 1,
            img: '',
          }
        }
      },
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
          this.itemId = 0
        } else {
          this.itemId = item.id
        }
        this.viewSta = 2
      },
      handleQuery() {
        this.fetchData()
      },
      async addTemplateSaveBtn(item) {
        const { code } = await getTemplateCopy({ id: item.id })
        if (code == 200) {
          this.$message({
            message: '复制成功',
            type: 'success',
          })
          this.fetchData()
        }
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
              this.fetchData()
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
