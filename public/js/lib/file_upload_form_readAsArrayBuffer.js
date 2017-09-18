//--------------------------------------------------;
// FILE_UPLOAD;
//--------------------------------------------------;

(function(){

//-------------------------;
// VARIABLE;
//-------------------------;


var fileDataInfo = [] //파일데이터를 전송하기전 동기방식으로 전속하기위해 저장하는 스토리지;
var c = 0; //파일전송시 완료체크를 위한 변수;

//-------------------------;
// PACKAGE;
//-------------------------;

//window.service.file_upload = {};
window.service.file_upload.readAsArrayBuffer = {};

//-------------------------;
// FUNCTION;
//-------------------------;

window.service.file_upload.readAsArrayBuffer.uloadFile = function( data, fileNm, isEnd, fileSize, offset, worker_id ){

    var url = "/file_upload_readAsArrayBuffer?fileNm=" + fileNm + "&isEnd=" + isEnd + "&totalBytes=" + fileSize + "&offset=" + offset + "&worker_id=" + worker_id;

    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    var params = data;
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //http.setRequestHeader("Content-length", params.length);
    //http.setRequestHeader("Connection", "close");
    // http.setRequestHeader('Access-Control-Allow-Origin','*')
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200){
            var r = JSON.parse( http.responseText )
            // console.log(r.offset)
            if( r.isEnd == "1")
            {
                document.getElementById("file_upload_input").value = "";
                window.service.file_upload.readAsArrayBuffer.isComplete( r.fileNm, fileSize, fileNm )
                return 2;
            }
            else{ return 1; }
        }
        else
        {
         console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
    }
    http.send(params);
};


window.service.file_upload.readAsArrayBuffer.isComplete = function( fileNm, fileSize, org_fileNm ){

    var url = "/file_upload_complete_check"

    var data = {
        fileNm : fileNm
        , totalBytes : fileSize
        , org_fileNm : org_fileNm
    }

    var params = JSON.stringify( data );

    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //http.setRequestHeader("Content-length", params.length);
    //http.setRequestHeader("Connection", "close");
    // http.setRequestHeader('Access-Control-Allow-Origin','*')
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200)
        {
            var r = JSON.parse( http.responseText );
            if( r.isEnd == "0")
            {
                window.service.file_upload.readAsArrayBuffer.isComplete( fileNm, fileSize, org_fileNm );
            }
            else
            {
                if( fileDataInfo.length - 1 > c )
                {
                    ++c;
                    window.service.file_upload.readAsArrayBuffer.parseFile( fileDataInfo[ c ] );
                }
                else
                {
                    document.getElementById("file_upload_input").value = "";
                    fileDataInfo = [];
                    c = 0;
                }

                window.service.file_upload.readAsArrayBuffer.write_OK_check( org_fileNm )
            }
        }
        else
        {
            console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
    };
    http.send(params);
};

window.service.file_upload.readAsArrayBuffer.parseFile  = function( d ){
    var file = d.data;
    var worker_id = d.worker_id;
    var fileSize = file.size;
    var chunkSize = 1024 * 1024;
    var offset = 0;
    var count = 0;

    var readEventHandler = function(evt){
        if (evt.target.error == null)
        {
            var s = new Uint8Array( evt.target.result )
            offset += s.length;
            if( window.service.file_upload.readAsArrayBuffer.uloadFile( s.join(","), file.name, 0 , fileSize, count, worker_id ) == 1 )
            {
                parseFile( fileDataInfo[ c ] );
            }

            if (offset >= fileSize)
            {
                if( window.service.file_upload.readAsArrayBuffer.uloadFile( "", file.name, 1, fileSize, count, worker_id ) == 2 )
                {
                    if( fileDataInfo.length - 1 > c )
                    {
                        ++c;
                        window.service.file_upload.readAsArrayBuffer.parseFile( fileDataInfo[ c ] );
                    }
                    else
                    {
                        document.getElementById("file_upload_input").value = "";
                        fileDataInfo = [];
                        c = 0;
                    }
                }
                return;
            }
            ++count;
            chunkReaderBlock(offset, chunkSize, file);
        }
        else
        {
            //console.log("Read error: " + evt.target.error);
            return;
        }
    }

    var chunkReaderBlock = function( _offset, length, _file ){
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        r.onloadend = readEventHandler;
        r.readAsArrayBuffer(blob);
    }

    chunkReaderBlock(offset, chunkSize, file);
}


window.service.file_upload.readAsArrayBuffer.write_OK_check = function( d , fileSize){
    var li_val = document.getElementById( d ).innerText;
    return document.getElementById( d + "_prg" ).textContent = " -- complete!";
}

window.service.file_upload.readAsArrayBuffer.infoAdd = function( file, dataURL ){
    var output = document.getElementById('upload_files');
    var li = document.createElement("li");
    var text = document.createTextNode( file.name );
    // var text_prg = document.createTextNode( " - 0%" );
    var span = document.createElement("span");
    //li__img.setAttribute("id", file.name)
    span.setAttribute( "id", file.name+"_prg" );
    li.setAttribute( "id", file.name );

    li.appendChild( text );
    li.appendChild( span );
    // li.appendChild( li__img );
    output.appendChild( li );
    // var imgByClassName = document.getElementById( file.name );
    // imgByClassName.src = dataURL;

}

window.service.file_upload.readAsArrayBuffer.openFile = function(event) {
    var input = event.target;

    var o;
    var i = 0,iLen = input.files.length;
    for(; i < iLen; i++){
        var file =  input.files[i];
        /*
        //파일정보;
        console.group("File "+i);
        console.log("name : " + file.name);
        console.log("size : " + file.size);
        console.log("type : " + file.type);
        console.log("date : " + file.lastModified);
        console.groupEnd();
        */
        window.service.file_upload.readAsArrayBuffer.infoAdd( file );
        var worker_id = window.service.util.MATH.getRandomArbitrary(0,10000000000)
        var d = { data : file, worker_id : worker_id };
        fileDataInfo.push( d );
    }
};

window.service.file_upload.readAsArrayBuffer.popFileSelector = function() {
    var el = document.getElementById("file_upload_input");
    if(el) el.click();
};

window.service.file_upload.readAsArrayBuffer.popRightAway = function() {
    window.service.file_upload.readAsArrayBuffer.popFileSelector();
};

//-------------------------;
// EVENT;
//-------------------------;

// window.service.EVENT.byID = function( id, event, _cbFunc ) {

//     return document.getElementById( id ).addEventListener( event, function(){ _cbFunc })

// };

/*/
var f0 = window.service.EVENT.byID;
f0("file_upload_input","change", window.service.file_upload.readAsArrayBuffer.openFile(event) );
f0("upload","click", window.service.file_upload.readAsArrayBuffer.parseFile( fileDataInfo[ c ] ) );
f0("select_file_button","click", window.service.file_upload.readAsArrayBuffer.popFileSelector() );
/*/
document.getElementById("file_upload_input").addEventListener("change",function(){ window.service.file_upload.readAsArrayBuffer.openFile(event); })
document.getElementById("upload").addEventListener("click",function(){ window.service.file_upload.readAsArrayBuffer.parseFile( fileDataInfo[ c ] ); })
document.getElementById("select_file_button").addEventListener("click",function(){ window.service.file_upload.readAsArrayBuffer.popFileSelector() })
//*/
})()
