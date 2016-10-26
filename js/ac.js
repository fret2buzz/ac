var animated = function(){
  
  $(".columns").remove();
  
  $('<div class="columns"></div>').appendTo($("#acExample"));
  var columns = $(".columns");
  
  columns.parent().css("height", "100%");

  columns.click(function(){
    $(this).toggleClass("stop");
  });

  $('<button class="refresh button" type="button">Refresh</button>').prependTo(columns);
  
  var countRows = 5;
  var countCols = 5;
  
  for(let i = 0; i < countCols; i++){
   $('<div class="col"><div class="rows"></div></div>').prependTo(columns);
  } 
  
  var col = $(".col").css("width", 100/countCols + "%");
  
  col.each(function(){
    var rows = $(this).find(".rows");
    
    for(let i = 0; i < countRows; i++){
     $('<div class="row"></div>').css({
       backgroundImage: "url(jpg/" + Math.floor((Math.random() * 157) + 1) + ".jpg)",
       backgroundColor: "hsl(" + Math.floor((Math.random() * 300) + 1) + ",100%,50%)",
       height: 100/countRows + "%"
     }).appendTo(rows);
    }
    rows.clone().appendTo($(this)).addClass("rows2");
    rows.addClass("rows1");
  });
  var row = $(".row");
  row.click(function(){
    var bg = $(this).css("backgroundImage");
    $('<div class="overlay"></div>').css("backgroundImage", bg).appendTo($(".columns"));
    var overlay = $(".overlay");
    var close = $('<button class="close button" type="button">Close</button>').appendTo(overlay);
    close.click(function(){
      // overlay.removeClass("visible");
      overlay.remove();
    });
    overlay.click(function(event){
      event.stopPropagation();
      // overlay.remove();
    });
  });
};

$(document).ready(function(){
  animated();
  
  $(".refresh").click(function(){
    animated();
  });
});