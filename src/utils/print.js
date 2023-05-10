// 生成配货单打印文本 通过 object 传入数据
export function getDistributionGoodsHtml1() {
  let object = {
    logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F09%2F20210709142454_dc8dc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670217619&t=7e7d4ed',
    title: '集时供应链',
    subTitle: '您好，这是贵公司的电子对账单，请核实！',
    time: '2020-02-02 15:00:00',
    name: '「&nbsp;洛一服饰&nbsp;」&nbsp;电子对账单',
    table: [
      {
        time: '2020-02-02 15:00:00',
        sn: '1111111',
        num: 1,
        price: 100,
        price1: 100,
        type: '聚水潭',
        beizhu: '备注',
        name: '洛一服饰',
        fk_type: '支付宝',
        fk_leixin: '类型1',
      },
      {
        time: '2020-02-02 15:00:00',
        sn: '1111111',
        num: 1,
        price: 100,
        price1: 100,
        type: '自主仓',
        beizhu: '备注',
        name: '洛一服饰',
        fk_type: '支付宝',
        fk_leixin: '类型1',
      },
    ],
  }
  let htmlStr = ''
  htmlStr += '<div style=" padding-right:20px">'
  htmlStr += '<div style="display: flex; justify-content: space-between">'
  htmlStr += '<div style="display: flex">'
  htmlStr +=
    '<img src="' + object.logo + '" style="width: 70px; height: 70px;" />' // logo
  htmlStr += '<div style="margin-left: 40px">'
  htmlStr +=
    '<div style="padding: 10px 0 0 0; font-size: 18px">' +
    object.title +
    '</div>' // 标题
  htmlStr += '<div style="color: gray">' + object.subTitle + '</div>' // 副标题
  htmlStr += '</div>'
  htmlStr += '</div>'
  htmlStr += '<div>'
  htmlStr += '<div style="color: gray">生产日期：' + object.time + '</div>' // 时间
  htmlStr += '<div style="padding: 10px; color: gray">' + object.name + '</div>' // 名称
  htmlStr += '<div style="color: gray">账单周期：' + object.time + '</div>' // 时间
  htmlStr += '</div>'
  htmlStr += '</div>'
  htmlStr += '<div style="padding: 20px">'
  htmlStr += '<div style="display: flex">'
  htmlStr +=
    '<div style="position: relative;width: 22%;padding: 10px 0;margin-right: 10px;color: white;text-align: center;background-color: #527fda;">'
  htmlStr += '<div>累计应付金额</div>'
  htmlStr += '<div>￥1000.00</div>'
  htmlStr +=
    '<div style="position: absolute; top: 20px;right: -10px; width: 20px;height: 20px;padding: 2px 0 0 0;color: black;background-color: #f5f5f5; border: 1px solid #e2e2e2;">'
  htmlStr += '='
  htmlStr += '</div>'
  htmlStr += '</div>'

  htmlStr +=
    '<div style="position: relative;width: 18%;padding: 10px 0;margin-right: 10px;color: white;text-align: center;background-color: #f5f5f5">'
  htmlStr +=
    '<div style="position: absolute;top: 0;width: 100%;height: 4px;background-color: #527fda;"></div>'
  htmlStr += '<div style="color: #527fda">入仓应付金额</div>'
  htmlStr += '<div style="color: black">￥1000.00</div>'
  htmlStr +=
    '<div style="position: absolute; top: 20px;right: -10px; width: 20px;height: 20px;padding: 2px 0 0 0;color: black;background-color: #f5f5f5; border: 1px solid #e2e2e2;">'
  htmlStr += '+'
  htmlStr += '</div>'
  htmlStr += '</div>'

  htmlStr +=
    '<div style="position: relative;width: 18%;padding: 10px 0;margin-right: 10px;color: white;text-align: center;background-color: #f5f5f5">'
  htmlStr +=
    '<div style="position: absolute;top: 0;width: 100%;height: 4px;background-color: #527fda;"></div>'
  htmlStr += '<div style="color: #cfb7e0">报废出库金额</div>'
  htmlStr += '<div style="color: black">￥1000.00</div>'
  htmlStr +=
    '<div style="position: absolute; top: 20px;right: -10px; width: 20px;height: 20px;padding: 2px 0 0 0;color: black;background-color: #f5f5f5; border: 1px solid #e2e2e2;">'
  htmlStr += '-'
  htmlStr += '</div>'
  htmlStr += '</div>'

  htmlStr +=
    '<div style="position: relative;width: 18%;padding: 10px 0;margin-right: 10px;color: white;text-align: center;background-color: #f5f5f5">'
  htmlStr +=
    '<div style="position: absolute;top: 0;width: 100%;height: 4px;background-color: #527fda;"></div>'
  htmlStr += '<div style="color: #77c1b7">实付金额</div>'
  htmlStr += '<div style="color: black">￥1000.00</div>'
  htmlStr +=
    '<div style="position: absolute; top: 20px;right: -10px; width: 20px;height: 20px;padding: 2px 0 0 0;color: black;background-color: #f5f5f5; border: 1px solid #e2e2e2;">'
  htmlStr += '-'
  htmlStr += '</div>'
  htmlStr += '</div>'

  htmlStr +=
    '<div style="position: relative;width: 18%;padding: 10px 0;margin-right: 10px;color: white;text-align: center;background-color: #f5f5f5">'
  htmlStr +=
    '<div style="position: absolute;top: 0;width: 100%;height: 4px;background-color: #527fda;"></div>'
  htmlStr += '<div style="color: #527fda">其他优惠</div>'
  htmlStr += '<div style="color: black">￥1000.00</div>'
  htmlStr += '</div>'
  htmlStr += '</div>'

  htmlStr += '<div style="display: flex; padding: 10px 0">'
  htmlStr += '<div style="width: 2px; height: 20px; background-color: #5984d9">'
  htmlStr += '</div>'
  htmlStr +=
    '<div style="margin-top: 2px; margin-left: 20px">生产入库明细</div>'
  htmlStr += '</div>'

  htmlStr +=
    '<table border="1" cellpadding="0" cellspacing="0" style=" border-color:#ECEDED;width:97%">'
  htmlStr += '<tr style=" border-color:#ECEDED">'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p style="padding: 20px 0">序号</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED ;background-color: #F5F5F5;"><p>业务日期</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>业务单号</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>入库数量</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>应付金额（元）</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>入至仓库</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>备注</p></th>'
  if (object.table.length > 0) {
    object.table.forEach((item, index) => {
      htmlStr += '<tr style=" border-color:#ECEDED">'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p style="padding: 10px 0">' +
        (index + 1) +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.time +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.sn +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.num +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>￥' +
        item.price +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.type +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.beizhu +
        '</p></td>'
      htmlStr += '</tr>'
    })
  } else {
    htmlStr += '</tr>'
    htmlStr +=
      '<td align="center" colspan="7"><p style="padding: 20px">当前列表无数据</p></td>'
    htmlStr += '<tr style=" border-color:#ECEDED">'
    htmlStr += '</tr>'
  }
  htmlStr += '</table>'

  htmlStr += '<div style="display: flex; padding: 10px 0">'
  htmlStr += '<div style="width: 2px; height: 20px; background-color: #1FB5AC">'
  htmlStr += '</div>'
  htmlStr += '<div style="margin-top: 2px; margin-left: 20px">退货明细</div>'
  htmlStr += '</div>'

  htmlStr +=
    '<table border="1" cellpadding="0" cellspacing="0" style=" border-color:#ECEDED;width:97%">'
  htmlStr += '<tr style=" border-color:#ECEDED">'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p style="padding: 20px 0">序号</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED ;background-color: #F5F5F5;"><p>业务日期</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>业务单号</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>退货数量</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>退货金额（元）</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>退货仓库</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>备注</p></th>'
  if (object.table.length > 0) {
    object.table.forEach((item, index) => {
      htmlStr += '<tr style=" border-color:#ECEDED">'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p style="padding: 10px 0">' +
        (index + 1) +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.time +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.sn +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.num +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>￥' +
        item.price +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.type +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.beizhu +
        '</p></td>'
      htmlStr += '</tr>'
    })
  } else {
    htmlStr += '</tr>'
    htmlStr +=
      '<td align="center" colspan="7"><p style="padding: 20px">当前列表无数据</p></td>'
    htmlStr += '<tr style=" border-color:#ECEDED">'
    htmlStr += '</tr>'
  }
  htmlStr += '</table>'

  htmlStr += '<div style="display: flex; padding: 10px 0">'
  htmlStr += '<div style="width: 2px; height: 20px; background-color: #FE8661">'
  htmlStr += '</div>'
  htmlStr += '<div style="margin-top: 2px; margin-left: 20px">付款明细</div>'
  htmlStr += '</div>'

  htmlStr +=
    '<table border="1" cellpadding="0" cellspacing="0" style=" border-color:#ECEDED;width:97%">'
  htmlStr += '<tr style=" border-color:#ECEDED">'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p style="padding: 20px 0">序号</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED ;background-color: #F5F5F5;"><p>业务日期</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>业务单号</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>付款方式</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>本次收款（元）</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>优惠（元）</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>付款类型</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>操作人</p></th>'
  htmlStr +=
    '<th align="center" style=" border-color:#ECEDED;background-color: #F5F5F5;"><p>备注</p></th>'
  if (object.table.length > 0) {
    object.table.forEach((item, index) => {
      htmlStr += '<tr style=" border-color:#ECEDED">'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p style="padding: 10px 0">' +
        (index + 1) +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.time +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.sn +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.fk_type +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>￥' +
        item.price +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.price1 +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.fk_leixin +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.name +
        '</p></td>'
      htmlStr +=
        '<td align="center" style=" border-color:#ECEDED"><p>' +
        item.beizhu +
        '</p></td>'
      htmlStr += '</tr>'
    })
  } else {
    htmlStr += '</tr>'
    htmlStr +=
      '<td align="center" colspan="9"><p style="padding: 20px">当前列表无数据</p></td>'
    htmlStr += '<tr style=" border-color:#ECEDED">'
    htmlStr += '</tr>'
  }
  htmlStr += '</table>'

  htmlStr += '</div>'
  htmlStr += '</div>'
  return htmlStr
}
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
