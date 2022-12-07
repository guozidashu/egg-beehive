<template>
  <div>
    <el-carousel height="150px" trigger="click">
      <el-carousel-item v-for="item in imgList" :key="item">
        <el-image :src="item" />
      </el-carousel-item>
    </el-carousel>
    <el-image :src="imgAll[0]" style="width: 100%" />
    <el-image :src="imgAll[1]" style="width: 100%" />
    <el-image :src="imgAll[2]" style="width: 100%" />
    <el-image :src="imgAll[3]" style="width: 100%" />
    <el-image :src="imgAll[4]" style="width: 100%" />
    <el-carousel height="150px" trigger="click">
      <el-carousel-item v-for="item in imgTopList" :key="item">
        <el-image :src="item" />
      </el-carousel-item>
    </el-carousel>
    <el-image :src="imgAll[5]" style="width: 100%" />
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
        imgList: [
          'https://img.quanyu.link/FlRyAAKrr1a6CLCjorGQvz8wS1NX',
          'https://img.quanyu.link/FpwjEJe3v-YKiZ7gqXmMkJzi19RQ',
          'https://img.quanyu.link/FqCw7ebDURcxf6Sc2Ae6ZzQ4CY1L',
        ],
        imgAll: [
          'https://img.quanyu.link/Fh-2lgZyEPIAo0vZ0NN0vqoldUXG',
          'https://img.quanyu.link/FrljiKZpl7fjrS_VUIlYpNU-BcYL',
          'https://img.quanyu.link/FowfdZf5B18gsETQAsbe9jKS9l5c',
          'https://img.quanyu.link/FidcU6zmZAZQLTqCAsish0xOi12V',
          'https://img.quanyu.link/FhcWOdOOhR2JZOXqtdEfEjOmcy_m',
          'https://img.quanyu.link/FqvI3MCUQSRoqMXOEZ7CzUPql-iu',
        ],
        imgTopList: [
          'https://img.quanyu.link/FtHTVqLkm6n-ILADFDbwi6BcScoF',
          'https://img.quanyu.link/FlDVgK1JSfKyCVeFfnxYZX8yc90s',
        ],
      }
    },
    watch: {
      data: {
        handler: function (val) {
          console.log(8888888888, val)
        },
        deep: true,
        immediate: true,
      },
    },
  }
</script>
