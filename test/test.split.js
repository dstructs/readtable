/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var split = require( './../lib/split.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'split', function tests() {

	it( 'should export a function', function test() {
		expect( split ).to.be.a( 'function' );
	});

	it( 'should split a text by the provided separator', function test() {
		var text,
			out;
		text = 'Henry,Philipp,Benjamin';
		out = split( text, ',', '"' );
		expect( out ).to.be.an( 'array' );
		assert.strictEqual( out.length, 3 );
	});

	it( 'should ignore separators within the specified quotemarks', function test() {
		var text,
			out;
		text = 'Henry,"Philipp, Duke of York",Benjamin';
		out = split( text, ',', '"' );
		expect( out ).to.be.an( 'array' );
		assert.strictEqual( out.length, 3 );

		text = 'Henry,\'Philipp, Duke of York\',Benjamin';
		out = split( text, ',', '\'' );
		expect( out ).to.be.an( 'array' );
		assert.strictEqual( out.length, 3 );
	});

});
