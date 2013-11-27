var block = require('./')

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

  it('should work with template locals', function () {
    block('<div>{{first}}</div>').local('first', 'a')
    .render().should.equal('<div>a</div>')
  })

  it('should work with template locals object', function () {
    block('<div>{{first}}</div>').locals({
      first: 'a'
    }).render().should.equal('<div>a</div>')
  })

  it('should work without locals', function () {
    block('<div></div>').render().should.equal('<div></div>')
  })

  it('should default to the empty string', function () {
    block('<div>{{hello}}</div>').render({
      hello: false
    }).should.equal('<div></div>')
  })

  it('should work with non-word names', function () {
    block('<div>{{hell.oh}}</div>').render({
      'hell.oh': 'a'
    }).should.equal('<div>a</div>')
  })
})