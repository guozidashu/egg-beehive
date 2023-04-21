<template>
  <div>
    <!-- 客户类排行列表 -->
    <div v-if="type == 1">
      <div v-if="page == 1 && (index == 0 || index == 1 || index == 2)">
        <el-image
          v-if="index == 0"
          src="https://oss.business.quanyu123.com//55e41f91c5e5c540b924ab024c1b0a8b.png"
          style="width: 40px; height: 40px"
        />
        <el-image
          v-if="index == 1"
          src="https://oss.business.quanyu123.com//cea245f706b72dc1f2f8648445f1f39c.png"
          style="width: 40px; height: 40px"
        />
        <el-image
          v-if="index == 2"
          src="https://oss.business.quanyu123.com//4a5e3ed64ea5d49cb1767ee444dd46c8.png"
          style="width: 40px; height: 40px"
        />
      </div>
      <div v-else>
        <span v-if="page == 1" class="index_more index_common">
          {{ index + 1 }}
        </span>
        <span v-else class="index_more index_common">
          {{ pageSize * (page - 1) + index + 1 }}
        </span>
      </div>
    </div>
    <!-- 商品类排行列表 -->
    <div v-if="type == 2">
      <div v-if="page == 1 && (index == 0 || index == 1 || index == 2)">
        <el-image
          v-if="index == 0"
          fit="fill"
          src="https://oss.business.quanyu123.com//9262262c884ce42b5ae45a6584e60073.png"
          style="width: 30px; height: 30px"
        />
        <el-image
          v-if="index == 1"
          fit="fill"
          src="https://oss.business.quanyu123.com//576747e09905bcb253e594baf2837860.png"
          style="width: 30px; height: 30px"
        />
        <el-image
          v-if="index == 2"
          fit="fill"
          src="https://oss.business.quanyu123.com//de8e2e27025b39e30316df51db6a747d.png"
          style="width: 30px; height: 30px"
        />
      </div>
      <div v-else>
        <span v-if="page == 1" class="index_more index_common">
          {{ index + 1 }}
        </span>
        <span v-else class="index_more index_common">
          {{ pageSize * (page - 1) + index + 1 }}
        </span>
      </div>
    </div>
    <!-- 普通排行 -->
    <div v-if="type == 3">
      <span
        class="index_common"
        :class="[
          index + 1 == '1'
            ? 'index_one'
            : index + 1 == '2'
            ? 'index_two'
            : index + 1 == '3'
            ? 'index_three'
            : 'index_more',
        ]"
      >
        {{ index + 1 }}
      </span>
    </div>
    <!-- 普通排行列表 -->
    <div v-if="type == 4">
      <span
        v-if="page == 1"
        class="index_common"
        :class="[
          index + 1 == '1'
            ? 'index_one'
            : index + 1 == '2'
            ? 'index_two'
            : index + 1 == '3'
            ? 'index_three'
            : 'index_more',
        ]"
      >
        {{ index + 1 }}
      </span>
      <span v-else class="index_more index_common">
        {{ pageSize * (page - 1) + index + 1 }}
      </span>
    </div>
    <!-- 商品排行 -->
    <div v-if="type == 5">
      <div v-if="index == 0 || index == 1 || index == 2">
        <el-image
          v-if="index == 0"
          fit="fill"
          src="https://oss.business.quanyu123.com//9262262c884ce42b5ae45a6584e60073.png"
          style="width: 30px; height: 30px"
        />
        <el-image
          v-if="index == 1"
          fit="fill"
          src="https://oss.business.quanyu123.com//576747e09905bcb253e594baf2837860.png"
          style="width: 30px; height: 30px"
        />
        <el-image
          v-if="index == 2"
          fit="fill"
          src="https://oss.business.quanyu123.com//de8e2e27025b39e30316df51db6a747d.png"
          style="width: 30px; height: 30px"
        />
      </div>
      <div v-else>
        <span class="index_more index_common">
          {{ index + 1 }}
        </span>
      </div>
    </div>
    <!-- 客户排行 -->
    <div v-if="type == 6">
      <div v-if="index == 0 || index == 1 || index == 2">
        <el-image
          v-if="index == 0"
          src="https://oss.business.quanyu123.com//55e41f91c5e5c540b924ab024c1b0a8b.png"
          style="width: 40px; height: 40px"
        />
        <el-image
          v-if="index == 1"
          src="https://oss.business.quanyu123.com//cea245f706b72dc1f2f8648445f1f39c.png"
          style="width: 40px; height: 40px"
        />
        <el-image
          v-if="index == 2"
          src="https://oss.business.quanyu123.com//4a5e3ed64ea5d49cb1767ee444dd46c8.png"
          style="width: 40px; height: 40px"
        />
      </div>
      <div v-else>
        <span class="index_more index_common">
          {{ index + 1 }}
        </span>
      </div>
    </div>
    <!-- 商品前三排行 -->
    <div v-if="type == 7">
      <el-image
        v-if="index == 0"
        fit="fill"
        src="https://oss.business.quanyu123.com//9262262c884ce42b5ae45a6584e60073.png"
        style="width: 20px; height: 30px"
      />
      <el-image
        v-if="index == 1"
        fit="fill"
        src="https://oss.business.quanyu123.com//576747e09905bcb253e594baf2837860.png"
        style="width: 20px; height: 30px"
      />
      <el-image
        v-if="index == 2"
        fit="fill"
        src="https://oss.business.quanyu123.com//de8e2e27025b39e30316df51db6a747d.png"
        style="width: 20px; height: 30px"
      />
    </div>
    <!-- 客户前三排行 -->
    <div v-if="type == 8">
      <el-image
        v-if="index == 0"
        src="https://oss.business.quanyu123.com//053e8de20c3c5c214fff0704750a15d8.png"
        style="width: 25px; height: 25px"
      />
      <el-image
        v-if="index == 1"
        src="https://oss.business.quanyu123.com//7f2f279fe5fbf0d86fb568673ac871b1.png"
        style="width: 25px; height: 25px"
      />
      <el-image
        v-if="index == 2"
        src="https://oss.business.quanyu123.com//ad017a3aac2926e21cc65020087405da.png"
        style="width: 25px; height: 25px"
      />
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      //  1:客户类排行列表 2.商品类排行列表 3.普通排行 4.普通排行列表 5.商品排行 6.客户排行 7.商品前三排行 8.客户前三排行
      type: {
        type: Number,
        default: 0,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      page: {
        type: Number,
        default: null,
      },
      index: {
        type: Number,
        default: null,
      },
    },

    data() {
      return {
        selName: '',
      }
    },
    computed: {},
    watch: {},
    created() {},
    methods: {},
  }
</script>
