
database = {
    db : new PouchDB({ name: 'imgDb', size: 50 }),

    init: function () {
        console.log("database.js")
        this.db.info().then(function (result) {
            if(result.doc_count) {
                $('#btnSaveData')
                    .text("Clear database")
                    .attr('id', 'btnClearDb')
                    .css({
                        margin: "3em 0 2.5em 0"
                    });

                $('#btnClearDb').click(function () {
                    database.clearDb()
                })

            }
        });
    },

    indexSteps: 1,
    saveImgToDb: function (data, numberOfImages) {
        var dfd = $.Deferred();

        var imgDb = {
            _id: new Date().toISOString() + "  " + database.indexSteps,
            src: data
        }

        database.db.put(imgDb).then(function (result) {
            var bar = $('.progress-bar');

            bar.css({
                width: images.takenSteps + "%",
            }).html(database.indexSteps++ + "/" + numberOfImages)
                .closest('.progress').show();

            images.takenSteps += images.step;

            dfd.resolve();

        }).catch(function (err) {
            $('#finish').text(err);
        });

        return dfd.promise();
    },

    clearDb: function () {
        this.db.destroy().then(function () {
            database.db = PouchDB({ name: 'imgDb', size: 50 });

            $('#btnClearDb')
                .text("Save all images")
                .attr('id', 'btnSaveData')
                .css({
                    margin: "3em 0 2.5em 0"
                });
        })
    },

    loadFromDb: function () {
        console.log("loadFromDb")
        $('button')
            .text('You are offline')
            .attr({
                'id' : 'btnOfflie',
                'disabled' : 'disabled'
            })
            .css({
                margin: "3em 0 2.5em 0"
            });

        database.db.allDocs({ include_docs: true, descending: false }).then(function(doc) {
            if (!doc.total_rows){
                console.log('No database items');
                return;
            }
            var docRows = doc.rows;
            var srcArray = [];
            //console.log(JSON.stringify(doc));

            docRows.forEach(function(row) {
                srcArray.push(row.doc.src)
                // $('#info').text('Successfully added imges; ' + i++);
                // $("#img").append("<img style='width: 100px; height: 100px' src='" + imgSrc.doc.src + "'/>");
            });

            images.loadTemplate(srcArray);
        }).catch(function(err) {
            console.log("Load from db: ", err);
        });
    }
}
