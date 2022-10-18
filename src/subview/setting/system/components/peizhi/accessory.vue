<template>
  <div>
    <el-form label-width="150px">
      <el-form-item label="附件存储类型：">
        <el-select v-model="value" placeholder="请选择" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div v-if="value === '选项2'">
        <el-form-item label="Access Key ID：">
          <el-input class="ipt5" />
        </el-form-item>
        <el-form-item label="Access Key Secret：">
          <el-input class="ipt5" />
        </el-form-item>
        <el-form-item label="Bucket名称：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">空间名称</span>
        </el-form-item>
        <el-form-item label="EndPoint（地域节点）">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">
            如：oss-cn-qingdao.aliyuncs.com
          </span>
        </el-form-item>
        <el-form-item label="Bucket域名：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">
            开头须加http://或https://
          </span>
        </el-form-item>
      </div>
      <div v-if="value === '选项3'">
        <el-form-item label="Accesskey：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">
            在密钥管理中查找
          </span>
        </el-form-item>
        <el-form-item label="Secretkey：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">空间名称</span>
        </el-form-item>
        <el-form-item label="Url：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">
            开头须加http://或https://
          </span>
        </el-form-item>
      </div>
      <div v-if="value === '选项4'">
        <el-form-item label="APPID：">
          <el-input class="ipt5" />
        </el-form-item>
        <el-form-item label="SecretID：">
          <el-input class="ipt5" />
        </el-form-item>
        <el-form-item label="SecretKEY：">
          <el-input class="ipt5" />
        </el-form-item>
        <el-form-item label="Bucket：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">空间名称</span>
        </el-form-item>
        <el-form-item label="bucket所属地域：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">
            地域代码，如：ap-beijing
          </span>
        </el-form-item>
        <el-form-item label="Url：">
          <el-input class="ipt5" />
          <span style="margin-left: 10px; color: #999999">
            开头须加http://或https://
          </span>
        </el-form-item>
      </div>
    </el-form>
    <el-button style="margin-top: 20px; margin-left: 40px" type="primary">
      提交
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '跟随平台附件设置',
          },
          {
            value: '选项2',
            label: '阿里云',
          },
          {
            value: '选项3',
            label: '七牛云',
          },
          {
            value: '选项4',
            label: '腾讯云',
          },
        ],
        value: '选项1',
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-theme-blue-black .el-select-dropdown__item.hover,
  .vab-theme-blue-black .el-select-dropdown__item:hover {
    background-color: #5fb878;
  }
  .ipt5 {
    width: 300px;
  }
</style>
