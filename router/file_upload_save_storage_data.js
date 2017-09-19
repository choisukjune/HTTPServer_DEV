global.file_storage = {}
var file_upload_complete_check = function( req, res, d ){

	var _q = decodeURIComponent(req.url).split('?')[ 1 ];
	var q = global.lib.querystring.parse( _q );
	var buffer = new Buffer( d.split(",") ,"binary");
	var uploadPath =  global.ROOTPath + "\\upload\\"
	var _storage_key = q._storage_key;
	if( q._storage_key == "" )
	{
		var _storage_key = req.connection.remoteAddress + "_" + req.connection.remotePort + "_" + Date.now();

		global.file_storage[ _storage_key ] = {};
		global.file_storage[ _storage_key ].binary = {}
		global.file_storage[ _storage_key ].upload_filieNm = Date.now() + "_" + q.fileNm;
		global.file_storage[ _storage_key ].totalBytes = q.totalBytes;
		global.file_storage[ _storage_key ].total_offset = q.total_offset;
		global.file_storage[ _storage_key ].ws = global.lib.fs.createWriteStream( uploadPath + global.file_storage[ _storage_key ].upload_filieNm );
		global.file_storage[ _storage_key ].ws.on( "finish",function(){ console.log("finish") } )
		global.file_storage[ _storage_key ].ws.on( "close",function(){ console.log("close") } )

	}

	var r = {
		fileNm : q.fileNm
		, saved_fileNm : global.file_storage[ _storage_key ].upload_filieNm
		, offset : q.offset
		, total_offset : q.total_offset
		, isEnd : 0
		, _storage_key : _storage_key
	};

	if( q.total_offset == q.offset ) r.isEnd = 1;

	global.file_storage[ _storage_key ].binary[ q.offset ] = buffer;
	global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )

}
module.exports = file_upload_complete_check;
