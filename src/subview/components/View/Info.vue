<template>
  <div>
    <div
      :style="{
        backgroundColor: data.header_bg_color,
        padding: '10px 20px',
      }"
    >
      <div
        v-if="data.tab_type == 1 || data.tab_type == 3"
        :style="{
          color: data.header_font_color,
          marginBottom: data.tab_type == 1 ? '20px' : '0',
          fontSize: '18px',
          textAlign: data.tab_type == 3 ? 'center' : '0',
        }"
      >
        {{ data.title }}
      </div>

      <div v-if="data.tab_type != 3" class="search">
        <el-input
          clearable
          :placeholder="data.search_placeholder"
          prefix-icon="el-icon-search"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {}
    },
    watch: {
      data: {
        handler: function (val) {
          console.log(6666666, val)
        },
        deep: true,
        immediate: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .image-null {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 176px;
    font-size: 50px;
    color: #c1c1c1;
    background: #ffffff;
  }
</style>
