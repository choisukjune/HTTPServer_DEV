var get_Request = function(req, res, d , pathname ){
	var decodeURIComponent_Data = decodeURIComponent( req.url ).replace(/^.*\?/, '');
	var data = global.lib.querystring.parse( decodeURIComponent_Data )
	var _q = JSON.parse( data.data )

    global.CSJLog.timeStamp( "_q : " + JSON.stringify( data,null,4 ) );


	var options = {
		hostname: _q.host
		, port: _q.port
		, path: _q.path
		, method: _q.method
		//, headers: {
		//   'Content-Type': 'application/x-www-form-urlencoded',
		//   //'Content-Length': Buffer.byteLength(postData)
		// }
		// , data : {
		//   a : "a",
		//   b : "b"
		// }
	};

	global.util.request_GET( options, _q.characterSet ,function(data){
	global.util.response.res_200_ok_String( req, res, data )
	});
}

module.exports = get_Request;
