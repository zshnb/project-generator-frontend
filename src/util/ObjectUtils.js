function clear(object) {
  for (let key in object) {
    if (typeof object[key] === 'string') {
      object[key] = ''
    } else if (typeof object[key] === 'number') {
      object[key] = 0
    } else if (typeof object[key] === 'object') {
      clear(object[key])
    }
  }
}

export {
  clear
}
