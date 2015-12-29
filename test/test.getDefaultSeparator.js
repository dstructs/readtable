/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var getDefaultSeparator = require( './../lib/getDefaultSeparator.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'getDefaultSeparator', function tests() {

	it( 'should export a function', function test() {
		expect( getDefaultSeparator ).to.be.a( 'function' );
	});

	it( 'should return "," for *.csv files', function test() {
		var ext = getDefaultSeparator( __dirname + '/fixtures/data.csv' );
		assert.strictEqual( ext, ',' );
	});


	it( 'should return "\t" for *.tsv files', function test() {
		var ext = getDefaultSeparator( __dirname + '/fixtures/data.tsv' );
		assert.strictEqual( ext, '\t' );
	});

	it( 'should return " " for *.wsv files', function test() {
		var ext = getDefaultSeparator( __dirname + '/fixtures/data.wsv' );
		assert.strictEqual( ext, ' ' );
	});

});
