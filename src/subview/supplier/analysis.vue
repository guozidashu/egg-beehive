<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; margin-bottom: 20px; background-color: white">
      <el-form
        ref="form"
        :inline="true"
        label-width="100px"
        :model="form"
        style="clear: both"
        @submit.native.prevent
      >
        <el-form-item>
          <span style="margin-top: 10px; font-size: 16px">供应商概况</span>
        </el-form-item>
        <el-form-item
          label="时间筛选:"
          style="float: right; margin-right: 0; font-size: 12px"
        >
          <el-date-picker
            v-model="form.create_time"
            align="right"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd HH:mm:ss"
          />
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm()"
          >
            重置
          </el-button>
        </el-form-item>
        <el-form-item label="供应商类别:" style="float: right">
          <el-select v-model="form.type">
            <el-option
              v-for="item in supplier_type"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <QYTextLabels
        ref="multipleTable"
        :list="supplier_case"
        :width="supplier_width"
      />
    </div>
    <div style="display: flex; width: 100%">
      <div
        style="
          display: flex;
          flex: 7;
          padding: 20px;
          margin-right: 20px;
          background-color: white;
        "
      >
        <QYChinaMap
          :list="chainList"
          :map-type="mapType"
          style="width: 30%"
          :title="mapTitle"
        />
        <QYList
          :list="chainList"
          :list-type="listType"
          :state="listLoading"
          style="width: 70%"
        >
          <template #List>
            <el-table-column label="Top省份" prop="name" />
            <el-table-column label="累计供应商数" prop="value" />
            <el-table-column label="新增供应商数" prop="add_count" />
            <el-table-column label="占比" prop="user">
              <template #default="{ row }">{{ row.add_count * 100 }}%</template>
            </el-table-column>
          </template>
        </QYList>
      </div>
      <div style="flex: 3; padding: 20px; background-color: white">
        <QYBranch
          :list="branchList"
          :style-chart="styleObj"
          :title="branchTitle"
        />
      </div>
    </div>
    <div style="padding: 20px; margin-top: 20px; background-color: white">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="form"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin: 10px 0; font-size: 16px">供应商排行</span>
      </el-form>
      <QYList :list="supplier_rank" :list-type="listType" :state="listLoading">
        <template #List>
          <el-table-column
            align="center"
            label="TOP排名"
            type="index"
            width="100"
          >
            <template slot-scope="scope">
              <span
                class="index_common"
                :class="[
                  scope.$index + 1 == '1'
                    ? 'index_one'
                    : scope.$index + 1 == '2'
                    ? 'index_two'
                    : scope.$index + 1 == '3'
                    ? 'index_three'
                    : 'index_more',
                ]"
              >
                {{ scope.$index + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商名称"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="类别"
            prop="type_name"
            show-overflow-tooltip
          />
          <el-table-column label="入库数量" prop="num" show-overflow-tooltip />
          <el-table-column
            align="right"
            label="入库金额"
            prop="total"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  import mapjson from '@/assets/assets_josn/mapjson'
  import datajosn from '@/assets/assets_josn/datajosn'
  import publicjosn from '@/assets/assets_josn/publicjosn'
  export default {
    mixins: [mapjson, datajosn, publicjosn],
    data() {
      return {
        listLoading: false,
        listType: 4,
        // 地图图表数据
        mapTitle: '供应商地域分布',
        mapType: {
          trigger: 'item',
          formatter(params) {
            let res = ` <ul>
    <li><span>地区:</span> <span> ${params.data.name}</span></li>
    <li><span>新增供应商:</span> <span> ${params.data.add_count}</span></li>
    <li><span>总供应商:</span> <span> ${params.data.value}</span></li>
  </ul>`
            return res
          },
        },
        // 供应商下拉框
        supplier_type: [],
        form: {
          create_time: this.getPastTime(30),
          type: '',
        },
        // 供应商地域分布
        supplier_rank: [],
        // 头部卡片宽度
        supplier_width: '25%',
        // 头部卡片数据
        supplier_case: [],
        // 饼图数据
        branchTitle: '供应商类别占比',
        styleObj: {
          width: '400px',
          height: '500px',
          legendx: 0,
          legendy: 450,
          center: ['50%', '50%'],
        },
        branchList: [],
      }
    },
    watch: {
      form: {
        handler: function () {
          this.branchList = []
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getSelectData()
      this.fetchData()
    },
    methods: {
      resetForm() {
        this.form.type = ''
        this.form.create_time = this.getPastTime(30)
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getDissectList(this.form)
        let arr = [
          {
            id: 0,
            title: '所有供应商',
            num: 200,
            count: data.supplier_case.all_count,
            typeSta: false,
          },
        ]
        data.supplier_case.type_count.forEach((item, index) => {
          if (index < 3) {
            item.typeSta = false
            item.num = item.count
            item.title = item.name
            arr.push(item)
          }
        })
        this.supplier_case = arr

        let temp = {}
        data.supplier_type.forEach((item) => {
          temp.value = item.count
          temp.name = item.name
          this.branchList.push(temp)
          temp = {}
        })
        let chainList = JSON.parse(JSON.stringify(this.chainList))
        chainList.forEach((item, index) => {
          data.supplier_area.forEach((item1) => {
            if (item.name == item1.province) {
              let obj = {}
              obj.value = item1.count
              obj.add_count = item1.add_count
              chainList[index] = Object.assign({}, item, obj)
            } else {
              let obj = {}
              obj.value = 0
              obj.add_count = 0
              chainList[index] = Object.assign({}, item, obj)
            }
          })
        })
        chainList.sort((a, b) => {
          return b.value - a.value
        })
        this.chainList = chainList
        this.supplier_rank = data.supplier_rank
        this.listLoading = false
      },
      async getSelectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'supplier_type',
        })
        this.supplier_type = data.supplier_type
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>
