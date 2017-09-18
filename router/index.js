
var index = function( req, res, d, pathname ){
  
    // in stdout.log: count 5
    //*/
    //GET
    global.render_template.render( req, res, d , "index" )
    /*/
    global.CSJLog.timeStamp("POST");
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = fs.readFileSync('../public/in

    dex.html','utf8');
    var body = '';
    req.on('data', function (data) {
        body += data;
        global.CSJLog.timeStamp("Partial body: " + body);
    });
    req.on('end', function () {
        global.CSJLog.timeStamp("Body: " + body);
        var _q = JSON.stringify( queryPa    ram( body ) )
        var data = html.replace("<!=data=!>", _q )
        res.end(data)
    });
     //*/
}

module.exports = index;
