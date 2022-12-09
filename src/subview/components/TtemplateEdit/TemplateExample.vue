<template>
  <div>
    <el-carousel height="150px" trigger="click">
      <el-carousel-item v-for="item in imgList" :key="item">
        <el-image :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'TemplateExample',
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        list: {},
        imgList: [
          'https://img.quanyu.link/FlRyAAKrr1a6CLCjorGQvz8wS1NX',
          'https://img.quanyu.link/FpwjEJe3v-YKiZ7gqXmMkJzi19RQ',
          'https://img.quanyu.link/FqCw7ebDURcxf6Sc2Ae6ZzQ4CY1L',
        ],
      }
    },
    watch: {
      data: {
        handler(val) {
          this.list = val
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.list = this.data
    },

    methods: {},
  }
</script>
