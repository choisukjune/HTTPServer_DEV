global.render_template = {};
global.render_template.CONST = {};
global.render_template.CONST.CONFIG = {};

global.render_template.CONST.CONFIG.template_root = global.ROOTPath + "\\public\\"




/**
 * 화면에 데이터를 그려주는 함수 --  요청쿼리기반 작동;
 * @param  {http.ClientRequest} req
 * @param  {http.ClientRequest} res
 * @param  {String} d 요청쿼리
 * @param  {String} template html파일명
 */
global.render_template.render = function(req,res, d, template)
{
    var template_DIR = global.render_template.CONST.CONFIG.template_root;
    var html = global.lib.fs.readFileSync(  template_DIR + template +'.html','utf8');

    var decodeURIComponent_Data = decodeURIComponent( d ).replace(/^.*\?/, '');
    var _q = global.lib.querystring.parse( decodeURIComponent_Data )

    _q.loadScript = template + ".js";

    if( d == "/") _q = "/"
    global.CSJLog.timeStamp(  "query / " + JSON.stringify( _q ) );

    var r0 = global.render_template.include__html( html )
    if( r0 != 0 )
    {
        html = global.render_template.include__html__repalce_data( r0, html )
    }
    var data = global.render_template.replace_keyword( _q, html )
    global.render_template.res_200_ok__html( req, res, data );
}

/**
 * 화면에 데이터를 그려주는 함수 -- 전체데이터를 노출함.;
 * @param  {http.ClientRequest} req
 * @param  {http.ClientRequest} res
 * @param  {String} d response된 문자열
 * @param  {String} template html파일명
 */
global.render_template.send = function(req,res, d, template)
{
    var template_DIR = global.render_template.CONST.CONFIG.template_root;
    var html = global.lib.fs.readFileSync(  template_DIR + template +'.html','utf8');
    var r0 = global.render_template.include__html( html )
    if( r0 != 0 )
    {
        html = global.render_template.include__html__repalce_data( r0, html )
    }
    var data = global.render_template.replace_keyword( d, html )
    global.render_template.res_200_ok__html( req, res, data );
}

/**
 * html문서의 치환자를 찾아 구조체로 만드는 함수
 * @param  {String} str
 * @return {Object} ???
 */
global.render_template.include__html = function( str )
{
    var r = str.match(/<include>(.*?)<\/include>/g);
    if(r == null ){
        return 0;
    }
    var i = 0,iLen = r.length;
    var o = {}
    for(; i< iLen;++i){
        o[ r[i] ] = r[i].replace(/<\/?include>/g,'');
    }
    return o;
}

/**
 * <include></include> 치환자를 통해 html을 삽입하는 함수.
 * @param  {Object} o
 * @param  {String} str
 * @return {String} r
 */
global.render_template.include__html__repalce_data = function( o, str )
{
    var r;
    r = str
    var re;
    for(var s in o ){
        var template_DIR = './public/';
        var html = global.lib.fs.readFileSync( template_DIR + o[ s ],'utf8' );
        re = new RegExp(s,"g");

        r = r.replace( re , html)
    }
    return r;
}

/**
 * html을 Response 를 내려주는 함수;
 * @function
 * @param {http.ClientRequest} req
 * <code>
	{

	}
 * </code>
 *
 * @param {http.ClientResponse} res
 * <code>
	{

	}
 * </code>
 *
 * @param  {String} d
 */
global.render_template.res_200_ok__html = function( req, res, d )
{
    // res.writeHead(200, {'Content-Type': req.headers.accept.split(",")[0]});
    // console.log( req.headers.accept.split(",")[0])

    res.writeHead(200, {'Content-Type': 'text/html'});
    global.CSJLog.timeStamp(  "res.statusCode / " + res.statusCode );
    //console.log( "[ " + global.log.dateTime() + " ] -- " + "data / \n" + d )
    res.write( d );
    res.end();

}

/**
 * 치환자를 대체문자열로 치환하는 함수;
 * @param  {Object} obj
 * @param  {String} str
 * @return {String}
 */
global.render_template.replace_keyword = function( obj, str )
{
    var s,r = str;
    for( s in obj ){
        r = r.replace( "<!=" + s + "=!>", obj[ s ] )
    }
    return r;
}
