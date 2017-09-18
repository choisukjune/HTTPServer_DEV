//var iconv = require("iconv-lite");
//var config = {
//    "build" : {
//        "all" : "_build_all.bat",
//        "b2ker" : "_build_b2ker.bat",
//        "b2ker_webpage_all" : "_build_b2ker_webpage_all.bat",
//        "b2ker_webpage_except_Less" : "_build_b2ker_webpage_except_Less.bat",
//        "b2ker_webpage_template" : "_build_b2ker_webpage_template.bat",
//        "Session" : "_build_Session.bat",
//        "File" : "_build_File.bat",
//        "Excel" : "_build_Excel.bat",
//        "WebHook" : "_build_WebHook.bat",
//        "WebSocket" : "_build_WebSocket.bat",
//        "BrowserAndNode_module" : "_build_BrowserAndNode_module.bat"
//    },
//    "DB" : {
//        "b2ker" : "_DB_b2ker.bat",
//        "Session" : "_DB_Session.bat",
//        "File" : "_DB_File.bat",
//    },
//    "Server_start" : {
//        //"all" : "_all_build.bat",
//        "b2ker" : "_Server_start_b2ker.bat",
//        "Session" : "_Server_start_Session.bat",
//        "File" : "_Server_start_File.bat",
//        "Excel" : "_Server_start_Excel.bat",
//        //"Webhook" : "_WebHookServer_build.bat",
//        //"WebSocket" : "_WebSocketServer_build.bat",
//        //"BrowserAndNode_module" : "_buiild_LibAndModule.bat"
//    }
//}
//
//var isCtrl = false;
//document.onkeyup=function(e) {
//    if(e.which == 17) isCtrl=false;
//	console.log( e )
//}
//document.onkeydown=function(e){
//    if(e.which == 17) isCtrl=true;
//	console.log( e )
//    if(e.which == 49 && isCtrl == true) {
//         executeBat("Server_start","Excel")
//         return false;
//    }
//}
//
//
//var addEventListener_el = function( t, i ){
//var id = t + "_" + i;
//return document.getElementById( id ).addEventListener('click', function(){ executeBat( t, i ) }, false)
//}
//
//window.addEventListener('DOMContentLoaded', function(){
//    for( var s in config ){
//        var jbtitle = document.createElement( 'h3' );
//        var jbtitletext = document.createTextNode( s );
//        jbtitle.appendChild( jbtitletext )
//        document.getElementById('contents').appendChild(jbtitle);
//        for( var t in config[ s ]){
//            var jbBtn = document.createElement( 'button' );
//            var jbBtnText = document.createTextNode( t );
//            jbBtn.appendChild( jbBtnText );
//            document.getElementById('contents').insertAdjacentHTML("beforeend","<li><button type=\"button\" id=\"" + s + "_"+ t + "\">" + t + "</button></li>");
//            addEventListener_el( s, t )
//        }
//    }
//})
//
//function resetLog(){
//    return document.getElementById("log-container").innerHTML = "";
//}
//function addLog(message,type){
//    var el = document.getElementById("log-container");
//    var newItem = document.createElement("LI");       // Create a <li> node
//    var textnode = document.createTextNode(message)
//
//    if(type == "error"){
//        newItem.style.color = "red";
//    }else if(type == "final"){
//        newItem.style.color = "blue";
//    }
//    newItem.appendChild(textnode);
//    el.appendChild(newItem);
//}
//
function kr_string( str ){
    str = new Buffer( str );
    return iconv.decode(str, 'EUC-KR').toString();
}
//
//function AddZero(num) {
//    return (num >= 0 && num < 10) ? "0" + num : num + "";
//}
//
//function get_now() {
//    var now = new Date();
//    var strDateTime = [[AddZero(now.getDate()),
//        AddZero(now.getMonth() + 1),
//        now.getFullYear()].join("/"),
//        [AddZero(now.getHours()),
//        AddZero(now.getMinutes())].join(":"),
//        now.getHours() >= 12 ? "PM" : "AM"].join(" ");
//    return strDateTime;
//};

//function executeBat( type, IdNm ){
//
//  addLog( IdNm + " ---- " + type + " Start"  + " --- " + get_now() )
//
//  var myBatFilePath = "d:/Github/" + config[ type ][ IdNm ];
//  var spawn = require('child_process').spawn;
//  var bat = spawn('cmd.exe', ['/c', myBatFilePath]);
//  bat.stdout.on('data', function( data ){
//      var str = String.fromCharCode.apply("utf8", data);
//      //addLog( kr_string( data ) );
//      console.info( kr_string( data ) );
//  });
//  bat.stderr.on('data', function( data ){
//      var str = String.fromCharCode.apply("utf8", data);
//      //addLog(kr_string( data ),"error");
//      console.error( kr_string( data) );
//  });
//  bat.on('exit',function( data ){
//    addLog( IdNm + " ---- " + type + " Complete!"  + " --- " + get_now() )
//  });
//}


//
//  //var myBatFilePath = "d:/Github/" + config[ type ][ IdNm ];
//  var spawn = require('child_process').spawn;
//  var bat = spawn('cmd.exe', ['/c', "node","index.js"]);
//  bat.stdout.on('data', function( data ){
////      var str = String.fromCharCode.apply("utf8", data);
////      //addLog( kr_string( data ) );
//      console.info( kr_string( data ) );
//  });
//  bat.stderr.on('data', function( data ){
////      var str = String.fromCharCode.apply("utf8", data);
////      //addLog(kr_string( data ),"error");
//      console.error( kr_string( data) );
//  });
//  bat.on('exit',function( data ){
//    //addLog( IdNm + " ---- " + type + " Complete!"  + " --- " + get_now() )
//  });
//
//
require('D:/sukjune_js_util/httpServer_csj/index.js')
