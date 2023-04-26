// 生成配货单打印文本 通过 object 传入数据
export function getDistributionGoodsHtml(object) {
  let htmlStr = ''
  htmlStr += '<div style="font-size:10px;padding:20px 30px 0 20px">'
  htmlStr += '<div style="position: relative; text-align: center">'
  htmlStr += '<h2>' + object.title + '</h2>'
  htmlStr +=
    '<div style="position: absolute; top: 0; right: 0">批次号：' +
    object.id +
    '</div>'
  htmlStr += '</div>'
  htmlStr += '<div style="display: flex; justify-content: space-between">'
  htmlStr +=
    '<div style="margin-bottom:20px">客户名称： ' +
    object.name +
    ' &nbsp;&nbsp;&nbsp;&nbsp;客户电话： ' +
    object.phone +
    '</div>'
  htmlStr += '<div>开单时间： ' + object.time + '</div>'
  htmlStr += '</div>'
  htmlStr += '<table border="1" cellpadding="0" cellspacing="0">'
  htmlStr += '<tr>'
  htmlStr += '<th align="center"><p style="padding: 20px 0">序号</p></th>'
  htmlStr +=
    '<th align="center"><p>款号&nbsp;|&nbsp;类型&nbsp;|&nbsp;商品详情及规格</p></th>'
  htmlStr += '<th align="center"><p>数量</p></th>'
  htmlStr += '<th align="center"><p>单价</p></th>'
  htmlStr += '<th align="center"><p>吊牌价</p></th>'
  htmlStr += '<th align="center"><p>金额</p></th>'
  htmlStr += '</tr>'
  object.table.forEach((item, index) => {
    htmlStr += '<tr>'
    htmlStr +=
      '<td align="center" ><p style="padding: 10px 0">' +
      (index + 1) +
      '</p></td>'
    htmlStr += '<td align="center"><p>' + item.detail + '</p></td>'
    htmlStr += '<td align="center"><p>' + item.num + '</p></td>'
    htmlStr += '<td align="center"><p>' + item.price + '</p></td>'
    htmlStr += '<td align="center"><p>￥' + item.tagPrice + '</p></td>'
    htmlStr += '<td align="center"><p>￥' + item.money + '</p></td>'
    htmlStr += '</tr>'
  })

  htmlStr += '<tr>'
  htmlStr +=
    '<td align="center"><p style="padding: 0 20px">' +
    (object.table.length + 1) +
    '</p></td>'
  htmlStr += '<td align="center"><p style="padding: 0 20px">合计</p></td>'
  htmlStr +=
    '<td align="center"><p style="padding: 0 20px">' +
    object.all_num +
    '</p></td>'
  htmlStr += '<td align="center"><p style="padding: 0 20px">--</p></td>'
  htmlStr += '<td align="center"><p style="padding: 0 20px">--</p></td>'
  htmlStr +=
    '<td align="center"><p style="padding: 0 20px">' +
    object.all_money +
    '</p></td>'
  htmlStr += '</tr>'
  htmlStr += '<tr>'
  htmlStr +=
    '<td align="center" colspan="2"><p style="padding: 0 20px">优惠：' +
    object.discounts +
    '元，其他费用</p></td>'
  htmlStr +=
    '<td align="center" colspan="4"><p style="padding: 0 20px">￥' +
    object.discounts +
    '</p></td>'
  htmlStr += '<tr>'

  htmlStr += '<tr>'
  htmlStr +=
    '<td align="center" colspan="2"><p style="padding: 0 20px">最终合计金额（大写）：' +
    AmountCapitalized(object.end_money) +
    '</p></td>'
  htmlStr +=
    '<td align="center" colspan="4"><p style="padding: 0 20px">￥' +
    object.end_money +
    '</p></td>'
  htmlStr += '<tr>'
  htmlStr += '</table>'
  htmlStr += '<div style="margin:20px 0">地址：' + object.address + '</div>'
  htmlStr += '<div style="display: flex; justify-content: space-between">'
  htmlStr += '<div>电话：' + object.phone + '</div>'
  htmlStr += '<div>微信：' + object.wechat + '</div>'
  htmlStr += '<div>支付宝：' + object.alipay + '</div>'
  htmlStr += '<div>银行卡号：' + object.bank_card + '</div>'
  htmlStr += '<div>农行邱海军</div>'
  htmlStr += '</div>'
  htmlStr += '<div style="margin:20px 0">备注：' + object.remark + '</div>'
  htmlStr += '</div>'
  return htmlStr
}
// 金额转大写
function AmountCapitalized(n) {
  let fraction = ['角', '分']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ]
  let head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}
