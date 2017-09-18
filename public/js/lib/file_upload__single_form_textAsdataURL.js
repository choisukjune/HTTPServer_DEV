//--------------------------------------------------;
// FILE_UPLOAD;
//--------------------------------------------------;

(function(){

//-------------------------;
// VARIABLE;
//-------------------------;

var fileDataInfo = null; //파일데이터를 전송하기전 동기방식으로 전속하기위해 저장하는 스토리지;

//-------------------------;
// PACKAGE;
//-------------------------;

window.service.file_upload.file_upload__single_form_textAsdataURL = {};

//-------------------------;
// FUNCTION;
//-------------------------;

window.service.file_upload.file_upload__single_form_textAsdataURL.uloadFile = function( data, fileNm, fileSize ){
    var url = "/file_upload__single_textAsdataURL?fileNm=" + fileNm + "&totalBytes=" + fileSize;
    var params = data;

    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //http.setRequestHeader("Content-length", params.length);
    //http.setRequestHeader("Connection", "close");
    // http.setRequestHeader('Access-Control-Allow-Origin','*')
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200)
        {
            var r = JSON.parse( http.responseText )
            console.log("All-end")
            document.getElementById("file_upload_input").value = "";
            console.log( r )
            window.service.file_upload.file_upload__single_form_textAsdataURL.isComplete( r.fileNm, fileSize ,fileNm )
        }
        else
        {
            console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
    }
    http.send(params);
}

window.service.file_upload.file_upload__single_form_textAsdataURL.isComplete = function( fileNm, fileSize, org_fileNm ){

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
                window.service.file_upload.file_upload__single_form_textAsdataURL.isComplete( fileNm, fileSize, org_fileNm)
            }
            else
            {
                console.log("File_Upload_checing...")
                window.service.file_upload.file_upload__single_form_textAsdataURL.write_OK_check(org_fileNm)
            }
        }
        else
        {
            console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
    }
    http.send(params);
};

window.service.file_upload.file_upload__single_form_textAsdataURL.readFile = function(file){

    var reader = new FileReader();
        reader.addEventListener( "abort", function( e ){ console.log( "---------- abort ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "error", function( e ){ console.log( "---------- error ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "load", function( e ){ console.log( "---------- load ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "loadend", function( e ){ console.log( "---------- loadend ----------" ); console.log( e );
            // window.file_sigle_upload.result = reader.result;
            var dataURL = reader.result;
            var dataType = dataURL.substring( 0, dataURL.indexOf( "base64," ) + 7 )
            console.log( "DataType : ", dataType );
            console.log( "DataURL : ",dataURL.replace( dataType, "" ));
            window.service.file_upload.file_upload__single_form_textAsdataURL.uloadFile( dataURL.replace( dataType, "" ), file.name, file.size );
            //uloadFile( dataURL, file.name, file.size )
        }, false, 0, true );
        reader.addEventListener( "loadstart", function( e ){ console.log( "---------- loadstart ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "progress", function( e ){ console.log( "---------- progress ----------" ); console.log( e ); }, false, 0, true );

        reader.readAsDataURL( file );

    // var objectURL = window.URL.createObjectURL( file );
    // console.log( objectURL )
    // var revokeObjectURL = window.URL.revokeObjectURL( objectURL );
    // console.log( revokeObjectURL )
}


window.service.file_upload.file_upload__single_form_textAsdataURL.write_OK_check = function( d , fileSize){
    console.log( d )
    var li_val = document.getElementById( d ).innerText;
    return document.getElementById( d + "_prg" ).textContent = " -- complete!";
}

window.service.file_upload.file_upload__single_form_textAsdataURL.infoAdd = function( file, dataURL ){

    var output = document.getElementById('upload_files');
    var li = document.createElement("li")

    var text = document.createTextNode( file.name )
    // var text_prg = document.createTextNode( " - 0%" )
    var span = document.createElement("span")
    //li__img.setAttribute("id", file.name)
    span.setAttribute( "id", file.name+"_prg" )
    li.setAttribute( "id", file.name )

    li.appendChild( text )
    li.appendChild( span )
    // li.appendChild( li__img )
    output.appendChild( li )
    // var imgByClassName = document.getElementById( file.name );
    // imgByClassName.src = dataURL;

}

window.service.file_upload.file_upload__single_form_textAsdataURL.openFile = function(event) {

    var input = event.target;

    var o;
    var i = 0,iLen = input.files.length;
    for(; i < iLen; i++){
    var file =  input.files[i];
    fileSize = file.size;
    console.group("File "+i);
    console.log("name : " + file.name);
    console.log("size : " + file.size);
    console.log("type : " + file.type);
    console.log("date : " + file.lastModified);
    console.groupEnd();
    window.service.file_upload.file_upload__single_form_textAsdataURL.infoAdd( file );
    fileDataInfo = file;

    }
};

window.service.file_upload.file_upload__single_form_textAsdataURL.popFileSelector = function() {
    var el = document.getElementById("file_upload_input");
    if (el) {
        el.click();
    }
};

window.service.file_upload.file_upload__single_form_textAsdataURL.popRightAway = function() {
    window.service.file_upload.file_upload__single_form_textAsdataURL.popFileSelector();
};

//-------------------------;
// EVENT;
//-------------------------;

document.getElementById("file_upload_input").addEventListener("change",function(){ window.service.file_upload.file_upload__single_form_textAsdataURL.openFile(event); })
document.getElementById("upload").addEventListener("click",function(){ window.service.file_upload.file_upload__single_form_textAsdataURL.readFile( fileDataInfo ) })
document.getElementById("select_file_button").addEventListener("click",function(){ window.service.file_upload.file_upload__single_form_textAsdataURL.popFileSelector() })

})();
