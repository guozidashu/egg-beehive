<template>
  <div>
    <el-form ref="form" label-width="120px">
      <el-form-item>
        <div id="container" style="width: 100%; height: 400px"></div>
        <p>注：多边形的形状尽量简洁，不要有交叉线</p>
      </el-form-item>
    </el-form>
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
      // // 地图初始化函数
      initMap() {
        var center = new window.TMap.LatLng(40.040452, 116.273486) // 设置中心点坐标
        // 初始化地图
        var map = new window.TMap.Map('container', {
          center: center,
          zoom: 16,
        })
        var path = [
          // 多边形的位置信息
          new window.TMap.LatLng(40.041117253378246, 116.2722415837743),
          new window.TMap.LatLng(40.03942536171407, 116.2726277820093),
          new window.TMap.LatLng(40.03970460886076, 116.27483769345417),
          new window.TMap.LatLng(40.041404706498625, 116.27443003983899),
        ]
        // 初始化polygon
        var polygon = new window.TMap.MultiPolygon({
          id: 'polygon-layer', // 图层id
          map: map, // 显示多边形图层的底图
          styles: {
            // 多边形的相关样式
            polygon: new window.TMap.PolygonStyle({
              color: 'rgba(41,91,255,0.16)',
              showBorder: true,
              borderColor: 'rgba(41,91,255,1)',
              borderWidth: 2,
            }),
          },
          geometries: [
            {
              id: 'polygon', // 多边形图形数据的标志信息
              styleId: 'polygon', // 样式id
              paths: path, // 多边形的位置信息
              properties: {
                // 多边形的属性数据
                title: 'polygon',
              },
            },
          ],
        })
        this.polygon = polygon
        this.map = map
      },
    },
  }
</script>
