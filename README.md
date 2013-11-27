# Block.js [![Build Status](https://travis-ci.org/funraiseme/block.png)](https://travis-ci.org/funraiseme/block)

Ridiculously simple HTML templating. All it does is replaces "blocks" in your template with a local.

```html
<div class="container">
  {{content}}
</div>
```

```js
block(html).render({
  content: '<div class="inner"></div>'
})
```

yields:

```html
<div class="container">
  <div class="inner"></div>
</div>
```

That's it. HTML templating doesn't have to be any harder.

## API

### Block(html)

```js
var block = require('block')

var template = block('<div class="container">{{content}}</div>')
```

`html` is a string, and `block` returns a new templating instance.

### template.render(locals)

`locals` is an object of "blocks" to replace in the template.

```js
template.render({
  content: '<a href="#">click me</a>'
}) === '<div class="container"><a href="#">click me</a></div>'
```

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.