var main = function( req, res, d, pathname ){
    //*/
    //GET
    global.render_template.render( req, res, d , pathname )
    /*/
    global.CSJLog.timeStamp("POST");
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = fs.readFileSync('../public/index.html','utf8');
    var body = '';
    req.on('data', function (data) {
        body += data;
        global.CSJLog.timeStamp("Partial body: " + body);
    });
    req.on('end', function () {
        global.CSJLog.timeStamp("Body: " + body);
        var _q = JSON.stringify( queryParam( body ) )
        var data = html.replace("<!=data=!>", _q )
        res.end(data)
    });
     //*/
}



module.exports = main;
