<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <el-card
          shadow="never"
          style="height: 100%; min-height: calc(80vh); border: 0"
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
                        <el-button type="text" @click="handleEdit(item, 2)">
                          编辑
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button type="text" @click="handleDelete(item, 2)">
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
                native-type="submit"
                size="small"
                type="primary"
                @click="handleEdit('add', 2)"
              >
                添加分组
              </el-button>
              <el-button
                native-type="submit"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                新增商品到分组
              </el-button>
            </el-form-item>
            <!-- <el-form-item label="款式名称：" style="float: right">
              <el-input
                v-model="form.name"
                clearable
                placeholder="请输入款式名称"
              />
            </el-form-item> -->
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
                  <el-tag v-if="row.status == 0" type="danger">下架</el-tag>
                  <el-tag v-else-if="row.status == 1">上架</el-tag>
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
  import Edit from './components/CommodityUnitEdit'
  import {
    getGoodsGroupList,
    getGoodsGroupDetail,
    // delCategorySonDel,
    delGoodsGroupDel,
  } from '@/api/basic'
  export default {
    name: 'CustomerTags',
    components: { Edit },
    data() {
      return {
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
      handleDelete(row, type) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            if (type == 1) {
              // const { code } = await delCategorySonDel({ id: row.id })
              // if (code != 200) {
              //   return
              // }
            } else {
              const { code } = await delGoodsGroupDel({ id: row.id })
              if (code != 200) {
                return
              }
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
        const { data } = await getGoodsGroupList(this.form)
        let list = data
        list.forEach((item) => {
          item.btnIconStatus = false
        })
        this.menuList = list
        this.fetchList(data[0].id)
      },
      async fetchList(temp) {
        const {
          data: { data, total },
        } = await getGoodsGroupDetail({ id: temp })
        this.list = data
        this.total = total
        // this.listLoading = false
      },
      handleGrouPQuery(id) {
        this.form.id = id
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
