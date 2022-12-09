<template>
  <section>
    <div class="tab-content">
      <h2>{{ type && list[type]['title'] }}</h2>
      <el-radio-group
        v-if="
          type != 'info' &&
          type != 'ImageList' &&
          type != 'Banner' &&
          type != 'TemplateExample'
        "
        v-model="list1.tab_type"
        size="medium"
      >
        <el-radio-button label="1">
          <i class="el-icon-s-data"></i>
          1
        </el-radio-button>
        <el-radio-button label="2">
          <i class="el-icon-s-data"></i>
          2
        </el-radio-button>
        <el-radio-button label="3">
          <i class="el-icon-s-data"></i>
          3
        </el-radio-button>
      </el-radio-group>
      <el-radio-group
        v-if="type == 'Banner'"
        v-model="list1.tab_type"
        size="medium"
      >
        <el-radio-button label="1">
          <i class="el-icon-s-data"></i>
          1
        </el-radio-button>
        <el-radio-button label="2">
          <i class="el-icon-s-data"></i>
          2
        </el-radio-button>
        <el-radio-button label="3">
          <i class="el-icon-s-data"></i>
          3
        </el-radio-button>
        <el-radio-button label="4">
          <i class="el-icon-s-data"></i>
          4
        </el-radio-button>
      </el-radio-group>
    </div>
    <component :is="type && list[type]['com']" :data="data" />
  </section>
</template>

<script>
  import Info from './Info'
  import Banner from './Banner'
  import Notification from './Notification'
  import Blank from './Blank'
  import Gridbutton from './Gridbutton'
  import ImageList from './ImageList'
  import Title from './Title'
  import Goodsgroup from './Goodsgroup'
  import Hotspots from './Hotspots'
  export default {
    name: 'EditForm',
    components: {
      Banner,
      Notification,
      Blank,
      Gridbutton,
      ImageList,
      Title,
      Goodsgroup,
      Info,
      Hotspots,
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        type: '',
        list1: null,
        list: {
          Info: {
            title: '页面信息',
            com: 'Info',
          },
          Banner: {
            title: '轮播图',
            com: 'Banner',
          },
          Notification: {
            title: '滚动公告',
            com: 'Notification',
          },
          Blank: {
            title: '辅助空白',
            com: 'Blank',
          },
          Gridbutton: {
            title: '宫格按钮',
            com: 'Gridbutton',
          },
          ImageList: {
            title: '图片',
            com: 'ImageList',
          },
          Title: {
            title: '标题',
            com: 'Title',
          },
          Goodsgroup: {
            title: '商品组',
            com: 'Goodsgroup',
          },
          Hotspots: {
            title: '热区',
            com: 'Hotspots',
          },
        },
      }
    },
    watch: {
      data: {
        handler(val) {
          this.type = val.type
          console.log(99999, this.type, val, this.tab_type)
        },
        immediate: true,
        deep: true,
      },
    },
    created() {
      this.list1 = this.data
    },
    mounted() {
      this.type = this.data.type
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  section {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    overflow: hidden;
  }

  .tab-content {
    padding: 0 15px;

    h2 {
      font-size: 16px;
      color: #333;
    }

    .tab {
      display: flex;
      justify-content: space-around;
      border: 1px solid #ddd;
      border-radius: 6px;

      span {
        display: block;
        width: 33.33%;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        color: #666;
        text-align: center;
        cursor: pointer;

        &.active {
          color: #fff;
          background: #409eff;
          border-radius: 2px;
        }

        &:nth-of-type(2) {
          border-right: 1px solid #ddd;
          border-left: 1px solid #ddd;
        }
      }
    }
    .tab1 {
      display: flex;
      justify-content: space-around;
      border: 1px solid #ddd;
      border-radius: 6px;

      span {
        display: block;
        width: 25%;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        color: #666;
        text-align: center;
        cursor: pointer;

        &.active {
          color: #fff;
          background: #409eff;
          border-radius: 2px;
        }

        &:nth-of-type(2) {
          border-right: 1px solid #ddd;
          border-left: 1px solid #ddd;
        }
      }
    }
  }
</style>
