<template>
  <div>
    <el-form label-width="80px" style="height: 70px; padding-top: 20px">
      <el-row type="flex">
        <el-form-item label="状态：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="搜索：">
          <el-input placeholder="请输入门店名称" style="width: 248px" />
        </el-form-item>
        <el-button style="height: 32px; margin-left: 20px" type="primary">
          查询
        </el-button>
      </el-row>
    </el-form>
    <!-- 分割 -->
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <el-form label-width="100px">
      <el-row type="flex">
        <el-button
          style="height: 32px; margin-top: 20px; margin-left: 30px"
          type="primary"
          @click="add('add')"
        >
          添加
        </el-button>
      </el-row>
    </el-form>
    <el-table
      ref="multipleTable"
      border
      :data="list"
      style="width: 100%; margin-top: 10px; margin-left: 20px"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id" width="80" />

      <el-table-column label="名称" prop="name" width="180" />
      <el-table-column
        label="区域及价格"
        prop="price"
        show-overflow-tooltip
        width="800"
      >
        <template slot-scope="{ row }">
          <span style="font-weight: 700; color: #000">
            {{ row.price.text }}
          </span>
          <div>{{ row.price.a }}</div>
        </template>
      </el-table-column>
      <el-table-column label="满额包邮" prop="bao" width="120" />
      <el-table-column label="序号" prop="num" width="80" />
      <el-table-column label="状态" prop="zt" style="color: #3fa170" width="80">
        <template slot-scope="{ row }">
          <span style="color: #479f5d">{{ row.zt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <el-button @click="edit">编辑</el-button>
        <el-button>删除</el-button>
      </el-table-column>
    </el-table>
    <!-- 弹框组件 -->
    <el-drawer
      :before-close="handleClose"
      size="55%"
      title="+添加配送模板"
      :visible.sync="dialogVisible"
    >
      <el-form label="140px" style="border-top: 1px solid #f6f6f6">
        <el-form-item label="配送方式：" style="margin-left: 50px">
          <el-radio-group v-model="radio">
            <el-radio :label="3">普通快递</el-radio>
            <el-radio :label="6">到店自提</el-radio>
            <el-radio :label="9">同城配送</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form v-if="radio == 3">
        <el-form-item label="显示名称：" style="margin-left: 50px">
          <el-input v-model="formDate.name" style="width: 248px" />
        </el-form-item>
        <el-form-item label="计价方式：" style="margin-left: 50px">
          <el-radio-group v-model="radio1">
            <el-radio :label="1">按重量</el-radio>
            <el-radio :label="2">按件数</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="区域及价格：" style="margin-left: 50px">
          <el-table border :data="tableData" style="width: 85%">
            <el-table-column label="区域" prop="name" width="150">
              <template slot-scope="{ row }">
                <span v-if="row.name == '全国（默认运费）'">
                  {{ row.name }}
                </span>
                <el-button v-if="row.name == '编辑'">{{ row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="是否配送"
              style="margin-left: 50px"
              width="140"
            />
            <el-table-column
              label="首重重量(克)"
              prop="kg"
              style="margin-left: 50px"
              width="140"
            >
              <template slot-scope="{ row }">
                <el-input v-model="row.kg" />
              </template>
            </el-table-column>
            <el-table-column label="首重费用(元)" prop="money" width="140">
              <template slot-scope="{ row }">
                <el-input v-model="row.money" />
              </template>
            </el-table-column>
            <el-table-column label="续重重量(克)" prop="k" width="140">
              <template slot-scope="{ row }">
                <el-input v-model="row.k" />
              </template>
            </el-table-column>
            <el-table-column label="续重费用(元)" prop="y" width="140">
              <template slot-scope="{ row }">
                <el-input v-model="row.y" />
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="xx" width="100">
              <template slot-scope="{ row }">
                <el-button @click="open('编辑')">
                  {{ row.xx ? row.xx : '添加' }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <div style="margin-left: 70px; color: #999">
          根据重量来计算运费，当物品不足《首重重量》时，按照《首重费用》计算，超过部分按照《续重重量》和《续重费用》乘积来计算，首重续重为空时默认按照1000计算
        </div>
        <el-form-item label="满额包邮：" style="margin-left: 50px">
          <el-switch
            v-model="value1"
            active-color="#1890ff"
            inactive-color="#d2d2d2"
          />
        </el-form-item>
        <el-form-item label="满额配送：" style="margin-left: 50px">
          <el-switch
            v-model="value2"
            active-color="#1890ff"
            inactive-color="#d2d2d2"
          />
        </el-form-item>
        <el-form-item label="配送时间：" style="margin-left: 50px">
          <el-radio v-model="radio4" label="1">关闭</el-radio>
          <el-radio v-model="radio4" label="2">开启</el-radio>
          <span style="color: #a5a5a5">
            开启后用户下单时可以选择配送时间或提货时间
          </span>
        </el-form-item>
        <el-form-item label="设置表单：" style="margin-left: 50px">
          <el-button @click="addfn('单行输入')">单行输入</el-button>
          <el-button @click="addfn1('多行输入')">多行输入</el-button>
          <el-button @click="addfn2('单切选择')">单切选择</el-button>
          <el-button @click="addfn3('多项选择')">多项选择</el-button>
          <el-button @click="addfn4('普通选择')">普通选择</el-button>
          <el-button @click="addfn5('时间选择')">时间选择</el-button>
          <el-button @click="addfn6('日期选择')">日期选择</el-button>
          <el-button @click="addfn7('上传图片')">上传图片</el-button>
          <el-table
            border
            :data="tableData1"
            style="width: 85%; margin-top: 20px; margin-left: 80px"
          >
            <el-table-column
              label="字段类型"
              prop="name"
              style="margin-left: 50px"
              width="150"
            />
            <el-table-column
              label="字段名称"
              prop="name1"
              style="margin-left: 50px"
              width="190"
            >
              <template slot-scope="{ row }">
                <el-input v-model="row.name1" placeholder="请输入字段名称" />
              </template>
            </el-table-column>
            <el-table-column label="字段内容" prop="name2" width="340">
              <template slot-scope="{ row }">
                <el-input v-model="row.name2" placeholder="请输入提示信息" />
              </template>
            </el-table-column>
            <el-table-column label="是否必填" prop="name3" width="110">
              <template slot-scope="{ row }">
                <el-switch
                  v-model="row.name3"
                  active-color="#1890ff"
                  inactive-color="#d2d2d2"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="k" width="150">
              <el-button @click="addfn">添加</el-button>
              <el-button>删除</el-button>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="序号：" style="margin-left: 50px">
          <el-input v-model="z" style="width: 248px" />
          <span style="margin-left: 20px; color: #999">
            用于排序，越大越靠前
          </span>
        </el-form-item>
        <el-form-item label="状态：" style="margin-left: 50px">
          <el-radio-group v-model="radio10">
            <el-radio :label="10">开启</el-radio>
            <el-radio :label="11">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button style="margin-left: 80px" type="primary">提交</el-button>
        <!--  -->
      </el-form>
      <el-form v-if="radio == 6">
        <el-form-item label="显示名称：" style="margin-left: 50px">
          <el-input v-model="dd" style="width: 248px" />
        </el-form-item>
        <el-form-item label="自提门店：" style="margin-left: 50px">
          <el-radio v-model="radio12" label="100">全部</el-radio>
          <el-radio v-model="radio12" label="101">选择门店</el-radio>
        </el-form-item>
        <el-form-item label="提货时间：" style="margin-left: 50px">
          <el-radio v-model="radio13" label="102">关闭</el-radio>
          <el-radio v-model="radio13" label="103">开启</el-radio>
          <span style="color: #999">
            开启后用户下单时可以选择配送时间或提货时间
          </span>
        </el-form-item>
        <el-form-item label="联系方式：" style="margin-left: 50px">
          <el-radio v-model="radio14" label="104">关闭</el-radio>
          <el-radio v-model="radio14" label="105">开启</el-radio>
          <span style="color: #999">提交订单时，联系人和联系电话是否必填</span>
        </el-form-item>
        <el-form-item label="服务费：" style="margin-left: 50px">
          <el-input v-model="fw" style="width: 150px" />
          元
        </el-form-item>
        <el-form-item label="设置表单：" style="margin-left: 50px">
          <el-button>单行输入</el-button>
          <el-button>多行输入</el-button>
          <el-button>单项选择</el-button>
          <el-button>多想选择</el-button>
          <el-button>普通选择</el-button>
          <el-button>时间选择</el-button>
          <el-button>日期选择</el-button>
          <el-button>上传图片</el-button>
          <el-table
            border
            :data="tableData1"
            style="width: 85%; margin-top: 20px; margin-left: 80px"
          >
            <el-table-column label="字段类型" prop="name" width="150" />
            <el-table-column label="字段名称" prop="name1" width="190">
              <template slot-scope="{ row }">
                <el-input v-model="row.name1" placeholder="请输入字段名称" />
              </template>
            </el-table-column>
            <el-table-column label="字段内容" prop="name2" width="340">
              <template slot-scope="{ row }">
                <el-input v-model="row.name2" placeholder="请输入提示信息" />
              </template>
            </el-table-column>
            <el-table-column label="是否必填" prop="name3" width="110">
              <template slot-scope="{ row }">
                <el-switch
                  v-model="row.name3"
                  active-color="#1890ff"
                  inactive-color="#d2d2d2"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="k" width="150">
              <el-button @click="addfn">添加</el-button>
              <el-button>删除</el-button>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="序号：" style="margin-left: 50px">
          <el-input v-model="xx" style="width: 150px" />
          <span style="margin-left: 20px; color: #999">
            用于排序，越大越靠前
          </span>
        </el-form-item>
        <el-form-item label="状态：" style="margin-left: 50px">
          <el-radio v-model="radio15" label="110">开启</el-radio>
          <el-radio v-model="radio15" label15="111">关闭</el-radio>
        </el-form-item>
        <el-button style="margin-left: 80px" type="primary">提交</el-button>
      </el-form>
      <el-form v-if="radio == 9">
        <el-form-item label="显示名称：" style="margin-left: 50px">
          <el-input v-model="tc" style="width: 248px" />
        </el-form-item>
        <el-form-item label="配送费：" style="margin-left: 50px">
          <el-row type="flex">
            <el-input v-model="ps" style="width: 120px" />
            <span style="margin-left: 10px">公里内</span>
            <el-input v-model="gl" style="width: 120px; margin-left: 10px" />
            <span style="margin-left: 10px">元；</span>
            <span style="margin-left: 10px">每超出</span>
            <el-input v-model="cc" style="width: 120px; margin-left: 10px" />
            <span style="margin-left: 10px">公里，加</span>
            <el-input v-model="j" style="width: 120px; margin-left: 10px" />
            <span style="margin-left: 10px">元；</span>
          </el-row>
        </el-form-item>
        <el-form-item>
          <div
            style="
              width: 800px;
              height: 600px;
              margin-left: 70px;
              background-color: #fff;
            "
          >
            <img src="../../assets/1666410791864.jpg" />
          </div>
          <el-row style="margin-left: 70px" type="flex">
            <span>中心点坐标</span>
            <el-input v-model="zx" style="width: 150px; margin-left: 10px" />
            <span style="margin-left: 10px">,</span>
            <el-input v-model="zx1" style="width: 150px; margin-left: 10px" />
            <span style="margin-left: 10px">配送半径</span>
            <el-input v-model="bj" style="width: 150px; margin-left: 10px" />
            <span style="margin-left: 10px">米</span>
          </el-row>
        </el-form-item>
        <el-form-item label="满额包邮：" style="margin-left: 50px">
          <el-switch
            v-model="value100"
            active-color="#1890ff"
            inactive-color="#d2d2d2"
          />
        </el-form-item>
        <el-form-item label="满额起送：" style="margin-left: 50px">
          <el-switch
            v-model="value101"
            active-color="#1890ff"
            inactive-color="#d2d2d2"
          />
        </el-form-item>
        <el-form-item label="配送时间：" style="margin-left: 50px">
          <el-radio v-model="radio22" label="1000">关闭</el-radio>
          <el-radio v-model="radio22" label22="2000">开启</el-radio>
          <span style="color: #999">
            开启后用户下单时可以选择配送时间或提货时间
          </span>
        </el-form-item>
        <el-form-item label="设置表单：" style="margin-left: 50px">
          <el-button>单行输入</el-button>
          <el-button>多行输入</el-button>
          <el-button>单项选择</el-button>
          <el-button>多想选择</el-button>
          <el-button>普通选择</el-button>
          <el-button>时间选择</el-button>
          <el-button>日期选择</el-button>
          <el-button>上传图片</el-button>
          <el-table
            border
            :data="tableData1"
            style="width: 85%; margin-top: 20px; margin-left: 80px"
          >
            <el-table-column label="字段类型" prop="name" width="150" />
            <el-table-column label="字段名称" prop="name1" width="190">
              <template slot-scope="{ row }">
                <el-input v-model="row.name1" placeholder="请输入字段名称" />
              </template>
            </el-table-column>
            <el-table-column label="字段内容" prop="name2" width="340">
              <template slot-scope="{ row }">
                <el-input v-model="row.name2" placeholder="请输入提示信息" />
              </template>
            </el-table-column>
            <el-table-column label="是否必填" prop="name3" width="110">
              <template slot-scope="{ row }">
                <el-switch
                  v-model="row.name3"
                  active-color="#1890ff"
                  inactive-color="#d2d2d2"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="k" width="150">
              <el-button @click="addfn">添加</el-button>
              <el-button>删除</el-button>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="序号：" style="margin-left: 50px">
          <el-input v-model="z" style="width: 248px" />
          <span style="margin-left: 20px; color: #999">
            用于排序，越大越靠前
          </span>
        </el-form-item>
        <el-form-item label="状态：" style="margin-left: 50px">
          <el-radio v-model="radio33" label="120">开启</el-radio>
          <el-radio v-model="radio33" label33="130">关闭</el-radio>
        </el-form-item>
        <el-button style="margin-left: 80px" type="primary">提交</el-button>
        <div style="width: 100%; height: 50px; background-color: #fff"></div>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        qq: '请输入门店名称',
        radio33: '120',
        radio22: '1000',
        value101: false,
        value100: false,
        bj: '2000',
        zx1: '30.287459',
        zx: '120.153576',
        j: '1',
        cc: '1',
        gl: '3',
        ps: '5',
        tc: '同城配送',
        radio15: '111',
        xx: '0',
        fw: '0',
        radio14: '104',
        radio13: '102',
        radio12: '100',
        dd: '到店自提',
        radio10: 10,
        z: '0',
        value1: false,
        value2: false,
        formDate: {
          name: '普通快递',
        },
        radio4: '1',
        radio: 3,
        radio1: 1,
        dialogVisible: false,
        options: [
          {
            value: '选项1',
            label: '全部',
          },
          {
            value: '选项2',
            label: '开启',
          },
          {
            value: '选项3',
            label: '关闭',
          },
        ],
        value: '',
        list: [
          {
            id: '8',
            name: '普通快递',
            price: {
              text: '全国（默认运费）：',
              a: '1000克以下0元，每超出1000克加0元',
            },
            bao: '不开启',
            num: '0',
            zt: '开启',
          },
          {
            id: '9',
            name: '到店自提',
            price: {
              text: '自提门店：',
              a: '全部',
            },
            bao: '不开启',
            num: '0',
            zt: '开启',
          },
        ],
        tableData: [
          {
            name: '全国（默认运费）',
            kg: '1000',
            money: '0',
            k: '1000',
            y: '0',
          },
        ],
        tableData1: [
          {
            name: '单行输入',
            name1: '备注',
            name2: '选填，请输入备注信息',
            name3: false,
          },
        ],
      }
    },
    methods: {
      handleClose() {
        this.dialogVisible = false
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      add(val) {
        if (val == 'add') {
          console.log('添加')
          this.dialogVisible = true
        } else {
          console.log('编辑')
        }
      },
      addfn(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      addfn1(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      addfn2(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      addfn3(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      addfn4(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      addfn5(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      addfn6(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      addfn7(val) {
        this.tableData1.push({
          name: val,
          name1: '',
          name2: '',
          name3: true,
        })
      },
      edit() {
        this.dialogVisible = true
      },
      open(el) {
        this.tableData.push({ name: el, name1: '', name2: '', name3: true })
      },
    },
  }
</script>

<style></style>
