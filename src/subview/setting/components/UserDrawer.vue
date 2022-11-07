<template>
  <div style="padding: 20px">
    <div>
      <p style="font-size: 16px; font-weight: 600">管理员权限</p>
      <p>设置角色对应的后台管理权限以及功能操作</p>
    </div>
    <el-form ref="ruleForm" :model="formData">
      <el-table
        v-loading="listLoading"
        border
        :data="list"
        :span-method="objectSpanMethod"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column label="一级">
          <template slot="header">
            <el-checkbox v-model="formData[0]">全选</el-checkbox>
          </template>

          <template slot-scope="scope">
            <el-checkbox
              v-model="formData[scope.row.Oneid]"
              @change="checkChange(scope.row, formData[scope.row.Oneid], 1)"
            >
              {{ scope.row.OneName }}
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="二级">
          <template #default="{ row }">
            <el-checkbox
              v-model="formData[row.Twoid]"
              @change="checkChange(row, formData[row.Twoid], 2)"
            >
              {{ row.TwoName }}
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="三级">
          <template #default="{ row }">
            <div v-if="row.ppid">
              <el-checkbox
                v-model="formData[row.id]"
                @change="checkChange(row, formData[row.id], 3)"
              >
                {{ row.title }}
              </el-checkbox>
            </div>
            <div v-else>无三级菜单</div>
          </template>
        </el-table-column>
        <el-table-column label="功能" prop="gongneng">
          <template #default="{ row }">
            <el-checkbox
              v-for="(item, index) in row.guard"
              :key="index"
              v-model="formData[item.id]"
              @change="checkChange(row, formData[item.id], 4)"
            >
              {{ item.title }}
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
      <el-button type="primary" @click="submitRole">确定</el-button>
    </div>
  </div>
</template>

<script>
  import { getRoleInfo, addRoleSave } from '@/api/basic'
  export default {
    name: 'Dashboard',
    props: {
      drawerId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        listLoading: false,
        list: [],
        id: this.drawerId,
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
      this.fetchData()
    },
    mounted() {},
    methods: {
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getRoleInfo({ id: this.id })
        const arr = []
        const fn = (data) => {
          data.forEach((item) => {
            if (item.checked) {
              this.formData[item.id] = true
              if (item.guard != 0) {
                item.guard.forEach((item2) => {
                  if (item2.checked) {
                    this.formData[item2.id] = true
                  }
                })
              }
            }
            if (item.children.length == 0) {
              if (item.ppid) {
                item.Oneid = item.ppid
                item.Twoid = item.pid
                item.OneName = item.ppname
                item.TwoName = item.pname
              } else {
                item.Oneid = item.pid
                item.Twoid = item.id
                item.OneName = item.pname
                item.TwoName = item.title
              }
              arr.push(item)
            }
            if (item.children) {
              fn(item.children)
            }
          })
        }
        fn(data.list)
        this.list = arr
        this.listLoading = false
        this.getSpanArr(this.list)
      },

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
          const _row1 = this.spanArr2[rowIndex]
          const _col1 = _row1 > 0 ? 1 : 0
          return {
            // [0,0] 表示这一行不显示， [2,1]表示行的合并数
            rowspan: _row1,
            colspan: _col1,
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
            if (data[i].Oneid === data[i - 1].Oneid) {
              //如果相等，则向spanArr中添入元素0，并将前一位元素＋１，表示合并行数＋１
              this.spanArr[this.pos] += 1
              this.spanArr.push(0)
            } else {
              this.spanArr.push(1)
              this.pos = i
            }
            if (
              data[i].Oneid === data[i - 1].Oneid &&
              data[i].Twoid === data[i - 1].Twoid
            ) {
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
      async submitRole() {
        let list = []

        Object.keys(this.formData).map((item) => {
          list.push(Number(item))
        })
        const { data } = await addRoleSave({ id: this.id, auth: list })
        console.log(data)
      },
      // 多选框选中效果
      checkChange(row, checked, type) {
        if (type === 1) {
          console.log(row, checked, type)
          this.list.forEach((item) => {
            if (row.Oneid == item.Oneid) {
              this.formData[item.Oneid] = checked
              this.formData[item.Twoid] = checked
              this.formData[item.id] = checked
              item.guard.forEach((item1) => {
                this.formData[item1.id] = checked
              })
            }
          })
        } else if (type === 2) {
          console.log(row, checked, type)
          let temp = false
          this.list.forEach((item) => {
            if (row.Twoid == item.Twoid) {
              this.formData[item.id] = checked
              item.guard.forEach((item1) => {
                this.formData[item1.id] = checked
              })
            }
            if (row.Oneid == item.Oneid) {
              if (this.formData[item.Twoid]) {
                temp = true
                return
              }
            }
          })
          this.formData[row.Oneid] = temp
        } else if (type === 3) {
          console.log(row, checked, type)
          let temp = false
          this.list.forEach((item) => {
            if (row.id == item.id) {
              item.guard.forEach((item1) => {
                this.formData[item1.id] = checked
              })
            }
            if (row.Twoid == item.Twoid) {
              if (this.formData[item.id]) {
                temp = true
                return
              }
            }
          })
          this.formData[row.Twoid] = temp
          let temp1 = false
          this.list.forEach((item) => {
            if (row.Oneid == item.Oneid) {
              if (this.formData[item.Twoid]) {
                temp1 = true
                return
              }
            }
          })
          this.formData[row.Oneid] = temp1
        } else if (type === 4) {
          console.log(row, checked, type)
          if (checked) {
            this.formData[row.Oneid] = checked
            this.formData[row.Twoid] = checked
            this.formData[row.id] = checked
          } else {
            let temp = false
            row.guard.forEach((item1) => {
              if (this.formData[item1.id]) {
                temp = true
                return
              }
            })
            if (!temp) {
              this.formData[row.id] = false
            }
            let temp2 = false
            this.list.forEach((item) => {
              if (row.Twoid == item.Twoid) {
                if (this.formData[item.id]) {
                  temp2 = true
                  return
                }
              }
            })
            if (!temp2) {
              this.formData[row.Twoid] = false
            }
            let temp1 = false
            this.list.forEach((item) => {
              if (row.Oneid == item.Oneid) {
                if (this.formData[item.Twoid]) {
                  temp1 = true
                  return
                }
              }
            })
            if (!temp1) {
              this.formData[row.Oneid] = false
            }
          }
        }
        this.$forceUpdate()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
