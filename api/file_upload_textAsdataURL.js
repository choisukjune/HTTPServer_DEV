var file_upload_textAsdataURL = function( req, res, d, pathname ){
    var _q = decodeURIComponent(req.url).split('?')[ 1 ];
    var get_params = global.lib.querystring.parse( _q );
    global.CSJLog.timeStamp( decodeURIComponent(d) )
    var buffer = new Buffer(d.split(",")[1].replace(/\s/g,"+"), 'base64');

    var now = new Date().getTime();
    var upload_filNm = now + "_" + get_params.fileNm

    var uploadPath = "../upload/"
    	var r = {
    		fileNm : upload_filNm
    		, isEnd : 0
    	};
    global.lib.fs.writeFile(uploadPath + upload_filNm, buffer,"binary", function(err){
      //Finished
      if(err){global.CSJLog.timeStamp(err)}
      global.util.response.res_200_ok_String( req, res, JSON.stringify( r ) )

    });
}
module.exports = file_upload_textAsdataURL;
