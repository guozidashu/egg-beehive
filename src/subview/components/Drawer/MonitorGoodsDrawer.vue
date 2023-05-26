<template>
  <div style="padding: 0">
    <!-- 头部区域 -->
    <div style="display: flex; padding: 0 20px 20px 20px">
      <!-- 图片区 -->
      <div style="width: 400px">
        <el-image
          :src="img_checked_src"
          style="
            width: 100%;
            height: 400px;
            margin-bottom: 20px;
            border: 1px solid #ececec;
          "
        >
          <div slot="error" class="el-image__error">暂无图片</div>
        </el-image>
        <div
          v-if="form.shop_multiplot"
          style="display: flex; padding: 0; margin: 0"
        >
          <el-image
            v-for="(item, index) in form.shop_multiplot"
            :key="index"
            :class="item.checked ? 'img_checked' : ''"
            :src="item.img"
            style="width: 19%; padding: 0; margin-right: 10px"
            @click="clickImg(item.img, index)"
          >
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
        </div>
      </div>
      <!-- 文本区和图标区 -->
      <div style="margin-left: 20px">
        <h3>{{ form.name }}</h3>
        <div style="font-size: 24px; color: red">￥{{ form.price }}</div>
        <div style="margin: 20px 0 20px 0; font-size: 12px">
          <span style="text-decoration: line-through">￥{{ form.price }}</span>
          /&nbsp; 最低售价&nbsp;￥{{ form.lowest_price }}
          <el-popover placement="right" trigger="hover">
            <div style="font-size: 12px">会员等级最低折扣的售价</div>
            <vab-icon
              slot="reference"
              icon="question-line"
              style="position: relative; top: 0; font-size: 14px"
            />
          </el-popover>
        </div>
        <div style="margin-bottom: 20px; font-size: 12px">
          创建时间&nbsp;&nbsp;{{ form.create_time }}
        </div>
        <div style="margin-bottom: 30px; font-size: 12px">
          上市时间&nbsp;&nbsp;{{ form.upper_time }}
        </div>
        <div style="margin-bottom: 20px; font-size: 12px">
          所属类目&nbsp;&nbsp;{{ form.category_name }}
        </div>
        <div style="margin-bottom: 20px; font-size: 12px">
          品牌名称&nbsp;&nbsp;{{ form.brand_name }}
        </div>
        <div style="margin-bottom: 20px; font-size: 12px">
          商品货号&nbsp;&nbsp;{{ form.sn }}
        </div>
        <div style="margin-bottom: 20px; font-size: 12px">
          发货信息&nbsp;&nbsp;杭州24小时内发货
        </div>
        <div style="display: flex; margin-top: 110px">
          <!-- <div
            v-for="(item, index) in icon_btn_list"
            :key="index"
            style="position: relative; padding-right: 20px"
          >
            <div style="margin-left: 10px">{{ item.text }}</div>
            <div style="margin-top: 10px; text-align: center">
              <vab-icon
                :icon="item.icon"
                style="
                  position: relative;
                  top: 0;
                  margin-left: 10px;
                  font-size: 14px;
                "
              />
            </div>
            <span
              style="position: absolute; top: 8px; right: 0; color: #ececec"
            >
              |
            </span>
          </div> -->
          <el-tag
            v-if="form.monitor_status == 0"
            effect="plain"
            style="margin-top: 15px; margin-left: 100px"
            @click="Monitor(1)"
          >
            监控商品
          </el-tag>
          <el-tag
            v-if="form.monitor_status == 1"
            effect="plain"
            style="margin-top: 15px; margin-left: 100px"
            type="danger"
            @click="Monitor(2)"
          >
            取消监控
          </el-tag>
        </div>
      </div>
    </div>
    <div style="display: flex; border-top: 20px solid #f6f8f9">
      <!-- 菜单 -->
      <el-menu
        class="el-menu-vertical-demo menu_qy"
        :default-active="menu_select"
        style="width: 200px"
        @select="handleSelect"
      >
        <el-submenu index="1">
          <template slot="title">
            <vab-icon icon="shopping-bag-2-line" style="padding: 0 5px" />
            <span>商品概况</span>
          </template>
          <el-menu-item-group class="menu_group">
            <el-menu-item index="1-1">基础分析</el-menu-item>
            <el-menu-item index="1-2">SKU分析</el-menu-item>
            <!-- <el-menu-item index="1-3">属性分析</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="2">
          <vab-icon icon="user-4-line" style="padding: 0 5px" />
          <span slot="title">库存分析</span>
        </el-menu-item> -->
        <el-menu-item index="5">
          <vab-icon icon="shield-user-line" style="padding: 0 5px" />
          <span slot="title">客户分析</span>
        </el-menu-item>
        <!-- <el-menu-item index="6">
          <vab-icon icon="shopping-bag-line" style="padding: 0 5px" />
          <span slot="title">同款商品</span>
        </el-menu-item> -->
      </el-menu>
      <div style="width: 100%; border-left: 20px solid #f6f8f9">
        <BasicAnalysis v-if="menu_select == '1-1'" :goods-id="drawerInof.id" />
        <SKUAnalysis v-if="menu_select == '1-2'" :goods-id="drawerInof.id" />
        <CustomerAnalysis v-if="menu_select == '5'" :goods-id="drawerInof.id" />
      </div>
    </div>
  </div>
