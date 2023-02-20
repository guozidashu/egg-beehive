const GlobalConfig = {
  // baseApiUrl: 'https://luoyi.business.quanyu123.com/QYAPI/index.php/platform',
  // appName: '丸纸',
  // baseApiUrl: 'https://demo.quanyu123.com/QYAPI/index.php/platform',
  // appName: '圈域',
  baseApiUrl:
    'https://xiaojiujiu.business.quanyu123.com/QYAPI/index.php/platform',
  appName: '发生米',
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = GlobalConfig
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return GlobalConfig
    })
  } else {
    window.GlobalConfig = GlobalConfig
  }
}

// net.config引入一次
// index.html也需要引入一次
