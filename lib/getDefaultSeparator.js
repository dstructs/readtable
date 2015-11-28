'use strict';

// MODULES //

var path = require( 'path' );


/**
* FUNCTION: getDefaultSeparator( file )
*	Retrieves the default field separator for the data type of the given file.
*
* @param {String} file - input file
* @returns {String} default separator
*/
function getDefaultSeparator( file ) {
	switch( path.extname( file ) ) {
	case '.tsv':
		return '\t';
	case '.csv':
		return ',';
	case '.wsv':
		return ' ';
	}
} // end FUNCTION getDefaultSeparator()


// EXPORTS //

module.exports = getDefaultSeparator;
