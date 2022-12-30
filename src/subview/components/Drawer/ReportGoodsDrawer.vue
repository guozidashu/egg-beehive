<template>
  <div style="padding: 0 20px">
    <div
      style="
        position: relative;
        display: flex;
        width: 100%;
        margin-bottom: 20px;
      "
    >
      <el-image
        :src="form.img"
        style="width: 50px; height: 50px; border-radius: 5px"
      />
      <div style="margin-left: 10px">
        <div style="margin: 8px 0 8px 0">{{ form.name }}</div>
        <div>{{ form.sn }}</div>
      </div>
      <div style="position: absolute; right: 0; padding-top: 10px">
        <el-radio-group v-model="time">
          <el-radio-button label="昨天" />
          <el-radio-button label="七天" />
          <el-radio-button label="30天" />
        </el-radio-group>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in cardList" :key="index" :span="6">
        <el-card class="box-card" shadow="never" style="border-radius: 5px">
          <div style="padding: 20px">
            <div style="margin-bottom: 10px; font-size: 14px; color: gray">
              {{ item.title }}
            </div>
            <div
              v-if="item.type == 2"
              style="font-size: 18px; font-weight: 600"
            >
              ￥{{ item.value | moneyFormat }}
            </div>
            <div v-else style="font-size: 18px; font-weight: 600">
              {{ item.value }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <QYList :list="list" :list-type="listType" :state="listLoading">
      <template #List>
        <el-table-column align="center" label="排行" type="index" width="50">
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
        <!-- {
				"id": 58,
				"name": "老何1",//客户名称
				"num": "32", //拿货数量
				"total": "1444.80",//拿货金额
				"delivery_num": "8",//发货数量
				"not_delivery_num": 24,//未发货数量
				"return_num": 23//未发货数量
			} -->
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column label="客户名称" prop="name" />
        <el-table-column label="拿货件数" prop="num" width="100" />
        <el-table-column
          align="right"
          label="拿货金额"
          prop="total"
          width="150"
        >
          <template #default="{ row }">
            <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发货数量" prop="delivery_num" width="100" />
        <el-table-column
          label="未发货数量"
          prop="not_delivery_num"
          width="100"
        />
        <el-table-column label="未发货数量" prop="return_num" width="100" />
      </template>
    </QYList>
  </div>
</template>

<script>
  import { getGoodsDetailAnalysis } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'ComponentsDrawer',
    mixins: [datajosn],
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        listLoading: false,
        listType: 2,
        list: [],
        time: '',
        form: JSON.parse(JSON.stringify(this.drawerInof)),
        formList: {
          time: this.getYesterdayTime(),
          goods_id: null,
        },
        cardList: [
          {
            title: '订单客户数',
            value: '0',
            name: 'order_customer',
            type: 1,
          },
          {
            title: '动销客户数',
            value: '0',
            name: 'delivery_order_customer',
            type: 1,
          },
          {
            title: '销售金额',
            value: '0',
            name: 'sale_amount',
            type: 2,
          },
          {
            title: '销售件数',
            value: '0',
            name: 'sale_num',
            type: 1,
          },
        ],
      }
    },

    watch: {
      drawerInof: {
        handler: function (newVal) {
          this.form = JSON.parse(JSON.stringify(newVal))
          this.formList.goods_id = newVal.id
          this.time = '昨天'
        },
        deep: true,
        immediate: true,
      },
      time: {
        handler: function (newVal) {
          if (newVal == '昨天') {
            this.formList.time = this.getYesterdayTime()
          } else if (newVal == '七天') {
            this.formList.time = this.getWeenTime()
          } else if (newVal == '30天') {
            this.formList.time = this.getPastTime(1)
          }
          this.fetchData()
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      console.log(666, this.drawerInof)
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        const { data } = await getGoodsDetailAnalysis(this.formList)
        this.cardList.forEach((item) => {
          for (let i in data.list) {
            if (item.name == i) {
              if (data.list[i] == null) {
                data.list[i] = 0
                item.value = data.list[i]
              } else {
                item.value = data.list[i]
              }
            }
          }
        })
        this.list = data.customers
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
