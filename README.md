# Block.js

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

### Block.read(file, minify)

This is for nodejs only. `file` is the name of the file, `minify` strips whitespace.

```js
var template = block.read(__dirname + '/template.html')
template.render({
  content: ''
})
```

All `minfy` does, if `true`, is `block = block.replace(/\n\s*/, '')`.

## License

WTFPL