'use strict';

var readTable = require( './../lib' ),
	out;

// With header row:
out = readTable( __dirname + '/data.csv' );
console.log( out );

// Without header row:
out = readTable( __dirname + '/data.csv', {
	'header': false
});
console.log( out );
