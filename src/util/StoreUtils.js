function saveRole(state, payload) {
  let role = payload.role
  let overwrite = payload.overwrite
  if (!overwrite) {
    state.roles.push(role)
  } else {
    let index = state.roles.findIndex(it => it.name === role.name)
    state.roles.splice(index, 1, role)
  }
  let table = state.tables.find(t => t.name === 'user')
  if (table !== undefined) {
    let roleColumnIndex = table.columns.findIndex(c => c.name === 'role')
    let options = state.roles.map(r => {
      return {
        title: r.description,
        value: r.name
      }
    })
    table.columns[roleColumnIndex].options = options
    if (table.form !== undefined) {
      table.form.items[roleColumnIndex].options = options
    }
  }
}

export {
  saveRole
}
