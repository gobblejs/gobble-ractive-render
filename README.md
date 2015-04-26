# gobble-ractive-render

Render static pages from Ractive components

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-ractive-render
```

## Usage

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'src/components' ).transform( 'ractive-render', {
  // name of a component file inside src/components
  component: 'Page.html',

  // files to generate - for each one, the component
  // will be instantiated with the associated data,
  // and rendered to HTML
  files: {
    'foo.html': fooData,
    'bar.html': barData,
    'baz.html': bazData
  }
});
```

For more information about component files see https://github.com/ractivejs/component-spec/.


## License

MIT. Copyright 2015 Rich Harris
