var regex = /(\{\{\s*\w+\s*\}\})/

module.exports = Block

function Block(string) {
  if (!(this instanceof Block))
    return new Block(string)

  var blocks = this.blocks = string.split(regex)
  var names = this.names = {}

  for (var i = 0, l = blocks.length; i < l; i++) {
    var block = blocks[i]
    if (regex.test(block)) {
      names[i] = block.match(/(\w+)/)[0]
      blocks[i] = null
    }
  }
}

Block.prototype.render = function (locals) {
  var blocks = this.blocks
  var names = this.names
  var l = blocks.length
  var buf = new Array(l)

  var name

  for (var i = 0; i < l; i++)
    buf[i] = (name = names[i]) ? locals[name] : blocks[i]

  return buf.join('')
}

// Node only!
try {
  var fs = require('fs')

  Block.read = function (filename, minify) {
    var string = fs.readFileSync(filename, 'utf8')
    if (minify)
      string = string.replace(/\n\s*/g, '')

    return new Block(string)
  }
} catch (err) {}