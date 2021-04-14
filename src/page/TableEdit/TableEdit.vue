<template>
  <div id="table-edit">
    <el-form :model="table" label-width="120px">
      <el-form-item class="name-form-item" label="开启页面">
        <el-switch v-model="table.enablePage"/>
      </el-form-item>
      <el-form-item label="表名">
        <el-col :span="8">
          <el-input v-model="table.name" placeholder="请输入表名"/>
        </el-col>
      </el-form-item>
      <el-form-item v-for="(column, index) in table.columns" :key="column.id" @click.native="onClickColumnItem(column)">
        <div slot="label">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-circle-plus-outline"
                     plain
                     @click="onAddColumn(index)"/>
          <el-button type="danger"
                     size="small"
                     icon="el-icon-remove-outline"
                     plain
                     @click="onDeleteColumn(index)"/>
        </div>
        <el-form :inline="true"
                 :model="column"
                 class="column-form">
          <el-row>
            <el-form-item label="列名" class="name-form-item">
              <el-input v-model="column.name"/>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="column.type" @change="onChangeType($event, column)">
                <el-option v-for="type in columnTypes" :key="type" :label="type" :value="type"/>
              </el-select>
            </el-form-item>
            <el-form-item class="length-form-item" label="长度">
              <el-input v-model="column.length"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="主键">
              <el-switch v-model="column.primary"/>
            </el-form-item>
            <div v-if="table.enablePage">
              <el-form-item label="表单项">
                <el-switch v-model="column.enableFormItem"/>
              </el-form-item>
              <el-form-item label="必选项" v-if="column.enableFormItem">
                <el-switch v-model="column.require"/>
              </el-form-item>
              <el-form-item label="表单项类型" v-if="column.enableFormItem">
                <el-select v-model="column.formItemType">
                  <el-option v-for="formItemType in formItemTypes"
                             :key="formItemType.className"
                             :label="formItemType.name"
                             :value="formItemType.className"/>
                </el-select>
              </el-form-item>
              <el-form-item label="表单项标签" v-if="column.enableFormItem">
                <el-input v-model="column.label" @input="onInputLabel($event, column)"/>
              </el-form-item>
              <el-form-item v-if="isOptionalFormItem(column.formItemType)">
                <el-button type="primary" @click="onEditOptions(column)">编辑选项</el-button>
              </el-form-item>
            </div>
            <div v-if="table.enablePage">
              <el-form-item label="搜索">
                <el-switch v-model="column.searchable"/>
              </el-form-item>
              <el-form-item label="表格列">
                <el-switch v-model="column.enableTableField"/>
              </el-form-item>
              <el-form-item label="列标题" v-if="column.enableTableField">
                <el-input v-model="column.title"/>
              </el-form-item>
              <el-form-item v-if="column.enableTableField">
                <el-button type="primary" @click="onEditFieldMapping">编辑列映射</el-button>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="关联">
                <el-switch v-model="column.enableAssociate" @change="onChangeAssociateStatus($event, column)"/>
              </el-form-item>
              <el-form-item v-if="column.enableAssociate">
                <el-form :inline="true" :model="column.associate">
                  <el-form-item label="选择关联表">
                    <el-select v-model="column.associate.targetTableName" @change="onChangeAssociateTable">
                      <el-option v-for="table in tables" :key="table.id" :value="table.name"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="关联的列">
                    <el-select v-model="column.associate.targetColumnName"
                               @visible-change="onUpdateTargetColumnNames($event, column)">
                      <el-option v-for="column in associateTableColumns" :key="column.id" :value="column.name"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="表单项列">
                    <el-select v-model="column.associate.formItemColumnName">
                      <el-option v-for="column in associateTableColumns" :key="column.id" :value="column.name"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onEditAssociateResultColumns">编辑关联的筛选列</el-button>
                  </el-form-item>
                </el-form>
              </el-form-item>
            </div>
          </el-row>
        </el-form>
      </el-form-item>
      <el-form-item v-if="table.enablePage"
                    v-for="(permission, index) in table.permissions"
                    :key="permission.id">
        <div slot="label">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-circle-plus-outline"
                     plain
                     @click="onAddPermission"/>
          <el-button type="danger"
                     size="small"
                     icon="el-icon-remove-outline"
                     plain
                     @click="onDeletePermission(index)"/>
        </div>
        <el-form :inline="true"
                 class="permission-form">
          <el-form-item label="角色">
            <el-select v-model="permission.role">
              <el-option v-for="role in roles" :key="role.name" :label="role.description" :value="role.name"/>
            </el-select>
          </el-form-item>
          <el-form-item label="操作">
            <el-checkbox v-model="permission.checkAll"
                         @change="onChangeCheckAll($event, permission)">全选
            </el-checkbox>
            <el-checkbox-group v-model="permission.operations" @change="onChangeOperation($event, permission)">
              <el-checkbox v-for="operation in operations"
                           :key="operation.value"
                           :label="operation">
                {{ operation.description }}
                <el-button type="danger" size="mini" icon="el-icon-delete"
                           @click="onDeleteOperation(permission, operation)"/>
              </el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" size="mini" @click="onShowOperationDialog(permission.role)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onClose">取消</el-button>
      </el-form-item>
    </el-form>

    <el-drawer :visible.sync="showEditOptions" class="option-drawer">
      <el-form :model="column">
        <el-form-item v-for="(option, index) in column.options" :key="option.id">
          <el-form :inline="true" :model="option">
            <el-col :span="11">
              <el-form-item label="选项名">
                <el-input v-model="option.title"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="选项值">
                <el-input v-model="option.value"/>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item>
                <el-button type="danger"
                           icon="el-icon-remove-outline"
                           @click="onDeleteOption(index)"></el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-form-item>
        <el-form-item class="add-btn-form-item">
          <el-button type="primary" @click="onAddOption">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer v-if="showEditAssociateResultColumns" :visible.sync="showEditAssociateResultColumns"
               class="option-drawer">
      <el-form :model="column.associate">
        <el-form-item v-for="(resultColumn, index) in column.associate.associateResultColumns"
                      :key="resultColumn.originColumnName">
          <el-form :inline="true" :model="resultColumn">
            <el-col :span="11">
              <el-form-item label="列名">
                <el-select v-model="resultColumn.originColumnName"
                           @change="onChangeAssociateResultColumn($event, resultColumn)">
                  <el-option v-for="column in associateTableColumns" :key="column.id" :value="column.name"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="列别名">
                <el-input v-model="resultColumn.aliasColumnName"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="表格列描述">
                <el-input v-model="resultColumn.tableFieldTitle"/>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item>
                <el-button type="danger"
                           icon="el-icon-remove-outline"
                           @click="onDeleteResultColumn(index)"></el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-form-item>
        <el-form-item class="add-btn-form-item">
          <el-button type="primary" @click="onAddResultColumn">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer v-if="showEditFieldMapping" :visible.sync="showEditFieldMapping"
               class="option-drawer">
      <el-form :model="column">
        <el-form-item v-for="(mapping, index) in column.mappings"
                      :key="mapping.source">
          <el-form :inline="true" :model="mapping">
            <el-col :span="11">
              <el-form-item label="数据库值">
                <el-input v-model="mapping.source"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="页面显示">
                <el-input v-model="mapping.target"/>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item>
                <el-button type="danger"
                           icon="el-icon-remove-outline"
                           @click="onDeleteMapping(index)"></el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-form-item>
        <el-form-item class="add-btn-form-item">
          <el-button type="primary" @click="onAddMapping">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-dialog :visible.sync="showOperation">
      <el-form :model="operation" ref="operationForm">
        <el-form-item label="描述">
          <el-input v-model="operation.description"/>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="operation.value"/>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="operation.position">
            <el-option value="toolbar" label="工具栏"/>
            <el-option value="toolColumn" label="工具列"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAddOperation">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../../util/Axios";