</template>

<script>
  import BasicAnalysis from '@/subview/components/MonitorGoodscomponents/BasicAnalysis'
  import SKUAnalysis from '@/subview/components/MonitorGoodscomponents/SKUAnalysis'
  import CustomerAnalysis from '@/subview/components/MonitorGoodscomponents/CustomerAnalysis'
  export default {
    components: { BasicAnalysis, SKUAnalysis, CustomerAnalysis },
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        menuList: [
          {
            name: '商品概况',
            type: 1,
            checked: false,
            child: [
              {
                name: '基础分析',
                type: 1,
              },
              {
                name: 'SKU分析',
                type: 1,
              },
              {
                name: '属性分析',
                type: 1,
              },
            ],
          },
          {
            name: '竞争分析',
            type: 1,
            checked: false,
          },
          {
            name: '直播分析',
            type: 1,
            checked: false,
          },
          {
            name: '作品分析',
            type: 1,
            checked: false,
          },
        ],
        type: false,
        menu_select: null,
        // 商品数据
        form: {},
        // 选中图片地址
        img_checked_src: '',
        icon_btn_list: [
          {
            icon: 'share-line',
            text: '下载商品',
          },
          {
            icon: 'share-line',
            text: '下载图片',
          },
          {
            icon: 'share-line',
            text: '商品链接',
          },
          {
            icon: 'share-line',
            text: '商品长图',
          },
          {
            icon: 'share-line',
            text: '停止销售',
          },
          {
            icon: 'share-line',
            text: '在商城看',
          },
          {
            icon: 'download-line',
            text: '趋势预测',
          },
          {
            icon: 'share-line',
            text: '智能搜图',
          },
          {
            icon: 'share-line',
            text: '新品智测',
          },
        ],
      }
    },

    watch: {
      // 监听商品id
      drawerInof: {
        handler: function (newVal) {
          this.getGoodsDetails()
          this.menu_select = '1-1'
          this.$forceUpdate()
        },
        deep: true,
        immediate: true,
      },
    },
    created() {},
    methods: {
      // 监控商品
      async Monitor(type) {
        if (type == 1) {
          const { code } = await this.api.editMonitorAdd({
            look_type: 2, // 监控类型 1=客户 2=商品
            look_id: this.drawerInof.id, // 客户id或者商品id
          })
          if (code == 200) {
            this.$baseMessage('监控成功', 'success', 'vab-hey-message-success')
            this.getGoodsDetails()
          }
        } else if (type == 2) {
          const { code } = await this.api.delCancellation({
            look_type: 2, // 监控类型 1=客户 2=商品
            look_id: this.drawerInof.id, // 客户id或者商品id
          })
          if (code == 200) {
            this.$baseMessage(
              '取消监控成功',
              'success',
              'vab-hey-message-success'
            )
            this.getGoodsDetails()
          }
        }
      },
      // 菜单切换
      handleSelect(key) {
        this.menu_select = key
      },
      // 获取商品详情
      async getGoodsDetails() {
        const { data } = await this.api.getGoodBasicsDetails({
          good_id: this.drawerInof.id,
        })
        let arr = []
        let obj = {}
        data.shop_multiplot.forEach((item, index) => {
          obj.img = item
          if (index == 0) {
            obj.checked = true
          } else {
            obj.checked = false
          }
          arr.push(obj)
          obj = {}
        })
        let temp = data
        temp.shop_multiplot = arr
        if (temp.shop_multiplot.length > 0) {
          this.img_checked_src = temp.shop_multiplot[0].img
        } else {
          this.img_checked_src = temp.img
        }

        this.form = temp
      },
      // 点击图片
      clickImg(img, index) {
        this.img_checked_src = img
        this.form.shop_multiplot.forEach((item, i) => {
          if (i == index) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .img_checked {
    border: 1px solid #465a7c;
  }
  .menu_css {
    padding: 10px;
    text-align: center;
  }
  .menu_active_css {
    padding: 10px;
    color: white;
    text-align: center;
    background-color: #4582fe;
    border-radius: 0 50px 50px 0;
  }
  .menu_mouseenter_css {
    padding: 10px;
    color: #4582fe;
    text-align: center;
    background-color: #e8f4ff;
  }
  .menu_group .el-menu-item.is-active {
    padding: 0 0 0 40px !important;
    color: white !important;
    background-color: #4582fe !important;
    border-radius: 0 50px 50px 0 !important;
  }
  //一定要添加！important提高优先级
  .el-menu-item.is-active {
    padding: 0 0 0 20px !important;
    color: white !important;
    background-color: #4582fe !important;
    border-radius: 0 50px 50px 0 !important;
  }
</style>
