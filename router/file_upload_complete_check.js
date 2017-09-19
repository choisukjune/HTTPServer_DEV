
var file_upload_complete_check = function( req, res, d, _cbFunction ){

    var _q = JSON.parse( d )
	global.lib.fs.lstat( global.ROOTPath + "\\upload\\" + _q.fileNm, function(err, stats){
		if (err) {
			if (err.code === 'ENOENT' ) {
				global.CSJLog.timeStamp('No file or directory at', err);
				return;
			}
			global.CSJLog.error(err);
			return;
		}

		console.log( stats.size," / ",_q.totalBytes )
		var r = {
			fileNm : _q.fileNm
			, org_fileNm : _q.org_fileNm
			, isEnd : 0
		}

		if( stats.size == _q.totalBytes )
		{
			r.isEnd = 1;
			//_cbFunction(  req, res, JSON.stringify( r ) )
			global.util.response.res_200_ok_String( req, res, JSON.stringify( r )  )
		}
		else
		{
			//_cbFunction(  req, res, JSON.stringify( r ) )
			global.util.response.res_200_ok_String( req, res,  JSON.stringify( r ) )

		}
	})
}
module.exports = file_upload_complete_check;
