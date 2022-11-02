<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col :lg="6" :md="8" :sm="24" :xl="4" :xs="24">
        <el-card
          shadow="never"
          style="height: 100%; min-height: calc(80vh); border: 0"
        >
          <el-menu
            class="el-menu-vertical-demo"
            default-active="0"
            style="width: 100%; border: 0"
            @close="handleClose"
            @open="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in menuList"
              :key="index"
              :index="item.id"
            >
              <div
                @mouseenter="mouseOver(index)"
                @mouseleave="mouseLeave(index)"
              >
                <div slot="title">
                  <span @click="handleGrouPQuery(item)">{{ item.name }}</span>
                  <el-dropdown style="float: right" trigger="click">
                    <span class="el-dropdown-link">
                      <i
                        v-if="item.btnIconStatus && item.id != '0'"
                        class="el-icon-menu"
                      ></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <span @click="handleEdit(item, 2)">编辑</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="handleDelete(item, 2)">删除</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :lg="18" :md="16" :sm="24" :xl="20" :xs="24">
        <el-card shadow="never" style="border: 0">
          <el-form ref="form" :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-button
                native-type="submit"
                size="small"
                type="primary"
                @click="handleEdit('add', 1)"
              >
                添加标签
              </el-button>
              <el-button
                native-type="submit"
                size="small"
                type="primary"
                @click="handleEdit('add', 2)"
              >
                添加分类
              </el-button>
              <el-button native-type="submit" size="small" type="primary">
                同步企业微信标签
              </el-button>
            </el-form-item>
            <el-form-item label="标签名称：" style="float: right">
              <el-input
                v-model="addressKeyword"
                clearable
                placeholder="请输入标签名称"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getAddressKeyword"
                />
              </el-input>
            </el-form-item>
          </el-form>
          <List
            :list="list1"
            :list-type="listType"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
            @selectRows="selectBtnRows"
          >
            <!-- 表格组件具名插槽 自定义表头 -->
            <template #List>
              <el-table-column type="selection" />
              <el-table-column label="ID" prop="id" sortable />
              <el-table-column label="标签名称" prop="name" />
              <el-table-column label="标签分类" prop="zhekou" />
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="85"
              >
                <template #default="{ row }">
                  <el-button type="text" @click="handleEdit(row, 1)">
                    编辑
                  </el-button>
                  <el-button type="text" @click="handleDelete(row, 1)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </List>
        </el-card>
      </el-col>
    </el-row>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Edit from './components/TagsEdit'
  // import { getGradeList, editGrade, deleteGrade } from '@/api/basic'
  export default {
    name: 'CustomerTags',
    components: { List, Edit },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          name: '',
          pageNo: 1,
          pageSize: 20,
        },
        menuList: [
          {
            id: '0',
            name: '全部',
            btnIconStatus: false,
          },
          {
            id: '1',
            name: '销售渠道',
            btnIconStatus: false,
          },
          {
            id: '2',
            name: '客户来源',
            btnIconStatus: false,
          },
          {
            id: '3',
            name: '年龄区间',
            btnIconStatus: false,
          },
          {
            id: '4',
            name: '星座',
            btnIconStatus: false,
          },
          {
            id: '5',
            name: '性格',
            btnIconStatus: false,
          },
        ],
        formType: 4,
        // 列表数据相关
        selectRows: [],
        listType: 1,
        list1: [
          {
            id: '1',
            name: '实体门店',
            zhekou: '销售渠道',
          },
          {
            id: '2',
            name: '抖音',
            zhekou: '销售渠道',
          },
          {
            id: '3',
            name: '淘宝',
            zhekou: '销售渠道',
          },
          {
            id: '4',
            name: '私域直播',
            zhekou: '销售渠道',
          },
          {
            id: '5',
            name: '688店铺',
            zhekou: '销售渠道',
          },
          {
            id: '6',
            name: '微商',
            zhekou: '销售渠道',
          },
          {
            id: '7',
            name: '社群',
            zhekou: '销售渠道',
          },
          {
            id: '8',
            name: '朋友圈',
            zhekou: '销售渠道',
          },
          {
            id: '9',
            name: '快团团',
            zhekou: '销售渠道',
          },
          {
            id: '10',
            name: '闲鱼',
            zhekou: '销售渠道',
          },
          {
            id: '11',
            name: '超市连锁',
            zhekou: '销售渠道',
          },
          {
            id: '12',
            name: '分销',
            zhekou: '销售渠道',
          },
          {
            id: '13',
            name: '其他',
            zhekou: '销售渠道',
          },
          {
            id: '14',
            name: '门店',
            zhekou: '客户来源',
          },
          {
            id: '15',
            name: '社群',
            zhekou: '客户来源',
          },
          {
            id: '16',
            name: '抖音',
            zhekou: '客户来源',
          },
          {
            id: '17',
            name: '小红书',
            zhekou: '客户来源',
          },
          {
            id: '18',
            name: '公众号',
            zhekou: '客户来源',
          },
          {
            id: '19',
            name: '视频号',
            zhekou: '客户来源',
          },
          {
            id: '20',
            name: '市场活动',
            zhekou: '客户来源',
          },
          {
            id: '21',
            name: 'AI包裹卡',
            zhekou: '客户来源',
          },
          {
            id: '22',
            name: '其他',
            zhekou: '客户来源',
          },
          {
            id: '23',
            name: '00后',
            zhekou: '年龄区间',
          },
          {
            id: '24',
            name: '95后',
            zhekou: '年龄区间',
          },
          {
            id: '25',
            name: '90后',
            zhekou: '年龄区间',
          },
          {
            id: '26',
            name: '85后',
            zhekou: '年龄区间',
          },
          {
            id: '27',
            name: '80后',
            zhekou: '年龄区间',
          },
          {
            id: '28',
            name: '其他',
            zhekou: '年龄区间',
          },
          {
            id: '29',
            name: '白羊座',
            zhekou: '星座',
          },
          {
            id: '30',
            name: '金牛座',
            zhekou: '星座',
          },
          {
            id: '31',
            name: '双子座',
            zhekou: '星座',
          },
          {
            id: '32',
            name: '巨蟹座',
            zhekou: '星座',
          },
          {
            id: '33',
            name: '狮子座',
            zhekou: '星座',
          },
          {
            id: '34',
            name: '处女座',
            zhekou: '星座',
          },
          {
            id: '35',
            name: '天秤座',
            zhekou: '星座',
          },
          {
            id: '36',
            name: '天蝎座',
            zhekou: '星座',
          },
          {
            id: '37',
            name: '射手座',
            zhekou: '星座',
          },
          {
            id: '38',
            name: '摩羯座',
            zhekou: '星座',
          },
          {
            id: '39',
            name: '水瓶座',
            zhekou: '星座',
          },
          {
            id: '40',
            name: '双鱼座',
            zhekou: '星座',
          },
          {
            id: '41',
            name: '完美型',
            zhekou: '性格',
          },
          {
            id: '42',
            name: '助人型',
            zhekou: '性格',
          },
          {
            id: '43',
            name: '成就型',
            zhekou: '性格',
          },
          {
            id: '44',
            name: '自我型',
            zhekou: '性格',
          },
          {
            id: '45',
            name: '理智型',
            zhekou: '性格',
          },
          {
            id: '46',
            name: '忠诚型',
            zhekou: '性格',
          },
          {
            id: '47',
            name: '活跃型',
            zhekou: '性格',
          },
          {
            id: '48',
            name: '领袖型',
            zhekou: '性格',
          },
          {
            id: '49',
            name: '和平型',
            zhekou: '性格',
          },
        ],
        list: [
          {
            id: '1',
            name: '实体门店',
            zhekou: '销售渠道',
          },
          {
            id: '2',
            name: '抖音',
            zhekou: '销售渠道',
          },
          {
            id: '3',
            name: '淘宝',
            zhekou: '销售渠道',
          },
          {
            id: '4',
            name: '私域直播',
            zhekou: '销售渠道',
          },
          {
            id: '5',
            name: '688店铺',
            zhekou: '销售渠道',
          },
          {
            id: '6',
            name: '微商',
            zhekou: '销售渠道',
          },
          {
            id: '7',
            name: '社群',
            zhekou: '销售渠道',
          },
          {
            id: '8',
            name: '朋友圈',
            zhekou: '销售渠道',
          },
          {
            id: '9',
            name: '快团团',
            zhekou: '销售渠道',
          },
          {
            id: '10',
            name: '闲鱼',
            zhekou: '销售渠道',
          },
          {
            id: '11',
            name: '超市连锁',
            zhekou: '销售渠道',
          },
          {
            id: '12',
            name: '分销',
            zhekou: '销售渠道',
          },
          {
            id: '13',
            name: '其他',
            zhekou: '销售渠道',
          },
          {
            id: '14',
            name: '门店',
            zhekou: '客户来源',
          },
          {
            id: '15',
            name: '社群',
            zhekou: '客户来源',
          },
          {
            id: '16',
            name: '抖音',
            zhekou: '客户来源',
          },
          {
            id: '17',
            name: '小红书',
            zhekou: '客户来源',
          },
          {
            id: '18',
            name: '公众号',
            zhekou: '客户来源',
          },
          {
            id: '19',
            name: '视频号',
            zhekou: '客户来源',
          },
          {
            id: '20',
            name: '市场活动',
            zhekou: '客户来源',
          },
          {
            id: '21',
            name: 'AI包裹卡',
            zhekou: '客户来源',
          },
          {
            id: '22',
            name: '其他',
            zhekou: '客户来源',
          },
          {
            id: '23',
            name: '00后',
            zhekou: '年龄区间',
          },
          {
            id: '24',
            name: '95后',
            zhekou: '年龄区间',
          },
          {
            id: '25',
            name: '90后',
            zhekou: '年龄区间',
          },
          {
            id: '26',
            name: '85后',
            zhekou: '年龄区间',
          },
          {
            id: '27',
            name: '80后',
            zhekou: '年龄区间',
          },
          {
            id: '28',
            name: '其他',
            zhekou: '年龄区间',
          },
          {
            id: '29',
            name: '白羊座',
            zhekou: '星座',
          },
          {
            id: '30',
            name: '金牛座',
            zhekou: '星座',
          },
          {
            id: '31',
            name: '双子座',
            zhekou: '星座',
          },
          {
            id: '32',
            name: '巨蟹座',
            zhekou: '星座',
          },
          {
            id: '33',
            name: '狮子座',
            zhekou: '星座',
          },
          {
            id: '34',
            name: '处女座',
            zhekou: '星座',
          },
          {
            id: '35',
            name: '天秤座',
            zhekou: '星座',
          },
          {
            id: '36',
            name: '天蝎座',
            zhekou: '星座',
          },
          {
            id: '37',
            name: '射手座',
            zhekou: '星座',
          },
          {
            id: '38',
            name: '摩羯座',
            zhekou: '星座',
          },
          {
            id: '39',
            name: '水瓶座',
            zhekou: '星座',
          },
          {
            id: '40',
            name: '双鱼座',
            zhekou: '星座',
          },
          {
            id: '41',
            name: '完美型',
            zhekou: '性格',
          },
          {
            id: '42',
            name: '助人型',
            zhekou: '性格',
          },
          {
            id: '43',
            name: '成就型',
            zhekou: '性格',
          },
          {
            id: '44',
            name: '自我型',
            zhekou: '性格',
          },
          {
            id: '45',
            name: '理智型',
            zhekou: '性格',
          },
          {
            id: '46',
            name: '忠诚型',
            zhekou: '性格',
          },
          {
            id: '47',
            name: '活跃型',
            zhekou: '性格',
          },
          {
            id: '48',
            name: '领袖型',
            zhekou: '性格',
          },
          {
            id: '49',
            name: '和平型',
            zhekou: '性格',
          },
        ],
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
      // 新增修改
      async handleEdit(row, type) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(row, type)
        } else {
          if (row.id) {
            // const { code, data } = await editGrade({ id: row.id })
            // if (code === 200) {
            //   this.$refs['edit'].showEdit(data)
            // }
            this.$refs['edit'].showEdit(row, type)
          } else {
            this.$refs['edit'].showEdit(row, type)
          }
        }
      },
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            // const { code } = await deleteGrade({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            // const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              // const { code } = await deleteGrade(ids)
              // if (code != 200) {
              //   return
              // }
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.pageNo = data
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
        // } = await getGradeList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
        this.total = this.list1.length
      },
      handleGrouPQuery(data) {
        if (data.name === '全部') {
          this.list1 = this.list
          this.fetchData()
        } else {
          this.list1 = this.list.filter((item) => item.zhekou === data.name)
          this.fetchData()
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      mouseOver(index) {
        if (this.menuList[index].btnIconStatus == false) {
          this.menuList[index].btnIconStatus = true
        } else {
          this.menuList[index].btnIconStatus = false
        }
      },
      mouseLeave(index) {
        if (this.menuList[index].btnIconStatus == false) {
          this.menuList[index].btnIconStatus = true
        } else {
          this.menuList[index].btnIconStatus = false
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
