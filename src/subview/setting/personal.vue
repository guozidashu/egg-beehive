<template>
  <div class="personal-center-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover" style="border-radius: 5px">
          <div class="personal-center-user-info">
            <!-- <el-avatar :size="100" :src="avatar" @click.native="openDialog" /> -->
            <div class="personal-center-user-info-full-name">
              {{ form.fullName }}
            </div>
            <div class="personal-center-user-info-description">
              {{ form.description }}
            </div>
            <ul class="personal-center-user-info-list">
              <li>
                <vab-icon icon="user-3-line" />
                前端小白白
              </li>
              <li>
                <vab-icon icon="magic-line" />
                1992/8/11
              </li>
              <li>
                <vab-icon icon="women-line" />
                女
              </li>
              <li>
                <vab-icon icon="community-line" />
                圈域 - 开发部
              </li>
              <li>
                <vab-icon icon="map-pin-2-line" />
                中国 • 广东省 • 深圳市
              </li>
              <li>
                <el-divider />
                <h5>个性标签</h5>
                <el-tag size="small">腹黑</el-tag>
                <el-tag size="small">怕麻烦</el-tag>
                <el-tag size="small">小仙女</el-tag>
                <el-tag size="small">仙气飘飘</el-tag>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <el-card shadow="hover" style="border-radius: 5px">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
              <el-col :lg="12" :md="16" :sm="24" :xl="12" :xs="24">
                <el-form ref="form" label-width="80px" :model="form">
                  <el-form-item label="姓名">
                    <el-input v-model="form.fullName" />
                  </el-form-item>
                  <el-form-item label="昵称">
                    <el-input v-model="form.nickname" />
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-select v-model="form.sex" style="width: 100%">
                      <el-option label="保密" :value="0" />
                      <el-option label="男" :value="1" />
                      <el-option label="女" :value="2" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="个人简介">
                    <el-input v-model="form.description" type="textarea" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="账号绑定" name="second">
              <div class="personal-center-item">
                <vab-icon icon="wechat-line" style="color: #4daf29" />
                <div class="personal-center-item-content">
                  <div>绑定微信</div>
                  <div class="personal-center-item-content-second">
                    当前未绑定绑定微信账号
                  </div>
                </div>
                <el-link type="primary">更换绑定</el-link>
              </div>
              <el-divider />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <vab-cropper ref="vabCropper" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import VabCropper from '@/extra/VabCropper'

  export default {
    name: 'Personal',
    components: { VabCropper },
    data() {
      return {
        activeName: 'second',
        form: {
          fullName: unescape('\u695a\u829d\u99a8'),
          nickname: 'good luck',
          sex: 2,
          description: unescape(
            '\u5bcc\u5728\u672f\u6570\uff0c\u4e0d\u5728\u52b3\u8eab\uff1b\u5229\u5728\u52bf\u5c45\uff0c\u4e0d\u5728\u529b\u8015\u3002'
          ),
        },
      }
    },
    computed: mapState({
      userInof: (state) => state.user,
    }),
    watch: {
      userInof: {
        handler: function () {
          // this.form = res
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      onSubmit() {
        this.$baseMessage('模拟保存成功', 'success', 'vab-hey-message-success')
      },
      openDialog() {
        this.$refs['vabCropper'].dialogVisible = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  $base: '.personal-center';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;

    #{$base}-user-info {
      padding: $base-padding;
      text-align: center;

      ::v-deep {
        .el-avatar {
          img {
            cursor: pointer;
          }
        }
      }

      &-full-name {
        margin-top: 15px;
        font-size: 24px;
        font-weight: 500;
        color: #262626;
      }

      &-description {
        margin-top: 8px;
      }

      &-follow {
        margin-top: 15px;
      }

      &-list {
        margin-top: 18px;
        line-height: 30px;
        text-align: left;
        list-style: none;

        h5 {
          margin: -20px 0 5px 0;
        }

        ::v-deep {
          .el-tag {
            margin-right: 10px !important;
          }

          .el-tag + .el-tag {
            margin-left: 0;
          }
        }
      }
    }

    #{$base}-item {
      display: flex;

      i {
        font-size: 40px;
      }

      &-content {
        box-sizing: border-box;
        flex: 1;
        margin-left: $base-margin;

        &-second {
          margin-top: 8px;
        }
      }
    }
  }
</style>
