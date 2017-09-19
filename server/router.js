//--------------------------------------------------------------------------------;
// ROUTER;
//--------------------------------------------------------------------------------;




//router;
global.ROUTER = {};
global.ROUTER.INFO = {};
//console.log( "adsf" )
global.ROUTER.Initialize_router = function(){

    var path = global.ROOTPath + "/router/";
    var a0 = global.lib.fs.readdirSync( path );

    global.ROUTER.INFO[ "/" ] = require( path + "index.js");

    var i =0,iLen = a0.length,_temp,routerNm;
    for( ; i < iLen; ++i )
    {
        console.log( "-[S]- Initialize_router -- " + path + a0[ i ] );

        _temp = a0[ i ].split(".")
        _temp.pop();
        routerNm = "/" + _temp.join("");

        //console.log( a0[ i ], routerNm )
        global.ROUTER.INFO[ routerNm ] = require( path + a0[ i ]);
        console.log( "-[E]- Initialize_router -- " + path + a0[ i ] );
    }
};

global.STATIC = {}
global.STATIC.resource = [ "css", "js", "libs" ];

global.ROUTER.routerControl = function(req,res) {

    var pathname = global.lib.url.parse(req.url).pathname;

    //resource router
    if (global.STATIC.resource.indexOf( req.url.split("/")[ 1 ] ) !== -1) {
        var resource = global.lib.fs.createReadStream(global.ROOTPath + "/public/" + req.url, 'utf8');
        return resource.pipe(res);
    }

    if ( global.ROUTER.INFO.hasOwnProperty( pathname ) ){
        if( 'GET' == req.method )
        {
            global.CSJLog.timeStamp( "METHOD / " + req.method );
            global.CSJLog.timeStamp( "Path / " + pathname);

            global.ROUTER.GET__req_res( req, res, pathname )
        }
        else
        {
            global.CSJLog.timeStamp( "METHOD / " + req.method );
            global.CSJLog.timeStamp( "Path / " + pathname);

            global.ROUTER.POST__req_res( req, res, pathname )
        }
    }
    else
    {
        global.CSJLog.timeStamp( 'no request handler found for ' + pathname );

        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.write('404 Not found');
        res.end();
    }
}

/*
req.connection.remoteAddress
req.connection.remotePort
req.connection.localAddress
req.connection.localPort
 */
global.ROUTER.GET__req_res = function( req, res, pathname ){

    global.CSJLog.timeStamp("IP / " + req.connection.remoteAddress + " | PORT / " + req.connection.remotePort);
    global.CSJLog.timeStamp("IP / " + req.connection.localAddress + " | PORT / " + req.connection.localPort);

    global.ROUTER.INFO[ pathname ]( req, res, encodeURIComponent( req.url ), pathname )
};

global.ROUTER.POST__req_res = function( req, res, pathname ){

    global.CSJLog.timeStamp("IP / " + req.connection.remoteAddress + " | PORT / " + req.connection.remotePort);
    global.CSJLog.timeStamp("IP / " + req.connection.localAddress + " | PORT / " + req.connection.localPort);

    var body = '';
    req.on('data', function (data) {
        body += data;
       // global.CSJLog.timeStamp("Partial body: " + body);
    })
    req.on('end', function () {
       // global.CSJLog.timeStamp("Body: " + body);
        //req.body = body;
        console.log( pathname )
        global.ROUTER.INFO[ pathname ]( req, res, body, pathname )
    })
};
