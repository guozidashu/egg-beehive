<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form">
        <el-form-item>
          <el-button
            v-has-permi="['btn:DecorateDesign:add']"
            size="small"
            type="primary"
            @click="handleEdit(0)"
          >
            新增模板
          </el-button>
        </el-form-item>
        <div style="display: flex">
          <!-- 父级 -->
          <el-menu
            class="el-menu-vertical-demo"
            default-active="1"
            style="width: 15%"
            @close="handleClose"
            @open="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in menuList"
              :key="index"
              :index="item.id.toString()"
              @click="handleGrouPQuery(item)"
            >
              <div slot="title">
                <span>{{ item.name }}</span>
              </div>
            </el-menu-item>
          </el-menu>
          <div style="width: 85%; padding: 20px">
            <div style="margin-bottom: 20px">
              <!-- 查询条件 -->
              <el-form class="demo-form-inline" :inline="true" :model="form">
                <el-form-item label="模板名称">
                  <el-input v-model="form.name" placeholder="请输入模板名称" />
                </el-form-item>
                <el-form-item label="模板类型">
                  <el-select
                    v-model="form.class_id"
                    placeholder="请选择模板类型"
                    style="width: 215px"
                  >
                    <el-option
                      v-for="item in template_class"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="rest">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!-- 列表 -->
            <QYList
              :list="list"
              :list-type="listType"
              :page-no="page"
              :page-size="pageSize"
              :state="listLoading"
              :total="total"
              @changePage="changeBtnPage"
              @changePageSize="changeBtnPageSize"
            >
              <template #List>
                <el-table-column type="selection" width="50" />
                <el-table-column label="ID" prop="id" width="80" />
                <el-table-column label="模板名称" prop="name" width="120" />
                <el-table-column
                  label="模板分类"
                  prop="class_name"
                  width="120"
                />
                <el-table-column label="创建时间" prop="create_time" />
                <el-table-column label="更新时间" prop="update_time" />
                <el-table-column
                  align="center"
                  label="操作"
                  show-overflow-tooltip
                  width="300"
                >
                  <template #default="{ row }">
                    <el-popover
                      v-if="row.is_default != 1"
                      placement="right"
                      trigger="click"
                      @show="getQrcode(row.id)"
                    >
                      <el-image
                        v-if="Qrcode != ''"
                        :src="Qrcode"
                        style="width: 200px; height: 200px"
                      />
                      <el-image
                        v-else
                        src="https://oss.business.quanyu123.com/88e5e42d9cdf41a632faab9ee48814ed.jpeg"
                        style="width: 200px; height: 200px"
                      />
                      <el-button slot="reference" type="text">
                        小程序码
                      </el-button>
                    </el-popover>
                    &nbsp;
                    <el-button
                      v-has-permi="['btn:DecorateDesign:edit']"
                      type="text"
                      @click="handleEdit(row, 1)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      v-has-permi="['btn:DecorateDesign:design']"
                      type="text"
                      @click="handleEdit(row, 0)"
                    >
                      设计页面
                    </el-button>
                    <el-button
                      v-has-permi="['btn:DecorateDesign:del']"
                      type="text"
                      @click="delTemplateDelBtn(row)"
                    >
                      删除
                    </el-button>
                    <el-button
                      v-if="row.is_default != 1"
                      v-has-permi="['btn:DecorateDesign:default']"
                      type="text"
                      @click="setDefault(row)"
                    >
                      设为默认
                    </el-button>
                  </template>
                </el-table-column>
              </template>
            </QYList>
          </div>
        </div>
      </el-form>
    </el-card>
    <!-- 新增编辑模板弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="form1" :model="form1" :rules="rules1">
        <el-form-item v-if="title == '选择模板类型'" label="模板类型" prop="lx">
          <el-select
            v-model="form1.lx"
            placeholder="请选择模板类型"
            style="width: 215px"
          >
            <el-option
              v-for="item in template_class"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="name">
          <el-input
            v-model="form1.name"
            style="width: 215px"
            @input="form1.name = $WhitespaceRemoval(form1.name)"
          />
          <div style="margin-left: 100`px; font-size: 12px; color: #c0c4cc">
            示例：2023春季（以波段命名）
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dia_close">取 消</el-button>
        <el-button
          v-if="title == '选择模板类型'"
          type="primary"
          @click="dia_subit"
        >
          确 定
        </el-button>
        <el-button v-else type="primary" @click="subit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DecorateTheme',
    data() {
      return {
        Qrcode: '',
        // 弹窗标题
        title: '',
        // 模板类型下拉框数据
        template_class: [],
        // 弹窗状态
        dialogFormVisible: false,
        // 父级菜单
        menuList: [],
        // 页数，条数，表单查询条件 ，列表组件的类型,列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          page: 1,
          pageSize: 20,
          name: '',
          class_id: null,
        },
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        // 弹窗表单数据
        form1: {
          lx: '',
          name: '',
        },
        // 弹窗表单验证规则
        rules1: {
          lx: [{ required: true, message: '请选择模板类型', trigger: 'blur' }],
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
          ],
        },
      }
    },
    watch: {
      // 监听表单数据变化
      form: {
        handler() {
          this.page = 1
          this.pageSize = 20
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      // 获取设计页面二维码
      async getQrcode(id) {
        this.Qrcode = ''
        const { code, data } = await this.api.getWechatTemplateQrcode({
          template_id: id, // 商品id
        })
        if (code == 200) {
          this.Qrcode = data
        }
      },
      // 点击父级菜单
      handleGrouPQuery(item) {
        this.form.page = 1
        this.form.class_id = item.id
        this.fetchData()
      },
      // 编辑保存
      async subit() {
        if (this.form1.name == '') {
          this.$message({
            type: 'error',
            message: '请输入模板名称',
          })
          return
        } else {
          const { code } = await this.api.addTemplateSave(this.form1)
          if (code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功',
            })
            this.dialogFormVisible = false
            this.fetchData()
          }
        }
      },
      // 重置
      rest() {
        this.form.name = ''
        this.form.class_id = null
      },
      // 获取下拉框数据，父级菜单数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'template_class',
        })
        this.menuList = data.template_class
        this.form.class_id = data.template_class[0].id
        this.template_class = data.template_class
      },
      // 弹窗关闭
      dia_close() {
        this.dialogFormVisible = false
      },
      // 弹窗新增跳转
      dia_subit() {
        this.$refs['form1'].validate(async (valid) => {
          if (valid) {
            this.dialogFormVisible = false
            window.open(
              `#/design?id=0&lx=${this.form1.lx}&name=${this.form1.name}`,
              '_blank'
            )
          }
        })
      },
      // 新增编辑弹窗判断显示
      handleEdit(item, type) {
        if (item == 0) {
          this.title = '选择模板类型'
          this.dialogFormVisible = true
          this.form1 = {
            lx: '',
          }
          this.getTypeList()
        } else {
          if (type == 0) {
            window.open(
              `#/design?id=${item.id}&lx=${item.class_id}&is_default=${item.is_default}&name=${item.name}`,
              '_blank'
            )
          } else if (type == 1) {
            this.title = '编辑模板'
            this.dialogFormVisible = true
            this.form1 = item
          } else if (type == 3) {
            this.title = '预览'
            this.dialogFormVisible = true
          }
        }
      },
      // 设置默认
      setDefault(item) {
        this.$confirm('确定设置为默认模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            let temp = item
            temp.is_default = 1
            this.api.addTemplateSave(temp).then(() => {
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
      // 删除
      delTemplateDelBtn(item) {
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.api.delTemplateDel({ id: item.id }).then(() => {
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
      handleOpen() {},
      handleClose() {},
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchData()
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const { data } = await this.api.getTemplateList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
