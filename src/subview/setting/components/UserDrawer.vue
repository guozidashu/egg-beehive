<template>
  <div class="tagAdmin">
    <div class="btnNav">
      <el-button size="mini" type="primary" @click="submit">提交</el-button>
    </div>
    <el-form ref="ruleForm" :model="formData">
      <el-table
        border
        :data="tableData"
        :header-cell-style="{
          color: '#333',
          background: '#eee',
          padding: '5px 10px',
          'font-size': '12px',
        }"
        height="400"
        row-class-name="bda-table"
        :span-method="arraySpanMethod"
        style="width: 100%"
      >
        <el-table-column label="功能" min-width="120" prop="parentId">
          <template #default="scope">
            <el-checkbox
              v-model="
                formData[
                  scope.row[
                    scope.row.children.length !== 0 ? 'parentId' : 'cfunctionId'
                  ]
                ]
              "
              :indeterminate="
                childSelection[
                  scope.row[
                    scope.row.children.length !== 0 ? 'parentId' : 'cfunctionId'
                  ]
                ]
              "
              size="mini"
              @change="
                checkChange(
                  scope.row[
                    scope.row.children.length !== 0 ? 'parentId' : 'cfunctionId'
                  ],
                  sourceData.find((item) => {
                    return (
                      item.cfunctionId ===
                      scope.row[
                        scope.row.children.length !== 0
                          ? 'parentId'
                          : 'cfunctionId'
                      ]
                    )
                  }).children
                )
              "
            >
              {{
                scope.row[
                  scope.row.children.length !== 0
                    ? 'parentName'
                    : 'cfunctionName'
                ]
              }}
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="二级功能" min-width="120" prop="two-level">
          <template #default="scope">
            <el-checkbox
              v-if="scope.row.children.length !== 0"
              v-model="formData[scope.row.cfunctionId]"
              :indeterminate="childSelection[scope.row.cfunctionId]"
              size="mini"
              @change="
                checkChange(
                  scope.row.cfunctionId,
                  scope.row.children,
                  scope.row
                )
              "
            >
              {{ scope.row.cfunctionName }}
            </el-checkbox>
            <div v-else>
              <el-checkbox
                v-for="item in scope.row.unOwnedList"
                :key="item.cfunctionId"
                v-model="formData[item.cfunctionId]"
                size="mini"
                @change="checkChange(item.cfunctionId, null, item)"
              >
                {{ item.cfunctionName }}
              </el-checkbox>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="三级功能" min-width="300" prop="three-level">
          <template #default="scope">
            <el-checkbox
              v-for="item in scope.row.children"
              :key="item.cfunctionId"
              v-model="formData[item.cfunctionId]"
              size="mini"
              @change="checkChange(item.cfunctionId, null, item, scope.row.pId)"
            >
              {{ item.cfunctionName }}
            </el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'EmployeesEdit',
    data() {
      return {
        tableData: [],
        sourceData: [
          {
            cfunctionId: '10059',
            cfunctionName: '首页菜单',
            pCfunctionId: '0',
            indexCode: '32',
            indexLev: 0,
            seq: 0,
            pCfunctionName: null,
            permissionStr:
              'url:bdatag/homepage\nurl:bdatag/tag/statistics\nurl:bdatag/anlyz/listAnlyzByIndexIdAngTagobjId\nmenu:taglib/homeOverview\nurl:bdatag/tag/job/listHistTagCalcDayTime',
            groupId: null,
            groupName: null,
            componentId: null,
            componentName: null,
            permissionValue: null,
            enable: false,
            id: '10059',
            pId: '0',
            indexType: null,
          },
          {
            cfunctionId: '10001',
            cfunctionName: '标签管理',
            pCfunctionId: '0',
            indexCode: '01',
            indexLev: 0,
            seq: 1,
            pCfunctionName: null,
            permissionStr:
              'url:bdatag/dbcolumn\r\nurl:bdatag/model\r\nmenu:tag\r\nurl:bdatag/tag\r\nurl:bdatag/tagobj\r\nurl:bdatag/dbtable\r\nurl:bdatag/dbenum\r\nurl:bdatag/region',
            groupId: null,
            groupName: null,
            componentId: null,
            componentName: null,
            permissionValue: null,
            enable: false,
            children: [
              {
                cfunctionId: '10008',
                cfunctionName: '标签目录维护',
                pCfunctionId: '10001',
                indexCode: '01.01',
                indexLev: 1,
                seq: 0,
                pCfunctionName: null,
                permissionStr: '',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                children: [
                  {
                    cfunctionId: '10015',
                    cfunctionName: '新建目录',
                    pCfunctionId: '10008',
                    indexCode: '01.01.01',
                    indexLev: 2,
                    seq: 0,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tagindex:create',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10015',
                    pId: '10008',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10016',
                    cfunctionName: '编辑目录',
                    pCfunctionId: '10008',
                    indexCode: '01.01.02',
                    indexLev: 2,
                    seq: 1,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tagindex:update',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10016',
                    pId: '10008',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10017',
                    cfunctionName: '删除目录',
                    pCfunctionId: '10008',
                    indexCode: '01.01.03',
                    indexLev: 2,
                    seq: 2,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tagindex:delete',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10017',
                    pId: '10008',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10018',
                    cfunctionName: '移动目录',
                    pCfunctionId: '10008',
                    indexCode: '01.01.04',
                    indexLev: 2,
                    seq: 3,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tagindex:move',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10018',
                    pId: '10008',
                    indexType: null,
                  },
                ],
                id: '10008',
                pId: '10001',
                indexType: null,
              },
              {
                cfunctionId: '10009',
                cfunctionName: '标签维护',
                pCfunctionId: '10001',
                indexCode: '01.02',
                indexLev: 1,
                seq: 1,
                pCfunctionName: null,
                permissionStr: 'url:workflow\nmenu:taglib/tag',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                children: [
                  {
                    cfunctionId: '10020',
                    cfunctionName: '创建标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.02',
                    indexLev: 2,
                    seq: 0,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:create',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10020',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10023',
                    cfunctionName: '编辑标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.05',
                    indexLev: 2,
                    seq: 1,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:update',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10023',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10025',
                    cfunctionName: '删除标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.08',
                    indexLev: 2,
                    seq: 2,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:delete',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10025',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10024',
                    cfunctionName: '移动标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.07',
                    indexLev: 2,
                    seq: 3,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:move',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10024',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10019',
                    cfunctionName: '标签详细',
                    pCfunctionId: '10009',
                    indexCode: '01.02.01',
                    indexLev: 2,
                    seq: 4,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:details',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10019',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10026',
                    cfunctionName: '执行更新',
                    pCfunctionId: '10009',
                    indexCode: '01.02.09',
                    indexLev: 2,
                    seq: 5,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:calc',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10026',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10027',
                    cfunctionName: '发布标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.10',
                    indexLev: 2,
                    seq: 6,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:publish',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10027',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10028',
                    cfunctionName: '评估标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.11',
                    indexLev: 2,
                    seq: 7,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:evaluate',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10028',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10029',
                    cfunctionName: '优化标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.12',
                    indexLev: 2,
                    seq: 8,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:optimize',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10029',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10030',
                    cfunctionName: '停用标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.13',
                    indexLev: 2,
                    seq: 9,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:deactivate',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10030',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10031',
                    cfunctionName: '重新启动',
                    pCfunctionId: '10009',
                    indexCode: '01.02.14',
                    indexLev: 2,
                    seq: 10,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:republish',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10031',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10032',
                    cfunctionName: '下线标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.15',
                    indexLev: 2,
                    seq: 11,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:offline',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10032',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10033',
                    cfunctionName: '命中分析配置',
                    pCfunctionId: '10009',
                    indexCode: '01.02.16',
                    indexLev: 2,
                    seq: 12,
                    pCfunctionName: null,
                    permissionStr:
                      'bdatag:fun:tag:hit\r\nurl:bdatag/anlyz/getDefaultDbtable\r\nurl:bdatag/anlyz/v2/execute',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10033',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10034',
                    cfunctionName: '标签预览数据',
                    pCfunctionId: '10009',
                    indexCode: '01.02.17',
                    indexLev: 2,
                    seq: 13,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:preview',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10034',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10035',
                    cfunctionName: '标签明细数据查询',
                    pCfunctionId: '10009',
                    indexCode: '01.02.18',
                    indexLev: 2,
                    seq: 14,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:datatab:show',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10035',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10036',
                    cfunctionName: '标签数据导出',
                    pCfunctionId: '10009',
                    indexCode: '01.02.19',
                    indexLev: 2,
                    seq: 15,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:detail:exp',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10036',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10117',
                    cfunctionName: '规则标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.20',
                    indexLev: 2,
                    seq: 16,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:rule',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10117',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10118',
                    cfunctionName: '组合标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.21',
                    indexLev: 2,
                    seq: 17,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:combine',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10118',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10119',
                    cfunctionName: '手工标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.22',
                    indexLev: 2,
                    seq: 18,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:manual',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10119',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10120',
                    cfunctionName: '模型标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.23',
                    indexLev: 2,
                    seq: 19,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:model',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10120',
                    pId: '10009',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10121',
                    cfunctionName: '实时标签',
                    pCfunctionId: '10009',
                    indexCode: '01.02.24',
                    indexLev: 2,
                    seq: 20,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:realtime',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10121',
                    pId: '10009',
                    indexType: null,
                  },
                ],
                id: '10009',
                pId: '10001',
                indexType: null,
              },
              {
                cfunctionId: '10303',
                cfunctionName: '我的标签',
                pCfunctionId: '10001',
                indexCode: '01.11',
                indexLev: 1,
                seq: 2,
                pCfunctionName: null,
                permissionStr: 'menu:myTag',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                children: [
                  {
                    cfunctionId: '10304',
                    cfunctionName: '创建的标签',
                    pCfunctionId: '10303',
                    indexCode: '01.11.01',
                    indexLev: 2,
                    seq: 0,
                    pCfunctionName: null,
                    permissionStr: 'menu:taglib/tagSelfCreate',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10304',
                    pId: '10303',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10305',
                    cfunctionName: '收藏的标签',
                    pCfunctionId: '10303',
                    indexCode: '01.11.02',
                    indexLev: 2,
                    seq: 1,
                    pCfunctionName: null,
                    permissionStr: 'menu:taglib/tagSelfCollect',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10305',
                    pId: '10303',
                    indexType: null,
                  },
                ],
                id: '10303',
                pId: '10001',
                indexType: null,
              },
              {
                cfunctionId: '10010',
                cfunctionName: '标签集市',
                pCfunctionId: '10001',
                indexCode: '01.03',
                indexLev: 1,
                seq: 3,
                pCfunctionName: null,
                permissionStr: 'menu:taglib/tagMarket/market',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                id: '10010',
                pId: '10001',
                indexType: null,
              },
              {
                cfunctionId: '10011',
                cfunctionName: '标签更新',
                pCfunctionId: '10001',
                indexCode: '01.04',
                indexLev: 1,
                seq: 4,
                pCfunctionName: null,
                permissionStr:
                  'menu:taglib/tagUpdate\nurl:bdatag/tagclash\nurl:bdatag/visual/listTagFilterFieldVos\nurl:bdatag/visual/listTagShowFieldVos\nurl:bdatag/portrait/listBizObjects\nurl:bdatag/job/log/list',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                id: '10011',
                pId: '10001',
                indexType: null,
              },
              {
                cfunctionId: '10012',
                cfunctionName: '运营监测',
                pCfunctionId: '10001',
                indexCode: '01.05',
                indexLev: 1,
                seq: 5,
                pCfunctionName: null,
                permissionStr: 'menu:taglib/tagAssessment',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                id: '10012',
                pId: '10001',
                indexType: null,
              },
              {
                cfunctionId: '10013',
                cfunctionName: '需求提报',
                pCfunctionId: '10001',
                indexCode: '01.06',
                indexLev: 1,
                seq: 6,
                pCfunctionName: null,
                permissionStr:
                  'menu:taglib/requirement\nurl:taglib/requirement\n',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                children: [
                  {
                    cfunctionId: '10038',
                    cfunctionName: '提需求',
                    pCfunctionId: '10013',
                    indexCode: '01.06.02',
                    indexLev: 2,
                    seq: 0,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:apply',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10038',
                    pId: '10013',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10039',
                    cfunctionName: '删除需求',
                    pCfunctionId: '10013',
                    indexCode: '01.06.03',
                    indexLev: 2,
                    seq: 1,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:deleteApply',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10039',
                    pId: '10013',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10041',
                    cfunctionName: '关闭需求',
                    pCfunctionId: '10013',
                    indexCode: '01.06.05',
                    indexLev: 2,
                    seq: 2,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:closeApply',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10041',
                    pId: '10013',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10042',
                    cfunctionName: '导入需求',
                    pCfunctionId: '10013',
                    indexCode: '01.06.06',
                    indexLev: 2,
                    seq: 3,
                    pCfunctionName: null,
                    permissionStr:
                      'bdatag:fun:tag:importApply\nurl:bdatag/excel',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10042',
                    pId: '10013',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10044',
                    cfunctionName: '导出需求',
                    pCfunctionId: '10013',
                    indexCode: '01.06.07',
                    indexLev: 2,
                    seq: 4,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tag:exportApply',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10044',
                    pId: '10013',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10037',
                    cfunctionName: '流程配置',
                    pCfunctionId: '10013',
                    indexCode: '01.06.01',
                    indexLev: 2,
                    seq: 5,
                    pCfunctionName: null,
                    permissionStr: 'fun:tag:applyworkflow:config',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10037',
                    pId: '10013',
                    indexType: null,
                  },
                ],
                id: '10013',
                pId: '10001',
                indexType: null,
              },
              {
                cfunctionId: '10014',
                cfunctionName: '主体配置',
                pCfunctionId: '10001',
                indexCode: '01.07',
                indexLev: 1,
                seq: 7,
                pCfunctionName: null,
                permissionStr:
                  'menu:taglib/tagobj\nurl:workflow\nurl:bdatag/dblink\nurl:bdatag/excel/cancle\nurl:bdatag/excel/getTemplate',
                groupId: null,
                groupName: null,
                componentId: null,
                componentName: null,
                permissionValue: null,
                enable: false,
                children: [
                  {
                    cfunctionId: '10047',
                    cfunctionName: '新增标签主体',
                    pCfunctionId: '10014',
                    indexCode: '01.07.01',
                    indexLev: 2,
                    seq: 0,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tagobj:create',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10047',
                    pId: '10014',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10048',
                    cfunctionName: '编辑标签主体',
                    pCfunctionId: '10014',
                    indexCode: '01.07.02',
                    indexLev: 2,
                    seq: 1,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tagobj:update',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10048',
                    pId: '10014',
                    indexType: null,
                  },
                  {
                    cfunctionId: '10049',
                    cfunctionName: '删除标签主体',
                    pCfunctionId: '10014',
                    indexCode: '01.07.03',
                    indexLev: 2,
                    seq: 2,
                    pCfunctionName: null,
                    permissionStr: 'bdatag:fun:tagobj:delete',
                    groupId: null,
                    groupName: null,
                    componentId: null,
                    componentName: null,
                    permissionValue: null,
                    enable: false,
                    id: '10049',
                    pId: '10014',
                    indexType: null,
                  },
                ],
                id: '10014',
                pId: '10001',
                indexType: null,
              },
            ],
            id: '10001',
            pId: '0',
            indexType: null,
          },
        ],
        formData: {},
        treeData: [],
        childSelection: {},
      }
    },
    created() {
      // 初始化数据（处理成适合的数据）
      // initData(JSON.parse(JSON.stringify(data.treeData)));
      this.treeData = JSON.parse(JSON.stringify(this.sourceData))
      this.initData(this.treeData)
    },
    methods: {
      // 处理数据方法
      initData(arr) {
        arr.forEach((item) => {
          let unOwnedList = []
          if (item.children) {
            item.children.forEach((j) => {
              let temp = JSON.parse(JSON.stringify(j))
              j.parentId = item.cfunctionId
              j.parentName = item.cfunctionName
              if (!j.children) {
                j.children = []
                unOwnedList.push(temp)
              }
            })
          }
          // window.console.log(unOwnedList, item.children)
          if (item.children) {
            let childItem = item.children

            if (unOwnedList.length !== 0) {
              unOwnedList.forEach((item_1) => {
                childItem.forEach((res, index) => {
                  // window.console.log(res.cfunctionName, item_1.cfunctionName)
                  if (res.cfunctionId === item_1.cfunctionId) {
                    // window.console.log(index, childItem[index])
                    childItem.splice(index, 1)
                  }
                })
              })
              childItem.push({
                // ...item,
                children: [],
                unOwnedList: unOwnedList,
                parentId: item.cfunctionId,
                parentName: item.cfunctionName,
                cfunctionId: item.cfunctionId,
                cfunctionName: item.cfunctionName,
              })
            }
            // window.console.log(childItem)
            this.tableData.push(...childItem)
          } else {
            this.tableData.push({
              ...item,
              children: [],
            })
          }
        })
      },
      // 合并表格方法
      arraySpanMethod(row, column, rowIndex, columnIndex) {
        if (columnIndex === 0) {
          const parent = this.treeData.find(
            (i) => i.cfunctionId === row.parentId
          )
          // window.console.log(parent)
          if (parent && row.cfunctionId === parent.children[0].cfunctionId) {
            return {
              rowspan: parent.children.length,
              colspan: 1,
            }
          } else if (
            parent &&
            row.cfunctionId !== parent.children[0].cfunctionId
          ) {
            return {
              rowspan: 0,
              colspan: 0,
            }
          } else {
            return {
              rowspan: 1,
              colspan: 3,
            }
          }
        } else if (columnIndex === 1) {
          // window.console.log(row, column, rowIndex, columnIndex)
          if (row.children.length !== 0) {
            return {
              rowspan: 1,
              colspan: 1,
            }
          } else {
            return {
              rowspan: 1,
              colspan: 2,
            }
          }
        }
      },
      // 多选框选中效果
      checkChange(id, childList, row, superiorId) {
        this.childSelection[id] = false
        if (row && row.pId !== '0') {
          this.childSelection[row.pId] = true

          if (superiorId) {
            this.childSelection[superiorId] = true
          }
        }

        if (childList) {
          childList.forEach((item) => {
            this.formData[item.cfunctionId] = this.formData[id]
            if (item.children) {
              this.checkChange(item.cfunctionId, item.children)
            }
          })
        }
      },
      // 提交选中内容
      submit() {
        window.console.log('选中内容', this.formData)
      },
    },
  }
</script>
