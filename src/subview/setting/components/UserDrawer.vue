<template>
  <div style="padding: 20px">
    <div>
      <p style="font-size: 16px; font-weight: 600">管理员权限</p>
      <p>设置角色对应的后台管理权限以及功能操作</p>
    </div>
    <el-form ref="ruleForm" :model="formData">
      <el-table
        border
        :data="tableData"
        :span-method="objectSpanMethod"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column label="一级">
          <template slot="header">
            <el-checkbox
              v-model="formData[0]"
              @change="checkChange(0, null, 0)"
            >
              全选
            </el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox
              v-model="formData[scope.row.yijiid]"
              @change="checkChange(scope.row.yijiid, scope.row, 1)"
            >
              {{ scope.row.yiji }}
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="二级" prop="erji">
          <template #default="{ row }">
            <el-checkbox
              v-model="formData[row.erjiid]"
              @change="checkChange(row.erjiid, row, 2)"
            >
              {{ row.erji }}
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="三级" prop="sanji">
          <template #default="{ row }">
            <el-checkbox
              v-if="row.sanji"
              v-model="formData[row.sanjiid]"
              @change="checkChange(row.sanjiid, row, 3)"
            >
              {{ row.sanji }}
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="功能" prop="gongneng">
          <template #default="{ row }">
            <el-checkbox
              v-for="(item, index) in row.gongneng"
              :key="index"
              v-model="formData[item.gongnengid]"
              @change="checkChange(item.gongnengid, row, 4)"
            >
              {{ item.gongnnegname }}
            </el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div
      style="
        position: fixed;
        bottom: 0;
        z-index: 999;
        width: 100%;
        padding: 20px 0;
        background-color: white;
      "
    >
      <el-button>取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        quanxuan: true,
        formData: {},
        tableData: [
          {
            yiji: '首页',
            erji: '首页',
            yijiid: 1,
            erjiid: 2,
            gongneng: [
              { gongnnegname: '功能一', gongnengid: 3 },
              { gongnnegname: '功能二', gongnengid: 4 },
            ],
          },
          {
            yiji: '系统设置',
            erji: '员工管理',
            yijiid: 5,
            erjiid: 6,
            gongneng: [
              { gongnnegname: '功能一', gongnengid: 7 },
              { gongnnegname: '功能二', gongnengid: 8 },
            ],
          },
          {
            yiji: '系统设置',
            erji: '角色管理',
            yijiid: 5,
            erjiid: 9,
            gongneng: [
              { gongnnegname: '功能一', gongnengid: 10 },
              { gongnnegname: '功能二', gongnengid: 11 },
            ],
          },
          {
            yiji: '系统设置',
            erji: '用户管理',
            yijiid: 5,
            erjiid: 12,
            gongneng: [
              { gongnnegname: '功能一', gongnengid: 13 },
              { gongnnegname: '功能二', gongnengid: 14 },
            ],
          },
          {
            yiji: '系统设置',
            erji: '渠道管理',
            sanji: '微信',
            yijiid: 5,
            erjiid: 15,
            sanjiid: 16,
            gongneng: [
              { gongnnegname: '功能一', gongnengid: 17 },
              { gongnnegname: '功能二', gongnengid: 18 },
            ],
          },
          {
            yiji: '系统设置',
            erji: '渠道管理',
            sanji: '支付宝',
            yijiid: 5,
            erjiid: 15,
            sanjiid: 19,
            gongneng: [
              { gongnnegname: '功能一', gongnengid: 20 },
              { gongnnegname: '功能二', gongnengid: 21 },
            ],
          },
        ],
        spanArr: [], //一个空的数组，用于存放每一行记录的合并数
        pos: '', //pos是spanArr的索引,需要合并行下标
        spanArr2: [],
        pos2: '',
      }
    },
    created() {
      this.getSpanArr(this.tableData)
    },
    mounted() {},
    methods: {
      objectSpanMethod({ rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            // [0,0] 表示这一行不显示， [2,1]表示行的合并数
            rowspan: _row,
            colspan: _col,
          }
        } else if (columnIndex === 1) {
          const _row = this.spanArr2[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            // [0,0] 表示这一行不显示， [2,1]表示行的合并数
            rowspan: _row,
            colspan: _col,
          }
        }
      },

      getSpanArr(data) {
        // data就是我们从后台拿到的数据
        for (let i = 0; i < data.length; i++) {
          //如果是第一条记录（索引为０），向数组中加入１，并设置索引位置
          if (i === 0) {
            this.spanArr.push(1)
            this.pos = 0 //spanArr的索引

            this.spanArr2.push(1)
            this.pos2 = 0
          } else {
            //如果不是第一条记录，则判断它与前一条记录是否相等
            //根据相同 扣分类别名称 进行合并,根据需要可进行修改
            if (data[i].yiji === data[i - 1].yiji) {
              //如果相等，则向spanArr中添入元素0，并将前一位元素＋１，表示合并行数＋１
              this.spanArr[this.pos] += 1
              this.spanArr.push(0)
            } else {
              this.spanArr.push(1)
              this.pos = i
            }

            if (data[i].erji === data[i - 1].erji) {
              //如果相等，则向spanArr中添入元素0，并将前一位元素＋１，表示合并行数＋１
              this.spanArr2[this.pos2] += 1
              this.spanArr2.push(0)
            } else {
              this.spanArr2.push(1)
              this.pos2 = i
            }
          }
        }
      },
      // 提交选中内容
      submit() {},
      // 多选框选中效果
      checkChange(id, row, type) {
        if (type === 0) {
          this.tableData.forEach((item) => {
            this.formData[item.yijiid] = this.formData[id]
            this.formData[item.erjiid] = this.formData[id]
            this.formData[item.sanjiid] = this.formData[id]
            item.gongneng.forEach((item1) => {
              this.formData[item1.gongnengid] = this.formData[id]
            })
          })
        } else if (type === 1) {
          if (this.formData[id]) {
            this.tableData.forEach((item) => {
              if (item.yijiid === id) {
                this.formData[item.erjiid] = true
                this.formData[item.sanjiid] = true
                item.gongneng.forEach((item1) => {
                  this.formData[item1.gongnengid] = true
                })
              }
            })
          } else {
            this.tableData.forEach((item) => {
              if (item.yijiid === id) {
                this.formData[item.erjiid] = false
                this.formData[item.sanjiid] = false
                item.gongneng.forEach((item1) => {
                  this.formData[item1.gongnengid] = false
                })
              }
            })
          }
        } else if (type === 2) {
          let flag = false
          this.tableData.forEach((item) => {
            if (item.yijiid === row.yijiid && this.formData[item.erjiid]) {
              flag = true
              return
            }
          })
          this.formData[row.yijiid] = flag
          if (this.formData[id]) {
            this.tableData.forEach((item) => {
              if (item.erjiid === id) {
                this.formData[item.sanjiid] = true
                item.gongneng.forEach((item1) => {
                  this.formData[item1.gongnengid] = true
                })
              }
            })
          } else {
            this.tableData.forEach((item) => {
              if (item.erjiid === id) {
                this.formData[item.sanjiid] = false
                item.gongneng.forEach((item1) => {
                  this.formData[item1.gongnengid] = false
                })
              }
            })
          }
        } else if (type === 3) {
          if (this.formData[id]) {
            this.formData[row.erjiid] = true
            this.formData[row.yijiid] = true
            row.gongneng.forEach((item1) => {
              this.formData[item1.gongnengid] = true
            })
          } else {
            row.gongneng.forEach((item1) => {
              this.formData[item1.gongnengid] = false
            })
            let flag = false
            this.tableData.forEach((item) => {
              if (row.erjiid === item.erjiid && this.formData[item.sanjiid]) {
                flag = true
              }
            })
            this.formData[row.erjiid] = flag
            let flag1 = false
            this.tableData.forEach((item) => {
              if (row.yijiid === item.yijiid && this.formData[item.erjiid]) {
                flag1 = true
              }
            })
            this.formData[row.yijiid] = flag1
          }
        } else if (type === 4) {
          if (this.formData[id]) {
            this.formData[row.sanjiid] = true
            this.formData[row.erjiid] = true
            this.formData[row.yijiid] = true
          } else {
            this.formData[row.sanjiid] = false
            let flag = false
            row.gongneng.forEach((item1) => {
              if (this.formData[item1.gongnengid]) {
                flag = true
              }
            })
            this.formData[row.sanjiid] = flag
            let flag1 = false
            this.tableData.forEach((item) => {
              if (item.erjiid === row.erjiid) {
                if (this.formData[item.sanjiid]) {
                  flag1 = true
                }
              }
            })
            this.formData[row.erjiid] = flag1
            this.formData[row.yijiid] = flag1
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
