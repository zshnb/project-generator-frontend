function getDefaultOperations() {
  return [
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

function generateDefaultColumns() {
  return [
    {
      name: 'id',
      type: 'int',
      length: 11,
      comment: '',
      primary: true,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: '',
      options: [],
      mappings: [],
      enableAssociate: false
    }, {
      name: 'create_at',
      type: 'datetime',
      length: 0,
      comment: '',
      primary: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: '',
      options: [],
      mappings: [],
      enableAssociate: false
    }, {
      name: 'update_at',
      type: 'datetime',
      length: 0,
      comment: '',
      primary: false,
      searchable: false,
      enableFormItem: false,
      enableTableField: false,
      formItemType: '',
      options: [],
      mappings: [],
      enableAssociate: false
    }
  ]
}

export {
  generateDefaultColumns,
  getDefaultOperations
}
