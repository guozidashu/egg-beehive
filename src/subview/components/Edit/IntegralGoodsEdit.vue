<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="兑换所需要积分" prop="integral">
        <el-input v-model="form.integral" />
      </el-form-item>
      <el-form-item label="商库存品名称" prop="stock">
        <el-input v-model="form.stock" />
      </el-form-item>
      <el-form-item label="实际价格" prop="actual_price">
        <el-input v-model="form.actual_price" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="form.status"
          active-color="#41B584"
          active-text="上架"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="下架"
          :inactive-value="0"
          style="margin: 0 10px"
        />
      </el-form-item>
      <el-form-item label="商品图片">
        <div style="display: flex">
          <div>
            <el-button
              size="small"
              style="margin: 0 10px 0 0"
              type="primary"
              @click="handleShow()"
            >
              上传
            </el-button>
          </div>
          <img
            v-if="form.pic"
            :src="form.pic"
            style="width: 80px; height: 80px"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </el-dialog>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'GoodsEdit',
    components: {
      VabUpload,
    },
    data() {
      return {
        form: {
          name: '',
          id: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          integral: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入兑换所需要积分',
            },
          ],
          stock: [{ required: true, trigger: 'blur', message: '请输入库存' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
          actual_price: [
            { required: true, trigger: 'blur', message: '请输入实际价格' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      getSon(data) {
        this.form.pic = data[0]
        this.$forceUpdate()
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.title === '添加') {
              this.form.pic = '111'
              const { code } = await this.api.editIntegralGoodsSave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '新增成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            } else {
              const { code } = await this.api.editIntegralGoodsSave(this.form)
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '修改成功',
                'success',
                'vab-hey-message-success'
              )
              this.$emit('fetch-data')
              this.close()
            }
          }
        })
      },
    },
  }
</script>
