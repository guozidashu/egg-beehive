<template>
  <div>
    <div style="padding: 20px 0 0 20px">
      <el-form
        ref="form"
        :inline="true"
        label-width="100px"
        :model="form"
        style="clear: both"
        @submit.native.prevent
      >
        <el-form-item>
          <el-radio-group v-model="form.typeName">
            <el-radio-button label="奖励" />
            <el-radio-button label="淘汰" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="供应商类别:">
          <el-select v-model="form.category_id">
            <el-option
              v-for="item in parent_category"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleSub"
          >
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="listLoading" border :data="transData">
      <el-table-column
        v-for="(item, index) in transTitle"
        :key="index"
        align="center"
        :label="item"
      >
        <template slot-scope="scope">
          <el-input
            v-if="typeof scope.row[index] === 'object'"
            v-model="scope.row[index].value"
          />
          <span v-else>{{ scope.row[index] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getIntegralRule,
    editIntegralRuleSave,
    getCommonAllList,
  } from '@/api/basic'
  export default {
    data() {
      return {
        form: {
          type: 'reward',
          category_id: '',
          typeName: '奖励',
        },
        listLoading: false,
        parent_category: [],
        // originData 为后端原始正常的数据, 此数据按正常表格展示 一行一行的数据
        // 保证数组里每一个对象中的字段顺序, 从上到下 一次对应显示表格中的从左到右
        originData: [], // 属性名对应 transTitle的属性 值对应奖惩的数值
        originTitle: [], // 竖列 标题
        transTitle: [], // 横列 标题
        transData: [],
      }
    },
    watch: {
      form: {
        handler: function (newVal) {
          if (newVal.typeName == '奖励') {
            this.form.type = 'reward'
          } else {
            this.form.type = 'deduction'
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getSelectData()
    },
    methods: {
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getIntegralRule(this.form)
        this.list = data
        this.total = data.total
        this.listLoading = false
        let arr = []
        let arr1 = []
        let arr2 = ['']
        let arr3 = []
        for (let i in data) {
          arr.push(data[i])
          arr1.push(i)
        }
        arr[0].forEach((item) => {
          arr2.push(item.name)
        })
        arr.forEach((item) => {
          let obj = {}
          for (var key in item) {
            obj[key] = item[key]
          }
          arr3.push(obj)
          obj = {}
        })
        this.originData = arr3
        this.transTitle = arr2
        this.originTitle = Object.values(arr1)
        this.datazh()
      },
      datazh() {
        // 数组按矩阵思路, 变成转置矩阵
        let matrixData = this.originData.map((row) => {
          let arr = []
          for (let key in row) {
            arr.push(row[key])
          }
          return arr
        })
        // 加入标题拼接最终的数据
        let arr1 = []
        arr1 = matrixData.map((col, i) => {
          return [this.originTitle[i], ...matrixData[i]]
        })
        this.transData = arr1
        this.listLoading = false
      },
      async handleSub() {
        let arr = []
        this.transData.forEach((item) => {
          item.forEach((item1) => {
            if (typeof item1 === 'object') {
              delete item1.name
              item1.type = this.form.type
              arr.push(item1)
            }
          })
        })
        const { code } = await editIntegralRuleSave(arr)
        if (code != 200) {
          return
        }
        this.$baseMessage('编辑成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
      async getSelectData() {
        const { data } = await getCommonAllList({ type: 'parent_category' })
        this.parent_category = data.parent_category
      },
    },
  }
</script>
