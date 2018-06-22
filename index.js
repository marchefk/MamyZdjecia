let landingHeight = $("#landing").height();
let minWidth = window.matchMedia("(min-width: 701px)");
let url = 'https://res.cloudinary.com/marchefk/image';

// Fixed sidebar on big screen
$(window).scroll(function() {
  if (minWidth.matches) {
    let scroll = $(window).scrollTop();
    if (scroll >= landingHeight) {
      $("#nav").addClass("fixed");
    } else {
      $("#nav").removeClass("fixed");
    }
  }
});

let getPictures = (category, containerID) => {
  $.getJSON(`${url}/list/${category}.json`, function (data) {
    for(let i = 0; i < data.resources.length; i++){
      let imgData = data.resources[i];
      let newDiv = document.createElement('div');
      if (i === 0){
        newDiv.setAttribute('class', 'carousel-item active');
      } else {
        newDiv.setAttribute('class', 'carousel-item');
      }
      let newImg = document.createElement('img');
      newImg.setAttribute('src', `${url}/upload/v${imgData.version}/${imgData.public_id}.${imgData.format}`);
      newImg.setAttribute('class', 'd-block img-fluid');
      $(containerID).append(newDiv);
      $(newDiv).append(newImg);
    }
  })
}

getPictures('home', '#home_gallery');


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

$(window).resize(function() {
  landingHeight = $("#landing").height();
  if ($("#nav").hasClass("fixed")) {
    $("#nav").removeClass("fixed");
  }
});

// 313573526563941
