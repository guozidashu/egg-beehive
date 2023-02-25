<template>
  <div v-if="type == 1" class="block">
    <el-timeline v-if="list.length > 0">
      <el-timeline-item
        v-for="(item, index) in list"
        :key="index"
        placement="top"
        :timestamp="item.create_time"
      >
        <el-card shadow="hover">
          <el-tag v-if="item.type == 1">跟进中</el-tag>
          <el-tag v-if="item.type == 2" type="success">已成单</el-tag>
          <el-tag v-if="item.type == 3" type="danger">异常</el-tag>
          <el-tag v-if="item.type == 4" type="info">记录</el-tag>
          <p>员工：{{ item.employee_name }}</p>
          <p>内容：{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-if="list.length == 0" style="margin-left: 20px">
      <h3>暂无记录</h3>
    </div>
  </div>
  <div v-else>
    <div
      v-for="(item, index) in listTag"
      :key="index"
      style="margin-left: 20px"
    >
      <h4>{{ item.group_name }}</h4>
      <div>
        <el-tag
          v-for="(item1, index1) in item.tags"
          :key="index1"
          :effect="item1.select ? 'dark' : 'plain'"
          style="margin: 10px"
          @click="BindSelect(index, index1)"
        >
          {{ item1.tag_name }}
        </el-tag>
      </div>
    </div>
    <div style="position: absolute; right: 20px; bottom: 20px">
      <el-button type="primary" @click="BindSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      drawerId: {
        type: String,
        default: '',
      },
      drawerType: {
        type: Number,
        default: 0,
      },
      drawerIdList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        form: {
          pageSize: '10',
          external_id: this.drawerId,
          page: 1,
        },
        type: this.drawerType,
        list: [],
        listTag: [],
        listTemp: [],
      }
    },

    watch: {
      drawerId: {
        handler: function (n) {
          this.form.external_id = n
          this.fetchData()
        },
        deep: true,
        immediate: true,
      },
      drawerType: {
        handler: function (n) {
          this.type = n
          if (n == 2 || n == 3) {
            this.fetchList()
          }
        },
        deep: true,
        immediate: true,
      },
    },
    created() {},
    methods: {
      BindSelect(index, index1) {
        this.listTag[index].tags[index1].select =
          !this.listTag[index].tags[index1].select
        if (this.listTag[index].tags[index1].select) {
          this.listTemp.push(this.listTag[index].tags[index1])
        } else {
          this.listTemp = this.listTemp.filter(
            (item) => item.name !== this.listTag[index].tags[index1].name
          )
        }
      },
      async BindSubmit() {
        let inof = {
          tags: [],
          external_ids: [],
        }
        if (this.type == 2) {
          inof.external_ids.push(this.drawerId)
          this.listTemp.forEach((item) => {
            inof.tags.push(item.tag_id)
          })
          if (inof.tags.length == 0) {
            this.$message({
              message: '请选择标签',
              type: 'warning',
            })
            return
          }
          const { code } = await this.api.addTagToExternal(inof)
          if (code == 200) {
            this.$emit('handleClose')
            this.$emit('fetch-data')
          }
        } else {
          inof.external_ids = this.drawerIdList
          this.listTemp.forEach((item) => {
            inof.tags.push(item.tag_id)
          })
          if (inof.tags.length == 0) {
            this.$message({
              message: '请选择标签',
              type: 'warning',
            })
            return
          }
          const { code } = await this.api.addTagToExternal(inof)
          if (code == 200) {
            this.$emit('handleClose')
            this.$emit('fetch-data')
          }
        }
      },

      async fetchList() {
        const { data } = await this.api.getAllTag()
        data.forEach((item) => {
          item.tags.forEach((item1) => {
            item1.select = false
          })
        })
        this.listTag = data
      },
      async fetchData() {
        if (this.type != 1) return
        const { data } = await this.api.getFollowList(this.form)
        this.list = data.data
      },
    },
  }
</script>
<style lang="scss" scoped></style>
