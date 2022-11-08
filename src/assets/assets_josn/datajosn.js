export default {
  data() {
    return {
      pickDataList: '', //el-date-picker v-model的值
      pickDate: '', // 存放getPickDate获取的数据
      pickerOptions: {
        cellClassName: (time) => {
          if (
            new Date().getDate() === time.getDate() &&
            new Date().getMonth() === time.getMonth() &&
            new Date().getFullYear() === time.getFullYear()
          ) {
            return 'dateArrClass' // 返回值设置的是我们添加的类名
          }
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date().getTime() - 3600 * 1000 * 24 * 1
              end.setTime(start)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date().getTime() - 3600 * 1000 * 24 * 7
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date().getTime() - 3600 * 1000 * 24 * 30
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start =
                new Date().getTime() -
                3600 * 1000 * 24 * (new Date().getDate() - 1)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '本年',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), 0, 1)
              const end = new Date()
              picker.$emit('pick', [start, end])
            },
          },
        ],
        onPick: this.getPickDate,
        disabledDate: this.disabledDate,
      },
    }
  },
  methods: {
    getPickDate(pick) {
      this.pickDate = pick
    },
    disabledDate(date) {
      const { minDate, maxDate } = this.pickDate
      if (minDate && !maxDate) {
        const diff = Math.abs(minDate.valueOf() - date.valueOf())
        if (diff > 1000 * 3600 * 24 * 365) {
          return true
        }
      }
    },
  },
}
