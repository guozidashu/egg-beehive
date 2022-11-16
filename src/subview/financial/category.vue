<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <el-card
          shadow="never"
          style="height: 100%; min-height: calc(80vh); border: 0"
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
            >
              <div
                @mouseenter="mouseOver(index)"
                @mouseleave="mouseLeave(index)"
              >
                <div slot="title">
                  <span @click="handleGrouPQuery(item.id)">
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
                        <span @click="handleEdit(item, 2)">编辑</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="handleDelete(item, 2)">删除</span>
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
        <el-card shadow="never" style="border: 0">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button
                native-type="submit"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                添加收支
              </el-button>
              <el-button
                native-type="submit"
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
              >
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
            </el-form-item>
          </el-form>
          <List
            :list="list"
            :list-type="listType"
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
                  <el-button type="text" @click="handleEdit(row, 1)">
                    编辑
                  </el-button>
                  <el-button type="text" @click="handleDelete(row, 1)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </List>
        </el-card>
      </el-col>
    </el-row>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Edit from './components/categoryEdit'
  import { getCategoryList, delCategoryDel } from '@/api/basic'
  export default {
    name: 'CustomerTags',
    components: { List, Edit },
    data() {
      return {
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
      form: {
        handler: function () {
          this.fetchData(2)
        },
        deep: true,
      },
    },
    created() {
      this.fetchData(1)
    },
    methods: {
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
        this.fetchData(2)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await delCategoryDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData(1)
          })
        }
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData(type) {
        if (type == 1) {
          this.form.id = 0
          const { data } = await getCategoryList(this.form)
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
          if (this.form.id == 0) {
            this.form.id = -1
          }
          const { data } = await getCategoryList(this.form)
          this.list = data.data
          this.total = data.total
        }
      },
      handleGrouPQuery(id) {
        this.form.id = id
        this.fetchData(2)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
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
<style lang="scss" scoped></style>
