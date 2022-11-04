<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" label-width="5px" :model="form" :rules="rules">
      <el-form-item>
        <div>
          <div v-if="type == 1">代收货：6件</div>
          <div v-else>代退货：6件</div>
          <div>总件数：6件</div>
        </div>
        <el-button
          v-if="type == 1"
          style="float: right; margin-top: -50px"
          type="primary"
        >
          剩下全收
        </el-button>
        <el-button
          v-else
          style="float: right; margin-top: -50px"
          type="primary"
        >
          剩下全退
        </el-button>
      </el-form-item>
      <el-form-item>
        <div
          style="
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 20px;
          "
        >
          <el-select
            v-model="form.select"
            placeholder="无需快递"
            style="width: 150px"
          >
            <el-option label="顺丰" value="5" />
            <el-option label="邮政" value="6" />
          </el-select>
          <el-input
            v-model="type"
            placeholder="请输入快递单号"
            style="width: 200px"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <div
          style="
            display: flex;
            justify-content: space-between;
            text-align: center;
          "
        >
          <div>
            <div>3</div>
            <div>吊牌价</div>
            <div>￥130</div>
          </div>
          <img
            src="https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg"
            style="width: 100px; height: 100px"
          />
          <div>
            <div>wyz4456466</div>
            <div>单价：￥4545</div>
            <div>合计：￥4646（3.2折）</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <List
          v-if="type == 1"
          :list="orderList"
          :list-type="listType"
          :state="listLoading"
        >
          <template #List>
            <el-table-column
              label="尺码/颜色"
              prop="id"
              show-overflow-tooltip
            />
            <el-table-column label="代发货" prop="log" show-overflow-tooltip />
            <el-table-column label="本次发货" prop="time" show-overflow-tooltip>
              <template #default="{ row }">
                <el-input-number
                  v-model="row.time"
                  label="描述文字"
                  :max="row.log"
                  :min="0"
                  @change="handleChange"
                />
              </template>
            </el-table-column>
          </template>
        </List>
        <List
          v-else
          :list="orderList"
          :list-type="listType"
          :state="listLoading"
        >
          <template #List>
            <el-table-column
              label="尺码/颜色"
              prop="id"
              show-overflow-tooltip
            />
            <el-table-column label="代退货" prop="log" show-overflow-tooltip />
            <el-table-column label="本次退货" prop="time" show-overflow-tooltip>
              <template #default="{ row }">
                <el-input-number
                  v-model="row.time"
                  label="描述文字"
                  :max="row.log"
                  :min="0"
                  @change="handleChange"
                />
              </template>
            </el-table-column>
          </template>
        </List>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import List from '@/subview/components/List'
  import { addYearSave } from '@/api/basic'
  export default {
    name: 'BrandEdit',
    components: { List },
    data() {
      return {
        listLoading: false,
        listType: 2,
        form: {
          status: 0,
        },
        orderList: [
          {
            id: '米色/90',
            log: 3,
            time: 0,
          },
        ],
        type: 1,
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row, type) {
        if (type == 1) {
          this.title = '收货'
        } else {
          this.title = '退货'
        }
        this.form = Object.assign({}, row)
        this.type = type
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
              const { code } = await addYearSave(this.form)
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
              const { code } = await addYearSave(this.form)
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
