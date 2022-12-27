<template>
  <div id="app">
    <QYKeFu />
    <router-view />
  </div>
</template>
<script>
  import watermark from '@/qy/warterMark'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    computed: mapState({
      userName: (state) => state.user.username,
    }),
    watch: {
      userName(res) {
        if (res != '游客' && res !== '') {
          this.$event.$emit('watermark', true)
        }
      },
    },
    created() {
      this.Watermarking()
    },
    methods: {
      Watermarking() {
        const that = this
        this.$event.$on('watermark', (res) => {
          if (res == true) {
            watermark.set(that.userName)
          } else {
            watermark.out()
          }
        })
      },
    },
  }
</script>
<style lang="scss">
  @import './assets/font/index.scss';
  // #app {
  //   font-family: 'whzzlsf' !important;
  // }
</style>
