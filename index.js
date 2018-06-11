let landingHeight = $("#landing").height();
let minWidth = window.matchMedia("(min-width: 700px)");

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

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: (target.offset().top)
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});

// Closes responsive menu when a scroll trigger link is clicked
$('.js-scroll-trigger').click(function() {
  $('.navbar-collapse').collapse('hide');
});

// Activate scrollspy to add active class to navbar items on scroll
$('body').scrollspy({
  target: '#nav'
});

$(window).resize(function(){
  landingHeight = $("#landing").height();
  if($("#nav").hasClass("fixed")){
    $("#nav").removeClass("fixed");
  }
});
