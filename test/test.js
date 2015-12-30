/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	readtable = require( './../lib' ),
	DataFrame = require( 'compute-data-frame' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'readTableSync', function tests() {

	it( 'should export a function', function test() {
		expect( readtable ).to.be.a( 'function' );
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

	it( 'should synchronously read a tabular file into a DataFrame', function test() {
		var df = readtable( __dirname + '/fixtures/data.csv' );
		expect( df ).to.be.an.instanceOf( DataFrame );
	});

	it( 'should synchronously read a tabular file without a header into a DataFrame', function test() {
		var df = readtable( __dirname + '/fixtures/headerless.csv', {
			'header': false
		});
		expect( df ).to.be.an.instanceOf( DataFrame );
	});

	it( 'should synchronously read a tabular file with a custom separator into a DataFrame', function test() {
		var df;

		// Custom option:
		df = readtable( __dirname + '/fixtures/data.tsv', {
			'separator': '\t'
		});
		expect( df ).to.be.an.instanceOf( DataFrame );

		// Inferred from file extension:
		df = readtable( __dirname + '/fixtures/data.tsv' );
		expect( df ).to.be.an.instanceOf( DataFrame );
	});

	it( 'should synchronously read a tabular file into a DataFrame when a custom quotemark is used', function test() {
		var df = readtable( __dirname + '/fixtures/customQuotemark.csv', {
			'quotemark': '\''
		});
		expect( df ).to.be.an.instanceOf( DataFrame );
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

	it( 'should throw an error if lines in the input file have differing number of columns', function test() {
		expect( badValue() ).to.throw( Error );
		function badValue() {
			return function() {
				readtable( __dirname + '/fixtures/corrupted.csv' );
			};
		}
	});

});
