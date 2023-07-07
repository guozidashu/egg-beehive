const GlobalConfig = {
  // baseApiUrl: 'https://luoyi.business.quanyu123.com/QYAPI/index.php/platform',
  // appName: '丸纸',
  baseApiUrl: 'https://demo.quanyu123.com/QYAPI/index.php/platform',
  appName: '圈域',
  // baseApiUrl: 'https://ximai.business.quanyu123.com/QYAPI/index.php/platform',
  // appName: '希麦',
  // baseApiUrl:
  //   'https://xiaojiujiu.business.quanyu123.com/QYAPI/index.php/platform',
  // appName: '嘿，甜心',
  // 打包时 账户信息路由 有个授权中心根据 实际替换
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
