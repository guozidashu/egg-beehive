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
                  <span @click="handleGrouPQuery(item)">{{ item.name }}</span>
                  <span v-if="item.default">默认</span>
                  <el-dropdown style="float: right" trigger="click">
                    <span class="el-dropdown-link">
                      <i
                        v-if="item.btnIconStatus && item.id != '0'"
                        class="el-icon-menu"
                      ></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <!-- <el-dropdown-item>
                        <span @click="handleEdit(item, 2)">编辑</span>
                      </el-dropdown-item> -->
                      <el-dropdown-item>
                        <span @click="handleDelete(item, 2)">删除</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="handleDelete(item, 3)">设置默认</span>
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
                添加尺码
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
          <List
            :list="list"
            :list-type="listType"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
          >
            <!-- 表格组件具名插槽 自定义表头 -->
            <template #List>
              <el-table-column type="selection" />
              <el-table-column label="ID" prop="id" />
              <el-table-column label="尺码组名" prop="name" />
              <el-table-column label="尺码" prop="size" />
              <el-table-column label="类型" prop="type" />
              <el-table-column label="组别分类" prop="group_name" />
              <el-table-column label="状态" prop="status" width="150">
                <template #default="{ row }">
                  <el-switch
                    v-model="row.status"
                    active-color="#41B584"
                    active-text="开启"
                    :active-value="1"
                    class="switch"
                    inactive-color="#D2D2D2"
                    inactive-text="关闭"
                    :inactive-value="0"
                    style="margin: 0 10px"
                    @change="turnOnOff(row)"
                  />
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
  import Edit from './components/SizeEdit'
  import {
    getSizeGroupList,
    getSizeList,
    delSizeDel,
    delSizeGroupDel,
    addSizeSave,
  } from '@/api/basic'
  export default {
    name: 'GoodsClassified',
    components: { List, Edit },
    data() {
      return {
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
      form: {
        handler: function () {
          this.fetchList()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async turnOnOff(row) {
        const { code } = await addSizeSave(row)
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
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
      handleQuery() {
        this.fetchData()
      },
      handleDelete(row, type) {
        if (row.id && type === 2) {
          this.$baseConfirm(
            '你确定要删除当前尺码组吗？</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await delSizeGroupDel({ id: row.id })
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
              const { code } = await delSizeDel({ id: row.id })
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
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        const { data } = await getSizeGroupList(this.form)
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
        this.listLoading = true
        const {
          data: { data, total },
        } = await getSizeList(this.form)
        this.list = data
        this.total = total
        this.listLoading = false
      },
      handleGrouPQuery(item) {
        this.form.pid = item.id
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
