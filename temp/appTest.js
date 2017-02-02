var db = new PouchDB({ name: 'imgDB', auto_compaction: true, size: 50 });
var sIDb = new PouchDB({ name: 'domDB', size: 50 });
//var zoltan = new PouchDB('BAJS', { size: 50 });

var index = 1;
var images = [];

$(document).ready(function() {
    init();
});

function getAllImg() {
    $.ajax({
        url: 'planogram/',
        success: function (data) {
            $(data).find("a:contains('.')").each(function (i) { 
                var src = this.href.replace(window.location.host, "").replace("http:///", "");
                console.log(src);
                images.push(src);
            });
        },
        fail: function (err) {
            console.log(err);
        }
    }).done(function () {
        (function rec(i) {
            console.log("i: ", i);
            if (i >= images.length) {
                console.log('slut');
                $('#finish').text('Finished');
                return false;
            }
            getDataUrl(images[i]).done(function (data) {
                saveImgToDb(data).done(function (data) {
                    console.log('klar!', i);
                    rec(++i);
                });
            });
        })(0);
    });
}

function saveImgToDb(src) {
    var dfd = $.Deferred();

    var imgDb = {
        _id: new Date().toISOString(),
        src: src
    }

    db.put(imgDb).then(function (result) {
        console.log(result);
        console.log('Andra');        
        $('#info').text('Successfully saved no of img: ' + index++);
        dfd.resolve();
    }).catch(function(err) {
        $('#finish').text(err);
    });

    return dfd.promise();
}

function getDataUrl(url) {
    var dfd = $.Deferred();

    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalWidth;
        canvas.getContext('2d').drawImage(this, 0, 0);
        console.log('Första');
        dfd.resolve(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;

    return dfd.promise();
}


function deleteDb() {
    db.destroy().then(function (respond) {
        console.log("Databas deleted", respond);
        $('#info').text('Databas deleted');
    });
    sIDb.destroy();
}

function addImgToDom() {
    db.allDocs({ include_docs: true, descending: false }).then(function(doc) {
        var imgSrc = doc.rows;
        var i = 1;
        
        //console.log(JSON.stringify(doc));

        imgSrc.forEach(function(imgSrc) {
            console.log(imgSrc.doc);
            $('#info').text('Successfully added imges; ' + i++);
            $("#img").append("<img style='width: 100px; height: 100px' src='" + imgSrc.doc.src + "'/>");
        });
    }).catch(function(err) {
        console.log(err);
    });
}

function getDb() {
    //db.allDocs({ include_docs: true, descending: false }).then(function(doc) {
    //    $('#info').text('No of rows in db: ' + doc.total_rows);
    //});

    db.info().then(function(info) {
        $('#info').text(JSON.stringify(info, null, '  '));
    });
}


function save() {
    if ($("#img").html().length > 0) {
        var domDB = {
            _id: new Date().toISOString(),
            src: $("#img").html()
        }

        sIDb.put(domDB).then(function (result) {
            $('#info').text('Saved');
        });
    } else {
        $('#info').text('There is nothing to save');
    }
}

function init() {
    sIDb.info().then(function (info) {
        if (info.doc_count > 0) {
            addImgToDom();



            //sIDb.allDocs({ include_docs: true, descending: false }).then(function (doc) {
            //    var imgSrc = doc.rows;
            //    var i = 1;

            //    //console.log(JSON.stringify(doc));

            //    imgSrc.forEach(function(imgSrc) {
            //        console.log(imgSrc.doc);
            //        $('#info').text('Successfully added imges; ' + i++);
            //        $("#img").html(imgSrc.doc.src);
            //    });
            //});
        } 
    });
}
