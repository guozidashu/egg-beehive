<template>
  <div class="components-drawer">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">{{ form.title }}</div>
      <el-form ref="form" label-width="120px" :model="formDrawer">
        <el-form-item label="配送方式：" prop="zhuangtai">
          <el-radio-group v-model="formDrawer.name">
            <el-radio label="同城配送" />
            <el-radio label="普通快递" />
            <el-radio label="到店自提" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示名称:">
          <el-input
            v-model="formDrawer.supplierName"
            placeholder="请输入名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="计价方式：" prop="zhuangtai">
          <el-radio-group v-model="formDrawer.name">
            <el-radio label="按重量" />
            <el-radio label="按件数" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="区域及价格：">
          <el-table border :data="tableData">
            <el-table-column label="区域" prop="name">
              <template slot-scope="{ row }">
                <span v-if="row.name === 1">全国（默认运费）</span>
                <el-button v-else @click="dialogVisible = true">编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column label="是否配送">
              <template slot-scope="{ row }">
                <el-switch
                  v-model="row.isdefault"
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
            <el-table-column label="首重重量(克)" prop="kg">
              <template slot-scope="{ row }">
                <el-input v-model="row.kg" />
              </template>
            </el-table-column>
            <el-table-column label="首重费用(元)" prop="money">
              <template slot-scope="{ row }">
                <el-input v-model="row.money" />
              </template>
            </el-table-column>
            <el-table-column label="续重重量(克)" prop="k">
              <template slot-scope="{ row }">
                <el-input v-model="row.k" />
              </template>
            </el-table-column>
            <el-table-column label="续重费用(元)" prop="y">
              <template slot-scope="{ row }">
                <el-input v-model="row.y" />
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="xx">
              <template slot-scope="{ row }">
                <el-button v-if="row.state === 1" @click="addData()">
                  编辑
                </el-button>
                <el-button v-else @click="delData(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          根据重量来计算运费，当物品不足《首重重量》时，按照《首重费用》计算，超过部分按照《续重重量》和《续重费用》乘积来计算，首重续重为空时默认按照1000计算
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" size="small" type="primary">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      :append-to-body="true"
      :before-close="handleClose"
      title="选择配送地址"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <addressCity @getLawyerListInfo="selectAddress" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import addressCity from '@/subview/components/City.vue'
  export default {
    name: 'EmployeesDrawer',
    components: { addressCity },
    props: {
      form: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        formDrawer: this.form,
        dialogVisible: false,
        address: '',
        tableData: [
          {
            name: 1,
            isdefault: 1,
            kg: '1000',
            money: '0',
            k: '1000',
            y: '0',
            state: 1,
          },
        ],
      }
    },
    watch: {
      form: {
        handler: function (val) {
          this.formDrawer = val
          console.log(val)
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      selectAddress(selectProvince, selectCity, selectArea) {
        this.address = selectProvince + selectCity + selectArea
      },
      addData() {
        this.tableData.push({
          name: 2,
          kg: '1000',
          money: '0',
          k: '1000',
          y: '0',
          isdefault: 1,
          state: 2,
        })
      },
      delData(row) {
        this.tableData.splice(this.tableData.indexOf(row), 1)
      },
    },
  }
</script>
<style lang="scss" scoped></style>
