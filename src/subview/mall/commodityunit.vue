<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <!-- 父级列表 -->
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <el-card
          shadow="never"
          style="
            min-height: calc(73vh);
            overflow: auto;
            border: 0;
            border-radius: 5px;
          "
        >
          <el-menu
            v-if="menuList.length > 0"
            class="el-menu-vertical-demo"
            :default-active="menuList[0].id.toString()"
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
                      <i v-if="item.btnIconStatus" class="el-icon-menu"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button
                          v-has-permi="['btn:MallCommodityunit:edit']"
                          type="text"
                          @click="handleEdit(item, 2)"
                        >
                          编辑
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          v-has-permi="['btn:MallCommodityunit:del']"
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
      <!-- 子级列表和操作按钮 -->
      <el-col :lg="18" :md="16" :sm="24" :xl="20" :xs="24">
        <el-card shadow="never" style="border: 0; border-radius: 5px">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button
                v-has-permi="['btn:MallCommodityunit:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 2)"
              >
                添加分组
              </el-button>
              <el-button
                v-has-permi="['btn:MallCommodityunit:add']"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                新增商品到分组
              </el-button>
              <el-button size="small" type="primary" @click="handleDel()">
                移除商品
              </el-button>
            </el-form-item>
          </el-form>
          <QYList
            :list="list"
            :list-type="listType"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
            @selectRows="handleSelectionChange"
          >
            <template #List>
              <el-table-column type="selection" />
              <el-table-column label="ID" prop="id" />
              <el-table-column label="商品名称" prop="goods_name" />
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
              <el-table-column label="商品标题" prop="shoptitle" />
              <el-table-column label="商品编号" prop="sn" />
              <el-table-column
                align="right"
                label="商品价格"
                prop="price"
                width="150"
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="状态" prop="status" width="150">
                <template #default="{ row }">
                  <el-tag v-if="row.is_shop == 1">上架</el-tag>
                  <el-tag v-else type="danger">下架</el-tag>
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
  import Edit from '@/subview/components/Edit/CommodityUnitEdit'
  export default {
    name: 'GoodsCommodityunit',
    components: { Edit },
    data() {
      return {
        // 选中数据，页数，条数，表单查询条件 ，父级数据，表单组件和列表组件的类型，子级列表数据，列表加载状态，列表总数
        selectRowsId: [],
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
      // 监听表单数据变化，变化时重新请求列表数据
      form: {
        handler: function (val) {
          this.fetchList(val.id)
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 列表选中
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      // 移除商品
      handleDel() {
        if (this.selectRowsId.length > 0) {
          this.$baseConfirm('你确定要移除当前项吗', null, async () => {
            const { code } = await this.api.delGroupGoods({
              goods_id: this.selectRowsId.map((item) => item.goods_id),
              group_id: this.form.id,
            })
            if (code != 200) {
              return
            } else {
              this.$baseMessage('移除成功', 'success')
            }
            this.fetchData()
          })
        } else {
          this.$baseMessage('请选择要移除的商品', 'warning')
        }
      },
      // 新增编辑父级，添加商品到分组
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
      // 查询
      handleQuery() {
        this.form.page = 1
      },
      // 删除分组
      handleDelete(row, type) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            if (type == 1) {
              // const { code } = await this.api.delCategorySonDel({ id: row.id })
              // if (code != 200) {
              //   return
              // }
            } else {
              const { code } = await this.api.delGoodsGroupDel({ id: row.id })
              if (code != 200) {
                return
              }
            }

            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 分页
      changeBtnPage(data) {
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 父级列表
      async fetchData() {
        const { data } = await this.api.getGoodsGroupList(this.form)
        let list = data
        list.forEach((item) => {
          item.btnIconStatus = false
        })
        this.menuList = list
        this.menuList[0].btnIconStatus = true

        this.fetchList(data[0].id)
      },
      // 子级列表
      async fetchList(temp) {
        this.form.id = temp
        const {
          data: { data, total },
        } = await this.api.getGoodsGroupDetail({
          id: temp,
          page: this.form.page,
          pageSize: this.form.pageSize,
        })
        this.list = data
        this.total = total
        // this.listLoading = false
      },
      // 父级点击
      handleGrouPQuery(id, index) {
        this.form.id = id
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
