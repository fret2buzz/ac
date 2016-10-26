(function ($) {
  
  $.fn.animateColumns = function (options) {
    // Establish our default settings
    var settings = $.extend({
      countRows: 5, //rows
      countCols: 5, // cols
      imagesFromFolder: true,
      imagesCount: 25 //images
    }, options);

    return this.each(function () {
      var el = $(this);

      var animated = function(){
        
        el.find($(".columns")).remove();
        
        var images = el.find("img");
        var imagesLength = images.length - 1;
        images.hide();

        $('<div class="columns"></div>').appendTo(el);
        
        var columns = el.find(".columns");
        var body = $("body");

        columns.click(function(){
          body.toggleClass("stop");
        });

        for(var i = 0; i < settings.countCols; i++){
         $('<div class="col"><div class="rows"></div></div>').prependTo(columns);
        } 
        
        var col = el.find(".col").css("width", 100/settings.countCols + "%");
        
        col.each(function(){
          var rows = $(this).find(".rows");
          
          for(var k = 0; k < settings.countRows; k++){
            if (imagesLength != 0 && settings.imagesFromFolder == false) {
              var urlImage = "url(" + images[Math.floor((Math.random() * imagesLength) + 1)].src +")";
            } else {
              var urlImage = "url(jpg/" + Math.floor((Math.random() * settings.imagesCount) + 1) + ".jpg)";
            };
            $('<div class="row"></div>').css({
             backgroundImage: urlImage,
             backgroundColor: "hsl(" + Math.floor((Math.random() * 300) + 1) + ",100%,50%)",
             height: 100/settings.countRows + "%"
           }).appendTo(rows);
          }

          rows.clone().appendTo($(this)).addClass("rows2");
          rows.addClass("rows1");
        });

        var row = el.find(".row");
        row.click(function(){
          var bg = $(this).css("backgroundImage");
          $('<div class="overlay"></div>').css("backgroundImage", bg).appendTo(body);
          var overlay = body.find(".overlay");
          var close = $('<button class="close button" type="button">Close</button>').appendTo(overlay);
          close.add(overlay).click(function(){
            // event.stopPropagation();
            body.toggleClass("stop");
            overlay.remove();
          });
        });
      };

      animated();

    });
  }
}(jQuery));
