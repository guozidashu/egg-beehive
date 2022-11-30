<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <div style="height: 60vh; overflow: auto">
      <el-tabs v-model="tabindex" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, dex) in tabsList"
          :key="dex"
          :label="item.name"
          :name="item.id"
        />
      </el-tabs>
      <div v-if="tabindex == 1 || tabindex == 12">
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
      <div v-if="tabindex == 7">
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
      <div v-if="tabindex == 8">
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
      <div v-if="tabindex == 9 || tabindex == 10 || tabindex == 11">
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
            <div v-if="tabindex == 9">
              <el-table-column label="文章信息" prop="title" />
              <el-table-column label="ID" prop="id" width="80" />
              <el-table-column label="创建时间" width="150" />
              <el-table-column fixed="right" label="操作" width="80">
                <template #default="{ row }">
                  <el-button type="text" @click="Select(row)">选择</el-button>
                </template>
              </el-table-column>
            </div>
            <div v-if="tabindex == 10">
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
                    <el-image
                      :src="row.img"
                      style="width: 50px; height: 50px"
                    />
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
            </div>
            <div v-if="tabindex == 11">
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
                    <el-image
                      :src="row.img"
                      style="width: 50px; height: 50px"
                    />
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
            </div>
          </template>
        </List>
      </div>
    </div>
    <template #footer>
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
    getTemplateArticleList,
    getGoodList,
    getTemplateList,
  } from '@/api/basic'
  import List from '@/subview/components/List'
  export default {
    name: 'QYSelectLink',
    components: { List },
    data() {
      return {
        index: 0,
        tabindex: '0',
        tabsItem: null,
        tabsList: [],
        title: '选择链接',
        dialogFormVisible: false,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        form: {
          name: '',
          page: 1,
          pageSize: 10,
        },
      }
    },
    created() {},
    methods: {
      delGoodsClassifyItem(item1) {
        console.log(this.tabsItem, item1)
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
        let inof = {}
        if (this.tabindex == 1 || this.tabindex == 12) {
          inof = {
            name: item.url,
            index: this.index,
          }
        } else {
          inof = {
            name:
              this.tabsList.filter((item) => item.id == this.tabindex)[0].url +
              item.id,
            index: this.index,
          }
        }
        this.$emit('SelectLink', inof)
        this.close()
      },
      async handleClick(tab) {
        this.tabsItem = null
        this.tabindex = tab.name
        if (this.tabindex == 1 || this.tabindex == 12) {
          this.tabsItem = this.tabsList.filter((item) => item.id == tab.name)[0]
        } else if (this.tabindex == 7) {
          const { data } = await getGoodsGroupList()
          this.tabsItem = data
        } else if (this.tabindex == 8) {
          const { data } = await getCategoryMainList()
          data.forEach((item) => {
            item.checked = false
          })
          this.tabsItem = data
        } else {
          this.fetchData()
        }
      },
      async showEdit(index) {
        this.index = index
        const { data } = await getTemplateMenuDetail(this.formDialog)
        data.forEach((item) => {
          item.id = item.id.toString()
        })
        this.tabsList = data
        this.tabsItem = data[0]
        this.tabindex = data[0].id
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      save() {
        this.dialogFormVisible = false
        console.log(3213213213)
      },
      handleQuery() {
        this.fetchData()
      },
      changeBtnPage(data) {
        this.form.page = data
      },

      changeBtnPageSize(data) {
        this.form.page_size = data
      },
      async fetchData() {
        this.listLoading = true
        if (this.tabindex == 9) {
          const { data } = await getTemplateArticleList(this.form)
          this.list = data.data
          this.total = data.total
        } else if (this.tabindex == 10) {
          const { data } = await getGoodList(this.form)
          this.list = data.data
          this.total = data.total
        } else if (this.tabindex == 11) {
          const { data } = await getTemplateList(this.form)
          this.list = data.data
          this.total = data.total
        }

        this.listLoading = false
      },
    },
  }
</script>
