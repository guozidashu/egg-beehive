<template>
  <footer>
    <div class="vab-footer" style="margin: 30px 0 10px 0">
      Copyright
      <vab-icon icon="copyright-line" />
      {{ fullYear }} {{ title }}
    </div>
    <div class="vab-footer">
      本网站由阿里云提供云计算及安全服务 | 本网站支持
    </div>
  </footer>
</template>

<script>
  import { title } from '@/config'

  export default {
    name: 'VabFooter',
    data() {
      return {
        fullYear: new Date().getFullYear(),
        title,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 $base-padding 0 $base-padding;
    color: rgba(0, 0, 0, 0.45);
    // background: $base-color-white;
    // border-top: 1px dashed $base-border-color;

    i {
      margin: 0 5px;
    }
  }
</style>
