<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item>
            <el-button
              v-has-permi="['btn:User:add']"
              style="margin-left: 20px"
              type="primary"
              @click="handleEdit('add')"
            >
              新增
            </el-button>
          </el-form-item>
          <el-form-item label="角色搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入角色名称"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <div
      v-for="(item, index) in cartList"
      :key="index"
      @mouseenter="mouseOver(index)"
      @mouseleave="mouseLeave(index)"
    >
      <el-card shadow="hover" style="border: 0">
        <div>
          <div style="display: flex; margin-top: 5px 0 0 5px">
            <div style="width: 50%">
              <div style="margin-top: 10px">
                <span style="margin-right: 20px; font-size: 16px; color: black">
                  {{ item.name }}
                </span>
                <span>{{ item.count }} 人</span>
              </div>
              <!-- <div>{{ item.title }}（已设置{{ item.number }}个权限）</div> -->
            </div>
            <div style="width: 50%">
              <div v-if="item.btnIconStatus">
                <el-button
                  v-has-permi="['btn:User:edit']"
                  icon="el-icon-edit"
                  size="small"
                  style="margin-left: 125px; color: #999"
                  type="text"
                  @click="handleEdit(index)"
                >
                  编辑
                </el-button>
                <el-button
                  v-has-permi="['btn:User:del']"
                  icon="el-icon-delete"
                  size="small"
                  style="margin-left: 125px; color: #999"
                  type="text"
                  @click="handleDelete(index)"
                >
                  删除
                </el-button>
                <el-button
                  v-has-permi="['btn:User:role']"
                  icon="el-icon-share"
                  size="small"
                  style="margin-left: 125px; color: #999"
                  type="text"
                  @click="handleDetail(item.id)"
                >
                  分配权限
                </el-button>
              </div>
            </div>
            <vab-icon
              v-if="item.cartSta"
              icon="arrow-down-circle-line"
              style="float: right; margin-top: 10px; font-size: 25px"
            />
            <vab-icon
              v-else
              icon="arrow-right-circle-line"
              style="float: right; margin-top: 10px; font-size: 25px"
            />
          </div>
          <div v-if="item.cartSta">
            <el-divider />
            <div style="display: flex; flex-wrap: wrap; width: 100%">
              <div
                v-for="(item1, index1) in item.userlist"
                :key="index1"
                style="display: flex; width: 20%; margin-bottom: 20px"
              >
                <el-avatar :size="50" :src="item1.avatar" />
                <span style="margin: 20px 0 0 20px">{{ item1.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :drawer-id="drawerId" />
    </el-drawer>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form
        ref="editform"
        label-width="80px"
        :model="editform"
        :rules="editrules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editform.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import Form from '@/subview/components/Form'
  import Drawer from './components/UserDrawer'
  import { getRoleList } from '@/api/basic'
  export default {
    name: 'User',
    components: { Form, Drawer },
    data() {
      return {
        drawerId: 0,
        drawer: false,
        // 表单数据/列表参数
        dialogFormVisible: false,
        title: '',
        formType: 3,
        form: {
          name: '',
        },
        editform: {
          name: '',
        },
        editrules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
        cartList: [],
        activeName: 'first',
      }
    },
    watch: {
      form: {
        //表单筛选条件变化实时刷新列表
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
      // 详情抽屉
      handleDetail(index) {
        this.drawerId = index
        this.drawer = true
      },
      // 树形数据转为一维数组
      getOneArr(arr) {
        let data = JSON.parse(JSON.stringify(arr))
        let newData = []
        const callback = (item) => {
          ;(item.children || (item.children = [])).map((v) => {
            callback(v)
          })
          delete item.children
          newData.push(item)
        }
        data.map((v) => callback(v))
        return newData
      },
      handleDelete() {
        this.$baseConfirm('确认是否删除系统管理员?', null, () => {
          this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
        })
      },
      close() {
        this.$refs['editform'].resetFields()
        this.dialogFormVisible = false
      },
      handleEdit(index) {
        if (index !== 'add') {
          this.title = '编辑角色'
          this.editform = this.cartList[index]
        } else {
          this.title = '新增角色'
        }
        this.dialogFormVisible = true
      },
      handleChange(index) {
        if (this.cartList[index].cartSta == false) {
          this.cartList[index].cartSta = true
        } else {
          this.cartList[index].cartSta = false
        }
      },
      mouseOver(index) {
        if (this.cartList[index].btnIconStatus == false) {
          this.cartList[index].btnIconStatus = true
        } else {
          this.cartList[index].btnIconStatus = false
        }
      },
      mouseLeave(index) {
        if (this.cartList[index].btnIconStatus == false) {
          this.cartList[index].btnIconStatus = true
        } else {
          this.cartList[index].btnIconStatus = false
        }
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        const { data } = await getRoleList(this.form)
        data.forEach((item) => {
          item.cartSta = false
          item.btnIconStatus = false
        })
        this.cartList = data
      },
    },
  }
</script>
<style lang="scss" scoped></style>
