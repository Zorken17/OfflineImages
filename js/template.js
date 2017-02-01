(function getTemplateAjax(path) {
    var source;
    var template;

    $.ajax({
        url: path,
        cache: true,
        success: function (data) {
            createList(data);
        }
    });
})("imageTemplate.html")

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

    var ctx = { people: [
        {name: "Alan"},
        {name: "Allison"},
        {name: "Ryan"}
    ], group: "Bloggers" };

    $("#images").html(template(ctx));
}
