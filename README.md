readtable
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Reads a tabular file into a DataFrame.


## Installation

``` bash
$ npm install dstructs-readtable
```


## Usage

``` javascript
var readTable = require( 'dstructs-readtable' );
```

#### readTable( file[, options] )

Reads a tabular `file` synchronously and turns its contents into a DataFrame.

``` javascript
/*
	FILE: data.csv
		Name,Age,Slogan
		Emily,24,"I am the best"
		Bernhard,32,"How are you doing, stranger?"
		Herbert,65,"Retired guy"
		Susy,42,"Vegetarian"
*/

var out = readTable( __dirname + '/data.csv' );
// returns DataFrame with four rows and three columns
```

The function accepts the following `options`:
*	__separator__: String indicating which character is used in input file to split fields. Default: `,`.
*	__quotemark__: String indicating type of quotemarks used to denote how quotations are encoded. Default: `"`.
*	__header__: Boolean indicating whether file contains the variable names in its first line. Default: `true`.

By default, it is assumed that the columns of the first line contain the names of the variables of the data frame. If this is not the case, set the `header` option to `false`.

```javascript
/*
	FILE: data.csv
		Emily,24,"I am the best"
		Bernhard,32,"How are you doing, stranger?"
		Herbert,65,"Retired guy"
		Susy,42,"Vegetarian"
*/

var out = readTable( __dirname + '/data.csv', {
	header: false
});
// returns DataFrame with four rows and three columns
```

To specify a custom separator, use the `separator` option. If no `separator` option is specified, the function tries to infer the used encoding from the filename extension (e.g. a `tsv` file uses a tab to separate fields, `csv` files use commas).

```javascript
var out;
/*
	FILE: data.tsv
		Name	Age	Slogan
		Emily	24	"I am the best"
		Bernhard	32	"How are you doing, stranger?"
		Herbert	65	"Retired guy"
		Susy	42	"Vegetarian"
*/

// Without specifying separator:
out = readTable( __dirname + '/data.tsv' );
// returns DataFrame with four rows and three columns

// Explicitly specifying used separator:
out = readTable( __dirname + '/data.tsv', {
	'separator': '\t'
});
// returns DataFrame with four rows and three columns
```

Separators inside of quotations are escaped and not used in splitting input fields. The quotemark used to denote quotations defaults to `"`, but can be set via the `quotemark` option:

```javascript
var out;
/*
	FILE: data.csv
		Name,Age,Slogan
		Emily,24,'I am the best'
		Bernhard,32,'How are you doing, stranger?'
		Herbert,65,'Retired guy'
		Susy,42,'Vegetarian'
*/

/*
	Without specifying a custom quotemark, an error would be thrown as the third row contains more commas than the rest. However, correctly specifying the quotemark results in the last comma being escaped as it is placed inside a quotation. 
*/
out = readTable( __dirname + '/data.csv', {
	'quotemark': '\''
});
// returns DataFrame with four rows and three columns
```


#### readTable.async( file[, options][, callback] )

Reads a tabular `file` asynchronously and turns it into a DataFrame. Upon completion, the function calls the supplied `callback` function with two arguments: if an error is emitted, the first argument is an error object, otherwise it is `null`. If successful, the second argument is the resulting data frame.

``` javascript
/*
	FILE: data.csv
		Name,Age,Slogan
		Emily,24,"I am the best"
		Bernhard,32,"How are you doing, stranger?"
		Herbert,65,"Retired guy"
		Susy,42,"Vegetarian"
*/
var out = readTable( __dirname + '/data.csv', function( err, res ) {
	var df = res;
	// DataFrame with four rows and three columns
});
```

The asynchronous version accepts the same options as the synchronous version of the function. If an options object is supplied, the third argument should be the callback function.

``` javascript
/*
	FILE: data.tsv
		Name	Age	Slogan
		Emily	24	"I am the best"
		Bernhard	32	"How are you doing, stranger?"
		Herbert	65	"Retired guy"
		Susy	42	"Vegetarian"
*/
var out = readTable( __dirname + '/data.tsv', {
	'separator': '\t'
}, function( err, res ) {
	var df = res;
	// DataFrame with four rows and three columns
});
```


## Examples

``` javascript
var readTable = require( 'dstructs-readtable' ),
	out;

// With header row:
out = readTable( __dirname + '/data.csv' );

// Without header row:
out = readTable( __dirname + '/data.csv', {
	'header': false
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/readtable.svg
[npm-url]: https://npmjs.org/package/readtable

[build-image]: http://img.shields.io/travis/dstructs/readtable/master.svg
[build-url]: https://travis-ci.org/dstructs/readtable

[coverage-image]: https://img.shields.io/codecov/c/github/dstructs/readtable/master.svg
[coverage-url]: https://codecov.io/github/dstructs/readtable?branch=master

[dependencies-image]: http://img.shields.io/david/dstructs/readtable.svg
[dependencies-url]: https://david-dm.org/dstructs/readtable

[dev-dependencies-image]: http://img.shields.io/david/dev/dstructs/readtable.svg
[dev-dependencies-url]: https://david-dm.org/dev/dstructs/readtable

[github-issues-image]: http://img.shields.io/github/issues/dstructs/readtable.svg
[github-issues-url]: https://github.com/dstructs/readtable/issues
