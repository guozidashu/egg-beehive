<template>
  <div class="linkage">
    <div>
      <el-select
        v-model="selectProvince"
        filterable
        placeholder="请选择省份"
        size="small"
        @change="selectProvinceFun($event)"
      >
        <el-option
          v-for="(item, index) in city"
          :key="index"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </div>
    <div>
      <el-select
        v-model="selectCity"
        filterable
        placeholder="请选择城市"
        size="small"
        @change="selectCityFun($event)"
      >
        <el-option
          v-for="(item, index) in cityList"
          :key="index"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </div>
    <div>
      <el-select
        v-model="selectArea"
        filterable
        placeholder="请选择区县"
        size="small"
        @change="selectAreaFun($event)"
      >
        <el-option
          v-for="(item, index) in areaList"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
  </div>
</template>
<script>
  import city from '@/assets/address.json'
  export default {
    name: 'City',
    data() {
      return {
        // 整个省市县数据
        city: city,
        // 被选中的市数据
        cityList: [],
        // 被选中的县数据
        areaList: [],
        selectProvince: '',
        selectCity: '',
        selectArea: '',
      }
    },
    methods: {
      // 省份 市 县联动
      selectProvinceFun(event) {
        if (event) {
          this.cityList = city.filter(function (item) {
            return item.name == event
          })[0].city
          this.selectCity = this.cityList[0].name
          this.areaList = this.cityList[0].area
          this.selectArea = this.cityList[0].area[0]
        } else {
          this.cityList = []
        }
        this.$emit(
          'getLawyerListInfo',
          this.selectProvince,
          this.selectCity,
          this.selectArea
        )
      },
      selectCityFun(event) {
        if (event) {
          this.areaList = this.cityList.filter(function (item) {
            return item.name == event
          })[0].area
          this.selectArea = this.areaList[0]
        } else {
          this.areaList = []
        }
        this.$emit(
          'getLawyerListInfo',
          this.selectProvince,
          this.selectCity,
          this.selectArea
        )
      },
      selectAreaFun() {
        this.$emit(
          'getLawyerListInfo',
          this.selectProvince,
          this.selectCity,
          this.selectArea
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .linkage {
    display: flex;
    div {
      margin-right: 5px;
    }
  }
</style>
