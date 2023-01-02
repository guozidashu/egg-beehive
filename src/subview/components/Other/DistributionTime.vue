<template>
  <div>
    <el-form-item
      v-for="(item, index) in dataList"
      :key="index"
      label="可选时间："
    >
      <el-select
        v-model="item.dayValue"
        placeholder="请选择"
        style="width: 100px"
      >
        <el-option
          v-for="(item1, index1) in dayList"
          :key="index1"
          :label="item1.label"
          :value="item1.value"
        />
      </el-select>
      <el-time-picker
        v-model="item.tiem"
        end-placeholder="结束时间"
        is-range
        placeholder="选择时间范围"
        range-separator="至"
        start-placeholder="开始时间"
        style="width: 330px; margin: 0 10px"
      />
      <el-button v-if="index === 0" type="primary" @click="addDataList()">
        添加
      </el-button>
      <el-button v-else type="primary" @click="delDataList(index)">
        删除
      </el-button>
    </el-form-item>
    <el-form-item label="可选时间：">
      <span>下单时间大于可选时间</span>
      <el-input v-model="num" style="width: 100px; margin: 0 10px" />
      <span>小时</span>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    // props: {
    //   list: {
    //     type: Array,
    //     default: () => [],
    //   },
    // },
    data() {
      return {
        num: 4,
        dataList: [
          {
            dayValue: '1',
            tiem: [
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                12
              ),
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                12,
                30
              ),
            ],
          },
          {
            dayValue: '1',
            tiem: [
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                18
              ),
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                18,
                30
              ),
            ],
          },
          {
            dayValue: '2',
            tiem: [
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                12
              ),
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                12,
                30
              ),
            ],
          },
          {
            dayValue: '2',
            tiem: [
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                18
              ),
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate(),
                18,
                30
              ),
            ],
          },
        ],
        value1: [
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate(),
            12
          ),
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate(),
            12,
            30
          ),
        ],
        dayList: [
          {
            value: '1',
            label: '当天',
          },
          {
            value: '2',
            label: '第2天',
          },
          {
            value: '3',
            label: '第3天',
          },
          {
            value: '4',
            label: '第4天',
          },
          {
            value: '5',
            label: '第5条',
          },
          {
            value: '6',
            label: '第6天',
          },
          {
            value: '7',
            label: '第7天',
          },
          {
            value: '8',
            label: '第8天',
          },
          {
            value: '9',
            label: '第9天',
          },
          {
            value: '10',
            label: '第10天',
          },
          {
            value: '11',
            label: '第11天',
          },
          {
            value: '12',
            label: '第12天',
          },
          {
            value: '13',
            label: '第13天',
          },
          {
            value: '14',
            label: '第14天',
          },
          {
            value: '15',
            label: '第15天',
          },
        ],
      }
    },
    created() {},
    methods: {
      delDataList(index) {
        this.dataList.splice(index, 1)
      },
      addDataList() {
        this.dataList.push({
          dayValue: '1',
          tiem: [
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate()
            ),
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate()
            ),
          ],
        })
      },
    },
  }
</script>
