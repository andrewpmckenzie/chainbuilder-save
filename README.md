# chainbuilder-save [![Build Status](https://travis-ci.org/andrewpmckenzie/chainbuilder-save.svg)](https://travis-ci.org/andrewpmckenzie/chainbuilder-save)

A [chainbuilder](https://www.npmjs.com/package/chainbuilder) mixin for saving values for re-injection later in the chain. 

**Installation** `npm install chainbuilder chainbuilder-save --save`

**Usage**  
```javascript
var chainBuilder = require('chainbuilder');

var myChain = chainBuilder({
  methods: {/* ... your methods ... */},
  mixins: [
    /* ... other mixins ... */
    require('chainbuilder-save')()
  ]
});
```

**Example**  

```javascript
myChain(2)
  .plus(1)
  .save('var1')           // Saves 3 to 'var1'
  .plus(5)
  .save('var2')           // Save 8 to 'var2'
  .injectSaved('var1')    // Value in the chain is now 3
  .plus(1)
  .end(function (err, result) {
    console.log(result);                // > 4
    console.log(this.getSaved('var1')); // > 3
    console.log(this.getSaved('var2')); // > 8
  });
```

## Methods

#### save(varName)
Save the result of the previous call.

**`@param {String} varName`** a name for the variable (re-using a name will override the value).

#### injectSaved(varName)
Inject the saved value back into the chain.

**`@param {String} varName`** name of the variable to restore.

#### this.getSaved(varName) _context method_
Access a saved value from within a chainbuilder context (e.g. a `tap`, `transform` or `end` callback).

**`@param {String} varName`** name of the variable to get.
