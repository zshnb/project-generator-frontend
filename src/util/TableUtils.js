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
      formItemType: '',
      options: [],
      mappings: [],
      enableAssociate: false
    }
  ]
}

export {
  generateDefaultColumns
}
