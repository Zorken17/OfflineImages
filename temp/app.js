////var db = new PouchDB('img');
////var index = 1;

//function getBase644(files) {
//    var reader = new FileReader();

//    for (var i in files) {

//        //try {
//            reader.readAsDataURL(files[i]);
//            reader.onload = function () {
//                $("#img").append('<img src="' + reader.result + '"/>');
//                console.log(reader.result);
//            };
//            reader.onerror = function (error) {
//                console.log('Error: ', error);
//            };
//        //} catch (err) {
//          //  console.log('Error: ', err.message);
//        //} 

//    }
//}


//function previewFiles() {

//    //var obj = [];
    

//    var preview = document.querySelector('#preview');
//    var files = document.querySelector('input[type=file]').files;
//    var i = 0;

//    function readAndPreview(file) {

//        // Make sure `file.name` matches our extensions criteria
//        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
//            var reader = new FileReader();

//            reader.addEventListener("load", function () {
//                var image = new Image();
//                image.height = 100;
//                image.title = file.name;
//                image.src = this.result;
//                preview.appendChild(image);

//                var obj = {
//                    title: file.name,
//                    src: reader.result
//                };

//                var img = {
//                    _id: file.name,
//                    src: reader.result,
//                    completed: false
//                };

//                //console.log(JSON.stringify(obj));
//                //localStorage.setItem(file.name, JSON.stringify(obj));

//                db.put(img).then(function (result) {
//                    console.log('Successfully posted a todo!');
//                    console.log(result);
//                }).catch(function (err) {
//                    console.log('Error!');
//                    console.log(err);
//                });


//            }, false);
//            reader.readAsDataURL(file);

//        }
       
//    }

//    if (files) {
//        [].forEach.call(files, readAndPreview);
//    }
    
//}



//function showTodos() {
//    $('#temp').remove();
//    db.allDocs({ include_docs: true, descending: true }).then(function (doc) {
//        var img = doc.rows;

//        img.forEach(function (img) {
//            console.log(img.doc.src);
//            $("#img").append("<img style='width:100px; height:100px' id='" + img.doc._id + "' src='" + img.doc.src + "'/>");
//            $('label').text('Successfully posted a todo! ' + index++);
//        });
//    }).catch(function (err) {
//        console.log(err);
//    });;
//}

//$(document).ready(function() {
//    $('#bt').click(function () {
//        showTodos();
//    });


//   // var base64 = getBase64Image(document.getElementById("myImg"));

//    //$("#img").append("<img src='" + base64 + "'/>");
//})


//function saveToDb(src) {
//    var imgTest = {
//        _id: new Date().toISOString(),
//        src: src,
//        completed: false
//    };

//    db.put(imgTest).then(function (result) {
//        $('label').text('Successfully posted a todo! ' + index++);
//        console.log('Successfully posted a todo!');
//        console.log(result);
//    }).catch(function (err) {
//        console.log('Error!');
//        console.log(err);
//    });
//}

//function save() {
//    $('img').each(function (i) {
//        var base64Src = getBase64Image(this);
//        saveToDb(base64Src);
//        console.log(base64Src);
//    });
//}



//function getBase64Image(img) {
//    var canvas = document.createElement("canvas");
//    canvas.width = img.width;
//    canvas.height = img.height;
//    var ctx = canvas.getContext("2d");
//    ctx.drawImage(img, 0, 0);
//    var dataURL = canvas.toDataURL("image/jpeg");
//    return dataURL//.replace(/^data:image\/(png|jpg);base64,/, "");
//}


