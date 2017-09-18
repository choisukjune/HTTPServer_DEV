var MongoClient = require('mongodb').MongoClient
var fs = require( 'fs' );

// var db = new Db('admin', new Server("127.0.0.1", 59320,
//  {auto_reconnect: false, poolSize: 4}), {w:0, native_parser: false});

// // Establish connection to db
// db.open(function(err, db) {
// //  assert.equal(null, err);


//     // Authenticate
//     db.authenticate('Ttw', 'thdtjsdncjswoQWEASDZXC', function(err, result) {
//       assert.equal(true, result);

//       db.close();
//     });
// });

var get_Request = function(req, res, d , pathname ){
	// var decodeURIComponent_Data = decodeURIComponent( req.url ).replace(/^.*\?/, '');
	// var data = global.lib.querystring.parse( decodeURIComponent_Data )
	// var _q = JSON.parse( data.data )
	//
	// global.CSJLog.timeStamp( "[ " + global.log.dateTime() + " ] -- " + "_q : " + JSON.stringify( data,null,4 ) )
	//
	// var options = {
	// 	hostname: _q.host
	// 	, port: _q.port
	// 	, path: _q.path
	// 	, method: _q.method
	// 	//, headers: {
	// 	//   'Content-Type': 'application/x-www-form-urlencoded',
	// 	//   //'Content-Length': Buffer.byteLength(postData)
	// 	// }
	// 	// , data : {
	// 	//   a : "a",
	// 	//   b : "b"
	// 	// }
	// };
	//
	// global.util.request_GET( options, _q.characterSet ,function(data){
	//global.util.response.res_200_ok_String( req, res, childProcess_spawnSync() )
	//});



// Connection URL
var url = 'mongodb://Ttw:thdtjsdncjswoQWEASDZXC@localhost:59320/admin';
global.CSJLog.timeStamp( url )
var a = fs.readFileSync('D:/test1.js','utf8');
global.CSJLog.timeStamp( a );
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  //assert.equal(null, err);
  global.CSJLog.timeStamp("Connected successfully to server");
  var secondDb = db.db("product");
 secondDb.collection("product_basic").find().toArray(function(err, docs) {
	//db.eval('function(){ '+ a +'}', [3], {nolock:true}, function(err, docs) {
//global.CSJLog.timeStamp( docs );
	// docs.forEach(function(d){
	// 	global.CSJLog.timeStamp( d )
	// })

	global.util.response.res_200_ok_String( req, res, JSON.stringify( docs,null,4 ) )
    db.close();
    });
});

}



module.exports = get_Request;
