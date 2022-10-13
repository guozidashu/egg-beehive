<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="聚水潭ERP" name="聚水潭ERP" />
        <el-tab-pane label="旺店通ERP" name="旺店通ERP" />
        <el-tab-pane label="伯俊BOS" name="伯俊BOS" />
        <el-tab-pane label="百胜ERP" name="百胜ERP" />
        <el-tab-pane label="紫日ERP" name="紫日ERP" />
      </el-tabs>
      <div
        v-if="activeName == '聚水潭ERP'"
        class="textCss"
        v-html="listText[0].text"
      ></div>
      <div
        v-if="activeName == '旺店通ERP'"
        class="textCss"
        v-html="listText[1].text"
      ></div>
      <div
        v-if="activeName == '伯俊BOS'"
        class="textCss"
        v-html="listText[2].text"
      ></div>
      <div
        v-if="activeName == '百胜ERP'"
        class="textCss"
        v-html="listText[3].text"
      ></div>
      <div
        v-if="activeName == '紫日ERP'"
        class="textCss"
        v-html="listText[4].text"
      ></div>
      <el-form
        v-if="activeName == '聚水潭ERP' || activeName == '旺店通ERP'"
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 100%"
      >
        <div style="font-weight: 600">对接设置</div>
        <el-divider />
        <el-form-item label="是否开启接口" style="margin-bottom: 0">
          <el-radio-group v-model="form.state">
            <el-radio label="启用" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <span style="color: #999">启用后才会同步商品、订单、库存数据</span>
        </el-form-item>
        <div v-if="activeName == '聚水潭ERP'">
          <el-form-item label=" 聚水潭账号">
            <el-input
              v-model="form.name"
              placeholder="请输入聚水潭管理登录账号"
              style="width: 250px"
            />
          </el-form-item>

          <el-form-item label=" 聚水潭密码">
            <el-input
              v-model="form.name"
              placeholder="请输入聚水潭管理登录密码"
              style="width: 250px"
            />
          </el-form-item>
          <el-form-item label=" 聚水潭APP Key">
            <el-input
              v-model="form.name"
              placeholder="请输入聚水潭APP Key "
              style="width: 250px"
            />
          </el-form-item>
          <el-form-item label=" 聚水潭APP Secret">
            <el-input
              v-model="form.name1"
              placeholder="请输入聚水潭APP Secret "
              style="width: 250px"
            />
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="旺店通账号">
            <el-input
              v-model="form.name"
              placeholder="请输入旺店通管理登录账号"
              style="width: 250px"
            />
          </el-form-item>
          <el-form-item label="旺店通密码">
            <el-input
              v-model="form.name"
              placeholder="请输入旺店通管理登录密码"
              style="width: 250px"
            />
          </el-form-item>
          <el-form-item label="旺店通APP Key">
            <el-input
              v-model="form.name"
              placeholder="请输入旺店通APP Key "
              style="width: 250px"
            />
          </el-form-item>
          <el-form-item label="旺店通APP Secret">
            <el-input
              v-model="form.name1"
              placeholder="请输入旺店通APP Secret "
              style="width: 250px"
            />
          </el-form-item>
        </div>

        <el-form-item label="店铺编号（ShopId）">
          <el-input
            v-model="form.name1"
            placeholder="请输入ShopId "
            style="width: 250px"
          />
        </el-form-item>
        <el-form-item label="开放平台应用回调地址">
          <span style="color: rgb(251, 102, 56)">
            https://v.99xcx.cn/shop/apps/erp321/client/api2/q36dye440r01
            <span style="color: #1890ff">复制</span>
          </span>
        </el-form-item>
        <el-form-item label="商品编辑">
          <el-radio-group v-model="form.stat2e">
            <el-radio label="自动同步修改内容" />
            <el-radio label="不同步修改内容" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确认</el-button>
        </el-form-item>
        <div style="font-weight: 600">授权设置</div>
        <el-divider />
        <el-form-item>
          <el-button
            v-if="form.type == 'primary'"
            type="primary"
            @click="form.type = 'info'"
          >
            商家授权
            <vab-icon icon="check-fill" />
          </el-button>
          <el-button
            v-if="form.type == 'info'"
            type="info"
            @click="form.type = 'primary'"
          >
            商家授权
            <vab-icon icon="check-fill" />
          </el-button>
        </el-form-item>
        <div style="font-weight: 600">回调配置</div>
        <el-divider style="margin-bottom: 0" />
        <div class="textCss">
          将以下信息复制到ERP系统中，用于接收ERP订单库存变化信息
        </div>
        <el-form-item label="物流同步">
          <span style="color: rgb(251, 102, 56)">
            https://v.99xcx.cn/shop/apps/erp321/client/api2/q36dye440r01
            <span style="color: #1890ff">复制</span>
          </span>
        </el-form-item>
        <el-form-item label="取消订单">
          <span style="color: rgb(251, 102, 56)">
            https://v.99xcx.cn/shop/apps/erp321/client/api2/q36dye440r01
            <span style="color: #1890ff">复制</span>
          </span>
        </el-form-item>
        <el-form-item label="库存同步">
          <span style="color: rgb(251, 102, 56)">
            https://v.99xcx.cn/shop/apps/erp321/client/api2/q36dye440r01
            <span style="color: #1890ff">复制</span>
          </span>
        </el-form-item>
        <el-form-item label="售后收货">
          <span style="color: rgb(251, 102, 56)">
            https://v.99xcx.cn/shop/apps/erp321/client/api2/q36dye440r01
            <span style="color: #1890ff">复制</span>
          </span>
        </el-form-item>
        <div style="font-weight: 600">商品同步</div>
        <el-divider />
        <div class="textCss">
          <p>
            点击同步商品按钮，可将商城商品同步至聚水潭，首次使用时，需要先进行商品同步，后续新增编辑修改商品时，会自动同步
          </p>
          <p>
            同步商品至聚水潭，需要设置商品编码，未设置商品编码的商品不能同步。
          </p>
        </div>
        <el-form-item>
          <el-button
            v-if="form.type1 == 'primary'"
            type="primary"
            @click="form.type1 = 'info'"
          >
            同步商品
            <vab-icon icon="check-fill" />
          </el-button>
          <el-button
            v-if="form.type1 == 'info'"
            type="info"
            @click="form.type1 = 'primary'"
          >
            同步商品
            <vab-icon icon="check-fill" />
          </el-button>
        </el-form-item>
        <div style="font-weight: 600">库存同步</div>
        <el-divider />
        <div class="textCss">
          商品同步成功后，点击同步库存按钮，可以将ERP中的商品库存同步至商城中
        </div>
        <el-form-item>
          <el-button
            v-if="form.type2 == 'primary'"
            type="primary"
            @click="form.type2 = 'info'"
          >
            同步库存
            <vab-icon icon="check-fill" />
          </el-button>
          <el-button
            v-if="form.type2 == 'info'"
            type="info"
            @click="form.type2 = 'primary'"
          >
            同步库存
            <vab-icon icon="check-fill" />
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        v-else
        ref="form"
        label-position="right"
        label-width="180px"
        :model="form"
        style="width: 100%"
      >
        <div style="font-weight: 600">对接设置</div>
        <el-divider />
        <el-form-item label="是否开启接口" style="margin-bottom: 0">
          <el-radio-group v-model="form.state">
            <el-radio label="启用" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <span style="color: #999">
            启用后才会同步会员、商品、订单、库存数据
          </span>
        </el-form-item>
        <el-form-item v-if="activeName == '百胜ERP'" label="ERP版本">
          <el-radio-group v-model="form.resource5">
            <el-radio label="BSERP2" />
            <el-radio label="BS3000+" />
            <el-radio label="BSERP3+IPOS" />
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="activeName == '伯俊BOS'" label="ERP版本">
          <el-radio-group v-model="form.resource5">
            <el-radio label="BOSXE" />
            <el-radio label="BOS_2.0" />
            <el-radio label="BOS_3.0" />
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="activeName == '紫日ERP'" label="ERP版本">
          <el-radio-group v-model="form.resource5">
            <el-radio label="Q3" />
            <el-radio label="Q5" />
            <el-radio label="Q7" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" 数据库链接地址">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 数据库账号">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 数据库密码">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 数据库名">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" ERP管理员">
          <el-input placeholder="默认QuanYu " style="width: 350px" />
        </el-form-item>
        <div style="font-weight: 600">基本资料</div>
        <el-divider />
        <el-form-item label="是否开启分销机制">
          <el-radio-group v-model="form.state">
            <el-radio label="启用" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" 客户类别代码">
          <el-input style="width: 350px" />
          <span style="margin-left: 20px; color: rgb(153, 153, 153)">
            直营店对应的客户类别代码
          </span>
        </el-form-item>
        <el-form-item label="  默认区域代码/ID">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认充值方式ID">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认制单人ID">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认制单人等级ID">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认组织/渠道代码">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认仓库代码">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认员工代码">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认卡系代码">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认卡类代码">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 默认类别代码">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item label=" 线下可分销订单的支付方式">
          <el-input style="width: 350px" />
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button type="primary" @click="submitForm('form')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'SystemStorage',
    data() {
      return {
        activeName: '本地储存',
        form: {
          name: '',
          state: '',
          date: '',
          date2: '',
          delivery: false,
          type: 'primary',
          type1: 'primary',
          type2: 'primary',
          resource: '',
          description: '',
          area: [],
          checkList: '微信钱包',
        },
        listText: [
          {
            text: '<p>用于对接聚水潭ERP，实现相互同步商品、订单、库存数据等，使用该功能需要先购买聚水潭ERP。</p> ',
          },
          {
            text: '<p>用于对接旺店通ERP，实现相互同步商品、订单、库存数据等，使用该功能需要先购买旺店通ERP。</p> ',
          },
          {
            text: '<p>用于对接伯俊BOS，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买伯俊BOS。</p> ',
          },
          {
            text: '<p>用于对接百胜ERP，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买百胜ERP。</p> ',
          },
          {
            text: '用于对接紫日ERP，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买紫日ERP。 ',
          },
        ],
      }
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .textCss {
    padding: 8px 16px 8px 16px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 22px;
    color: #666;
    background-color: #e8f4ff;
    border-radius: 6px;
  }
</style>
