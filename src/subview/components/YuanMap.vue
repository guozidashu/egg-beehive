<template>
  <div>
    <div id="container" style="width: 600px; height: 500px"></div>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data() {
      return {
        longitude: 39.916527, //经度
        latitude: 116.397128, //纬度
      }
    },
    mounted() {
      this.initMap()
    },
    methods: {
      // 地图初始化函数
      initMap() {
        let center = new window.TMap.LatLng(39.984104, 116.307503)
        //初始化地图
        let map = new window.TMap.Map('container', {
          zoom: 12, //设置地图缩放级别
          center: center, //设置地图中心点坐标
        })
        let circle = new window.TMap.MultiCircle({
          map,
          styles: {
            // 设置圆形样式
            circle: new window.TMap.CircleStyle({
              color: 'rgba(41,91,255,0.16)',
              showBorder: true,
              borderColor: 'rgba(41,91,255,1)',
              borderWidth: 2,
            }),
          },
          geometries: [
            {
              styleId: 'circle',
              center: center,
              radius: 6500,
            },
          ],
        })
        this.circle = circle
        this.map = map
      },
    },
  }
</script>
