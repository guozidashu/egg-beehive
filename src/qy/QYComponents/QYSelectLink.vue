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
            <el-table-column label="操作" width="80">
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
      <div
        v-if="
          (tabindex == 7 ||
            tabindex == 21 ||
            tabindex == 22 ||
            tabindex == 23) &&
          tabsItem != null
        "
      >
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
  export default {
    data() {
      return {
        // tab 索引
        tabindex: '0',
        // tab 数据
        tabsList: [],
        // 自定义链接
        link_curl: false,
        // 自定义电话
        link_tel: false,
        // 自定义电话链接表单
        formInline: {
          tel: '',
          curl: '',
        },
        //页面展示区分 1：选择链接 2：选择商品 商品分组
        type: 1,
        // 选择商品是 选中回传的数据
        selectList: [],
        // 父组件 选择链接是，选择链接的对象的索引
        index: 0,
        // 选中tab 后 页面展示的数据
        tabsItem: null,
        // 页面展示 标题1：选择链接 2：选择商品 商品分组
        title: '选择链接',
        // 页面是否展示
        dialogFormVisible: false,
        // 列表 和表单相关数据
        list: [],
        layout: 'total, sizes, prev, pager, next, jumper',
        listLoading: false,
        total: 0,
        form: {
          name: '',
          page: 1,
          pageSize: 10,
          status: 1,
        },
      }
    },

    watch: {
      // 对 tab 监听 给 this.tabsItem 赋值
      tabindex: {
        async handler(val) {
          let temp = {}
          if (this.tabsList != null) {
            temp = this.tabsList.filter((item) => item.id == val)[0]
          }
          if (val == 1 || val == 12) {
            this.tabsItem = this.tabsList.filter((item) => item.id == val)[0]
          } else if (val == 7) {
            const { data } = await this.api.getGoodsGroupList()
            data.forEach((item) => {
              item.url = temp.url
              item.pname = temp.name
            })
            this.tabsItem = data
          } else if (val == 21) {
            const { data } = await this.api.getCommonAllList({
              type: 'brand',
            })
            data.brand.forEach((item) => {
              item.url = temp.url
              item.pname = temp.name
            })
            this.tabsItem = data.brand
          } else if (val == 22) {
            const { data } = await this.api.getCommonAllList({
              type: 'year',
            })
            data.year.forEach((item) => {
              item.url = temp.url
              item.pname = temp.name
            })
            this.tabsItem = data.year
          } else if (val == 23) {
            const { data } = await this.api.getCommonAllList({
              type: 'season',
            })
            data.season.forEach((item) => {
              item.url = temp.url
              item.pname = temp.name
            })
            this.tabsItem = data.season
          } else if (val == 8) {
            const { data } = await this.api.getCategoryMainList()
            data.forEach((item) => {
              item.checked = false
              item.url = temp.url
              item.pname = temp.name
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
    methods: {
      // 功能 - 功能卡片选择 自定义链接 ，打电话
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
      // 商品分类 父级关闭
      delGoodsClassifyItem(item1) {
        this.tabsItem.forEach((item) => {
          if (item.id == item1.id) {
            item.checked = false
            item.children = []
          }
        })
      },
      // 商品分类 父级展开
      async getGoodsClassifyItem(item) {
        item.checked = !item.checked
        if (item.checked) {
          const { data } = await this.api.getCategorySonList({ id: item.id })
          data.data.forEach((item1) => {
            item1.url = item.url
            item1.pname = item.name
          })
          this.tabsItem.forEach((item1) => {
            if (item1.id == item.id) {
              item1.children = data.data
            }
          })
          this.$forceUpdate()
        }
      },
      // 全部类型提交回传 type 1商品组选择商品 ，2 自定义链接 打电话 ，其他值 选择链接
      Select(item) {
        if (item == 1) {
          this.close()
          this.$emit('SelectLink', this.selectList)
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
          } else if (
            this.tabindex == 7 ||
            this.tabindex == 21 ||
            this.tabindex == 22 ||
            this.tabindex == 23
          ) {
            item.selectName = item.name
            item.selectUrl = item.url + item.id
            item.selectTitle = null
          } else if (this.tabindex == 8) {
            if (item.pid_name != undefined) {
              item.selectName = item.pid_name + '>' + item.name
            } else {
              item.selectName = item.name
            }
            item.link_type = 'tab'
            item.selectUrl = item.url + '=' + item.id
            item.selectTitle = null
          } else {
            item.selectName = item.name
            item.selectUrl = item.url
            item.selectTitle = null
          }
          item.index = this.index
          this.close()
          this.$emit('SelectLink', item)
        }
      },
      // 切换 tab
      async handleClick(tab) {
        this.tabsItem = null
        this.tabindex = tab.name
      },
      // 选择弹窗打卡 index 父级索引，ids tab数组，type页面展示区分 1：选择链接 2：选择商品 商品分组
      async showEdit(index, ids, type) {
        this.type = null
        this.index = null
        this.tabsList = null
        this.tabsItem = null
        this.tabindex = null
        const { data } = await this.api.getTemplateMenuDetail({ pid: ids })
        data.forEach((item) => {
          item.id = item.id.toString()
        })
        this.tabsList = data
        this.tabsItem = data[0]
        this.tabindex = data[0].id
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
        this.form.page = 1
        this.form.pageSize = 10
        this.fetchData()
      },
      changeBtnPage(data) {
        this.form.page = data
        this.fetchData()
      },

      changeBtnPageSize(data) {
        this.form.pageSize = data
        this.fetchData()
      },
      // 选择商品 时 表格选中数据
      handleSelectionChange(val) {
        this.selectList = val
      },
      // 商品详情表格 获取时 过滤聚水潭商品
      async getConfigState() {
        const { data } = await this.api.getConfig({ key: 'jst_api_open' })
        return data
      },
      // 表格刷新
      async fetchData() {
        this.listLoading = true
        let temp = {}
        if (this.tabsList != null) {
          temp = this.tabsList.filter((item) => item.id == this.tabindex)[0]
        }
        if (this.tabindex == 9) {
          const { data } = await this.api.getArticleList(this.form)
          data.data.forEach((item) => {
            item.url = temp.url
            item.pname = temp.name
          })
          this.list = data.data
          this.total = data.total
        } else if (this.tabindex == 10) {
          let temp1 = await this.getConfigState()
          if (temp1 == 1) {
            this.form.is_shop = 1
            this.form.list_type = 7
          }
          const { data } = await this.api.getGoodList(this.form)
          data.data.forEach((item) => {
            item.url = temp.url
            item.pname = temp.name
          })
          this.list = data.data
          this.total = data.total
        } else if (this.tabindex == 11) {
          const { data } = await this.api.getTemplateList(this.form)
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
