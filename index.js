var regex = /(\{\{\s*\w+\s*\}\})/

module.exports = Block

function Block(string) {
  if (!(this instanceof Block))
    return new Block(string)

  var blocks = this.blocks = string.split(regex)
  var names = this.names = {}

  var block

  for (var i = 0, l = blocks.length; i < l; i++)
    if (regex.test(block = blocks[i]))
      names[i] = block.match(/(\w+)/)[0]
}

Block.prototype.local = function (name, value) {
  var names = this.names
  var j

  for (var i in names)
    if (names[i] === name && names.hasOwnProperty(i))
      j = i

  if (j == null)
    throw new Error('Name ' + name + ' is not defined.')

  delete names[j]
  this.blocks[j] = value || ''

  return this
}

Block.prototype.locals = function (object) {
  for (var name in object)
    if (object.hasOwnProperty(name))
      this.local(name, object[name])

  return this
}

Block.prototype.render = function (locals) {
  locals = locals || {}

  var blocks = this.blocks
  var names = this.names

  var html = ''
  var name

  for (var i = 0, l = blocks.length; i < l; i++)
    html += (name = names[i]) ? locals[name] : blocks[i]

  return html
}

// Node only!
try {
  var fs = require('fs')

  Block.read = function (filename, minify) {
    var string = fs.readFileSync(filename, 'utf8')
    return new Block(minify ? string.replace(/\n\s*/g, '') : string)
  }
} catch (err) {}
