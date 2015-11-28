'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {String} [options.separator] - string indicating which character is used in input file to split fields
* @param {String} [options.quotemark] - indicates which quotemarks are used to denote how quotations are encoded
* @param {Boolean} [options.header] - boolean indicating whether file contains the variable names in first line.
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'header' ) ) {
		opts.header = options.header;
		if ( !isBoolean( opts.header ) ) {
			return new TypeError( 'invalid option. Header option must be a boolean primitive. Option: `' + opts.header + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'separator' ) ) {
		opts.separator = options.separator;
		if ( !isString( opts.separator ) ) {
			return new TypeError( 'invalid option. Separator option must be a string primitive. Option: `' + opts.separator + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'quotemark' ) ) {
		opts.quotemark = options.quotemark;
		if ( !isString( opts.quotemark ) ) {
			return new TypeError( 'invalid option. Quotemark option must be a string primitive. Option: `' + opts.quotemark + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
