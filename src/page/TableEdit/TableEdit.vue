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
      <el-form-item v-for="(column, index) in table.columns" :key="column.id">
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
              <el-select v-model="column.type">
                <el-option v-for="type in columnTypes" :key="type" :label="type" :value="type"/>
              </el-select>
            </el-form-item>
            <el-form-item class="length-form-item" label="长度">
              <el-input v-model="column.length"/>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="column.comment"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="主键">
              <el-switch v-model="column.primary"/>
            </el-form-item>
            <div v-if="table.enablePage">
              <el-form-item label="搜索">
                <el-switch v-model="column.searchable"/>
              </el-form-item>
              <el-form-item label="必选项">
                <el-switch v-model="column.require"/>
              </el-form-item>
              <el-form-item label="表单项">
                <el-switch v-model="column.enableFormItem"/>
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
            <el-form-item label="关联">
              <el-switch v-model="column.enableAssociate" @change="onChangeAssociateStatus($event, column)"/>
            </el-form-item>
            <el-form-item v-if="column.enableAssociate">
              <el-form :inline="true" :model="table.associate">
                <el-form-item label="选择关联表">
                  <el-select v-model="table.associate.targetTableName" @change="onChangeAssociateTable">
                    <el-option v-for="table in tables" :key="table.id" :value="table.name"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="关联的列">
                  <el-select v-model="table.associate.targetColumnName">
                    <el-option v-for="column in associateTableColumns" :key="column.id" :value="column.name"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="表单项列">
                  <el-select v-model="table.associate.formItemColumnName">
                    <el-option v-for="column in associateTableColumns" :key="column.id" :value="column.name"/>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onEditAssociateResultColumns">编辑关联的筛选列</el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
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
            <el-checkbox-group v-model="permission.operations">
              <el-checkbox label="add"/>
              <el-checkbox label="edit"/>
              <el-checkbox label="detail"/>
              <el-checkbox label="delete"/>
            </el-checkbox-group>
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
      <el-form :model="table.associate">
        <el-form-item v-for="(column, index) in table.associate.associateResultColumns" :key="column.originColumnName">
          <el-form :inline="true" :model="column">
            <el-col :span="11">
              <el-form-item label="列名">
                <el-select v-model="column.originColumnName" @change="onChangeAssociateResultColumn($event, column)">
                  <el-option v-for="column in associateTableColumns" :key="column.id" :value="column.name"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="列别名">
                <el-input v-model="column.aliasColumnName"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="表格列描述">
                <el-input v-model="column.tableFieldTitle"/>
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
          <el-button type="primary" @click="onAddResultColumn">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import axios from "../../util/Axios";
  import {mapMutations, mapState} from 'vuex'
  import {generateDefaultColumns} from '../../util/TableUtils'

  export default {
    name: "TableEdit",
    created() {
      axios.get('/column/types').then(res => this.columnTypes = res.list)
      axios.get('/page/form-items').then(res => this.formItemTypes = res.list)
      axios.get('/page/option-form-items').then(res => this.needOptionFormItemTypes = res.list)
      if (this.table.name !== '') {
        this.overwrite = true
      }
      generateDefaultColumns().forEach(it => this.table.columns.push(it))
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
        column: {},
        overwrite: false,
        associateTableColumns: []
      }
    },
    computed: {
      ...mapState(['roles', 'tables'])
    },
    watch: {
      table: {
        handler(newValue, oldValue) {
          // fixme: 只会在最后一列生效，中间列不生效
          let index = newValue.columns.length - 1
          switch (oldValue.columns[index].type) {
            case 'int': {
              newValue.columns[index].length = 11
              break
            }
            case 'varchar': {
              newValue.columns[index].length = 255
              break
            }
            case 'tinyint': {
              newValue.columns[index].length = 1
              break
            }
            case 'date':
            case 'text':
            case 'datetime': {
              newValue.columns[index].length = 0
              break
            }
            case 'double': {
              newValue.columns[index].length = 11
              break
            }
          }
        },
        deep: true
      },
    },
    methods: {
      onAddColumn(index) {
        let column = {
          name: '',
          type: '',
          length: 0,
          comment: '',
          primary: false,
          searchable: false,
          enableFormItem: true,
          formItemType: '',
          require: false,
          options: []
        }
        column.id = Math.random()
        this.table.columns.splice(index + 1, 0, column)
      },
      onDeleteColumn(index) {
        this.table.columns.splice(index, 1)
      },
      onAddPermission() {
        let permission = {
          role: '',
          operations: []
        }
        permission.id = Math.random()
        this.table.permissions.push(permission)
      },
      onDeletePermission(index) {
        this.table.permissions.splice(index, 1)
      },
      onSave() {
        this.table.form.formItems = this.table.columns.filter(it => it.enableFormItem)
          .map(it => {
            let formItem = {
              formItemClassName: it.formItemType,
              require: it.require
            }
            if (this.isOptionalFormItem(it.formItemType)) {
              formItem.options = it.options
            }
            return formItem
          })
        let newTable = JSON.parse(JSON.stringify(this.table))
        newTable.id = Math.random()
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
        if (this.table.associate === undefined) {
          this.$set(this.table, 'associate', {
            sourceColumnName: column.name,
            targetTableName: '',
            targetColumnName: '',
            formItemColumnName: '',
            associateResultColumns: []
          })
          column.formItemType = 'com.zshnb.projectgenerator.generator.entity.SelectFormItem'
        }
      },
      onChangeAssociateTable(tableName) {
        let table = this.tables.find(it => it.name === tableName)
        this.associateTableColumns = table.columns
      },
      onChangeAssociateResultColumn(originColumnName, column) {
        const camelcase = require('camelcase')
        column.aliasColumnName = camelcase(`${this.table.associate.targetTableName}_${originColumnName}`)
      },
      onEditAssociateResultColumns() {
        this.showEditAssociateResultColumns = true
      },
      onAddResultColumn() {
        this.table.associate.associateResultColumns.push({
          originColumnName: '',
          aliasColumnName: '',
          tableFieldTitle: ''
        })
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
</style>
