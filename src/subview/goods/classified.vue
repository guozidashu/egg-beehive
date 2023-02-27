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
                          v-has-permi="['btn:GoodsClassified:edit']"
                          type="text"
                          @click="handleEdit(item, 2)"
                        >
                          编辑
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          v-has-permi="['btn:GoodsClassified:del']"
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
        <el-card shadow="never" style="border: 0; border-radius: 5px">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button
                v-has-permi="['btn:GoodsClassified:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                添加款式
              </el-button>
              <el-button
                v-has-permi="['btn:GoodsClassified:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 2)"
              >
                添加分类
              </el-button>
              <el-button
                v-has-permi="['btn:GoodsClassified:synchronization']"
                size="small"
                type="primary"
                @click="handleSynchronization()"
              >
                同步到聚水潭
              </el-button>
            </el-form-item>
            <el-form-item label="款式名称：" style="float: right">
              <el-input
                v-model="form.name"
                clearable
                placeholder="请输入款式名称"
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
              <el-table-column label="ID" prop="id" />
              <el-table-column label="分类名称" prop="pid_name" />
              <el-table-column label="款式名称" prop="name" />
              <el-table-column label="使用商品数量" prop="goods_num" />
              <el-table-column label="状态" prop="status">
                <template #default="{ row }">
                  <el-tag v-if="row.status == 1">开启</el-tag>
                  <el-tag v-if="row.status == 0" type="danger">关闭</el-tag>
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
                    v-has-permi="['btn:GoodsClassified:edit']"
                    type="text"
                    @click="handleEdit(row, 1)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-has-permi="['btn:GoodsClassified:del']"
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
  import Edit from '@/subview/components/Edit/ClassifiedEdit'
  export default {
    components: { Edit },
    data() {
      return {
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          id: 0,
          page: 1,
          pageSize: 10,
          name: '',
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
          this.fetchList()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 聚水潭同步
      handleSynchronization() {
        this.$baseConfirm('你确定要同步到聚水潭吗', null, async () => {
          const { code } = await this.api.getCategoryUpload()
          if (code != 200) {
            return
          }
          this.$baseMessage('同步成功', 'success')
        })
      },
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
      handleQuery() {
        this.form.page = 1
      },
      handleDelete(row, type) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            if (type == 1) {
              const { code } = await this.api.delCategorySonDel({ id: row.id })
              if (code != 200) {
                return
              }
            } else {
              const { code } = await this.api.delCategoryMainDel({ id: row.id })
              if (code != 200) {
                return
              }
            }

            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 商品分类 父级 子级
      async fetchData() {
        const { data } = await this.api.getCategoryMainList(this.form)
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
      async fetchList() {
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const {
          data: { data, total },
        } = await this.api.getCategorySonList(this.formTemp)
        this.list = data
        this.total = total
      },

      handleGrouPQuery(id, index) {
        this.form.id = id
        this.menuList.forEach((item) => {
          item.btnIconStatus = false
        })
        this.menuList[index].btnIconStatus = true
      },
      handleOpen() {},
      handleClose() {},
      // 鼠标移入移出
      mouseOver(index) {
        if (this.menuList[index].btnIconStatus == false) {
          this.menuList[index].btnIconStatus = true
        } else {
          this.menuList[index].btnIconStatus = false
        }
      },
      mouseLeave(index) {
        if (this.menuList[index].btnIconStatus == false) {
          this.menuList[index].btnIconStatus = true
        } else {
          this.menuList[index].btnIconStatus = false
        }
      },
    },
  }
</script>
