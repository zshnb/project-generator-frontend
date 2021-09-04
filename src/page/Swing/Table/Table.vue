<template>
  <div id="swing-table">
    <el-form :model="table" label-width="120px">
      <el-form-item class="name-form-item" label="开启窗体">
        <el-switch v-model="table.enablePage"/>
      </el-form-item>
      <el-form-item label="表名">
        <el-col :span="3">
          <el-input v-model="table.name" placeholder="请输入表名"/>
        </el-col>
      </el-form-item>
      <el-form-item label="表描述">
        <el-col :span="3">
          <el-input v-model="table.comment" placeholder="请输入表名"/>
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
              <el-input v-model="column.name" placeholder="列名"/>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="column.type" @change="onChangeType($event, column)">
                <el-option v-for="type in columnTypes" :key="type" :label="type" :value="type"/>
              </el-select>
            </el-form-item>
            <el-form-item class="length-form-item" label="长度">
              <el-input v-model="column.length"/>
            </el-form-item>
            <el-form-item label="列描述" class="name-form-item">
              <el-input v-model="column.comment"/>
            </el-form-item>
          </el-row>
          <el-row>
            <div>
              <el-form-item label="主键">
                <el-switch v-model="column.primary"/>
              </el-form-item>
              <el-form-item label="可空">
                <el-switch v-model="column.nullable"/>
              </el-form-item>
              <el-form-item label="重复">
                <el-switch v-model="column.repeatable"/>
              </el-form-item>
            </div>
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
            </div>
            <div>
              <el-form-item label="关联">
                <el-switch v-model="column.enableAssociate" @change="onChangeAssociateStatus($event, column)"/>
              </el-form-item>
              <el-form-item v-if="column.enableAssociate">
                <el-form :inline="true" :model="column.associate">
                  <el-form-item label="选择关联表">
                    <el-select v-model="column.associate.targetTableName" @change="onChangeAssociateTable($event, column.associate)">
                      <el-option v-for="table in tables" :key="table.id" :value="table.name"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="关联的列">
                    <el-select v-model="column.associate.targetColumnName"
                               @visible-change="onUpdateTargetColumnNames($event, column)">
                      <el-option v-for="column in associateTable.columns" :key="column.id" :value="column.name"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="column.enableFormItem" label="表单项列">
                    <el-select v-model="column.associate.formItemColumnName">
                      <el-option v-for="column in associateTable.columns" :key="column.id" :value="column.name"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onEditAssociateResultColumns(column)">编辑关联的筛选列</el-button>
                  </el-form-item>
                </el-form>
              </el-form-item>
            </div>
          </el-row>
        </el-form>
      </el-form-item>
      <el-form-item v-if="table.enablePage"
                    v-for="(permission, index) in table.permissions"
                    @click.native=onClickPermission(permission)
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
            <el-checkbox-group v-model="permission.operations">
              <el-checkbox v-for="operation in permission.operations"
                           :key="operation.value"
                           :label="operation">
                {{ operation.description }}
                <el-button type="primary" size="mini" icon="el-icon-edit"
                           @click="onEditOperation(operation)"/>
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
            <el-col :span="10">
              <el-form-item>
                <el-input v-model="option.title" placeholder="选项描述" @input="onInputOptionTitle($event, option)"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-input v-model="option.value" placeholder="选项值"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
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
            <el-col :span="10">
              <el-form-item>
                <el-select v-model="resultColumn.originColumnName"
                           placeholder="列名"
                           @change="onChangeAssociateResultColumn($event, resultColumn)">
                  <el-option v-for="column in associateTable.columns" :key="column.id" :value="column.name"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-input v-model="resultColumn.tableFieldTitle" placeholder="列描述"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
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
    <el-dialog :visible.sync="showOperation">
      <el-form :model="operation" ref="operationForm">
        <el-form-item label="描述">
          <el-input v-model="operation.description"/>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="operation.value"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAddOperation">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../../../util/Axios";
