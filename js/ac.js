(function ($) {
  $.fn.ac = function (options) {
    
    // Establish our default settings
    var settings = $.extend({
      countRows: 5, //rows
      countCols: 5 //cols
    }, options);

    return this.each(function () {
      var el = $(this);

      var animated = function(){
        
        el.find($(".columns")).remove();
        
        $('<div class="columns"></div>').appendTo(el);
        
        var columns = el.find(".columns");

        columns.click(function(){
          $(this).toggleClass("stop");
        });

        $('<button class="refresh button" type="button">Refresh</button>').prependTo(el);

        for(let i = 0; i < settings.countCols; i++){
         $('<div class="col"><div class="rows"></div></div>').prependTo(columns);
        } 
        
        var col = el.find(".col").css("width", 100/settings.countCols + "%");
        
        col.each(function(){
          var rows = $(this).find(".rows");
          
          for(let i = 0; i < settings.countRows; i++){
           $('<div class="row"></div>').css({
             backgroundImage: "url(jpg/" + Math.floor((Math.random() * 874) + 1) + ".jpg)",
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
          $('<div class="overlay"></div>').css("backgroundImage", bg).appendTo(el);
          var overlay = el.find(".overlay");
          var close = $('<button class="close button" type="button">Close</button>').appendTo(overlay);
          close.add(overlay).click(function(){
            // event.stopPropagation();
            // overlay.removeClass("visible");
            columns.toggleClass("stop");
            overlay.remove();
          });
        });
      };

      animated();
      var refresh = el.find(".refresh");
      refresh.click(function(){
        animated();
      });
    });
  }
}(jQuery));
