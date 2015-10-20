var server,
	express = require( 'express' ),
	busboy = require( 'connect-busboy' ),
	app = express();

app.set( 'views', './templates' );
app.set( 'view engine', 'jade' );

app.use( busboy() );

app.get( '/', function ( req, res ) {
	res.render( 'index', {} );
} );

app.post( '/', function ( req, res ) {
	var infile, filename;

	req.busboy.on( 'finish', function () {
		console.log( 'busboy finished' );
		infile.pipe( res );
	} );

	req.busboy.on( 'file', function ( fieldname, file, filename ) {
		console.log( 'Got file: ' + filename );
		infile = file;
	} );

	req.busboy.on( 'field', function ( fieldname, val ) {
		console.log( 'Got filename: ' + val );
		filename = val;
	} );

	req.pipe( req.busboy );
} );

server = app.listen( 2777, function () {
	console.log( 'Listening on port %d', server.address().port );
} );
