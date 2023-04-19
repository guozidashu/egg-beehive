<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 查询条件 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="商品名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <!-- 操作按钮 列表 -->
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:IntegralGoods:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in list" :key="index" :span="6">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{ item.name }}</span>
              <el-button
                v-has-permi="['btn:IntegralGoods:del']"
                style="float: right; padding: 3px"
                type="text"
                @click="handleDelete(item)"
              >
                删除
              </el-button>
              <el-button
                v-has-permi="['btn:IntegralGoods:edit']"
                style="float: right; padding: 3px"
                type="text"
                @click="handleEdit(item)"
              >
                编辑
              </el-button>
            </div>
            <div style="display: flex; justify-content: space-between">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="item.pic"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image
                  :src="item.pic"
                  style="width: 50px; height: 50px; margin: 20px 0 0 20px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
              <div>
                <div style="margin: 5px">积分：{{ item.integral }}</div>
                <div style="margin: 5px">库存：{{ item.stock }}</div>
                <div style="margin: 5px">
                  实际价格：￥{{ item.actual_price | moneyFormat }}
                </div>
                <div style="margin: 5px">
                  状态：
                  <el-tag v-if="item.status == 1">上架</el-tag>
                  <el-tag v-else type="danger">下架</el-tag>
                </div>
                <div style="margin: 5px">时间：{{ item.create_time }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!-- 商品添加弹窗 -->
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/IntegralGoodsEdit'
  export default {
    components: { Edit },
    data() {
      return {
        // 查询表单，表单类型，列表数据
        form: {
          id: 0,
          name: '',
          page: 1,
          pageSize: 100,
        },
        formType: 4,
        list: [],
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
      // 新增编辑弹窗
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await this.api.delIntegralGoodsDel({ id: row.id })
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
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 获取列表数据
      async fetchData() {
        const { data } = await this.api.getIntegralGoodsList(this.form)
        this.list = data.data
      },
    },
  }
</script>
