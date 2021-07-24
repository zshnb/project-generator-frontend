function getDefaultMenus(entity) {
  let menus = [
    {
      name: `浏览${entity.comment}`,
      method: `list_${entity.name}()`
    }
  ]
  if (entity.fileOperation) {
    menus.push({
      name: `保存${entity.comment}`,
      method: `save_${entity.name}_to_file()`
    })
    menus.push({
      name: `加载${entity.comment}`,
      method: `load_${entity.name}_from_file()`
    })
  }
  return menus
}
function getField() {
  return {
    id: Math.random(),
    name: '',
    type: '',
    comment: '',
    searchable: false
  }
}

export {
  getField,
  getDefaultMenus
}
