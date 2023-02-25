<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form">
        <el-form-item>
          <el-button
            v-has-permi="['btn:DecorateDepartment:save']"
            size="small"
            type="primary"
            @click="handleEdit()"
          >
            保存
          </el-button>
        </el-form-item>
        <div style="display: flex">
          <el-menu
            class="el-menu-vertical-demo"
            default-active="0"
            style="width: 15%"
            @close="handleClose"
            @open="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in menuList"
              :key="index"
              :index="item.id.toString()"
              @click="handleGrouPQuery(item)"
            >
              <div slot="title">
                <span>{{ item.name }}</span>
              </div>
            </el-menu-item>
          </el-menu>
          <div style="width: 20%; margin: 0 10px">
            <div v-if="showId == 0">
              <!-- <el-carousel v-if="img_list.length > 0" :interval="interval">
              <el-carousel-item v-for="(item, index) in img_list" :key="index">
                <el-image :src="item" style="height: 100%" />
              </el-carousel-item>
            </el-carousel> -->
              <el-image
                v-if="inof.img != null"
                :src="inof.img"
                style="height: 100%"
              />
              <div v-else style="padding: 40px; text-align: center">
                暂无照片，请添加~
              </div>
            </div>
            <div v-if="showId == 1">
              <div>{{ activeName }}</div>
            </div>
          </div>
          <div style="width: 65%">
            <el-form
              v-if="showId == 0"
              ref="form"
              label-width="80px"
              :model="form"
            >
              <div
                style="
                  height: 23px;
                  padding: 3px 0 13px 3px;
                  padding-left: 10px;
                  font-size: 15px;
                  font-weight: 700;
                  border-left: 2px solid #1890ff;
                "
              >
                引导页设置
              </div>
              <div style="margin: 10px; font-size: 12px; color: #999">
                建议尺寸：750 * 1334px，拖拽图片可调整图片顺序哦，最多添加五张
              </div>
              <el-form-item label="开屏广告">
                <el-switch
                  v-model="form.advertising"
                  active-color="#41B584"
                  active-text="开启"
                  :active-value="1"
                  class="switch"
                  inactive-color="#D2D2D2"
                  inactive-text="关闭"
                  :inactive-value="0"
                />
              </el-form-item>
              <el-form-item label="广告时间">
                <el-input
                  v-model="form.advertising_time"
                  style="width: 215px"
                />
              </el-form-item>
              <div
                style="
                  display: flex;
                  width: 42%;
                  padding-bottom: 10px;
                  margin: 15px;
                  border: 1px dashed #dbdbdb;
                "
              >
                <div style="position: relative; margin: 10px">
                  <i
                    v-if="inof.img == null"
                    class="el-icon-plus"
                    style="margin-top: 20px; font-size: 80px"
                    @click="uploadImage(inof)"
                  ></i>
                  <el-image
                    v-else
                    :src="inof.img"
                    style="width: 100px; height: 100px"
                    @click="uploadImage(inof)"
                  />
                  <!-- <i
                    class="el-icon-error"
                    style="position: absolute; top: 0; right: 0"
                    @click="delImg(index)"
                  ></i> -->
                </div>
                <div style="padding: 20px 0 0 0">
                  <el-form-item label="图片名称">
                    <el-input
                      v-model="inof.name"
                      placeholder="请输入图片名称"
                      style="width: 215px"
                    />
                  </el-form-item>
                  <el-form-item>
                    <div v-if="inof.selectName != null" @click="SelectLink()">
                      {{ inof.selectName }}
                    </div>
                    <el-button
                      v-else
                      size="small"
                      type="primary"
                      @click="SelectLink()"
                    >
                      选择链接
                    </el-button>
                  </el-form-item>
                </div>
              </div>
              <!-- <div
                v-if="inof_list.length > 0"
                style="display: flex; flex-wrap: wrap"
              >
                <div
                  v-for="(item, index) in inof_list"
                  :key="index"
                  style="
                    display: flex;
                    width: 42%;
                    padding-bottom: 10px;
                    margin: 15px;
                    border: 1px dashed #dbdbdb;
                  "
                >
                  <div style="position: relative; margin: 10px">
                    <i
                      v-if="item.img == null"
                      class="el-icon-plus"
                      style="margin-top: 20px; font-size: 80px"
                      @click="uploadImage(index)"
                    ></i>
                    <el-image
                      v-else
                      :src="item.img"
                      style="width: 100px; height: 100px"
                    />
                    <i
                      class="el-icon-error"
                      style="position: absolute; top: 0; right: 0"
                      @click="delImg(index)"
                    ></i>
                  </div>
                  <div style="padding: 20px 0 0 0">
                    <el-form-item label="图片名称">
                      <el-input
                        v-model="item.name"
                        placeholder="请输入图片名称"
                        style="width: 215px"
                      />
                    </el-form-item>
                    <el-form-item>
                      <div
                        v-if="item.selectName != null"
                        @click="SelectLink(index)"
                      >
                        {{ item.selectName }}
                      </div>
                      <el-button
                        v-else
                        size="small"
                        type="primary"
                        @click="SelectLink(index)"
                      >
                        选择链接
                      </el-button>
                    </el-form-item>
                  </div>
                </div>
              </div> -->

              <!-- <el-form-item v-if="inof_list.length < 5">
                <el-button size="small" type="primary" @click="addImg()">
                  添加图片
                </el-button>
              </el-form-item> -->
            </el-form>
            <el-form
              v-if="showId == 1"
              ref="form"
              label-width="80px"
              :model="form"
            >
              <div
                style="
                  height: 23px;
                  padding: 3px 0 13px 3px;
                  padding-left: 10px;
                  font-size: 15px;
                  font-weight: 700;
                  border-left: 2px solid #1890ff;
                "
              >
                个人中心设置
              </div>
              <!-- <div style="margin: 10px; font-size: 12px; color: #999">
                建议尺寸：750 * 1334px，拖拽图片可调整图片顺序哦，最多添加五张
              </div> -->
              <el-radio-group v-model="activeName" style="margin: 20px 0">
                <el-radio-button label="默认模板1" />
                <el-radio-button label="自定义模板2" />
                <el-radio-button label="定制模板3" />
              </el-radio-group>
            </el-form>
          </div>
        </div>
      </el-form>
    </el-card>
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <QYSelectLink ref="edit" @SelectLink="getSelectLink" />
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'DecorateTheme',
    components: {
      VabUpload,
    },
    data() {
      return {
        activeName: '默认模板1',
        showId: '0',
        inof: { name: '', url: '', img: null, selectName: null },
        menuList: [
          {
            id: '0',
            name: '开屏页设置',
            default: true,
            btnIconStatus: false,
          },
          {
            id: '1',
            name: '个人中心设置',
            default: true,
            btnIconStatus: false,
          },
        ],
        interval: 3000,
        form: {
          advertising: 0,
          advertising_time: 3,
        },
        inof_list: [
          {
            name: '',
            url: '',
            img: null,
            selectName: null,
          },
        ],
        img_list: [],
        imageIndex: null,
      }
    },
    watch: {
      inof_list: {
        handler(val) {
          if (val.length > 0) {
            this.img_list = []
            val.forEach((item) => {
              if (item.img != null) {
                this.img_list.push(item.img)
              }
            })
          } else {
            this.img_list = []
          }
        },
        deep: true,
      },
      form: {
        handler(val) {
          this.interval = Number(val.advertising_time) * 1000
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      SelectLink() {
        this.$refs['edit'].showEdit(0, '1,7,8,9,10,11,12', 1)
      },
      getSelectLink(data) {
        this.inof.url = data.selectUrl
        this.inof.selectName = data.selectName
        // this.inof_list[data.index].url = data.selectUrl
        // this.inof_list[data.index].selectName = data.selectName
      },
      uploadImage() {
        // this.imageIndex = index
        this.$refs['vabUpload'].handleShow()
      },
      getSon(data) {
        // this.inof_list[this.imageIndex].img = data[0]
        this.inof.img = data[0]
      },
      addImg() {
        this.inof_list.push({
          name: '',
          url: '',
          img: null,
          selectName: null,
        })
      },
      delImg(index) {
        this.inof_list.splice(index, 1)
      },

      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getAdminList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      handleOpen() {},
      handleClose() {},
      handleGrouPQuery(item) {
        this.showId = item.id
      },
    },
  }
</script>
<style lang="scss"></style>
