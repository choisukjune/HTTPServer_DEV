
var fs = require('fs');
//var rs = fs.createReadStream('./upload/0_asdfasdf.jpg');
var ws = fs.createWriteStream('./upload/dd.txt');


for(var i = 0; i < 100;++i){
    ws.write( "a" ,function(){
ws.end()
    });
}

        ws.on('finish',function(){
    console.log("---------------------------------finish")
})
ws.on('end',function(){
    console.log("---------------------------------end")
})
ws.on('close',function(){
    console.log("---------------------------------close")
})