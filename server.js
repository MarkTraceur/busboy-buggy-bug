var server,
	express = require( 'express' ),
	Busboy = require( 'busboy' ),
	app = express();

app.set( 'views', './templates' );
app.set( 'view engine', 'jade' );

app.get( '/', function ( req, res ) {
	res.render( 'index', {} );
} );

app.post( '/', function ( req, res ) {
	var infile, filename,
		busboy = new Busboy( { headers: req.headers } );

	busboy.on( 'finish', function () {
		console.log( 'busboy finished' );
		infile.pipe( res );
	} );

	busboy.on( 'file', function ( fieldname, file, filename ) {
		console.log( 'Got file: ' + filename );
		infile = file;
	} );

	busboy.on( 'field', function ( fieldname, val ) {
		console.log( 'Got filename: ' + val );
		filename = val;
	} );

	req.pipe( busboy );
} );

server = app.listen( 2777, function () {
	console.log( 'Listening on port %d', server.address().port );
} );
