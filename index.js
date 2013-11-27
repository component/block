module.exports = Block

function Block(string) {
  if (!(this instanceof Block))
    return new Block(string)

  this.string = string
}

Block.prototype.locals =
Block.prototype.local = function (name, value) {
  if (typeof name === 'object')
    Object.keys(name).forEach(function (key) {
      this.replace(key, name[key])
    }, this)
  else
    this.replace(name, value)

  return this
}

Block.prototype.replace = function (key, value) {
  this.string = replace(this.string, key, value)

  return this
}

Block.prototype.render = function (locals) {
  if (!locals)
    return this.string

  var string = this.string
  Object.keys(locals).forEach(function (key) {
    string = replace(string, key, locals[key])
  })
  return string
}

function replace(string, key, value) {
  return string.replace(
    new RegExp('\\{\\{\\s*' + escapeRegExp(key) + '\\s*\\}\\}', 'g'),
    value || ''
  )
}

function escapeRegExp(str) {
  return str.replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1')
}