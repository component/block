var path = require('path')

var block = require('../')

var file = path.join(__dirname, 'template.html')

describe('Block', function () {
  it('should work with spaces', function (done) {
    block('<div>{{ hello }}</div>').render({
      hello: 'a'
    }).should.equal('<div>a</div>')

    done()
  })

  it('should work without spaces', function (done) {
    block('<div>{{hello}}</div>').render({
      hello: 'a'
    }).should.equal('<div>a</div>')

    done()
  })

  it('should not work with non-word names', function (done) {
    block('<div>{{hell.oh}}</div>').render({
      hello: 'a'
    }).should.equal('<div>{{hell.oh}}</div>')

    done()
  })

  it('should work with multiple blocks', function (done) {
    block('<div>{{first}}</div><div>{{second}}</div>').render({
      first: 'a',
      second: 'b'
    }).should.equal('<div>a</div><div>b</div>')

    done()
  })

  it('should work with files', function (done) {
    block.read(file).render({
      first: 'a',
      second: 'b'
    }).should.equal('<div>a</div>\n<div>b</div>')

    done()
  })

  it('should optionally minify files', function (done) {
    block.read(file, true).render({
      first: 'a',
      second: 'b'
    }).should.equal('<div>a</div><div>b</div>')

    done()
  })
})