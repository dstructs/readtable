/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	readtable = require( './../lib/async.js' ),
	DataFrame = require( 'compute-data-frame' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'readTableAsync', function tests() {

	it( 'should export a function', function test() {
		expect( readtable ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is not a string', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				readtable( value );
			};
		}
	});

	it( 'should throw an error if function is invoked without arguments', function test() {
		expect( badValue() ).to.throw( Error );
		function badValue() {
			return function() {
				readtable();
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				readtable( __dirname + '/fixtures/data.csv', {
					'quotemark': value
				});
			};
		}
	});

	it( 'should throw if second argument is neither callback function nor options object', function test() {
		var values = [
			'a',
			5,
			true,
			undefined,
			null,
			NaN,
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				readtable( __dirname + '/fixtures/data.csv', value );
			};
		}
	});

	it( 'should throw if callback argument is not a function', function test() {
		var values = [
			'a',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				readtable( __dirname + '/fixtures/data.csv', {}, value );
			};
		}
	});

	it( 'should asynchronously read a tabular file into a DataFrame', function test() {
		// With supplied callback:
		readtable( __dirname + '/fixtures/data.csv', function done( err, df ) {
			expect( df ).to.be.an.instanceOf( DataFrame );
		});
		// Without using the results:
		readtable( __dirname + '/fixtures/data.csv' );
	});

	it( 'should asynchronously read a tabular file without a header into a DataFrame', function test() {
		readtable( __dirname + '/fixtures/headerless.csv', {
			'header': false
		}, function done( err, df ) {
			expect( df ).to.be.an.instanceOf( DataFrame );
		});
	});

	it( 'should asynchronously read a tabular file with a custom separator into a DataFrame', function test() {
		// Custom option:
		readtable( __dirname + '/fixtures/data.tsv', {
			'separator': '\t'
		}, function done( err, df ) {
			expect( df ).to.be.an.instanceOf( DataFrame );
		});

		// Inferred from file extension:
		readtable( __dirname + '/fixtures/data.tsv', function done( err, df ) {
			expect( df ).to.be.an.instanceOf( DataFrame );
		});
	});

	it( 'should asynchronously read a tabular file into a DataFrame when a custom quotemark is used', function test() {
		readtable( __dirname + '/fixtures/customQuotemark.csv', {
			'quotemark': '\''
		}, function done( err, df ) {
			expect( df ).to.be.an.instanceOf( DataFrame );
		});
	});

	it( 'should emit an error if lines in the input file have differing number of columns', function test() {
		readtable( __dirname + '/fixtures/corrupted.csv', function done( err ) {
			assert.ifError( err );
		});
	});

});
