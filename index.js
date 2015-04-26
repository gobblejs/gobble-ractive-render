var path = require( 'path' );
var requireRelative = require( 'require-relative' );
var sander = require( 'sander' );
var rcu = require( 'rcu' );
var toCjs = require( 'rcu-builders' ).cjs;

var Promise = sander.Promise;

rcu.init( require( 'ractive' ) );

module.exports = function ractiveRender ( inputdir, outputdir, options, done ) {
	if ( !options.component ) {
		throw new Error( 'You must supply a `component` option' );
	}

	var base = path.join( inputdir, options.component );

	function load ( filename, callback ) {
		sander.readFile( filename )
			.then( String )
			.then( function ( definition ) {
				rcu.make( definition, {
					url: filename,
					require: function ( mod ) {
						return requireRelative( mod, path.dirname( filename ) );
					},
					loadImport: function ( name, path, parentUrl, done ) {
						load( rcu.resolve( path, parentUrl ), done );
					}
				}, callback );
			})
			.catch( done );
	}

	load( base, function ( Component ) {
		var promises = Object.keys( options.files ).map( function ( filename ) {
			var data = options.files[ filename ];
			var rendered = new Component({ data: data }).toHTML();

			return sander.writeFile( outputdir, filename, rendered );
		});

		Promise.all( promises ).then( function () {
			done();
		}, done );
	});
};