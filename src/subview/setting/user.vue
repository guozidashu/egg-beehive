<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
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
    <el-card
      v-for="(item, index) in cartList"
      :key="index"
      shadow="hover"
      style="border: 0"
    >
      <div
        @click="handleChange(index)"
        @mouseleave="mouseLeave(index)"
        @mouseover="mouseOver(index)"
      >
        <div style="display: flex; margin-top: 5px 0 0 5px">
          <div style="width: 50%">
            <div style="margin-bottom: 20px">
              <span style="margin-right: 20px; font-size: 16px; color: black">
                {{ item.name }}
              </span>
              <span>{{ item.num }} 人</span>
            </div>
            <div>{{ item.title }}（已设置{{ item.number }}个权限）</div>
          </div>
          <div style="width: 50%; margin-top: 10px">
            <div>
              <el-button
                icon="el-icon-edit"
                size="small"
                style="margin-left: 125px; color: #999"
                type="text"
                @click="handleEdit(index)"
              >
                编辑
              </el-button>
              <el-button
                icon="el-icon-delete"
                size="small"
                style="margin-left: 125px; color: #999"
                type="text"
                @click="handleDelete(index)"
              >
                删除
              </el-button>
              <el-button
                icon="el-icon-share"
                size="small"
                style="margin-left: 125px; color: #999"
                type="text"
                @click="handleDetail"
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
            <div style="display: flex; width: 20%; margin-bottom: 20px">
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              <span style="margin: 20px 0 0 20px">李二</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="编辑角色"
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
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer />
    </el-drawer>
  </div>
</template>

<script>
  import Form from '@/subview/components/Form'
  import Drawer from './components/UserDrawer'
  export default {
    name: 'User',
    components: { Form, Drawer },
    data() {
      return {
        drawer: false,
        // 表单数据/列表参数
        dialogFormVisible: false,
        formType: 3,
        form: {
          id: 0,
          name: '',
          pageNo: 1,
          pageSize: 10,
        },
        editform: {},
        editrules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        },
        cartList: [
          {
            id: 1,
            name: '系统管理员',
            num: 1,
            title: '拥有系统所有权限',
            number: 10,
            btnIconStatus: false,
            cartSta: false,
          },
          {
            id: 2,
            name: '网管',
            num: 3,
            title: '拥有网管权限',
            number: 100,
            btnIconStatus: false,
            cartSta: false,
          },
        ],
        activeName: 'first',
      }
    },
    watch: {},
    created() {},
    methods: {
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
      handleDelete() {
        this.$baseConfirm('确认是否删除系统管理员?', null, () => {
          this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
        })
      },
      close() {
        this.dialogFormVisible = false
      },
      handleEdit(index) {
        this.editform = this.cartList[index]
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
        this.form.pageNo = 1
      },
    },
  }
</script>
<style lang="scss" scoped></style>
