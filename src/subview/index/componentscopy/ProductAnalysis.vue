<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      商品分析
    </template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="今日款式排行" name="first" />
      <el-tab-pane label="今日商品排行" name="second" />
    </el-tabs>
    <List
      :list="goosList"
      :list-height="listHeightkh"
      :list-type="listType"
      :state="listLoading"
    >
      <template #List>
        <el-table-column align="center" label="排名" type="index" width="80" />
        <el-table-column label="款式名称&款号" prop="name">
          <template #default="{ row }">
            <div style="display: flex">
              <img
                :src="row.image"
                style="width: 50px; height: 50px; margin: 15px 10px 0 0"
              />
              <div>
                <p
                  style="
                    width: 70%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ row.store_name }}
                </p>
                <div>{{ row.goods_bm }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="销售件数" prop="visit" width="80" />
        <el-table-column label="销售金额" prop="num" width="80" />
        <el-table-column align="center" label="操作" width="80">
          <template #default="{ row }">
            <el-button type="text" @click="handleDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </template>
    </List>
  </el-card>
</template>

<script>
  import List from '@/subview/components/List'
  export default {
    components: { List },
    data() {
      return {
        activeName: 'first',
        listLoading: false,
        listType: 5,
        listHeightkh: 490,
        goosList: [
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '3900',
            cart: '20%',
            store_name:
              '很骄傲的深刻的的看见爱上大家看的好好等等哈哈哈圣诞节啥都好说',
            name: '张三',
            num: '100',
            goods_bm: 'wx23444',
            goods_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
        ],
      }
    },
    methods: {
      handleClick(tab) {
        console.log(1111, tab.label)
      },
    },
  }
</script>
<style lang="scss" scoped></style>
