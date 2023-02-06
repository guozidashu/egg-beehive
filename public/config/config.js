const GlobalConfig = {
  baseApiUrl: 'https://luoyi.business.quanyu123.com/QYAPI/index.php/platform',
  appName: '丸纸',
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
