//--------------------------------------------------------------------------------;

global.lib = {};
global.lib.http = require('http');
global.lib.url = require('url');
global.lib.fs = require('fs');
global.lib.querystring = require('querystring')
global.lib.iconv = require('iconv-lite')
global.lib.child_process = require('child_process');
global.lib.uglify = require("uglify-js");



//--------------------------------------------------------------------------------;
// ROUTER;
//--------------------------------------------------------------------------------;




//--------------------------------------------------------------------------------;
// UTIL;
//--------------------------------------------------------------------------------;

global.util = {};
global.util.string = {};

/**
 * 숫자에 자리수 추가하는 함수
 * @param  {Number} num
 * @return {String} ex)001
 */
global.util.string.AddZero = function( num ) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
};

/**
 * 문자열의 인코딩 방식을 변경하는 함수
 * @param  {Array} array
 * @param  {String} characterSet
 * @return {String}
 */
global.util.string.kr_string = function( array, characterSet ){
    return global.lib.iconv.decode(Buffer.concat( array ), characterSet );
}

/**
 * html태그를 치환하는 함수
 * @param  {String} s
 * @return {String}
 */
global.util.string.escapeHTML = function( s ) {
  return s.replace(/&/g, '&amp;')
		  .replace(/"/g, '&quot;')
		  .replace(/</g, '&lt;')
		  .replace(/>/g, '&gt;');
}

/**
 * GET Method 로 request 된 결과를 처리하는 함수.
 *  @param {Object} o
 *  @param {String} characterSet
 *  @param {Function} _cb
 */
global.util.request_GET = function( o, characterSet, _cb ){
	var req = global.lib.http.request(o, function( res ){

		var chunks = [];
		res.on('data', function (chunk) {
			chunks.push(chunk);
		});
		res.on('end', function () {
			var data = global.util.string.kr_string( chunks, characterSet );
			_cb( data );
		});
	});

	req.on('error', function(e){
		global.CSJLog.error(`problem with request: ${e.message}`);
	});

	req.end();
}

/**
 * POST Method 로 request 된 결과를 처리하는 함수.
 *  @param {Object} o
 *  @param {String} characterSet
 *  @param {Function} _cb
 */
global.util.request_POST = function( o, characterSet, _cb ){
	var data = querystring.stringify(o.data);
	var req = global.lib.http.request(o, function( res ){

		var chunks = [];
		res.on('data', function (chunk) {
			chunks.push(chunk);
		});
		res.on('end', function () {
			var data = global.util.string.kr_string( chunks, characterSet );
			_cb( data );
		});
	});

	req.on('error', function(e){
		global.CSJLog.error(`problem with request: ${e.message}`);
	});

	// write data to request body
	req.write(o.data);
	req.end();
}

global.util.response = {};
global.util.response.res_200_ok_String = function( req, res, d )
{
    // res.writeHead(200, {'Content-Type': req.headers.accept.split(",")[0]});
    // console.log( req.headers.accept.split(",")[0])

    res.writeHead(200, {'Content-Type': 'text/plain'});
	global.CSJLog.timeStamp( "res.statusCode / " + res.statusCode );
	global.CSJLog.timeStamp( "res.message / " + d );

    //console.log( "[ " + global.log.dateTime() + " ] -- " + "data / \n" + d )
    //console.log( d )
	//res.write( d );
    res.end( d );

}

//--------------------------------------------------------------------------------;
// DATETIME;
//--------------------------------------------------------------------------------;

/**
 * 현재시간을 반환하는 함수;
 * @return {String}
 * <code>
	23/08/2017 11:22 AM
 * </code>
 */
global.dateTime = {};
global.dateTime.NOW = function(){
	var now = new Date();
    return [ [ global.util.string.AddZero(now.getDate()), global.util.string.AddZero(now.getMonth() + 1), now.getFullYear() ].join("/"), [ global.util.string.AddZero(now.getHours()), global.util.string.AddZero(now.getMinutes()), global.util.string.AddZero(now.getSeconds()) ].join(":"), now.getHours() >= 12 ? "PM" : "AM" ].join(" ");
}


//--------------------------------------------------------------------------------;
// LOG;
//--------------------------------------------------------------------------------;


/*
    Reset = "\x1b[0m"
    Bright = "\x1b[1m"
    Dim = "\x1b[2m"
    Underscore = "\x1b[4m"
    Blink = "\x1b[5m"
    Reverse = "\x1b[7m"
    Hidden = "\x1b[8m"

    FgBlack = "\x1b[30m"
    FgRed = "\x1b[31m"
    FgGreen = "\x1b[32m"
    FgYellow = "\x1b[33m"
    FgBlue = "\x1b[34m"
    FgMagenta = "\x1b[35m"
    FgCyan = "\x1b[36m"
    FgWhite = "\x1b[37m"

    BgBlack = "\x1b[40m"
    BgRed = "\x1b[41m"
    BgGreen = "\x1b[42m"
    BgYellow = "\x1b[43m"
    BgBlue = "\x1b[44m"
    BgMagenta = "\x1b[45m"
    BgCyan = "\x1b[46m"
    BgWhite = "\x1b[47m"

    console.log('\x1b[47m\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
    console.log('\x1b[33m%s\x1b[0m', "stringToMakeYellow");

*/

global.log = {};

//------------------------------ Logger CONST;

global.log.CONST = {};

//------------------------------ Logger Config;

global.log.CONST.CONFIG = {};

var _CSJ = "Sukjune:D";
var _Someone = "_Someone_";

var _ = global.log.CONST.CONFIG;
	_.__defineGetter__( "CSJLog", function(){ return _CSJ; } );
	_.__defineGetter__( "_Someone", function(){ return _Someone; } );

//------------------------------ Logger Regist;

var _fn_make_logger = function( d ){

	global[ d ] = {}
	global[ d ].timeStamp = function( m ){
		return console.log("[" + global.log.CONST.CONFIG[ d ] + "]["+ global.dateTime.NOW() +"] -- " + m );
	}
	global[ d ].log = function( m ){
	return console.log( "[" + global.log.CONST.CONFIG[ d ] + "]["+ global.dateTime.NOW() +"] -- : " + m )
	}
	global[ d ].error = function( m ){
		return console.error( "\x1b[37m\x1b[41m%s\x1b[0m","[" + global.log.CONST.CONFIG[ d ] + "]["+ global.dateTime.NOW() +"] - error - : " + m )
	}
}

//------------------------------ Logger Regist - Logic;

_fn_make_logger( "CSJLog" );
_fn_make_logger( "_Someone" );

//------------------------------ Logger Test CODE;

global._Someone.error("TEST Log -- 0")
global.CSJLog.error("TEST Log -- 0")

//--------------------------------------------------------------------------------;
