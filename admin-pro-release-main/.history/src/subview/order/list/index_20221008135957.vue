<template>
  <div class="link-container">
    <ListOptions>
      <template #ceshi>
        <p>我是h1的内容</p>
      </template>
    </ListOptions>
    <ListContent />
  </div>
</template>

<script>
  import ListContent from './components/ListContent'
  import ListOptions from './components/ListOptions'
  export default {
    name: 'OrderList',
    components: { ListOptions, ListContent },
    data() {
      return {
        activeName: 'first',
        fold: false,
        height: this.$baseTableHeight(3) - 30,
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    created() {},
    methods: {
      handleFold() {
        this.fold = !this.fold
        this.handleHeight()
      },
      handleHeight() {
        if (this.fold) this.height = this.$baseTableHeight(2) - 47
        else this.height = this.$baseTableHeight(3) - 30
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        // this.fetchData()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