import { mapMutations, mapState } from 'vuex'
import { generateDefaultColumns } from '../../util/TableUtils'

export default {
  name: "TableEdit",
  created() {
    axios.get('/column/types').then(res => this.columnTypes = res.list)
    axios.get('/page/form-items').then(res => this.formItemTypes = res.list)
    axios.get('/page/option-form-items').then(res => this.needOptionFormItemTypes = res.list)
    if (this.table.name !== '') {
      this.overwrite = true
    }
    if (this.table.columns.map(it => it.name).indexOf('id') === -1) {
      generateDefaultColumns().forEach(it => this.table.columns.push(it))
    }
  },
  props: {
    table: {
      type: Object
    }
  },
  data() {
    return {
      columnTypes: [],
      formItemTypes: [],
      needOptionFormItemTypes: [],
      showEditOptions: false,
      showEditAssociateResultColumns: false,
      showEditFieldMapping: false,
      showOperation: false,
      column: {},
      operation: {
        description: '',
        value: ''
      },
      role: '',
      overwrite: false,
      associateTableColumns: [],
      operations: [
        {
          description: '添加',
          value: 'add',
          position: 'toolbar'
        },
        {
          description: '编辑',
          value: 'edit',
          position: 'toolColumn'
        },
        {
          description: '查看',
          value: 'detail',
          position: 'toolColumn'
        },
        {
          description: '删除',
          value: 'delete',
          position: 'toolColumn'
        }
      ]
    }
  },
  computed: {
    ...mapState(['roles', 'tables'])
  },
  methods: {
    onClickColumnItem(column) {
      this.column = column
      if (this.column.enableAssociate && this.column.associate.targetTableName !== '') {
        let table = this.tables.find(it => it.name === this.column.associate.targetTableName)
      }
    },
    onAddColumn(index) {
      let column = {
        name: '',
        type: '',
        length: 0,
        label: '',
        title: '',
        primary: false,
        searchable: false,
        enableFormItem: true,
        enableTableField: true,
        formItemType: '',
        require: false,
        options: [],
        mappings: [],
        associate: {
          targetTableName: '',
          targetColumnName: '',
          formItemColumnName: '',
          associateResultColumns: []
        }
      }
      column.id = Math.random()
      this.table.columns.splice(index + 1, 0, column)
    },
    onChangeType(event, column) {
      switch (column.type) {
        case 'int': {
          column.length = 11
          break
        }
        case 'varchar': {
          column.length = 255
          break
        }
        case 'tinyint': {
          column.length = 1
          break
        }
        case 'date':
        case 'text':
        case 'datetime': {
          column.length = 0
          break
        }
        case 'double': {
          column.length = 11
          break
        }
      }
    },
    onDeleteColumn(index) {
      this.table.columns.splice(index, 1)
    },
    onAddPermission() {
      let permission = {
        role: '',
        operations: [],
        checkAll: false
      }
      permission.id = Math.random()
      this.table.permissions.push(permission)
    },
    onChangeCheckAll(value, permission) {
      permission.checkAll = value
      if (value) {
        permission.operations = this.operations
      } else {
        permission.operations = []
      }
    },
    onChangeOperation(value, permission) {
      let checkedCount = value.length;
      permission.checkAll = checkedCount === this.operations.length
    },
    onDeletePermission(index) {
      this.table.permissions.splice(index, 1)
    },
    onSave() {
      let newTable = JSON.parse(JSON.stringify(this.table))
      newTable.id = Math.random()
      let formItems = this.table.columns.filter(it => it.enableFormItem)
      .map(it => {
        return {
          formItemClassName: it.formItemType,
          require: it.require,
          label: it.label,
          options: it.options
        }
      })
      let tableFields = this.table.columns.filter(it => it.enableTableField || it.enableAssociate)
      .map(it => {
        return {
          formItemClassName: it.formItemType,
          title: it.title,
          mappings: it.mappings
        }
      })
      newTable.form = {
        items: formItems
      }
      newTable.table = {
        fields: tableFields
      }
      this.saveTable({
        table: newTable,
        overwrite: this.overwrite
      })
      this.$router.back()
    },
    onClose() {
      this.$router.back()
    },
    isOptionalFormItem(formItemType) {
      return this.needOptionFormItemTypes.includes(formItemType)
    },
    onEditOptions(column) {
      this.column = column
      this.showEditOptions = true
    },
    onAddOption() {
      this.column.options.push({
        id: Math.random(),
        title: '',
        value: ''
      })
    },
    onDeleteOption(index) {
      this.column.options.splice(index, 1)
    },
    onChangeAssociateStatus(status, column) {
      column.enableFormItem = true
      column.enableTableField = false
      column.formItemType = 'com.zshnb.projectgenerator.generator.entity.SelectFormItem'
    },
    onUpdateTargetColumnNames(value, column) {
      if (value) {
        let tableName = column.associate.targetTableName
        let table = this.tables.find(it => it.name === tableName)
        this.associateTableColumns = table.columns
      }
    },
    onEditFieldMapping() {
      this.showEditFieldMapping = true
    },
    onAddMapping() {
      this.column.mappings.push({
        source: '',
        target: ''
      })
    },
    onDeleteMapping(index) {
      this.column.mappings.splice(index, 1)
    },
    onInputLabel(value, column) {
      column.title = value
    },
    onChangeAssociateTable(tableName) {
      let table = this.tables.find(it => it.name === tableName)
      this.associateTableColumns = table.columns
    },
    onChangeAssociateResultColumn(originColumnName, column) {
      const camelcase = require('camelcase')
      column.aliasColumnName = camelcase(`${ this.column.associate.targetTableName }_${ originColumnName }`)
    },
    onEditAssociateResultColumns() {
      this.showEditAssociateResultColumns = true
    },
    onAddResultColumn() {
      this.column.associate.associateResultColumns.push({
        originColumnName: '',
        aliasColumnName: '',
        tableFieldTitle: ''
      })
    },
    onDeleteResultColumn(index) {
      this.column.associate.associateResultColumns.splice(index, 1)
    },
    onShowOperationDialog(role) {
      this.role = role
      this.showOperation = true
    },
    onAddOperation() {
      let newOperation = JSON.parse(JSON.stringify(this.operation))
      let permission = this.table.permissions.find(it => it.role === this.role)
      permission.operations.push(newOperation)
      this.operations.push(newOperation)
      this.operation = {}
      this.showOperation = false
    },
    onDeleteOperation(permission, operation) {
      this.operations.splice(this.operations.findIndex(it => it === operation), 1)
      permission.operations.splice(permission.operations.findIndex(it => it === operation), 1)
    },
    ...mapMutations(['saveTable'])
  }
}
</script>

<style scoped lang="stylus">
#table-edit
  .el-row
    margin-bottom 20px

  .option-drawer
    .el-form
      padding 0 10px

  .add-btn-form-item
    text-align center

  .el-checkbox-group
    display inline-block
</style>
