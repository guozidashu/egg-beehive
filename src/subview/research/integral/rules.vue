<template>
  <div>
    <!-- 转化后 -->
    <div style="padding: 20px">
      <el-radio-group v-model="type">
        <el-radio-button label="reward" />
        <el-radio-button label="deduction" />
      </el-radio-group>
      <el-button
        native-type="submit"
        size="small"
        style="margin-left: 20px"
        type="primary"
      >
        提交
      </el-button>
    </div>
    <el-table border :data="transData">
      <el-table-column
        v-for="(item, index) in transTitle"
        :key="index"
        align="center"
        :label="item"
      >
        <template slot-scope="scope">
          <el-input
            v-if="Number(scope.row[index])"
            v-model="scope.row[index]"
          />
          <span v-else>{{ scope.row[index] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getIntegralRule } from '@/api/basic'
  export default {
    data() {
      return {
        form: {
          type: 'reward',
        },
        type: 'reward',
        // originData 为后端原始正常的数据, 此数据按正常表格展示 一行一行的数据
        // 保证数组里每一个对象中的字段顺序, 从上到下 一次对应显示表格中的从左到右
        originData: [
          // 属性名对应 transTitle的属性 值对应奖惩的数值
          {
            type: '5',
            num: '5',
            average: '5',
          },
          {
            type: '5',
            num: '5',
            average: '5',
          },
          {
            type: '5',
            num: '5',
            average: '5',
          },
        ],
        originTitle: ['分类一', '分类2', '分类3'], // 竖列 标题
        transTitle: ['', '岗位', '版市', '设计师'], // 横列 标题
        transData: [],
      }
    },
    watch: {
      type: {
        handler: function (newVal) {
          console.log(newVal)
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      // 数组按矩阵思路, 变成转置矩阵
      let matrixData = this.originData.map((row) => {
        let arr = []
        for (let key in row) {
          arr.push(row[key])
        }
        return arr
      })
      console.log(matrixData)
      // 加入标题拼接最终的数据
      this.transData = matrixData[0].map((col, i) => {
        return [
          this.originTitle[i],
          ...matrixData.map((row) => {
            return row[i]
          }),
        ]
      })
      console.log(this.transData)
    },
    methods: {
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getIntegralRule(this.form)
        console.log(data)
        // this.list = data.data
        // this.total = data.total
        // this.listLoading = false
      },
    },
  }
</script>
