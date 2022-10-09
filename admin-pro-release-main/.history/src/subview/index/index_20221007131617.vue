<template>
  <div class="personal-center-container">
    <vab-cropper ref="vabCropper" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VabCropper from '@/extra/VabCropper'

  export default {
    name: 'Index',
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
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
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
