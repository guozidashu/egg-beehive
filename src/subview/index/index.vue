<template>
  <div style="background-color: #f6f8f9">
    <!-- 走马灯和右侧概览 -->
    <el-row :gutter="20">
      <el-col :span="18">
        <div style="background-color: white; border-radius: 5px">
          <el-carousel height="255px" trigger="click">
            <el-carousel-item
              v-for="(item, index) in banner_list"
              :key="index"
              style="border-radius: 5px"
            >
              <el-image
                fit="fill"
                :src="item.banner_img"
                style="width: 100%; height: 100%"
                @click="externalLink(item.banner_url)"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="background-color: white; border-radius: 5px">
          <div
            style="
              position: relative;
              display: flex;
              justify-content: space-between;
              padding: 20px 20px 15px 20px;
            "
          >
            <div style="">
              <el-image
                src="https://oss.business.quanyu123.com//c2b5246e50fdad5fb062a060e869a31e.png"
                style="position: absolute; top: 10px; left: -3px"
              >
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
              <div style="position: absolute; top: 15px; left: 3px">至尊版</div>
              <div
                style="
                  position: relative;
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                  margin: 10px 0 0 50px;
                "
              >
                <div style="margin-top: -12px">{{ company_name }}</div>
                <div
                  style="
                    position: absolute;
                    right: -100px;
                    margin-top: -9px;
                    font-size: 12px;
                    color: #2795fa;
                  "
                  @click="centerDialogVisible = true"
                >
                  续费/升级
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧插件 -->
          <div
            style="
              display: flex;
              padding: 20px 20px 20px 20px;
              text-align: center;
            "
          >
            <div
              v-for="(item, index) in right_side_plug"
              :key="index"
              style="width: 33%; background-color: #fafafa"
            >
              <div :class="item.css_name">
                <div style="margin-left: 20px; background-color: #ffffff">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div
            style="display: flex; padding: 0 20px 20px 20px; text-align: center"
          >
            <div
              style="position: relative; width: 33%; background-color: #f7f8fa"
            >
              <div style="padding-top: 10px; font-size: 18px; font-weight: 600">
                {{ monitor_statistics.goods_monitor_count }}
              </div>
              <div style="padding: 10px 0; font-size: 12px; color: gray">
                监控商品
              </div>
              <span
                style="position: absolute; top: 20px; right: 0; color: #e6e6eb"
              >
                |
              </span>
            </div>
            <div
              style="position: relative; width: 33%; background-color: #f7f8fa"
            >
              <div style="padding-top: 10px; font-size: 18px; font-weight: 600">
                {{ monitor_statistics.customer_monitor_count }}
              </div>
              <div style="padding: 10px 0; font-size: 12px; color: gray">
                监控客户
              </div>
              <span
                style="position: absolute; top: 20px; right: 0; color: #e6e6eb"
              >
                |
              </span>
            </div>
            <div style="width: 33%; background-color: #f7f8fa">
              <el-button
                style="padding: 0; margin-top: 25px"
                type="text"
                @click="jump('monitoring')"
              >
                监控中心
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
          </div>
          <!-- 右侧应用 -->
          <el-row :gutter="10" style="padding: 0 20px 20px 20px">
            <el-col v-for="(item, index) in right_app" :key="index" :span="6">
              <div
                style="
                  padding: 20px 10px 10px 10px;
                  font-size: 12px;
                  font-weight: 900;
                  color: #626fc5;
                  text-align: center;
                  background: #f1f5ff;
                  border-radius: 5px;
                "
              >
                {{ item.name }}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 商品库和暴款 -->
    <div style="margin-top: 20px; background-color: #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="18">
          <!-- 跳转区域 -->
          <div style="padding: 15px 20px; background-color: white">
            <el-row :gutter="20">
              <el-col
                v-for="(item, index) in jump_region_list"
                :key="index"
                :span="6"
              >
                <div
                  :style="{
                    display: 'flex',
                    padding: '20px',
                    color: '#7e575f',
                    backgroundColor: item.background,
                    borderRadius: '5px',
                  }"
                >
                  <el-image
                    :src="item.title_img"
                    style="width: 20px; height: 20px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <div
                    style="margin-top: 2px; margin-left: 10px"
                    @click="jump(item.url)"
                  >
                    {{ item.title }}
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
                <div
                  v-for="(item1, index1) in item.child"
                  :key="index1"
                  style="padding: 20px 0 0 20px; font-size: 14px"
                >
                  {{ item1.name }}
                  <el-tag v-if="item1.tags" size="mini" :type="item1.tags_type">
                    {{ item1.tags }}
                  </el-tag>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 监控客户 -->
          <div
            style="
              padding: 20px;
              margin-top: 20px;
              background-color: white;
              border-radius: 5px;
            "
          >
            <div style="display: flex; justify-content: space-between">
              <div style="font-size: 14px">监控客户</div>
              <div
                style="font-size: 12px"
                @click="jump('monitoring', 'customer')"
              >
                更多
              </div>
            </div>
            <div style="display: flex; flex-wrap: wrap">
              <div
                v-for="(item, index) in recommended_monitoring_customer"
                :key="index"
                style="display: flex; width: 33%; margin-top: 28px"
              >
                <el-image
                  :src="item.customer_avatar"
                  style="width: 60px; height: 60px; border-radius: 50%"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="padding: 10px; margin-left: 10px">
                  <div style="margin-bottom: 10px; font-weight: 600">
                    {{ item.customer_name }}
                  </div>
                  <div style="font-size: 12px; color: #1890ff">
                    近三天拿货金额第{{ index + 1 }}名
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 监控商品 -->
        <el-col :span="6">
          <div
            style="
              padding: 20px 20px 30px 20px;
              background-color: white;
              border-radius: 5px;
            "
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
              "
            >
              <div style="font-size: 14px">监控商品分析</div>
              <div style="font-size: 12px" @click="jump('monitoring')">
                更多
              </div>
            </div>
            <div
              v-for="(item, index) in monitor_goods"
              :key="index"
              style="display: flex; margin-top: 20px"
            >
              <el-image :src="item.goods_img" style="width: 60px; height: 60px">
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
              <el-card
                class="box-card"
                shadow="never"
                style="width: 80%; margin-bottom: 0; margin-left: 10px"
              >
                <div
                  style="
                    margin-bottom: 10px;
                    overflow: hidden;
                    font-weight: 600;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ item.goods_name }}
                </div>
                <div style="font-size: 12px">
                  销量 {{ item.sale_num }} 件 &nbsp;{{
                    item.goods_upper_time | formatTimeData
                  }}
                  &nbsp;上架 {{ item.upper_day }}&nbsp;天
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--热销、飙升 -->
    <div style="margin-top: 20px; background-color: #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="sell_well_warp">
            <el-image
              class="sell_well_img"
              fit="fill"
              src="https://oss.business.quanyu123.com//50bcc50006a75081dc3f8f979ee98be7.png"
            />
            <div class="sell_well_div">
              <div style="font-size: 14px">商品热销榜</div>
              <div style="font-size: 12px" @click="jump('report/reportGoods')">
                更多
              </div>
            </div>
            <div
              v-for="(item, index) in goods_sell_well"
              :key="index"
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div style="display: flex">
                <QYRanking
                  :index="index"
                  style="margin: 30px 10px 0 0"
                  :type="8"
                />
                <el-image
                  :src="item.goods_img"
                  style="width: 100px; height: 100px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    {{ item.goods_sn }}
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 5px 0 0 0;
                    "
                  >
                    <div
                      style="
                        width: 150px;
                        overflow: hidden;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ item.goods_name }}
                    </div>
                  </div>

                  <div style="display: flex; width: 100%; margin: 10px 0">
                    <el-tag v-if="item.category_name" type="info">
                      {{ item.category_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="item.year_name" type="info">
                      {{ item.year_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="item.season_name" type="info">
                      {{ item.season_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="item.band_name" type="info">
                      {{ item.band_name }}
                    </el-tag>
                  </div>
                  <div style="margin: 10px 0 0 0">
                    {{ item.goods_upper_time | formatTime }}
                  </div>
                </div>
              </div>
              <div>
                <div
                  style="
                    padding: 20px 0 10px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: red;
                    text-align: right;
                  "
                >
                  {{ item.sale_amount | ConversionAmount }}
                </div>
                <div>
                  售价 &nbsp; {{ item.goods_price | moneyFormat }}&nbsp; 元
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="soar_warp">
            <el-image
              class="sell_well_img"
              fit="fill"
              src="https://oss.business.quanyu123.com//e3f1c56bf92dcc30f9c63c7bb02bb67f.png"
            />
            <div class="sell_well_div">
              <div style="font-size: 14px">商品飙升榜</div>
              <div style="margin-top: -15px">
                <el-radio-group v-model="time">
                  <el-radio-button label="七天" />
                  <el-radio-button label="15天" />
                  <el-radio-button label="30天" />
                </el-radio-group>
              </div>
            </div>
            <div
              v-for="(item, index) in goods_soar"
              :key="index"
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div style="display: flex">
                <QYRanking
                  :index="index"
                  style="margin: 30px 10px 0 0"
                  :type="7"
                />
                <el-image
                  :src="item.goods_img"
                  style="width: 100px; height: 100px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    {{ item.goods_sn }}
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 5px 0 0 0;
                    "
                  >
                    <div
                      style="
                        width: 150px;
                        overflow: hidden;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ item.goods_name }}
                    </div>
                  </div>

                  <div style="display: flex; width: 100%; margin: 10px 0">
                    <el-tag v-if="item.category_name" type="info">
                      {{ item.category_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="item.year_name" type="info">
                      {{ item.year_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="item.season_name" type="info">
                      {{ item.season_name }}
                    </el-tag>
                    &nbsp;
                    <el-tag v-if="item.band_name" type="info">
                      {{ item.band_name }}
                    </el-tag>
                  </div>
                  <div style="margin: 10px 0 0 0">
                    {{ item.goods_upper_time | formatTime }}
                  </div>
                </div>
              </div>
              <div>
                <div
                  style="
                    padding: 20px 0 10px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: red;
                    text-align: right;
                  "
                >
                  {{ item.sale_amount | ConversionAmount }}
                </div>
                <div>
                  售价 &nbsp; {{ item.goods_price | moneyFormat }}&nbsp; 元
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--拿货、品牌 -->
    <div style="margin-top: 20px; background-color: #f6f8f9">
      <el-row :gutter="20">
        <!-- 客户拿货排行榜 -->
        <el-col :span="12">
          <div class="sell_well_warp">
            <el-image
              class="sell_well_img"
              fit="fill"
              src="https://oss.business.quanyu123.com//50bcc50006a75081dc3f8f979ee98be7.png"
            />
            <div class="sell_well_div">
              <div style="font-size: 14px">客户拿货排行榜</div>
              <div
                style="font-size: 12px"
                @click="jump('report/reportCustomer')"
              >
                更多
              </div>
            </div>
            <div style="display: flex">
              <div
                v-for="(item, index) in customer_ranking"
                :key="index"
                :style="{
                  width: '33%',
                  marginTop: index == 0 ? '30px' : index == 1 ? '0px' : '50px',
                  textAlign: 'center',
                }"
              >
                <div style="position: relative">
                  <el-image
                    :src="
                      index == 0
                        ? 'https://oss.business.quanyu123.com//7f2f279fe5fbf0d86fb568673ac871b1.png'
                        : index == 1
                        ? 'https://oss.business.quanyu123.com//053e8de20c3c5c214fff0704750a15d8.png'
                        : 'https://oss.business.quanyu123.com//ad017a3aac2926e21cc65020087405da.png'
                    "
                    style="
                      position: absolute;
                      top: 0px;
                      z-index: 99;
                      width: 25px;
                      height: 25px;
                      transform: rotate(330deg);
                    "
                  />
                  <el-image
                    :src="item.customer_avatar"
                    style="
                      z-index: 1;
                      width: 60px;
                      height: 60px;
                      margin-top: 15px;
                      border-radius: 50%;
                    "
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </div>
                <div style="padding: 10px; margin-left: 10px">
                  <div style="font-weight: 600">{{ item.customer_name }}</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    {{ item.sale_amount | ConversionAmount }}
                  </div>
                  <div style="font-size: 12px">
                    拿货次数 {{ item.sale_count }}
                  </div>
                </div>
              </div>
            </div>
            <el-image
              src=" https://oss.business.quanyu123.com//de6c498a9af2ab4acbe9802116a2ae51.png"
              style="margin-top: -40px"
            />
          </div>
        </el-col>
        <!-- 热销品牌榜 -->
        <el-col :span="12">
          <div class="soar_warp">
            <el-image
              class="sell_well_img"
              fit="fill"
              src="https://oss.business.quanyu123.com//e3f1c56bf92dcc30f9c63c7bb02bb67f.png"
            />
            <div class="sell_well_div">
              <div style="font-size: 14px">热销品牌榜</div>
              <div style="font-size: 12px">更多</div>
            </div>
            <div style="display: flex">
              <div
                v-for="(item, index) in brand_ranking"
                :key="index"
                :style="{
                  width: '33%',
                  marginTop: index == 0 ? '30px' : index == 1 ? '0px' : '50px',
                  textAlign: 'center',
                }"
              >
                <div style="position: relative">
                  <el-image
                    :src="
                      index == 1
                        ? 'https://oss.business.quanyu123.com//7f2f279fe5fbf0d86fb568673ac871b1.png'
                        : index == 0
                        ? 'https://oss.business.quanyu123.com//053e8de20c3c5c214fff0704750a15d8.png'
                        : 'https://oss.business.quanyu123.com//ad017a3aac2926e21cc65020087405da.png'
                    "
                    style="
                      position: absolute;
                      top: 0px;
                      z-index: 99;
                      width: 25px;
                      height: 25px;
                      transform: rotate(330deg);
                    "
                  />
                  <el-image
                    :src="item.brand_img"
                    style="
                      z-index: 1;
                      width: 60px;
                      height: 60px;
                      margin-top: 15px;
                    "
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </div>
                <div style="padding: 10px; margin-left: 10px">
                  <div style="font-weight: 600">{{ item.brand_name }}</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    {{ item.sale_amount | ConversionAmount }}
                  </div>
                  <div style="font-size: 12px">
                    在售商品数 {{ item.sale_goods_count }}
                  </div>
                </div>
              </div>
            </div>
            <el-image
              src=" https://oss.business.quanyu123.com//9015fe8fbf8df3de97c2bcd3a4e53c32.png"
              style="margin-top: -40px"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <CustomerService
      :center-dialog-visible="centerDialogVisible"
      @close="close"
    />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  import CustomerService from '@/subview/components/Edit/CustomerService'
  export default {
    components: { CustomerService },
    mixins: [datajosn],
    data() {
      return {
        time: '30天',
        // 客服弹窗
        centerDialogVisible: false,
        // 走马灯数组
        banner_list: [],
        // 右侧插件
        right_side_plug: [
          {
            name: '采集插件',
            css_name: 'plug_icon',
          },
          {
            name: '智能分析',
            css_name: 'plug_icon',
          },
          {
            name: '报表工具',
            css_name: 'plug_icon',
          },
        ],
        // 右侧应用
        right_app: [
          {
            name: '供应链',
          },
          {
            name: '研发协同',
          },
          {
            name: '私域商城',
          },
          {
            name: '生产跟单',
          },
        ],
        // 跳转区域
        jump_region_list: [
          {
            title: '商品库',
            title_img:
              'https://oss.business.quanyu123.com//938da43042397e244a2a78dba1828491.png',
            url: 'goods/goodsManage',
            background: '#eff3ff',
            child: [
              {
                name: '今日热销商品',
                tags: '热销',
                tags_type: 'warning',
                url: 'goods/goodsManage',
              },
              {
                name: '商城热销商品',
                url: 'goods/goodsManage',
              },
              {
                name: '热销飙升商品',
                url: 'goods/goodsManage',
              },
              {
                name: '新品智测',
                tags: 'NEW',
                tags_type: 'danger',
                url: 'goods/goodsManage',
              },
            ],
          },

          {
            title: '客户库',
            title_img:
              'https://oss.business.quanyu123.com//74651669d06777e0a5886faaa37efd56.png',
            background: '#e8f5fb',
            url: 'customer/customerManage',
            child: [
              {
                name: '今日拿货最多',
                tags: 'HOT',
                tags_type: 'danger',
                url: 'goods/goodsManage',
              },
              {
                name: '拿货客户排行',
                url: 'goods/goodsManage',
              },
              {
                name: '拿货飙升客户',
                url: 'goods/goodsManage',
              },
              {
                name: '高价值优质客户',
                tags: '推荐',
                tags_type: 'warning',
                url: 'goods/goodsManage',
              },
            ],
          },
          {
            title: '去发货',
            title_img:
              'https://oss.business.quanyu123.com//e3a1bb70414e9d40984fd3fa75919020.png',
            url: 'order/orderCustomerDelivery',
            background: '#e4f7f5',
            child: [
              {
                name: '客户发货列表',
                url: 'goods/goodsManage',
              },
              {
                name: '商品发货汇总分析',
                url: 'goods/goodsManage',
              },
              {
                name: '退货数据分析',
                url: 'goods/goodsManage',
              },
              {
                name: '进销存数据分析',
                url: 'goods/goodsManage',
              },
            ],
          },
          {
            title: '看回款',
            title_img:
              'https://oss.business.quanyu123.com//21378edba2b54fa5e0479d60ba62bdc3.png',
            background: '#eef7e5',
            url: 'financial/financialCustomerVoucher',
            child: [
              {
                name: '那个回款最多',
                url: 'goods/goodsManage',
              },
              {
                name: '那个客户欠款多',
                url: 'goods/goodsManage',
              },
              {
                name: '那个客户回款快',
                url: 'goods/goodsManage',
              },
              {
                name: '那个客户回款慢',
                url: 'goods/goodsManage',
              },
            ],
          },
        ],
        // 监控客户
        recommended_monitoring_customer: [],
        // 监控商品
        monitor_goods: [],
        // 热销商品
        goods_sell_well: [],
        // 飙升商品
        goods_soar: [],
        // 客户排行
        customer_ranking: [],
        // 品牌排行
        brand_ranking: [],
        // 监控数据
        monitor_statistics: {},
      }
    },
    computed: {
      ...mapGetters({
        company_name: 'user/company_name',
      }),
    },
    watch: {
      company_name: {
        handler: function () {},
        deep: true,
        immediate: true,
      },
      // 监听时间变化
      time: {
        handler: function (newval) {
          this.get_goods_soar(newval)
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.get_monitor_statistics()
      this.get_banner_list()
      this.get_recommended_monitoring_customer()
      this.get_monitor_goods()
      this.get_goods_sell_well()
      this.get_customer_ranking()
      this.get_brand_ranking()
    },
    methods: {
      // 关闭弹窗
      close() {
        this.centerDialogVisible = false
      },
      // 跳转页面
      jump(url, type) {
        if (type == undefined) {
          this.$router.push({
            path: '/' + url,
          })
        } else {
          this.$router.push({
            path: '/' + url,
            query: {
              type: type,
            },
          })
        }
      },
      // 走马灯跳转外部页面
      externalLink(url) {
        window.open(url)
      },
      // 获取走马灯数据
      async get_banner_list() {
        const { data } = await this.api.getHomeBannerList()
        this.banner_list = data
      },
      // 获取监控客户
      async get_recommended_monitoring_customer() {
        const { data } = await this.api.getHomeRecommendMonitorCustomer()
        this.recommended_monitoring_customer = data
      },
      // 获取监控商品
      async get_monitor_goods() {
        const { data } = await this.api.getHomeMonitorGoodsAnalysis()
        this.monitor_goods = data
      },
      // 获取热销商品
      async get_goods_sell_well() {
        const { data } = await this.api.getHomeGoodsHotRank()
        this.goods_sell_well = data
      },
      // 获取商品飙升
      async get_goods_soar(value) {
        let time = []
        if (value == '30天') {
          time = this.getPastTime(29)
        } else if (value == '七天') {
          time = this.getWeenTime(6)
        } else if (value == '15天') {
          time = this.getPastTime(14)
        }
        const { data } = await this.api.getHomeGoodsSoarRank({
          start_date: time[0],
          end_date: time[1],
        })
        this.goods_soar = data
      },
      // 获取客户排行
      async get_customer_ranking() {
        const { data } = await this.api.getHomeCustomerSaleRank()
        const a = 0
        const b = 1
        const temp = data[a]
        const temp1 = data[b]
        data[a] = temp1
        data[b] = temp
        this.customer_ranking = data
      },
      // 获取品牌排行
      async get_brand_ranking() {
        const { data } = await this.api.getHomeBrandHotRank()
        const a = 0
        const b = 1
        const temp = data[a]
        const temp1 = data[b]
        data[a] = temp1
        data[b] = temp
        this.brand_ranking = data
      },

      // 获取监控数据
      async get_monitor_statistics() {
        const { data } = await this.api.getHomeMonitorStatistics()
        this.monitor_statistics = data
      },
    },
  }
</script>
<style lang="scss" scoped>
  // 走马灯样式
  .el-carousel__item h3 {
    margin: 0;
    font-size: 14px;
    line-height: 150px;
    color: #475669;
    opacity: 0.75;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  // 插件图标样式
  .plug_icon {
    width: 100px;
    background-image: url('https://oss.business.quanyu123.com//b0a7f769f67891838ddf3d8f495116b2.png');
    background-size: 100% 100%;
  }
  // 商品热销,客户排行
  .soar_warp {
    position: relative;
    padding: 20px;
    background: -webkit-linear-gradient(top, #f1f5ff 0%, #fff 10%);
    background-color: white;
    border-radius: 5px;
  }
  .sell_well_warp {
    position: relative;
    padding: 20px;
    background: -webkit-linear-gradient(top, #fff5f3 0%, #fff 10%);
    background-color: white;
    border-radius: 5px;
  }
  .sell_well_img {
    position: absolute;
    top: 15px;
    left: 70px;
    width: 40px;
    height: 25px;
  }
  .sell_well_div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
</style>
