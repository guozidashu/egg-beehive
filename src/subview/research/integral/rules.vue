<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="selectBtnRows"
      >
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="岗位"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="商品分类大类"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="奖励积分/件"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="淘汰扣除积分/件"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDelete(row)">确认</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  // import { getWaveList, editWave, deleteWave } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    components: { List },
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
        },
        selectRows: [],
        listType: 1,
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
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要确认当前项吗', null, async () => {
            // const { code } = await deleteWave({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('确认成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
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
        // } = await getWaveList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
