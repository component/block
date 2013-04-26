var path = require('path')

var block = require('../')

var file = path.join(__dirname, 'template.html')

describe('Block', function () {
  it('should work with spaces', function () {
    block('<div>{{ hello }}</div>').render({
      hello: 'a'
    }).should.equal('<div>a</div>')
  })

  it('should work without spaces', function () {
    block('<div>{{hello}}</div>').render({
      hello: 'a'
    }).should.equal('<div>a</div>')
  })

  it('should work with multiple declarations of a block', function () {
    block('<div>{{hello}}</div><div>{{hello}}</div><div>{{hello}}</div>').render({
      hello: 'a'
    }).should.equal('<div>a</div><div>a</div><div>a</div>')
  })

  it('should work with multiple blocks', function () {
    block('<div>{{first}}</div><div>{{second}}</div>').render({
      first: 'a',
      second: 'b'
    }).should.equal('<div>a</div><div>b</div>')
  })

  it('should work with files', function () {
    block.read(file).render({
      first: 'a',
      second: 'b'
    }).should.equal('<div>a</div>\n<div>b</div>')
  })

  it('should work without locals', function () {
    block('<div></div>').render().should.equal('<div></div>')
  })

  it('should optionally minify files', function () {
    block.read(file, true).render({
      first: 'a',
      second: 'b'
    }).should.equal('<div>a</div><div>b</div>')
  })

  it('should not work with non-word names', function () {
    block('<div>{{hell.oh}}</div>').render({
      hello: 'a'
    }).should.equal('<div>{{hell.oh}}</div>')
  })
})