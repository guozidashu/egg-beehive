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
                  3600 * 1000 * 24 * 6
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
                  3600 * 1000 * 24 * 29
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
    // 获取聚水潭更新事件 格式为 每天的 00:00:00
    getJSTUpdateTime() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()

      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      return year + '-' + month + '-' + day + ' ' + '00:30:00'
    },
    // 获取当前时间，返年月日时分秒
    getNowTime() {
      var date = new Date()
      var sign2 = ':'
      var year = date.getFullYear() // 年
      var month = date.getMonth() + 1 // 月
      var day = date.getDate() // 日
      var hour = date.getHours() // 时
      var minutes = date.getMinutes() // 分
      var seconds = date.getSeconds() //秒
      var weekArr = [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期天',
      ]
      var week = weekArr[date.getDay()]
      // 给一位数的数据前面加 “0”
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        sign2 +
        minutes +
        sign2 +
        seconds
      )
    },
    // 获取当天前后日期
    getIntervalTime(date) {
      let InTime = new Date(date).getTime()
      let InTime1 = InTime - 1 * 24 * 60 * 60 * 1000
      let InTime2 = InTime + 1 * 24 * 60 * 60 * 1000
      let eTimeArr = this.Get_DateArr(InTime2)
      let sTimeArr = this.Get_DateArr(InTime1)
      let nowTime = eTimeArr[0] + '-' + eTimeArr[1] + '-' + eTimeArr[2]
      let PastTime = sTimeArr[0] + '-' + sTimeArr[1] + '-' + sTimeArr[2]
      return [PastTime, date, nowTime]
    },
    // 获取最昨天的时间
    getYesterdayTime() {
      return this.getPastTime(1, false)
    },
    // 获取最今天的时间
    getTodayTime() {
      let InTime = new Date().getTime()
      let eTimeArr = this.Get_DateArr(InTime)
      let nowTime =
        eTimeArr[0] + '-' + eTimeArr[1] + '-' + eTimeArr[2] + ' ' + '23:59:59'
      let PastTime =
        eTimeArr[0] + '-' + eTimeArr[1] + '-' + eTimeArr[2] + ' ' + '00:00:00'
      return [PastTime, nowTime]
    },
    // 获取最近一周的时间
    getWeenTime() {
      return this.getPastTime(6)
    },
    // 获取时间区间返回格式 [2022-12-12 15:15:15,2022-12-12 15:15:15] 传入天数
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
