//--------------------------------------------------------------------------------;
// SERVER;
//--------------------------------------------------------------------------------;

global.SERVER = {};

//--------------------;
// FUNCTION;
//--------------------;

global.SERVER.Initialize_commonJS = function(){

    var path = "./public/js/_define/";
    var a0 = global.lib.fs.readdirSync( path );
    var ws = global.lib.fs.createWriteStream( path + 'common.min.js' );

    ws.on("finish",function(){ /*console.log( 'finish' );*/})
    ws.on("close",function(){ /*console.log( 'close' );*/ })

    var i =0,iLen = a0.length;
    for( ; i < iLen; ++i )
    {
        var r = global.lib.fs.readFileSync(path + a0[ i ],'utf8');
        // ws.write( global.lib.uglify.minify( r ).code,{ flag : "w" });
        ws.write( r,{ flag : "w" });
    }
    ws.end();
};
global.SERVER.Initialize_api = function(){

    var path = global.ROOTPath + "/api/";
    var a0 = global.lib.fs.readdirSync( path );

    var i =0,iLen = a0.length;
    for( ; i < iLen; ++i )
    {
        console.log( "-[S]- Initialize_api -- " + path + a0[ i ] );
        require( path + a0[ i ]);
        console.log( "-[E]- Initialize_api -- " + path + a0[ i ] );
    }

};
global.SERVER.serverStart = function( routerControl ) {

    global.SERVER.Initialize_commonJS();
    global.SERVER.Initialize_api();
    global.ROUTER.Initialize_router();

    var onRequest = function(req, res){ routerControl( req, res ); };
	global.lib.http.createServer( onRequest ).listen(8888);
    global.CSJLog.timeStamp('server has started.');
};
