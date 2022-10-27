<template>
  <div>
    <el-form-item label="设置表单：">
      <div style="margin-bottom: 20px">
        <el-button
          v-for="(item, index) in btnList"
          :key="index"
          native-type="submit"
          size="small"
          @click="addDataList(index)"
        >
          {{ item.name }}
        </el-button>
      </div>
      <el-table border :data="tableList">
        <el-table-column label="字段类型" prop="name" width="100" />
        <el-table-column label="字段名称">
          <template #default="{ row }">
            <el-input v-model="row.text" placeholder="请输入字段名称" />
          </template>
        </el-table-column>
        <el-table-column label="字段内容" prop="contentType">
          <template #default="{ row }">
            <el-input
              v-if="row.contentType === 1"
              v-model="row.contentTextList[0].contentText"
              placeholder="请输入提示信息"
            />
            <div v-if="row.contentType === 2">
              <div
                v-for="(item1, index1) in row.contentTextList"
                :key="index1"
                style="display: flex; margin-bottom: 10px"
              >
                <el-input
                  v-model="item1.contentText"
                  placeholder="请输入选项名称"
                  style="margin-right: 10px"
                />
                <el-button v-if="index1 == 0" @click="addcontentTextList(row)">
                  新增
                </el-button>
                <el-button v-else @click="delcontentTextList(row, index1)">
                  删除
                </el-button>
              </div>
            </div>
            <el-input
              v-if="row.contentType === 3"
              v-model="row.contentTime.staTime"
              placeholder="开始时间格，式为：hh:mm"
              style="margin-bottom: 10px"
            />
            <el-input
              v-if="row.contentType === 3"
              v-model="row.contentTime.endTime"
              placeholder="结束时间，格式为：hh:mm"
            />
            <el-input
              v-if="row.contentType === 4"
              v-model="row.contentDate.staDate"
              placeholder="开始时间格，式为：yyyy-MM-dd"
              style="margin-bottom: 10px"
            />
            <el-input
              v-if="row.contentType === 4"
              v-model="row.contentDate.endDate"
              placeholder="结束时间，格式为：yyyy-MM-dd"
            />
          </template>
        </el-table-column>
        <el-table-column label="是否必填" prop="zt" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.zt"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" prop="xx" width="120">
          <template slot-scope="{ row }">
            <el-button type="text" @click="delTableList(row)">删除</el-button>
            <el-button type="text" @click="upTableList(row)">向上</el-button>
            <el-button type="text" @click="downTableList(row)">向下</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    // props: {
    //   list: {
    //     type: Array,
    //     default: () => [],
    //   },
    // },
    data() {
      return {
        btnList: [
          {
            name: '单行输入',
          },
          {
            name: '多行输入',
          },
          {
            name: '单项选择',
          },
          {
            name: '多项选择',
          },
          {
            name: '普通选择',
          },
          {
            name: '时间选择',
          },
          {
            name: '日期选择',
          },
          {
            name: '上穿图片',
          },
        ],
        tableList: [
          {
            name: '单行输入',
            text: '备注',
            contentType: 1,
            contentTextList: [{ contentText: '选填，请输入备注信息' }],
            state: 1,
          },
        ],
      }
    },
    created() {},
    methods: {
      addDataList(index) {
        console.log(21313, index)
        let temp = 0
        if (index === 0 || index === 1 || index === 7) {
          temp = 1
        } else if (index === 2 || index === 3 || index === 4) {
          temp = 2
        } else if (index === 5) {
          temp = 3
        } else {
          temp = 4
        }
        this.tableList.push({
          name: this.btnList[index].name,
          text: '',
          contentType: temp,
          contentTime: { staTime: '00:00', endTime: '23:59' },
          contentDate: { staDate: '1970-01-01', endDate: '2080-01-01' },
          contentTextList: [{ contentText: '' }],
          state: 1,
        })
      },
      addcontentTextList(row) {
        row.contentTextList.push({ contentText: '' })
      },
      delcontentTextList(row, index) {
        row.contentTextList.splice(index, 1)
      },
      delTableList(row) {
        this.tableList.splice(this.tableList.indexOf(row), 1)
      },
      upTableList(row) {
        const index = this.tableList.indexOf(row)
        if (index === 0) {
          this.$baseMessage('到顶了', 'info')
          return
        }
        this.tableList.splice(index - 1, 0, this.tableList.splice(index, 1)[0])
      },
      downTableList(row) {
        const index = this.tableList.indexOf(row)
        if (index === this.tableList.length - 1) {
          this.$baseMessage('到底了', 'info')
          return
        }
        this.tableList.splice(index + 1, 0, this.tableList.splice(index, 1)[0])
      },
    },
  }
</script>
