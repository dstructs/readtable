'use strict';

/**
* FUNCTION: split( text, separator, quotemark )
*	Splits an input string by the provided separator.
*
* @param {String} text - input string
* @param {String} separator - separator to split fields on
* @param {String} quotemark - character used to denote escaped content
* @returns {Array} array of individual fields
*/
function split( text, separator, quotemark ) {
	var len = text.length,
		current = '',
		inquote = false,
		res = [],
		i;
	for ( i = 0; i < len; i++ ) {
		if ( text[ i ] === quotemark ) {
			inquote = !inquote;
		}
		if ( !inquote ) {
			// Not inside quoted text:
			if ( text[ i ] === separator ) {
				res.push( current );
				current = '';
			} else {
				current += text[ i ];
			}
		} else {
			// Inside quoted text:
			current += text[ i ];
		}
	}
	res.push( current );
	return res;
} // end FUNCTION split()


// EXPORTS //

module.exports = split;
