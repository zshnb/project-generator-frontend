import { frameItemClassNames } from "../Constant";

function generateDefaultColumns() {
  return [
    {
      name: 'id',
      type: 'int',
      comment: 'id主键',
      length: 0,
      primary: true,
      repeatable: true,
      require: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: frameItemClassNames.textFieldFrameItem,
      enableAssociate: false
    }, {
      name: 'create_at',
      type: 'datetime',
      comment: '创建时间',
      length: 0,
      primary: false,
      repeatable: true,
      require: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: frameItemClassNames.textFieldFrameItem,
      enableAssociate: false
    }, {
      name: 'update_at',
      type: 'datetime',
      comment: '更新时间',
      length: 0,
      primary: false,
      repeatable: true,
      require: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: frameItemClassNames.textFieldFrameItem,
      enableAssociate: false
    }
  ]
}

function getDefaultOperations() {
  return [
    {
      description: '添加',
      value: 'add'
    },
    {
      description: '编辑',
      value: 'edit'
    },
    {
      description: '删除',
      value: 'delete'
    }
  ]
}

function getColumn() {
  return {
    id: Math.random(),
    name: '',
    type: 'varchar',
    comment: '',
    length: 255,
    primary: false,
    nullable: true,
    repeatable: true,
    searchable: false,
    enableFormItem: true,
    enableTableField: true,
    formItemType: frameItemClassNames.textFieldFrameItem,
    require: false,
    options: [],
    associate: {
      targetTableName: '',
      targetColumnName: '',
      formItemColumnName: '',
      associateResultColumns: []
    }
  }
}

export {
  generateDefaultColumns,
  getColumn,
  getDefaultOperations
}
