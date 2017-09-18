var get_Request = function(req, res, d , pathname ){

	var _exec = global.lib.child_process.spawnSync( 'cmd.exe', [
		'/c'
		, 'D:/Github/Development-Binary-Windows/Binary/MongoDB/mongo.exe'
		,'127.0.0.1:59320/admin'
		,'-u'
		,'Ttw'
		,'-p'
		, 'thdtjsdncjswoQWEASDZXC'
		, '<'
		, 'D:/test.js'
	]);

	var stdout = _exec.stdout;
	var stdout_replace_text = stdout.toString('utf8').replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, '');
	var r = stdout_replace_text.split("--[ ResultStart ]--")[1].split("--[ ResultEnd ]--")
	r.pop()
	
	process.on('exit', function() {
		global.CSJLog.timeStamp("Done")
	});

	/*/
	return JSON.stringify(JSON.parse( r[0] ),null,4)
	/*/
	global.util.response.res_200_ok_String( req, res, JSON.stringify(JSON.parse( r[0] ),null,4) )
	//*/
}

module.exports = get_Request;
