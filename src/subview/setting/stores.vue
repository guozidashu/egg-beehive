<template>
  <div>
    <el-form label-width="80px" style="height: 70px; padding-top: 20px">
      <el-row type="flex">
        <el-form-item label="状态：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="搜索：">
          <el-input placeholder="请输入门店名称" style="width: 248px" />
        </el-form-item>
        <el-button style="height: 32px; margin-left: 20px" type="primary">
          查询
        </el-button>
      </el-row>
    </el-form>
    <!-- 分割 -->
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <el-button
      style="margin-top: 20px; margin-left: 20px"
      type="primary"
      @click="add"
    >
      添加门店
    </el-button>
    <el-table
      border
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id" width="100" />
      <el-table-column label="门店名称" prop="name" width="267" />
      <el-table-column label="门店图片" prop="img" width="267">
        <template slot-scope="{ row }">
          <img :src="row.img" style="width: 200px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="门店电话/地址" prop="dizhi" width="267">
        <template slot-scope="{ row }">
          <span>{{ row.men.phone }}</span>
          <p>{{ row.men.dizhi }}</p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="time" width="267" />
      <el-table-column label="状态" prop="zhuangtai" width="167">
        <el-switch
          v-model="value1"
          active-color="#1890ff"
          inactive-color="#d2d2d2"
        />
      </el-table-column>
      <el-table-column label="删除" width="220">
        <el-button @click="add">编辑</el-button>
        <el-button>删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper,sizes,total"
      :page-sizes="[5, 10, 15, 20]"
      style="margin-left: 200px"
      :total="4"
    />
    <!-- 弹框 -->
    <el-dialog
      :before-close="handleClose"
      title="+添加门店"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        label-width="100px"
        style="border-top: 1px solid #d2d2d2; margin-top: -20px"
      >
        <el-form-item label="名称：" style="margin-top: 20px">
          <el-input style="width: 248px" />
        </el-form-item>
        <el-form-item label="门店主图：">
          <el-button>上传图片</el-button>
          <span style="margin-left: 20px; color: #999">
            建议尺寸：640×640像素
          </span>
          <div
            style="
              margin-top: 10px;
              width: 106px;
              height: 106px;
              background-color: #f6f6f6;
              border: 1px solid #d2d2d2;
            "
          ></div>
        </el-form-item>
        <el-form-item label="批量上传：">
          <el-button>批量上传</el-button>
          <span style="margin-left: 20px; color: #999">
            建议尺寸：640×640像素
          </span>
        </el-form-item>
        <el-form-item label="摘要：">
          <el-input />
        </el-form-item>
        <el-form-item label="详情">
          <vab-quill
            ref="vab-quill"
            v-model="form.content"
            :min-height="400"
            :options="options1"
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input style="width: 500px" />
        </el-form-item>
        <el-form-item label="地址">
          <el-row type="flex">
            <el-input style="width: 500px" />
            <el-button style="margin-left: 20px">搜索</el-button>
          </el-row>
        </el-form-item>
        <el-form-item>
          <div style="width: 100px; height: 500px; background-color: #fff">
            <img src="../../assets/1666436281999.jpg" />
          </div>
          <el-row style="margin-top: 10px" type="flex">
            <el-input style="width: 150px" />
            <el-input style="width: 150px; margin-left: 20px" />
          </el-row>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input v-model="m" style="width: 150px" />
          <span style="color: #999; margin-left: 20px">
            用于排序，越大越靠前
          </span>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="radio" label="1">开启</el-radio>
          <el-radio v-model="radio" label="2">关闭</el-radio>
        </el-form-item>
      </el-form>
      <el-button style="margin-left: 50px" type="primary">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import VabQuill from '@/extra/VabQuill'
  // import VabUpload from '@/extra/VabUpload'
  export default {
    components: { VabQuill },
    data() {
      return {
        m: '0',
        radio: '1',
        form: {
          title: '',
          module: '',
          content: '',
        },
        dialogVisible: false,
        value1: false,
        qq: '请输入门店名称',
        options: [
          {
            value: '选项1',
            label: '全部',
          },
          {
            value: '选项2',
            label: '开启',
          },
          {
            value: '选项3',
            label: '关闭',
          },
        ],
        tableData: [
          {
            id: '1',
            name: '下沙店',
            men: {
              phone: '268-1185',
              dizhi: '下沙街道白羊小区门口2栋11-11',
            },
            time: '2022-03-15 14:06',
            img: 'https://img0.baidu.com/it/u=286715445,3841954973&fm=253&fmt=auto&app=120&f=JPEG?w=674&h=500',
          },
          {
            id: '2',
            name: '西湖店',
            men: {
              phone: '268-1185',
              dizhi: '西华文化中心广场C座A-1',
            },
            time: '2022-03-15 14:06',
            img: 'https://img0.baidu.com/it/u=4178934027,994064546&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=458',
          },
          {
            id: '3',
            name: '金沙湖店',
            men: {
              phone: '268-1185',
              dizhi: '幸福里小区门口边上3-11',
            },
            time: '2022-03-15 14:06',
            img: 'https://img2.baidu.com/it/u=2634194466,1574358241&fm=253&fmt=auto&app=120&f=JPEG?w=668&h=504',
          },
          {
            id: '4',
            name: '尚品折扣店',
            men: {
              phone: '268-1185',
              dizhi: '尚品商场2楼-3-0-2',
            },
            time: '2022-03-15 14:06',
            img: 'https://img2.baidu.com/it/u=2677049865,3831399706&fm=253&fmt=auto&app=138&f=JPEG?w=468&h=312',
          },
        ],
        value: '',
        options1: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ color: [] }, { background: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                [{ font: [] }],
                ['clean'],
                ['link', 'image', 'vab-upload-image'],
              ],
              handlers: {
                'vab-upload-image': () => {
                  this.$baseConfirm(
                    '演示环境未使用真实文件服务器，故图片上传回显不会生效，开发时请修改为正式文件服务器地址',
                    '开发注意事项！！！',
                    () => {
                      this.$refs['vabUpload'].handleShow()
                    },
                    () => {
                      this.handleAddImg()
                    },
                    '模拟打开文件上传',
                    '模拟添加一张文件服务器图片'
                  )
                },
              },
            },
          },
          placeholder: '内容...',
          readOnly: false,
        },
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      add() {
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      },
    },
  }
</script>

<style></style>