import { generateDefaultColumns, getColumn } from "../../../util/swing/TableUtils";
import { mapMutations, mapState } from "vuex";
import { frameItemClassNames } from "../../../util/Constant";
import { getDefaultOperations } from "../../../util/TableUtils";

export default {
  name: "Table",
  created() {
    axios.get('/column/types').then(res => this.columnTypes = res.list)
    axios.get('/page/frame-items').then(res => this.formItemTypes = res.list)
    axios.get('/page/option-frame-items').then(res => this.needOptionFormItemTypes = res.list)
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
      overwrite: false,
      associateTable: {},
      defaultOperations: getDefaultOperations(),
      operation: {
        description: '',
        value: ''
      },
      permission: {}
    }
  },
  computed: {
    ...mapState('swing', ['tables', 'roles'])
  },
  methods: {
    onClickColumnItem(column) {
      this.column = column
    },
    onAddColumn(index) {
      let column = getColumn()
      this.table.columns.splice(index + 1, 0, column)
    },
    onChangeType(event, column) {
      switch (column.type) {
        case 'int': {
          column.length = 0
          column.formItemType = frameItemClassNames.textFieldFrameItem
          break
        }
        case 'varchar': {
          column.length = 255
          column.formItemType = frameItemClassNames.textFieldFrameItem
          break
        }
      }
    },
    onDeleteColumn(index) {
      this.table.columns.splice(index, 1)
    },
    isOptionalFormItem(formItemType) {
      return this.needOptionFormItemTypes.includes(formItemType)
    },
    onInputOptionTitle(value, option) {
      option.value = value
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
      column.type = 'int'
      column.length = 0
      column.enableFormItem = true
      column.enableTableField = false
      column.formItemType = frameItemClassNames.selectFrameItem
    },
    onChangeAssociateTable(tableName, columnAssociate) {
      this.associateTable = this.tables.find(it => it.name === tableName)
      columnAssociate.targetColumnName = 'id'
    },
    onChangeAssociateResultColumn(originColumnName, resultColumn) {
      let targetColumn = this.associateTable.columns.find(it => it.name === originColumnName)
      resultColumn.columnType = targetColumn.type
      resultColumn.tableFieldTitle = `${this.associateTable.comment}${targetColumn.comment}`
    },
    onEditAssociateResultColumns(column) {
      this.column = column
      this.showEditAssociateResultColumns = true
      this.associateTable = this.tables.find(it => it.name === this.column.associate.targetTableName)
    },
    onAddResultColumn() {
      this.column.associate.associateResultColumns.push({
        columnType: '',
        originColumnName: '',
        tableFieldTitle: ''
      })
    },
    onUpdateTargetColumnNames(value, column) {
      if (value) {
        let tableName = column.associate.targetTableName
        this.associateTable = this.tables.find(it => it.name === tableName)
      }
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
      this.permission.operations.push(newOperation)
      this.operation = {}
      this.showOperation = false
    },
    onEditOperation(operation) {
      this.operation = operation
      this.showOperation = true
    },
    onAddPermission() {
      let permission = {
        role: '',
        operations: getDefaultOperations()
      }
      permission.id = Math.random()
      this.table.permissions.push(permission)
    },
    onClickPermission(permission) {
      this.permission = permission
    },
    onDeletePermission(index) {
      this.table.permissions.splice(index, 1)
    },
    onSave() {
      let newTable = JSON.parse(JSON.stringify(this.table))
      newTable.id = Math.random()
      newTable.items = this.table.columns.map(it => {
        return {
          className: it.formItemType,
          options: it.options
        }
      })
      this.saveTable({
        table: newTable,
        overwrite: this.overwrite
      })
      this.$router.back()
    },
    onClose() {
      this.$router.back()
    },
    ...mapMutations('swing', ['saveTable'])
  }
}
</script>

<style scoped lang="stylus">
#swing-table
  .el-row
    margin-bottom 20px

  .option-drawer
    .el-form
      padding 0 10px

  .add-btn-form-item
    text-align center

  .el-checkbox-group
    display inline-block
  >>>.el-drawer.rtl
    overflow scroll
</style>
