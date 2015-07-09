# PostCSS Composes Shorthand [![Build Status][ci-img]][ci]

[PostCSS] plugin adds shorthand for composing classes from modules.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/rtsao/postcss-composes-shorthand.svg
[ci]:      https://travis-ci.org/rtsao/postcss-composes-shorthand

## Usage

```js
postcss([ require('postcss-composes-shorthand')(['bar']) ])
```
##### Input CSS
```css
.foo {
  bar: a b c;
}
```
##### Output CSS
```css
.foo {
  composes: a b c from "bar";
}
```

See [PostCSS] docs for examples for your environment.
