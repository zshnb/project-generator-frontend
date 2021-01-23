import objectHash from 'object-hash'
let seed = 1

function md5(object) {
  return objectHash.MD5(object + seed)
}

export {
  md5
}
