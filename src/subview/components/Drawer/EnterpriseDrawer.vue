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
          <h4 v-if="item.type == 0">未跟进记录</h4>
          <h4 v-if="item.type == 1">跟进中记录</h4>
          <h4 v-if="item.type == 2">已成单记录</h4>
          <h4 v-if="item.type == 3">异常记录</h4>
          <p>{{ item.employee_name }}</p>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div style="margin-left: 20px">
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
  import { getFollowList, getAllTag, addTagToExternal } from '@/api/basic'
  export default {
    name: 'ComponentsDrawer',
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
        console.log(this.listTemp)
        // this.$emit('fetch-data')
        let inof = {
          tags: [],
          external_ids: [],
        }
        if (this.type == 2) {
          inof.external_ids.push(this.drawerId)
          this.listTemp.forEach((item) => {
            inof.tags.push(item.tag_id)
          })
          const { code } = await addTagToExternal(inof)
          if (code == 200) {
            this.$emit('fetch-data')
          }
        } else {
          inof.external_ids = this.drawerIdList
          this.listTemp.forEach((item) => {
            inof.tags.push(item.tag_id)
          })
          const { code } = await addTagToExternal(inof)
          if (code == 200) {
            this.$emit('fetch-data')
          }
        }
      },

      async fetchList() {
        const { data } = await getAllTag()
        data.forEach((item) => {
          item.tags.forEach((item1) => {
            item1.select = false
          })
        })
        this.listTag = data
      },
      async fetchData() {
        if (this.type != 1) return
        const { data } = await getFollowList(this.form)
        this.list = data.data
      },
    },
  }
</script>
<style lang="scss" scoped></style>
