
global.api.file.file_upload_textAsdataURL = function( req, res, d, pathname ){
	var _q = req.url.split('?')[ 1 ];
	var get_params = global.lib.querystring.parse( _q );

	var buffer = new Buffer( d, 'base64');

	var now = new Date().getTime();
	var upload_filNm = now + "_" + get_params.fileNm
	console.log( upload_filNm )
	var uploadPath =  global.ROOTPath + "\\upload\\"
		var r = {
			fileNm : upload_filNm
			, isEnd : 0
		};
	global.lib.fs.writeFile(uploadPath + upload_filNm, buffer,"binary", function(err){
	  //Finished
	  if(err){global.CSJLog.timeStamp(err)}
	  console.log
	  global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )

	});
}
