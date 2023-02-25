<template>
  <div>
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 10px"
    >
      <div style="font-size: 18px; font-weight: 600">页面标题</div>
      <div>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="primary" @click="submit">提交页面</el-button>
      </div>
    </div>
    <section class="decoration-edit" scroll="no">
      <section class="l">
        <ul @dragend="dragEnd" @dragstart="dragStart">
          <li
            v-for="(val, key, dex) in typeList"
            :key="dex + 1"
            :data-type="key"
            draggable
          >
            <span :class="val.icon"></span>
            <p>{{ val.name }}</p>
          </li>
        </ul>
      </section>
      <section id="view-content" class="c">
        <div class="view-content" @dragover="dragOver" @drop="drog">
          <Draggable v-model="view" filter=".forbid" :move="onMove">
            <template v-for="(item, dex) in view">
              <div
                v-if="dex > 0"
                :key="dex"
                :class="item.type == 'Info' ? 'item forbid' : 'item'"
                :data-index="dex"
                @click="selectType(dex)"
              >
                <template v-if="item.status && item.status == 2">
                  <div class="wait">{{ item.type }}</div>
                </template>
                <template v-else>
                  <component
                    :is="typeList[item.type]['com']"
                    :class-name="className[item.tab_type]"
                    :data="item"
                  />
                </template>
                <i class="el-icon-error" @click="deleteItem($event, dex)"></i>
              </div>
            </template>
          </Draggable>
        </div>
      </section>
      <section class="r">
        <EditForm v-if="isRight" :data="props" />
      </section>
    </section>
  </div>
