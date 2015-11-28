'use strict';

// MODULES //

var DataFrame = require( 'compute-data-frame' ),
	fs = require( 'fs' ),
	isString = require( 'validate.io-string-primitive' );


// FUNCTIONS //

var getDefaultSeparator = require( './getDefaultSeparator.js' ),
	split = require( './split.js' ),
	validate = require( './validate.js' );


// READ TABLE //

/**
* FUNCTION: readTableSync( file[, opts] )
*    Reads a tabular file synchronously and turns it into a DataFrame.
*
* @param {String} file - name of the file
* @param {Object} [opts] - options object
* @param {String} [opts.separator] - string indicating which character is used in input file to split fields
* @param {String} [opts.quotemark='"'] - indicates which quotemarks are used to denote how quotations are encoded
* @param {Boolean} [opts.header=true] - boolean indicating whether file contains the variable names in first line.
* @returns {DataFrame} data frame holding the tabular input data
*/
function readTableSync( file, options ) {
	var arr,
		rows = [],
		opts = {},
		err,
		df,
		dfOptions = {},
		fileContents,
		lines,
		nRows = 0,
		nCols,
		i,
		separator,
		quotemark,
		header;
	if ( !isString( file ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + file + '`' );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	// Set default options if not specified...
	header = typeof opts.header !== 'undefined' ? opts.header : true;
	separator = typeof opts.separator !== 'undefined' ? opts.separator : getDefaultSeparator( file );
	quotemark = typeof opts.quotemark !== 'undefined' ? opts.quotemark : '"';

	fileContents = fs.readFileSync( file );
	lines = fileContents.toString().split( '\n' );
	nRows = lines.length;
	arr = split( lines[ 0 ], separator, quotemark );
	// Infer the number of columns on first line:
	nCols = arr.length;
	if ( header === true ) {
		// Set column names:
		dfOptions.colnames = arr;
	} else {
		rows.push( arr );
	}
	for ( i = 1; i < nRows; i++ ) {
		arr = split( lines[ i ], separator, quotemark );
		// Only do something when line is not empty...
		if ( arr.length > 1 ) {
			// Throw an error if the number of columns does not match:
			if ( arr.length !== nCols ) {
				throw new Error( 'Lines in input file have differing number of columns.' );
			}
			rows.push( arr );
		}
	}
	df = new DataFrame( rows, dfOptions );
	return df;
} // end FUNCTION readTableSync()


// EXPORTS //

module.exports = readTableSync;
