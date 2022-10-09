<vab-query-form>
  <vab-query-form-top-panel>
    <el-form
      ref="form"
      :inline="true"
      label-width="49px"
      :model="queryForm"
      @submit.native.prevent
    >
      <el-form-item label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="!fold" label="标题">
        <el-input v-model="queryForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          native-type="submit"
          type="primary"
          @click="handleQuery"
        >
          查询
        </el-button>
        <el-button type="text" @click="handleFold">
          <span v-if="fold">展开</span>
          <span v-else>合并</span>
          <vab-icon
            class="vab-dropdown"
            :class="{ 'vab-dropdown-active': fold }"
            icon="arrow-up-s-line"
          />
        </el-button>
      </el-form-item>
    </el-form>
  </vab-query-form-top-panel>
</vab-query-form>
