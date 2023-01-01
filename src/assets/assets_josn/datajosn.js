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
              const end = new Date(new Date().setHours(23, 59, 59, 59))
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date(
                new Date(new Date().setHours(23, 59, 59, 59)).getTime() -
                  3600 * 1000 * 24 * 1
              )
              const start = new Date(
                new Date(new Date().setHours(0, 0, 0, 0)).getTime() -
                  3600 * 1000 * 24 * 1
              )
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date(new Date().setHours(23, 59, 59, 59))
              const start = new Date(
                new Date(new Date().setHours(0, 0, 0, 0)).getTime() -
                  3600 * 1000 * 24 * 7
              )
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date(new Date().setHours(23, 59, 59, 59))
              const start = new Date(
                new Date(new Date().setHours(0, 0, 0, 0)).getTime() -
                  3600 * 1000 * 24 * 30
              )
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '本月',
            onClick(picker) {
              const end = new Date(new Date().setHours(23, 59, 59, 59))
              const start = new Date(
                new Date(new Date().setHours(0, 0, 0, 0)).getTime() -
                  3600 * 1000 * 24 * (new Date().getDate() - 1)
              )

              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '本年',
            onClick(picker) {
              const start = new Date(
                new Date(new Date().setHours(0, 0, 0, 0)).getFullYear(),
                0,
                1
              )
              const end = new Date(new Date().setHours(23, 59, 59, 59))
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
    // 时间截取超出一年禁用
    disabledDate(date) {
      const { minDate, maxDate } = this.pickDate
      if (minDate && !maxDate) {
        const diff = Math.abs(minDate.valueOf() - date.valueOf())
        if (diff > 1000 * 3600 * 24 * 365) {
          return true
        }
      }
    },
    getDayTime() {
      // 获取今天的时间 返回 ‘2022-12-12 15:15:15’
      let time = new Date()
      const yy = time.getFullYear() //获取完整的年份(4位,1970-???)
      const M = time.getMonth() + 1 //获取当前月份(0-11,0代表1月),
      const d = time.getDate() //获取当前日(1-31)
      const h = time.getHours() //获取当前小时数(0-23)
      const m = time.getMinutes() //获取当前分钟数(0-59)
      const s = time.getSeconds() //获取当前秒数(0-59)
      // 小于9的，在前面加0
      const MM = M > 9 ? M : '0' + M
      const dd = d > 9 ? d : '0' + d
      const hh = h > 9 ? h : '0' + h
      const mm = m > 9 ? m : '0' + m
      const ss = s > 9 ? s : '0' + s
      return yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
    },
    // 获取最昨天的时间
    getYesterdayTime() {
      return this.getPastTime(1, false)
    },
    // 获取最近一周的时间
    getWeenTime() {
      return this.getPastTime(7)
    },
    // 获取过去几个月的时间
    getPastTime(day, n = true) {
      let InTime = new Date().getTime()
      let eTimeArr = this.Get_DateArr(InTime)
      let Indata = InTime - day * 24 * 60 * 60 * 1000
      let sTimeArr = this.Get_DateArr(Indata)
      // 指定的过去时间
      const PastTime =
        sTimeArr[0] + '-' + sTimeArr[1] + '-' + sTimeArr[2] + ' ' + '00:00:00'
      let nowTime = ''
      if (n) {
        // 当前时间
        nowTime =
          eTimeArr[0] + '-' + eTimeArr[1] + '-' + eTimeArr[2] + ' ' + '23:59:59'
      } else {
        // 当前时间 取某天的开始到某天的结束 不是今天
        nowTime =
          sTimeArr[0] + '-' + sTimeArr[1] + '-' + sTimeArr[2] + ' ' + '23:59:59'
      }
      return [PastTime, nowTime]
    },

    Get_DateArr(time) {
      // 时间戳转换日期数组
      const date = new Date(time / 1)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '' + m : m
      let d = date.getDate()
      d = d < 10 ? '' + d : d
      let msrt = m + ''
      let dsrt = d + ''
      msrt.length === 1 ? (m = '0' + m) : (m = m)
      dsrt.length === 1 ? (d = '0' + d) : (d = d)

      return [y, m, d]
    },
  },
}
