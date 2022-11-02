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
              :index="item.id"
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
                      <el-dropdown-item>
                        <span @click="handleEdit(item, 2)">编辑</span>
                      </el-dropdown-item>
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
                v-model="addressKeyword"
                clearable
                placeholder="请输入尺码名称"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getAddressKeyword"
                />
              </el-input>
            </el-form-item>
          </el-form>
          <List
            :list="list1"
            :list-type="listType"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
            @selectRows="selectBtnRows"
          >
            <!-- 表格组件具名插槽 自定义表头 -->
            <template #List>
              <el-table-column type="selection" />
              <el-table-column label="ID" prop="id" />
              <el-table-column label="尺码组名" prop="name" />
              <el-table-column label="尺码" prop="name" />
              <el-table-column label="类型" prop="name" />
              <el-table-column label="组别分类" prop="zhekou" />
              <el-table-column label="创建时间" prop="tiem" />
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
                  <el-button type="text" @click="handleDelete(row, 1)">
                    禁止操作
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
  // import { getGradeList, editGrade, deleteGrade } from '@/api/basic'
  export default {
    name: 'GoodsClassified',
    components: { List, Edit },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          name: '',
          pageNo: 1,
          pageSize: 20,
        },
        menuList: [
          {
            id: '0',
            name: '全部',
            btnIconStatus: false,
            default: false,
          },
          {
            id: '1',
            name: '童装',
            btnIconStatus: false,
            default: false,
          },
          {
            id: '2',
            name: '男装',
            btnIconStatus: false,
            default: false,
          },
          {
            id: '3',
            name: '女装',
            btnIconStatus: false,
            default: false,
          },
          {
            id: '4',
            name: '内衣',
            btnIconStatus: false,
            default: false,
          },
          {
            id: '5',
            name: '女鞋',
            btnIconStatus: false,
            default: false,
          },
        ],
        formType: 4,
        // 列表数据相关
        selectRows: [],
        listType: 1,
        list1: [],
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
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
      // 新增修改
      async handleEdit(row, type) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(row, type)
        } else {
          if (row.id) {
            // const { code, data } = await editGrade({ id: row.id })
            // if (code === 200) {
            //   this.$refs['edit'].showEdit(data)
            // }
            this.$refs['edit'].showEdit(row, type)
          } else {
            this.$refs['edit'].showEdit(row, type)
          }
        }
      },
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 删除
      handleDelete(row, type) {
        if (row.id) {
          if (type === 3) {
            this.$baseConfirm(
              '你确定要将当前分类设为默认项吗',
              null,
              async () => {
                // const { code } = await deleteGrade({ id: row.id })
                // if (code != 200) {
                //   return
                // }
                this.$baseMessage(
                  '设置成功',
                  'success',
                  'vab-hey-message-success'
                )
                this.fetchData()
              }
            )
          } else {
            this.$baseConfirm('你确定要删除当前项吗', null, async () => {
              // const { code } = await deleteGrade({ id: row.id })
              // if (code != 200) {
              //   return
              // }
              this.$baseMessage(
                '删除成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            })
          }
        } else {
          if (this.selectRows.length > 0) {
            // const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              // const { code } = await deleteGrade(ids)
              // if (code != 200) {
              //   return
              // }
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
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
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getGradeList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
        this.total = this.list1.length
      },
      handleGrouPQuery(data) {
        if (data.name === '全部') {
          this.list1 = this.list
          this.fetchData()
        } else {
          this.list1 = this.list.filter((item) => item.zhekou === data.name)
          this.fetchData()
        }
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
