<template>
  <div id="app">
    <QYKeFu />
    <router-view />
  </div>
</template>
<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  import watermark from '@/qy/warterMark'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    mixins: [datajosn],
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
            let InTime = new Date().getTime()
            let eTimeArr = that.Get_DateArr(InTime)
            watermark.set(
              that.userName +
                ' ' +
                eTimeArr[0] +
                '-' +
                eTimeArr[1] +
                '-' +
                eTimeArr[2]
            )
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
