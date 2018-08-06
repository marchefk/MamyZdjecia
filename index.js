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

let getHomePictures = (category, containerID) => {
  $.getJSON(`${url}/list/${category}.json`, function(data) {
    for (let i = 0; i < data.resources.length; i++) {
      let imgData = data.resources[i];
      let newDiv = document.createElement('div');
      if (i === 0) {
        newDiv.setAttribute('class', 'carousel-item active');
      } else {
        newDiv.setAttribute('class', 'carousel-item');
      }
      let newImg = document.createElement('img');
      newImg.setAttribute('src', `${url}/upload/v${imgData.version}/${imgData.public_id}.${imgData.format}`);
      newImg.setAttribute('class', 'd-block');
      $(containerID).append(newDiv);
      $(newDiv).append(newImg);
    }
  })
}

let getPictures = (category, containerID) => {
  $.getJSON(`${url}/list/${category}.json`, function(data) {
    for (let i = 0; i < data.resources.length; i++) {
      let imgData = data.resources[i];
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'category-div');
      let newA = document.createElement ('a');
      newA.setAttribute('href', `${url}/upload/v${imgData.version}/${imgData.public_id}.${imgData.format}`);
      newA.setAttribute('data-toggle', 'lightbox');
      newA.setAttribute('data-gallery', `gallery-${category}`);
      let newImg = document.createElement('img');
      newImg.setAttribute('class', 'img-fluid');
      newImg.setAttribute('src', `${url}/upload/v${imgData.version}/${imgData.public_id}.${imgData.format}`);
      $(containerID).append(newDiv);
      $(newDiv).append(newA);
      $(newA).append(newImg);
    }
  })
}

getHomePictures('home', '#home_gallery');
getPictures('ciazowa', '#gallery_ciazowa');
getPictures('rodzinna', '#gallery_rodzinna');


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

// Bootstrap lighbox plugin

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Show category galleries on clicked navbar or pictures in main gallery

$('.trigger-gallery').on('click', function () {
  let galleries = document.getElementsByClassName('category-gallery');
  for (let i = 0; i < galleries.length; i++){
    if (!($(galleries[i]).hasClass('hidden'))) {
      $(galleries[i]).addClass('hidden');
    }
  }
  let IDtoShow = this.getAttribute('data-toggle');
  let selectedCategory = document.getElementById(IDtoShow);
  $(selectedCategory).removeClass('hidden');
});

// $(window).resize(function() {
//   landingHeight = $("#landing").height();
//   if ($("#nav").hasClass("fixed")) {
//     $("#nav").removeClass("fixed");
//   }
// });

// 313573526563941
