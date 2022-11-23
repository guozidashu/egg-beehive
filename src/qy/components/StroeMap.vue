<template>
  <div>
    <el-form ref="form" label-width="120px">
      <el-form-item label="详细地址：">
        <el-input
          v-model="addressKeyword"
          clearable
          placeholder="请输入地址来直接查找相关位置"
          style="margin-bottom: 20px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getAddressKeyword"
          />
        </el-input>
      </el-form-item>
      <el-form-item>
        <div id="container" style="width: 100%; height: 400px"></div>
      </el-form-item>
      <el-form-item label="门店坐标：">
        <el-input
          v-model="shopInfo.lat"
          style="width: 105px; margin-right: 10px"
        />
        <el-input v-model="shopInfo.lng" style="width: 105px" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { TMap } from '@/api/map'
  export default {
    data() {
      return {
        map: null,
        getAddress: null,
        getAddCode: null,
        addressKeyword: '',
        shopInfo: {
          lng: '',
          lat: '',
          addr: '',
        },
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initMap()
      })
    },
    methods: {
      // 地图初始化函数
      initMap() {
        var that = this

        TMap('ZZ2BZ-FI5CK-W7JJV-AJ76O-L47TV-7OFT6').then((qq) => {
          var myLatlng = new qq.maps.LatLng(27.979716, 109.59023)
          var myOptions = {
            zoom: 13,
            center: myLatlng,
            mapTypeId: qq.maps.MapTypeId.ROADMAP,
          }
          that.map = new qq.maps.Map(
            document.getElementById('container'),
            myOptions
          )
          // 获取点击后的地址
          qq.maps.event.addListener(that.map, 'click', function (event) {
            // 获取点击后的地图坐标

            that.shopInfo.lng = event.latLng.getLng()
            that.shopInfo.lat = event.latLng.getLat()
            that.getAddressCode()
          })

          // 调用地址显示地图位置并设置地址
          that.getAddress = new qq.maps.Geocoder({
            complete: function (result) {
              that.map.setCenter(result.detail.location)
              that.shopInfo.lng = result.detail.location.lng
              that.shopInfo.lat = result.detail.location.lat
              that.$emit('getPlace', that.shopInfo)
              var marker = new qq.maps.Marker({
                map: that.map,
                position: result.detail.location,
              })
              console.log(marker)
            },
          })
          // 通过坐标来显示地图地址
          that.getAddCode = new qq.maps.Geocoder({
            complete: function (result) {
              that.addressKeyword = result.detail.address
              that.shopInfo.addr = result.detail.address
              that.$emit('getPlace', that.shopInfo)
            },
          })
        })
      },
      // 通过地址获得位置
      getAddressKeyword() {
        // 通过getLocation();方法获取位置信息值
        this.getAddress.getLocation(this.addressKeyword)
        this.$emit('getshopInfo', this.shopInfo)
      },
    },
  }
</script>
<style>
  #container {
    min-width: 600px;
    min-height: 767px;
  }
</style>
