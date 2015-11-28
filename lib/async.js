'use strict';

// MODULES //

var DataFrame = require( 'compute-data-frame' ),
	fs = require( 'fs' ),
	readline = require( 'readline' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' ),
	noop = require( '@kgryte/noop' );


// FUNCTIONS //

var getDefaultSeparator = require( './getDefaultSeparator.js' ),
	split = require( './split.js' ),
	validate = require( './validate.js' );


// READ TABLE //

/**
* FUNCTION: readTable( file[, opts], callback )
*    Reads a tabular file and turns it into a DataFrame asynchronously.
*
* @param {String} file - name of the file
* @param {Object} [opts] - options object
* @param {String} [opts.separator] - string indicating which character is used in input file to split fields
* @param {String} [opts.quotemark='"'] - indicates which quotemarks are used to denote how quotations are encoded
* @param {Boolean} [opts.header=true] - boolean indicating whether file contains the variable names in first line.
* @param {Function} [clbk] - callback function
* @returns {Void} upon completion, the supplied callback function is invoked with `err` and `df` arguments
*/
function readTable( file, options, clbk ) {
	var arr,
		rows = [],
		opts = {},
		err,
		dfOptions = {},
		done = noop,
		rd,
		nRows = 0,
		nCols,
		separator,
		quotemark,
		header;
	if ( !isString( file ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + file + '`' );
	}
	if ( arguments.length === 2 ) {
		done = options;
	} else if ( arguments.length >= 3 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
		done = clbk;
		if ( !isFunction( done ) ) {
			throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + done + '`.' );
		}
	}

	// Set default options if not specified...
	header = typeof opts.header !== 'undefined' ? opts.header : true;
	separator = typeof opts.separator !== 'undefined' ? opts.separator : getDefaultSeparator( file );
	quotemark = typeof opts.quotemark !== 'undefined' ? opts.quotemark : '"';

	rd = readline.createInterface({
		input: fs.createReadStream( file ),
		terminal: false
	});
	rd.on( 'line', function onLine( line ) {
		nRows++;
		arr = split( line, separator, quotemark );
		// Infer the number of columns on first line:
		if ( !nCols ) {
			nCols = arr.length;
			if ( header === true ) {
				// Set column names:
				dfOptions.colnames = arr;
			} else {
				rows.push( arr );
			}
		} else {
			// Throw an error if the number of columns does not match:
			if ( arr.length !== nCols ) {
				throw new Error( 'Lines in input file have differing number of columns.' );
			}
			rows.push( arr );
		}
	});
	rd.on( 'close', function onClose() {
		var df = new DataFrame( rows, dfOptions );
		done( null, df );
	});
} // end FUNCTION readTable()


// EXPORTS //

module.exports = readTable;
