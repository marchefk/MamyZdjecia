let landingHeight = $("#landing").height();

$(window).scroll(function() {
  console.log('scrolling');
    let scroll = $(window).scrollTop();
    if (scroll >= landingHeight) {
        $("#nav").addClass("fixed");
    }
    else {
      $("#nav").removeClass("fixed");
    }
});

let minWidth = window.matchMedia("(min-width: 700px)");
$(window).resize(function(){
  landingHeight = $("#landing").height();
});