</template>
<script src="http://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script>
  import Draggable from 'vuedraggable'
  import EditForm from '@/subview/components/TtemplateEdit/index'
  import Banner from '@/subview/components/TtemplateView/Banner'
  import Notification from '@/subview/components/TtemplateView/Notification'
  import Blank from '@/subview/components/TtemplateView/Blank'
  import Gridbutton from '@/subview/components/TtemplateView/Gridbutton'
  import ImageList from '@/subview/components/TtemplateView/ImageList'
  import Title from '@/subview/components/TtemplateView/Title'
  import Goodsgroup from '@/subview/components/TtemplateView/Goodsgroup'
  import Hotspots from '@/subview/components/TtemplateView/Hotspots'
  import Info from '@/subview/components/TtemplateView/Info'
  export default {
    components: {
      EditForm,
      Draggable,
      Banner,
      Notification,
      Blank,
      Gridbutton,
      ImageList,
      Title,
      Goodsgroup,
      Hotspots,
      Info,
      // TemplateExample,
    },
    props: {
      itemId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        testsrn: '',
        centerDialogVisible: false,
        selectList: [],
        input2: '',
        typeList: {
          Banner: {
            name: '轮播图',
            icon: 'el-icon-picture',
            com: Banner,
          },
          Notification: {
            name: '滚动公告',
            icon: 'el-icon-picture',
            com: Notification,
          },
          Blank: {
            name: '辅助空白',
            icon: 'el-icon-picture',
            com: Blank,
          },
          Gridbutton: {
            name: '宫格按钮',
            icon: 'el-icon-picture',
            com: Gridbutton,
          },
          ImageList: {
            name: '图片',
            icon: 'el-icon-picture',
            com: ImageList,
          },
          Title: {
            name: '标题',
            icon: 'el-icon-picture',
            com: Title,
          },
          Goodsgroup: {
            name: '商品组',
            icon: 'el-icon-picture',
            com: Goodsgroup,
          },
          Hotspots: {
            name: '热区',
            icon: 'el-icon-picture',
            com: Hotspots,
          },
          Info: {
            name: '头部',
            icon: 'el-icon-picture',
            com: Info,
          },
        },
        view: [
          {
            type: 'Info',
            title: '页面标题',
          },
        ],
        title: '页面标题',
        type: null,
        index: null, // 当前组件的索引
        isPush: false, // 是否已添加组件

        props: {}, // 传值
        isRight: false,

        className: {
          1: 'one',
          2: 'two',
          3: 'three',
        },
        propsList: [],
      }
    },
    computed: {
      info() {
        return this.view[0]
      },
    },
    watch: {
      itemId: {
        handler: function (val) {
          if (val != 0) {
            this.getTypeList()
            this.init(val)
          }
        },
        immediate: true,
        deep: true,
      },
    },
    created() {
      this.getTypeList()
    },
    methods: {
      async init(item) {
        const { data } = await this.api.getTemplateAssemblyInfo({
          id: item,
        })
        if (data.length == 0) {
          return
        }
        let arr = []
        data.forEach((item) => {
          let temp = ''
          temp = JSON.parse(item.content)
          if (temp.type == this.view[0].type) {
            this.view[0].id = item.assembly_id
          }
          temp.id = item.assembly_id
          arr.push(temp)
        })
        this.view = arr
      },
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'div_assembly',
        })
        let arr = []
        data.div_assembly.forEach((item) => {
          let temp = ''
          temp = JSON.parse(item.content)
          if (temp.type == this.view[0].type) {
            this.view[0].id = item.id
          }
          temp.id = item.id
          arr.push(temp)
        })
        this.propsList = arr
      },
      back() {
        this.$emit('submitUpload', 1)
      },
      async submit() {
        // JSON 转换会丢失 formData
        const form = JSON.parse(JSON.stringify(this.view))
        form.forEach((item) => {
          // 字符转换数字
          if (item.tab_type != null) {
            item.tab_type = Number(item.tab_type)
            item.parameters.type = Number(item.tab_type)
          }
        })
        let temp1 = {
          name: 'TemplateExample',
          status: 1,
          content: JSON.stringify({
            template: 'qy-template-example',
            type: 'TemplateExample',
            options: {},
            parameters: {
              type: 1,
              bg_color: '#F8F7F7',
              color_goods_bg: '#FFFFFF',
              margin_lr: 5,
              margin_tb: 7,
              padding_lr: 4,
              padding_tb: 9,
              magin_goods_lr: 9,
              magin_goods_tb: 10,
              radius_t: 7,
              radius_b: 13,
              goods_tag: 1,
              goods_grouping: 1,
              goods_classify: [55, 57],
              goods_type: 2,
              goods_corner_mark: 1,
              goods_original_price: 1,
              goods_num: 1,
              goods_text_state: 1,
              goods_item: [
                {
                  url: '/main_pages/goods/goods_details?id=772',
                  title: '商品详情>772',
                  selectTitle: '999888',
                  img: 'https://img.quanyu.link/FkpDvX6OeEcKJjlT1_7oEaR6Qk2Q',
                  type: 0,
                  goods_id: 772,
                  opentype: null,
                },
                {
                  url: '/main_pages/goods/goods_details?id=773',
                  title: '商品详情>773',
                  selectTitle: '999888',
                  img: 'https://img.wechatboss.com/FvXc5ZSE-0sIW8arI3m0Wq0hIYBQ',
                  type: 1,
                  goods_id: 773,
                  opentype: null,
                },
              ],
              goodsGroupNum: 1,
              goods_tag_text: '热卖1',
              show_sales: 1,
            },
            id: 38,
            tabType: 1,
            tab_type: 1,
          }),
        }
        // if (form.length == 1) {
        //   this.$message.error('请添加模块！')
        //   return
        // }
        // for (let i of form) {
        //   if (i.data && i.data.length == 0) {
        //     this.$message.error('请填写完整信息！')
        //     return
        //   }
        //   if (i.type === 'product') {
        //     i.data = i.data.map((val) => val.productId).join(',')
        //   }
        // }
        let temp = {}
        let arr = []
        form.forEach((item) => {
          arr.push({
            assembly_id: item.id,
            content: JSON.stringify(item),
          })
        })
        temp.div_template_id = this.itemId
        temp.content = arr
        const { data } = await this.api.editTemplateAssemblyLayout(temp)

        // this.$message.success(
        //   '数据提交成功，请按F12打开控制台查看待提交数据集合！'
        // )
        // this.setImage()
        return
      },
      // div截图
      setImage() {
        let opts = { useCORS: true }
        html2canvas(document.getElementById('view-content'), opts).then(
          function (canvas) {
            var imgUri = canvas.toDataURL('image/jpeg', 2) // 获取生成的图片的ur
            this.testsrn = imgUri
            this.centerDialogVisible = true
          }
        )
      },
      // 切换视图组件
      selectType(index) {
        this.isRight = false
        this.props = this.view[index]
        this.$nextTick(() => (this.isRight = true))
      },
      deleteItem(e, index) {
        e.preventDefault()
        e.stopPropagation()
        this.view.splice(index, 1)
        this.isRight = false
        this.props = {}
      },
      //禁止拖拽到第一项
      onMove(e) {
        if (e.relatedContext.element.type == 'Info') return false
        return true
      },
      //开始拖拽
      dragStart(e) {
        this.type = e.target.dataset.type
      },
      // 结束拖拽
      dragEnd() {
        this.$delete(this.view[this.index], 'status')
        this.isPush = false
        this.type = null
      },
      // 已放置到指定位置
      drog(e) {
        if (!this.type) {
          // 内容拖拽
          return
        }
        e.preventDefault()
        e.stopPropagation()
        this.dragEnd()
      },
      // 移动中
      dragOver(e) {
        if (!this.type) {
          // 内容拖拽
          return
        }
        e.preventDefault()
        e.stopPropagation()
        let className = e.target.className
        let name = className !== 'view-content' ? 'item' : 'view-content'
        let defaultData = ''
        this.propsList.forEach((item) => {
          if (item.type == this.type) {
            defaultData = item
          }
        })
        if (name == 'view-content') {
          if (!this.isPush) {
            this.index = this.view.length
            this.isPush = true
            this.view.push(defaultData)
          }
        } else if (name == 'item') {
          let target = e.target
          let [y, h, curIndex] = [
            e.offsetY,
            target.offsetHeight,
            target.dataset.index,
          ]
          let direction = y < h / 2

          if (!this.isPush) {
            // Push to Top or Bottom
            if (direction) {
              if (curIndex == 0) {
                this.view.unshift(defaultData)
              } else {
                this.view.splice(curIndex, 0, defaultData)
              }
            } else {
              curIndex = +curIndex + 1
              this.view.splice(curIndex, 0, defaultData)
            }
          } else {
            // Moving
            var i = null
            var result = null
            if (direction) {
              i = curIndex == 0 ? 0 : curIndex - 1
              result = this.view[i]['status'] == 2
            } else {
              i = +curIndex + 1
              result = this.view.length > i && this.view[i]['status'] == 2
            }

            if (result) return

            const temp = this.view.splice(this.index, 1)
            this.view.splice(curIndex, 0, temp[0])
          }
          this.index = curIndex
          this.isPush = true
        }
      },
    },
  }
