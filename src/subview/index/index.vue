<template>
  <div style="background-color: #f6f8f9">
    <!-- 走马灯和右侧概览 -->
    <el-row :gutter="20">
      <el-col :span="18">
        <div style="background-color: white; border-radius: 5px">
          <el-carousel height="225px" trigger="click">
            <el-carousel-item
              v-for="item in 4"
              :key="item"
              style="border-radius: 5px"
            >
              <img
                src="https://img.wechatboss.com/FgSPgakMOZN7FUVKV8HnKlw1-SKe"
                style="width: 100%; height: 100%"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="background-color: white; border-radius: 5px">
          <div
            style="display: flex; justify-content: space-between; padding: 10px"
          >
            <div style="position: relative; display: flex">
              <el-image
                src="https://oss.business.quanyu123.com//c2b5246e50fdad5fb062a060e869a31e.png"
              >
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
              <div style="position: absolute; top: 3px; left: 3px">至尊版</div>
              <div style="margin: 5px 10px 5px 10px">杭州洛一服饰有限公司</div>
            </div>
            <div style="display: flex">
              <div style="margin-top: 9px; margin-right: 10px; font-size: 12px">
                481天后到期
              </div>
              <el-button style="padding: 2px 0 0 0" type="text">
                咨询
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
          </div>
          <div style="display: flex; padding: 10px 20px; text-align: center">
            <div style="width: 33%; background-color: #fafafa">
              <div class="plug_icon">
                <div style="margin-left: 20px; background-color: #ffffff">
                  采集插件
                </div>
              </div>
            </div>
            <div style="width: 33%; background-color: #fafafa">
              <div class="plug_icon">
                <div style="margin-left: 20px; background-color: #ffffff">
                  智能分析
                </div>
              </div>
            </div>
            <div style="width: 33%; background-color: #fafafa">
              <div class="plug_icon">
                <div style="margin-left: 20px; background-color: #ffffff">
                  报表工具
                </div>
              </div>
            </div>
          </div>
          <div style="display: flex; padding: 0 20px; text-align: center">
            <div
              style="position: relative; width: 33%; background-color: #f7f8fa"
            >
              <div style="padding-top: 10px; font-size: 18px; font-weight: 600">
                17
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
                1
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
              <el-button style="padding: 0; margin-top: 25px" type="text">
                监控中心
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
          </div>
          <div
            style="
              display: flex;
              padding: 10px 20px 20px 20px;
              text-align: center;
            "
          >
            <div
              style="
                width: 25%;
                padding: 20px 10px 10px 10px;
                font-size: 12px;
                font-weight: 900;
                color: #626fc5;
                background: #f1f5ff;
                border-radius: 5px;
              "
            >
              供应链
            </div>
            <div
              style="
                width: 25%;
                padding: 20px 10px 10px 10px;
                margin-left: 10px;
                font-size: 12px;
                font-weight: 900;
                color: #626fc5;
                background: #f1f5ff;
                border-radius: 5px;
              "
            >
              研发协同
            </div>
            <div
              style="
                width: 25%;
                padding: 20px 10px 10px 10px;
                margin-left: 10px;
                font-size: 12px;
                font-weight: 900;
                color: #626fc5;
                background: #f1f5ff;
                border-radius: 5px;
              "
            >
              私域商城
            </div>
            <div
              style="
                width: 25%;
                padding: 20px 10px 10px 10px;
                margin-right: 5px;
                margin-left: 10px;
                font-size: 12px;
                font-weight: 900;
                color: #626fc5;
                background: #f1f5ff;
                border-radius: 5px;
              "
            >
              生产跟单
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 商品库和暴款 -->
    <div style="margin-top: 20px; background-color: #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="18">
          <div
            style="display: flex; padding: 15px 20px; background-color: white"
          >
            <div style="width: 25%; margin-right: 20px">
              <div
                style="
                  display: flex;
                  padding: 20px;
                  color: #7e575f;
                  background-color: #eff3ff;
                  border-radius: 5px;
                "
              >
                <el-image
                  src="https://oss.business.quanyu123.com//938da43042397e244a2a78dba1828491.png"
                  style="width: 20px; height: 20px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="margin-top: 2px; margin-left: 10px">
                  商品库
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                今日热销商品
                <el-tag size="mini" type="warning">推荐</el-tag>
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                商城热销商品
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                热销飙升商品
              </div>
              <div style="padding: 20px 0 0 20px">
                新品智测
                <el-tag size="mini" type="danger">NEW</el-tag>
              </div>
            </div>
            <div style="width: 25%; margin-right: 20px">
              <div
                style="
                  display: flex;
                  padding: 20px;
                  color: #7e575f;
                  background-color: #e8f5fb;
                  border-radius: 5px;
                "
              >
                <el-image
                  src="https://oss.business.quanyu123.com//74651669d06777e0a5886faaa37efd56.png"
                  style="width: 20px; height: 20px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="margin-top: 2px; margin-left: 10px">
                  客户库
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                今日拿货最多
                <el-tag size="mini" type="danger">HOT</el-tag>
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                拿货客户排行
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                拿货飙升客户
              </div>
              <div style="padding: 20px 0 0 20px">
                高价值优质客户
                <el-tag size="mini" type="warning">推荐</el-tag>
              </div>
            </div>
            <div style="width: 25%; margin-right: 20px">
              <div
                style="
                  display: flex;
                  padding: 20px;
                  color: #7e575f;
                  background-color: #e4f7f5;
                  border-radius: 5px;
                "
              >
                <el-image
                  src="https://oss.business.quanyu123.com//e3a1bb70414e9d40984fd3fa75919020.png"
                  style="width: 20px; height: 20px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="margin-top: 2px; margin-left: 10px">
                  去发货
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                客户发货列表
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                商品发货汇总分析
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                退货数据分析
              </div>
              <div style="padding: 20px 0 0 20px">进销存数据分析</div>
            </div>
            <div style="width: 25%">
              <div
                style="
                  display: flex;
                  padding: 20px;
                  color: #7e575f;
                  background-color: #eef7e5;
                  border-radius: 5px;
                "
              >
                <el-image
                  src="https://oss.business.quanyu123.com//21378edba2b54fa5e0479d60ba62bdc3.png"
                  style="width: 20px; height: 20px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="margin-top: 2px; margin-left: 10px">
                  看回款
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                那个客户回款多
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                那个客户欠款多
              </div>
              <div style="padding: 20px 0 0 20px; font-size: 14px">
                那个客户回款快
              </div>
              <div style="padding: 20px 0 0 20px">那个客户回款慢</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div
            style="padding: 20px; background-color: white; border-radius: 5px"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
              "
            >
              <div style="font-size: 14px">爆款分析</div>
              <div style="font-size: 12px">更多</div>
            </div>
            <div style="display: flex; margin-top: 20px">
              <el-image
                src="https://img.wechatboss.com/FgSPgakMOZN7FUVKV8HnKlw1-SKe"
                style="width: 60px; height: 60px"
              >
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
                  向阳花两穿法式连衣裙女童田园风裙向阳花两穿法式连衣裙女童田园风裙向阳花两穿法式连衣裙女童田园风裙
                </div>
                <div style="font-size: 12px">销量:2982件2023-03-30上架28天</div>
              </el-card>
            </div>
            <div style="display: flex; margin-top: 20px">
              <el-image
                src="https://img.wechatboss.com/FgSPgakMOZN7FUVKV8HnKlw1-SKe"
                style="width: 60px; height: 60px"
              >
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
                  向阳花两穿法式连衣裙女童田园风裙向阳花两穿法式连衣裙女童田园风裙向阳花两穿法式连衣裙女童田园风裙
                </div>
                <div style="font-size: 12px">销量:2982件2023-03-30上架28天</div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 监控推荐和更新公告 -->
    <div style="margin-top: 20px; background-color: #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="18">
          <div
            style="padding: 20px; background-color: white; border-radius: 5px"
          >
            <div style="display: flex; justify-content: space-between">
              <div style="font-size: 14px">推荐监控</div>
              <div style="font-size: 12px">
                换一批
                <i class="el-icon-refresh-right"></i>
              </div>
            </div>
            <div style="display: flex; flex-wrap: wrap">
              <div
                v-for="o in 6"
                :key="o"
                style="display: flex; width: 33%; margin-top: 28px"
              >
                <el-image
                  src="https://oss.business.quanyu123.com//a6668ea487c0c3fc2c6bdf0b50a79ce2.jpg"
                  style="width: 60px; height: 60px; border-radius: 50%"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="padding: 10px; margin-left: 10px">
                  <div style="margin-bottom: 10px; font-weight: 600">
                    广州&nbsp;|&nbsp;赖玉珍
                  </div>
                  <div style="font-size: 12px; color: #1890ff">
                    近三天拿货金额第一名
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div
            style="padding: 20px; background-color: white; border-radius: 5px"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
              "
            >
              <div style="font-size: 14px">更新公告</div>
              <div style="font-size: 12px">更多</div>
            </div>
            <div
              v-for="o in 2"
              :key="o"
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
              "
            >
              <div style="display: flex">
                <el-image
                  src="https://oss.business.quanyu123.com//1a2a696b0ab34169a6c7736e536daf73.png"
                  style="width: 20px; height: 20px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="margin: 0 0 0 10px">圈域v1.2.8更新公告</div>
              </div>
              <div style="margin: 5px 0 0 0; font-size: 12px">4-28</div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                margin: 10px 0;
                border-top: 1px solid rgb(230, 230, 235);
              "
            >
              <div style="font-size: 14px">[圈域数字]&nbsp; 公众号</div>
              <div style="font-size: 12px">立即关注</div>
            </div>
            <div style="display: flex">
              <el-image
                src="https://oss.business.quanyu123.com//98fbddbbc3d20b01b62e01c69da61fe9.png"
                style="width: 20px; height: 20px; margin-right: 10px"
              >
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
              <span style="margin-top: 2px">
                关注公众号，获取企业数字化转型可执行性方案
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--热销、飙升 -->
    <div style="margin-top: 20px; background-color: #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="12">
          <div
            style="
              position: relative;
              padding: 20px;
              background: -webkit-linear-gradient(top, #fff5f3 0%, #fff 10%);
              background-color: white;
              border-radius: 5px;
            "
          >
            <el-image
              fit="fill"
              src="https://oss.business.quanyu123.com//50bcc50006a75081dc3f8f979ee98be7.png"
              style="
                position: absolute;
                top: 15px;
                left: 70px;
                width: 40px;
                height: 25px;
              "
            />
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
              "
            >
              <div style="font-size: 14px">商品热销榜</div>
              <div style="font-size: 12px">更多</div>
            </div>
            <div
              v-for="o in 3"
              :key="o"
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div style="display: flex">
                <QYRanking
                  :index="o - 1"
                  style="margin: 30px 10px 0 0"
                  :type="8"
                />
                <el-image
                  src="https://img.wechatboss.com/FgSPgakMOZN7FUVKV8HnKlw1-SKe"
                  style="width: 100px; height: 100px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">Yz23082-1</div>
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
                      卡通刺烤贴标T恤T他
                    </div>
                  </div>

                  <div style="display: flex; width: 100%; margin: 10px 0">
                    <el-tag type="info">T恤</el-tag>
                    &nbsp;
                    <el-tag type="info">2023</el-tag>
                    &nbsp;
                    <el-tag type="info">夏季</el-tag>
                    &nbsp;
                    <el-tag type="info">波段二</el-tag>
                  </div>
                  <div style="margin: 10px 0 0 0">2023-03-30 10:28:18</div>
                </div>
              </div>
              <div>
                <div
                  style="
                    padding: 20px 0 10px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: red;
                  "
                >
                  12.25万元
                </div>
                <div>售价 &nbsp;35.00&nbsp; 元</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div
            style="
              position: relative;
              padding: 20px;
              background: -webkit-linear-gradient(top, #f1f5ff 0%, #fff 10%);
              background-color: white;
              border-radius: 5px;
            "
          >
            <el-image
              fit="fill"
              src="https://oss.business.quanyu123.com//e3f1c56bf92dcc30f9c63c7bb02bb67f.png"
              style="
                position: absolute;
                top: 15px;
                left: 70px;
                width: 40px;
                height: 25px;
              "
            />
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
              "
            >
              <div style="font-size: 14px">商品热销榜</div>
              <div style="font-size: 12px">更多</div>
            </div>
            <div
              v-for="o in 3"
              :key="o"
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div style="display: flex">
                <QYRanking
                  :index="o - 1"
                  style="margin: 30px 10px 0 0"
                  :type="7"
                />
                <el-image
                  src="https://img.wechatboss.com/FgSPgakMOZN7FUVKV8HnKlw1-SKe"
                  style="width: 100px; height: 100px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">Yz23082-1</div>
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
                      卡通刺烤贴标T恤T他
                    </div>
                  </div>

                  <div style="display: flex; width: 100%; margin: 10px 0">
                    <el-tag type="info">T恤</el-tag>
                    &nbsp;
                    <el-tag type="info">2023</el-tag>
                    &nbsp;
                    <el-tag type="info">夏季</el-tag>
                    &nbsp;
                    <el-tag type="info">波段二</el-tag>
                  </div>
                  <div style="margin: 10px 0 0 0">2023-03-30 10:28:18</div>
                </div>
              </div>
              <div>
                <div
                  style="
                    padding: 20px 0 10px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: red;
                  "
                >
                  12.25万元
                </div>
                <div>售价 &nbsp;35.00&nbsp; 元</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--拿货、品牌 -->
    <div style="margin-top: 20px; background-color: #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="12">
          <div
            style="
              position: relative;
              padding: 20px;
              background: -webkit-linear-gradient(top, #fff5f3 0%, #fff 10%);
              background-color: white;
              border-radius: 5px;
            "
          >
            <el-image
              fit="fill"
              src="https://oss.business.quanyu123.com//50bcc50006a75081dc3f8f979ee98be7.png"
              style="
                position: absolute;
                top: 15px;
                left: 70px;
                width: 40px;
                height: 25px;
              "
            />
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
              "
            >
              <div style="font-size: 14px">客户拿货排行榜</div>
              <div style="font-size: 12px">更多</div>
            </div>
            <div style="display: flex">
              <div style="width: 33%; margin-top: 30px; text-align: center">
                <div style="position: relative">
                  <el-image
                    src="https://oss.business.quanyu123.com//7f2f279fe5fbf0d86fb568673ac871b1.png"
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
                    src="https://oss.business.quanyu123.com//a6668ea487c0c3fc2c6bdf0b50a79ce2.jpg"
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
                  <div style="font-weight: 600">广州&nbsp;|&nbsp;赖玉珍</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    33.00万元
                  </div>
                  <div style="font-size: 12px">拿货次数233</div>
                </div>
              </div>
              <div style="width: 33%; text-align: center">
                <div style="position: relative">
                  <el-image
                    src="https://oss.business.quanyu123.com//053e8de20c3c5c214fff0704750a15d8.png"
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
                    src="https://oss.business.quanyu123.com//a6668ea487c0c3fc2c6bdf0b50a79ce2.jpg"
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
                  <div style="font-weight: 600">广州&nbsp;|&nbsp;赖玉珍</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    33.00万元
                  </div>
                  <div style="font-size: 12px">拿货次数233</div>
                </div>
              </div>
              <div style="width: 33%; margin-top: 50px; text-align: center">
                <div style="position: relative">
                  <el-image
                    src="https://oss.business.quanyu123.com//ad017a3aac2926e21cc65020087405da.png"
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
                    src="https://oss.business.quanyu123.com//a6668ea487c0c3fc2c6bdf0b50a79ce2.jpg"
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
                  <div style="font-weight: 600">广州&nbsp;|&nbsp;赖玉珍</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    33.00万元
                  </div>
                  <div style="font-size: 12px">拿货次数233</div>
                </div>
              </div>
            </div>
            <el-image
              src=" https://oss.business.quanyu123.com//de6c498a9af2ab4acbe9802116a2ae51.png"
              style="margin-top: -40px"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <div
            style="
              position: relative;
              padding: 20px;
              background: -webkit-linear-gradient(top, #f1f5ff 0%, #fff 10%);
              background-color: white;
              border-radius: 5px;
            "
          >
            <el-image
              fit="fill"
              src="https://oss.business.quanyu123.com//e3f1c56bf92dcc30f9c63c7bb02bb67f.png"
              style="
                position: absolute;
                top: 15px;
                left: 70px;
                width: 40px;
                height: 25px;
              "
            />
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
              "
            >
              <div style="font-size: 14px">热销品牌榜</div>
              <div style="font-size: 12px">更多</div>
            </div>
            <div style="display: flex">
              <div style="width: 33%; margin-top: 30px; text-align: center">
                <div style="position: relative">
                  <el-image
                    src="https://oss.business.quanyu123.com//7f2f279fe5fbf0d86fb568673ac871b1.png"
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
                    src="https://oss.business.quanyu123.com//a6668ea487c0c3fc2c6bdf0b50a79ce2.jpg"
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
                  <div style="font-weight: 600">丸纸</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    33.00万元
                  </div>
                  <div style="font-size: 12px">在售商品数233</div>
                </div>
              </div>
              <div style="width: 33%; text-align: center">
                <div style="position: relative">
                  <el-image
                    src="https://oss.business.quanyu123.com//053e8de20c3c5c214fff0704750a15d8.png"
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
                    src="https://oss.business.quanyu123.com//a6668ea487c0c3fc2c6bdf0b50a79ce2.jpg"
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
                  <div style="font-weight: 600">丸纸</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    33.00万元
                  </div>
                  <div style="font-size: 12px">在售商品数233</div>
                </div>
              </div>
              <div style="width: 33%; margin-top: 50px; text-align: center">
                <div style="position: relative">
                  <el-image
                    src="https://oss.business.quanyu123.com//ad017a3aac2926e21cc65020087405da.png"
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
                    src="https://oss.business.quanyu123.com//a6668ea487c0c3fc2c6bdf0b50a79ce2.jpg"
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
                  <div style="font-weight: 600">丸纸</div>
                  <div style="margin: 5px 0; font-size: 14px; color: red">
                    33.00万元
                  </div>
                  <div style="font-size: 12px">在售商品数233</div>
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
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F09%2F20210709142454_dc8dc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670217619&t=7e7d4ed',
      }
    },
    watch: {},
    created() {},
    methods: {},
  }
</script>
<style lang="scss" scoped>
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
  .plug_icon {
    width: 100px;
    background-image: url('https://oss.business.quanyu123.com//b0a7f769f67891838ddf3d8f495116b2.png');
    background-size: 100% 100%;
  }
</style>
