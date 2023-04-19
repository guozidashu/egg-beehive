<template>
  <div class="components-drawer">
    <div>{{ form.title }}</div>
    <el-form ref="form" label-width="120px" :model="formDrawer" :rules="rules">
      <el-form-item label="门店Logo：">
        <div style="display: flex">
          <div>
            <el-button
              size="small"
              style="margin: 0 10px 0 0"
              type="primary"
              @click="handleShow(1)"
            >
              上传
            </el-button>
          </div>
          <el-image
            v-if="formDrawer.logo"
            :src="formDrawer.logo"
            style="width: 80px; height: 80px"
          >
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
        </div>
      </el-form-item>
      <el-form-item label="门店名称：" prop="name">
        <el-input
          v-model="formDrawer.name"
          placeholder="请输入门店名称"
          style="width: 215px"
        />
      </el-form-item>
      <el-form-item label="合作模式：">
        <el-radio-group
          v-model="formDrawer.cooperate_type"
          @change="changeHandler"
        >
          <el-radio :label="1">直营店</el-radio>
          <el-radio :label="2">联营店</el-radio>
          <el-radio :label="3">加盟店</el-radio>
          <el-radio :label="4">分销店</el-radio>
        </el-radio-group>
        <div v-if="formDrawer.cooperate_type == '直营店 || 联营店'">
          注：接入总部小程序，享受门店自提+核销服务，线下线上管好一盘生意
        </div>
        <div v-else-if="formDrawer.cooperate_type == '加盟店'">
          注：独立运营小程序商城，用户数字资产、资金流水完全私有化部署
        </div>
        <div v-else>
          注：第三方线上销售渠道如：抖音主播、快团团社群渠道、享受一件代发政策
        </div>
      </el-form-item>
      <!-- 渠道类型 -->
      <el-form-item label="渠道类型：">
        <el-radio-group
          v-model="formDrawer.channel_type"
          @change="changeHandler"
        >
          <el-radio :label="1">公司总部</el-radio>
          <el-radio :label="2">渠道合作</el-radio>
          <el-radio :label="3">第三方渠道</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="门店地址：">
        <QYAddress
          :adrress="formDrawer.address1"
          @getLawyerListInfo="selectAddress"
        />
      </el-form-item>
      <el-form-item label="详细地址：" prop="address">
        <el-input v-model="formDrawer.address" />
      </el-form-item>
      <QYStroeMap
        :longitude="formDrawer.longitude1"
        @getshopInfo="getStroeMap"
      />
      <el-form-item label="联系人：" prop="person">
        <el-input v-model="formDrawer.person" style="width: 215px" />
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input v-model="formDrawer.phone" style="width: 215px" />
      </el-form-item>
      <el-form-item label="门店摘要信息" prop="summary">
        <el-input v-model="formDrawer.summary" style="width: 215px" />
      </el-form-item>
      <el-form-item label="门店详情信息" prop="detail">
        <el-input
          v-model="formDrawer.detail"
          style="width: 215px"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="门店排序" prop="sort">
        <el-input v-model="formDrawer.sort" style="width: 215px" />
      </el-form-item>
      <el-form-item label="营业时间：">
        <el-time-picker
          v-model="formDrawer.business_hours"
          end-placeholder="下班时间"
          is-range
          placeholder="选择时间范围"
          range-separator="至"
          start-placeholder="上班时间"
        />
      </el-form-item>
      <el-form-item label="门店图片：">
        <div style="display: flex">
          <div>
            <el-button
              size="small"
              style="margin: 0 10px 0 0"
              type="primary"
              @click="handleShow(2)"
            >
              上传
            </el-button>
          </div>
          <div v-if="formDrawer.pic">
            <el-image
              v-for="(item, index) in formDrawer.pic"
              :key="index"
              :src="item"
              style="width: 80px; height: 80px"
            >
              <div slot="error" class="el-image__error">暂无图片</div>
            </el-image>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="营业状态：">
        <el-switch
          v-model="formDrawer.status"
          active-color="#41B584"
          active-text="开启"
          :active-value="1"
          class="switch"
          inactive-color="#D2D2D2"
          inactive-text="关闭"
          :inactive-value="2"
          style="margin: 0 10px"
        />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submitForm('form')">
          确认
        </el-button>
      </el-form-item>
    </el-form>
    <vab-upload
      v-if="UploadType == 1"
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
    <vab-upload
      v-if="UploadType == 2"
      ref="vabUpload"
      :limit="10"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  export default {
    components: { VabUpload },
    props: {
      form: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        UploadType: 1,
        formDrawer: JSON.parse(JSON.stringify(this.form)),
        rules: {
          name: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入门店地址', trigger: 'blur' },
          ],
          person: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          summary: [
            { required: true, message: '请输入门店摘要信息', trigger: 'blur' },
          ],
          detail: [
            { required: true, message: '请输入门店详情信息', trigger: 'blur' },
          ],
          sort: [
            { required: true, message: '请输入门店排序', trigger: 'blur' },
          ],
        },
      }
    },
    watch: {
      form: {
        handler: function (newVal) {
          this.formDrawer = JSON.parse(JSON.stringify(newVal))
          if (this.formDrawer.status) {
            this.formDrawer.status = Number(this.formDrawer.status)
          }
          if (this.formDrawer.cooperate_type) {
            this.formDrawer.cooperate_type = Number(
              this.formDrawer.cooperate_type
            )
          }
          if (this.formDrawer.channel_type) {
            this.formDrawer.channel_type = Number(this.formDrawer.channel_type)
          }
          this.formDrawer.address1 = [
            this.formDrawer.province,
            this.formDrawer.city,
            this.formDrawer.district,
          ]
          this.formDrawer.longitude1 = [
            this.formDrawer.longitude,
            this.formDrawer.latitude,
          ]
          this.$forceUpdate()
        },
        deep: true,
        immediate: true,
      },
    },
    created() {},
    methods: {
      changeHandler() {
        this.$forceUpdate()
      },
      selectAddress(selectProvince, selectCity, selectArea) {
        this.formDrawer.province = selectProvince
        this.formDrawer.city = selectCity
        this.formDrawer.district = selectArea
      },
      getSon(data) {
        if (this.UploadType == 1) {
          this.formDrawer.logo = data[0]
        } else {
          this.formDrawer.pic = data
        }
        this.$forceUpdate()
      },
      handleShow(type) {
        this.UploadType = type
        this.$refs['vabUpload'].handleShow()
      },
      getStroeMap(value) {
        this.formDrawer.longitude = value.lng
        this.formDrawer.latitude = value.lat
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.formDrawer.id == undefined) {
              delete this.formDrawer.province
              delete this.formDrawer.city
              delete this.formDrawer.district
              const { code } = await this.api.editStoreSave(this.formDrawer)
              if (code === 200) {
                this.$message.success('新增成功')
              } else {
                this.$message.error('新增失败')
              }
            } else {
              const { code } = await this.api.editStoreSave(this.formDrawer)
              if (code === 200) {
                this.$message.success('编辑成功')
              } else {
                this.$message.error('编辑失败')
              }
            }
          } else {
            console.log('error submit!!')
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped></style>
