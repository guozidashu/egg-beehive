<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <el-card
          shadow="never"
          style="
            height: 100%;
            min-height: calc(70vh);
            border: 0;
            border-radius: 5px;
          "
        >
          <!-- 父级列表 -->
          <el-menu
            class="el-menu-vertical-demo"
            default-active="0"
            style="width: 100%; border: 0"
            @close="handleClose"
            @open="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in menuList"
              :key="index"
              :index="item.id.toString()"
              @click="handleGrouPQuery(item.id, index)"
            >
              <div>
                <div slot="title">
                  <span>{{ item.name }}</span>
                  <span v-if="item.default">默认</span>
                  <el-dropdown style="float: right" trigger="click">
                    <span class="el-dropdown-link">
                      <i
                        v-if="item.btnIconStatus && item.id != '0'"
                        class="el-icon-menu"
                      ></i>
                    </span>
                  </el-dropdown>
                </div>
              </div>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :lg="18" :md="16" :sm="24" :xl="20" :xs="24">
        <el-card shadow="never" style="border: 0; border-radius: 5px">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button
                v-has-permi="['btn:ArchivesSize:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                添加尺码
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesSize:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 2)"
              >
                添加分类
              </el-button>
            </el-form-item>
            <el-form-item label="尺码名称：" style="float: right">
              <el-input
                v-model="form.name"
                clearable
                placeholder="请输入尺码名称"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="handleQuery"
                />
              </el-input>
            </el-form-item>
          </el-form>
          <!-- 子级列表 -->
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
              <el-table-column type="selection" />
              <el-table-column label="ID" prop="id" />
              <el-table-column label="尺码组名" prop="name" />
              <el-table-column label="尺码" prop="size" />
              <el-table-column label="尺码编码" prop="sn" />
              <el-table-column label="类型" prop="type">
                <template #default="{ row }">
                  <el-tag v-if="row.type == 0">散码</el-tag>
                  <el-tag v-else row.type="danger">整手</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="组别分类" prop="group_name" />
              <el-table-column label="状态" prop="status" width="150">
                <template #default="{ row }">
                  <el-tag v-if="row.status == 1">开启</el-tag>
                  <el-tag v-else type="danger">关闭</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" />
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="85"
              >
                <template #default="{ row }">
                  <el-button
                    v-has-permi="['btn:ArchivesSize:edit']"
                    type="text"
                    @click="handleEdit(row, 1)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-has-permi="['btn:ArchivesSize:del']"
                    type="text"
                    @click="handleDelete(row, 1)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </QYList>
        </el-card>
      </el-col>
    </el-row>
    <!-- 父级子级新增编辑弹窗 -->
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/SizeEdit'
  export default {
    components: { Edit },
    data() {
      return {
        // 表单查询条件 ，父级列表,表单组件和列表组件的类型，子级列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          pid: 0,
          name: '',
          page: 1,
          pageSize: 20,
        },
        menuList: [],
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 表单监听
      form: {
        handler: function () {
          this.page = 1
          this.pageSize = 20
          this.fetchList()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 父级子级新增编辑弹窗
      async handleEdit(row, type) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(row, type, this.menuList)
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row, type, this.menuList)
          } else {
            this.$refs['edit'].showEdit(row, type, this.menuList)
          }
        }
      },
      // 表单查询
      handleQuery() {
        this.fetchData()
      },
      // 父级子级删除操作
      handleDelete(row, type) {
        if (row.id && type === 2) {
          this.$baseConfirm(
            '你确定要删除当前尺码组吗？</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await this.api.delSizeGroupDel({ id: row.id })
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
        } else {
          this.$baseConfirm(
            '你确定要删除当前尺码吗？</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await this.api.delSizeDel({ id: row.id })
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
      // 获取父级列表
      async fetchData() {
        const { data } = await this.api.getSizeGroupList({
          page: 1,
          pageSize: 1000,
        })
        let list = [
          {
            id: 0,
            name: '全部',
          },
          ...data,
        ]
        list.forEach((item) => {
          item.btnIconStatus = false
        })
        this.menuList = list
        this.fetchList()
      },
      fetchList() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取子级列表
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const {
          data: { data, total },
        } = await this.api.getSizeList(this.formTemp)
        this.list = data
        this.total = total
        this.listLoading = false
      },
      // 父级点击事件
      handleGrouPQuery(id, index) {
        this.form.pid = id
        this.menuList.forEach((item) => {
          item.btnIconStatus = false
        })
        this.menuList[index].btnIconStatus = true
      },
      handleOpen() {},
      handleClose() {},
    },
  }
</script>
