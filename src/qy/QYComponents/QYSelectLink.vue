<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-tabs v-model="tabindex" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, dex) in tabsList"
        :key="dex"
        :label="item.name"
        :name="item.id"
      />
    </el-tabs>
    <div
      v-if="tabindex == 9 || tabindex == 10 || tabindex == 11"
      style="height: 60vh"
    >
      <div>
        <el-form class="demo-form-inline" :inline="true" :model="form">
          <el-form-item v-if="tabindex == 9">
            <el-input v-model="form.name" placeholder="请输入文章搜索" />
          </el-form-item>
          <el-form-item v-if="tabindex == 10">
            <el-input v-model="form.name" placeholder="请输入商品搜索" />
          </el-form-item>
          <el-form-item v-if="tabindex == 11">
            <el-input v-model="form.name" placeholder="请输入设计页面搜索" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">搜索</el-button>
          </el-form-item>
          <el-form-item v-if="type == 2">
            <el-button type="primary" @click="Select(1)">确定</el-button>
          </el-form-item>
        </el-form>
        <div v-if="tabindex == 9">
          <el-table
            v-loading="listLoading"
            border
            :data="list"
            style="width: 100%; height: 50vh; overflow: auto"
          >
            <el-table-column label="文章信息" prop="title" />
            <el-table-column label="ID" prop="id" width="80" />
            <el-table-column label="创建时间" width="150" />
            <el-table-column fixed="right" label="操作" width="80">
              <template #default="{ row }">
                <el-button type="text" @click="Select(row)">选择</el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-image
                class="vab-data-empty"
                :src="require('@/assets/empty_images/data_empty.png')"
              />
            </template>
          </el-table>
          <el-pagination
            background
            :current-page="list.pageNo"
            :layout="layout"
            :page-size="list.pageSize"
            :total="total"
            @current-change="changeBtnPage"
            @size-change="changeBtnPageSize"
          />
        </div>
        <div v-if="tabindex == 10">
          <el-table
            v-if="type == 1"
            v-loading="listLoading"
            border
            :data="list"
            style="width: 100%; height: 50vh; overflow: auto"
          >
            <el-table-column label="商品名称" prop="name" />
            <el-table-column label="ID" prop="id" width="80" />
            <el-table-column label="商品图" prop="img" width="80">
              <template #default="{ row }">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image :src="row.img" style="width: 50px; height: 50px" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="status" width="150">
              <template #default="{ row }">
                <span v-if="row.status == 0">下架</span>
                <span v-else-if="row.status == 1">上架</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
              <template #default="{ row }">
                <el-button type="text" @click="Select(row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            v-if="type == 2"
            v-loading="listLoading"
            border
            :data="list"
            style="width: 100%; height: 50vh; overflow: auto"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="商品名称" prop="name" />
            <el-table-column label="ID" prop="id" width="80" />
            <el-table-column label="商品图" prop="img" width="80">
              <template #default="{ row }">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image :src="row.img" style="width: 50px; height: 50px" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="status" width="150">
              <template #default="{ row }">
                <span v-if="row.status == 0">下架</span>
                <span v-else-if="row.status == 1">上架</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            :current-page="list.pageNo"
            :layout="layout"
            :page-size="list.pageSize"
            :total="total"
            @current-change="changeBtnPage"
            @size-change="changeBtnPageSize"
          />
        </div>
        <div v-if="tabindex == 11">
          <el-table
            v-loading="listLoading"
            border
            :data="list"
            style="width: 100%; height: 50vh; overflow: auto"
          >
            <el-table-column label="模板名称" prop="name" />
            <el-table-column label="ID" prop="id" width="80" />
            <el-table-column label="模板图片" prop="img" width="80">
              <template #default="{ row }">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image :src="row.img" style="width: 50px; height: 50px" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="is_default" width="150">
              <template #default="{ row }">
                <span v-if="row.is_default == 0">不默认</span>
                <span v-else-if="row.is_default == 1">默认</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
              <template #default="{ row }">
                <el-button type="text" @click="Select(row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            :current-page="list.pageNo"
            :layout="layout"
            :page-size="list.pageSize"
            :total="total"
            @current-change="changeBtnPage"
            @size-change="changeBtnPageSize"
          />
        </div>
      </div>
    </div>
    <div v-else style="height: 60vh; overflow: auto">
      <div v-if="tabindex == 1">
        <div style="display: flex; flex-wrap: wrap">
          <el-button
            v-for="(item, dex) in tabsItem.children"
            :key="dex"
            plain
            @click="Select(item)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </div>
      <div v-if="tabindex == 12">
        <div style="display: flex; flex-wrap: wrap">
          <div
            v-for="(item, dex) in tabsItem.children"
            :key="dex"
            style="display: inline-block; margin: 10px"
          >
            <el-button
              v-if="item.link_type == 'tel'"
              plain
              @click="changetype(1)"
            >
              {{ item.name }}
            </el-button>
            <el-button
              v-else-if="item.link_type == 'curl'"
              plain
              @click="changetype(2)"
            >
              {{ item.name }}
            </el-button>
            <el-button v-else plain @click="Select(item)">
              {{ item.name }}
            </el-button>
          </div>
        </div>
        <el-form
          v-if="link_tel || link_curl"
          class="demo-form-inline"
          :inline="true"
          :model="formInline"
        >
          <el-form-item v-if="link_tel" label="电话">
            <el-input v-model="formInline.tel" placeholder="请输入电话" />
          </el-form-item>
          <el-form-item v-if="link_curl" label="自定义链接">
            <el-input
              v-model="formInline.curl"
              placeholder="请输入自定义链接"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Select(2)">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="tabindex == 7 && tabsItem != null">
        <div style="display: flex; flex-wrap: wrap">
          <el-button
            v-for="(item, dex) in tabsItem"
            :key="dex"
            plain
            @click="Select(item)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </div>
      <div v-if="tabindex == 8 && tabsItem != null">
        <div>
          <div v-for="(item, dex) in tabsItem" :key="dex" style="clear: both">
            <div style="float: left; margin: 10px 0">
              <i
                v-if="item.checked"
                class="el-icon-caret-bottom"
                @click="delGoodsClassifyItem(item)"
              ></i>
              <i
                v-else
                class="el-icon-caret-right"
                @click="getGoodsClassifyItem(item)"
              ></i>
              {{ item.name }}
            </div>
            <div style="float: right; margin: 10px 0" @click="Select(item)">
              选择
            </div>
            <div
              v-if="item.children && item.children.length > 0"
              style="clear: both"
            >
              <div
                v-for="(item1, dex1) in item.children"
                :key="dex1"
                style="
                  display: flex;
                  justify-content: space-between;
                  margin: 10px 0;
                "
              >
                <div style="margin-left: 20px">
                  {{ item1.name }}
                </div>
                <div @click="Select(item1)">选择</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer v-if="type == 1">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import {
    getTemplateMenuDetail,
    getGoodsGroupList,
    getCategoryMainList,
    getCategorySonList,
    getArticleList,
    getGoodList,
    getTemplateList,
  } from '@/api/basic'
  export default {
    name: 'QYSelectLink',
    data() {
      return {
        link_curl: false,
        link_tel: false,
        formInline: {
          tel: '',
          curl: '',
        },
        classifyInof: '',
        selectList: [],
        type: 1, //页面展示区分
        index: 0,
        tabindex: '0',
        tabsItem: null,
        tabsList: [],
        title: '选择链接',
        dialogFormVisible: false,
        list: [],
        layout: 'total, sizes, prev, pager, next, jumper',
        listLoading: false,
        total: 0,
        form: {
          name: '',
          page: 1,
          pageSize: 10,
        },
      }
    },

    watch: {
      tabindex: {
        async handler(val) {
          if (val == 1 || val == 12) {
            this.tabsItem = this.tabsList.filter((item) => item.id == val)[0]
          } else if (val == 7) {
            const { data } = await getGoodsGroupList()
            this.tabsItem = data
          } else if (val == 8) {
            const { data } = await getCategoryMainList()
            data.forEach((item) => {
              item.checked = false
            })
            this.tabsItem = data
          } else {
            this.fetchData()
          }
        },
        deep: true,
        immediate: true,
      },
      type: {
        handler(val) {
          if (val == 1) {
            this.title = '选择链接'
          } else if (val == 2) {
            this.title = '选择商品'
          }
        },
        deep: true,
        immediate: true,
      },
    },
    created() {},
    methods: {
      changetype(type) {
        if (type == 1) {
          this.link_tel = !this.link_tel
          this.link_curl = false
          this.formInline.curl = ''
        } else {
          this.link_curl = !this.link_curl
          this.formInline.tel = ''
          this.link_tel = false
        }
      },
      delGoodsClassifyItem(item1) {
        this.tabsItem.forEach((item) => {
          if (item.id == item1.id) {
            item.checked = false
            item.children = []
          }
        })
      },
      async getGoodsClassifyItem(item) {
        item.checked = !item.checked
        if (item.checked) {
          const { data } = await getCategorySonList({ id: item.id })
          this.tabsItem.forEach((item1) => {
            if (item1.id == item.id) {
              item1.children = data.data
            }
          })
          this.$forceUpdate()
        }
      },
      Select(item) {
        if (item == 1) {
          this.close()
          let arr = []
          this.selectList.forEach((item) => {
            let obj = item
            obj.selectName = item.pname + '>' + item.id
            obj.selectTitle = item.shoptitle
            obj.selectUrl = item.url + item.id
            obj.id = item.id
            obj.img = item.img
            obj.type = item.type
            arr.push(obj)
            obj = null
          })
          this.$emit('SelectLink', this.selectList, this.classifyInof)
          // this.$emit('SelectLink', item)
        } else if (item == 2) {
          let temp = {}
          if (this.formInline.tel != '') {
            temp.index = this.index
            temp.selectUrl = this.formInline.tel
            temp.selectName = '打电话'
            temp.link_type = 'tel'
            temp.selectTitle = this.formInline.tel
            this.close()
            this.$emit('SelectLink', temp)
          } else if (this.formInline.curl != '') {
            temp.index = this.index
            temp.selectUrl = this.formInline.curl
            temp.selectName = '自定义'
            temp.link_type = 'curl'
            temp.selectTitle = this.formInline.curl
            this.close()
            this.$emit('SelectLink', temp)
          }
        } else {
          console.log(5555555, item)
          if (this.tabindex == 9) {
            item.selectName = item.pname + '>' + item.id
            item.selectTitle = item.title
            item.selectUrl = item.url + item.id
          } else if (this.tabindex == 10) {
            item.selectName = item.pname + '>' + item.id
            item.selectTitle = item.shoptitle
            item.selectUrl = item.url + item.id
          } else if (this.tabindex == 11) {
            item.selectName = item.pname + '>' + item.id
            item.selectTitle = item.name
            item.selectUrl = item.url + item.id
          } else {
            item.selectName = item.name
            item.selectUrl = item.url
            item.selectTitle = null
          }
          item.index = this.index
          this.close()
          // this.$emit('SelectLink', inof)
          this.$emit('SelectLink', item)
        }
      },
      async handleClick(tab) {
        this.tabsItem = null
        this.tabindex = tab.name
      },
      async showEdit(index, ids, type) {
        this.classifyInof = null
        this.type = null
        this.index = null
        this.tabsList = null
        this.tabsItem = null
        this.tabindex = null
        const { data } = await getTemplateMenuDetail({ pid: ids })
        data.forEach((item) => {
          item.id = item.id.toString()
        })
        this.tabsList = data
        this.tabsItem = data[0]
        this.tabindex = data[0].id
        this.classifyInof = data[0]
        this.type = type
        this.index = index
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      save() {
        this.dialogFormVisible = false
      },
      handleQuery() {
        this.fetchData()
      },
      changeBtnPage(data) {
        this.form.page = data
        this.fetchData()
      },

      changeBtnPageSize(data) {
        this.form.page_size = data
        this.fetchData()
      },
      handleSelectionChange(val) {
        this.selectList = val
      },
      async fetchData() {
        this.listLoading = true
        let temp = {}
        if (this.tabsList != null) {
          temp = this.tabsList.filter((item) => item.id == this.tabindex)[0]
        }
        if (this.tabindex == 9) {
          console.log(787878787, temp)
          const { data } = await getArticleList(this.form)
          data.data.forEach((item) => {
            item.url = temp.url
            item.pname = temp.name
          })
          this.list = data.data
          this.total = data.total
        } else if (this.tabindex == 10) {
          const { data } = await getGoodList(this.form)
          data.data.forEach((item) => {
            item.url = temp.url
            item.pname = temp.name
          })
          this.list = data.data
          this.total = data.total
        } else if (this.tabindex == 11) {
          const { data } = await getTemplateList(this.form)
          data.data.forEach((item) => {
            item.url = temp.url
            item.pname = temp.name
          })
          this.list = data.data
          this.total = data.total
        }

        this.listLoading = false
      },
    },
  }
</script>
