
global._storage = {};

var offset_id = 0;

var file_stream_write = function( get_params, offset ){
	var buffer = global._storage[ _storage_key ].binary[ offset ]

	global.CSJLog.timeStamp( global._storage[ _storage_key ].binary.hasOwnProperty( offset ) )

	if( global._storage[ _storage_key ].binary.hasOwnProperty( offset ) )
	{
		global._storage[ _storage_key ].ws.write( buffer )
		global.CSJLog.timeStamp( offset + "---- write_complete" )
		delete global._storage[ _storage_key ].binary[ offset ]
		++offset_id
		global.CSJLog.timeStamp( "offset_id" + offset )
		file_stream_write( get_params, offset_id );
	}
    else
    {
		global._storage[ _storage_key ].ws.end();
		offset_id = 0;
		return;
	}
}

var file_upload = function( req, res, d, pathname ){

	var _q = decodeURIComponent(req.url).split('?')[ 1 ];
	var q = global.lib.querystring.parse( _q );
	var buffer = new Buffer( d.split(",") ,"binary");
	var uploadPath =  global.ROOTPath + "\\upload\\"
	debugger;
	if( q.offset == 0 )
	{
		var _storage_key = req.connection.remoteAddress + "_" + req.connection.remotePort + "_" + Date.now();
		global._storage[ _storage_key ] = {};
		global._storage[ _storage_key ].binary = {}
		global._storage[ _storage_key ].upload_filieNm = Date.now() + "_" + q.fileNm;
		global._storage[ _storage_key ].totalBytes = q.totalBytes;
		global._storage[ _storage_key ].ws = global.lib.fs.createWriteStream( uploadPath + global._storage[ _storage_key ].upload_filieNm );
		global._storage[ _storage_key ].ws.on( "finish",function(){ console.log("finish") } )
		global._storage[ _storage_key ].ws.on( "close",function(){ console.log("close") } )

		var r = {
			fileNm : global._storage[ _storage_key ].upload_filieNm
			, offset : q.offset
			, isEnd : 0
			, _storage_key : _storage_key
		};

		global._storage[ _storage_key ].binary[ q.offset ] = buffer;
		global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )
	}else{
			debugger;
			var r = {
				fileNm : global._storage[ q._storage_key ].upload_filieNm
				, offset : q.offset
				, isEnd : 0
				, _storage_key : _storage_key
			};

			global._storage[ q._storage_key ].binary[ q.offset ] = buffer;

			if(q.isEnd == 1)
			{
				r.isEnd = 1;
				global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )
				file_stream_write( q, offset_id )
			}else{
				global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )
			}
	}
};

module.exports = file_upload;
