<template>
  <div class="comprehensive-form-container">
    <el-row :gutter="20">
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <el-card shadow="hover">
          <el-button
            native-type="submit"
            size="small"
            style="margin-bottom: 10px"
            type="primary"
            @click="handleEditGrouP('add')"
          >
            添加颜色组
          </el-button>
          <el-menu
            class="el-menu-vertical-demo"
            default-active="2"
            style="width: 100%; height: 100%; border: 0"
            @close="handleClose"
            @open="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in list"
              :key="index"
              :index="item.id + ''"
            >
              <div
                @mouseenter="mouseOver(index)"
                @mouseleave="mouseLeave(index)"
              >
                <div slot="title">
                  <span @click="handleGrouPQuery(item)">{{ item.name }}</span>
                  <el-dropdown style="float: right" trigger="click">
                    <span class="el-dropdown-link">
                      <i
                        v-if="item.btnIconStatus && item.id != '0'"
                        class="el-icon-menu"
                      ></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <span @click="handleEditGrouP(item)">编辑</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="handleDeleteGrouP(item)">删除</span>
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
        <el-card shadow="never">
          <Form
            :form="form"
            :form-type="formType"
            @addDate="handleEdit('add')"
            @changeSearch="handleQuery"
            @deleteDate="handleDelete"
          >
            <template #Form>
              <el-form-item label="颜色名称" prop="region" style="float: right">
                <el-input
                  v-model="form.name"
                  size="small"
                  style="width: 150px; padding-left: 10px"
                />
              </el-form-item>
            </template>
          </Form>
          <!-- 表格组件使用 -->
          <List :list="listGroup" :list-type="listType" :state="listLoading">
            <!-- 表格组件具名插槽 自定义表头 -->
            <template #List>
              <el-table-column
                align="center"
                show-overflow-tooltip
                type="selection"
              />
              <el-table-column label="颜色" prop="name" show-overflow-tooltip />
              <el-table-column
                align="center"
                label="颜色ID"
                prop="id"
                show-overflow-tooltip
                sortable
              />
              <el-table-column
                align="center"
                label="操作"
                show-overflow-tooltip
                width="85"
              >
                <template #default="{ row }">
                  <el-button type="text" @click="handleEdit(row)">
                    编辑
                  </el-button>
                  <el-button type="text" @click="handleDelete(row)">
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
  import Edit from './components/ColorEdit'
  import Form from '@/subview/components/Form'
  import {
    getColorGroupList,
    deleteColorGroupList,
    getColorList,
    deleteColorList,
  } from '@/api/basic'
  export default {
    name: 'ArchivesColor',
    components: { List, Form, Edit },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          pageNo: 1,
          name: '',
          pageSize: 10,
        },
        formType: 2,
        // 列表数据相关
        selectRows: [],
        listType: 2,
        list: [],
        listGroup: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // form: {
      //   handler: function () {
      //     this.fetchData()
      //   },
      //   deep: true,
      // },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 颜色组新增修改
      async handleEditGrouP(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(1)
        } else {
          this.$refs['edit'].showEdit(1, row)
        }
      },
      // 颜色新增修改
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(2, this.form.id)
        } else {
          row.pid = this.form.id
          row.sort = 1
          this.$refs['edit'].showEdit(2, row)
        }
      },
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 颜色查询
      handleGrouPQuery(item) {
        this.form.id = String(item.id)
        this.fetchData1()
      },
      // 颜色删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await deleteColorList({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 颜色组删除
      handleDeleteGrouP(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await deleteColorGroupList({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.pageNo = data
      },
      // 多选获取数据   公共部分
      selectBtnRows(data) {
        this.selectRows = data
      },

      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
        console.log(data)
      },
      // 颜色组列表
      async fetchData() {
        const { data } = await getColorGroupList()
        data.forEach((item) => {
          item.btnIconStatus = false
        })
        this.list = data
        this.form.id = String(data[0].id)
        this.fetchData1()
      },
      // 颜色列表
      async fetchData1() {
        this.listLoading = true
        const { data } = await getColorList(this.form)
        this.listGroup = data
        this.listLoading = false
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      mouseOver(index) {
        if (this.list[index].btnIconStatus == false) {
          this.list[index].btnIconStatus = true
        } else {
          this.list[index].btnIconStatus = false
        }
      },
      mouseLeave(index) {
        if (this.list[index].btnIconStatus == false) {
          this.list[index].btnIconStatus = true
        } else {
          this.list[index].btnIconStatus = false
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
