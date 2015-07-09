var postcss = require('postcss');
var tape = require('tape');
var plugin = require('../');

function test(desc, input, output, opts) {
  tape(desc, function (t) {
    t.plan(2);
    postcss([ plugin(opts) ]).process(input).then(function (result) {
      t.equal(result.css, output, 'actual output matches expected');
      t.equal(result.warnings().length, 0, 'no warnings');
      t.end();
    }).catch(function () {
      t.skip('not reached');
    });
  });
}

test('ignores non-shorthand declarations',
  'a{ color:red; }',
  'a{ color:red; }',
  {modules: ['foo']}
);

test('converts to shorthand',
  'a{ blah: q;foo:a b c; }',
  'a{ blah: q;composes: a b c from "foo"; }',
  {modules: ['foo']}
);

test('converts to shorthand with advanced options',
  'a{ blah: q;bar:a b c; }',
  'a{ blah: q;composes: a b c from "baz"; }',
  {modules: [{shorthand: 'bar', name:'baz'}]}
);

test('converts to shorthand with multiple shorthands in options',
  'a{ blah: q;bar:a b c; hi: y z; }',
  'a{ blah: q;composes: a b c from "bar"; composes: y z from "hello"; }',
  {modules: ['bar', {shorthand: 'hi', name:'hello'}]}
);
