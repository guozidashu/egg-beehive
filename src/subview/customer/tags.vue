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
              @click="handleGrouPQuery(item.id)"
            >
              <div
                @mouseenter="mouseOver(index)"
                @mouseleave="mouseLeave(index)"
              >
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
                          v-has-permi="['btn:CustomerTags:edit']"
                          type="text"
                          @click="handleEdit(item, 2)"
                        >
                          编辑
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          v-has-permi="['btn:CustomerTags:del']"
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
        <el-card shadow="never" style="border: 0">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button
                v-has-permi="['btn:CustomerTags:add']"
                native-type="submit"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                添加标签
              </el-button>
              <el-button
                v-has-permi="['btn:CustomerTags:add']"
                native-type="submit"
                size="small"
                type="primary"
                @click="handleEdit('add', 2)"
              >
                添加分类
              </el-button>
              <el-button native-type="submit" size="small" type="primary">
                同步企业微信标签
              </el-button>
            </el-form-item>
            <el-form-item label="标签名称：" style="float: right">
              <el-input
                v-model="form.name"
                clearable
                placeholder="请输入标签名称"
              />
            </el-form-item>
          </el-form>
          <QYList
            :list="list"
            :list-type="listType"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
          >
            <template #List>
              <el-table-column type="selection" />
              <el-table-column label="ID" prop="id" sortable />
              <el-table-column label="标签名称" prop="name" />
              <el-table-column label="标签分类" prop="p_name" />
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="85"
              >
                <template #default="{ row }">
                  <el-button
                    v-has-permi="['btn:CustomerTags:edit']"
                    type="text"
                    @click="handleEdit(row, 1)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-has-permi="['btn:CustomerTags:del']"
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
  import Edit from '@/subview/components/Edit/TagsEdit'
  import { getParentTag, getTagList, delTagDel } from '@/api/basic'
  export default {
    name: 'CustomerTags',
    components: { Edit },
    data() {
      return {
        form: {
          pid: 0,
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
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await delTagDel({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        const { data } = await getParentTag(this.form)
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
        } = await getTagList(this.form)
        this.list = data
        this.total = total
        this.listLoading = false
      },
      handleGrouPQuery(id) {
        this.form.pid = id
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
