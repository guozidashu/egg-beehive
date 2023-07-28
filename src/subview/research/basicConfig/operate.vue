<template>
  <div style="padding: 20px; border-radius: 5px">
    <el-button
      size="small"
      style="margin-bottom: 20px"
      type="primary"
      @click="handleEdit()"
    >
      新增
    </el-button>
    <el-button
      v-if="state == false"
      size="small"
      style="margin-bottom: 20px"
      type="primary"
      @click="state = true"
    >
      编辑
    </el-button>
    <el-button
      v-if="state"
      size="small"
      style="margin-bottom: 20px"
      type="primary"
      @click="save"
    >
      完成
    </el-button>
    <el-table :data="tableData">
      <el-table-column align="right" label="月份" width="150">
        <el-table-column label="成本构成" prop="name" width="150" />
      </el-table-column>
      <el-table-column
        v-for="(col, i) in columnList"
        :key="i"
        align="center"
        :label="col.label"
        :prop="col.prop"
      >
        <template #default="{ row }">
          <div v-if="state == false">
            <div v-if="i == 0">{{ row.January }}</div>
            <div v-else-if="i == 1">{{ row.February }}</div>
            <div v-else-if="i == 2">{{ row.March }}</div>
            <div v-else-if="i == 3">{{ row.April }}</div>
            <div v-else-if="i == 4">{{ row.May }}</div>
            <div v-else-if="i == 5">{{ row.June }}</div>
            <div v-else-if="i == 6">{{ row.July }}</div>
            <div v-else-if="i == 7">{{ row.August }}</div>
            <div v-else-if="i == 8">{{ row.September }}</div>
            <div v-else-if="i == 9">{{ row.October }}</div>
            <div v-else-if="i == 10">{{ row.November }}</div>
            <div v-else-if="i == 11">{{ row.December }}</div>
          </div>
          <div v-else>
            <el-input
              v-if="i == 0"
              v-model="row.January"
              @input="row.January = $moneyFormatInput(row.January)"
            />
            <el-input
              v-else-if="i == 1"
              v-model="row.February"
              @input="row.February = $moneyFormatInput(row.February)"
            />
            <el-input
              v-else-if="i == 2"
              v-model="row.March"
              @input="row.March = $moneyFormatInput(row.March)"
            />
            <el-input
              v-else-if="i == 3"
              v-model="row.April"
              @input="row.April = $moneyFormatInput(row.April)"
            />
            <el-input
              v-else-if="i == 4"
              v-model="row.May"
              @input="row.May = $moneyFormatInput(row.May)"
            />
            <el-input
              v-else-if="i == 5"
              v-model="row.June"
              @input="row.June = $moneyFormatInput(row.June)"
            />
            <el-input
              v-else-if="i == 6"
              v-model="row.July"
              @input="row.July = $moneyFormatInput(row.July)"
            />
            <el-input
              v-else-if="i == 7"
              v-model="row.August"
              @input="row.August = $moneyFormatInput(row.August)"
            />
            <el-input
              v-else-if="i == 8"
              v-model="row.September"
              @input="row.September = $moneyFormatInput(row.September)"
            />
            <el-input
              v-else-if="i == 9"
              v-model="row.October"
              @input="row.October = $moneyFormatInput(row.October)"
            />
            <el-input
              v-else-if="i == 10"
              v-model="row.November"
              @input="row.November = $moneyFormatInput(row.November)"
            />
            <el-input
              v-else-if="i == 11"
              v-model="row.December"
              @input="row.December = $moneyFormatInput(row.December)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="85"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/BasicConfigOperateEdit'
  export default {
    components: { Edit },
    data() {
      return {
        state: false,
        columnList: [
          {
            prop: 'January',
            label: '一月',
          },
          {
            prop: 'February',
            label: '二月',
          },
          {
            prop: 'March',
            label: '三月',
          },
          {
            prop: 'April',
            label: '四月',
          },
          {
            prop: 'May',
            label: '五月',
          },
          {
            prop: 'June',
            label: '六月',
          },
          {
            prop: 'July',
            label: '七月',
          },
          {
            prop: 'August',
            label: '八月',
          },
          {
            prop: 'September',
            label: '九月',
          },
          {
            prop: 'October',
            label: '十月',
          },
          {
            prop: 'November',
            label: '十一月',
          },
          {
            prop: 'December',
            label: '十二月',
          },
        ],
        tableData: [],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 新增编辑弹出
      async handleEdit() {
        this.$refs['edit'].showEdit()
      },
      // 获取列表数据
      async fetchData() {
        const { data } = await this.api.getOperatingCostsList()
        this.tableData = data.list
      },
      async handleDelete(row) {
        const { code } = await this.api.delOperatingCostsDel({ id: row.id })
        if (code == 200) {
          this.$message.success('删除成功')
          this.fetchData()
        }
      },
      async save() {
        let arr = []
        this.tableData.forEach((item) => {
          let obj = {
            id: '',
            name: '',
            month: {},
          }
          obj.id = item.id
          obj.name = item.name
          obj.month.January = item.January
          obj.month.February = item.February
          obj.month.March = item.March
          obj.month.April = item.April
          obj.month.May = item.May
          obj.month.June = item.June
          obj.month.July = item.July
          obj.month.August = item.August
          obj.month.September = item.September
          obj.month.October = item.October
          obj.month.November = item.November
          obj.month.December = item.December
          arr.push(obj)
        })
        const { code } = await this.api.editOperatingCostsUpd({ data: arr })
        if (code == 200) {
          this.$message.success('保存成功')
          this.state = false
          this.fetchData()
        }
      },
    },
  }
</script>
