# PostCSS Composes Shorthand [![Build Status][ci-img]][ci]

[PostCSS] plugin adds shorthand for composing classes from modules. Works in conjunction with [css-modules].

[PostCSS]: https://github.com/postcss/postcss
[css-modules]: https://github.com/css-modules/css-modules
[ci-img]:  https://travis-ci.org/rtsao/postcss-composes-shorthand.svg
[ci]:      https://travis-ci.org/rtsao/postcss-composes-shorthand

## Usage

```js
postcss([ require('postcss-composes-shorthand')(['bar', {shorthand: 'hi', name: 'hello'}]) ])
```
##### Input CSS
```css
.foo {
  bar: a b c;
  hi: y z;
}
```
##### Output CSS
```css
.foo {
  composes: a b c from "bar";
  composes: y z from "hello";
}
```

See [PostCSS] docs for examples for your environment.
