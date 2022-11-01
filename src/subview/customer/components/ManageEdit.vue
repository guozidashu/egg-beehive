<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form
      ref="form"
      label-width="120px"
      :model="form"
      :rules="rules"
      style="width: 100%"
    >
      <el-form-item label="优惠券名称：">
        <el-input
          v-model="form.addressKeyword"
          clearable
          placeholder="请输入优惠券名称"
          style="margin-bottom: 20px"
        >
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
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
        <el-table-column label="优惠券名称" prop="name" />
        <el-table-column label="优惠券面值" prop="money" width="150" />
        <el-table-column label="优惠券最低消费" prop="num" width="120" />
        <el-table-column label="优惠券有效期限" prop="time" width="120" />
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template #default="{ row }">
            <el-button type="text" @click="handleDelete(row)">发送</el-button>
          </template>
        </el-table-column>
      </template>
    </List>
  </el-dialog>
</template>

<script>
  import List from '@/subview/components/List'
  export default {
    name: 'LevelDeit',
    components: { List },
    data() {
      return {
        form: {
          id: '',
          name: '刘自然',
          type: 1,
          level: 1,
          mobile: '13676668464',
          addr: '备注',
          zzqx: '1',
          province: '浙江省',
          city: '湖州市',
          district: '吴兴区',
          area: '浙江省,湖州市,吴兴区1',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
        title: '',
        dialogFormVisible: false,
        listType: 1,
        list: [
          {
            name: '新人优惠',
            money: '100元',
            time: '20',
            num: '0.00',
          },
          {
            name: '新人优惠',
            money: '100元',
            time: '20',
            num: '0.00',
          },
          {
            name: '新人优惠',
            money: '100元',
            time: '20',
            num: '0.00',
          },
          {
            name: '新人优惠',
            money: '100元',
            time: '20',
            num: '0.00',
          },
          {
            name: '新人优惠',
            money: '100元',
            time: '20',
            num: '0.00',
          },
        ],
        listLoading: false,
        total: 0,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      showEdit() {
        this.title = '发送优惠券'
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        console.log(9090909, data)
        this.form.pageNo = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        console.log(8080080, data)
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getManagementList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
      // 发送
      handleDelete(row) {
        if (row) {
          this.$baseConfirm('你确定要发送当前优惠券吗', null, async () => {
            // const { code } = await addManagementList({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('发送成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
    },
  }
</script>