</script>
<style lang="scss">
  .decoration-edit {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // height: calc(100vh - 280px);
    height: 70vh;
    // padding: 10px 0;
    // background: #f7f8f9;
    .l {
      width: 20%;
      height: 100%;
      padding: 15px 0;
      background: #fff;
    }
    .r {
      width: 30%;
      height: 100%;
      padding: 15px 0;
      background: #fff;
    }
    .l {
      border-right: #d0d2d3 1px solid;
      ul {
        padding: 0;
        margin: 0;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          float: left;
          width: 25%;
          height: 80px;
          font-size: 14px;
          color: #666;
          list-style: none;
          cursor: default;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s;
          &:hover {
            background: #efefef;
          }
          span {
            display: block;
            margin-bottom: 8px;
            font-size: 40px;
            color: #999;
          }
          p {
            display: block;
            margin: 0;
            font-size: 12px;
          }
        }
      }
    }
    .c {
      position: relative;
      width: auto;
      // max-width: 350px;
      .top-nav {
        position: absolute;
        top: 0;
        z-index: 999;
        width: 400px;
        background: #fff;
        transition: all 0.3s;
        & * {
          pointer-events: none;
        }
        &:hover {
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 0 10px #afafaf;
          transform: scale(0.95);
        }
        .title {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }
        // img {
        //   width: 100%;
        //   image-rendering: -moz-crisp-edges;
        //   image-rendering: -o-crisp-edges;
        //   image-rendering: -webkit-optimize-contrast;
        //   image-rendering: crisp-edges;
        //   -ms-interpolation-mode: nearest-neighbor;
        // }
      }
      .view-content {
        width: 400px;
        height: 70vh;
        // padding-top: 72px;
        overflow-x: hidden;
        overflow-y: auto;
        background: #f5f5f5;
        box-shadow: 0 2px 6px #ccc;
        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-thumb {
          background: #dbdbdb;
        }
        &::-webkit-scrollbar-track {
          background: #f6f6f6;
        }

        .item {
          background: #fff;
          transition: all 0.3s;
          &:hover {
            border-radius: 10px;
            box-shadow: 0 0 10px #afafaf;
            transform: scale(0.95);
            .el-icon-error {
              display: block;
            }
          }
          div {
            pointer-events: none;
          }
          .wait {
            height: 35px;
            font-size: 12px;
            line-height: 35px;
            color: #666;
            text-align: center;
            background: #deedff;
          }
          .el-icon-error {
            position: absolute;
            top: -6px;
            right: -10px;
            z-index: 9999;
            display: none;
            font-size: 25px;
            color: red;
            cursor: pointer;
          }
        }
      }
    }
    .r {
      padding-left: 20px;
      border-left: #d0d2d3 1px solid;
    }
    .submit-btn {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .search {
    .el-input {
      .el-input__inner {
        height: 40px;
        border-radius: 25px;
      }
    }
  }
</style>
