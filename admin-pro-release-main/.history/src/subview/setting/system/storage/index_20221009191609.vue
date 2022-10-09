<template>
  <div class="comprehensive-form-container"></div>
</template>

<script>
  import { getList } from '@/api/area'

  export default {
    name: 'SystemStorage',
    data() {
      return {}
    },
    created() {
      this.fetchData()
    },
    methods: {
      //获取行政区划
      async fetchData() {
        const {
          data: { list },
        } = await getList()
        this.areaOptions = list
      },
    },
  }
</script>

<style lang="scss" scoped>
  .comprehensive-form-container {
    .demo-form {
      margin-top: 10px;
    }
  }
</style>
