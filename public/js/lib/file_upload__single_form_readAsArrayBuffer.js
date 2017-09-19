//--------------------------------------------------;
// FILE_UPLOAD;
//--------------------------------------------------;

(function(){

//-------------------------;
// VARIABLE;
//-------------------------;


var fileDataInfo = [] //파일데이터를 전송하기전 동기방식으로 전속하기위해 저장하는 스토리지;
var c = 0; //파일전송시 완료체크를 위한 변수;
var isRequestCompltet = 0;
var _storage_key = ""
//-------------------------;
// PACKAGE;
//-------------------------;

//window.service.file_upload = {};
window.service.file_upload.file_upload__single_readAsArrayBuffer = {};
window.service.file_upload.file_upload__single_readAsArrayBuffer._storage_key = ""
//-------------------------;
// FUNCTION;
//-------------------------;
var aaa = 0
// window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile = function( data, fileNm, isEnd, fileSize, offset, _storage_key ){
//     var _storage_key = window.service.file_upload.file_upload__single_readAsArrayBuffer._storage_key;
//     console.log( _storage_key );
//     var url = "/file_upload__single_readAsArrayBuffer?fileNm=" + fileNm + "&isEnd=" + isEnd + "&totalBytes=" + fileSize + "&offset=" + offset + "&_storage_key=" + _storage_key;
//
//     console.log( url );
//     var http = new XMLHttpRequest();
//     http.open("POST", url, true);
//     var params = data;
//     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     //http.setRequestHeader("Content-length", params.length);
//     //http.setRequestHeader("Connection", "close");
//     // http.setRequestHeader('Access-Control-Allow-Origin','*')
//     http.onreadystatechange = function(){
//         if(http.readyState == 4 && http.status == 200){
//             var r = JSON.parse( http.responseText )
//             console.log(r._storage_key)
//             window.service.file_upload.file_upload__single_readAsArrayBuffer._storage_key = r._storage_key;
//             if( r.isEnd == "1")
//             {
//                 document.getElementById("file_upload_input").value = "";
//                 window.service.file_upload.file_upload__single_readAsArrayBuffer.isComplete( r.fileNm, fileSize, fileNm )
//                 //debugger;
//                 isRequestCompltet = 2;
//             }
//             else{ isRequestCompltet = 1; }
//         }
//         else
//         {
//          console.log('readyState=' + http.readyState + ', status: ' + http.status);
//         }
//     }
//     http.send(params);
// };
window.service.file_upload.req_POST_data__Callback = function( url, data, _cbFunction ){

    var http = new XMLHttpRequest();
    var params = data;

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //http.setRequestHeader("Content-length", params.length);
    //http.setRequestHeader("Connection", "close");
    // http.setRequestHeader('Access-Control-Allow-Origin','*')
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200){
            var r = JSON.parse( http.responseText )
            console.log( "request_ok! --- " + r )
            _cbFunction( r )

        }
        else
        {
         console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
    }
    http.send(params);
}
var offset = 0
var total_offset = 0;
window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile = function( d, _storage_key ){
// console.log( d )
    if( !window.service.data[ d ].binary.hasOwnProperty( offset ) )
    {
        offset = 0;
        return;
    }
    //r._storage_key
    var url = "/file_upload_save_storage_data?fileNm=" + window.service.data[ d ].fileNm + "&totalBytes=" + window.service.data[ d ].fileSize + "&offset=" + offset + "&total_offset=" + total_offset + "&_storage_key=" + _storage_key
    var data = window.service.data[ d ].binary;

    window.service.file_upload.req_POST_data__Callback(url,data[ offset ],function( r ){
        //delete window.service.data[ d ].binary[ offset ];
        ++offset;
        console.log( r )
        console.log( offset )
        if( r.isEnd == 1 ){
            //파일스트림작성 리퀘스트
            //console.log( "파일스트림작성 리퀘스트" )
            console.log( r.fileNm )
            delete window.service.data[ r.fileNm ]
        }
        else
        {
            window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile( r.fileNm, r._storage_key );
        }
        //window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile( d, _storage_key );
    })

};


window.service.data = {};
window.service.file_upload.file_upload__single_readAsArrayBuffer.parseFile  = function( d ){

    var file = d.data;
    var worker_id = d.worker_id;
    var fileSize = file.size;
    var chunkSize = 1024 * 1024;
    var offset = 0;
    var count = 0;
    total_offset = parseInt( file.size / chunkSize );

    var readEventHandler = function(evt){
        if (evt.target.error == null)
        {

            var s = new Uint8Array( evt.target.result )
            offset += s.length;
            console.log( offset + "/" +  fileSize)
            if( fileSize < chunkSize )
            {
                if( !window.service.data.hasOwnProperty( file.name )){
                    window.service.data[ file.name ] = {};
                    window.service.data[ file.name ].binary = {};
                    window.service.data[ file.name ].fileNm = file.name;
                    window.service.data[ file.name ].fileSize = fileSize;
                }

                window.service.data[ file.name ].binary[ count ] = s.join(",");

                //window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile( s.join(","), file.name, 1 , fileSize, count )
            }
            else
            {
                if (offset == fileSize)
                {
                    // //debugger;
                    // console.log( _storage_key );
                    // //window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile( s.join(","), file.name, 1, fileSize, count );
                    //
                    // document.getElementById("file_upload_input").value = "";
                    // fileDataInfo = [];
                    // c = 0;
                    // return;
                    if( !window.service.data.hasOwnProperty( file.name )){
                        window.service.data[ file.name ] = {};
                        window.service.data[ file.name ].binary = {};
                        window.service.data[ file.name ].fileNm = file.name;
                        window.service.data[ file.name ].fileSize = fileSize;
                    }

                    window.service.data[ file.name ].binary[ count ] = s.join(",");
                    window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile( file.name, "" )
                }
                else
                {
                    if( !window.service.data.hasOwnProperty( file.name )){
                        window.service.data[ file.name ] = {};
                        window.service.data[ file.name ].binary = {};
                        window.service.data[ file.name ].fileNm = file.name;
                        window.service.data[ file.name ].fileSize = fileSize;
                    }

                    window.service.data[ file.name ].binary[ count ] = s.join(",");
                    //window.service.file_upload.file_upload__single_readAsArrayBuffer.uloadFile( s.join(","), file.name, 0 , fileSize, count )
                    ++count;
                    chunkReaderBlock(offset, chunkSize, file);
                }
            }
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

window.service.file_upload.file_upload__single_readAsArrayBuffer.isComplete = function( fileNm, fileSize, org_fileNm ){

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
            console.log( r )
            if( r.isEnd == "0")
            {
                window.service.file_upload.file_upload__single_readAsArrayBuffer.isComplete( fileNm, fileSize, org_fileNm );
            }
            else
            {
                console.log( r )
                document.getElementById("file_upload_input").value = "";
                fileDataInfo = [];
                c = 0;
            }
        }
        else
        {
            console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
    };
    http.send(params);
};



window.service.file_upload.file_upload__single_readAsArrayBuffer.write_OK_check = function( d , fileSize){
    var li_val = document.getElementById( d ).innerText;
    return document.getElementById( d + "_prg" ).textContent = " -- complete!";
}

window.service.file_upload.file_upload__single_readAsArrayBuffer.infoAdd = function( file, dataURL ){
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

window.service.file_upload.file_upload__single_readAsArrayBuffer.openFile = function(event) {
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
        window.service.file_upload.file_upload__single_readAsArrayBuffer.infoAdd( file );
        var worker_id = window.service.util.MATH.getRandomArbitrary(0,10000000000)
        var d = { data : file, worker_id : worker_id };
        fileDataInfo.push( d );
    }
};

window.service.file_upload.file_upload__single_readAsArrayBuffer.popFileSelector = function() {
    var el = document.getElementById("file_upload_input");
    if(el) el.click();
};

window.service.file_upload.file_upload__single_readAsArrayBuffer.popRightAway = function() {
    window.service.file_upload.file_upload__single_readAsArrayBuffer.popFileSelector();
};

//-------------------------;
// EVENT;
//-------------------------;

// window.service.EVENT.byID = function( id, event, _cbFunc ) {

//     return document.getElementById( id ).addEventListener( event, function(){ _cbFunc })

// };

/*/
var f0 = window.service.EVENT.byID;
f0("file_upload_input","change", window.service.file_upload.file_upload__single_readAsArrayBuffer.openFile(event) );
f0("upload","click", window.service.file_upload.file_upload__single_readAsArrayBuffer.parseFile( fileDataInfo[ c ] ) );
f0("select_file_button","click", window.service.file_upload.file_upload__single_readAsArrayBuffer.popFileSelector() );
/*/
document.getElementById("file_upload_input").addEventListener("change",function(){ window.service.file_upload.file_upload__single_readAsArrayBuffer.openFile(event); })
document.getElementById("upload").addEventListener("click",function(){ window.service.file_upload.file_upload__single_readAsArrayBuffer.parseFile( fileDataInfo[ c ] ); })
document.getElementById("select_file_button").addEventListener("click",function(){ window.service.file_upload.file_upload__single_readAsArrayBuffer.popFileSelector() })
//*/
})()
