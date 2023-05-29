<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <!-- 父级标签 -->
        <el-card
          shadow="never"
          style="
            height: 100%;
            min-height: calc(70vh);
            border: 0;
            border-radius: 5px;
          "
        >
          <el-button
            style="margin-bottom: 10px"
            type="primary"
            @click="handleEdit('add', 2)"
          >
            添加分类
          </el-button>
          <el-menu
            class="el-menu-vertical-demo"
            default-active="1"
            style="width: 100%; border: 0"
            @close="handleClose"
            @open="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in menuList"
              :key="index"
              :index="item.id.toString()"
              @click="handleGrouPQuery(item.group_id, index)"
            >
              <div>
                <div slot="title">
                  <span>
                    {{ item.name }}
                  </span>
                  <el-dropdown style="float: right" trigger="click">
                    <span class="el-dropdown-link">
                      <i v-if="item.btnIconStatus" class="el-icon-menu"></i>
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
        <!-- 子级标签 -->
        <el-card shadow="never" style="border: 0; border-radius: 5px">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button type="primary" @click="handleEdit('add', 1)">
                添加标签
              </el-button>

              <el-button
                v-has-permi="['btn:CustomerTags:synchronization']"
                type="primary"
                @click="addCopy()"
              >
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
            :page-no="page"
            :page-size="pageSize"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
          >
            <template #List>
              <el-table-column type="selection" />
              <el-table-column label="标签名称" prop="tag_name" />
              <el-table-column label="创建时间" prop="create_time" />
              <el-table-column label="更新时间" prop="update_time" />
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
  export default {
    components: { Edit },
    data() {
      return {
        // 页数，条数，表单查询条件 ，父级数据，表单组件和列表组件的类型，子级列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          group_id: 0,
          page: 1,
          pageSize: 20,
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
      // 新增编辑弹窗
      async handleEdit(row, type) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(row, type, this.form.group_id)
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row, type)
          } else {
            this.$refs['edit'].showEdit(row, type)
          }
        }
      },
      // 同步企业微信
      addCopy() {
        this.$baseConfirm('你确定要同步吗？', null, async () => {
          this.$baseMessage(
            '同步中请勿刷新或关闭页面',
            'error',
            'vab-hey-message-error'
          )
          const { code } = await this.api.addCorpTagSync()
          if (code != 200) {
            return
          }
          this.$baseMessage('同步成功', 'success', 'vab-hey-message-success')
          this.fetchData()
        })
      },
      // 删除
      handleDelete(row, type) {
        if (type === 1) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await this.api.delCorpTag({ tag_id: [row.tag_id] })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        } else {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await this.api.delCorpTag({
              group_id: [row.group_id],
            })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.fetchList()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchList()
      },
      // 获取标签组列表
      async fetchData() {
        const { data } = await this.api.getTagGroupList()
        data.forEach((item, index) => {
          item.btnIconStatus = false
          item.id = index + 1
          item.name = item.group_name
        })
        this.menuList = data
        this.form.group_id = this.menuList[0].group_id
        this.menuList[0].btnIconStatus = true
        this.fetchList()
      },
      fetchList() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取标签列表
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const {
          data: { data, total },
        } = await this.api.getTagList(this.formTemp)
        this.list = data
        this.total = total
        this.listLoading = false
      },
      // 切换标签组
      handleGrouPQuery(id, index) {
        this.form.group_id = id
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
