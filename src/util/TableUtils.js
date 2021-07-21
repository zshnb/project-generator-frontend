function getDefaultOperations() {
  return [
    {
      description: '添加',
      value: 'add',
      position: 'toolbar',
      type: 'NEW_PAGE'
    },
    {
      description: '编辑',
      value: 'edit',
      position: 'toolColumn',
      type: 'NEW_PAGE'
    },
    {
      description: '查看',
      value: 'detail',
      position: 'toolColumn',
      type: 'NEW_PAGE'
    },
    {
      description: '删除',
      value: 'delete',
      position: 'toolColumn',
      type: 'NEW_PAGE'
    }
  ]
}

function generateDefaultColumns() {
  return [
    {
      name: 'id',
      type: 'int',
      comment: 'id主键',
      length: 11,
      label: 'ID',
      title: 'ID',
      primary: true,
      repeatable: true,
      require: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: 'com.zshnb.projectgenerator.generator.entity.InputFormItem',
      enableAssociate: false
    }, {
      name: 'create_at',
      type: 'datetime',
      comment: '创建时间',
      length: 0,
      label: '创建时间',
      title: '创建时间',
      primary: false,
      repeatable: true,
      require: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: 'com.zshnb.projectgenerator.generator.entity.DateTimeFormItem',
      enableAssociate: false
    }, {
      name: 'update_at',
      type: 'datetime',
      comment: '更新时间',
      length: 0,
      label: '更新时间',
      title: '更新时间',
      primary: false,
      repeatable: true,
      require: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: 'com.zshnb.projectgenerator.generator.entity.DateTimeFormItem',
      enableAssociate: false
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
    label: '',
    title: '',
    primary: false,
    nullable: true,
    repeatable: true,
    searchable: false,
    enableFormItem: true,
    enableTableField: true,
    formItemType: 'com.zshnb.projectgenerator.generator.entity.InputFormItem',
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
}

export {
  generateDefaultColumns,
  getDefaultOperations,
  getColumn
}
