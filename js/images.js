images = {
    imageArray: [],
    init: function () {

        $.get("img/",function (data) {
            $(data).find("a:contains('.')").each(function (i) {
                var src = this.href.replace(window.location.host, "").replace("http://", "img");
                images.imageArray.push(src);
            });
            images.loadTemplate();
        }).catch(function (err) {
            console.log(err)
        });
    },

    loadTemplate: function () {
        $('#images').load('templates/images.html', function() {
            images.fillTemplate();
        });
    },

    fillTemplate: function () {
        var templateScriptToRender = $("#images-template").html();
        var img = [];
        var row = [];

        images.imageArray.forEach(function (item, i) {
            img.push({ src: item });
            if ((i + 1) % 4 === 0 || i === images.imageArray.length - 1) {
                row.push({ images: img });
                img = [];
            }
        });

        var wrapper = {rows: row}
        var template = Handlebars.compile(templateScriptToRender);
        $('#images').html(template(wrapper));

        images.selectImages();
    },

    selectImages: function () {
        $('img').click(function () {
            $(this).toggleClass('selected');
        })
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
