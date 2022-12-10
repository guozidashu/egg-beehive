<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <el-form ref="form">
        <el-form-item>
          <el-button size="small" type="primary" @click="handleEdit(0)">
            新增模板
          </el-button>
        </el-form-item>
        <div style="display: flex">
          <el-menu
            class="el-menu-vertical-demo"
            default-active="0"
            style="width: 15%"
            @close="handleClose"
            @open="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in menuList"
              :key="index"
              :index="item.id.toString()"
              @click="handleGrouPQuery(item)"
            >
              <div slot="title">
                <span>{{ item.name }}</span>
              </div>
            </el-menu-item>
          </el-menu>
          <div style="width: 20%; margin: 0 10px">
            <el-image
              src="https://img.quanyu.link/FkL2qE-LQsk722tfQeTsA-Px-zec"
              style="height: 100%"
            />
          </div>
          <div style="width: 65%; padding: 20px">
            <div style="margin-bottom: 20px">
              <el-button size="small" type="primary" @click="handleEdit(0)">
                添加模板
              </el-button>
            </div>

            <QYList
              :list="list"
              :list-type="listType"
              :state="listLoading"
              :total="total"
              @changePage="changeBtnPage"
              @changePageSize="changeBtnPageSize"
            >
              <template #List>
                <el-table-column type="selection" width="50" />
                <el-table-column label="ID" prop="id" width="80" />
                <el-table-column label="模板名称" prop="name" width="120" />
                <el-table-column label="创建时间" prop="create_time" />
                <el-table-column label="更新时间" prop="update_time" />
                <el-table-column
                  align="center"
                  label="操作"
                  show-overflow-tooltip
                  width="200"
                >
                  <template #default="{ row }">
                    <el-button type="text" @click="handleEdit(row.id)">
                      编辑
                    </el-button>
                    <el-button type="text" @click="delTemplateDelBtn(row)">
                      删除
                    </el-button>
                    <!-- <el-button type="text" @click="handleEdit(row)">
                      预览
                    </el-button> -->
                    <el-button
                      v-if="row.is_default != 1"
                      type="text"
                      @click="setDefault(row)"
                    >
                      设为首页
                    </el-button>
                  </template>
                </el-table-column>
              </template>
            </QYList>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getTemplateList, delTemplateDel, addTemplateSave } from '@/api/basic'
  export default {
    name: 'DecorateTheme',
    data() {
      return {
        menuList: [
          {
            id: '0',
            name: '商城首页',
            default: true,
            btnIconStatus: false,
          },
        ],
        form: {
          page: 1,
          pageSize: 10,
        },
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler() {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleEdit(item) {
        console.log(1111, item)
        window.open(`#/design?id=${item}`, '_blank')
      },
      setDefault(item) {
        this.$confirm('确定设置为默认模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            let temp = item
            temp.is_default = 1
            addTemplateSave(temp).then(() => {
              this.$message({
                type: 'success',
                message: '设置成功!',
              })
              this.fetchData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消设置',
            })
          })
      },
      delTemplateDelBtn(item) {
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delTemplateDel({ id: item.id }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.fetchData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getTemplateList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss"></style>
