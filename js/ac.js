(function ($) {
  
  $.fn.animateColumns = function (options) {
    // Establish our default settings
    var settings = $.extend({
      countRows: 5, //rows
      countCols: 5, // cols
      imagesFromFolder: true,
      imagesCount: 25, //images
      random: false
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
        var notFromFolder = (imagesLength != 0 && settings.imagesFromFolder == false);
        var urlImage;
        var a1 = 0;
        var a2 = 1;
        col.each(function(){
          
          var rows = $(this).find(".rows");
          
          for(var k = 0; k < settings.countRows; k++){

            if (notFromFolder) {
              
              if(settings.random){
                var urlImage = "url(" + images[Math.floor((Math.random() * imagesLength) + 1)].src +")";
              } else {
                urlImage = "url(" + images[a1].src +")";
                a1++;
                if(a1 > imagesLength){
                  a1 = 0;
                }
              }

            } else {

              if(settings.random){
                var urlImage = "url(jpg/" + Math.floor((Math.random() * settings.imagesCount) + 1) + ".jpg)";
              } else {
                urlImage = "url(jpg/" + a2 + ".jpg)";
                a2++;
                if(a2 > settings.imagesCount){
                  a2 = 1;
                }
              }

            }

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
      
      $(document).keyup(function(e) {
        if (e.keyCode === 27) $(".close").click();  // esc
      });

    });
  }
}(jQuery));
