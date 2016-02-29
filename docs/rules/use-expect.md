# Ensure that `expect` is used when an assertion is called inside of a block

QUnit's `assert.expect(...)` helps developers create tests that correctly fail
when their expected number of assertions are not called. QUnit will throw an
error if no assertions are called by the time the test ends. This rule goes
further and ensures that `expect` is used anytime a developer uses are assertion
that is nested in a block or used in a callback.

# Rule Details

The following patterns are considered warnings:

```js
test('name', function(assert) {
  assert.ok(true);
  while (false) {
    assert.ok(true);
  }
});

test('name', function(assert) {
  assert.ok(true);
  maybeCallback(function() {
    assert.ok(true);
  });
});

test('name', function(assert) {
  assert.ok(true);
  var callback = function() {
    assert.ok(true);
  }
  callback();
});

test('name', function(assert) {
  assert.ok(true);
  maybeCallback(function() {
    assert.expect(2); // Must be called in the top test function.
    assert.ok(true);
  });
});
```

The following patterns are not considered warnings:

```js
test('name', function(assert) {
  assert.expect(2);

  if (true) {
    assert.ok(true);
    callMeBack(function() {
      assert.ok(true);
    });
  }
});

```

# When Not to Use It

If your tests have some logic that relies on an unpredictable number of
assertions you should not use this rule.

## Further Reading

* [QUnit's Assertions](https://api.qunitjs.com/category/assert/)
