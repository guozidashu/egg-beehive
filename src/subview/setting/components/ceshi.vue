<template>
  <div class="mytree">
    <el-tree
      :data="treedata"
      indent="0"
      :props="defaultProps"
      :render-content="renderContent"
      @node-click="handleNodeClick"
    />
    <el-tree
      :data="data"
      :default-checked-keys="[5]"
      :default-expanded-keys="[2, 3]"
      node-key="id"
      :props="defaultProps"
      show-checkbox
    />
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        tree_data: [
          {
            // type:1,
            label: 'notice-id1',
            children: [
              {
                label: ['卫星名称代号', 'ZOHREH-2'],
              },
              {
                label: ['组织机构', 'IRN'],
              },
              {
                label: ['频率范围', '10950-1450'],
              },
              {
                label: '[上行]beam名称',
                children: [
                  {
                    label: ['name', 'RS49'],
                  },
                  {
                    label: ['freq_min', '10950'],
                  },
                  {
                    label: ['freq_max', '14500'],
                  },
                  {
                    label: ['group(' + '3' + ')'],
                    children: [
                      {
                        label: ['10600361', '10950', '11200', '0'],
                      },
                      {
                        label: ['10600361', '10950', '11200', '0'],
                      },
                      {
                        label: ['10600361', '10950', '11200', '0'],
                      },
                    ],
                  },
                ],
              },
            ],
            defaultProps: {
              children: 'children',
              label: 'label',
            },
          },
        ],
      }
    },
    methods: {
      // 自定义树形控件函数 node代表每个节点
      renderContent(h, { node }) {
        // div代表树形控件的一行，div中包含三个span标签
        // 判断节点的label数组数量，通过三目运算来选择class
        // 设置class来控制树形控件进行对齐
        return h('div', [
          h(
            'span',
            { class: node.label.length === 2 ? 'nodeStyle' : 'groupStyle' },
            node.label[0]
          ),
          h('span', { class: 'groupStyle' }, node.label[1]),
          h(
            'span',
            { class: node.label.length === 2 ? 'nodeStyle' : 'groupStyle' },
            node.label.length === 2 ? '' : node.label[2]
          ),
        ])
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nodeStyle {
    display: inline-block;
    width: 110px;
    text-align: left;
  }
  .groupStyle {
    display: inline-block;
    width: 150px;
    text-align: left;
  }
</style>
