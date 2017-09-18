
global._storage = {};
global._storage.fileupload = {};

var offset_id = 0;

var file_stream_write = function( get_params, offset ){
	global.CSJLog.timeStamp( global._storage.fileupload[ get_params.worker_id ] );
	global._storage.fileupload[ get_params.worker_id ].ws.on("finish",function(){
		// global.CSJLog.timeStamp("----------------------------------------------------")
		// global.CSJLog.timeStamp(get_params.fileNm + "---finish")
		// global.CSJLog.timeStamp("----------------------------------------------------")
	})

	global._storage.fileupload[ get_params.worker_id ].ws.on("close",function(){
		// global.CSJLog.timeStamp("----------------------------------------------------")
		// global.CSJLog.timeStamp(get_params.fileNm + "---close")
		// global.CSJLog.timeStamp("----------------------------------------------------")
	})




	var buffer = global._storage.fileupload[ get_params.worker_id ].binary[ offset ]
	
	global.CSJLog.timeStamp( global._storage.fileupload[ get_params.worker_id ].binary.hasOwnProperty( offset ) )
	
	if( global._storage.fileupload[ get_params.worker_id ].binary.hasOwnProperty( offset ) ){

		global._storage.fileupload[ get_params.worker_id ].ws.write( buffer,function(){
			global.CSJLog.timeStamp( offset_id + "---- write_complete" )
			delete global._storage.fileupload[ get_params.worker_id ].binary[ offset ]
			++offset_id
			global.CSJLog.timeStamp( "offset_id" + offset_id )
			file_stream_write( get_params, offset_id );
			
		});
	
	}else{

		global._storage.fileupload[ get_params.worker_id ].ws.end();
		delete global._storage.fileupload[ get_params.worker_id ]
		
		offset_id = 0;
		
		global.CSJLog.timeStamp( global._storage.fileupload );
		global.CSJLog.timeStamp( "delete global._storage.fileupload[ get_params.fileNm ]" )
		global.CSJLog.timeStamp( "global._storage.fileupload[ get_params.fileNm ].ws.end();" )
	}
}

var file_upload = function( req, res, d, pathname ){
	var _q = decodeURIComponent(req.url).split('?')[ 1 ];
	var get_params = global.lib.querystring.parse( _q );
	var buffer = new Buffer( d.split(",") ,"binary");
	var uploadPath =  global.ROOTPath + "\\upload\\"

	if( !global._storage.fileupload[ get_params.worker_id ] ){
		global.CSJLog.timeStamp( "global._storage.fileupload[ get_params.fileNm ]" )
		var now = new Date().getTime();  
		var work_key = now + "_" + get_params.fileNm
		
		global._storage.fileupload[ get_params.worker_id ] = {}
		global._storage.fileupload[ get_params.worker_id ].binary = {}
		global._storage.fileupload[ get_params.worker_id ].upload_filieNm = now + "_" + get_params.fileNm;
		global._storage.fileupload[ get_params.worker_id ].totalBytes = get_params.totalBytes;
		global._storage.fileupload[ get_params.worker_id ].ws = global.lib.fs.createWriteStream(uploadPath + global._storage.fileupload[ get_params.worker_id ].upload_filieNm);

	}

	var r = {
		fileNm : global._storage.fileupload[ get_params.worker_id ].upload_filieNm
		, offset : get_params.offset
		, isEnd : 0
	};


	if(get_params.isEnd == 1)
	{
		r.isEnd = 1;
		global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )
		file_stream_write( get_params, offset_id )
	}
	else
	{
		global._storage.fileupload[ get_params.worker_id ].binary[ get_params.offset ] = buffer;
		global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )
	};
};

module.exports = file_upload;