<template>
  <div class="components-drawer">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">{{ form.title }}</div>
      <el-form ref="form" label-width="120px" :model="formDrawer">
        <el-form-item label="配送方式：" prop="name">
          <el-radio-group v-model="formDrawer.name">
            <el-radio :label="0">普通快递</el-radio>
            <el-radio :label="1">到店自提</el-radio>
            <el-radio :label="2">同城配送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示名称：">
          <el-input
            v-model="formDrawer.name"
            placeholder="请输入名称"
            style="width: 215px"
          />
        </el-form-item>
        <div v-if="formDrawer.name == 0">
          <el-form-item label="计价方式：">
            <el-radio-group v-model="formDrawer.state">
              <el-radio :label="0">按重量</el-radio>
              <el-radio :label="1">按件数</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="区域及价格：">
            <el-table border :data="tableData">
              <el-table-column label="区域" prop="name">
                <template slot-scope="{ row }">
                  <span v-if="row.name === 1">全国（默认运费）</span>
                  <div v-else>
                    <span>{{ row.name }}</span>
                    <el-button @click="editBtn(row.index)">编辑</el-button>
                  </div>
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
              <el-table-column fixed="right" label="操作" prop="xx">
                <template slot-scope="{ row }">
                  <el-button v-if="row.state === 1" @click="addData()">
                    编辑
                  </el-button>
                  <el-button v-else @click="delData(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item v-if="formDrawer.state === 0">
            根据重量来计算运费，当物品不足《首重重量》时，按照《首重费用》计算，超过部分按照《续重重量》和《续重费用》乘积来计算，首重续重为空时默认按照1000计算
          </el-form-item>
          <el-form-item v-else>
            根据件数来计算运费，当物品不足《首件件数》时，按照《首件费用》计算，超过部分按照《续件件数》和《续件费用》乘积来计算
          </el-form-item>
        </div>
        <div v-if="formDrawer.name == 1">
          <el-form-item label="自提门店：">
            <el-radio-group v-model="formDrawer.state8">
              <el-radio label="全部" />
              <el-radio label="选择门店" />
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="formDrawer.state8 == '选择门店'"
            label="选择门店："
          >
            <el-checkbox v-model="checked">总店</el-checkbox>
          </el-form-item>
          <el-form-item label="提货时间：">
            <el-radio-group
              v-model="formDrawer.state7"
              style="margin-right: 20px"
            >
              <el-radio label="关闭" />
              <el-radio label="开启" />
            </el-radio-group>
            <span>开启后用户下单时可以选择配送时间或提货时间</span>
          </el-form-item>
          <DistributionTime v-if="formDrawer.state7 == '开启'" />
          <el-form-item label="联系方式：">
            <el-radio-group
              v-model="formDrawer.state6"
              style="margin-right: 20px"
            >
              <el-radio label="必填" />
              <el-radio label="选填" />
            </el-radio-group>
            <span>提交订单时，联系人和联系电话是否必填</span>
          </el-form-item>
          <el-form-item label="服务费：">
            <el-input
              v-model="formDrawer.name7"
              placeholder="请输入名称"
              style="width: 120px"
            />
            元
          </el-form-item>
        </div>
        <div v-if="formDrawer.name == 2">
          <el-form-item label="配送费：">
            <el-input v-model="formDrawer.name4" style="width: 80px" />
            公里内
            <el-input v-model="formDrawer.name4" style="width: 80px" />
            元，每超出
            <el-input v-model="formDrawer.name4" style="width: 80px" />
            公里，加
            <el-input v-model="formDrawer.name4" style="width: 80px" />
            元
          </el-form-item>
          <el-form-item label="配送范围：">
            <el-radio-group v-model="formDrawer.state9">
              <el-radio :label="0">圆形范围</el-radio>
              <el-radio :label="1">多变形范围</el-radio>
            </el-radio-group>
          </el-form-item>
          <YuanMap v-if="formDrawer.state9 == 0" />
          <FangMap v-else />
          <el-form-item label="配送点：">
            <el-input v-model="formDrawer.name4" style="width: 80px" />
            -
            <el-input v-model="formDrawer.name4" style="width: 80px" />
            <el-button
              native-type="submit"
              size="small"
              style="margin-left: 10px"
            >
              选择坐标
            </el-button>
          </el-form-item>
        </div>
        <div v-if="formDrawer.name == 0 || formDrawer.name == 2">
          <el-form-item label="满额包邮：">
            <el-switch
              v-model="formDrawer.zt"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
            />
            <span v-if="formDrawer.zt" style="margin-left: 10px">
              <span>满</span>
              <el-input
                v-model="formDrawer.zt1"
                style="width: 100px; margin: 0 10px"
              />
              <span>元包邮</span>
            </span>
          </el-form-item>
          <el-form-item label="满额起送：">
            <el-switch
              v-model="formDrawer.zt2"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
            />
            <span v-if="formDrawer.zt2" style="margin-left: 10px">
              <span>满</span>
              <el-input
                v-model="formDrawer.zt3"
                style="width: 100px; margin: 0 10px"
              />
              <span>元起送</span>
            </span>
          </el-form-item>
          <el-form-item label="配送时间：">
            <el-radio-group
              v-model="formDrawer.state1"
              style="margin-right: 20px"
            >
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
            <span>开启后用户下单时可以选择配送时间或提货时间</span>
          </el-form-item>
          <DistributionTime v-if="formDrawer.state1 === 1" />
        </div>

        <DistributionTable />
        <el-form-item label="序号：">
          <el-input v-model="formDrawer.name3" style="width: 215px" />
          <span style="margin-left: 20px">用于排序,越大越靠前</span>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="formDrawer.state2">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
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
      title="选择配送地址"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <addressCity @getLawyerListInfo="selectAddress" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectSubit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import addressCity from '@/subview/components/City'
  import YuanMap from '@/subview/components/YuanMap'
  import FangMap from '@/subview/components/FangMap'
  import DistributionTime from './DistributionTime'
  import DistributionTable from './DistributionTable'
  export default {
    name: 'EmployeesDrawer',
    components: {
      addressCity,
      DistributionTime,
      DistributionTable,
      YuanMap,
      FangMap,
    },
    props: {
      form: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        formDrawer: {
          state: 0,
          state1: 0,
          name: 0,
          state2: 1,
          state9: 0,
        },
        dialogVisible: false,
        address: '',
        index: 0,
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
        handler: function (newVal) {
          this.formDrawer = Object.assign({}, newVal)
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      selectSubit() {
        this.tableData[this.index].name = this.address
        this.dialogVisible = false
      },
      editBtn(index) {
        this.dialogVisible = true
        this.index = index
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        this.address = selectProvince + selectCity + selectArea
      },
      addData() {
        this.tableData.push({
          index: this.tableData.length,
          name: '',
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
