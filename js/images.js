
images = {
    takenSteps: null,
    step: null,
    imageArray: [],

    init: function () {
        console.log("images.js")

        try {
            $.get("planogram/",
                function(data) {
                    $(data).find("a:contains('.')").each(function(i) {
                        var src = this.href.replace(window.location.host, "").replace("http://", "planogram");
                        //console.log(src);
                        images.imageArray.push(src);
                    });
                    images.loadTemplate(images.imageArray);
                    images.saveImages();
                }).catch(function(err) {
                console.log(err)
            });
        }
        catch(err) {
            console.log('$.get(): ',err.message);
        }


    },

    loadTemplate: function(srcArray) {
        $('#images').load('templates/images.html',
            function() {
                images.fillTemplate(srcArray);
            });
    },

    fillTemplate: function(srcArray) {
        var templateScriptToRender = $("#images-template").html();
        var img = [];
        var row = [];

        srcArray.forEach(function(item, i) {
            img.push({ src: item });
            if ((i + 1) % 4 === 0 || i === srcArray.length - 1) {
                row.push({ images: img });
                img = [];
            }
        });

        var wrapper = { rows: row }
        var template = Handlebars.compile(templateScriptToRender);
        $('#images').html(template(wrapper));

        images.selectImages();
    },

    selectImages: function() {
        //$('img').bind('touchstart',
        //    function(event) {
        //        $(this).toggleClass('selected');
        //        images.isSelected();
        //    });
        $('img').click(function() {
            $(this).toggleClass('selected');
            images.isSelected();
        });
    },

    isSelected: function() {
        var selected = false;
        $('img').each(function() {
            if ($(this).hasClass('selected')) {
                $('#btnSaveData').text('Save selected images');
                selected = true;
            }
        });

        if (!selected) {
            $('#btnSaveData').text('Save all images');
        }
    },

    saveImages: function(parameters) {
        $("#btnSaveData").click(function() {
            var saveAll = true;

            if ($(this).is(":contains('selected')")) {
                saveAll = false;
            }

            var numberOfImages = 0;
            if (saveAll) {
                numberOfImages = $('img').length;
                //images.takenSteps = images.getSteps($('img').length);
            } else {
                numberOfImages = $('img.selected').length;
                //images.takenSteps = images.getSteps($('img.selected').length);
            }

            images.takenSteps = images.getSteps(numberOfImages);

            (function rec(i) {
                if (i >= $('img').length) {
                    return;
                }

                var _this = $('img:eq(' + i + ')');

                if (_this.hasClass('selected') || saveAll) {
                    images.getDataUrl(_this.attr('src')).done(function (data) {
                        database.saveImgToDb(data, numberOfImages).done(function () {
                            console.log('Klar');
                            rec(++i);
                        }).catch(function (err) {
                            console.log("Error: ", err);
                        });
                    }).catch(function (err) {
                        console.log("Error: ", err);
                    });
                } else {
                    rec(++i)
                }
            })(0);

            //$(this).unbind( "click" );
            //$(this).unbind( "click" );
        });
    },

    getDataUrl: function(src) {
        var dfd = $.Deferred();
        var image = new Image();

        image.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            canvas.getContext('2d').drawImage(this, 0, 0);
            //console.log('Första');
            dfd.resolve(canvas.toDataURL('image/jpeg'));
        };

        image.src = src;
        return dfd.promise();
    },

    getSteps: function (numberOfImages) {
        images.step = 100 / numberOfImages;
        console.log('Share: ', images.step);
        return images.step;
    }
}




function imagesTemplate(data) {
    var source = $(data).filter("#imagesTemplate").html();
    console.log(source)
    var template = Handlebars.compile(source);

    var ctx = {
        title: "Detta är en Zoltan",
        body: "Här är bodyn"
    }

    $("#images").html(template(ctx));
}

function createList(data) {
    var source = $(data).filter("#list").html();
    console.log(source)
    var template = Handlebars.compile(source);

    var ctx = {
        people: [
            { name: "Alan" },
            { name: "Allison" },
            { name: "Ryan" }
        ], group: "Bloggers"
    };

    $("#images").html(template(ctx));
}
