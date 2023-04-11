<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <!-- 父级分类 -->
        <el-card
          shadow="never"
          style="
            height: 100%;
            min-height: calc(70vh);
            border: 0;
            border-radius: 5px;
          "
        >
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
                  <span>
                    {{ item.name }}
                  </span>
                  <el-dropdown style="float: right" trigger="click">
                    <span class="el-dropdown-link">
                      <i
                        v-if="item.btnIconStatus && item.id != '0'"
                        class="el-icon-menu"
                      ></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button
                          v-has-permi="['btn:FinancialCategory:edit']"
                          type="text"
                          @click="handleEdit(item, 2)"
                        >
                          编辑
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          v-has-permi="['btn:FinancialCategory:del']"
                          type="text"
                          @click="handleDelete(item, 2)"
                        >
                          删除
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :lg="18" :md="16" :sm="24" :xl="20" :xs="24">
        <!-- 子级分类 -->
        <el-card shadow="never" style="border: 0; border-radius: 5px">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button
                v-has-permi="['btn:FinancialCategory:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                添加收支
              </el-button>
              <el-button
                v-has-permi="['btn:FinancialCategory:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 2)"
              >
                添加分类
              </el-button>
            </el-form-item>
            <el-form-item label="收支名称：" style="float: right">
              <el-input
                v-model="form.name"
                clearable
                placeholder="请输入收支名称"
              />
            </el-form-item>
          </el-form>
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
              <el-table-column label="收支ID" prop="id">
                <template #default="{ row }">
                  <span>{{ row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="归属会计科目名称" prop="account_name" />
              <el-table-column label="收支名称" prop="name" />
              <el-table-column label="类别" prop="type">
                <template #default="{ row }">
                  <span v-if="row.type == 1">收</span>
                  <span v-else>支</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="85"
              >
                <template #default="{ row }">
                  <el-button
                    v-has-permi="['btn:FinancialCategory:edit']"
                    type="text"
                    @click="handleEdit(row, 1)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-has-permi="['btn:FinancialCategory:del']"
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
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/categoryEdit'
  export default {
    name: 'FinancialCategory',
    components: { Edit },
    data() {
      return {
        // 页数，条数，表单查询条件 ，父级列表，表单组件和列表组件的类型，子级列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          id: 0, // 父级id （取父级时传0）
          name: '', // 收支名称
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
      // 监听表单变化，变化时重新请求数据
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData(2)
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      // 新增编辑弹窗
      async handleEdit(row, type) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(row, type)
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row, type)
          } else {
            this.$refs['edit'].showEdit(row, type)
          }
        }
      },
      // 查询
      handleQuery() {
        this.fetchData(2)
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await this.api.delCategoryDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData(1)
          })
        }
      },
      // 页数改变
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 条数改变
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取数据
      async fetchData(type) {
        if (type == 1) {
          if (this.formTemp == null) {
            this.formTemp = JSON.parse(JSON.stringify(this.form))
          }
          this.formTemp.id = 0
          const { data } = await this.api.getCategoryList(this.formTemp)
          let list = [
            {
              id: 0,
              name: '全部',
            },
            ...data.data,
          ]
          list.forEach((item) => {
            item.btnIconStatus = false
          })
          this.menuList = list
          this.fetchData(2)
        } else {
          if (this.formTemp == null) {
            this.formTemp = JSON.parse(JSON.stringify(this.form))
          }
          if (this.formTemp.id == 0) {
            this.formTemp.id = -1
          }
          const { data } = await this.api.getCategoryList(this.formTemp)
          this.list = data.data
          this.total = data.total
        }
      },
      // 点击父级
      handleGrouPQuery(id, index) {
        this.form.id = id
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
